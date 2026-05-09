import { HttpResponse, http } from 'msw';

import type { GetProfileResponse } from '../get-profile';

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  async () =>
    HttpResponse.json({
      id: 'custom-user-id',
      name: 'John Doe',
      email: 'johndoe@email.com',
      phone: '(99) 912345678',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
);
