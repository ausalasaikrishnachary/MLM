// import React from 'react'

// function EditCommissionLevels() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default EditCommissionLevels


// src/components/BookingSlabs/EditBookingSlab.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';
import Header from "../../../Shared/Navbar/Navbar";
  import Swal from 'sweetalert2';
import { baseurl } from '../../../BaseURL/BaseURL';

function EditCommissionLevels() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
    level_no: '',
    percentage: '',
    });

    useEffect(() => {
        axios.get(`${baseurl}/commissions-master/${id}/`)
            .then(response => setForm(response.data))
            .catch(error => console.error('Failed to load slab:', error));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


const handleSubmit = (e) => {
  e.preventDefault();
  axios.put(`${baseurl}/commissions-master/${id}/`, form)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Booking slab updated successfully!',
        timer: 2000,
        showConfirmButton: false
      });
      navigate('/a-commissionmaster'); // Adjust route as needed
    })
    .catch(error => {
      console.error('Failed to update:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'An error occurred while updating the booking slab.'
      });
    });
};

    return (
        <>
        <Header />
        <Paper sx={{ maxWidth: 500, margin: 'auto', padding: 4, mt: 5 }}>
            <Typography variant="h6" mb={2}>Edit Commission Level</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Level No"
                    name="level_no"
                    value={form.level_no}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Percentage"
                    name="percentage"
                    value={form.percentage}
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

export default EditCommissionLevels;
