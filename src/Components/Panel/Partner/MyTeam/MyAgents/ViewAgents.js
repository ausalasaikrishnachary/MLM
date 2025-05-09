import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Grid,
  Divider,
  Chip,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PartnerHeader from '../../../../Shared/Partner/PartnerNavbar';

const ActiveUserView = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(`https://rahul30.pythonanywhere.com/users/${id}/`);
        setAgent(response.data);
      } catch (error) {
        console.error('Error fetching agent details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <>
        <PartnerHeader />
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (!agent) {
    return (
      <>
        <PartnerHeader />
        <Box display="flex" justifyContent="center" mt={5}>
          <Typography variant="h6">No data found for this agent.</Typography>
        </Box>
      </>
    );
  }

  // Reusable DetailItem component with bold labels and no underline
  const DetailItem = ({ label, value, children }) => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'baseline',
      mb: 2,
      gap: 1
    }}>
      <Typography 
        variant="subtitle2" 
        sx={{ 
          minWidth: '140px',
          fontWeight: 'bold',
          color: 'text.primary' // Changed from textSecondary to primary for better contrast
        }}
      >
        {label}:
      </Typography>
      {children || <Typography component="span">{value || '—'}</Typography>}
    </Box>
  );

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3,
          maxHeight: 'calc(100vh - 150px)',
          overflowY: 'auto',
          pr: 1,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '3px',
          },
        }}>
          <Typography variant="h5" fontWeight="bold">
            Agent Details
          </Typography>

          {/* Personal Details Section */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Personal Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <DetailItem label="Username" value={agent.username} />
                <DetailItem label="Email" value={agent.email} />
                <DetailItem label="Phone Number" value={agent.phone_number} />
                <DetailItem label="Referral ID" value={agent.referral_id} />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailItem label="First Name" value={agent.first_name} />
                <DetailItem label="Last Name" value={agent.last_name} />
                <DetailItem label="Date of Birth" value={agent.date_of_birth} />
                <DetailItem label="Gender" value={agent.gender} />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailItem label="Status">
                  <Chip 
                    label={agent.status} 
                    color={getStatusColor(agent.status)} 
                    size="small"
                  />
                </DetailItem>
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailItem label="Address" value={
                  `${agent.address || ''}${agent.city ? ', ' + agent.city : ''}${agent.state ? ', ' + agent.state : ''}${agent.country ? ', ' + agent.country : ''}${agent.pin_code ? ' - ' + agent.pin_code : ''}` || '—'
                } />
              </Grid>
            </Grid>
          </Paper>

          {/* Bank Details Section */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Bank Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <DetailItem label="Account Holder" value={agent.account_holder_name} />
                <DetailItem label="Bank Name" value={agent.bank_name} />
                <DetailItem label="Branch Name" value={agent.branch_name} />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailItem label="Account Number" value={agent.account_number} />
                <DetailItem label="Account Type" value={agent.account_type} />
                <DetailItem label="IFSC Code" value={agent.ifsc_code} />
              </Grid>
            </Grid>
          </Paper>

          {/* KYC Details Section */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              KYC Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <DetailItem label="PAN Number" value={agent.pan_number} />
                <DetailItem label="Aadhaar Number" value={agent.aadhaar_number} />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailItem label="KYC Status">
                  <Chip 
                    label={agent.kyc_status} 
                    color={agent.kyc_status === 'Verified' ? 'success' : 'warning'} 
                    size="small"
                  />
                </DetailItem>
                <DetailItem label="Nominee Reference" value={agent.nominee_reference_to} />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default ActiveUserView;