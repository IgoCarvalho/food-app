import { api } from '@/lib/api';

interface UpdateProfileInput {
  name: string;
  description: string;
}

export function updateProfile({ name, description }: UpdateProfileInput) {
  return api.fetch('/profile', {
    method: 'PUT',
    body: JSON.stringify({ name, description }),
  });
}
