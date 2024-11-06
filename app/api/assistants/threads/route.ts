import { openai } from '@/app/openai';

export const runtime = 'nodejs';

// Create a new thread
const POST = async () => {
  const thread = await openai.beta.threads.create();
  return Response.json({ threadId: thread.id });
};

export { POST };
