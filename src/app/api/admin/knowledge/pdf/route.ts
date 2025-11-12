/**
 * Add PDF Knowledge Source
 * Uploads PDF, extracts text, stores in Pinecone
 */

import { NextRequest, NextResponse } from 'next/server';
import { createKnowledgeSource, updateKnowledgeSourceVectorIds } from '@/lib/data-store';
import { storeDocument } from '@/lib/pinecone';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;

    if (!file || !title) {
      return NextResponse.json(
        { error: 'PDF file and title are required' },
        { status: 400 }
      );
    }

    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'File must be a PDF' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF
    let pdfText: string;
    try {
      // Dynamic import to avoid build-time issues on Vercel
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require('pdf-parse');
      const data = await pdfParse(buffer);
      pdfText = data.text;
    } catch (error) {
      console.error('Error parsing PDF:', error);
      return NextResponse.json(
        { error: 'Failed to parse PDF file' },
        { status: 400 }
      );
    }

    if (pdfText.trim().length < 50) {
      return NextResponse.json(
        { error: 'PDF content is too short or could not be extracted' },
        { status: 400 }
      );
    }

    // Create knowledge source entry
    const source = createKnowledgeSource({
      type: 'pdf',
      title,
      fileName: file.name,
      content: pdfText,
      vectorIds: [],
    });

    // Store in Pinecone
    try {
      const vectorIds = await storeDocument(
        source.id,
        title,
        pdfText,
        { type: 'pdf', fileName: file.name }
      );

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
    console.error('Error adding PDF knowledge source:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
