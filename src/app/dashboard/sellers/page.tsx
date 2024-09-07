"use client";
import { SellersFilters } from '@/components/dashboard/seller/seller-filter';
import type { Seller } from '@/components/dashboard/seller/seller-table';
import { SellersTable } from '@/components/dashboard/seller/seller-table';
import { fetchSellers } from '@/lib/admin/api-calls';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';


export default function Page(): React.JSX.Element {
    const [sellers, setSellers] = React.useState<Seller[]>([]);
    const page = 0;
    const rowsPerPage = 10;

    const loadSellers = async () => {
        const fetchedSellers = await fetchSellers();
        console.log(fetchedSellers); // Check what is being fetched
        if (Array.isArray(fetchedSellers)) {
            setSellers(fetchedSellers);
        } else {
            console.error("Fetched sellers is not an array", fetchedSellers);
        }
    };
    const handleUpdateSellers = async () => {
        await loadSellers(); // Refetch categories
    };

    React.useEffect(() => {
        loadSellers();
    }, []);

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
                updateSellers={handleUpdateSellers}
            />
        </Stack>
    );
}
function applyPagination(rows: Seller[] = [], page: number, rowsPerPage: number): Seller[] {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}