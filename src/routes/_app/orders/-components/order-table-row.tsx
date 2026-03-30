import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react';
import type { Order } from '@/api/list-orders';
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

export function OrderTableRow({ order }: OrderTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon-sm" variant="outline">
              <SearchIcon className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails />
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
        <Button size="sm" variant="ghost">
          <XIcon className="size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
