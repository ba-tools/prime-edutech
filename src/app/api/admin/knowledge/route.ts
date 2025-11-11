/**
 * Admin Knowledge Base API
 * Fetch and manage knowledge sources
 */

import { NextResponse } from 'next/server';
import { getAllKnowledgeSources, deleteKnowledgeSource } from '@/lib/data-store';
import { deleteVectors } from '@/lib/pinecone';

export async function GET() {
  try {
    const sources = getAllKnowledgeSources();
    return NextResponse.json(sources);
  } catch (error) {
    console.error('Error fetching knowledge sources:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Knowledge source ID is required' },
        { status: 400 }
      );
    }

    const source = deleteKnowledgeSource(id);

    if (!source) {
      return NextResponse.json(
        { error: 'Knowledge source not found' },
        { status: 404 }
      );
    }

    // Delete vectors from Pinecone
    if (source.vectorIds && source.vectorIds.length > 0) {
      try {
        await deleteVectors(source.vectorIds);
      } catch (error) {
        console.error('Error deleting vectors from Pinecone:', error);
        // Continue even if Pinecone deletion fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting knowledge source:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
