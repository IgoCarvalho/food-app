import { useQuery } from '@tanstack/react-query';
import { getOrderDetailsQuery } from '@/api/get-order-details';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrencyToBrl } from '@/lib/format-currency';
import { getTimeFromNow } from '@/lib/get-time-from-now';
import { OrderDetailsSkeleton } from './order-details-skeleton';
import { OrderStatus } from './order-status';

interface OrderDetailsProps {
  orderId: string;
  isOpen: boolean;
}

export function OrderDetails({ orderId, isOpen }: OrderDetailsProps) {
  const { data: orderDetails } = useQuery({
    ...getOrderDetailsQuery({ orderId }),
    enabled: isOpen,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      {orderDetails ? (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={orderDetails.order.status} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  {orderDetails.order.customer?.name}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>
                <TableCell className="flex justify-end">
                  {orderDetails.order.customer?.phone ?? 'Não informado'}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  {orderDetails.order.customer?.email}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex justify-end">
                  {getTimeFromNow(orderDetails.order.createdAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderDetails.order.orderItems.map((orderItem) => (
                <TableRow key={orderItem.id}>
                  <TableCell>{orderItem.product?.name}</TableCell>
                  <TableCell className="text-right">
                    {orderItem.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyToBrl(orderItem.priceInCents / 100)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyToBrl(
                      (orderItem.priceInCents * orderItem.quantity) / 100
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-semibold">
                  {formatCurrencyToBrl(orderDetails.order.totalInCents / 100)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <OrderDetailsSkeleton />
      )}
    </DialogContent>
  );
}
