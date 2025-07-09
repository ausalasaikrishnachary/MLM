import React, { useState, useEffect } from 'react';
import { Button, Grid, Modal, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubscriptionProtectedButton = ({ 
  userId, 
  buttonText, 
  navigateTo,
  baseurl 
}) => {
  const [subscriptionPaid, setSubscriptionPaid] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios.get(`${baseurl}/user-subscriptions/user-id/${userId}/`)
        .then(response => {
          const latest = response.data.find(item => item.latest_status !== undefined);
          setSubscriptionPaid(latest?.latest_status === "paid");
        })
        .catch(error => {
          console.error("Subscription fetch error:", error);
        });
    }
  }, [userId, baseurl]);

  const handleButtonClick = () => {
    if (subscriptionPaid) {
      navigate(navigateTo);
    } else {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => setOpenModal(false);
  const handleSubscribe = () => navigate('/p-plans');

  return (
    <>
      <Grid item xs={12} md={3}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            padding: '12px 24px',
            borderRadius: '8px',
            backgroundColor: '#2ECC71',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': { backgroundColor: '#27AE60' }
          }}
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      </Grid>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px'
        }}>
           <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
      Subscription Required
    </Typography>
    <Typography variant="body1" sx={{ mb: 3 }}>
      You need an active subscription to <Box component="span" sx={{ fontWeight: 'bold' }}>Add Properties</Box>.
    </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubscribe}
              sx={{ backgroundColor: '#2ECC71', '&:hover': { backgroundColor: '#27AE60' } }}
            >
              Subscribe Now
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SubscriptionProtectedButton;