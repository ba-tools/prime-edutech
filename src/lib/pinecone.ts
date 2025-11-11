/**
 * Pinecone Vector Database Utility
 * Handles document embeddings, storage, and semantic search
 */

import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

// Initialize OpenAI for embeddings
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'prime-edutech-kb';
const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSION = 512; // Must match Pinecone index dimension

// Get or create index
export async function getIndex() {
  try {
    return pinecone.index(INDEX_NAME);
  } catch (error) {
    console.error('Error getting Pinecone index:', error);
    throw error;
  }
}

/**
 * Generate embeddings for text using OpenAI
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: text,
      dimensions: EMBEDDING_DIMENSION, // Specify dimension to match Pinecone index
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Chunk text into smaller pieces for better semantic search
 */
export function chunkText(text: string, chunkSize: number = 1000, overlap: number = 200): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = start + chunkSize;
    const chunk = text.slice(start, end);
    chunks.push(chunk.trim());
    start = end - overlap;
  }

  return chunks.filter(chunk => chunk.length > 0);
}

/**
 * Store document chunks in Pinecone with embeddings
 */
export async function storeDocument(
  documentId: string,
  title: string,
  content: string,
  metadata: Record<string, unknown> = {}
): Promise<string[]> {
  try {
    const index = await getIndex();
    const chunks = chunkText(content);
    const vectorIds: string[] = [];

    // Process chunks in batches
    const batchSize = 10;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const vectors = [];

      for (let j = 0; j < batch.length; j++) {
        const chunk = batch[j];
        const embedding = await generateEmbedding(chunk);
        const vectorId = `${documentId}_chunk_${i + j}`;

        vectors.push({
          id: vectorId,
          values: embedding,
          metadata: {
            documentId,
            title,
            content: chunk,
            chunkIndex: i + j,
            ...metadata,
          },
        });

        vectorIds.push(vectorId);
      }

      // Upsert batch to Pinecone
      await index.upsert(vectors);
    }

    console.log(`Stored ${chunks.length} chunks for document: ${documentId}`);
    return vectorIds;
  } catch (error) {
    console.error('Error storing document in Pinecone:', error);
    throw error;
  }
}

/**
 * Semantic search for relevant document chunks
 */
export async function searchDocuments(
  query: string,
  topK: number = 5
): Promise<Array<{ content: string; title: string; score: number }>> {
  try {
    const index = await getIndex();
    const queryEmbedding = await generateEmbedding(query);

    const results = await index.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    });

    return results.matches.map(match => ({
      content: (match.metadata?.content as string) || '',
      title: (match.metadata?.title as string) || '',
      score: match.score || 0,
    }));
  } catch (error) {
    console.error('Error searching documents:', error);
    throw error;
  }
}

/**
 * Delete vectors from Pinecone by IDs
 */
export async function deleteVectors(vectorIds: string[]): Promise<void> {
  try {
    const index = await getIndex();
    await index.deleteMany(vectorIds);
    console.log(`Deleted ${vectorIds.length} vectors from Pinecone`);
  } catch (error) {
    console.error('Error deleting vectors:', error);
    throw error;
  }
}

/**
 * Delete all vectors for a specific document
 */
export async function deleteDocument(documentId: string): Promise<void> {
  try {
    const index = await getIndex();

    // Delete by metadata filter
    await index.deleteMany({
      filter: {
        documentId: { $eq: documentId },
      },
    });

    console.log(`Deleted all vectors for document: ${documentId}`);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

/**
 * Check Pinecone index stats
 */
export async function getIndexStats() {
  try {
    const index = await getIndex();
    const stats = await index.describeIndexStats();
    return stats;
  } catch (error) {
    console.error('Error getting index stats:', error);
    throw error;
  }
}
