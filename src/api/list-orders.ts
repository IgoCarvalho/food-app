import { queryOptions } from '@tanstack/react-query';
import { api, type PaginatedResponse } from '@/lib/api';

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
  status?: string;
  orderId?: string;
  customerName?: string;
}

export interface ListOrdersResponse extends PaginatedResponse<Order> {}

export async function listOrders({
  page,
  status,
  orderId,
  customerName,
}: ListOrdersInput) {
  const response = await api.fetch<ListOrdersResponse>('/orders', {
    params: { page, status, orderId, customerName },
  });

  return response;
}

export function listOrdersQuery({
  page,
  status,
  orderId,
  customerName,
}: ListOrdersInput = {}) {
  return queryOptions({
    queryKey: ['orders', page, status, orderId, customerName],
    queryFn: () => listOrders({ page, status, orderId, customerName }),
  });
}
