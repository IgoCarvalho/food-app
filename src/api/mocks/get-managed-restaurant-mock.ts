import { HttpResponse, http } from 'msw';

import type { GetManagedRestaurantResponse } from '../get-managed-restaurant';

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', async () =>
  HttpResponse.json({
    id: 'custom-restaurant-id',
    name: 'Food Shop',
    description: 'My restaurant description',
    managerId: 'custom-user-id',
    createdAt: new Date(),
    updatedAt: null,
  })
);
