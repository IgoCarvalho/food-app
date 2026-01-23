import { DollarSignIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MonthCanceledOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-semibold text-base">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSignIcon className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="grid gap-1">
        <span className="font-bold text-2xl tracking-tight">21</span>
        <p className="text-muted-foreground text-xs">
          <span className="text-emerald-500 dark:text-emerald-400">-8%</span> em
          relação ao mês passado
        </p>
      </CardContent>
    </Card>
  );
}
