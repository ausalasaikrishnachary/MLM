import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import {
  Container,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  DialogContentText,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Stack,
  InputLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import PaginationComponent from '../../../Shared/Pagination';
import { baseurl } from '../../../BaseURL/BaseURL';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import VideocamIcon from '@mui/icons-material/Videocam';
import Swal from 'sweetalert2';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const PartnerMyAssets = () => {
  const [sortBy, setSortBy] = useState('');
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const referralId = localStorage.getItem('referral_id');
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);


  // Report generation states
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [openReportConfigDialog, setOpenReportConfigDialog] = useState(false);
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [reportType, setReportType] = useState('monthly');
  const [reportData, setReportData] = useState([]);
  const [reportColumns, setReportColumns] = useState([
    { id: 'property_title', label: 'Property Title', checked: true },
    { id: 'city', label: 'City', checked: true },
    { id: 'state', label: 'State', checked: true },
    { id: 'property_value', label: 'Value (₹)', checked: true },
    { id: 'status', label: 'Status', checked: true },
    { id: 'created_at', label: 'Date Added', checked: true },
    { id: 'owner_name', label: 'Owner', checked: false },
    { id: 'owner_contact', label: 'Contact', checked: false },
    { id: 'plot_area_sqft', label: 'Plot Area (sqft)', checked: false },
    { id: 'builtup_area_sqft', label: 'Built-up Area (sqft)', checked: false },
  ]);


  const fetchProperties = async () => {
    try {
      const response = await fetch(`${baseurl}/properties/user-id/${userId}/`);
      const data = await response.json();
      console.log("userid", userId)
      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    let results = [...properties];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const referralId = localStorage.getItem('referral_id');

      results = results.filter(property => {
        const searchFields = [
          property.property_title,
          property.first_name,
          property.city,
          property.state,
          property.owner_name,
          property.owner_contact,
          property.address,
          property.description,
          property.property_value?.toString(),
          property.plot_area_sqft?.toString(),
          property.builtup_area_sqft?.toString(),
          referralId
        ].filter(Boolean);

        return searchFields.some(field => field.toLowerCase().includes(query));
      });
    }


    // Apply sort filter
    switch (sortBy) {
      case 'latest':
        results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'oldest':
        results.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'price-high':
        results.sort((a, b) => b.property_value - a.property_value);
        break;
      case 'price-low':
        results.sort((a, b) => a.property_value - b.property_value);
        break;
      case 'sold':
        results = results.filter((property) => property.status?.toLowerCase() === 'sold');
        break;
      case 'available':
        results = results.filter((property) => property.status?.toLowerCase() === 'available');
        break;
      case 'booked':
        results = results.filter((property) => property.status?.toLowerCase() === 'booked');
        break;
      default:
        // No sorting
        break;
    }

    setFilteredProperties(results);
  }, [searchQuery, sortBy, properties]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    // Fetch data based on `value` or update UI accordingly
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProperty(null);
  };

  const [openCarousel, setOpenCarousel] = useState(false);

  const handleImageClick = (property) => {
    setSelectedProperty(property);
    setOpenCarousel(true);
  };

  const handleCloseCarousel = () => {
    setOpenCarousel(false);
    setSelectedProperty(null);
  };

  const handleDelete = async (propertyId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the property.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`${baseurl}/property/${propertyId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Property deleted successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
        fetchProperties(); // Refresh list or redirect
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: `Failed to delete property. Status: ${response.status}`,
        });
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the property.',
      });
    }
  };


  const handleNextImage = (propertyId, totalImages) => (e) => {
    e.stopPropagation();
    setCurrentImageIndices(prev => ({
      ...prev,
      [propertyId]: (prev[propertyId] || 0) < totalImages - 1 ? (prev[propertyId] || 0) + 1 : 0
    }));
  };

  const handlePrevImage = (propertyId, totalImages) => (e) => {
    e.stopPropagation();
    setCurrentImageIndices(prev => ({
      ...prev,
      [propertyId]: (prev[propertyId] || 0) > 0 ? (prev[propertyId] || 0) - 1 : totalImages - 1
    }));
  };

  // Function to get all media (images + videos) for a property
  const getAllMedia = (property) => {
    const media = [];

    // Add images
    if (property.images && property.images.length > 0) {
      media.push(...property.images.map(img => ({
        type: 'image',
        url: `${baseurl}${img.image}`,
        alt: `Property image`
      })));
    }

    // Add videos
    if (property.videos && property.videos.length > 0) {
      media.push(...property.videos.map(vid => ({
        type: 'video',
        url: `${baseurl}${vid.video}`,
        alt: `Property video`
      })));
    }

    return media;
  };

  // Function to get the current media URL for a property
  const getCurrentMediaUrl = (property) => {
    const media = getAllMedia(property);
    if (media.length === 0) return 'https://via.placeholder.com/300';

    const currentIndex = currentImageIndices[property.property_id] || 0;
    return media[currentIndex]?.url || 'https://via.placeholder.com/300';
  };

  // Function to check if current media is a video
  const isCurrentMediaVideo = (property) => {
    const media = getAllMedia(property);
    if (media.length === 0) return false;

    const currentIndex = currentImageIndices[property.property_id] || 0;
    return media[currentIndex]?.type === 'video';
  };


  // Report generation functions
  const openReportConfiguration = () => {
    setOpenReportConfigDialog(true);
  };

  const closeReportConfiguration = () => {
    setOpenReportConfigDialog(false);
  };

  const generateReport = () => {
    let filtered = [...properties];

    filtered = filtered.filter(property => {
      const propertyDate = new Date(property.created_at);
      return propertyDate >= startDate && propertyDate <= endDate;
    });

    if (reportType === 'monthly') {
      const grouped = filtered.reduce((acc, property) => {
        const date = new Date(property.created_at);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(property);
        return acc;
      }, {});

      const report = Object.entries(grouped).map(([monthYear, properties]) => ({
        period: monthYear,
        count: properties.length,
        totalValue: properties.reduce((sum, p) => sum + (p.property_value || 0), 0),
        properties
      }));

      setReportData(report);
    } else if (reportType === 'yearly') {
      const grouped = filtered.reduce((acc, property) => {
        const date = new Date(property.created_at);
        const year = date.getFullYear().toString();

        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(property);
        return acc;
      }, {});

      const report = Object.entries(grouped).map(([year, properties]) => ({
        period: year,
        count: properties.length,
        totalValue: properties.reduce((sum, p) => sum + (p.property_value || 0), 0),
        properties
      }));

      setReportData(report);
    } else {
      setReportData([{
        period: `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
        count: filtered.length,
        totalValue: filtered.reduce((sum, p) => sum + (p.property_value || 0), 0),
        properties: filtered
      }]);
    }

    setOpenReportConfigDialog(false);
    setOpenReportDialog(true);
  };

  const exportToCSV = () => {
    const activeColumns = reportColumns.filter(col => col.checked).map(col => col.id);

    let csv = activeColumns.map(col =>
      reportColumns.find(rc => rc.id === col)?.label || col
    ).join(',') + '\n';

    reportData.forEach(group => {
      group.properties.forEach(property => {
        const row = activeColumns.map(col => {
          if (col === 'created_at') {
            return `"${new Date(property[col]).toLocaleDateString()}"`;
          }
          return `"${property[col] || ''}"`;
        }).join(',');
        csv += row + '\n';
      });
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `property_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const exportToPDF = () => {
    // This is a placeholder - in a real implementation you would use jsPDF or similar
    const pdfContent = `
      Property Report\n\n
      Period: ${reportData[0]?.period || ''}\n
      Total Properties: ${reportData.reduce((sum, group) => sum + group.count, 0)}\n
      Total Value: ₹${reportData.reduce((sum, group) => sum + group.totalValue, 0).toLocaleString()}\n\n
      ${reportColumns.filter(col => col.checked).map(col => col.label).join(' | ')}\n
      ${reportData.flatMap(group =>
      group.properties.map(property =>
        reportColumns.filter(col => col.checked).map(col =>
          col.id === 'created_at'
            ? new Date(property[col.id]).toLocaleDateString()
            : property[col.id] || ''
        ).join(' | ')
      ).join('\n')
    ).join('\n')}
    `;

    alert('In a real implementation, this would generate a PDF with the following content:\n\n' + pdfContent);
  };

  const printReport = () => {
    const printContent = `
      <html>
        <head>
          <title>Property Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            .report-header { margin-bottom: 20px; }
            .report-summary { margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .period { font-weight: bold; margin-top: 20px; }
            .summary-item { margin: 5px 0; }
          </style>
        </head>
        <body>
          <h1>Property Report</h1>
          <div class="report-header">
            <div class="summary-item">Generated on: ${new Date().toLocaleDateString()}</div>
            <div class="summary-item">Report period: ${reportData[0]?.period || ''}</div>
          </div>
          <div class="report-summary">
            <h3>Summary</h3>
            <div class="summary-item">Total properties: ${reportData.reduce((sum, group) => sum + group.count, 0)}</div>
            <div class="summary-item">Total value: ₹${reportData.reduce((sum, group) => sum + group.totalValue, 0).toLocaleString()}</div>
          </div>
          <table>
            <thead>
              <tr>
                ${reportColumns.filter(col => col.checked).map(col => `<th>${col.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${reportData.flatMap(group =>
      group.properties.map(property =>
        `<tr>
                    ${reportColumns.filter(col => col.checked).map(col =>
          `<td>${col.id === 'created_at'
            ? new Date(property[col.id]).toLocaleDateString()
            : property[col.id] || ''
          }</td>`
        ).join('')}
                  </tr>`
      ).join('')
    ).join('')}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 1000);
            };
          </script>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <>
      <InvestorHeader />
      <Container sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Properties
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={openReportConfiguration}
            startIcon={<DescriptionIcon />}
            sx={{ ml: 2 }}
          >
            Generate Report
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: 'white',
            p: 2,
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            mb: 3
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search assets..."
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#757575' }} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  displayEmpty
                  sx={{
                    borderRadius: '8px',
                    fontSize: '15px'
                  }}
                >
                  <MenuItem value="">
                    <em>Sort By</em>
                  </MenuItem>
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="sold">Sold</MenuItem>
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="booked">Booked</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  backgroundColor: '#2ECC71',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: '#27AE60'
                  }
                }}
                onClick={() => navigate('/i-addproperty')}
              >
                Add Property
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Cards Section */}
        {filteredProperties.length > 0 ? (
          <Grid container spacing={3}>
            {paginatedProperties.map((property) => {
              const media = getAllMedia(property);
              const currentIndex = currentImageIndices[property.property_id] || 0;
              const totalMedia = media.length;

              return (
                <Grid item xs={12} md={6} lg={4} key={property.id}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.749)',
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      {isCurrentMediaVideo(property) ? (
                        <Box sx={{ height: '220px', position: 'relative' }}>
                          <video
                            controls
                            style={{
                              width: '100%',
                              height: '220px',
                              objectFit: 'cover',
                              borderRadius: '12px 12px 0 0',
                              cursor: 'pointer'
                            }}
                            onClick={() => handleImageClick(property)}
                          >
                            <source src={getCurrentMediaUrl(property)} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <VideocamIcon
                            sx={{
                              position: 'absolute',
                              top: 8,
                              left: 8,
                              color: 'white',
                              backgroundColor: 'rgba(0,0,0,0.5)',
                              borderRadius: '50%',
                              padding: '4px'
                            }}
                          />
                        </Box>
                      ) : (
                        <CardMedia
                          component="img"
                          height="220"
                          image={getCurrentMediaUrl(property)}
                          alt={property.property_title}
                          sx={{ objectFit: 'cover', borderRadius: '12px 12px 0 0', cursor: 'pointer' }}
                          onClick={() => handleImageClick(property)}
                        />
                      )}

                      {/* Navigation arrows when there are multiple media items */}
                      {totalMedia > 1 && (
                        <>
                          <IconButton
                            sx={{
                              position: 'absolute',
                              left: 10,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              backgroundColor: 'rgba(36, 36, 36, 0.5)',
                              color: 'white',
                              '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.7)'
                              }
                            }}
                            onClick={handlePrevImage(property.property_id, totalMedia)}
                          >
                            <ChevronLeftIcon />
                          </IconButton>
                          <IconButton
                            sx={{
                              position: 'absolute',
                              right: 10,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              backgroundColor: 'rgba(90, 81, 81, 0.5)',
                              color: 'white',
                              '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.7)'
                              }
                            }}
                            onClick={handleNextImage(property.property_id, totalMedia)}
                          >
                            <ChevronRightIcon />
                          </IconButton>
                          {/* Media counter */}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 10,
                              right: 10,
                              backgroundColor: 'rgba(0,0,0,0.5)',
                              color: 'white',
                              px: 1,
                              borderRadius: '4px',
                              fontSize: '0.75rem'
                            }}
                          >
                            {`${currentIndex + 1}/${totalMedia}`}
                          </Box>
                        </>
                      )}
                      {property.status !== 'sold' && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 15,
                            right: -30,
                            width: '150px',
                            transform: 'rotate(45deg)',
                            backgroundColor: "red",
                            color: 'white',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            py: '4px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                          }}
                        >
                          {property.looking_to === 'sell' ? 'Sell' : 'Rent'}
                        </Box>
                      )}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 15,
                          left: -30,
                          width: '150px',
                          transform: 'rotate(-45deg)',
                          backgroundColor:
                            property.status === 'available'
                              ? '#2ECC71'
                              : property.status === 'booked'
                                ? '#E67E22'
                                : '#E74C3C',
                          color: 'white',
                          textAlign: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          py: '4px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        }}
                      >
                        {property.status}
                      </Box>
                    </Box>
                    <CardContent>
                      <Typography fontWeight="bold" mb={1}>
                        {property.property_title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        {property.city}, {property.state}
                      </Typography>
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          p: 1.5,
                          borderRadius: 1,
                          mb: 2
                        }}
                      >
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Plot Area
                          </Typography>
                          <Typography fontWeight="600" color="#4A90E2">
                            {property.plot_area_sqft} sqft
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Built-up Area
                          </Typography>
                          <Typography fontWeight="600" color="#4A90E2">
                            {property.builtup_area_sqft} sqft
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Property Value
                          </Typography>
                          <Typography fontWeight="600" color="#4A90E2">
                            ₹{property.total_property_value}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Floors
                          </Typography>
                          <Typography fontWeight="600" color="#4A90E2">
                            {property.number_of_floors}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box
                        sx={{

                          borderRadius: 1,
                          p: 1.5,
                          mb: 2
                        }}
                      >
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Office Email
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color="#4A90E2"
                              align="right"
                              display="flex"
                              justifyContent="flex-end"
                              alignItems="center"
                              gap={1}
                            >
                              <EmailIcon fontSize="small" />
                              {property.owner_email}
                            </Typography>
                          </Grid>

                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Owner Contact
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color="text.secondary"
                              align="right"
                              display="flex"
                              justifyContent="flex-end"
                              alignItems="center"
                              gap={1}
                            >
                              <CallIcon fontSize="small" />
                              {property.owner_contact}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ width: '100%',  }}
                        >
                          {/* Left side: Agent Referral Id */}
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                          </Box>
                          {/* Right side: Edit/Delete buttons */}
                          <Box display="flex" alignItems="center">
                            <IconButton
                              aria-label="edit"
                              size="medium"
                              sx={{ color: '#1976d2' }}
                              onClick={() => navigate(`/i-assets/edit/${property.property_id}`, { state: { property } })}
                            >
                              <EditIcon fontSize="medium" />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              size="medium"
                              sx={{ color: 'red', ml: '4px' }}
                              onClick={() => handleDelete(property.property_id)}
                            >
                              <DeleteIcon fontSize="medium" />
                            </IconButton>
                          </Box>
                        </Box>

                      </Box>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{
                              backgroundColor: '#149c33',
                              color: 'white',
                              textTransform: 'none',
                              '&:hover': { backgroundColor: '#59ed7c', color: 'rgb(5,5,5)' }
                            }}
                            // onClick={() => handleViewDetails(property)}
                            onClick={() => navigate(`/i-assets/${property.property_id}`, { state: { property } })}
                          >
                            VIEW DETAILS
                          </Button>
                        </Grid>
                        {/* <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                          borderColor: '#4A90E2',
                          color: '#4A90E2',
                          textTransform: 'none'
                        }}
                        onClick={() => navigate("/investment-page")}
                      >
                        {property.looking_to === 'sell' ? 'BUY NOW' : 'RENT NOW'}
                      </Button>
                    </Grid> */}
                      </Grid>
                    </CardContent>
                    {/* Media Carousel Dialog */}
                    <Dialog open={openCarousel} onClose={handleCloseCarousel} maxWidth="md" fullWidth>
                      <Box sx={{ p: 2, background: '#000' }}>
                        {selectedProperty && getAllMedia(selectedProperty).length > 0 ? (
                          <Carousel
                            showThumbs={false}
                            infiniteLoop
                            useKeyboardArrows
                            dynamicHeight
                            autoPlay
                            emulateTouch
                          >
                            {getAllMedia(selectedProperty)
                              .filter((media) => media.type === 'image') // ✅ Filter only images
                              .map((media, idx) => (
                                <div key={idx}>
                                  <img
                                    src={media.url}
                                    alt={media.alt || `Image ${idx + 1}`}
                                    style={{
                                      borderRadius: 8,
                                      maxHeight: '550px',
                                      objectFit: 'cover',
                                      width: '100%',
                                    }}
                                  />
                                </div>
                              ))}
                          </Carousel>

                        ) : (
                          <Typography color="white">No media available.</Typography>
                        )}
                      </Box>
                    </Dialog>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            textAlign: 'center'
          }}>
            <Typography variant="h6" color="textSecondary">
              No properties found matching your criteria.
            </Typography>
          </Box>
        )}
        <PaginationComponent
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />

        {/* Report Configuration Dialog */}
        <Dialog open={openReportConfigDialog} onClose={closeReportConfiguration} maxWidth="sm" fullWidth>
          <DialogTitle>Generate Property Report</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="report-type-label">Report Type</InputLabel>
                <Select
                  labelId="report-type-label"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  label="Report Type"
                >
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                  <MenuItem value="custom">Custom Date Range</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Start Date
                  </Typography>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    customInput={
                      <TextField
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EventIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    }
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    End Date
                  </Typography>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    customInput={
                      <TextField
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonthIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    }
                  />
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Select Columns to Include
                </Typography>
                <FormGroup>
                  {reportColumns.map((column) => (
                    <FormControlLabel
                      key={column.id}
                      control={
                        <Checkbox
                          checked={column.checked}
                          onChange={(e) => {
                            const updatedColumns = reportColumns.map(col =>
                              col.id === column.id ? { ...col, checked: e.target.checked } : col
                            );
                            setReportColumns(updatedColumns);
                          }}
                        />
                      }
                      label={column.label}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeReportConfiguration} color="primary">
              Cancel
            </Button>
            <Button onClick={generateReport} variant="contained" color="primary">
              Generate Report
            </Button>
          </DialogActions>
        </Dialog>

        {/* Report Display Dialog */}
        <Dialog open={openReportDialog} onClose={() => setOpenReportDialog(false)} maxWidth="lg" fullWidth>
          <DialogTitle>Property Report</DialogTitle>
          <DialogContent dividers>
            {/* <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Report Summary
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                        <Box>
                          <Typography variant="subtitle2">Report Period</Typography>
                          <Typography>{reportData.length > 0 ? reportData[0].period : ''}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle2">Total Properties</Typography>
                          <Typography>{reportData.reduce((sum, group) => sum + group.count, 0)}</Typography>
                        </Box>
                        
                        <Box>
                          <Typography variant="subtitle2">Generated On</Typography>
                          <Typography>{new Date().toLocaleDateString()}</Typography>
                        </Box>
                      </Box>
                    </Box> */}

            <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {reportColumns.filter(col => col.checked).map(column => (
                      <TableCell
                        key={column.id}
                        sx={{ fontWeight: 'bold', color: "#4A90E2" }} // <-- Add styles here
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.flatMap(group =>
                    group.properties.map((property, idx) => (
                      <TableRow key={`${group.period}-${idx}`}>
                        {reportColumns.filter(col => col.checked).map(column => (
                          <TableCell key={`${property.id}-${column.id}`}>
                            {column.id === 'created_at'
                              ? new Date(property[column.id]).toLocaleDateString()
                              : column.id === 'property_value'
                                ? `₹${property[column.id]?.toLocaleString() || '-'}`
                                : property[column.id] || '-'}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenReportDialog(false)} color="primary">
              Close
            </Button>
            <Button onClick={printReport} startIcon={<PrintIcon />} color="primary">
              Print
            </Button>
            <Button onClick={exportToPDF} startIcon={<PictureAsPdfIcon />} color="primary">
              PDF
            </Button>
            <Button onClick={exportToCSV} startIcon={<DescriptionIcon />} color="primary">
              CSV
            </Button>
          </DialogActions>
        </Dialog>

        {/* Pagination */}
        {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Pagination count={3} shape="rounded" />
        </Box> */}

        {/* Property Details Dialog */}
        {selectedProperty && (
          <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="lg">
            <DialogTitle>{selectedProperty.property_title} - Details</DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={selectedProperty.images.length > 0 ? `${baseurl}/${selectedProperty.images[0].image}` : 'https://via.placeholder.com/300'}
                    alt={selectedProperty.property_title}
                    sx={{ width: '100%', borderRadius: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 1 }}>
                    <Typography fontWeight="bold">Description:</Typography>
                    <Typography variant="body2">{selectedProperty.description}</Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography fontWeight="bold">Address:</Typography>
                    <Typography variant="body2">
                      {selectedProperty.address}, {selectedProperty.city}, {selectedProperty.state}, {selectedProperty.country} - {selectedProperty.pin_code}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography fontWeight="bold">Coordinates:</Typography>
                    <Typography variant="body2">
                      Latitude: {selectedProperty.latitude}, Longitude: {selectedProperty.longitude}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography fontWeight="bold">Dimensions:</Typography>
                    <Typography variant="body2">
                      Length: {selectedProperty.length_ft} ft, Breadth: {selectedProperty.breadth_ft} ft
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography fontWeight="bold">Facing Direction:</Typography>
                    <Typography variant="body2">{selectedProperty.facing}</Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography fontWeight="bold">Ownership Type:</Typography>
                    <Typography variant="body2">{selectedProperty.ownership_type}</Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography fontWeight="bold">Property Uniqueness:</Typography>
                    <Typography variant="body2">{selectedProperty.property_uniqueness}</Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography fontWeight="bold">Location Advantages:</Typography>
                    <Typography variant="body2">{selectedProperty.location_advantages}</Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography fontWeight="bold">Other Features:</Typography>
                    <Typography variant="body2">{selectedProperty.other_features}</Typography>
                  </Box>
                  {/* <Box>
                    <Typography fontWeight="bold">Contact:</Typography>
                    <Typography variant="body2">
                      {selectedProperty.owner_name} - {selectedProperty.owner_contact} ({selectedProperty.owner_email})
                    </Typography>
                  </Box> */}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} variant="contained" color="error">
                CLOSE
              </Button>
              <Button variant="contained" color="success">
                {selectedProperty.looking_to === 'sell' ? 'BUY NOW' : 'RENT NOW'}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </>
  );
};

export default PartnerMyAssets;