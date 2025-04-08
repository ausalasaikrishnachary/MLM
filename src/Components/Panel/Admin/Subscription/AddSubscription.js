import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import Header from '../../../Shared/Navbar/Navbar';

function AddSubscription() {
  const [formData, setFormData] = useState({
    plan_name: '',
    price: '',
    duration_in_days: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numeric values for `plan_id` and `duration_in_days`
    if ((name === 'plan_id' || name === 'duration_in_days') && isNaN(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        duration_in_days: Number(formData.duration_in_days),
      };

      const response = await axios.post('https://rahul30.pythonanywhere.com/subscription/plans/', payload);
      alert('Subscription added successfully!');
      console.log(response.data);

      // Clear form
      setFormData({
        plan_name: '',
        price: '',
        duration_in_days: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding subscription:', error);
      alert('Failed to add subscription. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Add Subscription Plan
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Plan Name"
              name="plan_name"
              value={formData.plan_name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Duration (in days)"
              name="duration_in_days"
              value={formData.duration_in_days}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default AddSubscription;
