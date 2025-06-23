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

  const [previewImage, setPreviewImage] = useState(null);
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
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
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
    setPreviewImage(null);

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Carousel added successfully!',
      timer: 2000,
      showConfirmButton: false
    });

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
      <Container maxWidth="xl" sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
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
            <Grid item xs={12} md={6}>
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
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
                required
                multiline
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="carousel-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="carousel-image-upload">
                <Button variant="contained" component="span" fullWidth>
                  Upload Image
                </Button>
              </label>
              {previewImage && (
                <Box mt={2}>
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '200px',
                      marginTop: '10px'
                    }} 
                  />
                </Box>
              )}
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