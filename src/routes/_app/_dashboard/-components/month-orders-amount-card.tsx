import { useSuspenseQuery } from '@tanstack/react-query';
import { UtensilsIcon } from 'lucide-react';
import { getMonthOrdersAmountQuery } from '@/api/get-mounth-orders-amount';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmount } = useSuspenseQuery(
    getMonthOrdersAmountQuery()
  );

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-semibold text-base">Pedidos (mês)</CardTitle>
        <UtensilsIcon className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="grid gap-1">
        <span className="font-bold text-2xl tracking-tight">
          {monthOrdersAmount.amount}
        </span>
        <p className="text-muted-foreground text-xs">
          {monthOrdersAmount.diffFromLastMonth >= 0 ? (
            <span className="text-emerald-500 dark:text-emerald-400">
              +{monthOrdersAmount.diffFromLastMonth}%
            </span>
          ) : (
            <span className="text-rose-500 dark:text-rose-400">
              {monthOrdersAmount.diffFromLastMonth}%
            </span>
          )}{' '}
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  );
}
