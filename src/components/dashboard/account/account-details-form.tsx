'use client';

import * as React from 'react';
import { Button, CardActions, Input } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { Stack } from '@mui/system';

import { useUser } from '@/hooks/use-user';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
] as const;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function AccountDetailsForm(): React.JSX.Element {
  const { user } = useUser();
  let sellerCreated = user.role == 'seller' && 'isApproved' in user ? true : false;
  console.log(user)
  const [formValues, setFormValues] = React.useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentOption: '',
  });
  const [photoId, setPhotoId] = React.useState<File | null>(null);
  const [cannabisLicense, setCannabisLicense] = React.useState<File | null>(null);
  const [resellersPermit, setResellersPermit] = React.useState<File | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      if (name === 'photoId') setPhotoId(file);
      if (name === 'cannabisLicense') setCannabisLicense(file);
      if (name === 'resellersPermit') setResellersPermit(file);
    }
  };

  // Handle form submission with API call
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create form data object to send
    const formData = new FormData();

    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });
  // Set file inputs
  if (photoId) formData.set('photoId', photoId); // Use set to overwrite any existing value
  if (cannabisLicense) formData.set('cannabisLicense', cannabisLicense); // Use set for single value
  if (resellersPermit) formData.set('resellersPermit', resellersPermit); // Use set for single value

    try {
      let token = localStorage.getItem('auth-access-token');
      if (!token) {
        return { data: null };
      }

      // Check if user data exists to determine if it's a POST or PUT request
      
      const method = sellerCreated ? 'PATCH' : 'POST';
      const url = sellerCreated ? `${BACKEND_URL}/seller/${user._id}` : `${BACKEND_URL}/seller`;

      const response = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit seller details');
      }

      const result = await response.json();
      console.log('Seller details submitted successfully', result);
    } catch (error) {
      console.error('Failed to submit seller details', error);
    }
  };

  React.useEffect(() => {
    if (user) {
      setFormValues({
        name: user.name || '',
        street: user.street || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        country: user.country || '',
        paymentOption: user.paymentOption || '',
        photoId: user.photoId || '',
        cannabisLicense: user.cannabisLicense || '',
        resellersPermit: user.resellersPermit || '',
      });
    }
  }, [user]);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid lg={8} md={6} xs={12}>
          <Card>
            <CardHeader subheader="The information can be edited" title="Profile" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Name</InputLabel>
                    <OutlinedInput value={formValues.name} onChange={handleInputChange} label="Name" name="name" />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Street</InputLabel>
                    <OutlinedInput
                      value={formValues.street}
                      onChange={handleInputChange}
                      label="Street"
                      name="street"
                    />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>City</InputLabel>
                    <OutlinedInput value={formValues.city} onChange={handleInputChange} label="City" name="city" />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>State</InputLabel>
                    <Select value={formValues.state} onChange={handleInputChange} label="State" name="state">
                      {states.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Zip Code</InputLabel>
                    <OutlinedInput
                      value={formValues.zipCode}
                      onChange={handleInputChange}
                      label="Zip Code"
                      name="zipCode"
                    />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Country</InputLabel>
                    <Select value={formValues.country} onChange={handleInputChange} label="Country" name="country">
                      <MenuItem value="india">India</MenuItem>
                      <MenuItem value="jndia">dia</MenuItem>
                      {/* Add more country options if needed */}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
          </Card>
        </Grid>
        <Grid lg={4} md={6} xs={12}>
          <Card>
            <CardContent>
              <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <FormControl fullWidth required>
                  <InputLabel>Payment Option</InputLabel>
                  <OutlinedInput
                    value={formValues.paymentOption}
                    onChange={handleInputChange}
                    label="Payment Option"
                    name="paymentOption"
                  />
                </FormControl>
              </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{ position: 'relative', justifyContent: 'center' }}>
              <Input
                id="photo-id"
                name="photoId"
                type="file"
                style={{ opacity: 0 }}
                onChange={handleFileChange}
              />
              <label className='w-full' htmlFor="photo-id" style={{ position: 'absolute' }}>
                <Button fullWidth variant="text" component="span">
                  Photo ID
                </Button>
              </label>
            </CardActions>
            <Divider />
            <CardActions sx={{ position: 'relative', justifyContent: 'center' }}>
              <Input
                id="cannabis-license-upload"
                name="cannabisLicense"
                type="file"
                style={{ opacity: 0 }}
                onChange={handleFileChange}
              />
              <label className='w-full' htmlFor="cannabis-license-upload" style={{ position: 'absolute' }}>
                <Button fullWidth variant="text" component="span">
                  Cannabis License
                </Button>
              </label>
            </CardActions>
            <Divider />
            <CardActions sx={{ position: 'relative', justifyContent: 'center' }}>
              <Input
                id="resellers-permit-upload"
                name="resellersPermit"
                type="file"
                style={{ opacity: 0 }}
                onChange={handleFileChange}
              />
              <label className='w-full' htmlFor="resellers-permit-upload" style={{ position: 'absolute' }}>
                <Button fullWidth variant="text" component="span">
                  Resellers Permit
                </Button>
              </label>
            </CardActions>
            <Divider />
            <CardActions sx={{ justifyContent: 'center', margin: '1rem 0' }}>
              <Button type="submit" variant="contained">
                Save details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}
