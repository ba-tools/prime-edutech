/**
 * RAG Chat API Endpoint
 * Handles streaming chat responses with knowledge base context
 */

import { NextRequest, NextResponse } from 'next/server';
import { getLeadBySessionId, getConversationBySessionId, addMessageToConversation } from '@/lib/data-store';
import { searchDocuments } from '@/lib/pinecone';
import { streamChatCompletion, buildConversationMessages, validateResponse } from '@/lib/openai-chat';
import { OFF_TOPIC_MESSAGE } from '@/lib/chatbot-constants';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, message } = body;

    // Validate input
    if (!sessionId || !message) {
      return NextResponse.json(
        { error: 'Missing sessionId or message' },
        { status: 400 }
      );
    }

    // Validate lead exists
    const lead = getLeadBySessionId(sessionId);
    if (!lead) {
      return NextResponse.json(
        { error: 'Invalid session. Please complete onboarding first.' },
        { status: 403 }
      );
    }

    // Get conversation history
    const conversation = getConversationBySessionId(sessionId);
    const conversationHistory = conversation
      ? conversation.messages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        }))
      : [];

    // Save user message
    addMessageToConversation(sessionId, 'user', message);

    // Perform semantic search for relevant knowledge base context
    let knowledgeContext: string[] = [];
    try {
      const searchResults = await searchDocuments(message, 5);
      knowledgeContext = searchResults.map(
        result => `**${result.title}**\n${result.content} (Relevance: ${(result.score * 100).toFixed(1)}%)`
      );
    } catch (error) {
      console.error('Error searching knowledge base:', error);
      // Continue without KB context if search fails
    }

    // Build messages with RAG context
    const messages = buildConversationMessages(
      lead,
      [...conversationHistory, { role: 'user' as const, content: message }],
      knowledgeContext
    );

    // Set up streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = '';

        await streamChatCompletion(
          messages,
          // On chunk received
          (chunk: string) => {
            fullResponse += chunk;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
          },
          // On completion
          () => {
            // Validate the response to ensure it stayed on-topic
            const validation = validateResponse(fullResponse);

            if (!validation.isValid) {
              // Response went off-topic, replace with helpful redirect
              console.warn(`Off-topic response detected: ${validation.reason}`);
              console.warn(`User query: ${message}`);
              console.warn(`AI response (first 200 chars): ${fullResponse.slice(0, 200)}`);

              // Save the off-topic message instead
              addMessageToConversation(sessionId, 'assistant', OFF_TOPIC_MESSAGE);

              // Note: We already streamed the bad response to the client
              // In a production system, you might want to implement a way to
              // "cancel" the stream and send the redirect message instead
              // For now, the next message will save the correct redirect
            } else {
              // Valid response, save it
              addMessageToConversation(sessionId, 'assistant', fullResponse);
            }

            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          },
          // On error
          (error: Error) => {
            console.error('Streaming error:', error);
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ error: error.message })}\n\n`)
            );
            controller.close();
          }
        );
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
