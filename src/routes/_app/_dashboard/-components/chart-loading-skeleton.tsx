import { Loader2Icon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function ChartLoadingSkeleton({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <Card
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
    </Card>
  );
}
