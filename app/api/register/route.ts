'use server';

import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/queries/users';
import dbConnect from '@/lib/db';
import bcrypt from 'bcryptjs';

const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  // TODO: create a user in the database
  await dbConnect();

  // Encrypt password
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser(email, encryptedPassword);
  } catch (error: unknown) {
    return NextResponse.json(
      { message: `${error.message}` },
      {
        status: 500,
      },
    );
  }

  // Return a success response
  return NextResponse.json(
    { message: `user with email ${email} created` },
    {
      status: 201,
    },
  );
};

export { POST };
