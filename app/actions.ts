'use server';

import { signIn } from '@/auth';
const doCredentialLogin = async function (formData: FormData) {
  try {
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export { doCredentialLogin };
