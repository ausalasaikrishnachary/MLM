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

import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Grid, Box, Button, Divider, Chip, Card, CardContent,
  Dialog, IconButton
} from '@mui/material';
import Header from "./../../../Website/Shared/Navbar/Navbar";
import { baseurl } from '../../../BaseURL/BaseURL';

// icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

const AssetDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { property } = location.state || {};
  const { id } = useParams();

  const [openMedia, setOpenMedia] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Unique gradients for each section
const gradients = [
  "linear-gradient(135deg, #6a11cb, #f5e676ff)",   
  "linear-gradient(135deg, #ff0051ff, #f5e676ff)",   
  "linear-gradient(135deg, #f76329ff, #f5e676ff)",   
  "linear-gradient(135deg, #0f99b8ff, #f5e676ff)",   
  "linear-gradient(135deg, #0803a1ff, #f5e676ff)",   
     
];

  return (
    <>
      <Header />
      <Box sx={{ background: '#ffffffff', py: 4, minHeight: '100vh', width: '100%' }}>
        <Box sx={{ px: { xs: 2, sm: 4, md: 8 } }}>
          {/* Back button */}
          <Box mb={2}>
            <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
          </Box>

          {/* Title + Status */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Typography variant="h4" fontWeight={700} color="primary" align="center" gutterBottom>
              {property.property_title}
            </Typography>
            <Chip
              label={property.status.toUpperCase()}
              color={property.status === 'booked' ? 'secondary' : 'primary'}
              sx={{ fontWeight: 600 }}
            />
          </Box>

          {/* Single Card for all content */}
          <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
            <CardContent>

              {/* Media Preview with Arrows */}
              <Box display="flex" justifyContent="center" mb={3}>
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: "100%", sm: "80%", md: "70%" },
                    maxHeight: 300,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 2,
                  }}
                >
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

                  {/* Right Arrow */}
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
                </Box>
              </Box>

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
                    sx={{ position: "absolute", top: 10, right: 10, color: "white" }}
                  >
                    <CloseIcon />
                  </IconButton>

                  <IconButton
                    onClick={handlePrev}
                    sx={{ position: "absolute", left: 10, color: "white" }}
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
                    sx={{ position: "absolute", right: 10, color: "white" }}
                  >
                    <ArrowForwardIosIcon fontSize="large" />
                  </IconButton>
                </Box>
              </Dialog>

              {/* Video Info */}
              {property.videos.length > 0 && (
                <Typography align="center" variant="body2" mb={3}>
                  🎥 Videos available: {property.videos.length}
                </Typography>
              )}

              {/* Sections */}
              {[
                {
                  title: "📄 Basic Information", gradient: gradients[0], content: (
                    <Grid container spacing={2}>
                      {[
                        ['Looking to', property.looking_to],
                        ['Property Value', formatCurrency(property.total_property_value)],
                        ['Category', property.category],
                        ['Property Type', property.property_type],
                      ].map(([label, value], index) => (
                        <Grid item xs={6} key={index}>
                          <Typography><strong>{label}:</strong> {value}</Typography>
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Typography><strong>Description:</strong> {property.description}</Typography>
                      </Grid>
                    </Grid>
                  )
                },
                {
                  title: "📍 Address", gradient: gradients[1], content: (
                    <>
                      <Typography mb={2}>
                        {property.address}, {property.city}, {property.state}, {property.country} - {property.pin_code}
                      </Typography>
                      <Typography><strong>Coordinates:</strong> {property.latitude}, {property.longitude}</Typography>
                    </>
                  )
                },
                {
                  title: "📏 Dimensions", gradient: gradients[2], content: (
                    <Grid container spacing={2}>
                      {[
                        ['Plot Area', `${property.plot_area_sqft} sq.ft`],
                        ['Built-up Area', `${property.builtup_area_sqft} sq.ft`],
                        ['Length', `${property.length_ft} ft`],
                        ['Breadth', `${property.breadth_ft} ft`],
                      ].map(([label, value], index) => (
                        <Grid item xs={6} key={index}>
                          <Typography><strong>{label}:</strong> {value}</Typography>
                        </Grid>
                      ))}
                    </Grid>
                  )
                },
                {
                  title: "🏷️ Features", gradient: gradients[3], content: (
                    <Grid container spacing={2}>
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
                        <Grid item xs={6} key={index}>
                          <Typography><strong>{label}:</strong> {value}</Typography>
                        </Grid>
                      ))}
                    </Grid>
                  )
                },
                {
                  title: "ℹ️ Additional Information", gradient: gradients[4], content: (
                    <>
                      {[
                        ['Property Uniqueness', property.property_uniqueness],
                        ['Location Advantages', property.location_advantages],
                        ['Other Features', property.other_features],
                      ].map(([label, value], index) => (
                        <Typography key={index} sx={{ mb: 1 }}>
                          <strong>{label}:</strong> {value || 'N/A'}
                        </Typography>
                      ))}
                    </>
                  )
                },
              ].map((section, idx) => (
                <Box key={idx} mb={4}>
                  {/* Gradient Header */}
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                      background: section.gradient,
                      color: "white",
                      px: 2,
                      py: 1,
                      borderRadius: 1
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {section.content}
                </Box>
              ))}

              {/* Buyer Details */}
              {property.buyer_user && (
                <Box mb={4}>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                      background: "linear-gradient(90deg, #673ab7, #9575cd)",
                      color: "white",
                      px: 2,
                      py: 1,
                      borderRadius: 1
                    }}
                  >
                    👤 Buyer Details
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box>
                    <Typography><strong>Username:</strong> {property.buyer_user.username}</Typography>
                    <Typography><strong>Referral ID:</strong> {property.buyer_user.referral_id}</Typography>
                    <Typography><strong>Contact:</strong> {property.buyer_user.phone_number}</Typography>
                    <Typography><strong>Email:</strong> {property.buyer_user.email}</Typography>
                    <Typography><strong>Booking Date:</strong> {property.buyer_user.booking_date}</Typography>
                    <Typography><strong>Purchase Date:</strong> {property.buyer_user.purchase_date}</Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default AssetDetails;
