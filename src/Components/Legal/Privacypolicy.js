import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import LegalNavbar from '../Shared/LegalNavbar'; 
import { useNavigate } from 'react-router-dom';

const Privacypolicy = () => {
  const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '20px',
  };
  const navigate = useNavigate();


  return (
      <>
      
      {/* <LegalNavbar /> */}
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
            Privacy Policy
          </Typography>
          <Typography variant="body2">
            <strong>Effective Date:</strong> June 9, 2025
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
          <Typography style={sectionTitleStyle}>1. Introduction</Typography>
          <Typography variant="body2">
            This Privacy Policy describes how Shriraj collects, uses, and protects your personal information when you use our platform to buy, sell, rent, or lease properties.
            By using the platform, you agree to the practices outlined below.
          </Typography>

          <Typography style={sectionTitleStyle}>2. Information We Collect</Typography>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, address, etc.</li>
            <li><strong>Property Details:</strong> Listings, preferences, and inquiry data.</li>
            <li><strong>Device & Usage Data:</strong> IP address, browser type, device info, and usage activity.</li>
            <li><strong>Documents:</strong> KYC documents, property documents, and proof of identity if uploaded.</li>
          </ul>

          <Typography style={sectionTitleStyle}>3. How We Use Your Information</Typography>
          <ul>
            <li>To facilitate transactions between clients and agents/builders.</li>
            <li>To improve user experience and personalize services.</li>
            <li>To send updates, alerts, and promotional messages via email, SMS, or phone.</li>
            <li>To comply with legal obligations and platform policies.</li>
          </ul>

          <Typography style={sectionTitleStyle}>4. Data Sharing</Typography>
          <Typography variant="body2">
            We may share your information with:
          </Typography>
          <ul>
            <li>Agents, brokers, and builders you interact with.</li>
            <li>Third-party service providers for verification, analytics, or communication.</li>
            <li>Regulatory authorities when legally required.</li>
          </ul>
          <Typography variant="body2">
            We do not sell your data to third parties for profit.
          </Typography>

          <Typography style={sectionTitleStyle}>5. Third-Party Logins</Typography>
          <Typography variant="body2">
            If you log in using Google or Facebook, we may access public profile information with your consent.
            This is used for authentication and personalization purposes only.
          </Typography>

          <Typography style={sectionTitleStyle}>6. Data Security</Typography>
          <Typography variant="body2">
            We implement standard security practices to protect your information from unauthorized access or misuse.
            However, no system can be 100% secure, and we cannot guarantee absolute security.
          </Typography>

          <Typography style={sectionTitleStyle}>7. Your Rights</Typography>
          <ul>
            <li>Access your data at any time by contacting us.</li>
            <li>Request correction or deletion of inaccurate data.</li>
            <li>Opt out of marketing communications via provided links or settings.</li>
          </ul>

          <Typography style={sectionTitleStyle}>8. Data Retention</Typography>
          <Typography variant="body2">
            We retain your information as long as your account is active or as needed to comply with legal obligations and resolve disputes.
          </Typography>

          <Typography style={sectionTitleStyle}>9. Children's Privacy</Typography>
          <Typography variant="body2">
            Our services are not intended for children under the age of 18. We do not knowingly collect data from minors.
          </Typography>

          <Typography style={sectionTitleStyle}>10. Changes to This Policy</Typography>
          <Typography variant="body2">
            We may update this policy occasionally. We will notify you of significant changes via email or through the platform.
          </Typography>

          <Typography style={sectionTitleStyle}>11. Contact Us</Typography>
          <Typography variant="body2">
            If you have questions about this policy, please contact our support team through the app or via email.
          </Typography>

          <Typography style={sectionTitleStyle}>12. Governing Law</Typography>
          <Typography variant="body2">
            This Privacy Policy is governed by the laws of India.
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
          <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate('/login')}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/login')}
      >
        I have read and accept the terms of service
      </Button>
        </Box>
      </Paper>
    </Box>
    </>
  );
};

export default Privacypolicy;
