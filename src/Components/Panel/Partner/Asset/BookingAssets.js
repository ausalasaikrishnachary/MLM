import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import axios from 'axios';

import { useParams,useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';

function BookingAssets() {
  const [property, setProperty] = useState({ property_title: '', total_property_value: '' });
  const [loading, setLoading] = useState(true);
  const [bookingAmount, setBookingAmount] = useState(0);
  const [referralAgents, setReferralAgents] = useState([]);
  const [selectedReferralId, setSelectedReferralId] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get("property_id");
  const navigate = useNavigate();
  const loggedInReferralId = localStorage.getItem('referral_id');

  useEffect(() => {

    axios.get(`${baseurl}/property/${propertyId}/`)

    // Fetch Property
    axios.get(`https://rahul30.pythonanywhere.com/property/${propertyId}/`)

      .then((res) => {
        const prop = res.data;
        setProperty(prop);
        setBookingAmount(calculateBookingAmount(Number(prop.total_property_value)));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching property:', err);
        setLoading(false);
      });

    // Fetch Agent Referral IDs (excluding current user's referral_id)
    axios.get('https://rahul30.pythonanywhere.com/users/role/Agent/')
      .then((res) => {
        const agentsWithReferral = res.data.filter(
          agent => agent.referral_id && agent.referral_id !== loggedInReferralId
        );
        setReferralAgents(agentsWithReferral);
      })
      .catch((err) => {
        console.error('Error fetching agents:', err);
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
    const propertyValue = Number(property.total_property_value);
    const agentId = property?.user_id || null;
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
      payment_method: "Cash",
    };

    axios.post('https://rahul30.pythonanywhere.com/transactions/', payload)
      .then(() => {
        return axios.put(`https://rahul30.pythonanywhere.com/property/${propertyId}/`, {
          status: 'booked',
          mediator_referral_id: selectedReferralId || " " // send blank if not selected
        });
      })
      .then(() => {
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
                  value={property.total_property_value}
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
              <Grid item xs={12} lg={4}>
                <FormControl fullWidth>
                  <InputLabel>Mediator Referral ID</InputLabel>
                  <Select
                    value={selectedReferralId}
                    onChange={(e) => setSelectedReferralId(e.target.value)}
                    label="Mediator Referral ID"
                  >
                    {referralAgents.map(agent => (
                      <MenuItem key={agent.id} value={agent.referral_id}>
                        {agent.referral_id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
