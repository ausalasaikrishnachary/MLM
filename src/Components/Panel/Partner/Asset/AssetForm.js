import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from '@mui/material';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';

function AssetForm() {
  return (
    <>
    <PartnerHeader/>
    <Container sx={{ mt: 4 }}>
      <Card
        sx={{
          p: 4,
          mb: 4,
          boxShadow: 1,
          maxWidth: '80%',
          mx: 'auto',
          // Allow card height to adjust automatically
          height: 'auto',
          overflowY: 'auto',
        }}
      >
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Asset Master Form
          </Typography>

          {/* Basic Asset Information */}
          <Box
            sx={{
              border: '1px solid #ddd',
              p: 2,
              mb: 4,
              borderRadius: '5px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Basic Asset Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField label="Asset Name" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField label="Asset Type" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField label="Asset Code/ID" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField label="Description" variant="outlined" fullWidth />
              </Grid>
            </Grid>
          </Box>

          {/* Purchase Details */}
          <Box
            sx={{
              border: '1px solid #ddd',
              p: 2,
              mb: 4,
              borderRadius: '5px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Purchase Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Purchase Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Purchase Cost"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Vendor/Supplier"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Invoice Number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>

          {/* Depreciation & Valuation */}
          <Box
            sx={{
              border: '1px solid #ddd',
              p: 2,
              mb: 4,
              borderRadius: '5px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Depreciation &amp; Valuation
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Depreciation Method"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Depreciation Rate (%)"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Useful Life (Years)"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Current Value"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>

          {/* Location & Assignment */}
          <Box
            sx={{
              border: '1px solid #ddd',
              p: 2,
              mb: 4,
              borderRadius: '5px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Location &amp; Assignment
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField label="Location" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField label="Department" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField label="Assigned To" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Documents"
                  type="file"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>

          {/* Maintenance & Condition */}
          <Box
            sx={{
              border: '1px solid #ddd',
              p: 2,
              mb: 4,
              borderRadius: '5px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Maintenance &amp; Condition
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Last Maintenance Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Next Maintenance Due"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Condition" variant="outlined" fullWidth />
              </Grid>
            </Grid>
          </Box>

          {/* Disposal Details */}
          <Box
            sx={{
              border: '1px solid #ddd',
              p: 2,
              mb: 4,
              borderRadius: '5px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Disposal Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Disposal Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Disposal Method"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Disposal Value"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained">Submit</Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
    </>
  );
}

export default AssetForm;
