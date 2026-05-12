import { HttpResponse, http } from 'msw';
import type { GetMonthCanceledOrdersAmountResponse } from '../get-month-canceled-orders-amount';

export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>('/metrics/month-canceled-orders-amount', async () =>
  HttpResponse.json({
    amount: 13,
    diffFromLastMonth: 3,
  })
);
