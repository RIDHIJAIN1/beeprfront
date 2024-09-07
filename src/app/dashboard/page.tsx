"use client";

import Grid from '@mui/material/Unstable_Grid2';
// import type { Metadata } from 'next';
import * as React from 'react';

import { CountCard } from '@/components/dashboard/overview/count-card';
import { fetchCount } from '@/lib/admin/api-calls';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { ListBullets as ListBulletsIcon } from '@phosphor-icons/react/dist/ssr/ListBullets';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
// import { UserContext } from '@/contexts/user-context';
// export const metadata = { title: `Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const [counts, setCounts] = React.useState({
    userCount: 0,
    sellerCount: 0,
    productCount: 0
  });
  // const userContext = React.useContext(UserContext); // Access user from context
  // if (!userContext) return (<div>Error: User context is not available</div>);
  // const { user } = userContext;
  // console.log(user);

  const loadCount = async () => {
    const fetchedCount = await fetchCount();
    if (fetchedCount) {
      setCounts(fetchedCount);
    }
  };

  React.useEffect(()=>{
    loadCount();
  },[]);

  return (
    <>
      {/* <div className='container mb-16'>
        <div className='w-full text-center text-red-500'>
          You need to complete your profile first!
        </div>
      </div> */}
      {/* {user.role == 'admin' ? ( */}

      <Grid container spacing={3}>
        <Grid lg={3} sm={6} xs={12}>
          <CountCard text="Total Customers" value={`${counts.userCount}`} icon={<UsersIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-primary-main)'} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <CountCard text="Total Sellers" value={`${counts.sellerCount}`} icon={<ListBulletsIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-warning-main)'} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <CountCard text="Products Listed"  value={`${counts.productCount}`} icon={<ReceiptIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-success-main)'} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <CountCard text="Orders Placed" value="24k+" icon={<CurrencyDollarIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-primary-main)'} />
        </Grid>

      </Grid>
      {/* ): ""} */}

    </>
  );
}
