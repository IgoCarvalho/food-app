import { BarChartIcon } from 'lucide-react';
import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const data = [
  { product: 'Peperoni', amount: 38, fill: 'var(--color-sky-400)' },
  { product: 'Calabresa', amount: 16, fill: 'var(--color-amber-400)' },
  { product: 'Mussarela', amount: 24, fill: 'var(--color-emerald-400)' },
  { product: 'Frango', amount: 18, fill: 'var(--color-violet-400)' },
  { product: 'Bacon', amount: 9, fill: 'var(--color-rose-400)' },
];

const chartConfig = {
  Peperoni: {
    label: 'Peperoni',
    color: 'var(--color-sky-400)',
  },
  Calabresa: {
    label: 'Calabresa',
    color: 'var(--color-amber-400)',
  },
  Mussarela: {
    label: 'Mussarela',
    color: 'var(--color-emerald-400)',
  },
  Frango: {
    label: 'Frango',
    color: 'var(--color-violet-400)',
  },
  Bacon: {
    label: 'Bacon',
    color: 'var(--color-rose-400)',
  },
} satisfies ChartConfig;

export function PopularProductsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-medium text-base">
          Produtos populares
        </CardTitle>

        <BarChartIcon className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="flex items-start">
        <ChartContainer
          className="h-[250px] w-full pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              cx={'50%'}
              cy={'50%'}
              data={data}
              dataKey="amount"
              innerRadius={64}
              label={(pieData) => `${pieData.product} (${pieData.amount})`}
              labelLine={false}
              nameKey="product"
              outerRadius={86}
              paddingAngle={5}
              strokeWidth={8}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
