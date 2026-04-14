import { queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api';

export type GetPopularProductsResponse = {
  popularProducts: {
    product: string | null;
    amount: number;
  }[];
};

async function getPopularProducts() {
  const response = await api.fetch<GetPopularProductsResponse>(
    '/metrics/popular-products'
  );

  return response;
}

export function getPopularProductsQuery() {
  return queryOptions({
    queryKey: ['metrics', 'popular-products'],
    queryFn: getPopularProducts,
  });
}
