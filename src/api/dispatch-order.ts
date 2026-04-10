import { api } from '@/lib/api';

interface DispatchOrderInput {
  orderId: string;
}

export async function dispatchOrder({ orderId }: DispatchOrderInput) {
  await api.fetch(`/orders/${orderId}/dispatch`, { method: 'PATCH' });
}
