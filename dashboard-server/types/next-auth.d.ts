import type { DefaultSession } from 'next-auth';
import type { MockProfile } from '@/types/metrics';

declare module 'next-auth' {
  interface Session {
    user: {
      profile: MockProfile;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    profile?: MockProfile;
  }
}
