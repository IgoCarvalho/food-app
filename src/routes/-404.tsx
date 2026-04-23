import { Link } from '@tanstack/react-router';

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-4xl">Página não encontrada</h1>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link className="text-primary" to="/">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
