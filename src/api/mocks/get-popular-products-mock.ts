import { HttpResponse, http } from 'msw';
import type { GetPopularProductsResponse } from '../get-popular-products';

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', async () =>
  HttpResponse.json({
    popularProducts: [
      { amount: 10, product: 'Product 1' },
      { amount: 15, product: 'Product 2' },
      { amount: 3, product: 'Product 3' },
      { amount: 22, product: 'Product 4' },
      { amount: 31, product: 'Product 5' },
    ],
  })
);
