import { api } from '@/lib/axios';

interface DeliverOrderInput {
  orderId: string;
}

export async function deliverOrder({ orderId }: DeliverOrderInput) {
  await api.patch(`/orders/${orderId}/deliver`);
}
