import { queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api';

interface GetProfileResponse {
  name: string;
  email: string;
  id: string;
  phone: string | null;
  role: 'manager' | 'customer';
  createdAt: Date;
  updatedAt: Date;
}

interface GetProfileInput {
  skipAuthRedirect?: boolean;
}

export async function getProfile({ skipAuthRedirect }: GetProfileInput = {}) {
  const response = await api.fetch<GetProfileResponse>('/me', {
    skipAuthRedirect,
  });

  return response;
}

export function getProfileQuery({ skipAuthRedirect }: GetProfileInput = {}) {
  return queryOptions({
    queryKey: ['profile'],
    queryFn: () => getProfile({ skipAuthRedirect }),
  });
}
