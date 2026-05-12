import { HttpResponse, http } from 'msw';
import type { DailyRevenueInPeriod } from '../get-daily-revenue-in-period';

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  DailyRevenueInPeriod
>('/metrics/daily-revenue-in-period', async () =>
  HttpResponse.json({
    revenuePerDay: [
      { date: '2023-01-01', revenue: 1200 },
      { date: '2023-01-02', revenue: 800 },
      { date: '2023-01-03', revenue: 1300 },
      { date: '2023-01-04', revenue: 1500 },
      { date: '2023-01-05', revenue: 1100 },
      { date: '2023-01-06', revenue: 1800 },
      { date: '2023-01-07', revenue: 900 },
    ],
  })
);
