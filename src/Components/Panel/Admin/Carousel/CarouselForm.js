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

function AddCarousel() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });

  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));

    // Set the file name
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await axios.post(`${baseurl}/carousel/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        image: null
      });
      setFileName('');

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Carousel added successfully!',
        timer: 2000,
        showConfirmButton: false
      });
      navigate('/a-table-carousel');

    } catch (error) {
      console.error('Error submitting form:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error submitting form'
      });
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ padding: 4 }}>
        {/* <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Add New Carousel
        </Typography> */}


        <Typography
                        variant="h4"
                        sx={{
                            fontSize: {
                                xs: "2.0rem",
                                sm: "2.1rem",
                                md: "2.2rem",
                            },
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            textAlign:'center',
                            marginBottom:'15px',
                        }}
                    >
Add New Carousel
                    </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%'
          }}
        >
          <Grid container spacing={3} justifyContent="center">
            {/* First Row - All three fields in one row */}
            <Grid container item spacing={3} xs={12}>
              {/* Title Field */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Description Field */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  multiline
                  rows={1}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
  <input
    accept="image/*"
    style={{ display: 'none' }}
    id="carousel-image-upload"
    type="file"
    onChange={handleImageChange}
   
  />
  <label htmlFor="carousel-image-upload"  style={{ width: '100%' }}>
    <TextField
      fullWidth
      label="Image"
      value={fileName}
      variant="outlined"
    
      InputProps={{
        readOnly: true,
      }}
      onClick={() => document.getElementById('carousel-image-upload').click()}
    />
  </label>
</Grid>

            </Grid>

            {/* Submit Button */}
            <Grid container justifyContent="center">
              <Grid item xs="auto">
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth={false}
                  sx={{
                    height: '46px',
                    fontSize: '1rem',
                    mt: 2,
                    px: 4
                  }}
                >
                  Add Carousel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default AddCarousel;