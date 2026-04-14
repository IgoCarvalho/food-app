import { useSuspenseQuery } from '@tanstack/react-query';
import { BarChartIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Pie, PieChart } from 'recharts';
import { getPopularProductsQuery } from '@/api/get-popular-products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const availableColors = [
  'var(--color-sky-400)',
  'var(--color-amber-400)',
  'var(--color-emerald-400)',
  'var(--color-violet-400)',
  'var(--color-rose-400)',
] as const;

interface ChartData {
  product: string;
  amount: number;
  fill: string;
}

export function PopularProductsChart() {
  const {
    data: { popularProducts },
  } = useSuspenseQuery(getPopularProductsQuery());

  const { _chartData: chartData, _chartConfig: chartConfig } = useMemo(() => {
    const _chartData: ChartData[] = [];

    const _chartConfig: ChartConfig = {};

    for (const [index, product] of popularProducts.entries()) {
      if (!product.product) {
        continue;
      }

      _chartData.push({
        product: product.product,
        amount: product.amount,
        fill: availableColors[index % availableColors.length],
      });

      _chartConfig[product.product] = {
        label: product.product,
        color: availableColors[index % availableColors.length],
      };
    }

    return { _chartData, _chartConfig };
  }, [popularProducts]);

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
              data={chartData}
              dataKey="amount"
              innerRadius={64}
              label={(pieData) => `${pieData.product} - (${pieData.amount})`}
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
