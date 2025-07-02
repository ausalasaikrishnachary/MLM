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
  Pagination
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import PaginationComponent from '../../../Shared/Pagination';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import { baseurl } from '../../../BaseURL/BaseURL';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VideocamIcon from '@mui/icons-material/Videocam';


const AssetsUI = () => {
  const [sortBy, setSortBy] = useState('latest');
  const [properties, setProperties] = useState([]); 
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const userId = localStorage.getItem("user_id");
  const [subscriptionPaid, setSubscriptionPaid] = useState(false);
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (userId) {
      axios.get(`${baseurl}/user-subscriptions/user-id/${userId}/`)
        .then(response => {
          const data = response.data;

          // Check if latest_status === "paid"
          const latest = data.find(item => item.latest_status !== undefined);
          if (latest && latest.latest_status === "paid") {
            setSubscriptionPaid(true);
          } else {
            setSubscriptionPaid(false);
          }
        })
        .catch(error => {
          console.error("Subscription fetch error:", error);
        });
    }
  }, [userId]);


  useEffect(() => {
    const fetchProperties = async () => {
      const userId = localStorage.getItem("user_id"); // make sure this is a string
      try {
        const response = await fetch(`${baseurl}/properties/approval-status/approved/`);
        const data = await response.json();

        // Filter out properties where user_id matches the current user's id
        const filteredProperties = data.filter(
          (property) => property.user_id?.toString() !== userId
        );

        setProperties(filteredProperties);
        setFilteredProperties(filteredProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

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
          property.state,
          property.owner_name,
          property.owner_contact,
          property.address,
          property.description,
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

  const handleNextImage = (propertyId, totalMedia) => (e) => {
    e.stopPropagation();
    setCurrentImageIndices(prev => ({
      ...prev,
      [propertyId]: (prev[propertyId] || 0) < totalMedia - 1 ? (prev[propertyId] || 0) + 1 : 0
    }));
  };

  const handlePrevImage = (propertyId, totalMedia) => (e) => {
    e.stopPropagation();
    setCurrentImageIndices(prev => ({
      ...prev,
      [propertyId]: (prev[propertyId] || 0) > 0 ? (prev[propertyId] || 0) - 1 : totalMedia - 1
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

  return (
    <>
      <PartnerHeader />
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
            <Grid item xs={12} md={6}>
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
                          {property.looking_to}
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
                            property.status === 'sold'
                              ? '#2ECC71' // Green
                              : property.status === 'booked'
                                ? '#F1C40F' // Yellow
                                : property.status === 'cancelled'
                                  ? '#E74C3C' // Red
                                  : property.status === 'available'
                                    ? '#3498DB' // Blue
                                    : '#95A5A6', // Fallback grey
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
                          backgroundColor: '#F8F9FA',
                          borderRadius: 1,
                          p: 1.5,
                          mb: 2
                        }}
                      >
                        <Grid container>
                          {subscriptionPaid && property.referral_id ? (
                            <Grid item xs={12}>
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="#E67E22"
                                textAlign="center"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                gap={1}
                              >
                                Added by: {property.username}
                              </Typography>
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="#E67E22"
                                textAlign="center"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                gap={1}
                              >
                                Referral ID: {property.referral_id}
                              </Typography>
                            </Grid>

                          ) : (
                            <>
                              <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                  {subscriptionPaid ? "Owner Email" : "Office Email"}
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
                                  {subscriptionPaid ? property.owner_email : "sriraj@gmail.com"}
                                </Typography>
                              </Grid>

                              <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                  {subscriptionPaid ? "Owner Contact" : "Office Contact"}
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
                                  {subscriptionPaid ? property.owner_contact : "9074307248"}
                                </Typography>
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </Box>

                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{
                              color: 'white',
                              textTransform: 'none',
                              '&:hover': { color: 'rgb(5,5,5)' }
                            }}
                            disabled={!subscriptionPaid}
                            onClick={() => navigate(`/p-assets/${property.property_id}`, { state: { property } })}
                          >
                            VIEW DETAILS
                          </Button>
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
                            disabled={!subscriptionPaid || property.status !== 'available'}
                            onClick={() => navigate(`/p-bookingassets?property_id=${property.property_id}`)}
                          >
                            Buy Now
                          </Button>
                        </Grid>
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

export default AssetsUI;