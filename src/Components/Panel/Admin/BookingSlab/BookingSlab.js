import React, { useEffect, useState } from 'react';
import Header from "../../../Shared/Navbar/Navbar";
import {
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Typography
} from '@mui/material';
import axios from 'axios';
import AddBookingSlab from './AddBookingSlab'; // Make sure path is correct
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function BookingSlab() {
    const [slabs, setSlabs] = useState([]);
    const navigate = useNavigate();

    const fetchSlabs = () => {
        axios.get('https://rahul30.pythonanywhere.com/booking-slabs/')
            .then(response => {
                setSlabs(response.data);
            })
            .catch(error => {
                console.error('Error fetching booking slabs:', error);
            });
    };

     const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this slab?")) {
            axios.delete(`https://rahul30.pythonanywhere.com/booking-slabs/${id}/`)
                .then(() => {
                    fetchSlabs(); // Refresh the list
                })
                .catch(error => {
                    console.error('Error deleting slab:', error);
                });
        }
    };

    useEffect(() => {
        fetchSlabs();
    }, []);

    return (
        <>
            <Header />
            <TableContainer component={Paper} sx={{ maxWidth: 800, margin: '20px auto', paddingBottom: 2 }}>
                <Typography variant="h6" sx={{ padding: 2 }}>Booking Slabs</Typography>

                {/* Right-aligned button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingX: 2, marginBottom: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/a-add-booking-slab')}
                    >
                        Add Slab
                    </Button>
                </Box>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Min Value</strong></TableCell>
                            <TableCell><strong>Max Value</strong></TableCell>
                            <TableCell><strong>Booking Amount</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slabs.map((slab) => (
                            <TableRow key={slab.id}>
                                <TableCell>{slab.id}</TableCell>
                                <TableCell>₹ {parseFloat(slab.min_value).toLocaleString()}</TableCell>
                                <TableCell>₹ {parseFloat(slab.max_value).toLocaleString()}</TableCell>
                                <TableCell>₹ {parseFloat(slab.booking_amount).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => navigate(`/a-edit-booking-slab/${slab.id}`)}
                                        startIcon={<EditIcon />}
                                        // variant="outlined"
                                        color="primary"
                                        size="small"
                                    >
                                        
                                    </Button>
                                      <Button
                                onClick={() => handleDelete(slab.id)}
                                startIcon={<DeleteIcon />}
                                // variant="outlined"
                                color="error"
                                size="small"
                            >
                               
                            </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}

export default BookingSlab;
