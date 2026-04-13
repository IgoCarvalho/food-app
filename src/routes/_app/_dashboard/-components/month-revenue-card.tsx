import { useSuspenseQuery } from '@tanstack/react-query';
import { DollarSignIcon } from 'lucide-react';
import { getMonthRevenueQuery } from '@/api/get-month-revenue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrencyToBrl } from '@/lib/format-currency';

export function MonthRevenueCard() {
  const { data: monthRevenue } = useSuspenseQuery(getMonthRevenueQuery());

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-semibold text-base">
          Receita total (mês)
        </CardTitle>
        <DollarSignIcon className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="grid gap-1">
        <span className="font-bold text-2xl tracking-tight">
          {formatCurrencyToBrl(monthRevenue.revenue / 100)}
        </span>
        <p className="text-muted-foreground text-xs">
          {monthRevenue.diffFromLastMonth >= 0 ? (
            <span className="text-emerald-500 dark:text-emerald-400">
              +{monthRevenue.diffFromLastMonth}%
            </span>
          ) : (
            <span className="text-rose-500 dark:text-rose-400">
              {monthRevenue.diffFromLastMonth}%
            </span>
          )}
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  );
}
