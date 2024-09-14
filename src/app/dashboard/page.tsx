"use client";

import { CountCard } from '@/components/dashboard/overview/count-card';
import { useUser } from '@/hooks/use-user';
import { fetchAdminCount } from '@/lib/admin/api-calls';
import { ProductCountBySeller } from '@/lib/seller/api-calls';
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
  let sellerProfileMessage = user.role === 'seller' && !('isApproved' in user) 
  ? "You need to complete your profile first!" 
  : null;
  const [adminCounts, setAdminCounts] = React.useState({ userCount: 0, sellerCount: 0, productCount: 0 });
  const [productCounts, setProductCounts] = React.useState({ userCount: 0, sellerCount: 0, productCount: 0 });
  // const [sellerCounts, setSellerCounts] = React.useState({ productCount: 0 });

  const loadCount = async () => {
    // Ensure that the user exists and has a role before proceeding
    if (!user) return;
  
    // Check if the user is an admin and fetch admin counts
    if (user.role === 'admin') {
      try {
        const fetchedCount = await fetchAdminCount();
        if (fetchedCount) {
          setAdminCounts(fetchedCount);
        }
      } catch (error) {
        console.error('Failed to fetch admin count:', error);
      }
    }
  
    // Check if the user is an approved seller and fetch product counts by seller
    if (user.role === 'seller' && user.isApproved) {
      try {
        const fetchedCount = await ProductCountBySeller(user.userId);

        console.log(user)
        console.log(user.role)
        console.log(user.city)
        if (fetchedCount) {
          setProductCounts(fetchedCount);
        }
      } catch (error) {
        console.error('Failed to fetch seller product count:', error);
      }
    }
 
  };
  
  React.useEffect(() => {
    // Define async function inside useEffect
    const fetchCounts = async () => {
      await loadCount();
    };
  
    fetchCounts();
  }, [user]); 


  
  return (
    <>
      {sellerProfileMessage ? (
      <div className='container mb-16'>
        <div className='w-full text-center text-red-500'>
          {sellerProfileMessage}
        </div>
      </div>
    ) : null}
      {sellerIsApproved == "pending" ? (
        <div className='container mb-16'>
          <div className='w-full text-center text-red-500'>
            Your status is pending
          </div>
        </div>
      ) : ""}
      {sellerIsApproved == "rejected" ? (
        <div className='container mb-16'>
          <div className='w-full text-center text-red-500'>
            <h1 className='pb-5'>PROFILE REJECTED</h1>
          {user.message}
          </div>
        </div>
      ) : null}

{sellerIsApproved == "approved" ? (
        <div className='container mb-16'>
          <div className='w-full text-center text-red-500'>
          <a href="dashboard/products" style={{ textDecoration: 'none' }}>
          <CountCard text="Products Listed" value={`${productCounts.productCount}`} icon={<ReceiptIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-success-main)'} />
        </a>
          </div>
        </div>
      ) : ""}

      {user.role == 'admin' ? (
        <Grid container spacing={3}>
          <Grid lg={4} sm={6} xs={12}>
          <a href="dashboard/customers" style={{ textDecoration: 'none' }}>
    <CountCard 
      text="Total Customers" 
      value={`${adminCounts.userCount}`} 
      icon={<UsersIcon fontSize="var(--icon-fontSize-lg)" />} 
      iconBg={'var(--mui-palette-primary-main)'} 
    />
  </a>
          </Grid>
          <Grid lg={4} sm={6} xs={12}>
          <a href="dashboard/sellers" style={{ textDecoration: 'none' }}>
            <CountCard text="Total Sellers" value={`${adminCounts.sellerCount}`} icon={<ListBulletsIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-warning-main)'} />
             </a>
          </Grid>
          <Grid lg={4} sm={6} xs={12}>
          <a href="dashboard/products" style={{ textDecoration: 'none' }}>
            <CountCard text="Products Listed" value={`${adminCounts.productCount}`} icon={<ReceiptIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-success-main)'} />
           </a>
          </Grid>
          {/* <Grid lg={3} sm={6} xs={12}>
            <CountCard text="Orders Placed" value="24k+" icon={<CurrencyDollarIcon fontSize="var(--icon-fontSize-lg)" />} iconBg={'var(--mui-palette-primary-main)'} />
          </Grid> */}

        </Grid>
      ) : ""}

    </>
  );
}
