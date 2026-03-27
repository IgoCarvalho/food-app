import type { OrderStatus as OrderStatusType } from '@/api/list-orders';

interface OrderStatusProps {
  status: OrderStatusType;
}

export function OrderStatus({ status }: OrderStatusProps) {
  const statusLabelMap: Record<OrderStatusType, string> = {
    canceled: 'Cancelado',
    delivered: 'Entregue',
    delivering: 'Em entrega',
    pending: 'Pendente',
    processing: 'Em preparo',
  };

  const statusBulletColorMap: Record<OrderStatusType, string> = {
    pending: 'bg-slate-400',
    canceled: 'bg-rose-500',
    delivered: 'bg-emerald-500',
    delivering: 'bg-amber-500',
    processing: 'bg-amber-500',
  };

  const statusBulletColor = statusBulletColorMap[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`size-2 rounded-full ${statusBulletColor}`} />
      <span className="font-medium text-muted-foreground">
        {statusLabelMap[status]}
      </span>
    </div>
  );
}
