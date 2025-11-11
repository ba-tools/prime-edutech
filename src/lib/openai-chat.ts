/**
 * OpenAI LLM Client
 * Handles AI chatbot interactions with streaming support
 */

import OpenAI from 'openai';
import { Lead } from './data-store';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';

/**
 * Generate system prompt with guardrails
 */
export function generateSystemPrompt(
  lead: Lead,
  knowledgeContext: string[]
): string {
  return `You are an expert AI Education Counsellor for Prime Edutech, a consultancy helping students study abroad.

**Student Information:**
- Name: ${lead.name}
- Email: ${lead.email}
- Phone: ${lead.phone}
- Interested Countries: ${lead.countries.join(', ')}
- Field of Study: ${lead.fieldOfStudy}
- Program of Study: ${lead.programOfStudy}
- Budget: $${lead.budget.toLocaleString()}
- Looking For: ${lead.lookingFor}

**Knowledge Base Context:**
${knowledgeContext.length > 0 ? knowledgeContext.map((ctx, i) => `${i + 1}. ${ctx}`).join('\n\n') : 'No specific knowledge base documents found for this query.'}

**Your Role & Guidelines:**
1. You are a professional education counsellor specializing in international education
2. Use the student's information above to provide personalized advice
3. Reference the knowledge base context when relevant to provide accurate information
4. Focus on: university selection, admission requirements, visa processes, scholarships, career prospects
5. Always maintain a helpful, encouraging, and professional tone
6. If asked about topics outside education consultancy, politely redirect to study abroad matters
7. Never make up information - if you're unsure, say so and offer to research further
8. Consider the student's budget when making recommendations
9. Provide actionable next steps whenever possible
10. Be empathetic and understanding of the stress of studying abroad

**Company Information:**
- Prime Edutech
- Location: H-Square, Office no.-503, 5th floor, Beside Amrawati Complex, Circular Road, Lalpur, Ranchi-834001 Jharkhand
- Phone: +91 8797444844
- Website: primeedutech.com

Remember: Your goal is to guide ${lead.name} through their study abroad journey with accurate, helpful, and personalized advice.`;
}

/**
 * Stream chat completion from OpenAI
 */
export async function streamChatCompletion(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  onChunk: (content: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void
): Promise<void> {
  try {
    const stream = await openai.chat.completions.create({
      model: MODEL,
      messages,
      stream: true,
      temperature: 0.7,
      max_tokens: 2000,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        onChunk(content);
      }
    }

    onComplete();
  } catch (error) {
    console.error('Error streaming from OpenAI:', error);
    onError(error as Error);
  }
}

/**
 * Get non-streaming chat completion (for testing or fallback)
 */
export async function getChatCompletion(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error getting completion from OpenAI:', error);
    throw error;
  }
}

/**
 * Build conversation messages with RAG context
 */
export function buildConversationMessages(
  lead: Lead,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  knowledgeContext: string[]
): Array<{ role: 'system' | 'user' | 'assistant'; content: string }> {
  const systemPrompt = generateSystemPrompt(lead, knowledgeContext);

  return [
    { role: 'system' as const, content: systemPrompt },
    ...conversationHistory,
  ];
}
