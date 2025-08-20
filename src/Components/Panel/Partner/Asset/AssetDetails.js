// import React from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import {
//   Container, Typography, Grid, Box, Button, Divider, Chip
// } from '@mui/material';
// import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
// import { baseurl } from '../../../BaseURL/BaseURL';
// import { useNavigate } from "react-router-dom";

// const AssetDetail = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { property } = location.state || {};
//   const { id } = useParams();

//   if (!property) {
//     return <Typography>Loading property details...</Typography>;
//   }

//   // Format currency
//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(value);
//   };

//   return (
//     <>
//       <PartnerHeader />
//       <Container sx={{ py: 4 }}>
//         <Box mt={1}>
//           <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
//         </Box>
//         <Box display="flex" alignItems="center" gap={2} mb={3}>
//           <Typography variant="h4">{property.property_title}</Typography>
//           <Chip
//             label={property.status.toUpperCase()}
//             color={property.status === 'booked' ? 'secondary' : 'primary'}
//           />
//         </Box>

//         <Grid container spacing={3}>
//           {/* Property Image */}
//           <Grid item xs={12} md={6}>
//             <Box
//               component="img"
//               src={property.images.length > 0 ? `${baseurl}${property.images[0].image}` : 'https://via.placeholder.com/300'}
//               alt={property.property_title}
//               sx={{
//                 width: '100%',
//                 borderRadius: 2,
//                 mb: 2
//               }}
//             />
//             {property.videos.length > 0 && (
//               <Typography variant="body2" mb={2}>Videos available: {property.videos.length}</Typography>
//             )}

//             <Typography variant="h6" gutterBottom>Features</Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Typography><strong>Floors:</strong> {property.number_of_floors}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Facing:</strong> {property.facing}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Open Sides:</strong> {property.number_of_open_sides}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Roads:</strong> {property.number_of_roads}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Road Width 1:</strong> {property.road_width_1_ft} ft</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Road Width 2:</strong> {property.road_width_2_ft} ft</Typography>
//               </Grid>
//               <Grid item xs={6}><Typography><strong>Floor:</strong> {property.floor || 'N/A'}</Typography></Grid>
//               <Grid item xs={6}><Typography><strong>Furnishing Status:</strong> {property.furnishing_status || 'N/A'}</Typography></Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Ownership:</strong> {property.ownership_type}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Bedrooms:</strong> {property.number_of_bedrooms || 'N/A'}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Bathrooms:</strong> {property.number_of_bathrooms || 'N/A'}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Balconies:</strong> {property.number_of_balconies || 'N/A'}</Typography>
//               </Grid>
//             </Grid>

//             <Typography variant="h6" mt={3} gutterBottom>Additional Information</Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Typography><strong>Property Uniqueness:</strong> {property.property_uniqueness || 'N/A'}</Typography>
//             <Typography><strong>Location Advantages:</strong> {property.location_advantages || 'N/A'}</Typography>
//             <Typography><strong>Other Features:</strong> {property.other_features || 'N/A'}</Typography>
//           </Grid>

//           {/* Property Details */}
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" gutterBottom>Basic Information</Typography>
//             <Divider sx={{ mb: 2 }} />

//             <Grid container spacing={2} mb={3}>
//               <Grid item xs={6}>
//                 <Typography><strong>Looking to:</strong> {property.looking_to}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Property Value:</strong> {formatCurrency(property.property_value)}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Category:</strong> {property.category}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Property Type:</strong> {property.property_type}</Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography><strong>Description:</strong> {property.description}</Typography>
//               </Grid>
//             </Grid>

//             <Typography variant="h6" gutterBottom>Address</Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Typography mb={3}>
//               {property.address}, {property.city}, {property.state}, {property.country} - {property.pin_code}
//             </Typography>
//             <Typography><strong>Coordinates:</strong> {property.latitude}, {property.longitude}</Typography>

//             <Typography variant="h6" mt={3} gutterBottom>Dimensions</Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2} mb={3}>
//               <Grid item xs={6}>
//                 <Typography><strong>Plot Area:</strong> {property.plot_area_sqft} sq.ft</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Built-up Area:</strong> {property.builtup_area_sqft} sq.ft</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Length:</strong> {property.length_ft} ft</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Breadth:</strong> {property.breadth_ft} ft</Typography>
//               </Grid>
//             </Grid>

//             {/* <Typography variant="h6" gutterBottom>Owner Details</Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Typography mb={3}>
//               <strong>Name:</strong> {property.owner_name}<br />
//               <strong>Contact:</strong> {property.owner_contact}<br />
//               <strong>Email:</strong> {property.owner_email}
//             </Typography> */}
//             <Typography variant="h6" gutterBottom>Buyer Details</Typography>
//             <Divider sx={{ mb: 2 }} />
//             {property.buyer_user ? (
//               <Typography mb={3}>
//                 <strong>Username:</strong> {property.buyer_user.username}<br />
//                 <strong>Referral ID:</strong> {property.buyer_user.referral_id}<br />
//                 <strong>Contact:</strong> {property.buyer_user.phone_number}<br />
//                 <strong>Email:</strong> {property.buyer_user.email}<br />
//                 <strong>Booking Date:</strong> {property.buyer_user.booking_date}<br />
//                 <strong>Purchase Date:</strong> {property.buyer_user.purchase_date}
//               </Typography>
//             ) : (
//               <Typography mb={3}>No buyer information available</Typography>
//             )}

