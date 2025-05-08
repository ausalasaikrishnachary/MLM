import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Container, Typography, Grid, Box, Button
} from '@mui/material';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';

const AssetDetail = () => {
  const location = useLocation();
  const { property } = location.state || {};
  const { id } = useParams();

  if (!property) {
    return <Typography>Loading property details...</Typography>;
  }

  return (
    <>
    <PartnerHeader/>
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {property.property_title}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={property.images.length > 0 ? `https://rahul30.pythonanywhere.com/${property.images[0].image}` : 'https://via.placeholder.com/300'}
            alt={property.property_title}
            sx={{ width: '100%', borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography><strong>Description:</strong> {property.description}</Typography>
          <Typography><strong>Address:</strong> {property.address}, {property.city}, {property.state}, {property.country} - {property.pin_code}</Typography>
          <Typography><strong>Latitude:</strong> {property.latitude}</Typography>
          <Typography><strong>Longitude:</strong> {property.longitude}</Typography>
          <Typography><strong>Owner:</strong> {property.owner_name} - {property.owner_contact}</Typography>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Button variant="outlined" href="/p-assets">Back</Button>
      </Box>
    </Container>
    </>
  );
};

export default AssetDetail;
