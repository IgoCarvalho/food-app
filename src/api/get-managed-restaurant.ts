import { queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/axios';

interface GetManagedRestaurantResponse {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  managerId: string | null;
  description: string | null;
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>(
    '/managed-restaurant'
  );

  return response.data;
}

export function getManagedRestaurantQuery() {
  return queryOptions({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  });
}
