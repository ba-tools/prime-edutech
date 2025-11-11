/**
 * OpenAI LLM Client
 * Handles AI chatbot interactions with streaming support
 */

import OpenAI from 'openai';
import { Lead } from './data-store';
import {
  ACCEPTABLE_EXAMPLES,
  UNACCEPTABLE_EXAMPLES,
  TOPIC_SUGGESTIONS,
  REFUSAL_INDICATORS,
  ON_TOPIC_INDICATORS,
} from './chatbot-constants';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';

/**
 * Generate system prompt with strict guardrails
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

**STRICT TOPIC BOUNDARIES - YOU MUST FOLLOW THESE:**

✅ **ACCEPTABLE TOPICS (Answer these):**
- Studying abroad (universities, programs, countries, rankings)
- Admission requirements and application processes
- Student visa and immigration procedures
- Scholarships, financial aid, and education loans
- Prime Edutech's services and consultancy offerings
- Career prospects after studying abroad
- Cost of living, tuition fees, and budgeting
- Language tests (IELTS, TOEFL, PTE) and entrance exams (GRE, GMAT, SAT)
- Accommodation and student life abroad

❌ **UNACCEPTABLE TOPICS (You MUST refuse these):**
- General education subject content (e.g., "Explain calculus", "What is photosynthesis?", "Solve this math problem")
- Homework or academic tutoring unrelated to study abroad
- Current events, politics, sports, entertainment
- Programming, coding, or technical tutorials
- Jokes, stories, poems, or creative writing
- Personal advice unrelated to education
- Any topic not directly related to studying abroad or Prime Edutech services

**Examples of Acceptable Questions:**
${ACCEPTABLE_EXAMPLES.map((ex, i) => `${i + 1}. "${ex}"`).join('\n')}

**Examples of Questions You MUST Refuse:**
${UNACCEPTABLE_EXAMPLES.map((ex, i) => `${i + 1}. "${ex}"`).join('\n')}

**Your Response Guidelines:**
1. You are a professional education counsellor specializing in international education
2. Use the student's information above to provide personalized advice
3. Reference the knowledge base context when relevant to provide accurate information
4. Always maintain a helpful, encouraging, and professional tone
5. Never make up information - if you're unsure, say so and offer to research further
6. Consider the student's budget when making recommendations
7. Provide actionable next steps whenever possible
8. Be empathetic and understanding of the stress of studying abroad

**CRITICAL: When asked an unacceptable question:**
You MUST respond with:
"${TOPIC_SUGGESTIONS}"

Do NOT answer off-topic questions under any circumstances. Do NOT be lenient. Strictly enforce these boundaries.

**Company Information:**
- Prime Edutech
- Location: H-Square, Office no.-503, 5th floor, Beside Amrawati Complex, Circular Road, Lalpur, Ranchi-834001 Jharkhand
- Phone: +91 8797444844
- Website: primeedutech.com

Remember: Your goal is to guide ${lead.name} through their study abroad journey with accurate, helpful, and personalized advice. Stay strictly within acceptable topics.`;
}

/**
 * Validate if AI response stayed on-topic
 * Returns { isValid: true } if response is acceptable
 * Returns { isValid: false, reason: string } if off-topic
 */
export function validateResponse(response: string): { isValid: boolean; reason?: string } {
  const lowerResponse = response.toLowerCase();

  // Check if AI refused the query (good - means it's working)
  const hasRefusalIndicator = REFUSAL_INDICATORS.some(indicator =>
    lowerResponse.includes(indicator.toLowerCase())
  );

  if (hasRefusalIndicator) {
    return { isValid: true }; // AI properly refused off-topic question
  }

  // Check if response is suspiciously short (likely off-topic or error)
  if (response.length < 50) {
    return {
      isValid: false,
      reason: 'Response too short - likely off-topic or incomplete',
    };
  }

  // Check if response contains on-topic keywords
  const hasOnTopicKeywords = ON_TOPIC_INDICATORS.some(keyword =>
    lowerResponse.includes(keyword)
  );

  if (!hasOnTopicKeywords) {
    return {
      isValid: false,
      reason: 'Response lacks study-abroad related keywords - likely off-topic',
    };
  }

  // Passed all checks
  return { isValid: true };
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
