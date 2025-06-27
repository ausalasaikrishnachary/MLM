import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Grid, TextField, Typography, CircularProgress, Box, Button
} from '@mui/material';
import Header from "../../../Shared/Navbar/Navbar";
import Swal from 'sweetalert2';
import { baseurl } from '../../../BaseURL/BaseURL';
import { useNavigate } from 'react-router-dom';

function PayCommissionForm() {
    const navigate = useNavigate();
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [payCommissionAmount, setPayCommissionAmount] = useState('');
    const [updating, setUpdating] = useState(false);

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
        const amount = parseFloat(payCommissionAmount);

        if (!amount || amount <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Amount',
                text: 'Enter a valid commission amount.'
            });
            return;
        }

        const agentCommission = parseFloat(property.agent_commission);
        const paid = parseFloat(property.agent_commission_paid || 0);
        const balance = parseFloat(property.agent_commission_balance || 0);

        if (amount > balance) {
            Swal.fire({
                icon: 'error',
                title: 'Exceeded Balance',
                text: 'Amount exceeds remaining commission balance.'
            });
            return;
        }

        const updatedProperty = {
            ...property,
            agent_commission_paid: paid + amount,
            agent_commission_balance: agentCommission - (paid + amount),
        };

        try {
            setUpdating(true);
            await axios.put(`${baseurl}/property/${propertyId}/`, updatedProperty);

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Commission updated successfully!',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                navigate('/a-commission');
            });


            setProperty(updatedProperty);
            setPayCommissionAmount('');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Failed to update commission.'
            });
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
                <Typography variant="h5" sx={{ textAlign: "center" }} gutterBottom>Pay Commission Details</Typography>
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
