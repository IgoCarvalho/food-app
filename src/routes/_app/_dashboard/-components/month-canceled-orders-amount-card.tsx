import { useSuspenseQuery } from '@tanstack/react-query';
import { DollarSignIcon } from 'lucide-react';
import { getMonthCanceledOrdersAmountQuery } from '@/api/get-month-canceled-orders-amount';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrdersAmount } = useSuspenseQuery(
    getMonthCanceledOrdersAmountQuery()
  );

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-semibold text-base">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSignIcon className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="grid gap-1">
        <span className="font-bold text-2xl tracking-tight">
          {monthCanceledOrdersAmount.amount}
        </span>
        <p className="text-muted-foreground text-xs">
          {monthCanceledOrdersAmount.diffFromLastMonth <= 0 ? (
            <span className="text-emerald-500 dark:text-emerald-400">
              {monthCanceledOrdersAmount.diffFromLastMonth}%
            </span>
          ) : (
            <span className="text-rose-500 dark:text-rose-400">
              +{monthCanceledOrdersAmount.diffFromLastMonth}%
            </span>
          )}{' '}
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  );
}
