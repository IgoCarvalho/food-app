import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

export function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Button size="icon-sm" variant="outline">
          <SearchIcon className="size-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </TableCell>
      <TableCell
        className="w-[140px] max-w-[140px] overflow-hidden text-ellipsis text-nowrap font-medium font-mono text-xs"
        title="3717cee7-a62b-46c6-8ebe-887f2f8f03f2"
      >
        3717cee7-a62b-46c6-8ebe-887f2f8f03f2
      </TableCell>
      <TableCell className="text-muted-foreground">1 dia atrás</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Igo Carvalho</TableCell>
      <TableCell className="font-medium">R$ 89,90</TableCell>
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
