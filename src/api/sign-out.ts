import { api } from '@/lib/api';

export async function signOut() {
  await api.fetch('/sign-out', { method: 'POST' });
}
