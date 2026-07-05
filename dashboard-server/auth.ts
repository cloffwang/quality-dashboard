import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { mockUsers } from '@/constants/mockUsers';
import type { MockProfile } from '@/types/metrics';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = mockUsers.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password
        );
        if (!user) return null;
        return { id: user.id, email: user.email, profile: user.profile };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.profile = (user as { profile: MockProfile }).profile;
      return token;
    },
    session({ session, token }) {
      session.user.profile = token.profile as MockProfile;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
