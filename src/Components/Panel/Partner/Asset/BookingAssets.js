import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import axios from 'axios';
import { useParams,useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function BookingAssets() {
  const [property, setProperty] = useState({ property_title: '', property_value: '', property_title:"" });
  const [loading, setLoading] = useState(true);
  const [bookingAmount, setBookingAmount] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get("property_id");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://rahul30.pythonanywhere.com/property/${propertyId}/`)
      .then((res) => {
        const prop = res.data;
        setProperty(prop);
        setBookingAmount(calculateBookingAmount(Number(prop.property_value)));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching property:', err);
        setLoading(false);
      });
  }, []);

  const calculateBookingAmount = (value) => {
    if (value <= 500000) return 11000;
    if (value <= 1000000) return 21000;
    if (value <= 2000000) return 51000;
    return 100000;
  };

  const handleBooking = () => {
    const username = localStorage.getItem('user_name');
    const userId = Number(localStorage.getItem('user_id'));
    const propertyValue = Number(property.property_value);
    const agentId = property?.referral_id || null;
    const propertyName = property?.property_title || null;
  
    const payload = {
      property_name: propertyName,
      purchased_from: 'agent',
      purchased_type: 'direct',
      username: username,
      property_value: propertyValue,
      transaction_date: new Date().toISOString().split('T')[0],
      property_id: Number(propertyId),
      agent_id: agentId,
      user_id: userId,
      paid_amount: bookingAmount,
      remaining_amount: propertyValue - bookingAmount,
      payment_type: "Booking-Amount",
      payment_method: "Cash"
    };
  
    console.log("Payload being sent:", payload);
  
    axios.post('https://rahul30.pythonanywhere.com/transactions/', payload)
      .then((res) => {
        console.log('Transaction response:', res.data);
  
        // 👇 Update property status to "booked"
        return axios.put(`https://rahul30.pythonanywhere.com/property/${propertyId}/`, {
          status: 'booked'
        });
      })
      .then((putRes) => {
        console.log('Status updated to booked:', putRes.data);
        alert('Booking successful and status updated!');
        navigate('/p-transaction');
      })
      .catch((err) => {
        alert('Booking or status update failed!');
        console.error('Error:', err.response?.data || err);
      });
  };
  
  
  

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Buy Property
        </Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Property Title"
                  value={property.property_title}
                  variant="outlined"
                  
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Property Value"
                  value={property.property_value}
                  variant="outlined"
                  
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Booking Amount"
                  value={bookingAmount}
                  variant="outlined"
             
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 4 }}
              onClick={handleBooking}
            >
              Book Now
            </Button>
          </>
        )}
      </Container>
    </>
  );
}

export default BookingAssets;
