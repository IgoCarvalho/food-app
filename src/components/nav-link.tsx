import { Link, type LinkProps } from '@tanstack/react-router';

type NavLinkProps = LinkProps;

export function NavLink(props: NavLinkProps) {
  return (
    <Link
      className="flex items-center gap-1.5 font-medium text-muted-foreground text-sm hover:text-foreground data-[status=active]:text-foreground"
      {...props}
    />
  );
}
