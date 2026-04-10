import { api } from '@/lib/api';

interface ApproveOrderInput {
  orderId: string;
}

export async function approveOrder({ orderId }: ApproveOrderInput) {
  await api.fetch(`/orders/${orderId}/approve`, { method: 'PATCH' });
}
