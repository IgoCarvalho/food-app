import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import { Button } from './ui/button';

interface PaginationProps {
  page: number;
  totalCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  perPage,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <span className="font-medium text-sm">
          Página {page} de {pages}
        </span>

        <div className="flex items-center gap-2">
          <Button
            disabled={page <= 1}
            onClick={() => onPageChange(1)}
            size="icon"
            variant="outline"
          >
            <ChevronsLeftIcon className="size-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            disabled={page <= 1}
            onClick={() => onPageChange(Math.max(page - 1, 1))}
            size="icon"
            variant="outline"
          >
            <ChevronLeftIcon className="size-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            disabled={page >= pages}
            onClick={() => onPageChange(Math.min(page + 1, pages))}
            size="icon"
            variant="outline"
          >
            <ChevronRightIcon className="size-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            disabled={page >= pages}
            onClick={() => onPageChange(pages)}
            size="icon"
            variant="outline"
          >
            <ChevronsRightIcon className="size-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
