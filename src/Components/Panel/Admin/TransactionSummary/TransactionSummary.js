// import React, { useEffect, useState } from 'react';
// import Header from "../../../Shared/Navbar/Navbar";
// import TableLayout from '../../../Shared/TableLayout';
// import axios from 'axios';
// import { baseurl } from '../../../BaseURL/BaseURL';
// import {
//     Box,
//     FormControl,
//     InputLabel,
//     MenuItem,
//     Select,
//     Typography,
//     Pagination
// } from '@mui/material';

// function TransactionSummary() {
//     const [transactions, setTransactions] = useState([]);
//     const [filteredTransactions, setFilteredTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filter, setFilter] = useState('all');

//     const formatDateTime = (dateString) => {
//   const d = new Date(dateString);

//   const day = d.getDate().toString().padStart(2, "0");
//   const month = (d.getMonth() + 1).toString().padStart(2, "0");
//   const year = d.getFullYear();

//   const hours = d.getHours().toString().padStart(2, "0");
//   const minutes = d.getMinutes().toString().padStart(2, "0");

//   return `${day}-${month}-${year} ${hours}:${minutes}`;
// };


//     const [page, setPage] = useState(1);
//     const itemsPerPage = 10;

//     const headers = [
//         { key: 'transaction_id', label: 'Transaction ID' },
//   {
//   key: "transaction_date",
//   label: "Transaction Date"
  
// },


//         { key: 'property_name', label: 'Property Name' },
//         { key: 'plan_name', label: 'Plan Name' },
//         { key: 'payment_type', label: 'Payment Type' },
//         { key: 'transaction_for', label: 'Transaction For' },
//         { key: 'paid_amount', label: 'Paid Amount' },
//         { key: 'payment_mode', label: 'Payment Mode' },
//         { key: 'role', label: 'Role' },
//         { key: 'username', label: 'Username' },
//         { key: 'user_id', label: 'User ID' },
//         { key: 'phone_pe_merchant_order_id', label: 'Phonepe Merchant Order ID' },
//         { key: 'phone_pe_order_id', label: 'Phonepe Order ID' },
//         { key: 'phone_pe_transaction_id', label: 'Phonepe Transaction ID' },
//         { key: 'document_file', label: 'Receipt/Invoice' }
//     ];

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await axios.get(`${baseurl}/transactions/`);
//                 setTransactions(res.data);
//                 setFilteredTransactions(res.data);
//             } catch (error) {
//                 console.error('Error fetching transactions:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         if (filter === 'all') {
//             setFilteredTransactions(transactions);
//         } else if (filter === 'Booking-Amount' || filter === 'Full-Amount') {
//             const filtered = transactions.filter(
//                 item => item.payment_type === filter
//             );
//             setFilteredTransactions(filtered);
//         } else if (filter === 'subscription') {
//             const filtered = transactions.filter(
//                 item => item.transaction_for === filter
//             );
//             setFilteredTransactions(filtered);
//         }
//         setPage(1); // Reset page to 1 when filter changes
//     }, [filter, transactions]);

//     const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
//     const paginatedTransactions = filteredTransactions.slice(
//         (page - 1) * itemsPerPage,
//         page * itemsPerPage
//     );

//     const handlePageChange = (_, value) => {
//         setPage(value);
//     };

//     return (
//         <>
//             <Header />


//             <Typography
//               variant="h4"
//               gutterBottom
//               sx={{
//                 fontSize: {
//                   xs: "2.0rem",  
//                   sm: "2.1rem",   
//                   md: "2.2rem",     
//                 },
//                 fontWeight: "bold",  
//                 textAlign: "center",    
//                 whiteSpace: "nowrap",   
//                 overflow: "hidden",
//                 textOverflow: "ellipsis", 
           
//                    marginTop: 5,
//               }}
//             >

//                 Transaction Summary
//                             </Typography>

//             <Box maxWidth={1270} sx={{ display: 'flex',
//                   justifyContent: {
//       xs: "center",   
//       sm: "flex-end", 
//       md: "flex-end",
//     },
    
//     mr: { xs: 0, sm: 2, md: 3 },
//   }}>
//                 <FormControl size="medium" sx={{ minWidth: 200 }}>
//                     <InputLabel>Filter</InputLabel>
//                     <Select
//                         value={filter}
//                         label="Filter"
//                         onChange={(e) => setFilter(e.target.value)}
//                     >
//                         <MenuItem value="all">All</MenuItem>
//                         <MenuItem value="Booking-Amount">Booking-Amount</MenuItem>
//                         <MenuItem value="Full-Amount">Full-Amount</MenuItem>
//                         <MenuItem value="subscription">Subscription</MenuItem>
//                     </Select>
//                 </FormControl>
//             </Box>

//             <TableLayout
//                 headers={headers}
//                 data={paginatedTransactions}
//                 loading={loading}
//             />

//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//                 {/* <Pagination
//                     count={totalPages}
//                     page={page}
//                     onChange={handlePageChange}
//                     color="primary"
//                     sx={{
//                         "& .MuiPaginationItem-root": {
//                             borderRadius: "0px"
//                         }
//                     }}
//                 /> */}
//             </Box>
//         </>
//     );
// }

