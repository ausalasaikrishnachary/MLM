import React, { useEffect, useState } from 'react';
import {
  Container, Grid, TextField, Button, Typography, Box,
  IconButton, FormControl, InputLabel, Select, MenuItem,
  FormGroup, FormControlLabel, Checkbox
} from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseurl } from '../../../BaseURL/BaseURL';

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
    area: '',
    builtup_area: '',
    property_value: '',
    total_property_value: '',
    agent_commission: '',
    owner_name: '',
    // company_commission: '',
    owner_contact: '',
    owner_email: '',
    images: [],
    amenities: [], // Add amenities to formData
    facing: '',
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [updatedImages, setUpdatedImages] = useState([]);
  const [amenities, setAmenities] = useState([]); // Add amenities state
  const userId = localStorage.getItem("user_id");

  // Fetch amenities
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await fetch(`${baseurl}/amenities/`);
        const data = await response.json();
        // Convert amenity IDs to numbers
        const formattedAmenities = data.map(amenity => ({
          ...amenity,
          amenity_id: parseInt(amenity.amenity_id)
        }));
        setAmenities(formattedAmenities);
      } catch (error) {
        console.error('Error fetching amenities:', error);
      }
    };
    fetchAmenities();
  }, []);

  useEffect(() => {
    if (property) {
      // Format amenities from property data
      const propertyAmenities = property.amenities ? property.amenities.map(amenity => {
        // Handle both object and ID formats
        if (typeof amenity === 'object' && amenity.amenity_id) {
          return parseInt(amenity.amenity_id);
        }
        return parseInt(amenity);
      }) : [];
      
      setFormData({ 
        ...property, 
        amenities: propertyAmenities 
      });

      if (property.images && property.images.length > 0) {
        const updatedImages = property.images.map(img => ({
          ...img,
          file: null
        }));
        setExistingImages(updatedImages);
      }
    } else {
      fetch(`${baseurl}/properties/user-id/${userId}/`)
        .then(res => res.json())
        .then(data => {
          const foundProperty = data.find(item => item.property_id === parseInt(id));
          if (foundProperty) {
            // Format amenities from found property
            const foundAmenities = foundProperty.amenities ? foundProperty.amenities.map(amenity => {
              if (typeof amenity === 'object' && amenity.amenity_id) {
                return parseInt(amenity.amenity_id);
              }
              return parseInt(amenity);
            }) : [];
            
            setFormData({ 
              ...foundProperty, 
              amenities: foundAmenities 
            });
            
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
      // const companyCommission = parseFloat(updated.company_commission) || 0;

      return {
        ...updated,
        // total_property_value: propertyValue + agentCommission + companyCommission,
        total_property_value: propertyValue + agentCommission,
      };
    });
  };

  // Add amenities handler
  const handleAmenityChange = (amenityId) => {
    setFormData(prev => {
      const numericId = parseInt(amenityId);
      const newAmenities = prev.amenities.includes(numericId)
        ? prev.amenities.filter(id => id !== numericId)
        : [...prev.amenities, numericId];
      return { ...prev, amenities: newAmenities };
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
        if (key !== 'images' && key !== 'amenities' && formData[key] !== null && formData[key] !== undefined) {
          submitData.append(key, formData[key]);
        }
      }

      // Append amenities - FIXED: Dynamic from formData.amenities
      if (formData.amenities && formData.amenities.length > 0) {
        formData.amenities.forEach((amenityId) => {
          submitData.append('amenities', amenityId.toString());
        });
      } else {
        // If no amenities selected, send empty array
        // submitData.append('amenities', '[]');
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

      // Debug: Log FormData contents
      console.log('Submitting amenities:', formData.amenities);
      for (let pair of submitData.entries()) {
        console.log(pair[0] + ': ', pair[1]);
      }

      const response = await fetch(`${baseurl}/property/${id}/`, {
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
    { name: 'area', label: 'Area', type: 'number' },
    { name: 'builtup_area', label: 'Built-up Area', type: 'number' },
    { name: 'owner_name', label: 'Owner Name' },
    { name: 'owner_contact', label: 'Owner Contact' },
    { name: 'owner_email', label: 'Owner Email' },
    { name: 'address', label: 'Address'},
    { name: 'facing', label: 'Facing'},
    { name: 'property_value', label: 'Property Value' },
    { name: 'agent_commission', label: 'Team Commission' },
    // { name: 'company_commission', label: 'Company Commission' },
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
                  multiline={field.multiline || false}
                  rows={field.multiline ? 3 : 1}
                />
                {/* Add Update Button after Company Commission */}

              </Grid>
            ))}

            {/* Amenities Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
                Amenities
              </Typography>
              <FormGroup>
                <Grid container spacing={1}>
                  {amenities.map((amenity) => (
                    <Grid item xs={12} key={amenity.amenity_id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.amenities.includes(amenity.amenity_id)}
                            onChange={() => handleAmenityChange(amenity.amenity_id)}
                            name={`amenity-${amenity.amenity_id}`}
                          />
                        }
                        label={amenity.name}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            </Grid>

            {/* Image Upload Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
                Property Images
              </Typography>

              {/* Existing Images */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                {existingImages.map((img) => (
                  <Box key={img.id} sx={{ position: 'relative', width: 120, height: 120 }}>
                    <img 
                      src={img.preview || `${baseurl}${img.image}`} 
                      alt="Property" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* <IconButton
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
                    </IconButton> */}
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
                  <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                      mt: 2,
                      height: '56px',
                      fontSize: '1rem'
                    }}
                  >
                    Update Property
                  </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default EditAsset;