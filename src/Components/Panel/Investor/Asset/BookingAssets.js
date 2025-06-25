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
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';
import jsPDF from 'jspdf';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ReceiptDocument from '../../../ReceiptDocument'; 

function I_BookingAssets() {  
  const [property, setProperty] = useState({ property_title: '', total_property_value: '' });
  const [loading, setLoading] = useState(true);
  const [referralAgents, setReferralAgents] = useState([]);
  const [selectedReferralId, setSelectedReferralId] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get("property_id");
  const navigate = useNavigate();
  const loggedInReferralId = localStorage.getItem('referral_id');

  useEffect(() => {
    // Fetch Property
    axios.get(`${baseurl}/property/${propertyId}/`)
      .then((res) => {
        const prop = res.data;
        setProperty(prop);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching property:', err);
        setLoading(false);
      });

    // Fetch Agent Referral IDs
    axios.get(`${baseurl}/users/role/Agent/`)
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

const generateReceipt = async (invoiceNumber) => {
  try {
    const invoiceData = {
      property: {
        title: property.property_title,
        value: property.total_property_value,
        bookingAmount: property.booking_amount || '0',
        total: property.booking_amount || '0',
      },
      invoice_number: invoiceNumber
    };

    const pdfBlob = await pdf(<ReceiptDocument {...invoiceData} />).toBlob();
    return pdfBlob;
  } catch (error) {
    console.error('Error generating receipt:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

  const handleBooking = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("user_id");

    try {
      const initiatePayload = {
        user_id: userId,
        property_id: property.property_id,
        payment_type: "Booking-Amount",
        redirect_url: "https://shrirajteam.com/i-transactions",
      };

      const initiateRes = await fetch(`${baseurl}/property/initiate-payment/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(initiatePayload),
      });

      if (!initiateRes.ok) {
        const error = await initiateRes.json();
        throw new Error(`Initiate Payment Error: ${JSON.stringify(error)}`);
      }

      const initiateData = await initiateRes.json();
      const { merchant_order_id, payment_url } = initiateData;

      // Save to localStorage
      localStorage.setItem("merchant_order_id", merchant_order_id);
      localStorage.setItem("user_id", userId);
      localStorage.setItem("property_id", property.property_id);
      localStorage.setItem("payment_type", "Booking-Amount");

      // Redirect to payment gateway
      window.location.href = payment_url;

    } catch (error) {
      console.error("Payment Initiation Failed:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  return (
    <>
      <InvestorHeader />
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
                  value={property.booking_amount || ''}
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item xs={12} lg={4}>
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
              </Grid> */}
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

export default I_BookingAssets;