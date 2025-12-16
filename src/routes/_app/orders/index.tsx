import { createFileRoute } from '@tanstack/react-router';
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

export const Route = createFileRoute('/_app/orders/')({
  component: RouteComponent,
});

function RouteComponent() {
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
                {Array.from({ length: 10 }).map((_, index) => (
                  <OrderTableRow key={index} />
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination pageIndex={0} perPage={10} totalCount={105} />
        </div>
      </div>
    </>
  );
}
