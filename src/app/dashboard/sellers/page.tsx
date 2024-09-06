"use client";
import { SellersFilters } from '@/components/dashboard/seller/seller-filter';
import type { Seller } from '@/components/dashboard/seller/seller-table';
import { SellersTable } from '@/components/dashboard/seller/seller-table';
import { approveSeller, fetchSellers, } from '@/lib/admin/api-calls';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';


export default function Page(): React.JSX.Element {
  const [sellers, setSellers] = React.useState<Seller[]>([]);
  const page = 0;
  const rowsPerPage = 5;

  React.useEffect(() => {
      const loadSellers = async () => {
          const fetchedSellers = await fetchSellers();
          console.log(fetchedSellers); // Check what is being fetched
          if (Array.isArray(fetchedSellers)) {
              setSellers(fetchedSellers);
          } else {
              console.error("Fetched sellers is not an array", fetchedSellers);
          }
      };
      loadSellers();
  }, []);

  const handleApprove = async (sellerId: Object, currentStatus: boolean) => {
    // Call the API to toggle the approval status
    const response = await approveSeller(sellerId, currentStatus);

    if (response) {
        // If the API call succeeds, update the state to reflect the new approval status
        setSellers((prevSellers) =>
            prevSellers.map((seller) =>
                seller.id === sellerId ? { ...seller, isApproved: !currentStatus } : seller
            )
        );
    } else {
        console.error("Failed to update approval status");
    }
};


  const paginatedCustomers = applyPagination(sellers, page, rowsPerPage);

  return (
      <Stack spacing={3}>
          <Stack direction="row" spacing={3}>
                  <Typography variant="h4">Sellers</Typography>
          </Stack>
          <SellersFilters />
          <SellersTable
              count={paginatedCustomers.length}
              page={page}
              rows={paginatedCustomers}
              rowsPerPage={rowsPerPage}
          />
      </Stack>
  );
}
function applyPagination(rows: Seller[] = [], page: number, rowsPerPage: number): Seller[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}