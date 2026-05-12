import { queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface GetMonthCanceledOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthCanceledOrdersAmount() {
  const response = await api.fetch<GetMonthCanceledOrdersAmountResponse>(
    '/metrics/month-canceled-orders-amount'
  );

  return response;
}

export function getMonthCanceledOrdersAmountQuery() {
  return queryOptions({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  });
}
