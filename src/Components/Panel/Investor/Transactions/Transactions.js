import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Grid,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
   ButtonGroup,
} from '@mui/material';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../../../BaseURL/BaseURL';

const Transactions = () => { 
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  const [filterDate, setFilterDate] = useState('');
  const [filterAmount, setFilterAmount] = useState('');
  const [filterPaymentType, setFilterPaymentType] = useState('');

  const cellStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #000',
    backgroundColor: '#f0f0f0',
  };

  const cellBodyStyle = {
    textAlign: 'center',
    border: '1px solid #000',
  };

  const noDataStyle = {
    textAlign: 'center',
    border: '1px solid #000',
    padding: 2,
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          setError("User ID not found");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${baseurl}/transactions/user-id/${userId}/`);
        let transactionsData = response.data;

        if (!Array.isArray(transactionsData)) {
          throw new Error("Invalid response format");
        }

        const groupedTransactions = transactionsData.reduce((acc, transaction) => {
          if (!acc[transaction.property_id]) {
            acc[transaction.property_id] = [];
          }
          acc[transaction.property_id].push(transaction);
          return acc;
        }, {});

        const filteredTransactions = Object.values(groupedTransactions).map((transactions) => {
          const fullPayment = transactions.find((t) => t.payment_type === "Full-Amount");
          if (fullPayment) {
            return fullPayment;
          }
          return transactions.find((t) => t.payment_type === "Booking-Amount");
        });

        setTransactions(filteredTransactions);
      } catch (err) {
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchSearch =
      transaction.payment_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.purchased_type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchDate = filterDate
      ? new Date(transaction.transaction_date).toISOString().slice(0, 10) === filterDate
      : true;

    const matchAmount = filterAmount
      ? parseFloat(transaction.remaining_amount) === parseFloat(filterAmount)
      : true;

    const matchPaymentType = filterPaymentType
      ? transaction.payment_type === filterPaymentType
      : true;

    return matchSearch && matchDate && matchAmount && matchPaymentType;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'name') {
      return a.property_name.localeCompare(b.property_name);
    } else if (sortBy === 'date') {
      return new Date(a.created_at) - new Date(b.created_at);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedTransactions.length / rowsPerPage);
  const paginatedTransactions = sortedTransactions.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  return (
    <>
      <InvestorHeader />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "12%" }}>
          <h2 style={{ fontWeight: 'bold' }}>Transaction History</h2>
        </div>

        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="date"
              label="Filter by Transaction Date"
              InputLabelProps={{ shrink: true }}
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Filter by Total Paid Amount"
              type="number"
              value={filterAmount}
              onChange={(e) => setFilterAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Payment Type</InputLabel>
              <Select
                value={filterPaymentType}
                onChange={(e) => setFilterPaymentType(e.target.value)}
                label="Payment Type"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Full-Amount">Full-Amount</MenuItem>
                <MenuItem value="Booking-Amount">Booking-Amount</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => {
                  setFilterDate('');
                  setFilterAmount('');
                  setFilterPaymentType('');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </Box>
          </Grid>
        </Grid>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Table sx={{ border: '1px solid black', width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={cellStyle}>Property Name</TableCell>
                  <TableCell sx={cellStyle}>Property Value</TableCell>
                  <TableCell sx={cellStyle}>Payment Type</TableCell>
                  <TableCell sx={cellStyle}>Paid Amount</TableCell>
                  <TableCell sx={cellStyle}>Remaining Amount</TableCell>
                  <TableCell sx={cellStyle}>Transaction Date</TableCell>
                  <TableCell sx={cellStyle}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.property_id}
                      sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                      onClick={() => navigate(`/i-transaction-details?property_id=${transaction.property_id}`)}
                    >
                      <TableCell sx={cellBodyStyle}>{transaction.property_name}</TableCell>
                      <TableCell sx={cellBodyStyle}>{transaction.property_value}</TableCell>
                      <TableCell sx={cellBodyStyle}>{transaction.payment_type}</TableCell>
                      <TableCell sx={cellBodyStyle}>{transaction.paid_amount}</TableCell>
                      <TableCell sx={cellBodyStyle}>{transaction.remaining_amount}</TableCell>
                      <TableCell sx={cellBodyStyle}>
                        {new Date(transaction.transaction_date).toLocaleDateString('en-IN')}
                      </TableCell>
                      <TableCell sx={cellBodyStyle}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/i-payment-form?property_id=${transaction.property_id}&transaction_id=${transaction.transaction_id}`
                            );
                          }}
                          disabled={transaction.remaining_amount <= 0}
                          sx={{ textTransform: 'none' }}
                        >
                          Pay Remaining
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} sx={noDataStyle}>
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Box display="flex" justifyContent="center" mt={2}>
              <ButtonGroup>
                <Button 
                  onClick={handlePrevPage} 
                  disabled={currentPage === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNextPage} 
                  disabled={currentPage >= totalPages - 1 || sortedTransactions.length <= rowsPerPage}
                >
                  Next
                </Button>
              </ButtonGroup>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default Transactions;