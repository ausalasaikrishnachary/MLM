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
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ReceiptDocument from '../../../InvoiceDocument';
import axios from 'axios';

function PaymentForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get('transaction_id');
    const propertyId = queryParams.get('property_id');
    const [agentCommission, setAgentCommission] = useState('');
    const [companyCommission, setCompanyCommission] = useState('');
    const userId = localStorage.getItem('user_id');

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



    const generateReceipt = async (invoiceNumber) => {
        try {
            const invoiceData = {
                property: {
                    title: formData.property_name,
                    value: formData.property_value,
                    remainingAmount: formData.remaining_amount || '0',
                    bookingAmount: formData.paid_amount || '0',
                    total: (
                        (parseFloat(formData.remaining_amount || 0) + parseFloat(formData.paid_amount || 0)).toString()
                    ),
                },
                invoice_number: invoiceNumber
            };

            const pdfBlob = await pdf(<ReceiptDocument {...invoiceData} />).toBlob();

            const fileName = `Invoice_${formData.property_name.replace(/\s+/g, '_')}.pdf`;
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Destructure out unwanted fields
        const { document_number, document_type, ...cleanFormData } = formData;

        const updatedData = {
            ...cleanFormData,
            paid_amount: parseFloat(formData.remaining_amount),
            remaining_amount: 0,
            payment_type: "Full-Amount",
            company_commission: companyCommission,
            role: "agent",
        };

        try {
            console.log("Submitting transaction with data:", updatedData);

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
                console.error("Transaction API error response:", errorData);
                throw new Error(`API Error: ${JSON.stringify(errorData)}`);
            }

            const result = await response.json();
            console.log('Transaction stored successfully:', result);

            // 2. Update property status to "sold"
            const propertyId = formData.property_id;
            console.log(`Updating property ${propertyId} to status "sold"`);

            const statusUpdateResponse = await fetch(`${baseurl}/property/${propertyId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'sold', agent_commission_balance: agentCommission }),
            });

            if (!statusUpdateResponse.ok) {
                const errorData = await statusUpdateResponse.json();
                console.error("Property status update error response:", errorData);
                throw new Error(`Status Update Error: ${JSON.stringify(errorData)}`);
            }

            console.log(`Property ${propertyId} status updated to sold`);

            // 3. Fetch document_number (invoice number)
            const responses = await axios.get(`${baseurl}/transactions/user-id/${userId}/property-id/${propertyId}/payment-type/Full-Amount/`);
            console.log("Fetched transactions:", responses.data);

            const latestTransaction = responses.data[0];
            const invoiceNumber = latestTransaction?.document_number || 'N/A';
            console.log("Invoice Number:", invoiceNumber);

            // 4. Generate receipt
            const pdfBlob = await generateReceipt(invoiceNumber);

            // Step 4: Prepare form data for file upload
            const formData = new FormData();
            const fileName = `${latestTransaction.document_number}.pdf`;
            formData.append('document_file', pdfBlob, fileName);
            console.log("Invoice generated");

                
                // Step 5: Update transaction with the PDF file
                await axios.put(`${baseurl}/transactions/${transactionId}/`, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                });

            // Final success alert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Transaction submitted and property marked as sold!',
                timer: 2500,
                showConfirmButton: false
            });

            navigate('/p-transaction');
        } catch (error) {
            console.error('Submit error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to complete operation: ' + error.message,
            });
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
        "agent_commission",
        "document_type",
        "document_number",
        "document_file",
        "phone_pe_merchant_order_id",
        "phone_pe_order_id",
        "phone_pe_transaction_id"
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
