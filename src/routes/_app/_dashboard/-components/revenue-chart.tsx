import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Loader2Icon } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { getDailyRevenueInPeriodQuery } from '@/api/get-daily-revenue-in-period';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { formatCurrencyToBrl } from '@/lib/format-currency';

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => ({
    from: dayjs(new Date()).subtract(7, 'day').toDate(),
    to: new Date(),
  }));

  const { data, isLoading } = useQuery(
    getDailyRevenueInPeriodQuery({
      from: dateRange?.from,
      to: dateRange?.to,
    })
  );

  const revenuePerDay = useMemo(
    () =>
      data?.revenuePerDay
        .map((item) => ({
          date: dayjs(item.date).format('DD/MM'),
          revenue: item.revenue / 100,
        }))
        .reverse(),
    [data?.revenuePerDay]
  );

  return (
    <Card className="col-span-6">
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="font-medium text-base">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>

      <CardContent className="flex min-h-60 flex-1 items-center justify-center">
        {isLoading ? (
          <Loader2Icon className="size-10 animate-spin" />
        ) : (
          <ChartContainer className="h-[240px] w-full" config={{}}>
            <LineChart data={revenuePerDay}>
              <XAxis axisLine={false} dataKey="date" dy={16} tickLine={false} />

              <YAxis
                axisLine={false}
                tickFormatter={formatCurrencyToBrl}
                tickLine={false}
                width={80}
              />

              <CartesianGrid vertical={false} />

              <Line
                className="stroke-violet-500"
                dataKey="revenue"
                stroke="inherit"
                strokeWidth={2}
                type="linear"
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
