import { assistantId } from '@/app/assistant-config';
import { openai } from '@/app/openai';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

// Send a new message to a thread
export async function POST(
  request: NextRequest,
  { params: { threadId } }: { params: { threadId: string } },
) {
  const { content } = await request.json();

  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: content,
  });

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
  });

  return new Response(stream.toReadableStream());
}

// Retrieve messages by thread id
export async function GET(
  request: NextRequest,
  { params: { threadId } }: { params: { threadId: string } },
) {
  const messages = await openai.beta.threads.messages.list(threadId, {
    limit: 100,
    order: 'asc',
  });
  return Response.json(messages);
}
