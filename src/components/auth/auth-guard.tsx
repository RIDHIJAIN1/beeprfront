'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = React.useCallback(async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error) {
      console.error('[AuthGuard]: An error occurred:', error);
      setIsChecking(false);
      return;
    }

    if (!user) {
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');
      router.replace(paths.auth.signIn);
      return;
    }

    setIsChecking(false);
  }, [isLoading, error, user, router]);

  React.useEffect(() => {
    checkPermissions().catch((err) => {
      console.error('Error in checkPermissions:', err);
    });
  }, [checkPermissions]);

  if (isChecking) {
    console.log('AuthGuard is checking permissions...');
    return null;
  }

  if (error) {
    return <Alert color="error">An error occurred: {JSON.stringify(error)}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
