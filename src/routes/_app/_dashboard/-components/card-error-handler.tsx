import { AlertCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CardErrorHandlerProps {
  onClick: () => void;
}

export function CardErrorHandler({
  onClick,
  ...props
}: React.ComponentProps<'div'> & CardErrorHandlerProps) {
  return (
    <Card {...props}>
      <CardHeader className="flex justify-between gap-1">
        <CardTitle>Error ao carregar</CardTitle>
        <AlertCircleIcon className="size-5" />
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Button onClick={onClick} variant="outline">
          Tentar novamente
        </Button>
      </CardContent>
    </Card>
  );
}
