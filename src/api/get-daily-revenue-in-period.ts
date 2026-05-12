import { queryOptions } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { api } from '@/lib/api';

export interface DailyRevenueInPeriod {
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
    queryKey: [
      'metrics',
      'daily-revenue-in-period',
      {
        from: from && dayjs(from).format('YYYY-MM-DD'),
        to: to && dayjs(to).format('YYYY-MM-DD'),
      },
    ],
    queryFn: () => getDailyRevenueInPeriod({ from, to }),
  });
}
