import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';
import { listOrdersQuery } from '@/api/list-orders';
import { Pagination } from '@/components/pagination';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { pageTitleTemplate } from '@/lib/page-title-template';
import { OrderTableFilters } from './-components/order-table-filters';
import { OrderTableRow } from './-components/order-table-row';

const searchSchema = z.object({
  page: z.number().min(1).catch(1),
});

export const Route = createFileRoute('/_app/orders/')({
  component: RouteComponent,
  validateSearch: (search) => searchSchema.parse(search),
});

function RouteComponent() {
  const { page } = Route.useSearch();
  const navigate = Route.useNavigate();

  const { data: orders } = useQuery(listOrdersQuery({ page }));

  function handlePageChange(newPage: number) {
    const search = searchSchema.parse({ newPage });
    navigate({ search });
  }

  return (
    <>
      <title>{pageTitleTemplate('Pedidos')}</title>

      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-3xl tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px] overflow-hidden" />
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]" />
                  <TableHead className="w-[132px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders?.data.map((order) => (
                  <OrderTableRow key={order.orderId} order={order} />
                ))}
              </TableBody>
            </Table>
          </div>

          {!!orders && (
            <Pagination
              onPageChange={handlePageChange}
              page={page}
              perPage={orders.meta.perPage}
              totalCount={orders.meta.totalCount}
            />
          )}
        </div>
      </div>
    </>
  );
}
