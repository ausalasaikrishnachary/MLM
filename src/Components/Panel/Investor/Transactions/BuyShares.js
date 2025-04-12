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
  ButtonGroup,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { useNavigate } from 'react-router-dom';

const rows = [
  { id: 1, assetId: 'A123', date: '2025-02-18', assetName: 'Asset A', description: 'Asset Description A', nomineeName: 'Nominee A', transactionId: 'TX12345', amount: 1000 },
  { id: 2, assetId: 'B456', date: '2025-02-19', assetName: 'Asset B', description: 'Asset Description B', nomineeName: 'Nominee B', transactionId: 'TX12346', amount: 2000 },
  { id: 3, assetId: 'C789', date: '2025-02-20', assetName: 'Asset C', description: 'Asset Description C', nomineeName: 'Nominee C', transactionId: 'TX12347', amount: 3000 },
];

const columns = [
  { field: 'assetId', headerName: 'Asset ID', flex: 1 },
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'assetName', headerName: 'Asset Name', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'nomineeName', headerName: 'Nominee Name', flex: 1 },
  { field: 'transactionId', headerName: 'Transaction ID', flex: 1 },
  { field: 'amount', headerName: 'Amount', flex: 1 },
];

const BuyShares = () => {
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/i-asset');
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter rows based on search query
  const filteredRows = rows.filter((row) =>
    row.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <InvestorHeader />
      <Box p={5}>
       
        <Box sx={{ padding: '10px' }}>
          <Grid container spacing={2} alignItems="center" sx={{ width: '100%' }}>
            <Grid item xs={12} sm={8} container spacing={2}>
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
              <Grid item>
                <Button variant="outlined" color="primary" fullWidth sx={{ width: '150px' }}>
                  Filter
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  width: '200px',
                  marginLeft: '270px',
                  color: 'white',
                  
                }}
                onClick={handleClick}
              >
                + Buy Properties
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* DataGrid Table */}
      <Box sx={{  width: '90%', padding: '50px' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[3, 5, 10]}
          disableSelectionOnClick
          sx={{
            
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#CA8787',
              color: 'black',
            },
          }}
        />
      </Box>
    </>
  );
};

export default BuyShares;
