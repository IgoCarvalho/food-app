import { api } from '@/lib/api';

export interface UpdateProfileInput {
  name: string;
  description: string;
}

export function updateProfile({ name, description }: UpdateProfileInput) {
  return api.fetch('/profile', {
    method: 'PUT',
    body: JSON.stringify({ name, description }),
  });
}
