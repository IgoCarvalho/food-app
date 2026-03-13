import { api } from '@/lib/axios';

interface SignInInput {
  email: string;
}

export function signIn({ email }: SignInInput) {
  return api.post('/authenticate', { email });
}
