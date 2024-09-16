"use client";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import type { Metadata } from 'next';
import * as React from 'react';

import { CategoryFilters } from '@/components/dashboard/category/category-filter';
import type { Category } from '@/components/dashboard/category/category-table';
import { CategoriesTable } from '@/components/dashboard/category/category-table';
import { addCategory, fetchCategories } from '@/lib/admin/api-calls';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Filters } from '@/components/dashboard/seller/seller-filter';

// export const metadata = { title: `Categories | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState('');
  const [totalcategory, setTotalCategory] = React.useState(0);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryName(''); // Clear the input field when closing
  };

  const handleSubmit = async () => {
    if (categoryName.trim()) {
      await addCategory(categoryName);
      handleClose(); // Close the modal after submission
      await handleUpdateCategories();
    }
  };
  const loadCategories = async () => {
    const { categories, total } = await fetchCategories(page + 1, rowsPerPage);
    setCategories(categories);
    setTotalCategory(total)
  };

  const handleUpdateCategories = async () => {
    await loadCategories(); // Refetch categories
  };

  React.useEffect(() => {
    loadCategories();
  }, [ page, rowsPerPage]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );
 
  const paginatedCustomers = applyPagination(categories, page, rowsPerPage);

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Categories</Typography>
          </Stack>
          <div>
            <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={handleClickOpen}>
              Add
            </Button>
          </div>
        </Stack>
        <Filters setSearchTerm={setSearchTerm} />
        <CategoriesTable
          count={totalcategory} // Use totalProducts for count
          page={page}
          rowsPerPage={rowsPerPage}
          rows={filteredCategories} // Use the full list of products
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          updateCategories={handleUpdateCategories} // Pass the callback
        />
      </Stack>
      {/* Modal for adding a new category */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function applyPagination(rows: Category[], page: number, rowsPerPage: number): Category[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
