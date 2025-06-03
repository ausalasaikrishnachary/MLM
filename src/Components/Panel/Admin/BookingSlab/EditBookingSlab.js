// src/components/BookingSlabs/EditBookingSlab.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from '../../../BaseURL/BaseURL';

function EditBookingSlab() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        min_value: '',
        max_value: '',
        booking_amount: ''
    });

    useEffect(() => {
        axios.get(`baseurl/booking-slabs/${id}/`)
            .then(response => setForm(response.data))
            .catch(error => console.error('Failed to load slab:', error));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${baseurl}/booking-slabs/${id}/`, form)
            .then(() => {
                alert('Booking slab updated successfully!');
                navigate('/booking-slab'); // Adjust route as per your routing
            })
            .catch(error => console.error('Failed to update:', error));
    };

    return (
        <>
        <Header />
        <Paper sx={{ maxWidth: 500, margin: 'auto', padding: 4, mt: 5 }}>
            <Typography variant="h6" mb={2}>Edit Booking Slab</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Min Value"
                    name="min_value"
                    value={form.min_value}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Max Value"
                    name="max_value"
                    value={form.max_value}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Booking Amount"
                    name="booking_amount"
                    value={form.booking_amount}
                    onChange={handleChange}
                    required
                />
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button variant="contained" color="primary" type="submit">Update</Button>
                    <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
                </Box>
            </form>
        </Paper>
        </>
    );
}

export default EditBookingSlab;
