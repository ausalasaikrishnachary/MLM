import React, { useState } from 'react';
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
  ButtonGroup,
} from '@mui/material';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { useNavigate } from 'react-router-dom';

const rows = [
  { id: 1, assetId: 'A123', date: '2025-02-18', assetName: 'Asset A', description: 'Asset Description A', nomineeName: 'Nominee A', transactionId: 'TX12345', amount: 1000 },
  { id: 2, assetId: 'B456', date: '2025-02-19', assetName: 'Asset B', description: 'Asset Description B', nomineeName: 'Nominee B', transactionId: 'TX12346', amount: 2000 },
  { id: 3, assetId: 'C789', date: '2025-02-20', assetName: 'Asset C', description: 'Asset Description C', nomineeName: 'Nominee C', transactionId: 'TX12347', amount: 3000 },
  // Add more rows as needed
];

const BuyShares = () => {
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // Page index starts from 0
  const rowsPerPage = 3; // Number of rows per page

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/i-asset');
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(0); // Reset to first page when sort changes
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0); // Reset to first page when search changes
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Filter rows based on search query (searching in assetName, assetId, or description)
  const filteredRows = rows.filter((row) =>
    row.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort the filtered rows based on selected sort criteria
  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortBy === 'name') {
      return a.assetName.localeCompare(b.assetName);
    } else if (sortBy === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'status') {
      // As no explicit status is provided, sorting by assetName as a fallback
      return a.assetName.localeCompare(b.assetName);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);
  const paginatedRows = sortedRows.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  return (
    <>
      <InvestorHeader />
      <Box p={5}>
        {/* Heading */}
        <Typography variant="h4" gutterBottom style={{textAlign:"center"}}>
          Buy Shares
        </Typography>
        <Box sx={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
          {/* Row containing search, sort by, filter, and buy shares button */}
          <Grid container spacing={2} alignItems="center" sx={{ width: '100%' }}>
            {/* Left section: Search bar, Sort by, Filter buttons */}
            <Grid item xs={12} sm={8} container spacing={2}>
              {/* Search bar with fixed width of 200px */}
              <Grid item>
                <TextField
                  label="Search Assets"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ width: '200px' }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Grid>
              {/* Sort by dropdown with fixed width of 200px */}
              <Grid item>
                <FormControl variant="outlined" size="small" fullWidth sx={{ width: '200px' }}>
                  <InputLabel id="sort-by-label">Sort By</InputLabel>
                  <Select
                    labelId="sort-by-label"
                    id="sort-by"
                    value={sortBy}
                    onChange={handleSortChange}
                    label="Sort By"
                  >
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="status">Status</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Filter button with fixed width of 150px */}
              <Grid item>
                <Button variant="outlined" color="primary" fullWidth sx={{ width: '150px' }}>
                  Filter
                </Button>
              </Grid>
            </Grid>
            {/* Right section: Buy Shares button with fixed width of 200px */}
            <Grid item xs={12} sm={4}>
            <Button
      variant="contained"
      fullWidth
      sx={{
        width: '200px',
        marginLeft: '270px',
        color: 'white',
        backgroundColor: '#000',
      }}
      onClick={handleClick}
    >
      + Buy Shares
    </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Table with 7 columns */}
      <Box sx={{ marginTop: 4, padding: '50px' }}>
        <Table sx={{ border: '1px solid black', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Asset ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Asset Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Nominee Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Transaction ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{row.assetId}</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{row.date}</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{row.assetName}</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{row.description}</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{row.nomineeName}</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{row.transactionId}</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #000' }}>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box display="flex" justifyContent="flex-end" mt={4} mb={4} mr={1}>
          <ButtonGroup sx={{ gap: 0 }}>
            <Button
              variant="contained"
              disabled={currentPage === 0}
              onClick={handlePrevPage}
              sx={{
                backgroundColor: '#000',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#000',
                },
                '&:disabled': {
                  backgroundColor: '#000',
                  color: 'white',
                },
              }}
            >
              Previous
            </Button>
            <Typography
              variant="body1"
              sx={{
                border: '1px solid #ddd',
                padding: '4px 12px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {currentPage + 1}
            </Typography>
            <Button
              variant="contained"
              disabled={currentPage >= totalPages - 1}
              onClick={handleNextPage}
              sx={{
                backgroundColor: '#000',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#000',
                },
                '&:disabled': {
                  backgroundColor: '#000',
                  color: 'white',
                },
              }}
            >
              Next
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};

export default BuyShares;
