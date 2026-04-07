import { api } from '@/lib/axios';

interface ApproveOrderInput {
  orderId: string;
}

export async function approveOrder({ orderId }: ApproveOrderInput) {
  await api.patch(`/orders/${orderId}/approve`);
}
