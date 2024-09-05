"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { config } from '@/config';
import { SellersFilters } from '@/components/dashboard/seller/sellerfilter';
import { SellersTable } from '@/components/dashboard/seller/sellertable';
import type { Seller } from '@/components/dashboard/seller/sellertable';
import { approveSeller, fetchSellers , } from '@/lib/admin/api-calls';


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

  const handleApprove = async (sellerId: ObjectId, currentStatus: boolean) => {
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
              <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                  <Typography variant="h4">Sellers</Typography>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
                          Import
                      </Button>
                      <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
                          Export
                      </Button>
                  </Stack>
              </Stack>
              <div>
                  <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
                      Add
                  </Button>
              </div>
          </Stack>
          <SellersFilters />
          <SellersTable
              count={paginatedCustomers.length}
              page={page}
              rows={paginatedCustomers}
              rowsPerPage={rowsPerPage}
              onApprove={handleApprove} // Pass the handleApprove function as a prop
          />
      </Stack>
  );
}
function applyPagination(rows: Seller[] = [], page: number, rowsPerPage: number): Seller[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}