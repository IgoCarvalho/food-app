import { queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { OrderStatus } from './list-orders';

interface GetOrderDetailsInput {
  orderId: string;
}

export interface GetOrderDetailsResponse {
  order: {
    status: OrderStatus;
    id: string;
    createdAt: Date;
    totalInCents: number;
    customer: {
      name: string;
      email: string;
      phone: string | null;
    } | null;
    orderItems: {
      id: string;
      priceInCents: number;
      quantity: number;
      product: {
        name: string;
      } | null;
    }[];
  };
}

export async function getOrderDetails({ orderId }: GetOrderDetailsInput) {
  const response = await api.fetch<GetOrderDetailsResponse>(
    `/orders/${orderId}`
  );

  return response;
}

export function getOrderDetailsQuery({ orderId }: GetOrderDetailsInput) {
  return queryOptions({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ orderId }),
  });
}
