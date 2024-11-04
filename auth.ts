import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUsersByEmail } from './data/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        try {
          const user = getUsersByEmail(credentials.email as string);

          if (!user) return null;
          if (user.password !== credentials.password) return null;

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
