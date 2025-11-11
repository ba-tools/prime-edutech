/**
 * RAG Chat API Endpoint
 * Handles streaming chat responses with knowledge base context
 */

import { NextRequest, NextResponse } from 'next/server';
import { getLeadBySessionId, getConversationBySessionId, addMessageToConversation } from '@/lib/data-store';
import { searchDocuments } from '@/lib/pinecone';
import { streamChatCompletion, buildConversationMessages } from '@/lib/openai-chat';

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
            // Save assistant response
            addMessageToConversation(sessionId, 'assistant', fullResponse);
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
