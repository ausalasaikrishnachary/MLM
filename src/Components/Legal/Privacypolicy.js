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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          mt: -15,
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
              mt: 16,
            }}
          >
            {/* Header */}
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
              <Typography variant="body2" paragraph>
                We, Shriraj Property Solutions Pvt. Ltd. and our affiliated companies worldwide, are committed to respecting your online privacy and recognize your need for appropriate protection and management of any personally identifiable information you share with us.
              </Typography>

              <Typography variant="body2" paragraph>
                This Privacy Policy (“Policy”) governs our website available at www.shrirajteam.com and our mobile application (collectively, the “Platform”). The Policy describes how Shriraj Property Solutions Pvt. Ltd. (hereinafter referred to as the “Company”) collects, uses, discloses and transfers personal data of users while browsing the Platform or availing specific services therein (the “Services”).
              </Typography>

              <Typography variant="body2" paragraph>
                This Policy describes how we process personal data of all users of our Platform or Services, including buyers, renters, owners, dealers, brokers, and website visitors.
              </Typography>

              <Typography variant="body2" paragraph>
                If you wish to access, verify, correct, complete, update or erase any of your Personal Data collected through the Platforms or Services, you may write to us at <strong>shrirajproperty00@gmail.com</strong>.
              </Typography>

              <Typography variant="body2" paragraph>
                You may withdraw your consent for any or all processing of your Personal Data by contacting <strong>shrirajproperty00@gmail.com</strong>. Do note however, that the Company reserves the right to refuse to provide you access to the Platform and Services in circumstances where such Personal Data is essential to the provision of the Platform and Services.
              </Typography>

              <Typography variant="body2" paragraph>
                We (or our service providers or partners) may communicate with you through voice calls, text messages, emails, Platform notifications, or other means. The communication may relate to:
                <ul>
                  <li>Your purchases, payments, or other messages related to your use of the Platform</li>
                  <li>Offers or promotions about our Platform, new features or Services</li>
                </ul>
                You may opt out of receiving promotional offers by writing to our grievance officer. We may still need to send you non-promotional communication (information about the Platforms and Services).
              </Typography>

              <Typography variant="body2" paragraph>
                Please note that the Platform sometimes displays advertisements or contains links to third-party websites that may collect personal data, and those are not governed by this Policy. The Company will not be responsible for the privacy practices of such websites. The Company recommends that you review the privacy policy of each third-party site linked from the Platform to determine their use of your Personal Data.
              </Typography>

              <Typography variant="body2" paragraph>
                The Platform reserves the right to update, change or modify this Policy at any time. The Policy shall come into effect from the date of such update, change or modification.
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
                I have read and accept the Privacy Policy
              </Button>
            </Box>
          </Paper>
      </Box>
    </>
  );
};

export default Privacypolicy;
