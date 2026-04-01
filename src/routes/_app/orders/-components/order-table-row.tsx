import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { cancelOrder } from '@/api/cancel-order';
import type {
  ListOrdersResponse,
  Order,
  OrderStatus as OrderStatusType,
} from '@/api/list-orders';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatCurrencyToBrl } from '@/lib/format-currency';
import { getTimeFromNow } from '@/lib/get-time-from-now';
import { OrderDetails } from './order-details';
import { OrderStatus } from './order-status';

interface OrderTableRowProps {
  order: Order;
}

const orderStatusesThatCanBeCanceled = new Set<OrderStatusType>([
  'pending',
  'processing',
]);

export function OrderTableRow({ order }: OrderTableRowProps) {
  const queryClient = useQueryClient();

  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  const { mutateAsync: handleCancelOrder } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: (_, { orderId }) => {
      const cachedOrders = queryClient.getQueriesData<ListOrdersResponse>({
        queryKey: ['orders'],
      });

      for (const [cacheKey, cachedData] of cachedOrders) {
        if (!cachedData) {
          continue;
        }

        queryClient.setQueryData<ListOrdersResponse>(cacheKey, {
          ...cachedData,
          data: cachedData.data.map((cachedOrder) => {
            if (cachedOrder.orderId === orderId) {
              return {
                ...cachedOrder,
                status: 'canceled',
              };
            }

            return cachedOrder;
          }),
        });
      }

      const cachedOrderDetails = queryClient.getQueryData<Order>([
        'order',
        orderId,
      ]);

      if (cachedOrderDetails) {
        queryClient.setQueryData<Order>(['order', orderId], {
          ...cachedOrderDetails,
          status: 'canceled',
        });
      }
    },
  });

  return (
    <TableRow>
      <TableCell>
        <Dialog onOpenChange={setIsOrderDetailsOpen} open={isOrderDetailsOpen}>
          <DialogTrigger asChild>
            <Button size="icon-sm" variant="outline">
              <SearchIcon className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails isOpen={isOrderDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell
        className="w-[140px] max-w-[140px] overflow-hidden text-ellipsis text-nowrap font-medium font-mono text-xs"
        title="3717cee7-a62b-46c6-8ebe-887f2f8f03f2"
      >
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {getTimeFromNow(order.createdAt)}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {formatCurrencyToBrl(order.total / 100)}
      </TableCell>
      <TableCell>
        <Button size="sm" variant="outline">
          <ArrowRightIcon className="size-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          disabled={!orderStatusesThatCanBeCanceled.has(order.status)}
          onClick={() => handleCancelOrder({ orderId: order.orderId })}
          size="sm"
          variant="ghost"
        >
          <XIcon className="size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
