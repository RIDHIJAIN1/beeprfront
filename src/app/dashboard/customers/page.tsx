"use client";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import type { Metadata } from 'next';
import * as React from 'react';

import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { fetchCustomers } from '@/lib/admin/api-calls';


// export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers = fetchCustomers();

export default function Page(): React.JSX.Element {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  React.useEffect(() => {
    const loadCustomers = async () => {
      const fetchedCustomers = await fetchCustomers();
      setCustomers(fetchedCustomers);
    };
    loadCustomers();
  }, []);

  const page = 0;
  const rowsPerPage = 10;
  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Users</Typography>
        </Stack>
        {/* <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div> */}
      </Stack>
      <CustomersFilters />
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
