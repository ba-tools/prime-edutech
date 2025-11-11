'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetUrl } from '@/lib/assets';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function AICounsellorPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Check for session on mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem('ai-counsellor-session');
    if (!storedSessionId) {
      router.push('/onboarding');
      return;
    }
    setSessionId(storedSessionId);
  }, [router]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !sessionId) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setIsStreaming(true);

    // Add user message immediately
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // Create assistant message placeholder
    const assistantMessage: Message = {
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response stream');
      }

      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              break;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedContent += parsed.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content: accumulatedContent,
                  };
                  return updated;
                });
              }
              if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: 'Sorry, I encountered an error. Please try again.',
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src={getAssetUrl('/assets/logo.png')} alt="Prime Edutech" height={100} width={200} />
          </Link>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <span className="font-semibold text-gray-900">AI Counsellor</span>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 container mx-auto max-w-4xl p-4 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 bg-white rounded-lg shadow-sm mb-4 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <Bot className="w-16 h-16 text-primary mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome to Prime Edutech AI Counsellor!
                </h2>
                <p className="text-gray-600 max-w-md">
                  I&apos;m here to help you with your study abroad journey. Ask me anything about
                  universities, courses, visa processes, scholarships, or any other questions
                  you might have!
                </p>
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-primary to-indigo-700 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">{message.content}</div>
                    {message.content && (
                      <div
                        className={`text-xs mt-1 ${
                          message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    )}
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-indigo-700" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isStreaming && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4 bg-gray-50">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message... (Shift+Enter for new line)"
                disabled={isLoading}
                rows={1}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg resize-none focus:border-primary focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                style={{
                  minHeight: '48px',
                  maxHeight: '120px',
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-6 bg-gradient-to-r from-primary to-indigo-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              AI responses are generated and may not always be accurate. For critical decisions,
              please consult with our human counsellors.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © 2025 Prime Edutech. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
