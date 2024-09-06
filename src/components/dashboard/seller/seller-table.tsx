"use client";
import { approveSellers, disapproveSellers } from '@/lib/admin/api-calls';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
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
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function noop(): void {
    // do nothing
}
export interface User {
    name: string;
    email: string;
}
export interface Seller {
    _id: string; // This should match the _id from your API response.
    street: string;
    user: User;
    name: string;
    email: string;
    createdAt: Date; // You will need to ensure this is provided in your API response.
    city: string;
    state: string;
    zipCode: string; // Include zip code
    photoId: string;
    resellersPermit: string;
    cannabisLicense: string;
    paymentOption: string; // Include payment option
    isApproved: boolean; // Include approval status
}

interface SellersTableProps {
    count?: number;
    page?: number;
    rows?: Seller[];
    rowsPerPage?: number;
}

export function SellersTable({
    count = 0,
    rows = [],
    page = 0,
    rowsPerPage = 0,
}: SellersTableProps): React.JSX.Element {
    const rowIds = React.useMemo(() => {
        return rows.map((seller) => seller._id);
    }, [rows]);

    const [openModal, setOpenModal] = React.useState(false);
    const [selectedSeller, setSelectedSeller] = React.useState<string | null>(null);
    const [message, setMessage] = React.useState('');

    const handleOpenModal = (sellerId: string) => {
        setSelectedSeller(sellerId);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedSeller(null);
        setMessage('');
        setOpenModal(false);
    };

    const handleApprove = async (sellerId: String) => {
        let response = await approveSellers(sellerId);
        console.log(response);
        if(response && response.status=="success")
            console.log('Seller approved successfully!');
        else
            console.log(response);
    };

    const handleDisApprove = async () => {
        if (!selectedSeller) return;
        let response = await disapproveSellers(selectedSeller, message);
        console.log(response);
        handleCloseModal(); // Close modal after successful disapproval
    };

    return (
        <>
            <Card>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table sx={{ minWidth: '800px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Payment Option</TableCell>
                                <TableCell>Signed Up</TableCell>
                                <TableCell>Photo ID</TableCell>
                                <TableCell>Cannabis License</TableCell>
                                <TableCell>Resellers Permit</TableCell>
                                <TableCell>Approved</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover key={row._id}>
                                        <TableCell>
                                            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                                                {/* <Avatar src={row.avatar} /> */}
                                                <Typography variant="subtitle2"><span className='capitalize'>{row._id + " " + row.user.name}</span></Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>{row.user.email}</TableCell>
                                        <TableCell>
                                            {row.street}, {row.city}, {row.state}, {row.zipCode}
                                        </TableCell>
                                        <TableCell>{row.paymentOption}</TableCell> {/* Display payment option */}
                                        <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                                        <TableCell>
                                            <a className='text-sky-600' href={`${BACKEND_URL}/${row.photoId}`}>Link</a>
                                        </TableCell>
                                        <TableCell>
                                            <a className='text-sky-600' href={`${BACKEND_URL}/${row.cannabisLicense}`}>Link</a>
                                        </TableCell>
                                        <TableCell>
                                            <a className='text-sky-600' href={`${BACKEND_URL}/${row.resellersPermit}`}>Link</a>
                                        </TableCell>
                                        <TableCell>
                                            {row.isApproved ? (<span className='text-green-400'>Yes</span>) : (<span className='text-red-500'>No</span>)}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '30px' }}>
                                            <div className='flex gap-3'>
                                                <TiTick onClick={() => handleApprove(row._id)} className='shadow-md text-green-500' />
                                                <RxCross2 onClick={() => handleOpenModal(row._id)} className='shadow-md text-red-500' />
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
            {/* Modal for Disapproval */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Disapprove Seller</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please provide a reason for disapproving this seller.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Disapproval Message"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDisApprove} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}