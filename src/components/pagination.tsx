import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import { Button } from './ui/button';

interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <span className="font-medium text-sm">
          Página {pageIndex + 1} de {pages}
        </span>

        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline">
            <ChevronsLeftIcon className="size-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button size="icon" variant="outline">
            <ChevronLeftIcon className="size-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button size="icon" variant="outline">
            <ChevronRightIcon className="size-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button size="icon" variant="outline">
            <ChevronsRightIcon className="size-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
