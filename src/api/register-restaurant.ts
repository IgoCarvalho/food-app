import { api } from '@/lib/axios';

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
  return api.post('/restaurants', {
    restaurantName,
    managerName,
    phone,
    email,
  });
}
