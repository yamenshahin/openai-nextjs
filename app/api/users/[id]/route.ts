'use server';

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { getUserById } from '@/queries/users';

const GET = async (request, { params: { id } }) => {
  await dbConnect();

  const user = await getUserById(id);
  const sanitizedUser = {
    _id: user._id,
    email: user.email,
    threads: user.threads,
  };
  // Return a success response
  return NextResponse.json(sanitizedUser, {
    status: 200,
  });
};

export { GET };
