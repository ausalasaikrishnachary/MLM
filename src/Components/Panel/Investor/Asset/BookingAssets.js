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

const generateReceipt = async () => {
  try {
    // Prepare all the data needed for the InvoiceDocument
    const invoiceData = {
      property: {
        title: property.property_title,
        value: property.total_property_value,
        bookingAmount: property.booking_amount || '0',
        total: property.booking_amount || '0'
      },
    };

    // Create PDF using InvoiceDocument component
    const pdfBlob = await pdf(<ReceiptDocument {...invoiceData} />).toBlob();
    
    // Save the PDF
    const fileName = `Booking_Receipt_${property.property_title.replace(/\s+/g, '_')}.pdf`;
    saveAs(pdfBlob, fileName);
    
    return true;
  } catch (error) {
    console.error('Error generating receipt:', error);
    Swal.fire({
      icon: 'error',
      title: 'Receipt Generation Failed',
      text: 'There was an error generating the receipt PDF.'
    });
    return false;
  }
};

const handleBooking = async () => {
  try {
    const username = localStorage.getItem('user_name');
    const userId = Number(localStorage.getItem('user_id'));
    const propertyValue = Number(property.total_property_value);
    const agentId = property?.user_id || null;
    const propertyName = property?.property_title || null;
    const paidAmount = Number(property.booking_amount);
    const remainingAmount = propertyValue - paidAmount;

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
      paid_amount: paidAmount,
      remaining_amount: remainingAmount,
      payment_type: "Booking-Amount",
      payment_method: "Cash",
    };

    // Step 1: Create transaction
    await axios.post(`${baseurl}/transactions/`, payload);

    // Step 2: Update property status
    await axios.put(`${baseurl}/property/${propertyId}/`, {
      status: 'booked',
    });

    // Step 3: Generate receipt
    const receiptGenerated = await generateReceipt();

    if (receiptGenerated) {
      Swal.fire({
        icon: 'success',
        title: 'Booking Successful!',
        text: 'Transaction completed and property status updated.',
        confirmButtonColor: '#3085d6',
        timer: 2500,
        showConfirmButton: false
      });
      navigate('/i-transactions');
    }
  } catch (err) {
    console.error('Error:', err.response?.data || err);
    Swal.fire({
      icon: 'error',
      title: 'Booking Failed',
      text: err.response?.data?.message || 'Booking or status update failed.',
      confirmButtonColor: '#d33'
    });
  }
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