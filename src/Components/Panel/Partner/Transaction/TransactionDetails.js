import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    CircularProgress,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar'
import { baseurl } from '../../../BaseURL/BaseURL';

const TransactionList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const propertyId = queryParams.get("property_id");
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            const userId = localStorage.getItem("user_id");
            try {
                const response = await axios.get(`${baseurl}/transactions/user-id/${userId}/property-id/${propertyId}/`);

                if (!response.data || response.data.length === 0) {
                    throw new Error("No transactions found");
                }
                setTransactions(response.data);
            } catch (err) {
                setError("Failed to fetch transaction details");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [propertyId]);

    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <>
            <PartnerHeader />
            <Box sx={{ marginTop: 4, padding: '50px' }}>
                <Box sx={{ marginTop: 3, textAlign: 'left' }}>
                    <Button variant="outlined" onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
                        {/* You can remove text or leave it empty */}
                    </Button>
                </Box>
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: "center" }}>
                    Transaction List
                </Typography>
                <TableContainer>
                    <Table sx={{ border: '1px solid black', width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Transaction ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Property Name</TableCell>
                                {/* <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Partner Name</TableCell> */}
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Property Value</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Payment Type</TableCell>
                                {/* <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Purchased Units</TableCell> */}
                                {/* <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Price Per Unit</TableCell> */}
                                {/* <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Total Amount</TableCell> */}
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Paid Amount</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Remaining Amount</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Payment Method</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Transaction Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Reciept/Invoice</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow
                                    key={transaction.transaction_id}
                                    sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                                >
                                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.transaction_id}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.property_name}</TableCell>
                                    {/* <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.partner_name}</TableCell> */}
                                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.property_value || 'N/A'}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.payment_type || 'N/A'}</TableCell>
                                    {/* <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.purchased_units}</TableCell> */}
                                    {/* <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.price_per_unit}</TableCell> */}
                                    {/* <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.total_amount}</TableCell> */}
                                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.paid_amount}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.remaining_amount}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{transaction.payment_mode}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}> {new Date(transaction.transaction_date).toLocaleDateString('en-IN')}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                                        {transaction.document_file && transaction.document_number ? (
                                            <a
                                                href={`${baseurl}${transaction.document_file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{  color: '#1976d2', fontWeight: 'bold' }}
                                            >
                                                {transaction.document_number}
                                            </a>
                                        ) : (
                                            'N/A'
                                        )}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </>

    );
};

export default TransactionList;
