import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

const data = [
  { date: '10/12', revenue: 1240 },
  { date: '11/12', revenue: 1280 },
  { date: '12/12', revenue: 1320 },
  { date: '13/12', revenue: 1160 },
  { date: '14/12', revenue: 930 },
  { date: '15/12', revenue: 1440 },
  { date: '16/12', revenue: 1280 },
  { date: '17/12', revenue: 1120 },
  { date: '18/12', revenue: 1560 },
  { date: '19/12', revenue: 1600 },
];

export function RevenueChart() {
  function formatToCurrency(value: number) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <Card className="col-span-6">
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="font-medium text-base">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex items-start">
        <ChartContainer className="h-[240px] w-full" config={{}}>
          <LineChart data={data}>
            <XAxis axisLine={false} dataKey="date" dy={16} tickLine={false} />

            <YAxis
              axisLine={false}
              tickFormatter={formatToCurrency}
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
      </CardContent>
    </Card>
  );
}
