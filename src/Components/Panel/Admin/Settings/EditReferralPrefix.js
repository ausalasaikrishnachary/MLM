import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "../../../Shared/Navbar/Navbar";
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import Swal from 'sweetalert2';
import { baseurl } from '../../../BaseURL/BaseURL';

const EditReferralPrefix = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [prefix, setPrefix] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchPrefix();
  }, [id]);

  const fetchPrefix = async () => {
    try {
      const response = await axios.get(`${baseurl}/referral-prefix/${id}/`);
      setPrefix(response.data.prefix);
    } catch (error) {
      console.error('Error fetching prefix:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch prefix details.'
      });
      navigate('/a-settings');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prefix.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Prefix',
        text: 'Please enter a referral prefix.'
      });
      return;
    }

    // Updated to validate exactly 3 uppercase letters
    const prefixRegex = /^[A-Z]{3}$/;
    if (!prefixRegex.test(prefix)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Prefix',
        text: 'Prefix must contain exactly 3 uppercase letters only.'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `${baseurl}/referral-prefix/${id}/`,
        { prefix: prefix.toUpperCase() }
      );
      
      console.log('Response:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Referral prefix has been updated successfully.',
        timer: 2000,
        showConfirmButton: false
      });

      setTimeout(() => {
        navigate('/a-settings');
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
      
      let errorMessage = 'Failed to update referral prefix.';
      if (error.response?.data?.prefix) {
        errorMessage = error.response.data.prefix[0];
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <>
        <Header />
        <Container sx={{ mt: 12, textAlign: 'center' }}>
          <Typography>Loading...</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 12 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: {
                xs: "1.8rem",
                sm: "2.1rem",
                md: "2.2rem",
              },
              fontWeight: "bold",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 4,
            }}
          >
            Edit Referral Prefix
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value.toUpperCase())}
              required
              sx={{ mb: 3 }}
              placeholder="Enter exactly 3 uppercase letters (e.g., SRT)"
              helperText="Enter exactly 3 uppercase letters only"
              inputProps={{
                maxLength: 3,
                minLength: 3,
                style: { textTransform: 'uppercase' }
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/a-settings')}
                sx={{ minWidth: 120 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ minWidth: 120 }}
              >
                {loading ? 'Updating...' : 'Update Prefix'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default EditReferralPrefix;