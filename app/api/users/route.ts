'use server';

import { NextRequest, NextResponse } from 'next/server';
import { addUserThread } from '@/queries/users';
import dbConnect from '@/lib/db';

const POST = async (req: NextRequest) => {
  const { userId, thread } = await req.json();

  await dbConnect();

  try {
    await addUserThread(userId, thread);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `${error.message}` },
        {
          status: 500,
        },
      );
    } else {
      return NextResponse.json(
        { message: 'Unknown error' },
        {
          status: 500,
        },
      );
    }
  }

  // Return a success response
  return NextResponse.json(
    {
      message: `user with id ${userId} updated thread with id ${thread.threadId} and title ${thread.threadTitle}`,
    },
    {
      status: 201,
    },
  );
};

export { POST };
