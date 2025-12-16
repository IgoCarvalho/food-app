import { SearchIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function OrderTableFilters() {
  return (
    <form className="flex items-center gap-2.5">
      <span className="font-semibold text-sm">Filtros:</span>
      <Input className="h-8 w-auto" placeholder="ID do pedido" />
      <Input className="h-8 w-80" placeholder="Nome do cliente" />

      <Select defaultValue="all">
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

      <Button size="sm" type="submit" variant="secondary">
        <SearchIcon className="size-4" />
        Filtrar resultados
      </Button>

      <Button size="sm" type="reset" variant="outline">
        <XIcon className="size-4" />
        Remover filtros
      </Button>
    </form>
  );
}
