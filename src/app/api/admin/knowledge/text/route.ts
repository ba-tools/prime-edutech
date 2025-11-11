/**
 * Add Text Knowledge Source
 * Stores text content in Pinecone and saves metadata
 */

import { NextRequest, NextResponse } from 'next/server';
import { createKnowledgeSource, updateKnowledgeSourceVectorIds } from '@/lib/data-store';
import { storeDocument } from '@/lib/pinecone';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    if (content.trim().length < 50) {
      return NextResponse.json(
        { error: 'Content must be at least 50 characters' },
        { status: 400 }
      );
    }

    // Create knowledge source entry
    const source = createKnowledgeSource({
      type: 'text',
      title,
      content,
      vectorIds: [],
    });

    // Store in Pinecone
    try {
      const vectorIds = await storeDocument(
        source.id,
        title,
        content,
        { type: 'text' }
      );

      // Update with vector IDs
      updateKnowledgeSourceVectorIds(source.id, vectorIds);
      source.vectorIds = vectorIds;

      return NextResponse.json({
        success: true,
        source,
      });
    } catch (error) {
      console.error('Error storing in Pinecone:', error);
      return NextResponse.json(
        { error: 'Failed to store document in vector database' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error adding text knowledge source:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
