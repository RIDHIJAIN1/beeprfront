import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import * as React from 'react';

import { UpdatePasswordForm } from '@/components/dashboard/settings/update-password-form';
import { config } from '@/config';

export const metadata = { title: `Settings | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Settings</Typography>
      </div>
      {/* <Notifications /> */}
      <UpdatePasswordForm />
    </Stack>
  );
}
