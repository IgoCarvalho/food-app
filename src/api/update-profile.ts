import { api } from '@/lib/axios';

interface UpdateProfileInput {
  name: string;
  description: string;
}

export function updateProfile({ name, description }: UpdateProfileInput) {
  return api.put('/profile', { name, description });
}
