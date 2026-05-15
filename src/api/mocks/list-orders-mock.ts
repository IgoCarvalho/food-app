import { HttpResponse, http } from 'msw';

import type { ListOrdersResponse } from '../list-orders';

type Orders = ListOrdersResponse['data'];
type OrderStatus = ListOrdersResponse['data'][number]['status'];

const statuses: OrderStatus[] = [
  'pending',
  'canceled',
  'processing',
  'delivering',
  'delivered',
];

const orders: Orders = Array.from({ length: 60 }).map((_, i) => ({
  orderId: `order-${i + 1}`,
  customerName: `Customer ${i + 1}`,
  createdAt: new Date(),
  total: 120_000,
  status: statuses[i % 5],
}));

export const listOrdersMock = http.get<never, never, ListOrdersResponse>(
  '/orders',
  ({ request }) => {
    const { searchParams } = new URL(request.url);

    const pageIndex = searchParams.get('page')
      ? Number(searchParams.get('page'))
      : 0;

    const customerName = searchParams.get('customerName');
    const orderId = searchParams.get('orderId');
    const status = searchParams.get('status');

    let filteredOrders = orders;

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName)
      );
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId)
      );
    }

    if (status) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === status
      );
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10
    );

    return HttpResponse.json({
      data: paginatedOrders,
      meta: {
        page: pageIndex + 1,
        perPage: 10,
        totalCount: filteredOrders.length,
        nextPage:
          filteredOrders.length > (pageIndex + 1) * 10 ? pageIndex + 2 : null,
        pageSize: 10,
      },
    });
  }
);
