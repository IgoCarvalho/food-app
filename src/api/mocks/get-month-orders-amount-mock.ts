import { HttpResponse, http } from 'msw';
import type { GetMonthOrdersAmountResponse } from '../get-mounth-orders-amount';

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  GetMonthOrdersAmountResponse
>('/metrics/month-orders-amount', async () =>
  HttpResponse.json({
    amount: 123,
    diffFromLastMonth: -12,
  })
);
