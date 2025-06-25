import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    TextField,
    Button,
    CircularProgress,
    Typography,
} from '@mui/material';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { baseurl } from '../../../BaseURL/BaseURL';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ReceiptDocument from '../../../InvoiceDocument';
import axios from 'axios';

function Payment() {
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
// Fetch transaction data
    useEffect(() => {
        if (transactionId) {
            fetch(`${baseurl}/transactions/${transactionId}/`)
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to fetch data');
                    return res.json();
                })
                .then((data) => {
                    // Remove document_number and document_type
                    const { document_number, document_type, ...filteredData } = data;
                    setFormData(filteredData);
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

    try {
        const initiatePayload = {
            user_id: formData.user_id,
            property_id: formData.property_id,
            payment_type: "Full-Amount",
            redirect_url: "http://localhost:3000/p-transaction" // ✅ this should be your return page
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
        localStorage.setItem("merchant_order_id", initiateData.merchant_order_id);
        localStorage.setItem("user_id", formData.user_id);
        localStorage.setItem("property_id", formData.property_id);

        window.location.href = initiateData.payment_url;
    } catch (error) {
        console.error("Payment Initiation Failed:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
        });
    }
};


  const hasPostedStatus = useRef(false); // flag to prevent duplicate calls

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const merchant_order_id = localStorage.getItem("merchant_order_id");
    const property_id = localStorage.getItem("property_id");

    const confirmAndProceed = async () => {
      if (
        hasPostedStatus.current || // already posted
        !userId || !merchant_order_id || !property_id
      ) return;

      try {
        hasPostedStatus.current = true; // set flag before making the request

        await fetch(`${baseurl}/property/confirm-payment/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: Number(userId),
            property_id: Number(property_id),
            merchant_order_id,
            document_file:null,
            payment_type:"Full-Amount"
          })
        });

        // Clean up storage to avoid future duplicates
        localStorage.removeItem("merchant_order_id");
        localStorage.removeItem("property_id");

      } catch (err) {
        console.error("Error sending payment status:", err);
        hasPostedStatus.current = false; // allow retry if it failed
      }
    };

    confirmAndProceed();
  }, []);





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
                <InvestorHeader />
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
                <InvestorHeader />
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography color="error">Error: {error}</Typography>
                </Box>
            </>
        );
    }

    return (
        <>
            <InvestorHeader />
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

export default Payment;
