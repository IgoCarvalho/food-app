import { queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/axios';

interface GetProfileResponse {
  name: string;
  email: string;
  id: string;
  phone: string | null;
  role: 'manager' | 'customer';
  createdAt: Date;
  updatedAt: Date;
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me');

  return response.data;
}

export function getProfileQuery() {
  return queryOptions({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
}
