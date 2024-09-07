import Grid from '@mui/material/Unstable_Grid2';
import type { Metadata } from 'next';
import * as React from 'react';

import { CountCard } from '@/components/dashboard/overview/count-card';
import { config } from '@/config';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { ListBullets as ListBulletsIcon } from '@phosphor-icons/react/dist/ssr/ListBullets';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <CountCard text="Total Customers" value="1.6k" icon={<UsersIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-primary-main)'} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <CountCard text="Total Sellers" value="10k+" icon={<ListBulletsIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-warning-main)'} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <CountCard text="Products Listed" value="100+" icon={<ReceiptIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-success-main)'} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <CountCard text="Orders Placed" value="24k+" icon={<CurrencyDollarIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-primary-main)'} />
      </Grid>

    </Grid>
  );
}
