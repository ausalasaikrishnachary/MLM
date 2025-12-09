// import React from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import {
//   Container, Typography, Grid, Box, Button
// } from '@mui/material';
// import Header from '../../../Shared/Navbar/Navbar';

// const AssetDetails = () => {
//   const location = useLocation();
//   const { property } = location.state || {};
//   const { id } = useParams();

//   if (!property) {
//     return <Typography>Loading property details...</Typography>;
//   }

//   return (
//     <>
//       <Header />
//       <Container sx={{ py: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           {property.property_title}
//         </Typography>

//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Box
//               component="img"
//               src={property.images.length > 0 ? `${baseurl}${property.images[0].image}` : 'https://via.placeholder.com/300'}
//               alt={property.property_title}
//               sx={{ width: '100%', borderRadius: 2 }}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Typography><strong>Description:</strong> {property.description}</Typography>
//             <Typography><strong>Address:</strong> {property.address}, {property.city}, {property.state}, {property.country} - {property.pin_code}</Typography>
//             <Typography><strong>Latitude:</strong> {property.latitude}</Typography>
//             <Typography><strong>Longitude:</strong> {property.longitude}</Typography>
//             <Typography><strong>Looking to:</strong> {property.looking_to}</Typography>
//             <Typography><strong>Property Value:</strong> {property.property_value}</Typography>
//             <Typography><strong>Plot Area:</strong> {property.plot_area_sqft} sq.ft</Typography>
//             <Typography><strong>Built-up Area:</strong> {property.builtup_area_sqft} sq.ft</Typography>
//             <Typography><strong>Length:</strong> {property.length_ft} ft</Typography>
//             <Typography><strong>Breadth:</strong> {property.breadth_ft} ft</Typography>
//             <Typography><strong>Number of Floors:</strong> {property.number_of_floors}</Typography>
//             <Typography><strong>Facing:</strong> {property.facing}</Typography>
//             <Typography><strong>Open Sides:</strong> {property.number_of_open_sides}</Typography>
//             <Typography><strong>Roads:</strong> {property.number_of_roads}</Typography>
//             <Typography><strong>Road Width 1:</strong> {property.road_width_1_ft} ft</Typography>
//             <Typography><strong>Road Width 2:</strong> {property.road_width_2_ft} ft</Typography>
//             <Typography><strong>Ownership Type:</strong> {property.ownership_type}</Typography>
//             <Typography><strong>Bedrooms:</strong> {property.number_of_bedrooms || 'N/A'}</Typography>
//             <Typography><strong>Bathrooms:</strong> {property.number_of_bathrooms || 'N/A'}</Typography>
//             <Typography><strong>Balconies:</strong> {property.number_of_balconies || 'N/A'}</Typography>
//             <Typography><strong>Property Uniqueness:</strong> {property.property_uniqueness || 'N/A'}</Typography>
//             <Typography><strong>Location Advantages:</strong> {property.location_advantages || 'N/A'}</Typography>
//             <Typography><strong>Other Features:</strong> {property.other_features || 'N/A'}</Typography>
//             <Typography><strong>Owner:</strong> {property.owner_name} - {property.owner_contact}</Typography>
//             <Typography><strong>Owner Email:</strong> {property.owner_email}</Typography>
//             <Typography><strong>Status:</strong> {property.status}</Typography>
//             <Typography><strong>Created At:</strong> {new Date(property.created_at).toLocaleString()}</Typography>
//             <Typography><strong>Updated At:</strong> {new Date(property.updated_at).toLocaleString()}</Typography>
//           </Grid>
//         </Grid>

//         <Box mt={4}>
//           <Button variant="outlined" href="/a-asset">Back</Button>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default AssetDetails;


import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Grid, Box, Button, Divider, Chip, Card, CardContent,
  Dialog, IconButton, Tabs, Tab, Container, Table, TableBody, TableCell,
  TableContainer, TableRow, Paper, CircularProgress, Alert, Snackbar
} from '@mui/material';
import Header from '../../../Shared/Navbar/Navbar';

// Icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import HomeIcon from '@mui/icons-material/Home';
import DetailsIcon from '@mui/icons-material/Details';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { baseurl } from '../../../BaseURL/BaseURL';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`property-tabpanel-${index}`}
      aria-labelledby={`property-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const AssetDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { property: passedProperty } = location.state || {};

  const [property, setProperty] = useState(passedProperty || null);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isPlot, setIsPlot] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [openMedia, setOpenMedia] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(!passedProperty);
  const [error, setError] = useState(null);

  // Fetch property if not passed via state
  useEffect(() => {
    if (!passedProperty && id) {
      const fetchProperty = async () => {
        try {
          setLoading(true);
          setError(null);
          
          // Try both endpoints - check which one works for your admin panel
          const endpoints = [
            `${baseurl}/property/${id}/`,      // Same as partner panel
            `${baseurl}/properties/${id}/`,    // Current admin endpoint
            `${baseurl}/admin/property/${id}/` // Possible admin-specific endpoint
          ];

          let response = null;
          let data = null;

          // Try each endpoint until one works
          for (const endpoint of endpoints) {
            try {
              console.log(`Trying endpoint: ${endpoint}`);
              response = await fetch(endpoint);
              if (response.ok) {
                data = await response.json();
                console.log('Success with endpoint:', endpoint);
                break;
              }
            } catch (err) {
              console.warn(`Endpoint ${endpoint} failed:`, err.message);
              continue;
            }
          }

          if (!data) {
            throw new Error('Failed to fetch property from all endpoints');
          }

          setProperty({
            ...data,
            images: Array.isArray(data.images) ? data.images : [],
            videos: Array.isArray(data.videos) ? data.videos : [],
            files: Array.isArray(data.files) ? data.files : [],
          });
        } catch (err) {
          console.error("Error fetching property:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProperty();
    }
  }, [id, passedProperty]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseurl}/property-categories/`);
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch property types and detect if it's a plot
  useEffect(() => {
    const fetchPropertyTypes = async () => {
      if (!property) return;
      
      try {
        const res = await fetch(`${baseurl}/property-types/`);
        if (!res.ok) throw new Error('Failed to fetch property types');
        const data = await res.json();
        setPropertyTypes(data);
        
        const type = data.find(t => t.property_type_id === property.property_type);
        setIsPlot(type?.name?.toLowerCase() === "plot");
      } catch (err) {
        console.error('Error fetching property types:', err);
      }
    };

    fetchPropertyTypes();
  }, [property]);

  const getCategoryName = (id) => {
    if (!id) return "N/A";
    const cat = categories.find(c => c.property_category_id === id);
    return cat ? cat.name : "N/A";
  };

  const getPropertyTypeName = (id) => {
    if (!id) return "N/A";
    const type = propertyTypes.find(t => t.property_type_id === id);
    return type ? type.name : "N/A";
  };

  const formatCurrency = (value) => {
    if (!value || isNaN(value)) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Combined media array (images + videos)
  const media = [
    ...(property?.images || []).map(img => ({ 
      type: "image", 
      url: img.image?.startsWith('http') ? img.image : `${baseurl}${img.image}` 
    })),
    ...(property?.videos || []).map(vid => ({ 
      type: "video", 
      url: vid.video?.startsWith('http') ? vid.video : `${baseurl}${vid.video}` 
    }))
  ];

  const handleOpenMedia = (index) => {
    setCurrentIndex(index);
    setOpenMedia(true);
  };

  const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? media.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex(prev => (prev === media.length - 1 ? 0 : prev + 1));
  const handleClose = () => setOpenMedia(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const el = document.getElementById('tab-content');
    if (el) el.scrollTop = 0;
  };

  if (loading) {
    return (
      <>
        <Header />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Error loading property: {error}
          </Alert>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Container>
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Alert severity="warning">Property not found</Alert>
          <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
            Go Back
          </Button>
        </Container>
      </>
    );
  }

  // Dynamic tab indexes calculation
  const getTabIndexes = () => {
    const baseIndexes = {
      basic: 0,
      address: 1,
      dimensions: 2,
      features: !isPlot ? 3 : null,
      additionalInfo: !isPlot ? 4 : 3,
      owner: !isPlot ? 5 : 4,
      buyer: null,
      system: null,
      documents: null
    };

    let indexCounter = baseIndexes.additionalInfo + 1; // Start after additional info

    // Buyer tab
    if (property.buyer_user) {
      baseIndexes.buyer = indexCounter;
      indexCounter++;
    }

    // System tab
    baseIndexes.system = indexCounter;
    indexCounter++;

    // Documents tab
    baseIndexes.documents = indexCounter;

    return baseIndexes;
  };

  const tabIndexes = getTabIndexes();

  return (
    <>
      <Header />
      <Box sx={{ background: '#f8f9fa', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          {/* Debug info - remove in production */}
          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={() => setError(null)}
          >
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </Snackbar>

          <Box mb={4}>
            <Button 
              variant="outlined" 
              onClick={() => navigate(-1)} 
              startIcon={<ArrowBackIosNewIcon />} 
              sx={{ borderRadius: 3 }}
            >
              Back
            </Button>
          </Box>

          {/* Title & Price */}
          <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                <Typography variant="h4" fontWeight={700} color="primary">
                  {property.property_title || 'Property Details'}
                </Typography>
                <Chip
                  label={(property.status || 'available').toUpperCase()}
                  color={property.status === 'booked' ? 'secondary' : 'primary'}
                  sx={{ fontWeight: 600, fontSize: '1rem', py: 2.5, px: 2 }}
                />
              </Box>
              <Typography variant="h5" color="text.secondary" mt={2}>
                {formatCurrency(property.total_property_value || property.property_value)}
              </Typography>
            </CardContent>
          </Card>

          {/* Media Carousel - only show if property has media */}
          {(property.images?.length > 0 || property.videos?.length > 0) && (
            <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 4, overflow: 'hidden' }}>
              <Box sx={{ position: 'relative', height: { xs: 280, sm: 400, md: 500 } }}>
                {media.length > 0 ? (
                  <>
                    {media[currentIndex].type === "video" ? (
                      <video
                        src={media[currentIndex].url}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                        onClick={() => handleOpenMedia(currentIndex)}
                        controls
                      />
                    ) : (
                      <img
                        src={media[currentIndex].url}
                        alt="Property"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                        onClick={() => handleOpenMedia(currentIndex)}
                      />
                    )}

                    {media.length > 1 && (
                      <>
                        <IconButton 
                          onClick={handlePrev} 
                          sx={{ 
                            position: 'absolute', 
                            top: '50%', 
                            left: 16, 
                            transform: 'translateY(-50%)', 
                            bgcolor: 'rgba(0,0,0,0.6)', 
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                          }}
                        >
                          <ArrowBackIosNewIcon />
                        </IconButton>
                        <IconButton 
                          onClick={handleNext} 
                          sx={{ 
                            position: 'absolute', 
                            top: '50%', 
                            right: 16, 
                            transform: 'translateY(-50%)', 
                            bgcolor: 'rgba(0,0,0,0.6)', 
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                          }}
                        >
                          <ArrowForwardIosIcon />
                        </IconButton>
                        <Box sx={{ 
                          position: 'absolute', 
                          bottom: 16, 
                          right: 16, 
                          bgcolor: 'rgba(0,0,0,0.7)', 
                          color: 'white', 
                          px: 2, 
                          py: 1, 
                          borderRadius: 2 
                        }}>
                          {currentIndex + 1} / {media.length}
                        </Box>
                      </>
                    )}
                  </>
                ) : (
                  <Box sx={{ 
                    height: '100%', 
                    bgcolor: '#e9ecef', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Typography variant="h6" color="text.secondary">
                      No media available
                    </Typography>
                  </Box>
                )}
              </Box>
            </Card>
          )}

          {/* Fullscreen Media Dialog */}
          <Dialog open={openMedia} onClose={handleClose} maxWidth="lg" fullWidth>
            <Box sx={{ 
              position: 'relative', 
              bgcolor: 'black', 
              height: '90vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <IconButton 
                onClick={handleClose} 
                sx={{ 
                  position: 'absolute', 
                  top: 16, 
                  right: 16, 
                  color: 'white', 
                  zIndex: 10 
                }}
              >
                <CloseIcon fontSize="large" />
              </IconButton>
              {media.length > 1 && (
                <>
                  <IconButton 
                    onClick={handlePrev} 
                    sx={{ 
                      position: 'absolute', 
                      left: 32, 
                      color: 'white', 
                      zIndex: 10 
                    }}
                  >
                    <ArrowBackIosNewIcon fontSize="large" />
                  </IconButton>
                  <IconButton 
                    onClick={handleNext} 
                    sx={{ 
                      position: 'absolute', 
                      right: 32, 
                      color: 'white', 
                      zIndex: 10 
                    }}
                  >
                    <ArrowForwardIosIcon fontSize="large" />
                  </IconButton>
                </>
              )}
              {media[currentIndex]?.type === "video" ? (
                <video 
                  src={media[currentIndex].url} 
                  controls 
                  autoPlay 
                  style={{ maxHeight: '100%', maxWidth: '100%' }} 
                />
              ) : (
                <img 
                  src={media[currentIndex]?.url} 
                  alt="Full view" 
                  style={{ 
                    maxHeight: '100%', 
                    maxWidth: '100%', 
                    objectFit: 'contain' 
                  }} 
                />
              )}
            </Box>
          </Dialog>

          {/* Tabs */}
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider', 
                '& .MuiTab-root': { minHeight: 68, py: 2 } 
              }}
            >
              <Tab icon={<InfoIcon />} iconPosition="start" label="Basic Info" />
              <Tab icon={<LocationOnIcon />} iconPosition="start" label="Address" />
              <Tab icon={<SquareFootIcon />} iconPosition="start" label="Dimensions" />
              {!isPlot && <Tab icon={<HomeIcon />} iconPosition="start" label="Features" />}
              <Tab icon={<DetailsIcon />} iconPosition="start" label="Additional Info" />
              <Tab icon={<PersonIcon />} iconPosition="start" label="Owner Details" />
              {property.buyer_user && <Tab icon={<PersonIcon />} iconPosition="start" label="Buyer Details" />}
              <Tab icon={<SettingsIcon />} iconPosition="start" label="System Info" />
              <Tab icon={<UploadFileIcon />} iconPosition="start" label="Documents" />
            </Tabs>

            <Box id="tab-content" sx={{ maxHeight: '70vh', overflow: 'auto', p: 4 }}>
              {/* Basic Info */}
              <TabPanel value={tabValue} index={tabIndexes.basic}>
                <Typography variant="h5" fontWeight={600} color="primary.main" mb={3} display="flex" alignItems="center" gap={1}>
                  <InfoIcon /> Basic Information
                </Typography>
                <Grid container spacing={3}>
                  {[
                    ['Looking to', property.looking_to || 'N/A'],
                    ['Property Value', formatCurrency(property.total_property_value || property.property_value)],
                    ['Category', getCategoryName(property.category)],
                    ['Property Type', getPropertyTypeName(property.property_type)]
                  ].map(([label, value], i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Box p={2.5} bgcolor="grey.50" borderRadius={2}>
                        <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
                        <Typography variant="body1" fontWeight={500}>{value}</Typography>
                      </Box>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Box p={2.5} bgcolor="grey.50" borderRadius={2}>
                      <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {property.description || 'No description available'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Address */}
              <TabPanel value={tabValue} index={tabIndexes.address}>
                <Typography variant="h5" fontWeight={600} color="primary.main" mb={3} display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon /> Address
                </Typography>
                <Box p={4} bgcolor="grey.50" borderRadius={2}>
                  <Typography variant="h6" gutterBottom>
                    {property.address || 'N/A'}
                  </Typography>
                  <Typography variant="body1">
                    {[property.city, property.state, property.country].filter(Boolean).join(', ')}
                    {property.pin_code ? ` - ${property.pin_code}` : ''}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>Coordinates:</strong> {property.latitude || 'N/A'}, {property.longitude || 'N/A'}
                  </Typography>
                </Box>
              </TabPanel>

              {/* Dimensions */}
              <TabPanel value={tabValue} index={tabIndexes.dimensions}>
                <Typography variant="h5" fontWeight={600} color="primary.main" mb={3} display="flex" alignItems="center" gap={1}>
                  <SquareFootIcon /> Dimensions
                </Typography>
                <Grid container spacing={3}>
                  {[
                    ['Area', `${property.area || 'N/A'} ${property.area_unit || ''}`],
                    ['Built-up Area', `${property.builtup_area || 'N/A'} ${property.area_unit || ''}`],
                    ['Length', `${property.length_ft || 'N/A'} ft`],
                    ['Breadth', `${property.breadth_ft || 'N/A'} ft`]
                  ].map(([label, value], i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Box p={2.5} bgcolor="grey.50" borderRadius={2}>
                        <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
                        <Typography variant="h6" fontWeight={600}>{value}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Features - only for non-plot properties */}
              {!isPlot && (
                <TabPanel value={tabValue} index={tabIndexes.features}>
                  <Typography variant="h5" fontWeight={600} color="primary.main" mb={3} display="flex" alignItems="center" gap={1}>
                    <HomeIcon /> Features
                  </Typography>
                  <Grid container spacing={3}>
                    {[
                      ['Floors', property.number_of_floors],
                      ['Facing', property.facing],
                      ['Open Sides', property.number_of_open_sides],
                      ['Roads', property.number_of_roads],
                      ['Road Width 1', property.road_width_1_ft ? `${property.road_width_1_ft} ft` : 'N/A'],
                      ['Road Width 2', property.road_width_2_ft ? `${property.road_width_2_ft} ft` : 'N/A'],
                      ['Floor', property.floor || 'N/A'],
                      ['Furnishing', property.furnishing_status || 'N/A'],
                      ['Ownership', property.ownership_type || 'N/A'],
                      ['Bedrooms', property.number_of_bedrooms || 'N/A'],
                      ['Bathrooms', property.number_of_bathrooms || 'N/A'],
                      ['Balconies', property.number_of_balconies || 'N/A']
                    ].map(([label, value], i) => (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <Box p={2.5} bgcolor="grey.50" borderRadius={2}>
                          <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
                          <Typography variant="body1" fontWeight={500}>{value}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>
              )}

              {/* Additional Info */}
              <TabPanel value={tabValue} index={tabIndexes.additionalInfo}>
                <Typography variant="h5" fontWeight={600} color="primary.main" mb={3} display="flex" alignItems="center" gap={1}>
                  <DetailsIcon /> Additional Information
                </Typography>
                <Grid container spacing={3}>
                  {[
                    ['Property Uniqueness', property.property_uniqueness],
                    ['Location Advantages', property.location_advantages],
                    ['Other Features', property.other_features]
                  ].map(([label, value], i) => (
                    <Grid item xs={12} key={i}>
                      <Box p={2.5} bgcolor="grey.50" borderRadius={2}>
                        <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {value || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Owner Details */}
              <TabPanel value={tabValue} index={tabIndexes.owner}>
                <Typography variant="h5" fontWeight={600} color="primary.main" mb={3} display="flex" alignItems="center" gap={1}>
                  <PersonIcon /> Owner Details
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, width: '30%' }}>Name</TableCell>
                        <TableCell>{property.owner_name || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {property.owner_contact || 'N/A'}
                            {property.owner_contact && (
                              <IconButton 
                                size="small" 
                                onClick={() => navigator.clipboard.writeText(property.owner_contact)} 
                                sx={{ ml: 1 }}
                                title="Copy contact number"
                              >
                                <FileCopyIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {property.owner_email || 'N/A'}
                            {property.owner_email && (
                              <IconButton 
                                size="small" 
                                onClick={() => navigator.clipboard.writeText(property.owner_email)} 
                                sx={{ ml: 1 }}
                                title="Copy email"
                              >
                                <FileCopyIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

              {/* Buyer Details - only if buyer_user exists */}
              {property.buyer_user && (
                <TabPanel value={tabValue} index={tabIndexes.buyer}>
                  <Typography variant="h5" fontWeight={600} color="primary.main" mb={3} display="flex" alignItems="center" gap={1}>
                    <PersonIcon /> Buyer Details
                  </Typography>
                  <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                    <Table>
                      <TableBody>
                        {[
                          ['Username', property.buyer_user.username],
                          ['Referral ID', property.buyer_user.referral_id],
                          ['Contact', property.buyer_user.phone_number],
                          ['Email', property.buyer_user.email],
                          ['Booking Date', property.buyer_user.booking_date],
                          ['Purchase Date', property.buyer_user.purchase_date]
                        ].map(([label, value], i) => (
                          <TableRow key={i}>
                            <TableCell sx={{ fontWeight: 600, width: '30%' }}>{label}</TableCell>
                            <TableCell>{value || 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              )}

              {/* System Info */}
              <TabPanel value={tabValue} index={tabIndexes.system}>
                <Typography variant="h5" fontWeight={600} color="primary.main" mb={3} display="flex" alignItems="center" gap={1}>
                  <SettingsIcon /> System Information
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                  <Table>
                    <TableBody>
                      {[
                        ['Created At', property.created_at ? new Date(property.created_at).toLocaleString() : 'N/A'],
                        ['Updated At', property.updated_at ? new Date(property.updated_at).toLocaleString() : 'N/A'],
                        ['User ID', property.user_id || 'N/A']
                      ].map(([label, value], i) => (
                        <TableRow key={i}>
                          <TableCell sx={{ fontWeight: 600, width: '30%' }}>{label}</TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

              {/* Documents Tab */}
              <TabPanel value={tabValue} index={tabIndexes.documents}>
                <Typography variant="h5" fontWeight={600} color="primary.main" mb={3} display="flex" alignItems="center" gap={1}>
                  <UploadFileIcon /> Documents & Agreement
                </Typography>
                <Grid container spacing={3}>
                  {property.files?.length > 0 && (
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>Uploaded Documents</Typography>
                      {property.files.map((file, i) => {
                        const path = typeof file === 'string' ? file : file.file || '';
                        const filename = path.split('/').pop() || `Document ${i + 1}`;
                        const url = path.startsWith('http') ? path : `${baseurl}${path}`;
                        return (
                          <Button
                            key={i}
                            variant="outlined"
                            href={url}
                            target="_blank"
                            rel="noopener"
                            startIcon={<FileCopyIcon />}
                            sx={{ mr: 2, mb: 2, textTransform: 'none' }}
                          >
                            {filename}
                          </Button>
                        );
                      })}
                    </Grid>
                  )}

                  {property.agreement_video && (
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>Agreement Video</Typography>
                      <video 
                        src={`${baseurl}${property.agreement_video}`} 
                        controls 
                        style={{ width: '100%', maxWidth: 720, borderRadius: 8 }} 
                      />
                    </Grid>
                  )}

                  {property.agreement_file && (
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>Agreement Document</Typography>
                      <Button 
                        variant="outlined" 
                        href={`${baseurl}${property.agreement_file}`} 
                        target="_blank"
                        startIcon={<FileCopyIcon />}
                      >
                        Download Agreement PDF
                      </Button>
                    </Grid>
                  )}

                  {(!property.files || property.files.length === 0) && !property.agreement_video && !property.agreement_file && (
                    <Typography color="text.secondary">No documents available.</Typography>
                  )}
                </Grid>
              </TabPanel>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default AssetDetails;