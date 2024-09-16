'use client';

import { changeStatusCategory, updateCategory } from '@/lib/admin/api-calls';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import * as React from 'react';
import { FaExchangeAlt, FaPencilAlt } from "react-icons/fa";

function noop(): void {
  // do nothing
}

export interface Category {
  id: string;
  avatar: string;
  status: boolean;
  name: string;
  createdAt: Date;
}

interface CategoriesTableProps {
  count?: number;
  page?: number;
  rows?: Category[];
  rowsPerPage?: number;
  updateCategories: () => Promise<void>;
  onEditRow?: (row: Category) => void;
  onDeleteRow?: (row: Category) => void;
  onPageChange: (event: React.MouseEvent |null, page: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function CategoriesTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  updateCategories,
  onPageChange,
  onRowsPerPageChange,
}: CategoriesTableProps): React.JSX.Element {

  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openChangeStatusDialog, setOpenChangeStatusDialog] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = React.useState('');

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setNewCategoryName(category.name);
    setOpenEditModal(true);
  };

  const handleChangeStatusClick = (category: Category) => {
    setSelectedCategory(category);
    setOpenChangeStatusDialog(true);
  };

  const handleEditSubmit = async () => {
    if (selectedCategory) {
      await updateCategory(selectedCategory.id, newCategoryName);
      setOpenEditModal(false);
      setSelectedCategory(null);
      await updateCategories();
    }
  };

  const handleChangeStatusConfirm = async () => {
    if (selectedCategory) {
      await changeStatusCategory(selectedCategory.id);
      setOpenChangeStatusDialog(false);
      setSelectedCategory(null);
      await updateCategories();
    }
  };


  const rowIds = React.useMemo(() => {
    return rows.map((product) => product.id);
  }, [rows]);

  return (
    <>
      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: '800px' }}>
            <TableHead>
              <TableRow>
              <TableCell>S No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row , index) => {
                return (
                  <TableRow hover key={row.id}>
                     <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                        {/* <Avatar src={row.avatar} /> */}
                        <Typography variant="subtitle2">{row.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{dayjs(row.createdAt).format('D MMM, YYYY')}</TableCell>
                    <TableCell>{row.status ? (<span className='text-green-500'>Active</span>) : (<span className='text-red-500'>Inactive</span>)}</TableCell>
                    <TableCell sx={{ fontSize: '30px' }}>
                      <div className='flex gap-3'>
                        <FaPencilAlt
                          title='Edit Category'
                          className='p-2 shadow-md text-blue-500'
                          onClick={() => handleEditClick(row)}
                        />
                        <FaExchangeAlt
                          title='Change Category Status'
                          className='p-2 shadow-md text-red-500'
                          onClick={() => handleChangeStatusClick(row)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Divider />
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      {/* Edit Category Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} color="primary">Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* ChangeStatus Confirmation Dialog */}
      <Dialog open={openChangeStatusDialog} onClose={() => setOpenChangeStatusDialog(false)}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to change status of this category?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenChangeStatusDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleChangeStatusConfirm} color="primary">Change</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
