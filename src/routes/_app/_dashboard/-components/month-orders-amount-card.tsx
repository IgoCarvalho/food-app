import { UtensilsIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MonthOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-semibold text-base">Pedidos (mês)</CardTitle>
        <UtensilsIcon className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="grid gap-1">
        <span className="font-bold text-2xl tracking-tight">183</span>
        <p className="text-muted-foreground text-xs">
          <span className="text-emerald-500 dark:text-emerald-400">+5%</span> em
          relação ao mês passado
        </p>
      </CardContent>
    </Card>
  );
}
