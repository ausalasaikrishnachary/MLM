import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from '../../../BaseURL/BaseURL';
 import Swal from 'sweetalert2';

function AddBookingSlab() {
  const [formData, setFormData] = useState({
    min_value: '',
    max_value: '',
    booking_amount: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${baseurl}/booking-slabs/`, formData);

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Booking Slab added successfully!',
      timer: 2000,
      showConfirmButton: false
    });

    navigate('/a-bookingslab');
  } catch (error) {
    console.error('Error submitting form:', error);

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error submitting form'
    });
  }
};


  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Add New Booking Slab
        </Typography>
        
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{
            width: '100%'
          }}
        >
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Min Value"
                name="min_value"
                value={formData.min_value}
                onChange={handleChange}
                variant="outlined"
                type="number"
                required
                InputProps={{
                  inputProps: { 
                    min: 0 
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Max Value"
                name="max_value"
                value={formData.max_value}
                onChange={handleChange}
                variant="outlined"
                type="number"
                // required
                InputProps={{
                  inputProps: { 
                    min: formData.min_value || 0 
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Booking Amount"
                name="booking_amount"
                value={formData.booking_amount}
                onChange={handleChange}
                variant="outlined"
                type="number"
                required
                InputProps={{
                  inputProps: { 
                    min: 0 
                  }
                }}
              />
            </Grid>
            
                     <Grid container justifyContent="center">
             <Grid item xs="auto">
               <Button 
                 type="submit" 
                 variant="contained" 
                 fullWidth={false}
                 sx={{ 
                   height: '56px',
                   fontSize: '1rem',
                   mt: 2,
                   px: 4 // optional: padding-x to widen the button a bit
                 }}
               >
                 Add Booking Slab
               </Button>
             </Grid>
           </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default AddBookingSlab;