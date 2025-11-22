'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';
import { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';

interface BreadcrumbItemData {
  label: string;
  href: string;
}

// Map route segments to friendly labels
const ROUTE_LABELS: Record<string, string> = {
  'how-it-works': 'How It Works',
  'physical-build': 'Physical Build Guide',
  'image-selection': 'Image Selection',
  'export-formats': 'Export Formats',
  'use-cases': 'Use Cases',
};

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on home or editor
  if (pathname === '/' || pathname === '/editor') {
    return null;
  }

  const pathSegments = pathname.split('/').filter(Boolean);

  // Build breadcrumb items
  const breadcrumbs: BreadcrumbItemData[] = [{ label: 'Home', href: '/' }];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;

    // Use custom label if available, otherwise format segment
    const label =
      ROUTE_LABELS[segment] ||
      segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  return (
    <div className='py-3 px-4 border-b bg-muted/30'>
      <div className='container mx-auto max-w-6xl'>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              const isHome = index === 0;

              return (
                <Fragment key={crumb.href}>
                  <BreadcrumbItem>
                    {isHome ? (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href} aria-label='Home'>
                          <Home className='h-4 w-4' />
                        </Link>
                      </BreadcrumbLink>
                    ) : isLast ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {!isLast && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
