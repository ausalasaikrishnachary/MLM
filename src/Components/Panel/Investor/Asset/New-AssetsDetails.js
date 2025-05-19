import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Container, Typography, Grid, Box, Button, Divider, Chip
} from '@mui/material';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';

const AssetDetail = () => {
  const location = useLocation();
  const { property } = location.state || {};
  const { id } = useParams();

  if (!property) {
    return <Typography>Loading property details...</Typography>;
  }

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <>
      <InvestorHeader />
      <Container sx={{ py: 4 }}>
         <Box mt={1}>
          <Button variant="outlined" href="/i-myassets">Back</Button>
        </Box> 
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Typography variant="h4">{property.property_title}</Typography>
          <Chip 
            label={property.status.toUpperCase()} 
            color={property.status === 'booked' ? 'secondary' : 'primary'} 
          />
        </Box>

        <Grid container spacing={3}>
          {/* Property Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={property.images.length > 0 ? `https://rahul30.pythonanywhere.com${property.images[0].image}` : 'https://via.placeholder.com/300'}
              alt={property.property_title}
              sx={{ 
                width: '100%', 
                borderRadius: 2,
                mb: 2
              }}
            />
            {property.videos.length > 0 && (
              <Typography variant="body2" mb={2}>Videos available: {property.videos.length}</Typography>
            )}

            <Typography variant="h6" gutterBottom>Features</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography><strong>Floors:</strong> {property.number_of_floors}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Facing:</strong> {property.facing}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Open Sides:</strong> {property.number_of_open_sides}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Roads:</strong> {property.number_of_roads}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Road Width 1:</strong> {property.road_width_1_ft} ft</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Road Width 2:</strong> {property.road_width_2_ft} ft</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Ownership:</strong> {property.ownership_type}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Bedrooms:</strong> {property.number_of_bedrooms || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Bathrooms:</strong> {property.number_of_bathrooms || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Balconies:</strong> {property.number_of_balconies || 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" mt={3} gutterBottom>Additional Information</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography><strong>Property Uniqueness:</strong> {property.property_uniqueness || 'N/A'}</Typography>
            <Typography><strong>Location Advantages:</strong> {property.location_advantages || 'N/A'}</Typography>
            <Typography><strong>Other Features:</strong> {property.other_features || 'N/A'}</Typography>
          </Grid>

          {/* Property Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Basic Information</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2} mb={3}>
              <Grid item xs={6}>
                <Typography><strong>Looking to:</strong> {property.looking_to}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Property Value:</strong> {formatCurrency(property.property_value)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Category:</strong> {property.category}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Property Type:</strong> {property.property_type}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Description:</strong> {property.description}</Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>Address</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography mb={3}>
              {property.address}, {property.city}, {property.state}, {property.country} - {property.pin_code}
            </Typography>
            <Typography><strong>Coordinates:</strong> {property.latitude}, {property.longitude}</Typography>

            <Typography variant="h6" mt={3} gutterBottom>Dimensions</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2} mb={3}>
              <Grid item xs={6}>
                <Typography><strong>Plot Area:</strong> {property.plot_area_sqft} sq.ft</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Built-up Area:</strong> {property.builtup_area_sqft} sq.ft</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Length:</strong> {property.length_ft} ft</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Breadth:</strong> {property.breadth_ft} ft</Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>Owner Details</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography mb={3}>
              <strong>Name:</strong> {property.owner_name}<br />
              <strong>Contact:</strong> {property.owner_contact}<br />
              <strong>Email:</strong> {property.owner_email}
            </Typography>

            <Typography variant="h6" gutterBottom>System Information</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2">
              <strong>Created At:</strong> {new Date(property.created_at).toLocaleString()}<br />
              <strong>Updated At:</strong> {new Date(property.updated_at).toLocaleString()}<br />
              <strong>User ID:</strong> {property.user_id}
            </Typography>
          </Grid>
        </Grid>

       
      </Container>
    </>
  );
};

export default AssetDetail;