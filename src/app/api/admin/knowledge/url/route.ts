/**
 * Add URL Knowledge Source
 * Scrapes URL content and stores in Pinecone
 */

import { NextRequest, NextResponse } from 'next/server';
import { createKnowledgeSource, updateKnowledgeSourceVectorIds } from '@/lib/data-store';
import { storeDocument } from '@/lib/pinecone';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, title } = body;

    if (!url || !title) {
      return NextResponse.json(
        { error: 'URL and title are required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch and scrape URL
    let content: string;
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Prime Edutech Bot/1.0)',
        },
      });

      const $ = cheerio.load(response.data);

      // Remove script and style elements
      $('script, style, nav, footer, header').remove();

      // Extract text content
      content = $('body').text()
        .replace(/\s+/g, ' ')
        .trim();
    } catch (error) {
      console.error('Error fetching URL:', error);
      return NextResponse.json(
        { error: 'Failed to fetch URL content' },
        { status: 400 }
      );
    }

    if (content.length < 50) {
      return NextResponse.json(
        { error: 'URL content is too short or could not be extracted' },
        { status: 400 }
      );
    }

    // Create knowledge source entry
    const source = createKnowledgeSource({
      type: 'url',
      title,
      url,
      content,
      vectorIds: [],
    });

    // Store in Pinecone
    try {
      const vectorIds = await storeDocument(
        source.id,
        title,
        content,
        { type: 'url', url }
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
    console.error('Error adding URL knowledge source:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
