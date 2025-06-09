import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import LegalNavbar from '../Shared/LegalNavbar'; 

const Refundpolicy = () => {
  const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '20px',
  };

  return (
     <>
     <LegalNavbar />
    <Box
      sx={{
        height: '100vh',
        // backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
         mt:-15,
      }}
    >
       
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 900,
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          mt:16,
        }}
      >
        {/* Fixed Header */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 1,
            p: 3,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Refund Policy
          </Typography>
        </Box>

        {/* Scrollable Content */}
        <Box
          sx={{
            overflowY: 'auto',
            flex: 1,
            px: 3,
            pt: 2,
            pb: 1,
            backgroundColor: '#fff',
          }}
        >
          <Typography style={sectionTitleStyle}>1. Overview</Typography>
          <Typography variant="body2">
            At Shriraj, we strive to provide excellent service and ensure customer satisfaction. This Refund Policy outlines the terms under which refunds may be issued.
          </Typography>

          <Typography style={sectionTitleStyle}>2. Eligibility for Refunds</Typography>
          <ul>
            <li>Refunds may be considered only for payments made for premium services, promotions, or listing fees.</li>
            <li>Requests must be submitted within 30 days from the date of payment.</li>
            <li>Refunds are not provided for transactions related to property purchases, rentals, or leases facilitated through the platform.</li>
          </ul>

          <Typography style={sectionTitleStyle}>3. Process for Requesting Refunds</Typography>
          <Typography variant="body2">
            To request a refund, please contact our customer support team with your payment details and reason for the refund.
            We reserve the right to verify the claim and request additional information.
          </Typography>

          <Typography style={sectionTitleStyle}>4. Refund Approval and Processing</Typography>
          <ul>
            <li>Once a refund request is approved, the refund will be processed within 7-10 business days.</li>
            <li>Refunds will be made through the original mode of payment wherever possible.</li>
            <li>In cases where original payment method refund is not feasible, alternate arrangements will be communicated.</li>
          </ul>

          <Typography style={sectionTitleStyle}>5. Non-Refundable Items</Typography>
          <ul>
            <li>Any payments related to third-party services, including payment gateway fees.</li>
            <li>Fees paid to agents, brokers, or external vendors.</li>
            <li>Any penalties, fines, or government charges.</li>
          </ul>

          <Typography style={sectionTitleStyle}>6. Cancellation Policy</Typography>
          <Typography variant="body2">
            Users may cancel paid services before they are rendered. Cancellation requests must be submitted in writing. Refund eligibility will be evaluated as per this policy.
          </Typography>

          <Typography style={sectionTitleStyle}>7. Changes to Refund Policy</Typography>
          <Typography variant="body2">
            Shriraj reserves the right to update this Refund Policy at any time. Changes will be communicated via email or platform notifications.
          </Typography>

          <Typography style={sectionTitleStyle}>8. Contact Information</Typography>
          <Typography variant="body2">
            For questions or concerns regarding refunds, please contact our support team through the app or email.
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #e0e0e0',
            backgroundColor: '#fff',
          }}
        >
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            I have read and accept the refund policy.
          </Button>
        </Box>
      </Paper>
      
    </Box>
    </>
    
  );
};

export default Refundpolicy;
