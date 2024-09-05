"use client";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
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
import { useSelection } from '@/hooks/use-selection';
import { MdDelete } from "react-icons/md";
import { Button } from '@mui/material';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function noop(): void {
  // do nothing
}

export interface Seller {
  id: string; // This should match the _id from your API response.
  street: string;
  user:string;
  name:string;
  email: string;
  createdAt: Date; // You will need to ensure this is provided in your API response.
  city: string;
  state: string;
  zipCode: string; // Include zip code
  photoId: string;
  resellersPermit:string;
  cannabisLicense:string;
  paymentOption: string; // Include payment option
  isApproved: boolean; // Include approval status
}

interface SellersTableProps {
  count?: number;
  page?: number;
  rows?: Seller[];
  rowsPerPage?: number;
  onApprove;
}

export function SellersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  onApprove,
}: SellersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
      return rows.map((seller) => seller.id);
  }, [rows]);
  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);
  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
      <Card>
          <Box sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: '800px' }}>
                  <TableHead>
                      <TableRow>
                          <TableCell padding="checkbox">
                              <Checkbox
                                  checked={selectedAll}
                                  indeterminate={selectedSome}
                                  onChange={(event) => {
                                      if (event.target.checked) {
                                          selectAll();
                                      } else {
                                          deselectAll();
                                      }
                                  }}
                              />
                          </TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell>Zip Code</TableCell>
                          <TableCell>Payment Option</TableCell>
                          <TableCell>Signed Up</TableCell>
                          <TableCell>Photo ID</TableCell>
                          <TableCell>Cannabis License</TableCell>
                          <TableCell>Resellers Permit</TableCell>
                          <TableCell>Approval Status</TableCell>
                          <TableCell>Delete</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {rows.map((row) => {
                          const isSelected = selected?.has(row.id);
                          return (
                              <TableRow hover key={row.id} selected={isSelected}>
                                  <TableCell padding="checkbox">
                                      <Checkbox
                                          checked={isSelected}
                                          onChange={(event) => {
                                              if (event.target.checked) {
                                                  selectOne(row.id);
                                              } else {
                                                  deselectOne(row.id);
                                              }
                                          }}
                                      />
                                  </TableCell>
                                  <TableCell>
                                      <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                                          <Typography variant="subtitle2">{row.user.name}</Typography>
                                      </Stack>
                                  </TableCell>
                                  <TableCell>{row.user.email}</TableCell>
                                  <TableCell>
                                      {row.street}, {row.city}, {row.state} {/* Display city and state */}
                                  </TableCell>
                                  <TableCell>{row.zipCode}</TableCell> {/* Display zip code */}
                                  <TableCell>{row.paymentOption}</TableCell> {/* Display payment option */}
                                  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                                  <TableCell>
                                      <img
                                          src={`${BACKEND_URL}/${row.photoId}`} // Construct the image URL
                                          alt="Seller Photo"
                                          style={{ width: '50px', height: '50px', borderRadius: '50%' }} // Style the image
                                      />
                                  </TableCell>
                                  <TableCell>
                                      <img
                                          src={`${BACKEND_URL}/${row.cannabisLicense}`} // Construct the image URL
                                          alt="Cannabis License"
                                          style={{ width: '50px', height: '50px', borderRadius: '50%' }} // Style the image
                                      />
                                  </TableCell>
                                  <TableCell>
                                      <img
                                          src={`${BACKEND_URL}/${row.resellersPermit}`} // Construct the image URL
                                          alt="Resellers Permit"
                                          style={{ width: '50px', height: '50px', borderRadius: '50%' }} // Style the image
                                      />
                                  </TableCell>
                                  <TableCell>
                                      {row.isApproved ? (
                                          <Button onClick={() => onApprove(row.id, row.isApproved)} variant="outlined" color="secondary">
                                              Disapprove
                                          </Button>
                                      ) : (
                                          <Button onClick={() => onApprove(row.id, row.isApproved)} variant="outlined" color="primary">
                                              Approve
                                          </Button>
                                      )}
                                  </TableCell>
                                  <TableCell style={{ fontSize: '30px' }}>
                                      <MdDelete />
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
  );
}