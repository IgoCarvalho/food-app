import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import {
  createFileRoute,
  ErrorComponent,
  type ErrorComponentProps,
  useRouter,
} from '@tanstack/react-router';
import { Suspense, useEffect } from 'react';
import { pageTitleTemplate } from '@/lib/page-title-template';
import { CardErrorHandler } from './-components/card-error-handler';
import { CardLoadingSkeleton } from './-components/card-loading-skeleton';
import { ChartLoadingSkeleton } from './-components/chart-loading-skeleton';
import { DashboardCardWrapper } from './-components/dashboard-card-wrapper';
import { DayOrdersAmountCard } from './-components/day-orders-amount-card';
import { MonthCanceledOrdersAmountCard } from './-components/month-canceled-orders-amount-card';
import { MonthOrdersAmountCard } from './-components/month-orders-amount-card';
import { MonthRevenueCard } from './-components/month-revenue-card';
import { PopularProductsChart } from './-components/popular-products-chart';
import { RevenueChart } from './-components/revenue-chart';

export const Route = createFileRoute('/_app/_dashboard/')({
  component: IndexPage,
  errorComponent: DashboardErrorComponent,
});

function IndexPage() {
  return (
    <>
      <title>{pageTitleTemplate('Dashboard')}</title>

      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <DashboardCardWrapper>
            <Suspense fallback={<CardLoadingSkeleton />}>
              <MonthRevenueCard />
            </Suspense>
          </DashboardCardWrapper>
          <DashboardCardWrapper>
            <Suspense fallback={<CardLoadingSkeleton />}>
              <MonthOrdersAmountCard />
            </Suspense>
          </DashboardCardWrapper>
          <DashboardCardWrapper>
            <Suspense fallback={<CardLoadingSkeleton />}>
              <DayOrdersAmountCard />
            </Suspense>
          </DashboardCardWrapper>
          <DashboardCardWrapper>
            <Suspense fallback={<CardLoadingSkeleton />}>
              <MonthCanceledOrdersAmountCard />
            </Suspense>
          </DashboardCardWrapper>
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <DashboardCardWrapper className="col-span-3">
            <Suspense
              fallback={<ChartLoadingSkeleton className="col-span-3" />}
            >
              <PopularProductsChart />
            </Suspense>
          </DashboardCardWrapper>
        </div>
      </div>
    </>
  );
}

export function DashboardErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter();

  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div className="flex flex-col gap-2">
      <ErrorComponent error={error} />

      <CardErrorHandler
        className="mx-auto w-80"
        onClick={() => {
          router.invalidate();
        }}
      />
    </div>
  );
}
