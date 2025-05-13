import React, { useEffect, useState } from 'react';
import {
  Grid, TextField, Button, Typography, Container
} from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Header from '../../../Shared/Navbar/Navbar';
import Swal from 'sweetalert2';

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
    owner_name: '',
    owner_contact: '',
    owner_email: '',
    images: [],
    amenities: [],
  });

  useEffect(() => {
    if (property) {
      setFormData({ ...property });
    } else {
      fetch(`https://rahul30.pythonanywhere.com/property/${id}/`)
        .then(res => res.json())
        .then(data => setFormData(data))
        .catch(err => console.error('Error fetching property:', err));
    }
  }, [property, id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };


  const handleSubmit = async () => {
    try {
      const submitData = new FormData();
      for (const key in formData) {
        if (key === 'images') {
          formData.images.forEach((img, index) => {
            submitData.append('images', img); // field name should match your backend
          });
        } else if (formData[key] !== null && formData[key] !== undefined) {
          submitData.append(key, formData[key]);
        }
      }

      const response = await fetch(`https://rahul30.pythonanywhere.com/property/${id}/`, {
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


  return (
    <>
      <Header />
      <Container sx={{ py: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>Edit Property</Typography>
        <Grid container spacing={3}>
          {/* Column 1 */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Property Title"
              name="property_title"
              value={formData.property_title}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="PIN Code"
              name="pin_code"
              value={formData.pin_code}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
             <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
              Upload Property Image
             <input
  type="file"
  accept="image/*"
  hidden
  multiple
  onChange={handleFileChange}
/>
            </Button>
            {formData.images && (
              <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
                {formData.images.name || 'Image attached'}
              </Typography>
            )}
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Plot Area (sqft)"
              name="plot_area_sqft"
              value={formData.plot_area_sqft}
              onChange={handleChange}
              fullWidth
              type="number"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Built-up Area (sqft)"
              name="builtup_area_sqft"
              value={formData.builtup_area_sqft}
              onChange={handleChange}
              fullWidth
              type="number"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Property Value"
              name="property_value"
              value={formData.property_value}
              onChange={handleChange}
              fullWidth
              type="number"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Owner Name"
              name="owner_name"
              value={formData.owner_name}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Owner Contact"
              name="owner_contact"
              value={formData.owner_contact}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Column 3 */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Owner Email"
              name="owner_email"
              value={formData.owner_email}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
              <TextField
              label="Amenities"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              
            />
            <TextField
              label="Amenities"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              multiline
              rows={4}
            />

            <TextField
              label="Property Value"
              name="property_value"
              value={formData.property_value}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Total Property Value"
              name="total_property_value"
              value={formData.total_property_value}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Agent Commission"
              name="agent_commission"
              value={formData.agent_commission}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Company Commission"
              name="company_commission"
              value={formData.company_commission}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
              Upload Property Image
              <input
                type="file"
                accept="image/*"
                hidden
                multiple
                onChange={handleFileChange}
              />
            </Button>
            {formData.images && (
              <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
                {formData.images.name || 'Image attached'}
              </Typography>
            )}
          </Grid>
          
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size="large"
            >
              Update Property
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditAsset;