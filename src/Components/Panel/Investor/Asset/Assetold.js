import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import image1 from '../images/pic1.jpeg';
import image2 from '../images/pic2.jpeg';
import image3 from '../images/pic3.jpeg';
import AssetDetailModal from './AssetDetailModal';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';

const AssetsTablePage = () => {
  // --- States for filtering, sorting, and pagination ---
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  // --- Modal State ---
  const [openModal, setOpenModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  // --- Sample Assets Data ---
  const assetsData = [
    {
      id: 1,
      name: 'Pune Industrial Opportunity',
      status: '100% Funded',
      date: '2025-02-01',
      image: image1,
      targetIRR: 13,
      grossYield: 8.1,
      assetValue: '30 Cr',
      assetType: 'Industrial',
    },
    {
      id: 2,
      name: 'Goa Industrial Opportunity',
      status: '100% Funded',
      date: '2025-02-05',
      image: image2,
      targetIRR: 12,
      grossYield: 7.5,
      assetValue: '25 Cr',
      assetType: 'Industrial',
    },
    {
      id: 3,
      name: 'Hyd Industrial Opportunity',
      status: '100% Funded',
      date: '2025-02-10',
      image: image3,
      targetIRR: 14,
      grossYield: 8.3,
      assetValue: '35 Cr',
      assetType: 'Industrial',
    },
    // ... Add more assets as needed
  ];

  // --- Handlers ---
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // reset to first page when search changes
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleViewDetails = (asset) => {
    setSelectedAsset(asset);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // --- Filtering ---
  const filteredAssets = assetsData.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Sorting ---
  const sortedAssets = useMemo(() => {
    let sorted = [...filteredAssets];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'status') {
      sorted.sort((a, b) => a.status.localeCompare(b.status));
    }
    return sorted;
  }, [filteredAssets, sortBy]);

  // --- Pagination ---
  const totalPages = Math.ceil(sortedAssets.length / rowsPerPage);
  const displayedAssets = sortedAssets.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <InvestorHeader />
      <Box p={2}>
        <Typography variant="h4" sx={{ marginLeft: '10px' }}>
          Assets
        </Typography>

        {/* Search & Sort Controls */}
        <Box sx={{ backgroundColor: '#f0f0f0', padding: '10px', marginTop: 2 }}>
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              label="Search Assets"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FormControl variant="outlined" size="small">
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
            <Button variant="outlined" color="primary">
              Filter
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Assets Table */}
      <Box p={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Target IRR</TableCell>
                <TableCell>Gross Yield</TableCell>
                <TableCell>Asset Value</TableCell>
                <TableCell>Asset Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>
                    <img
                      src={asset.image}
                      alt={asset.name}
                      width={80}
                      style={{ borderRadius: '8px' }}
                    />
                  </TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.status}</TableCell>
                  <TableCell>{asset.date}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <TrendingUpIcon color="primary" sx={{ marginRight: 0.5 }} />
                      {asset.targetIRR}%
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <BarChartIcon color="secondary" sx={{ marginRight: 0.5 }} />
                      {asset.grossYield}%
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <AttachMoneyIcon color="success" sx={{ marginRight: 0.5 }} />
                      {asset.assetValue}
                    </Box>
                  </TableCell>
                  <TableCell>{asset.assetType}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewDetails(asset)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {displayedAssets.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No assets found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Pagination */}
      <Box display="flex" justifyContent="flex-end" mt={2} mr={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Asset Details Modal */}
      {selectedAsset && (
        <AssetDetailModal
          open={openModal}
          handleClose={handleCloseModal}
          assetDetails={selectedAsset}
        />
      )}
    </>
  );
};

export default AssetsTablePage;
