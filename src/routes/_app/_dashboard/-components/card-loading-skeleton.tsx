import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CardLoadingSkeleton() {
  return (
    <Card>
      <CardHeader className="flex justify-between gap-1">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="size-5" />
      </CardHeader>
      <CardContent className="grid gap-1">
        <Skeleton className="mt-1 h-7 w-36" />
        <Skeleton className="h-4 w-52" />
      </CardContent>
    </Card>
  );
}
