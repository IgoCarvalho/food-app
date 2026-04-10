import { api } from '@/lib/api';

interface CancelOrderInput {
  orderId: string;
}

export async function cancelOrder({ orderId }: CancelOrderInput) {
  await api.fetch(`/orders/${orderId}/cancel`, { method: 'PATCH' });
}
