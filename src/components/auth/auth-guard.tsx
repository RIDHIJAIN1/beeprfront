'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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

    if (error) {
      console.error('AuthGuard: Error occurred', error);
      return;
    }

    if (!user) {
      console.debug('AuthGuard: User is not logged in, redirecting...');
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

