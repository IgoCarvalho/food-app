import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { BuildingIcon, ChevronDown, LogOutIcon } from 'lucide-react';
import { getManagedRestaurantQuery } from '@/api/get-managed-restaurant';
import { getProfileQuery } from '@/api/get-profile';
import { signOut } from '@/api/sign-out';
import { StoreProfileDialog } from './store-profile-dialog';
import { Button } from './ui/button';
import { Dialog, DialogTrigger } from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export function AccountMenu() {
  const navigate = useNavigate();

  const { data: profile, isLoading: isProfileLoading } = useQuery(
    getProfileQuery()
  );
  const { data: managedRestaurant, isLoading: isManagedRestaurantLoading } =
    useQuery(getManagedRestaurantQuery());

  const { isPending: isSigningOut, mutateAsync: handleSignOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate({ to: '/sign-in', replace: true });
    },
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex select-none items-center gap-2"
            variant="outline"
          >
            {isManagedRestaurantLoading ? (
              <Skeleton className="h-4 w-30" />
            ) : (
              managedRestaurant?.name
            )}
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col gap-1">
            {isProfileLoading ? (
              <>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="block font-normal text-muted-foreground text-xs">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <BuildingIcon className="size-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            asChild
            className="w-full text-rose-500 dark:text-rose-400"
            disabled={isSigningOut}
          >
            <button onClick={() => handleSignOut()} type="button">
              <LogOutIcon className="size-4 text-current" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  );
}
