'use client';

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
import * as React from 'react';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
] as const;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;



export function AccountDetailsForm(): React.JSX.Element {
  const [formValues , setFormValues] = React.useState({
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

    formData.append('street', formValues.street);
    formData.append('city', formValues.city);
    formData.append('state', formValues.state);
    formData.append('zipCode', formValues.zipCode);
    formData.append('country', formValues.country);
    formData.append('paymentOption', formValues.paymentOption);
    if (photoId) formData.append('photoId', photoId);
    if (cannabisLicense) formData.append('cannabisLicense', cannabisLicense);
    if (resellersPermit) formData.append('resellersPermit', resellersPermit);

    try {
      let token = localStorage.getItem('auth-access-token');
      if (!token) {
        return { data: null };
      }
      const response = await fetch(`${BACKEND_URL}/seller`, {       
        method: 'POST',
        body:formData,
        headers: {
          'Authorization': `Bearer ${token}`,
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
  return (
    <form
      onSubmit={handleSubmit}
    >
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
                    <OutlinedInput
                      value={formValues.name}
                     onChange={handleInputChange}
                      label="Name"
                      name="name"
                    />
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
                    <OutlinedInput
                      value={formValues.city}
                      onChange={handleInputChange}
                      label="City"
                      name="city"
                    />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>State</InputLabel>
                    <Select
                      value={formValues.state}
                      onChange={handleInputChange}
                      label="State"
                      name="state"
                    >
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
                    <Select
                      value={formValues.country}
                      onChange={handleInputChange}
                      label="Country"
                      name="country"
                    >
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
            <CardActions sx={{ justifyContent: 'center' }}>
            <Input
                required
                id="photo-id"
                name="photoId"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="photo-id">
                <Button fullWidth variant="text" component="span">
                  Photo ID
                </Button>
              </label>
            </CardActions>
            <Divider />
            <CardActions sx={{ justifyContent: 'center' }}>
              <Input
                required
                id="cannabis-license-upload"
                name="cannabisLicense"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="cannabis-license-upload">
                <Button fullWidth variant="text" component="span">
                  Cannabis License
                </Button>
              </label>
            </CardActions>
            <Divider />
            <CardActions sx={{ justifyContent: 'center' }}>
              <Input
                required
                id="resellers-permit-upload"
                name="resellersPermit"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="resellers-permit-upload">
                <Button fullWidth variant="text" component="span">
                  Resellers Permit
                </Button>
              </label>
            </CardActions>
            <Divider />
            <CardActions sx={{ justifyContent: 'center', margin: "1rem 0" }}>
              <Button type='submit' variant="contained">Save details</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}
