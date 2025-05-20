import React, { useState, useEffect } from 'react';
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
  IconButton,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../../../Shared/Navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import PaginationComponent from '../../../Shared/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { baseurl } from '../../../BaseURL/BaseURL';

const AssetsUI = () => {
  const [sortBy, setSortBy] = useState('');
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  const [openCarousel, setOpenCarousel] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${baseurl}/property/`);
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  // Apply both search and sort filters
  useEffect(() => {
    let results = [...properties];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(property => {
        const searchFields = [
          property.property_title,
          property.first_name,
          property.city,
          property.owner_name,
          property.owner_contact,
          property.state,
          property.address,
          property.description,
          property.referral_id,
          property.property_value?.toString(),
          property.plot_area_sqft?.toString(),
          property.builtup_area_sqft?.toString()
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

  const handleImageClick = (property) => {
    setSelectedProperty(property);
    setOpenCarousel(true);
  };

  const handleCloseCarousel = () => {
    setOpenCarousel(false);
    setSelectedProperty(null);
  };

  const handleDelete = async (propertyId) => {
    const confirmed = window.confirm("Are you sure you want to delete this property?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${baseurl}/property/${propertyId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Property deleted successfully.');
        setProperties(prev => prev.filter(p => p.property_id !== propertyId));
        setFilteredProperties(prev => prev.filter(p => p.property_id !== propertyId));
      } else {
        alert(`Failed to delete property. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('An error occurred while deleting the property.');
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

  const updateApprovalStatus = async (propertyId, newStatus) => {
    try {
      const response = await fetch(`${baseurl}/property/${propertyId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ approval_status: newStatus })
      });

      if (response.ok) {
        alert('Approval status updated successfully.');
        const updatedData = await response.json();
        setProperties(prev =>
          prev.map(p => (p.property_id === propertyId ? { ...p, approval_status: updatedData.approval_status } : p))
        );
        setFilteredProperties(prev =>
          prev.map(p => (p.property_id === propertyId ? { ...p, approval_status: updatedData.approval_status } : p))
        );
      } else {
        alert(`Failed to update approval status. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating approval status:', error);
      alert('An error occurred while updating the approval status.');
    }
  };

  return (
    <>
      <Header />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ marginLeft: '10px', textAlign: "center" }}>
          Properties
        </Typography>
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
                onClick={() => navigate('/a-addasset')}
              >
                Add Property
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Cards Section */}
        {filteredProperties.length > 0 ? (
          <Grid container spacing={3}>
            {paginatedProperties.map((property) => (
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
                    <CardMedia
                      component="img"
                      height="220"
                      image={property.images.length > 0 ? 
                        `${baseurl}${property.images[currentImageIndices[property.property_id] || 0]?.image}` : 
                        'https://via.placeholder.com/300'}
                      alt={property.property_title}
                      sx={{ objectFit: 'cover', borderRadius: '12px 12px 0 0', cursor: 'pointer' }}
                      onClick={() => handleImageClick(property)}
                    />
                    {/* Navigation arrows when there are multiple images */}
                    {property.images.length > 1 && (
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
                          onClick={handlePrevImage(property.property_id, property.images.length)}
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
                          onClick={handleNextImage(property.property_id, property.images.length)}
                        >
                          <ChevronRightIcon />
                        </IconButton>
                        {/* Image counter */}
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
                          {`${(currentImageIndices[property.property_id] || 0) + 1}/${property.images.length}`}
                        </Box>
                      </>
                    )}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        px: 2,
                        py: 1,
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        backgroundColor: '#2ECC71',
                        color: 'white'
                      }}
                    >
                      {property.looking_to === 'sell' ? 'For Sale' : 'For Rent'}
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography fontWeight="bold" mb={1}>
                      {property.property_title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {property.city}, {property.state}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Added By: <strong>{property.first_name}</strong>
                    </Typography>
                    <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 500 }}>
                        Approval Status
                      </Typography>
                      <Select
                        value={property.approval_status || ''}
                        onChange={(e) => updateApprovalStatus(property.property_id, e.target.value)}
                        displayEmpty
                        sx={{
                          borderRadius: '8px',
                          backgroundColor: '#f9f9f9',
                          '&:hover': {
                            backgroundColor: '#f0f0f0'
                          }
                        }}
                      >
                        <MenuItem value={property.approval_status}>
                          <em>{property.approval_status}</em>
                        </MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                      </Select>
                    </FormControl>

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
                    <Grid container spacing={1}>
                      <Grid item xs={12} display="flex" justifyContent="right" gap={2}>
                        <Tooltip title="Edit">
                          <IconButton
                            sx={{ color: '#1976d2' }}
                            onClick={() => navigate(`/a-assets/edit/${property.property_id}`, { state: { property } })}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton
                            sx={{ color: '#d32f2f' }}
                            onClick={() => handleDelete(property.property_id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
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
                          onClick={() => navigate(`/a-assets/${property.property_id}`, { state: { property } })}
                        >
                          VIEW DETAILS
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                  {/* Image Carousel Dialog */}
                  <Dialog open={openCarousel} onClose={handleCloseCarousel} maxWidth="md" fullWidth>
                    <Box sx={{ p: 2, background: '#000' }}>
                      {selectedProperty && selectedProperty.images && selectedProperty.images.length > 0 ? (
                        <Carousel
                          showThumbs={false}
                          infiniteLoop
                          useKeyboardArrows
                          dynamicHeight
                          autoPlay
                          emulateTouch
                        >
                          {selectedProperty.images.map((imgObj, idx) => (
                            <div key={idx}>
                              <img
                                src={`${baseurl}${imgObj.image}`}
                                alt={`property-img-${idx}`}
                                style={{ borderRadius: 8, maxHeight: '550px', objectFit: 'cover' }}
                              />
                            </div>
                          ))}
                        </Carousel>
                      ) : (
                        <Typography color="white">No images available.</Typography>
                      )}
                    </Box>
                  </Dialog>
                </Card>
              </Grid>
            ))}
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
                  <Box>
                    <Typography fontWeight="bold">Contact:</Typography>
                    <Typography variant="body2">
                      {selectedProperty.owner_name} - {selectedProperty.owner_contact} ({selectedProperty.owner_email})
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} variant="contained" color="error">
                CLOSE
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </>
  );
};

export default AssetsUI;