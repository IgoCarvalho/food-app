import { UtensilsIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DayOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-semibold text-base">Pedidos (dia)</CardTitle>
        <UtensilsIcon className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="grid gap-1">
        <span className="font-bold text-2xl tracking-tight">13</span>
        <p className="text-muted-foreground text-xs">
          <span className="text-rose-500 dark:text-rose-400">-3%</span> em
          relação a ontem
        </p>
      </CardContent>
    </Card>
  );
}
