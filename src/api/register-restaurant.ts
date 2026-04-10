import { api } from '@/lib/api';

interface RegisterRestaurantInput {
  restaurantName: string;
  managerName: string;
  phone: string;
  email: string;
}

export function registerRestaurant({
  restaurantName,
  managerName,
  phone,
  email,
}: RegisterRestaurantInput) {
  return api.fetch('/restaurants', {
    method: 'POST',
    body: JSON.stringify({ restaurantName, managerName, phone, email }),
  });
}
