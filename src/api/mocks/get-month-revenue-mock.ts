import { HttpResponse, http } from 'msw';
import type { GetMonthRevenueResponse } from '../get-month-revenue';

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueResponse
>('/metrics/month-revenue', async () =>
  HttpResponse.json({
    revenue: 16_397,
    diffFromLastMonth: -8,
  })
);
