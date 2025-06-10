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

const generateInvoice = () => {
  const doc = new jsPDF();
  
  // Invoice Header
  doc.setFontSize(22);
  doc.setTextColor(40, 53, 147); // Dark blue
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 105, 20, null, null, 'center');
  
  // Company Details
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.setFont('helvetica', 'normal');
  doc.text('Your Company Name', 105, 28, null, null, 'center');
  doc.text('123 Business Street, City - 400001', 105, 32, null, null, 'center');
  doc.text('GSTIN: 22AAAAA0000A1Z5 | support@company.com', 105, 36, null, null, 'center');
  
  // Divider Line
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 42, 190, 42);
  
  // Invoice Details
  doc.setFontSize(10);
  doc.text(`Invoice #: INV-${Date.now().toString().slice(-6)}`, 20, 50);
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 160, 50);
  
  // Property Details Table
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('PROPERTY TRANSACTION DETAILS', 20, 60);
  
  // Table Header
  doc.setFillColor(245, 245, 245);
  doc.rect(20, 65, 170, 10, 'F');
  doc.text('Description', 25, 71);
  doc.text('Amount (₹)', 150, 71);
  
  // Table Rows
  doc.setFont('helvetica', 'normal');
  doc.text(`Property: ${formData.property_name || 'N/A'}`, 25, 81);
  doc.text(formData.property_value || '0', 150, 81);
  
  doc.text('Paid Amount', 25, 91);
  doc.text(formData.paid_amount || '0', 150, 91);
  
  doc.text('Remaining Amount', 25, 101);
  doc.text(formData.remaining_amount || '0', 150, 101);
  
  // Total Row
  doc.setFont('helvetica', 'bold');
  doc.text('Total Property Value', 25, 111);
  doc.text(formData.property_value || '0', 150, 111);
  
  // Divider Line
  doc.line(20, 116, 190, 116);
  
  // Customer Details Section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CUSTOMER INFORMATION', 20, 126);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${localStorage.getItem('user_name') || 'N/A'}`, 20, 134);
  doc.text(`Email: ${localStorage.getItem('email') || 'N/A'}`, 20, 142);
  doc.text(`Phone: ${localStorage.getItem('phone_number') || 'N/A'}`, 20, 150);
  doc.text(`Referral ID: ${localStorage.getItem('referral_id') || 'N/A'}`, 20, 158);
  doc.text(`Referred By: ${localStorage.getItem('referred_by') || 'N/A'}`, 20, 166);
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Terms & Conditions:', 20, 180);
  doc.text('1. This is an official invoice for property transaction.', 20, 184);
  doc.text('2. Please retain this invoice for your records.', 20, 188);
  doc.text('3. For any discrepancies, contact within 7 days.', 20, 192);
  
  doc.setFontSize(12);
  doc.setTextColor(40, 53, 147);
  doc.text('Thank you for your business!', 105, 200, null, null, 'center');
  
  // Save PDF
  doc.save(`Invoice_${formData.property_name || 'property'}.pdf`);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const updatedData = {
    ...formData,
    paid_amount: parseFloat(formData.remaining_amount),
    remaining_amount: 0,
    payment_type: "Full-Amount",
    company_commission: companyCommission,
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
    generateInvoice();

    // 2. Update property status to "sold"
    const propertyId = formData.property_id;
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
