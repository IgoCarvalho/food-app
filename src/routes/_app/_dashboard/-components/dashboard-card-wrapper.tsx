import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { CardErrorHandler } from './card-error-handler';

export function DashboardCardWrapper({
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <CardErrorHandler {...props} onClick={resetErrorBoundary} />
          )}
          onReset={reset}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
