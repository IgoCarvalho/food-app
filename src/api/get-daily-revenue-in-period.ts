import { queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api';

interface DailyRevenueInPeriod {
  revenuePerDay: {
    date: string;
    revenue: number;
  }[];
}

interface GetDailyRevenueInPeriodInput {
  from?: Date;
  to?: Date;
}

async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodInput) {
  const response = await api.fetch<DailyRevenueInPeriod>(
    '/metrics/daily-revenue-in-period',
    {
      params: { from, to },
    }
  );

  return response;
}

export function getDailyRevenueInPeriodQuery({
  from,
  to,
}: GetDailyRevenueInPeriodInput) {
  return queryOptions({
    queryKey: ['metrics', 'daily-revenue-in-period', { from, to }],
    queryFn: () => getDailyRevenueInPeriod({ from, to }),
  });
}
