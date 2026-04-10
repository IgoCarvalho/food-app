import { api } from '@/lib/api';

interface SignInInput {
  email: string;
}

export function signIn({ email }: SignInInput) {
  return api.fetch('/authenticate', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
