import { setupWorker } from 'msw/browser';
import { env } from '@/env';
import { getManagedRestaurantMock } from './get-managed-restaurant-mock';
import { getProfileMock } from './get-profile-mock';
import { registerRestaurantMock } from './register-restaurant-mock';
import { signInMock } from './sign-in-mock';

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getManagedRestaurantMock,
  getProfileMock
);

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return;
  }

  await worker.start();
}
