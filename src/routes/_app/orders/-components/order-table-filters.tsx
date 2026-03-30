import { zodResolver } from '@hookform/resolvers/zod';
import { getRouteApi } from '@tanstack/react-router';
import { SearchIcon, XIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ordersFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrdersFiltersSchema = z.infer<typeof ordersFiltersSchema>;

const routeApi = getRouteApi('/_app/orders/');

export function OrderTableFilters() {
  const { customerName, orderId, status } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const { register, handleSubmit, control, reset } =
    useForm<OrdersFiltersSchema>({
      resolver: zodResolver(ordersFiltersSchema),
      defaultValues: {
        orderId,
        customerName,
        status: status || 'all',
      },
    });

  function handleFilters(data: OrdersFiltersSchema) {
    navigate({
      search: {
        orderId: data.orderId ? data.orderId : undefined,
        customerName: data.customerName ? data.customerName : undefined,
        status: data.status || 'all',
        page: 1,
      },
    });
  }

  function handleFiltersReset() {
    navigate({
      search: {
        orderId: undefined,
        customerName: undefined,
        status: undefined,
        page: 1,
      },
    });

    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    });
  }

  return (
    <form
      className="flex items-center gap-2.5"
      onSubmit={handleSubmit(handleFilters)}
    >
      <span className="font-semibold text-sm">Filtros:</span>
      <Input
        className="h-8 w-auto"
        placeholder="ID do pedido"
        {...register('orderId')}
      />
      <Input
        className="h-8 w-80"
        placeholder="Nome do cliente"
        {...register('customerName')}
      />

      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, ...field } }) => (
          <Select defaultValue="all" {...field} onValueChange={onChange}>
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos os pedidos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button size="sm" type="submit" variant="secondary">
        <SearchIcon className="size-4" />
        Filtrar resultados
      </Button>

      <Button
        onClick={handleFiltersReset}
        size="sm"
        type="button"
        variant="outline"
      >
        <XIcon className="size-4" />
        Remover filtros
      </Button>
    </form>
  );
}
