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

const user = {
  name: 'Sofia Rivers',
} as const;

export function AccountDetailsForm(): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
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
                    <OutlinedInput defaultValue={`${user.name}`} label="Name" name="name" />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Street</InputLabel>
                    <OutlinedInput defaultValue="" label="Street" name="street" />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>City</InputLabel>
                    <OutlinedInput defaultValue="" label="City" name="city" />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>State</InputLabel>
                    <OutlinedInput defaultValue="" label="State" name="state" />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Zip Code</InputLabel>
                    <OutlinedInput defaultValue="" label="Zip Code" name="zipcode" />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Country</InputLabel>
                    <Select defaultValue="" label="Country" name="country" variant="outlined">
                      {states.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
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
                  <OutlinedInput defaultValue="" label="Payment Option" name="paymentoption" />
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
              />
              <label htmlFor="resellers-permit-upload">
                <Button fullWidth variant="text" component="span">
                  Resellers Permit
                </Button>
              </label>
            </CardActions>
            <Divider />
            <CardActions sx={{ justifyContent: 'center', margin: "1rem 0" }}>
              <Button variant="contained">Save details</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}
