import { queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface GetManagedRestaurantResponse {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  managerId: string | null;
  description: string | null;
}

export async function getManagedRestaurant() {
  const response = await api.fetch<GetManagedRestaurantResponse>(
    '/managed-restaurant'
  );

  return response;
}

export function getManagedRestaurantQuery() {
  return queryOptions({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  });
}
