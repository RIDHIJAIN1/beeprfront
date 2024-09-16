"use client";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { fetchCustomers } from '@/lib/admin/api-calls';
import { Filters } from '@/components/dashboard/seller/seller-filter';

export default function Page(): React.JSX.Element {
    const [customers, setCustomers] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalCustomer, setTotalCustomer] = React.useState(0);
    const [ searchTerm , setSearchTerm] = React.useState('');

    React.useEffect(() => {
        const loadCustomers = async () => {
            try {
                const { users, total, totalPages } = await fetchCustomers(page + 1, rowsPerPage);
                setCustomers(users); // Set the fetched users
                setTotalCustomer(total); // Set the total count of customers
            } catch (error) {
                console.error("Error loading customers:", error);
            }
        };
        loadCustomers();
    }, [page, rowsPerPage]);

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = parseInt(event.target.value, 10);
        setRowsPerPage(value);
        setPage(0); // Reset to the first page after changing the number of rows per page
    };
    

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Customers</Typography>
                </Stack>
            </Stack>
            <Filters setSearchTerm={setSearchTerm}/>
            <CustomersTable
                count={totalCustomer} // Total number of customers
                page={page}
                rowsPerPage={rowsPerPage}
                rows={filteredCustomers} // Pass the customers array
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </Stack>
    );
}