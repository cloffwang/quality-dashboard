import type { MockProfile } from '@/types/metrics';

export interface MockUser {
  id: string;
  email: string;
  // Plaintext mock creds — fine since there's no real data behind this login.
  password: string;
  profile: MockProfile;
}

export const mockUsers: MockUser[] = [
  { id: 'user-1', email: 'ok@example.com', password: 'password123', profile: 'HEALTHY' },
  { id: 'user-2', email: 'outage@example.com', password: 'password123', profile: 'ERROR' },
];
