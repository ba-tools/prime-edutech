/**
 * JSON File-based Data Store
 * Simple file-based storage for leads, conversations, and knowledge sources
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// File paths
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const CONVERSATIONS_FILE = path.join(DATA_DIR, 'conversations.json');
const KNOWLEDGE_SOURCES_FILE = path.join(DATA_DIR, 'knowledge-sources.json');

// Initialize files if they don't exist
function initFile(filePath: string, defaultData: unknown[] = []) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
}

initFile(LEADS_FILE);
initFile(CONVERSATIONS_FILE);
initFile(KNOWLEDGE_SOURCES_FILE);

// Generic read/write functions
function readJSON<T>(filePath: string): T {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [] as T;
  }
}

function writeJSON(filePath: string, data: unknown) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    throw error;
  }
}

// ============================================================================
// LEADS
// ============================================================================

export interface Lead {
  id: string;
  countries: string[];
  fieldOfStudy: string;
  programOfStudy: string;
  budget: number;
  name: string;
  phone: string;
  email: string;
  lookingFor: string;
  createdAt: string;
  sessionId: string; // Used to link chat sessions
}

export function createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'sessionId'>): Lead {
  const leads = readJSON<Lead[]>(LEADS_FILE);

  const newLead: Lead = {
    ...leadData,
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };

  leads.push(newLead);
  writeJSON(LEADS_FILE, leads);

  return newLead;
}

export function getLeadBySessionId(sessionId: string): Lead | null {
  const leads = readJSON<Lead[]>(LEADS_FILE);
  return leads.find(lead => lead.sessionId === sessionId) || null;
}

export function getAllLeads(): Lead[] {
  return readJSON<Lead[]>(LEADS_FILE);
}

export function deleteLead(id: string): boolean {
  const leads = readJSON<Lead[]>(LEADS_FILE);
  const filtered = leads.filter(lead => lead.id !== id);

  if (filtered.length === leads.length) {
    return false; // Lead not found
  }

  writeJSON(LEADS_FILE, filtered);
  return true;
}

// ============================================================================
// CONVERSATIONS
// ============================================================================

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  sessionId: string; // Links to Lead
  leadName?: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export function createConversation(sessionId: string): Conversation {
  const conversations = readJSON<Conversation[]>(CONVERSATIONS_FILE);

  // Get lead info for display
  const lead = getLeadBySessionId(sessionId);

  const newConversation: Conversation = {
    id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    sessionId,
    leadName: lead?.name,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  conversations.push(newConversation);
  writeJSON(CONVERSATIONS_FILE, conversations);

  return newConversation;
}

export function getConversationBySessionId(sessionId: string): Conversation | null {
  const conversations = readJSON<Conversation[]>(CONVERSATIONS_FILE);
  return conversations.find(conv => conv.sessionId === sessionId) || null;
}

export function addMessageToConversation(
  sessionId: string,
  role: 'user' | 'assistant',
  content: string
): Conversation {
  const conversations = readJSON<Conversation[]>(CONVERSATIONS_FILE);
  let conversation = conversations.find(conv => conv.sessionId === sessionId);

  // Create conversation if it doesn't exist
  if (!conversation) {
    conversation = createConversation(sessionId);
    conversations.push(conversation);
  }

  const message: Message = {
    role,
    content,
    timestamp: new Date().toISOString(),
  };

  conversation.messages.push(message);
  conversation.updatedAt = new Date().toISOString();

  writeJSON(CONVERSATIONS_FILE, conversations);

  return conversation;
}

export function getAllConversations(): Conversation[] {
  return readJSON<Conversation[]>(CONVERSATIONS_FILE);
}

export function deleteConversation(id: string): boolean {
  const conversations = readJSON<Conversation[]>(CONVERSATIONS_FILE);
  const filtered = conversations.filter(conv => conv.id !== id);

  if (filtered.length === conversations.length) {
    return false;
  }

  writeJSON(CONVERSATIONS_FILE, filtered);
  return true;
}

// ============================================================================
// KNOWLEDGE SOURCES
// ============================================================================

export interface KnowledgeSource {
  id: string;
  type: 'text' | 'pdf' | 'url';
  title: string;
  content?: string; // For text type
  fileName?: string; // For PDF type
  url?: string; // For URL type
  vectorIds: string[]; // Pinecone vector IDs for deletion
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export function createKnowledgeSource(sourceData: Omit<KnowledgeSource, 'id' | 'createdAt'>): KnowledgeSource {
  const sources = readJSON<KnowledgeSource[]>(KNOWLEDGE_SOURCES_FILE);

  const newSource: KnowledgeSource = {
    ...sourceData,
    id: `kb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };

  sources.push(newSource);
  writeJSON(KNOWLEDGE_SOURCES_FILE, sources);

  return newSource;
}

export function getAllKnowledgeSources(): KnowledgeSource[] {
  return readJSON<KnowledgeSource[]>(KNOWLEDGE_SOURCES_FILE);
}

export function deleteKnowledgeSource(id: string): KnowledgeSource | null {
  const sources = readJSON<KnowledgeSource[]>(KNOWLEDGE_SOURCES_FILE);
  const source = sources.find(s => s.id === id);

  if (!source) {
    return null;
  }

  const filtered = sources.filter(s => s.id !== id);
  writeJSON(KNOWLEDGE_SOURCES_FILE, filtered);

  return source;
}

export function updateKnowledgeSourceVectorIds(id: string, vectorIds: string[]): boolean {
  const sources = readJSON<KnowledgeSource[]>(KNOWLEDGE_SOURCES_FILE);
  const source = sources.find(s => s.id === id);

  if (!source) {
    return false;
  }

  source.vectorIds = vectorIds;
  writeJSON(KNOWLEDGE_SOURCES_FILE, sources);

  return true;
}
