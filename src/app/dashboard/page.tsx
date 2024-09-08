"use client";

import { CountCard } from '@/components/dashboard/overview/count-card';
import { useUser } from '@/hooks/use-user';
import { fetchAdminCount } from '@/lib/admin/api-calls';
import Grid from '@mui/material/Unstable_Grid2';
import { ListBullets as ListBulletsIcon } from '@phosphor-icons/react/dist/ssr/ListBullets';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import * as React from 'react';
// import { config } from '@/config';
// import type { Metadata } from 'next';
// export const metadata = { title: `Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const { user } = useUser();
  if (!user) {
    return <div>You must be logged in to view this content.</div>;
  }
  // console.log(user);
  let sellerIsApproved = user.role == 'seller' ? ('isApproved' in user ? user.isApproved : "pending") : "";
  const [adminCounts, setAdminCounts] = React.useState({ userCount: 0, sellerCount: 0, productCount: 0 });
  // const [sellerCounts, setSellerCounts] = React.useState({ productCount: 0 });

  const loadCount = async () => {
    if (user.role == 'admin') {
      const fetchedCount = await fetchAdminCount();
      if (fetchedCount)
        setAdminCounts(fetchedCount);
    }
    // if (user.role == 'seller') {
    //   const fetchedCount = await fetchSellerCount();
    //   if (fetchedCount)
    //     setSellerCounts(fetchedCount);
    // }
  };

  React.useEffect(() => {
    loadCount();
  }, []);

  return (
    <>
      {sellerIsApproved == "pending" ? (
        <div className='container mb-16'>
          <div className='w-full text-center text-red-500'>
            You need to complete your profile first!
          </div>
        </div>
      ) : ""}

      {user.role == 'admin' ? (
        <Grid container spacing={3}>
          <Grid lg={4} sm={6} xs={12}>
            <CountCard text="Total Customers" value={`${adminCounts.userCount}`} icon={<UsersIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-primary-main)'} />
          </Grid>
          <Grid lg={4} sm={6} xs={12}>
            <CountCard text="Total Sellers" value={`${adminCounts.sellerCount}`} icon={<ListBulletsIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-warning-main)'} />
          </Grid>
          <Grid lg={4} sm={6} xs={12}>
            <CountCard text="Products Listed" value={`${adminCounts.productCount}`} icon={<ReceiptIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-success-main)'} />
          </Grid>
          {/* <Grid lg={3} sm={6} xs={12}>
            <CountCard text="Orders Placed" value="24k+" icon={<CurrencyDollarIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-primary-main)'} />
          </Grid> */}

        </Grid>
      ) : ""}

    </>
  );
}
