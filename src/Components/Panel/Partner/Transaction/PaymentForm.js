import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    TextField,
    Button,
    CircularProgress,
    Typography,
} from '@mui/material';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import { baseurl } from '../../../BaseURL/BaseURL';

function PaymentForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get('transaction_id');
    const propertyId = queryParams.get('property_id');
    const [agentCommission, setAgentCommission] = useState('');
    const [companyCommission, setCompanyCommission] = useState('');

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch transaction data
    useEffect(() => {
        if (transactionId) {
            fetch(`${baseurl}/transactions/${transactionId}/`)
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to fetch data');
                    return res.json();
                })
                .then((data) => {
                    setFormData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [transactionId]);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
    if (propertyId) {
        fetch(`${baseurl}/property/${propertyId}/`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch property data');
                return res.json();
            })
            .then((data) => {
                if (data && data.agent_commission !== undefined) {
                    setAgentCommission(data.agent_commission);
                    setCompanyCommission(data.company_commission);
                    console.log("agentcommission", data.agent_commission)
                }
            })
            .catch((err) => {
                console.error('Property fetch error:', err.message);
            });
    }
}, [propertyId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedData = {
            ...formData,
            paid_amount: parseFloat(formData.remaining_amount),
            remaining_amount: 0,
            payment_type: "Full-Amount",
            company_commission: companyCommission
        };
    
        try {
            // 1. Submit the transaction
            const response = await fetch(`${baseurl}/transactions/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${JSON.stringify(errorData)}`);
            }
    
            const result = await response.json();
            console.log('Transaction stored successfully:', result);
    
            // 2. Update the property status to "sold"
            const propertyId = formData.property_id; // Ensure this exists in formData
            const statusUpdateResponse = await fetch(`${baseurl}/property/${propertyId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'sold', agent_commission_balance: agentCommission }),
            });
    
            if (!statusUpdateResponse.ok) {
                const errorData = await statusUpdateResponse.json();
                throw new Error(`Status Update Error: ${JSON.stringify(errorData)}`);
            }
    
            console.log(`Property ${propertyId} status updated to sold`);
            alert('Transaction submitted and property marked as sold!');
            navigate('/p-transaction');
        } catch (error) {
            console.error('Submit error:', error);
            alert('Failed to complete operation: ' + error.message);
        }
    };
    



    const readOnlyFields = [
        'property_name',
        'property_value',
        'paid_amount',
        'remaining_amount',
        'payment_type',
        'payment_method',
        'commission',
        'company_commission',
        'transaction_date',
        'username',
        'purchased_type',
        'property_id',
        'transaction_id',
        'user_id',
        'agent_id',
        'purchased_from',
    ];

    const hiddenFields = [
        'transaction_id',
        'agent_id',
        'user_id',
        'purchased_from',
        'payment_type',
        'payment_method',
        'commission',
        'company_commission',
        'transaction_date',
        'username',
        'purchased_type',
        'property_id',
        "total_paid_amount",
        "payment_mode",
        "cheque_number",
        "receiver_upi_id",
        "receiver_account_number",
        "ifsc",
        "role",
        "agent_commission"
    ];


    if (loading) {
        return (
            <>
                <PartnerHeader />
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <CircularProgress />
                    <Typography>Loading transaction data...</Typography>
                </Box>
            </>
        );
    }

    if (error) {
        return (
            <>
                <PartnerHeader />
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography color="error">Error: {error}</Typography>
                </Box>
            </>
        );
    }

    return (
        <>
            <PartnerHeader />
            <Box component="form" onSubmit={handleSubmit} maxWidth="xl" sx={{ padding: 3 }}>
                <Grid container spacing={2}>
                    {Object.keys(formData).map((key) =>
                        hiddenFields.includes(key) ? null : (
                            <Grid item xs={12} md={4} key={key}>
                                <TextField
                                    fullWidth
                                    label={key.replace(/_/g, ' ')}
                                    name={key}
                                    value={formData[key] || ''}
                                    onChange={handleChange}
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: readOnlyFields.includes(key),
                                    }}
                                />
                            </Grid>
                        )
                    )}

                </Grid>
                <Box sx={{ mt: 3 }}>
                    <Button type="submit" variant="contained" sx={{ width: '200px' }}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default PaymentForm;