// export default TransactionSummary;

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
    TextField,
    InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function TransactionSummary() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        
        // Remove seconds from the end (last :00)
        if (typeof dateString === 'string') {
            return dateString.replace(/:(\d{2})$/, '');
        }
        
        return 'Invalid Date';
    };

    const headers = [
        { key: 'serial', label: 'S.No' },
        { key: 'transaction_id', label: 'Transaction ID' },
        { key: 'transaction_date_formatted', label: 'Transaction Date' },
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
                // Sort by most recent first (assuming higher ID = more recent)
                const sortedData = res.data.sort((a, b) => b.id - a.id);
                setTransactions(sortedData);
                setFilteredTransactions(sortedData);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Apply filters and search
    useEffect(() => {
        let result = [...transactions];

        // Apply type filter
        if (filter === 'Booking-Amount' || filter === 'Full-Amount') {
            result = result.filter(item => item.payment_type === filter);
        } else if (filter === 'subscription') {
            result = result.filter(item => item.transaction_for === filter);
        }

        // Apply global search
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase().trim();
            result = result.filter(item => {
                return (
                    (item.transaction_id && item.transaction_id.toString().includes(searchLower)) ||
                    (item.property_name && item.property_name.toLowerCase().includes(searchLower)) ||
                    (item.plan_name && item.plan_name.toLowerCase().includes(searchLower)) ||
                    (item.payment_type && item.payment_type.toLowerCase().includes(searchLower)) ||
                    (item.transaction_for && item.transaction_for.toLowerCase().includes(searchLower)) ||
                    (item.paid_amount && item.paid_amount.toString().includes(searchTerm)) ||
                    (item.payment_mode && item.payment_mode.toLowerCase().includes(searchLower)) ||
                    (item.role && item.role.toLowerCase().includes(searchLower)) ||
                    (item.username && item.username.toLowerCase().includes(searchLower)) ||
                    (item.user_id && item.user_id.toString().includes(searchTerm)) ||
                    (item.phone_pe_merchant_order_id && item.phone_pe_merchant_order_id.toString().includes(searchTerm)) ||
                    (item.phone_pe_order_id && item.phone_pe_order_id.toString().includes(searchTerm)) ||
                    (item.phone_pe_transaction_id && item.phone_pe_transaction_id.toString().includes(searchTerm))
                );
            });
        }

        setFilteredTransactions(result);
        setPage(1); // Reset page to 1 when filter/search changes
    }, [filter, searchTerm, transactions]);

    // Add serial numbers to paginated data
    const paginatedTransactions = filteredTransactions
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((item, index) => ({
            ...item,
            serial: (page - 1) * itemsPerPage + index + 1,
            transaction_date_formatted: formatDateTime(item.transaction_date),
            // Keep original transaction_date for sorting/filtering if needed
            transaction_date: item.transaction_date
        }));

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    const handlePageChange = (_, value) => {
        setPage(value);
    };

    return (
        <>
            <Header />

            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontSize: {
                        xs: "2.0rem",
                        sm: "2.1rem",
                        md: "2.2rem",
                    },
                    fontWeight: "bold",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginTop: 5,
                }}
            >
                Transaction Summary
            </Typography>

            {/* Search and Filter Section */}
            <Box
                sx={{
                    maxWidth: 1160,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'stretch', sm: 'center' },
                    gap: 2,
                    px: { xs: 2, sm: 3, md: 0 },
                    mt: 2,
                    mb: 3
                }}
            >
                {/* Search Field */}
                <Box sx={{ flex: 1, maxWidth: 400 }}>
                    <TextField
                        fullWidth
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                backgroundColor: 'white',
                            }
                        }}
                    />
                </Box>

                {/* Filter Dropdown */}
                <Box sx={{ minWidth: 200 }}>
                    <FormControl fullWidth size="medium">
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
            </Box>

            {/* Show search results count */}
            {searchTerm && (
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                        textAlign: 'center',
                        mb: 2,
                        px: { xs: 2, sm: 3, md: 0 }
                    }}
                >
                    Found {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} matching "{searchTerm}"
                    {filter !== 'all' && ` (filtered by: ${filter})`}
                </Typography>
            )}

            {/* Pass pagination props to TableLayout if it supports them */}
            <TableLayout
                headers={headers}
                data={paginatedTransactions}
                loading={loading}
                pagination={{
                    count: totalPages,
                    page: page,
                    onPageChange: handlePageChange,
                    show: totalPages > 1
                }}
            />

            {/* No results message */}
            {!loading && filteredTransactions.length === 0 && (
                <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                    sx={{ mt: 3 }}
                >
                    {searchTerm || filter !== 'all'
                        ? `No transactions found${searchTerm ? ` matching "${searchTerm}"` : ''}${filter !== 'all' ? ` with filter "${filter}"` : ''}.`
                        : 'No transactions available.'}
                </Typography>
            )}
        </>
    );
}

export default TransactionSummary;