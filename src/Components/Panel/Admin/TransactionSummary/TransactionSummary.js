import React, { useEffect, useState } from 'react';
import Header from "../../../Shared/Navbar/Navbar";
import TableLayout from '../../../Shared/TableLayout';
import axios from 'axios';
import { baseurl } from '../../../BaseURL/BaseURL';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Pagination
} from '@mui/material';

function TransactionSummary() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const headers = [
        { key: 'transaction_id', label: 'Transaction ID' },
        { key: 'property_name', label: 'Property Name' },
        { key: 'plan_name', label: 'Plan Name' },
        { key: 'payment_type', label: 'Payment Type' },
        { key: 'transaction_for', label: 'Transaction For' },
        { key: 'paid_amount', label: 'Paid Amount' },
        { key: 'payment_mode', label: 'Payment Mode' },
        { key: 'role', label: 'Role' },
        { key: 'username', label: 'Username' },
        { key: 'user_id', label: 'User ID' },
        { key: 'phone_pe_merchant_order_id', label: 'Phonepe Merchant Order ID' },
        { key: 'phone_pe_order_id', label: 'Phonepe Order ID' },
        { key: 'phone_pe_transaction_id', label: 'Phonepe Transaction ID' },
        { key: 'document_file', label: 'Receipt/Invoice' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${baseurl}/transactions/`);
                setTransactions(res.data);
                setFilteredTransactions(res.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (filter === 'all') {
            setFilteredTransactions(transactions);
        } else if (filter === 'Booking-Amount' || filter === 'Full-Amount') {
            const filtered = transactions.filter(
                item => item.payment_type === filter
            );
            setFilteredTransactions(filtered);
        } else if (filter === 'subscription') {
            const filtered = transactions.filter(
                item => item.transaction_for === filter
            );
            setFilteredTransactions(filtered);
        }
        setPage(1); // Reset page to 1 when filter changes
    }, [filter, transactions]);

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handlePageChange = (_, value) => {
        setPage(value);
    };

    return (
        <>
            <Header />
            <Typography
                variant="h2"
                sx={{
                    marginTop: 4,
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Transaction Summary
            </Typography>

            <Box maxWidth={1430} sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
                <FormControl size="medium" sx={{ minWidth: 200 }}>
                    <InputLabel>Filter</InputLabel>
                    <Select
                        value={filter}
                        label="Filter"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="Booking-Amount">Booking-Amount</MenuItem>
                        <MenuItem value="Full-Amount">Full-Amount</MenuItem>
                        <MenuItem value="subscription">Subscription</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <TableLayout
                headers={headers}
                data={paginatedTransactions}
                loading={loading}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                        "& .MuiPaginationItem-root": {
                            borderRadius: "0px"
                        }
                    }}
                />
            </Box>
        </>
    );
}

export default TransactionSummary;
