import { ArrowUpRight } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';

interface ExternalLinkProps extends PropsWithChildren {
  href: string;
  icon?: ReactNode;
}

export function ExternalLink({ href, icon, children }: ExternalLinkProps) {
  const external = href.startsWith('http');

  return (
    <a className="text-link" href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
      {icon}
      {children}
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}
