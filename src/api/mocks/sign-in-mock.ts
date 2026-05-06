import { HttpResponse, http } from 'msw';
import type { SignInInput } from '../sign-in';

export const signInMock = http.post<never, SignInInput>(
  '/authenticate',
  async ({ request }) => {
    const { email } = await request.json();

    if (email === 'jhondoe@email.com') {
      return HttpResponse.json(null, {
        status: 200,
        headers: {
          'Set-Cookie': 'auth=sample-token',
        },
      });
    }

    return HttpResponse.json(null, { status: 400 });
  }
);
