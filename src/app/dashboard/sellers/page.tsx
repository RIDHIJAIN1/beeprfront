"use client";
import { Filters } from '@/components/dashboard/seller/seller-filter';
import type { Seller } from '@/components/dashboard/seller/seller-table';
import { SellersTable } from '@/components/dashboard/seller/seller-table';
import { fetchSellers } from '@/lib/admin/api-calls';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';


export default function Page(): React.JSX.Element {
    const [sellers, setSellers] = React.useState<Seller[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalSellers, setTotalSellers] = React.useState(0);
    const [ searchTerm , setSearchTerm] = React.useState('');

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
      
      // Handle Rows per page change
      const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = parseInt(event.target.value, 10);
        setRowsPerPage(value);
        setPage(0); // Reset to the first page after changing the number of rows per page
      };


      const loadSellers = async () => {
        try {
            const { sellers, total } = await fetchSellers(page + 1, rowsPerPage);
            console.log(sellers)
            setSellers(sellers); // Set the fetched users
            setTotalSellers(total); // Set the total count of customers
        } catch (error) {
            console.error("Error loading customers:", error);
        }
    };
    const handleUpdateSellers = async () => {
        await loadSellers(); // Refetch categories
    };

    React.useEffect(() => {
        loadSellers();
    }, [ page, rowsPerPage]);

    const filteredSellers = sellers.filter(seller =>
        seller.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const paginatedCustomers = applyPagination(sellers, page, rowsPerPage);

    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Typography variant="h4">Sellers</Typography>
            </Stack>
            <Filters setSearchTerm={setSearchTerm} />
            <SellersTable
                count={totalSellers}
                page={page}
                rows={filteredSellers}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                updateSellers={handleUpdateSellers}
            />
        </Stack>
    );
}
function applyPagination(rows: Seller[] = [], page: number, rowsPerPage: number): Seller[] {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}