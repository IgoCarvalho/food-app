import { queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface GetDayOrdersAmountResponse {
  amount: number;
  diffFromYesterday: number;
}

export async function getDayOrdersAmount() {
  const response = await api.fetch<GetDayOrdersAmountResponse>(
    '/metrics/day-orders-amount'
  );

  return response;
}

export function getDayOrdersAmountQuery() {
  return queryOptions({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount,
  });
}
