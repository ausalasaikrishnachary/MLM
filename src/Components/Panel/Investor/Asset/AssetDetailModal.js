// AssetDetailModal.js
import React from 'react';
import { Modal, Box, Typography, Button, CardMedia } from '@mui/material';

const AssetDetailModal = ({ open, handleClose, assetDetails }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          height: '80%',
          margin: '0 auto',
          backgroundColor: 'white',
          padding: 3,
          borderRadius: '8px',
          boxShadow: 24,
        }}
      >
        {/* Left Side - Image */}
        <Box sx={{ width: '50%' }}>
          <CardMedia
            component="img"
            height="100%"
            image={assetDetails.image}
            alt={assetDetails.leftText}
            sx={{ borderRadius: '8px', objectFit: 'cover' }}
          />
        </Box>

        {/* Right Side - Content */}
        <Box sx={{ width: '50%', paddingLeft: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            <strong>Location:</strong> {assetDetails.location}
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Investment Type:</strong> {assetDetails.investmentType}
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Expected Holding Period:</strong> {assetDetails.holdingPeriod}
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Projected Annual Return:</strong> 15%
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Property Area:</strong> 50,000 sq.ft
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Rental Occupancy:</strong>95%
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Lease Tenure:</strong> 10 years (Fixed)
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Tenant:</strong>Leading Manufacturing Firm
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Property Age:</strong>3 years
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Exit Strategy:</strong>Open market resale or REIT lising
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Tax Benefits:</strong>Depreciations claims & capital gains exemption
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Management Fees:</strong>1.5% annually
          </Typography>
          {/* Add more static lines if needed */}

          {/* <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button >
<Button variant="contained" color="primary">invest now

</Button> */}

          {/* Buttons Row */}
          <Box sx={{
            display: 'flex',
            // justifyContent: 'space-between',
            padding: 2,
            backgroundColor: 'white',
            borderTop: '1px solid #ddd',
            gap: '10px'
          }}>
            <Button variant="contained" color="primary" onClick={handleClose} sx={{
              backgroundColor: '#8FD14F', color: 'white'
            }}>
              Close
            </Button>
            <Button variant="contained" sx={{
              backgroundColor: '#185519', color: 'white'
            }}>
              Invest Now
            </Button>
          </Box>


        </Box>




      </Box>
    </Modal>
  );
};

export default AssetDetailModal;
