import React, { useEffect, useState } from 'react';
import {
  Container, Grid, TextField, Button, Typography, Box,
  IconButton, FormControl, InputLabel, Select, MenuItem,
  FormGroup, FormControlLabel, Checkbox
} from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Header from '../../../Shared/Navbar/Navbar';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideocamIcon from '@mui/icons-material/Videocam';
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
    company_commission: '',
    distribution_commission: "",
    owner_contact: '',
    owner_email: '',
    images: [],
    amenities: [],
    facing: '',
    agreement_video: null,
    agreement_file: null,
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [updatedImages, setUpdatedImages] = useState([]);
  const [agreementVideo, setAgreementVideo] = useState(null);
  const [agreementFile, setAgreementFile] = useState(null);
  const [amenities, setAmenities] = useState([]); // Add amenities state

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

      // Set agreement files if they exist
      if (property.agreement_video) {
        setAgreementVideo(property.agreement_video);
      }
      if (property.agreement_file) {
        setAgreementFile(property.agreement_file);
      }
    } else {
      fetch(`${baseurl}/property/${id}/`)
        .then(res => res.json())
        .then(data => {
          // Format amenities from property data
          const dataAmenities = data.amenities ? data.amenities.map(amenity => {
            if (typeof amenity === 'object' && amenity.amenity_id) {
              return parseInt(amenity.amenity_id);
            }
            return parseInt(amenity);
          }) : [];
          
          setFormData({ 
            ...data, 
            amenities: dataAmenities 
          });
          
          if (data.images && data.images.length > 0) {
            setExistingImages(data.images);
          }

          // Set agreement files if they exist
          if (data.agreement_video) {
            setAgreementVideo(data.agreement_video);
          }
          if (data.agreement_file) {
            setAgreementFile(data.agreement_file);
          }
        })
        .catch(err => console.error('Error fetching property:', err));
    }
  }, [property, id]);

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

  const handleAgreementVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        agreement_video: file
      }));
    }
  };

  const handleAgreementFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        agreement_file: file
      }));
    }
  };

  const handleRemoveAgreementVideo = () => {
    setFormData(prev => ({
      ...prev,
      agreement_video: null
    }));
    setAgreementVideo(null);
  };

  const handleRemoveAgreementFile = () => {
    setFormData(prev => ({
      ...prev,
      agreement_file: null
    }));
    setAgreementFile(null);
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

      // Append normal fields (excluding amenities)
      for (const key in formData) {
        if (key !== 'images' && key !== 'amenities' && formData[key] !== null && formData[key] !== undefined) {
          // For file fields, append the file object directly
          if (key === 'agreement_video' || key === 'agreement_file') {
            if (formData[key] instanceof File) {
              submitData.append(key, formData[key]);
            }
          } else {
            submitData.append(key, formData[key]);
          }
        }
      }

      // Append amenities - Dynamic from formData.amenities
      if (formData.amenities && formData.amenities.length > 0) {
        formData.amenities.forEach((amenityId) => {
          submitData.append('amenities', amenityId.toString());
        });
      } else {
        // If no amenities selected, send empty array
        submitData.append('amenities', '[]');
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
        navigate('/a-asset');
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
    { name: 'address', label: 'Address' },
    { name: 'facing', label: 'Facing' },
    { name: 'property_value', label: 'Property Value' },
    { name: 'agent_commission', label: 'Team Commission' },
    { name: 'company_commission', label: 'Company Commission' },
    { name: 'distribution_commission', label: 'Distribution Commission' },
    { name: 'total_property_value', label: 'Total Property Value'},
    { name: 'description', label: 'Description' },
  ];

  const getFileName = (path) => {
    return path ? path.split('/').pop() : '';
  };

  return (
    <>
      <Header />
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
                  rows={field.multiline ? 4 : 1}
                />
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

            {/* Agreement Video Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
                Agreement Video
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Button 
                  variant="outlined" 
                  component="label" 
                  fullWidth
                  sx={{ mb: 2 }}
                  startIcon={<VideocamIcon />}
                >
                  {agreementVideo || formData.agreement_video ? 'Replace Video' : 'Upload Agreement Video'}
                  <input
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={handleAgreementVideoChange}
                  />
                </Button>
              </Box>

              {/* Video Preview */}
              {(agreementVideo || formData.agreement_video) && (
                <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Current Agreement Video:
                  </Typography>
                  
                  {formData.agreement_video instanceof File ? (
                    // New video preview
                    <Box>
                      <video 
                        controls 
                        style={{ width: '100%', maxHeight: '200px', marginBottom: '10px' }}
                      >
                        <source src={URL.createObjectURL(formData.agreement_video)} />
                        Your browser does not support the video tag.
                      </video>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        New Video: {formData.agreement_video.name}
                      </Typography>
                    </Box>
                  ) : agreementVideo ? (
                    // Existing video preview
                    <Box>
                      <video 
                        controls 
                        style={{ width: '100%', maxHeight: '200px', marginBottom: '10px' }}
                      >
                        <source src={`${baseurl}${agreementVideo}`} />
                        Your browser does not support the video tag.
                      </video>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Current: {getFileName(agreementVideo)}
                      </Typography>
                    </Box>
                  ) : null}
                  
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={handleRemoveAgreementVideo}
                  >
                    Remove Video
                  </Button>
                </Box>
              )}
            </Grid>

            {/* Agreement File Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
                Agreement File
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Button 
                  variant="outlined" 
                  component="label" 
                  fullWidth
                  sx={{ mb: 2 }}
                  startIcon={<PictureAsPdfIcon />}
                >
                  {agreementFile || formData.agreement_file ? 'Replace File' : 'Upload Agreement File'}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    hidden
                    onChange={handleAgreementFileChange}
                  />
                </Button>
              </Box>

              {/* File Preview */}
              {(agreementFile || formData.agreement_file) && (
                <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Current Agreement File:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PictureAsPdfIcon sx={{ mr: 1, color: 'red' }} />
                    <Typography variant="body2">
                      {formData.agreement_file instanceof File 
                        ? formData.agreement_file.name 
                        : getFileName(agreementFile)
                      }
                    </Typography>
                  </Box>
                  
                  {agreementFile && !(formData.agreement_file instanceof File) && (
                    <Button
                      size="small"
                      variant="outlined"
                      component="a"
                      href={`${baseurl}${agreementFile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ mr: 1 }}
                    >
                      View File
                    </Button>
                  )}
                  
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={handleRemoveAgreementFile}
                  >
                    Remove File
                  </Button>
                </Box>
              )}
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

            {/* Update Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ 
                    height: '56px',
                    fontSize: '1rem',
                    width: '50%',
                  }}
                >
                  Update Property
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default EditAsset;