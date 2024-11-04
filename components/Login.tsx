'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doCredentialLogin } from '../app/actions';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push('/chat');
      }
    } catch (e) {
      console.error(e);
      setError('Check your Credentials');
    }
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        {error && <div className="text-xl text-red-500">{error}</div>}
        <form className="w-full max-w-md" onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold mb-6">Please login to continue</h1>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="******"
            />
          </div>

          <button
            className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