//             <Typography variant="h6" gutterBottom>System Information</Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Typography variant="body2">
//               <strong>Created At:</strong> {new Date(property.created_at).toLocaleString()}<br />
//               <strong>Updated At:</strong> {new Date(property.updated_at).toLocaleString()}<br />
//               <strong>User ID:</strong> {property.user_id}
//             </Typography>
//           </Grid>
//         </Grid>


//       </Container>
//     </>
//   );
// };

// export default AssetDetail;


import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Grid, Box, Button, Divider, Chip, Card, CardContent,
  Tabs, Tab, Container, IconButton, Table, TableBody, TableCell, TableContainer, 
  TableRow, Paper
} from '@mui/material';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import { baseurl } from '../../../BaseURL/BaseURL';

// Icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FileCopyIcon from '@mui/icons-material/FileCopy';
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

const AssetDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { property } = location.state || {};
  const { id } = useParams();

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [isPlot, setIsPlot] = useState(false);
  const [propertyTypeName, setPropertyTypeName] = useState("");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const res = await fetch("https://shrirajteam.com:81/property-types/");
        const data = await res.json();
        setPropertyTypes(data);

        if (property) {
          const matchedType = data.find(
            (t) => t.property_type_id === property.property_type
          );
          if (matchedType) {
            setPropertyTypeName(matchedType.name);
            if (matchedType.name.toLowerCase() === "plot") {
              setIsPlot(true);
            }
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

  return (
    <>
      <PartnerHeader />
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
                {formatCurrency(property.property_value)}
              </Typography>
            </CardContent>
          </Card>

          {/* Property Image */}
          <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 3, overflow: 'hidden' }}>
            <Box
              sx={{
                width: "100%",
                height: { xs: 250, sm: 350, md: 400 },
                overflow: "hidden",
              }}
            >
              {property.images.length > 0 ? (
                <img
                  src={`${baseurl}${property.images[0].image}`}
                  alt={property.property_title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
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
                    No image available
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
                    color: "primary.main",
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <InfoIcon /> Basic Information
                </Typography>
                <Grid container spacing={3}>
                  {[
                    ['Looking to', property.looking_to],
                    ['Property Value', formatCurrency(property.property_value)],
                    ['Category', property.category],
                    ['Property Type', propertyTypeName],
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
                    color: "primary.main",
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <LocationOnIcon /> Address
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
                    color: "primary.main",
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <SquareFootIcon /> Dimensions
                </Typography>
                <Grid container spacing={3}>
                  {[
                    ['Plot Area', `${property.plot_area_sqft} sq.ft`],
                    ['Built-up Area', `${property.builtup_area_sqft} sq.ft`],
                    ['Length', `${property.length_ft} ft`],
                    ['Breadth', `${property.breadth_ft} ft`],
                  ].map(([label, value], index) => (
                    <Grid item xs={12} sm={6} key={index}>
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
                      color: "primary.main",
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <HomeIcon /> Features
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
                    color: "primary.main",
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <DetailsIcon /> Additional Information
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
                    color: "primary.main",
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <PersonIcon /> Owner Details
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600, width: '30%' }}>
                          Name
                        </TableCell>
                        <TableCell>{property.owner_name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          Contact
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {property.owner_contact}
                            <IconButton
                              size="small"
                              onClick={() => {
                                navigator.clipboard.writeText(property.owner_contact);
                              }}
                              sx={{ ml: 1 }}
                              title="Copy contact number"
                            >
                              <FileCopyIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          Email
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {property.owner_email}
                            <IconButton
                              size="small"
                              onClick={() => {
                                navigator.clipboard.writeText(property.owner_email);
                              }}
                              sx={{ ml: 1 }}
                              title="Copy email"
                            >
                              <FileCopyIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

              {property.buyer_user && (
                <TabPanel value={tabValue} index={isPlot ? 5 : 6}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                      color: "primary.main",
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
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
                          ['Purchase Date', property.buyer_user.purchase_date],
                        ].map(([label, value], index) => (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 600, width: '30%' }}>
                              {label}
                            </TableCell>
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              )}

              <TabPanel value={tabValue} index={property.buyer_user ? (isPlot ? 6 : 7) : (isPlot ? 5 : 6)}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    color: "primary.main",
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <SettingsIcon /> System Information
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                  <Table>
                    <TableBody>
                      {[
                        ['Created At', new Date(property.created_at).toLocaleString()],
                        ['Updated At', new Date(property.updated_at).toLocaleString()],
                        ['User ID', property.user_id],
                      ].map(([label, value], index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 600, width: '30%' }}>
                            {label}
                          </TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default AssetDetail;

