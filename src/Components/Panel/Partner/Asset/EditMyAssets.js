import React, { useEffect, useState } from 'react';
import {
  Container, Grid, TextField, Button, Typography, Box,
  IconButton, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';

const EditAsset = () => {
  const { state } = useLocation();
  const { property } = state || {}; 
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    property_title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pin_code: '',
    plot_area_sqft: '',
    builtup_area_sqft: '',
    property_value: '',
    total_property_value: '',
    agent_commission: '',
    owner_name: '',
    company_commission: '',
    owner_contact: '',
    owner_email: '',
    images: [],
    amenities: [],
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [updatedImages, setUpdatedImages] = useState([]);
    const userId = localStorage.getItem("user_id");

 useEffect(() => {
  if (property) {
    setFormData({ ...property });

    if (property.images && property.images.length > 0) {
      const updatedImages = property.images.map(img => ({
        ...img,
        file: null
      }));
      setExistingImages(updatedImages);
    }
  } else {
    fetch(`https://rahul30.pythonanywhere.com/properties/user-id/${userId}/`)
      .then(res => res.json())
      .then(data => {
        const foundProperty = data.find(item => item.property_id === parseInt(id));
        if (foundProperty) {
          setFormData(foundProperty);
          if (foundProperty.images && foundProperty.images.length > 0) {
            const updatedImages = foundProperty.images.map(img => ({
              ...img,
              file: null
            }));
            setExistingImages(updatedImages);
          }
        }
      })
      .catch(err => console.error('Error fetching properties:', err));
  }
}, [property, id, userId]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      const propertyValue = parseFloat(updated.property_value) || 0;
      const agentCommission = parseFloat(updated.agent_commission) || 0;
      const companyCommission = parseFloat(updated.company_commission) || 0;

      return {
        ...updated,
        total_property_value: propertyValue + agentCommission + companyCommission,
      };
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const handleReplaceExistingImage = (imageId, file) => {
    setUpdatedImages(prev => {
      const filtered = prev.filter(item => item.id !== imageId);
      return [...filtered, { id: imageId, file }];
    });

    setExistingImages(prev => 
      prev.map(img => img.id === imageId ? { ...img, preview: URL.createObjectURL(file) } : img)
    );
  };

  const handleRemoveExistingImage = (imageId) => {
    setExistingImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleRemoveNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const submitData = new FormData();

      // Append normal fields
      for (const key in formData) {
        if (key !== 'images' && formData[key] !== null && formData[key] !== undefined) {
          submitData.append(key, formData[key]);
        }
      }

      // Append new image uploads
      newImages.forEach(img => {
        submitData.append('images', img);
      });

      // Append updated image files and IDs
      updatedImages.forEach(({ id, file }) => {
        submitData.append('image_ids', id);
        submitData.append('images', file);
      });

      // Append retained existing image IDs
      existingImages.forEach(img => {
        if (!updatedImages.find(updated => updated.id === img.id)) {
          submitData.append('images', img.id);
        }
      });

      const response = await fetch(`https://rahul30.pythonanywhere.com/property/${id}/`, {
        method: 'PUT',
        body: submitData,
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok) {
        Swal.fire('Success', 'Property updated successfully!', 'success');
        navigate('/p-myassets');
      } else {
        Swal.fire('Error', 'Failed to update property.', 'error');
      }
    } catch (err) {
      console.error('Error updating:', err);
      Swal.fire('Error', 'An error occurred while updating.', 'error');
    }
  };

  // Field configuration
  const fieldConfig = [
    { name: 'property_title', label: 'Property Title' },
    { name: 'city', label: 'City' },
    { name: 'state', label: 'State' },
    { name: 'country', label: 'Country' },
    { name: 'pin_code', label: 'PIN Code' },
    { name: 'plot_area_sqft', label: 'Plot Area (sqft)', type: 'number' },
    { name: 'builtup_area_sqft', label: 'Built-up Area (sqft)', type: 'number' },
    { name: 'owner_name', label: 'Owner Name' },
    { name: 'owner_contact', label: 'Owner Contact' },
    { name: 'owner_email', label: 'Owner Email' },
    { name: 'address', label: 'Address', multiline: true},
    { name: 'amenities', label: 'Amenities', multiline: true},
     { name: 'property_value', label: 'Property Value' },
    { name: 'agent_commission', label: 'Agent Commission' },
    { name: 'company_commission', label: 'Company Commission' },
     { name: 'total_property_value', label: 'Total Property Value'},
     { name: 'description', label: 'Description', multiline: true},
  ];

return (
  <>
    <PartnerHeader />
    <Container maxWidth="xl" sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Edit Property
      </Typography>
      
      <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          {/* Form Fields */}
          {fieldConfig.map((field) => (
            <Grid item xs={12} md={4} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                variant="outlined"
                type={field.type || 'text'}
              />
              {/* Add Update Button after Company Commission */}
              {field.name === 'total_property_value' && (
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth
                  sx={{ 
                    mt: 2,
                    height: '56px', // Match TextField height
                    fontSize: '1rem'
                  }}
                >
                  Update Property
                </Button>
              )}
            </Grid>
          ))}

          {/* Image Upload Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
              Property Images
            </Typography>
            
            {/* <Box sx={{ mb: 2 }}>
              <Button 
                variant="outlined" 
                component="label" 
                fullWidth
                sx={{ mb: 2 }}
              >
                Upload New Images
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  multiple
                  onChange={handleFileChange}
                />
              </Button>
            </Box> */}

            {/* Existing Images */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
              {existingImages.map((img) => (
                <Box key={img.id} sx={{ position: 'relative', width: 120, height: 120 }}>
                  <img 
                    src={img.preview || `https://rahul30.pythonanywhere.com${img.image}`} 
                    alt="Property" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <IconButton
                    size="small"
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: 0,
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
                    }}
                    onClick={() => handleRemoveExistingImage(img.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <Button
                    size="small"
                    component="label"
                    sx={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0,
                      fontSize: '0.75rem',
                      backgroundColor: 'rgba(255,255,255,0.7)'
                    }}
                  >
                    Replace
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => handleReplaceExistingImage(img.id, e.target.files[0])}
                    />
                  </Button>
                </Box>
              ))}
            </Box>
            
            {/* New Images Preview */}
            {newImages.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  New Images to Upload
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {newImages.map((img, index) => (
                    <Box key={index} sx={{ position: 'relative', width: 120, height: 120 }}>
                      <img 
                        src={URL.createObjectURL(img)} 
                        alt="New upload" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <IconButton
                        size="small"
                        sx={{ 
                          position: 'absolute', 
                          top: 0, 
                          right: 0,
                          backgroundColor: 'rgba(255,255,255,0.7)',
                          '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
                        }}
                        onClick={() => handleRemoveNewImage(index)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  </>
);
};

export default EditAsset;