import { queryOptions } from '@tanstack/react-query';
import { api, type PaginatedResponse } from '@/lib/axios';

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'delivering'
  | 'delivered'
  | 'canceled';

export interface Order {
  orderId: string;
  createdAt: Date;
  status: OrderStatus;
  total: number;
  customerName: string;
}

interface ListOrdersInput {
  page?: number;
}

interface ListOrdersResponse extends PaginatedResponse<Order> {}

export async function listOrders({ page }: ListOrdersInput) {
  const response = await api.get<ListOrdersResponse>('/orders', {
    params: { page },
  });

  return response.data;
}

export function listOrdersQuery({ page }: ListOrdersInput = {}) {
  return queryOptions({
    queryKey: ['orders', page],
    queryFn: () => listOrders({ page }),
  });
}
