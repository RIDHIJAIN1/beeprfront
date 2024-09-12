'use client';

import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { fetchCategories, fetchProducts } from '@/lib/admin/api-calls';
import { getProductsById } from '@/lib/seller/api-calls';
import { useUser } from '@/hooks/use-user';
import { Category } from '@/components/dashboard/category/category-table';
import { ProductFilters } from '@/components/dashboard/product/product-filter';
import type { Product } from '@/components/dashboard/product/product-table';
import { ProductsTable } from '@/components/dashboard/product/product-table';

export default function Page(): React.JSX.Element {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { user } = useUser();
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    title: '',
    image: '',
    description: '',
    weight: '',
    deliveryOption: 'standard', // default value
    category: '',
  });
  const [image, setImage] = React.useState<File | null>(null);

  const loadCategories = async () => {
    const fetchedCategories = await fetchCategories();
    setCategories(fetchedCategories);
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    console.log(product);
    setFormData({
      title: product.title || '', // Provide fallback if undefined
      image: '', // Handle this properly as a file later
      description: product.description || '',
      weight: product.weight || '',
      deliveryOption: product.deliveryOption || 'standard',
      categoryId: product.category || '',
    });
    setImage(null);
    setIsEditMode(true);
    setOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true); // Open delete confirmation modal
  };

  const confirmDelete = async () => {
    try {
      // Fetch the auth token from localStorage
      let token = localStorage.getItem('auth-access-token');
      if (!token) {
        console.error('User not authenticated. No token found.');
        return;
      }
      const url = `${BACKEND_URL}/product/${selectedProduct?.id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setIsDeleteModalOpen(false);
      // Reload product list or update state after deletion
      setProducts(products.filter((product) => product.id !== selectedProduct?.id));
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsDeleteModalOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      if (name === 'image') setImage(file);
    }
  };

  // Submit form data (handle API call or other actions)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create FormData object to send as multipart/form-data
    const formToSubmit = new FormData();

    // Append form data from the state to FormData
    formToSubmit.append('title', formData.title);
    formToSubmit.append('description', formData.description);
    formToSubmit.append('deliveryOption', formData.deliveryOption);
    formToSubmit.append('weight', formData.weight);
    formToSubmit.append('categoryId', formData.category); // Assuming category holds the ID

    // Append image if it exists
    if (image) formToSubmit.append('image', image);
    console.log('Form Data before submitting:', formData);

    for (let [key, value] of formToSubmit.entries()) {
      console.log(key, value);
    }

    try {
      // Fetch the auth token from localStorage
      let token = localStorage.getItem('auth-access-token');
      if (!token) {
        console.error('User not authenticated. No token found.');
        return;
      }

      const url = isEditMode
        ? `${BACKEND_URL}/product/${selectedProduct.id}` // For update
        : `${BACKEND_URL}/product`; // For create

      const method = isEditMode ? 'PATCH' : 'POST';
      const response = await fetch(url, {
        method,
        body: formToSubmit,
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      const responseBody = await response.json();
      console.log('Response Body:', responseBody);
      if (!response.ok) {
        throw new Error('Failed to submit product details');
      }

      setOpen(false);
      // Reload product list or update state
    } catch (error) {
      console.error('Failed to submit product details', error);
    }
  };

  if (!user) {
    return <div>You must be logged in to view this content.</div>;
  }

  let sellerIsApproved = user.role === 'seller' ? (user.isApproved ? user.isApproved : 'pending') : '';

  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    loadCategories();
    const loadProducts = async () => {
      if (user.role === 'admin') {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } else if (user.role === 'seller' && sellerIsApproved === 'approved') {
        const fetchedSellerProducts = await getProductsById(user.userId); // Use user._id as sellerId
        setProducts(fetchedSellerProducts);
      }
    };

    loadProducts();
  }, [user, sellerIsApproved]);

  // Pagination logic
  const page = 0;
  const rowsPerPage = 10;
  const paginatedCustomers = applyPagination(products, page, rowsPerPage);

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Products</Typography>
          </Stack>
          <div>
            <Button
              startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
              variant="contained"
              onClick={handleClickOpen}
            >
              Add
            </Button>
          </div>
        </Stack>
        <ProductFilters />
        <ProductsTable
          onEditRow={handleEditClick}
          onDeleteRow={handleDeleteClick}
          count={paginatedCustomers.length}
          page={page}
          rows={paginatedCustomers}
          rowsPerPage={rowsPerPage}
        />
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ maxWidth: 600, margin: 'auto' }}>
            {/* Title Field */}
            <TextField
              label="Title"
              name="title"
              fullWidth
              value={formData.title}
              onChange={handleInputChange}
              variant="outlined"
              required
            />

            {/* Image Upload */}
            <Button variant="outlined" component="label" fullWidth>
              Upload Image
              <input type="file" accept="image/*" hidden name="image" onChange={handleFileChange} />
            </Button>

            {/* Description Field */}
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              variant="outlined"
            />

            {/* Weight Field */}
            <TextField
              label="Weight (kg)"
              name="weight"
              fullWidth
              type="number"
              value={formData.weight}
              onChange={handleInputChange}
              variant="outlined"
              inputProps={{ min: 0 }}
            />

            {/* Category Dropdown */}
            <TextField
              label="Category"
              name="category"
              fullWidth
              select
              value={formData.category}
              onChange={handleInputChange}
              variant="outlined"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Delivery Options Dropdown */}
            <TextField
              label="Delivery Option"
              name="deliveryOption"
              fullWidth
              select
              value={formData.deliveryOption}
              onChange={handleInputChange}
              variant="outlined"
            >
              <MenuItem value="standard">Standard</MenuItem>
              <MenuItem value="express">Express</MenuItem>
              <MenuItem value="overnight">Overnight</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{isEditMode ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function applyPagination(items: Product[], page: number, rowsPerPage: number) {
  return items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
