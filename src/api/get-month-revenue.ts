import { queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface GetMonthRevenueResponse {
  revenue: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenue() {
  const response = await api.fetch<GetMonthRevenueResponse>(
    '/metrics/month-revenue'
  );

  return response;
}

export function getMonthRevenueQuery() {
  return queryOptions({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue,
  });
}
