import { HttpResponse, http } from 'msw';
import type { RegisterRestaurantInput } from '../register-restaurant';

export const registerRestaurantMock = http.post<never, RegisterRestaurantInput>(
  '/restaurants',
  async ({ request }) => {
    const { restaurantName } = await request.json();

    if (restaurantName === 'Food Shop') {
      return HttpResponse.json(null, { status: 201 });
    }

    return HttpResponse.json(null, { status: 400 });
  }
);
