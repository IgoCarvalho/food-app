import { HomeIcon, PizzaIcon, UtensilsCrossedIcon } from 'lucide-react';
import { AccountMenu } from './account-menu';
import { NavLink } from './nav-link';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';

interface HeaderProps {
  hideAccountMenu?: boolean;
}

export function Header({ hideAccountMenu }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-8">
        <PizzaIcon className="size-6" />

        <Separator orientation="vertical" />

        <nav className="flex items-center gap-4 lg:gap-6">
          <NavLink to="/">
            <HomeIcon className="size-4" />
            Inicio
          </NavLink>
          <NavLink to="/orders">
            <UtensilsCrossedIcon className="size-4" />
            Pedidos
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          {hideAccountMenu ? (
            <Button
              className="flex select-none items-center gap-2"
              variant="outline"
            >
              <Skeleton className="h-4 w-30" />
            </Button>
          ) : (
            <AccountMenu />
          )}
        </div>
      </div>
    </header>
  );
}
