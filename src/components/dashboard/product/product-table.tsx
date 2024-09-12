'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { FaExchangeAlt, FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { deleteProduct, updateProduct } from '@/lib/seller/api-calls';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function noop(): void {
  // do nothing
}

export interface Product {
  id: string;
  title: string;
  image: string;
  name: string;
  weight: string;
  description: string;
  createdAt: Date;
}

interface ProductsTableProps {
  count?: number;
  page?: number;
  rows?: Product[];
  rowsPerPage?: number;
  onEditRow?: (row: Product) => void;
  onDeleteRow?: (row: Product) => void;
 
  
  
}

export function ProductsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  onEditRow,
  onDeleteRow,

}: ProductsTableProps): React.JSX.Element {
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setOpenEditModal(true);
  };
  
  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };
  
  const handleClose = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setSelectedProduct(null);
  };
  

  updateProduct ;deleteProduct
  const rowIds = React.useMemo(() => {
    return rows.map((sellerproduct) => sellerproduct.id);
  }, [rows]);

  return (
    <>
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>
                    <a className="text-pink-700" target="_blank" href={`${BACKEND_URL}/${row.image}`}>
                      Link
                    </a>
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell> {row.weight} kg</TableCell>
                  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell sx={{ fontSize: '30px' }}>
                  <div className="flex gap-3">
        <FaPencilAlt
          title="Edit Category"
          className="p-2 shadow-md text-blue-500"
          onClick={() => onEditRow?.(row)} // Optional chaining to avoid undefined error
        />
        <MdDelete
          title="Change Category Status"
          className="p-1 shadow-md text-red-500"
          onClick={() => onDeleteRow?.(row)} // Optional chaining
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
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  


</>
  );
}
