import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { User } from './model/user';

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
          const user = await User.findOne(
            { email: credentials?.email },
            { password: 1 },
          );

          if (!user) return null;

          const isMatch = await bcrypt.compare(
            credentials?.password as string,
            user.password,
          );

          if (!isMatch) return null;

          return user;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});
