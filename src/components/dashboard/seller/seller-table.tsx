"use client";
import { approveSeller, disapproveSeller } from '@/lib/admin/api-calls';
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
    isApproved: string; // Include approval status
}

interface SellersTableProps {
    count?: number;
    page?: number;
    rows?: Seller[];
    rowsPerPage?: number;
    updateSellers: () => Promise<void>;
}

export function SellersTable({
    count = 0,
    rows = [],
    page = 0,
    rowsPerPage = 0,
    updateSellers,
}: SellersTableProps): React.JSX.Element {

    const rowIds = React.useMemo(() => {
        return rows.map((seller) => seller._id);
    }, [rows]);

    const [openModal, setOpenModal] = React.useState(false);
    const [openApproveModal, setOpenApproveModal] = React.useState(false); // State for approval confirmation modal
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

    const handleOpenApproveModal = (sellerId: string) => {
        setSelectedSeller(sellerId);
        setOpenApproveModal(true); // Open the approval confirmation modal
    };

    const handleCloseApproveModal = () => {
        setSelectedSeller(null);
        setOpenApproveModal(false); // Close the approval confirmation modal
    };

    const handleApprove = async () => {
        if (!selectedSeller) return;
        let response = await approveSeller(selectedSeller);
        console.log(response);
        if (response && response.status === "success") {
            console.log('Seller approved successfully!');
        } else {
            console.log(response);
        }
        handleCloseApproveModal(); // Close modal after successful approval
        await updateSellers();
    };

    const handleDisApprove = async () => {
        if (!selectedSeller) return;
        let response = await disapproveSeller(selectedSeller, message);
        console.log(response);
        handleCloseModal(); // Close modal after successful disapproval
        await updateSellers();
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
                                                <Typography variant="subtitle2"><span className='capitalize'>{row.user.name}</span></Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>{row.user.email}</TableCell>
                                        <TableCell>
                                            {row.street}, {row.city}, {row.state}, {row.zipCode}
                                        </TableCell>
                                        <TableCell>{row.paymentOption}</TableCell> {/* Display payment option */}
                                        <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                                        <TableCell>
                                            <a className='text-sky-600' target="_blank" href={`${BACKEND_URL}/${row.photoId}`}>Link</a>
                                        </TableCell>
                                        <TableCell>
                                            <a className='text-sky-600' target="_blank" href={`${BACKEND_URL}/${row.cannabisLicense}`}>Link</a>
                                        </TableCell>
                                        <TableCell>
                                            <a className='text-sky-600' target="_blank" href={`${BACKEND_URL}/${row.resellersPermit}`}>Link</a>
                                        </TableCell>
                                        <TableCell>
                                            {row.isApproved == "approved" ? (<span className='text-green-400'>Yes</span>) : (row.isApproved == "rejected" ? (<span className='text-green-400'>Rejected</span>) : (<span className='text-yellow-500'>Pending</span>))}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '30px' }}>
                                            <div className='flex gap-3'>
                                                <TiTick onClick={() => handleOpenApproveModal(row._id)} className='shadow-md text-green-500' />
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
            {/* Modal for Approval Confirmation */}
            <Dialog open={openApproveModal} onClose={handleCloseApproveModal}>
                <DialogTitle>Approve Seller</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to approve this seller?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseApproveModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleApprove} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}