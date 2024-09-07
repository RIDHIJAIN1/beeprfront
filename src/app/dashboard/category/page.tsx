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

// export const metadata = { title: `Categories | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState('');
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
    const fetchedCategories = await fetchCategories();
    setCategories(fetchedCategories);
  };

  const handleUpdateCategories = async () => {
    await loadCategories(); // Refetch categories
  };

  React.useEffect(() => {
    loadCategories();
  }, []);
  const page = 0;
  const rowsPerPage = 10;
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
        <CategoryFilters />
        <CategoriesTable
          count={paginatedCustomers.length}
          page={page}
          rows={paginatedCustomers}
          rowsPerPage={rowsPerPage}
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
