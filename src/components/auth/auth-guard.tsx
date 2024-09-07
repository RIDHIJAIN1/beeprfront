'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
// import Alert from '@mui/material/Alert';

import { paths } from '@/paths';
// import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  React.useEffect(() => {
    console.debug('AuthGuard: Checking user...', { user, error, isLoading });

    if (isLoading) {
      return;
    }

    if (!user || error) {
      console.debug('AuthGuard: User is not logged in, redirecting...');
      // console.error('AuthGuard: Error occurred', error);
      router.replace(paths.auth.signIn);
      return;
    }

    console.debug('AuthGuard: User is logged in, allowing access');
  }, [user, error, isLoading, router]);

  if (isLoading || !user) {
    return null; // Or a loading spinner
  }

  return <React.Fragment>{children}</React.Fragment>;
}

