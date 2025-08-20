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
  Dialog, IconButton, Tabs, Tab, Container
} from '@mui/material';
import Header from '../../../Shared/Navbar/Navbar';
import { baseurl } from '../../../BaseURL/BaseURL';

// icons
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
  const location = useLocation();
  const { property } = location.state || {};
  const { id } = useParams();

  const [openMedia, setOpenMedia] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [isPlot, setIsPlot] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // fetch property types
    const fetchPropertyTypes = async () => {
      try {
        const res = await fetch("https://shrirajteam.com:81/property-types/");
        const data = await res.json();
        setPropertyTypes(data);

        if (property) {
          // find matched type
          const matchedType = data.find(
            (t) => t.property_type_id === property.property_type
          );
          if (matchedType?.name.toLowerCase() === "plot") {
            setIsPlot(true);
          }
        }
      } catch (err) {
        console.error("Error fetching property types:", err);
      }
    };

    fetchPropertyTypes();
  }, [property]);

  if (!property) {
    return <Typography>Loading property details...</Typography>;
  }

  // Merge images + videos into one list
  const media = [
    ...property.images.map((img) => ({ type: "image", url: `${baseurl}${img.image}` })),
    ...property.videos.map((vid) => ({ type: "video", url: `${baseurl}${vid.video}` }))
  ];

  const handleOpenMedia = (index) => {
    setCurrentIndex(index);
    setOpenMedia(true);
  };

  const handleClose = () => setOpenMedia(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Scroll to top of content area when tab changes
    const contentElement = document.getElementById('tab-content');
    if (contentElement) {
      contentElement.scrollTop = 0;
    }
  };

  // Unique gradients for each section
  const gradients = [
    "linear-gradient(135deg, #6a11cb, #2575fc)",
    "linear-gradient(135deg, #ff0051, #fe5196)",
    "linear-gradient(135deg, #f76329, #ff8a65)",
    "linear-gradient(135deg, #0f99b8, #4fc3f7)",
    "linear-gradient(135deg, #0803a1, #5c6bc0)",
    "linear-gradient(135deg, #cc7a07, #ffb74d)",
    "linear-gradient(135deg, #b786e5, #d1c4e9)",
    "linear-gradient(135deg, #f77062, #ff8a80)",
  ];

  return (
    <>
      <Header />
      <Box sx={{ background: '#f8f9fa', minHeight: '100vh', width: '100%', py: 3 }}>
        <Container maxWidth="lg">
          {/* Back button */}
          <Box mb={3}>
            <Button 
              variant="outlined" 
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIosNewIcon />}
              sx={{ borderRadius: 2 }}
            >
              Back
            </Button>
          </Box>

          {/* Title + Status */}
          <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
              >
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color="primary"
                  gutterBottom
                  sx={{ mb: 0 }}
                >
                  {property.property_title}
                </Typography>
                <Chip
                  label={property.status.toUpperCase()}
                  color={property.status === 'booked' ? 'secondary' : 'primary'}
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    py: 1
                  }}
                />
              </Box>
              
              {/* Price */}
              <Typography variant="h5" color="text.secondary" sx={{ mt: 1 }}>
                {formatCurrency(property.total_property_value)}
              </Typography>
            </CardContent>
          </Card>

          {/* Media Preview with Arrows */}
          <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 3, overflow: 'hidden' }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 250, sm: 350, md: 400 },
                overflow: "hidden",
              }}
            >
              {media.length > 0 ? (
                <>
                  {media[currentIndex]?.type === "video" ? (
                    <video
                      src={media[currentIndex].url}
                      style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
                      onClick={() => handleOpenMedia(currentIndex)}
                    />
                  ) : (
                    <img
                      src={media[currentIndex]?.url}
                      alt="Property Media"
                      style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
                      onClick={() => handleOpenMedia(currentIndex)}
                    />
                  )}

                  {/* Left Arrow */}
                  {media.length > 1 && (
                    <IconButton
                      onClick={handlePrev}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: 10,
                        transform: "translateY(-50%)",
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                      }}
                    >
                      <ArrowBackIosNewIcon />
                    </IconButton>
                  )}

                  {/* Right Arrow */}
                  {media.length > 1 && (
                    <IconButton
                      onClick={handleNext}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: 10,
                        transform: "translateY(-50%)",
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                      }}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  )}

                  {/* Media Counter */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "white",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 4,
                      fontSize: "0.8rem"
                    }}
                  >
                    {currentIndex + 1} / {media.length}
                  </Box>
                </>
              ) : (
                <Box 
                  sx={{ 
                    width: "100%", 
                    height: "100%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    backgroundColor: "#e9ecef"
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    No media available
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Video Info */}
            {property.videos.length > 0 && (
              <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'background.paper' }}>
                <Typography variant="body2" color="text.secondary">
                  🎥 {property.videos.length} video(s) available
                </Typography>
              </Box>
            )}
          </Card>

          {/* Full-size Media Dialog */}
          <Dialog open={openMedia} onClose={handleClose} maxWidth="lg" fullWidth>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "black",
                height: "80vh",
              }}
            >
              <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: 10, right: 10, color: "white", zIndex: 10 }}
              >
                <CloseIcon />
              </IconButton>

              <IconButton
                onClick={handlePrev}
                sx={{ position: "absolute", left: 10, color: "white", zIndex: 10 }}
              >
                <ArrowBackIosNewIcon fontSize="large" />
              </IconButton>

              {media[currentIndex]?.type === "video" ? (
                <video
                  src={media[currentIndex].url}
                  controls
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              ) : (
                <img
                  src={media[currentIndex]?.url}
                  alt="Property Media"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              )}

              <IconButton
                onClick={handleNext}
                sx={{ position: "absolute", right: 10, color: "white", zIndex: 10 }}
              >
                <ArrowForwardIosIcon fontSize="large" />
              </IconButton>
            </Box>
          </Dialog>

          {/* Tab Navigation */}
          <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  minHeight: 60,
                  py: 1.5,
                }
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
            </Tabs>

            {/* Tab Content */}
            <Box id="tab-content" sx={{ maxHeight: '60vh', overflow: 'auto', p: 3 }}>
              <TabPanel value={tabValue} index={0}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    background: gradients[0],
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    mb: 3
                  }}
                >
                  Basic Information
                </Typography>
                <Grid container spacing={3}>
                  {[
                    ['Looking to', property.looking_to],
                    ['Property Value', formatCurrency(property.total_property_value)],
                    ['Category', property.category],
                    ['Property Type', property.property_type],
                  ].map(([label, value], index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          {label}
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Description
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {property.description}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    background: gradients[1],
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    mb: 3
                  }}
                >
                  Address
                </Typography>
                <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {property.address}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {property.city}, {property.state}, {property.country} - {property.pin_code}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>Coordinates:</strong> {property.latitude}, {property.longitude}
                  </Typography>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    background: gradients[2],
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    mb: 3
                  }}
                >
                  Dimensions
                </Typography>
                <Grid container spacing={3}>
                  {[
                    ['Plot Area', `${property.plot_area_sqft} sq.ft`],
                    ['Length', `${property.length_ft} ft`],
                    ['Breadth', `${property.breadth_ft} ft`],
                  ].map(([label, value], index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, height: '100%' }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          {label}
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {!isPlot && (
                <TabPanel value={tabValue} index={3}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                      background: gradients[3],
                      color: "white",
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      mb: 3
                    }}
                  >
                    Features
                  </Typography>
                  <Grid container spacing={3}>
                    {[
                      ['Floors', property.number_of_floors],
                      ['Facing', property.facing],
                      ['Open Sides', property.number_of_open_sides],
                      ['Roads', property.number_of_roads],
                      ['Road Width 1', `${property.road_width_1_ft} ft`],
                      ['Road Width 2', `${property.road_width_2_ft} ft`],
                      ['Floor', property.floor || 'N/A'],
                      ['Furnishing Status', property.furnishing_status || 'N/A'],
                      ['Ownership', property.ownership_type],
                      ['Bedrooms', property.number_of_bedrooms || 'N/A'],
                      ['Bathrooms', property.number_of_bathrooms || 'N/A'],
                      ['Balconies', property.number_of_balconies || 'N/A'],
                    ].map(([label, value], index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, height: '100%' }}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            {label}
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>
              )}

              <TabPanel value={tabValue} index={isPlot ? 3 : 4}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    background: gradients[4],
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    mb: 3
                  }}
                >
                  Additional Information
                </Typography>
                <Grid container spacing={3}>
                  {[
                    ['Property Uniqueness', property.property_uniqueness],
                    ['Location Advantages', property.location_advantages],
                    ['Other Features', property.other_features],
                  ].map(([label, value], index) => (
                    <Grid item xs={12} key={index}>
                      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          {label}
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {value || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={isPlot ? 4 : 5}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    background: gradients[5],
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    mb: 3
                  }}
                >
                  Owner Details
                </Typography>
                <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Name
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {property.owner_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Contact
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {property.owner_contact}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {property.owner_email}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              {property.buyer_user && (
                <TabPanel value={tabValue} index={isPlot ? 5 : 6}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                      background: gradients[6],
                      color: "white",
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      mb: 3
                    }}
                  >
                    Buyer Details
                  </Typography>
                  <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Grid container spacing={2}>
                      {[
                        ['Username', property.buyer_user.username],
                        ['Referral ID', property.buyer_user.referral_id],
                        ['Contact', property.buyer_user.phone_number],
                        ['Email', property.buyer_user.email],
                        ['Booking Date', property.buyer_user.booking_date],
                        ['Purchase Date', property.buyer_user.purchase_date],
                      ].map(([label, value], index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Typography variant="subtitle2" color="text.secondary">
                            {label}
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {value}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </TabPanel>
              )}

              <TabPanel value={tabValue} index={property.buyer_user ? (isPlot ? 6 : 7) : (isPlot ? 5 : 6)}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    background: gradients[7],
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    mb: 3
                  }}
                >
                  System Information
                </Typography>
                <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    {[
                      ['Created At', new Date(property.created_at).toLocaleString()],
                      ['Updated At', new Date(property.updated_at).toLocaleString()],
                      ['User ID', property.user_id],
                    ].map(([label, value], index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Typography variant="subtitle2" color="text.secondary">
                          {label}
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {value}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </TabPanel>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default AssetDetails;