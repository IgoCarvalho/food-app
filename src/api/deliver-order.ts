import { api } from '@/lib/api';

interface DeliverOrderInput {
  orderId: string;
}

export async function deliverOrder({ orderId }: DeliverOrderInput) {
  await api.fetch(`/orders/${orderId}/deliver`, { method: 'PATCH' });
}
