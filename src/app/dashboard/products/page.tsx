"use client";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import * as React from 'react';

import { ProductFilters } from '@/components/dashboard/product/product-filter';
import type { Product } from '@/components/dashboard/product/product-table';
import { ProductsTable } from '@/components/dashboard/product/product-table';
import { fetchProducts } from '@/lib/admin/api-calls';

// export const metadata = { title: `Products | Dashboard | ${config.site.name}` } satisfies Metadata;

const products = fetchProducts();

export default function Page(): React.JSX.Element {

  const [products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    const loadProducts = async () => {
      const fetchedProduct = await fetchProducts();
      setProducts(fetchedProduct);
    };
    loadProducts();
  }, []);

  const page = 0;
  const rowsPerPage = 10;

  const paginatedCustomers = applyPagination(products, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Products</Typography>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <ProductFilters />
      <ProductsTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Product[], page: number, rowsPerPage: number): Product[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
