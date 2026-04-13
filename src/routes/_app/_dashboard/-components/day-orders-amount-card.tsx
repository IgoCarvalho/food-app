import { useSuspenseQuery } from '@tanstack/react-query';
import { UtensilsIcon } from 'lucide-react';
import { getDayOrdersAmountQuery } from '@/api/get-day-orders-amount';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount } = useSuspenseQuery(getDayOrdersAmountQuery());

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-semibold text-base">Pedidos (dia)</CardTitle>
        <UtensilsIcon className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="grid gap-1">
        <span className="font-bold text-2xl tracking-tight">
          {dayOrdersAmount.amount}
        </span>
        <p className="text-muted-foreground text-xs">
          {dayOrdersAmount.diffFromYesterday >= 0 ? (
            <span className="text-emerald-500 dark:text-emerald-400">
              +{dayOrdersAmount.diffFromYesterday}%
            </span>
          ) : (
            <span className="text-rose-500 dark:text-rose-400">
              {dayOrdersAmount.diffFromYesterday}%
            </span>
          )}{' '}
          em relação a ontem
        </p>
      </CardContent>
    </Card>
  );
}
