import { queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface GetMonthOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrdersAmount() {
  const response = await api.fetch<GetMonthOrdersAmountResponse>(
    '/metrics/month-orders-amount'
  );

  return response;
}

export function getMonthOrdersAmountQuery() {
  return queryOptions({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  });
}
