import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../../../Shared/Navbar/Navbar";
import { Box, Button, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { baseurl } from '../../../BaseURL/BaseURL';

const AdminMeetings = () => {
  const navigate = useNavigate(); // ← Step 1

  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const { name, phone_number } = formData;

    // Simple validation
    if (!name.trim() || !phone_number.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please enter both name and phone number.'
      });
      return;
    }

    // Optional: Basic phone number format check (digits only, length)
    const phoneRegex = /^\d{7,15}$/;
    if (!phoneRegex.test(phone_number)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Phone Number',
        text: 'Please enter a valid phone number (digits only).'
      });
      return;
    }

    try {
      const response = await axios.post(
        `${baseurl}/phonenumbers/`,
        formData
      );
      console.log('Response:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Phone number has been added successfully.',
        timer: 2000,
        showConfirmButton: false
      });

      setFormData({ name: '', phone_number: '' });

      // Step 3: Navigate to /tableadminmeetings after a short delay
      setTimeout(() => {
        navigate('/tableadminmeetings');
      }, 2000); // match SweetAlert timer
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add phone number.'
      });
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ textAlign: 'center', mt: 12 }}>
        {/* <Typography variant="h4" gutterBottom>
          Add Phone Numbers
        </Typography> */}
        <Typography
                        variant="h4"
                        sx={{
                            fontSize: {
                                xs: "1.8rem",
                                sm: "2.1rem",
                                md: "2.2rem",
                            },
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                         Add Phone Numbers
                    </Typography>

        {/* Fields side by side */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
            mt: 3,
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ minWidth: 300 }}
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            sx={{ minWidth: 300 }}
          />
        </Box>

        {/* Button below fields, centered */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            sx={{ height: 40 }}
            onClick={handleSubmit}
          >
            Add Phone Number
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AdminMeetings;
