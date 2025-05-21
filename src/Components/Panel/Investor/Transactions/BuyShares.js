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
} from '@mui/material';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { useNavigate } from 'react-router-dom';

const BuyShares = () => {
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const rows = [
    { id: 1, assetId: 'A123', date: '2025-02-18', assetName: 'Asset A', description: 'Asset Description A', nomineeName: 'Nominee A', transactionId: 'TX12345', amount: 1000 },
    { id: 2, assetId: 'B456', date: '2025-02-19', assetName: 'Asset B', description: 'Asset Description B', nomineeName: 'Nominee B', transactionId: 'TX12346', amount: 2000 },
    { id: 3, assetId: 'C789', date: '2025-02-20', assetName: 'Asset C', description: 'Asset Description C', nomineeName: 'Nominee C', transactionId: 'TX12347', amount: 3000 },
  ];

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

  const handleClick = () => {
    navigate('/i-asset');
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <InvestorHeader />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "12%" }}>
          <h2 style={{ fontWeight: 'bold' }}>Buy Shares</h2>
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box display="flex" gap={2}>
            <TextField
              label="Search Assets"
              variant="outlined"
              size="small"
              sx={{ width: 200 }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FormControl variant="outlined" size="small" sx={{ width: 200 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="status">Status</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            sx={{ textTransform: 'none' }}
          >
            + Buy Properties
          </Button>
        </Box>

        <Table sx={{ border: '1px solid black', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>Asset ID</TableCell>
              <TableCell sx={cellStyle}>Date</TableCell>
              <TableCell sx={cellStyle}>Asset Name</TableCell>
              <TableCell sx={cellStyle}>Description</TableCell>
              <TableCell sx={cellStyle}>Nominee Name</TableCell>
              <TableCell sx={cellStyle}>Transaction ID</TableCell>
              <TableCell sx={cellStyle}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={cellBodyStyle}>{row.assetId}</TableCell>
                  <TableCell sx={cellBodyStyle}>{row.date}</TableCell>
                  <TableCell sx={cellBodyStyle}>{row.assetName}</TableCell>
                  <TableCell sx={cellBodyStyle}>{row.description}</TableCell>
                  <TableCell sx={cellBodyStyle}>{row.nomineeName}</TableCell>
                  <TableCell sx={cellBodyStyle}>{row.transactionId}</TableCell>
                  <TableCell sx={cellBodyStyle}>{row.amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} sx={noDataStyle}>
                  No assets found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default BuyShares;