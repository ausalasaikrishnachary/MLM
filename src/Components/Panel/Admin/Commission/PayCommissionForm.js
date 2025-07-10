import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Grid, TextField, Typography, CircularProgress, Box, Button
} from '@mui/material';
import Header from "../../../Shared/Navbar/Navbar";
import Swal from 'sweetalert2';
import { baseurl } from '../../../BaseURL/BaseURL';

function PayCommissionForm() {
    const navigate = useNavigate();
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [payCommissionAmount, setPayCommissionAmount] = useState('');
    const [updating, setUpdating] = useState(false);
    const [paymentMode, setPaymentMode] = useState('');

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`${baseurl}/property/${propertyId}/`);
                setProperty(response.data);
            } catch (err) {
                setError('Failed to fetch property data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [propertyId]);

const handleUpdateCommission = async () => {
    if (!payCommissionAmount || !paymentMode) {
        Swal.fire('Error', 'Please enter amount and select payment mode.', 'error');
        return;
    }

    if (!property?.property_id || !property?.user_id) {
        Swal.fire('Error', 'Missing property or user information.', 'error');
        return;
    }

    const payload = {
        property_id: property.property_id,
        user_id: property.user_id,
        paid_amount: payCommissionAmount,
        payment_mode: paymentMode
    };

    console.log("Submitting payload:", payload); // ✅ log for debugging

    setUpdating(true);
    try {
        const response = await axios.post(`${baseurl}/pay/agent-commission/`, payload);
        Swal.fire('Success', 'Commission paid successfully.', 'success').then(() => {
            navigate(`/a-commissions/${property.user_id}`);
        });
    } catch (error) {
        console.error('Submission Error:', error);
        const errorMsg = error.response?.data?.error || 'Failed to pay commission.';
        Swal.fire('Error', errorMsg, 'error');
    } finally {
        setUpdating(false);
    }
};


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !property) {
        return (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h6" color="error">{error || 'Property not found.'}</Typography>
            </Box>
        );
    }

    return (
        <>
            <Header />
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ textAlign: "center" }} gutterBottom>
                    Pay Commission Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={4}>
                        <TextField
                            fullWidth
                            label="Property Title"
                            value={property.property_title || ''}
                            variant="outlined"
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <TextField
                            fullWidth
                            label="Agent Commission"
                            value={property.agent_commission || ''}
                            variant="outlined"
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <TextField
                            fullWidth
                            label="Commission Balance"
                            value={property.agent_commission_balance || ''}
                            variant="outlined"
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <TextField
                            fullWidth
                            label="Commission Paid"
                            value={property.agent_commission_paid || ''}
                            variant="outlined"
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <TextField
                            fullWidth
                            label="Pay Commission Amount"
                            value={payCommissionAmount}
                            onChange={(e) => setPayCommissionAmount(e.target.value)}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0 }}
                        />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <TextField
                            select
                            fullWidth
                            label="Payment Mode"
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                            variant="outlined"
                            SelectProps={{ native: true }}
                        >
                            <option value=""></option>
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="Cheque">Cheque</option>
                            <option value="NEFT">NEFT</option>
                            <option value="RTGS">RTGS</option>
                            <option value="Net Banking">Net Banking</option>
                            <option value="Others">Others</option>
                        </TextField>
                    </Grid>
                </Grid>

                <Grid item xs={12} lg={4} sx={{ display: 'flex', alignItems: 'center', marginTop: "10px" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateCommission}
                        disabled={updating}
                    >
                        {updating ? 'Updating...' : 'Pay Now'}
                    </Button>
                </Grid>
            </Box>
        </>
    );
}

export default PayCommissionForm;
