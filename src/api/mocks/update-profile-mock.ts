import { HttpResponse, http } from 'msw';
import type { UpdateProfileInput } from '../update-profile';

export const updateProfileMock = http.put<never, UpdateProfileInput>(
  '/profile',
  async ({ request }) => {
    const { name } = await request.json();

    if (name === 'Pizza Shop') {
      return HttpResponse.json(null, { status: 204 });
    }

    return HttpResponse.json(null, { status: 400 });
  }
);
