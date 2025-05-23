import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../../../Shared/Navbar/Navbar";

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
      await axios.post('https://rahul30.pythonanywhere.com/booking-slabs/', formData);
      alert('Booking Slab added successfully!');
      navigate('/booking-slabs');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <>
<Header />
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h6" gutterBottom>Add New Booking Slab</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Min Value"
            name="min_value"
            value={formData.min_value}
            onChange={handleChange}
            margin="normal"
            type="number"
            required
          />
          <TextField
            fullWidth
            label="Max Value"
            name="max_value"
            value={formData.max_value}
            onChange={handleChange}
            margin="normal"
            type="number"
            required
          />
          <TextField
            fullWidth
            label="Booking Amount"
            name="booking_amount"
            value={formData.booking_amount}
            onChange={handleChange}
            margin="normal"
            type="number"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
    </>
  );
}

export default AddBookingSlab;
