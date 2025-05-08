
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
  IconButton,
  ButtonGroup,
} from '@mui/material';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;
  const [expandedRows, setExpandedRows] = useState({});

  const navigate = useNavigate();
  const [remainingAmount, setRemainingAmount] = useState([]);

  const [filterDate, setFilterDate] = useState('');
  const [filterAmount, setFilterAmount] = useState('');
  const [filterPaymentType, setFilterPaymentType] = useState('');


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem("user_id");

        if (!userId) {
          setError("User ID not found");
          setLoading(false);
          return;
        }

        const response = await axios.get(`https://rahul30.pythonanywhere.com/transactions/user-id/${userId}/`);
        let transactionsData = response.data;

        if (!Array.isArray(transactionsData)) {
          throw new Error("Invalid response format");
        }

        // Group transactions by property_id
        const groupedTransactions = transactionsData.reduce((acc, transaction) => {
          if (!acc[transaction.property_id]) {
            acc[transaction.property_id] = [];
          }
          acc[transaction.property_id].push(transaction);
          return acc;
        }, {});

        // Filter transactions based on the given logic
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



//   useEffect(() => {
//     const fetchRemainingAmount = async () => {
//       const userId = localStorage.getItem("user_id");

//       if (!transactions || transactions.length === 0) return; // Ensure transactions exist

//       try {
//         let allRemainingAmounts = [];

//         for (const transaction of transactions) {
//           const response = await fetch(
//             `http://175.29.21.7:83/transactions/user-id/${userId}/property-id/${transaction.property_id}/`
//           );

//           if (!response.ok) {
//             throw new Error("Failed to fetch data");
//           }

//           const data = await response.json();

//           if (Array.isArray(data) && data.length > 0) {
//             const amounts = data.map((item) => parseFloat(item.remaining_amount));
//             allRemainingAmounts = [...allRemainingAmounts, ...amounts];
//           }
//         }

//         setRemainingAmount(allRemainingAmounts); // Store all remaining amounts in state
//         console.log("remainingAmounts", allRemainingAmounts);
//       } catch (error) {
//         console.error("Error fetching remaining amount:", error);
//       }
//     };

//     fetchRemainingAmount();
//   }, [transactions]);

  // Get the last element of the remainingAmount array
  const highestIndexValue = remainingAmount.length > 0 ? remainingAmount[remainingAmount.length - 1] : null;


  const handleToggleExpand = (transactionId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
  };


  const handleClick = () => {
    navigate('/i-asset');
  };

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

  const handleRemainingPaymentClick = (transactionId) => {
    navigate(`/i-payment-form/${transactionId}`);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchSearch =
      transaction.payment_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.purchased_type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchDate = filterDate
      ? new Date(transaction.created_at).toISOString().slice(0, 10) === filterDate
      : true;

    const matchAmount = filterAmount
      ? parseFloat(transaction.total_paid_amount) === parseFloat(filterAmount)
      : true;

    const matchPaymentType = filterPaymentType
      ? transaction.payment_type === filterPaymentType
      : true;

    return matchSearch && matchDate && matchAmount && matchPaymentType;
  });


  // Sort the transactions
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
      <PartnerHeader />
      <Box sx={{ marginTop: 4, padding: '50px' }}>
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
          <Grid item xs={12} sm={12}>
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
          <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        
        >
          <CircularProgress />
        </Box>
        ) : (
          <>
            <Table sx={{ border: '1px solid black', width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Property Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Property Value
                  </TableCell>
                  {/* <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Purchased Units
                  </TableCell> */}
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Payment Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Paid Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Remaining Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Transaction Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.property_id}
                      onClick={() => navigate(`/p-transaction-details?property_id=${transaction.property_id}`)}
                      sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                    >
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.property_name}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.property_value}
                      </TableCell>
                      {/* <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.purchased_units}
                      </TableCell> */}
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.payment_type}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.paid_amount}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {transaction.remaining_amount}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>
                        {new Date(transaction.transaction_date).toLocaleDateString('en-IN')}
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: 'center', border: '1px solid #000' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/p-payment-form?property_id=${transaction.property_id}&transaction_id=${transaction.transaction_id}`
                            );
                          }}
                          disabled={transaction.remaining_amount <= 0}
                        >
                          Pay Remaining
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} sx={{ textAlign: 'center', border: '1px solid #000', padding: 2 }}>
                      No Data Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        )}
      </Box>
    </>


  );
};

export default Transaction;

