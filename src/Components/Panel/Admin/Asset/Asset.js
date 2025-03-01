// import React, { useState } from 'react';
// import {
//   Container,
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   TextField,
//   InputAdornment,
//   FormControl,
//   Select,
//   MenuItem,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Chip
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import AddIcon from '@mui/icons-material/Add';
// import Header from '../../../Shared/Navbar/Navbar';
// import { useNavigate } from "react-router-dom";


// const assets = [
//   {
//     title: "Luxury Beachfront Villa",
//     image:
//       "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/25111806/Untitled-design-95.jpg?tr=w-1200,h-900",
//     status: "Approved",
//     statusType: "approved",
//     description:
//       "Beautiful villa with direct beach access and stunning ocean view",
//     assetValue: "₹25000000/-",
//     location: "Mumbai Beach",
//     shares: "10000"
//   },
//   {
//     title: "Downtown Commercial Space",
//     image:
//       "https://wandaeilers.com/wp-content/uploads/2024/10/a-stunning-and-modern-office-space-with-floor-to-c-CZP1bc-ZTwq8TSOW9-PY8A-1X1RmV8MQuyZ2dDR2yAruQ.jpeg",
//     status: "Pending",
//     statusType: "pending",
//     description:
//       "Prime retail location in the heart of business  business district",
//     assetValue: "₹1.2cr",
//     location: "Chicago, IL",
//     shares: "75"
//   },
//   {
//     title: "Luxury Villa",
//     image:
//       "https://t3.ftcdn.net/jpg/02/33/59/42/360_F_233594258_81s2Un5DEpmiHYxuOPAUfnrD0T9we5fd.jpg",
//     status: "Approved",
//     statusType: "approved",
//     description:
//       "Beautiful villa with direct beach access and stunning ocean view",
//     assetValue: "₹1.2cr",
//     location: "Goa",
//     shares: "100"
//   }
// ];

// const AssetDashboard = () => {
//   const navigate = useNavigate();
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedAsset, setSelectedAsset] = useState(null);

//   const handleOpenDialog = (asset) => {
//     setSelectedAsset(asset);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedAsset(null);
//   };


//   const handleClick = () => {
//     navigate('/a-addasset');
//   };


//   return (
//     <>
//     <Header/>
//     <Container sx={{ py: 4 }}>
//       {/* Header Section */}
//       <Box
//         sx={{
//           backgroundColor: 'white',
//           p: 2.5,
//           borderRadius: 2,
//           boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//           mb: 4
//         }}
//       >
//         <Grid container spacing={2} alignItems="center">
//           {/* Search Input */}
//           <Grid item xs={12} md={6} lg={7}>
//             <TextField
//               placeholder="Search assets..."
//               fullWidth
//               variant="outlined"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon sx={{ color: '#757575' }} />
//                   </InputAdornment>
//                 ),
//                 sx: {
//                   padding: '12px 20px 12px 45px',
//                   borderRadius: '8px',
//                   fontSize: '15px'
//                 }
//               }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   '& fieldset': {
//                     borderColor: '#E0E0E0'
//                   },
//                   '&:hover fieldset': {
//                     borderColor: '#4A90E2'
//                   },
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#4A90E2'
//                   }
//                 }
//               }}
//             />
//           </Grid>

//           {/* Filter Select */}
//           <Grid item xs={12} md={3} lg={3}>
//             <FormControl fullWidth>
//               <Select
//                 defaultValue="latest"
//                 sx={{
//                   padding: '12px 20px',
//                   borderRadius: '8px',
//                   fontSize: '15px',
//                   backgroundColor: 'white',
//                   border: '1px solid #E0E0E0'
//                 }}
//               >
//                 <MenuItem value="latest">Latest</MenuItem>
//                 <MenuItem value="oldest">Oldest</MenuItem>
//                 <MenuItem value="price-high">Price: High to Low</MenuItem>
//                 <MenuItem value="price-low">Price: Low to High</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Add Asset Button */}
//           <Grid item xs={12} md={3} lg={2}>
//             <Button
//             onClick={handleClick}
//               variant="contained"
//               fullWidth
//               startIcon={<AddIcon />}
//               sx={{
//                 padding: '12px 24px',
//                 borderRadius: '8px',
//                 backgroundColor: '#2ECC71',
//                 textTransform: 'none',
//                 fontWeight: 500,
//                 '&:hover': {
//                   backgroundColor: '#27AE60',
//                   transform: 'translateY(-1px)'
//                 }
//               }}
//             >
//               Add Asset
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Asset Cards */}
//       <Grid container spacing={2}>
//         {assets.map((asset, index) => (
//           <Grid item xs={12} md={6} lg={4} key={index}>
//             <Card
//               sx={{
//                 borderRadius: 2,
//                 boxShadow: '0 4px 15px rgba(0, 0, 0, 0.749)',
//                 transition: 'all 0.3s ease',
//                 position: 'relative',
//                 backgroundColor: 'white',
//                 overflow: 'visible',
//                 '&:hover': {
//                   transform: 'translateY(-5px)',
//                   boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
//                 }
//               }}
//             >
//               <Box sx={{ position: 'relative' }}>
//                 <CardMedia
//                   component="img"
//                   image={asset.image}
//                   alt={asset.title}
//                   sx={{
//                     height: { xs: 180, md: 220 },
//                     objectFit: 'cover',
//                     borderRadius: '12px 12px 0 0'
//                   }}
//                 />
//                 <Chip
//                   label={asset.status}
//                   sx={{
//                     position: 'absolute',
//                     top: 15,
//                     right: 15,
//                     padding: '8px 16px',
//                     borderRadius: '20px',
//                     fontSize: '0.85rem',
//                     fontWeight: 500,
//                     backgroundColor:
//                       asset.statusType === 'approved' ? '#2ECC71' : '#E74C3C',
//                     color: 'white'
//                   }}
//                 />
//               </Box>
//               <CardContent>
//                 <Typography variant="h6" fontWeight="bold" mb={1}>
//                   {asset.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" mb={2}>
//                   {asset.description}
//                 </Typography>

//                 <Box
//                   sx={{
//                     backgroundColor: '#F8F9FA',
//                     borderRadius: 1,
//                     p: 1.5,
//                     mb: 2
//                   }}
//                 >
//                   <Grid container>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" color="text.secondary">
//                         Asset Value
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography
//                         variant="body2"
//                         fontWeight="bold"
//                         color="#4A90E2"
//                         align="right"
//                       >
//                         {asset.assetValue}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" color="text.secondary">
//                         Location
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography
//                         variant="body2"
//                         fontWeight="bold"
//                         color="text.secondary"
//                         align="right"
//                       >
//                         {asset.location}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Box>

//                 <Grid container alignItems="center" justifyContent="space-between">
//                   <Grid item>
//                     <Box>
//                       <Typography variant="body2" color="text.secondary">
//                         Available Shares
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         fontWeight="bold"
//                         color="#2ECC71"
//                       >
//                         {asset.shares}
//                       </Typography>
//                     </Box>
//                   </Grid>
//                   <Grid item>
//                   <Button
//                         variant="contained"
//                         sx={{
//                           padding: '8px 20px',
//                           borderRadius: '6px',
//                           backgroundColor: '#4A90E2',
//                           textTransform: 'none',
//                           '&:hover': {
//                             backgroundColor: '#357ABD',
//                             transform: 'translateY(-1px)'
//                           }
//                         }}
//                         onClick={() => handleOpenDialog(asset)}
//                       >
//                         View Details
//                       </Button>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>



//         {/* Dialog for Asset Details */}
//         <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
//           {selectedAsset && (
//             <>
//               <DialogTitle>{selectedAsset.title}</DialogTitle>
//               <DialogContent dividers>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={6}>
//                     <CardMedia
//                       component="img"
//                       image={selectedAsset.image}
//                       alt={selectedAsset.title}
//                       sx={{ borderRadius: 2, maxHeight: 300, objectFit: 'cover' }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <Typography variant="body1" gutterBottom>
//                       {selectedAsset.description}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                       Asset Value: <strong>{selectedAsset.assetValue}</strong>
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                       Location: <strong>{selectedAsset.location}</strong>
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                       Available Shares: <strong>{selectedAsset.shares}</strong>
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                       Status: <strong>{selectedAsset.status}</strong>
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleCloseDialog} color="primary">
//                   Close
//                 </Button>
//               </DialogActions>
//             </>
//           )}
//         </Dialog>
//     </Container>
//     </>
//   );
// };

// export default AssetDashboard;






import React, { useState } from 'react';
import {
  Container,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../../Shared/Navbar/Navbar';
import { useNavigate } from "react-router-dom";

const assets = [
  {
    title: "Luxury Beachfront Villa",
    image:
      "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/25111806/Untitled-design-95.jpg?tr=w-1200,h-900",
    status: "Approved",
    statusType: "approved",
    description:
      "Beautiful villa with direct beach access and stunning ocean view",
    assetValue: "₹25000000/-",
    location: "Mumbai Beach",
    shares: "10000",
    referralid: "RID0123001",
    officialcontact: "9876543210",
    fundingProgress: 75,
    noofrooms: "100",
    bedrooms: "50",
    price: "₹25000",  // Added funding progress as a percentage
  },
  {
    title: "Downtown Commercial Space",
    image:
      "https://wandaeilers.com/wp-content/uploads/2024/10/a-stunning-and-modern-office-space-with-floor-to-c-CZP1bc-ZTwq8TSOW9-PY8A-1X1RmV8MQuyZ2dDR2yAruQ.jpeg",
    status: "Pending",
    statusType: "pending",
    description:
      "Prime retail location in the heart of business district",
    assetValue: "₹1.2cr",
    location: "Chicago, IL",
    shares: "75",
    referralid: "RID0123002",
    officialcontact: "9876543210",
    fundingProgress: 40,
    noofrooms: "150",
    bedrooms: "40",
    price: "₹20000"
  },
  {
    title: "Luxury Villa",
    image:
      "https://t3.ftcdn.net/jpg/02/33/59/42/360_F_233594258_81s2Un5DEpmiHYxuOPAUfnrD0T9we5fd.jpg",
    status: "Approved",
    statusType: "approved",
    description:
      "Beautiful villa with direct beach access and stunning ocean view",
    assetValue: "₹1.2cr",
    location: "Goa",
    shares: "100",
    referralid: "RID0123003",
    officialcontact: "9848032919",
    fundingProgress: 90,
    noofrooms: "200",
    bedrooms: "30",
    price: "₹30000"
  }
];

const AssetDashboard = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleOpenDialog = (asset) => {
    setSelectedAsset(asset);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAsset(null);
  };

  const handleClick = () => {
    navigate('/a-addasset');
  };

  const summaryCardsData = [
    {
      title: "Total Assets",
      value: "12",
      // subtext: "Last 7 Days",
    },
    {
      title: "Total Value",
      value: "8.5cr",
      // subtext: "+2.3% from last week",
    },
    {
      title: "Active Units",
      value: "450",
      // subtext: "+12% increase",
    },
  ];

  return (
    <>
      <Header />
      <Container sx={{ py: 4 }}>
        {/* Header Section */}
        <Box
          sx={{
            backgroundColor: 'white',
            p: 2.5,
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            mb: 4
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Search Input */}
            <Grid item xs={12} md={6} lg={7}>
              <TextField
                placeholder="Search assets..."
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#757575' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '8px',
                    fontSize: '15px'
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#E0E0E0'
                    },
                    '&:hover fieldset': {
                      borderColor: '#4A90E2'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4A90E2'
                    }
                  }
                }}
              />
            </Grid>

            {/* Filter Select */}
            <Grid item xs={12} md={3} lg={3}>
              <FormControl fullWidth>
                <Select
                  defaultValue="latest"
                  sx={{
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: 'white',
                    border: '1px solid #E0E0E0'
                  }}
                >
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                </Select>
              </FormControl>
            </Grid>



            {/* Add Asset Button */}
            <Grid item xs={12} md={3} lg={2}>
              <Button
                onClick={handleClick}
                variant="contained"
                fullWidth
                startIcon={<AddIcon />}
                sx={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  backgroundColor: '#2ECC71',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: '#27AE60',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                Add Asset
              </Button>
            </Grid>
          </Grid>
        </Box>
        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {summaryCardsData.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "#f8f9fa",
                  textAlign: "center",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="h4" sx={{ color: "rgb(30,10,80)" }}>
                    {card.value}
                  </Typography>
                  <Typography variant="body2">{card.subtext}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Asset Cards */}
        <Grid container spacing={2}>
          {assets.map((asset, index) => (
            <Grid item xs={12} md={6} lg={4} key={index} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.749)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  backgroundColor: 'white',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={asset.image}
                    alt={asset.title}
                    sx={{
                      height: { xs: 180, md: 220 },
                      objectFit: 'cover',
                      borderRadius: '12px 12px 0 0'
                    }}
                  />
                  <Chip
                    label={asset.status}
                    sx={{
                      position: 'absolute',
                      top: 15,
                      right: 15,
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      backgroundColor:
                        asset.statusType === 'approved' ? '#2ECC71' : '#E74C3C',
                      color: 'white'
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {asset.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {asset.description}
                  </Typography>

                  <Box
                    sx={{
                      backgroundColor: '#F8F9FA',
                      borderRadius: 1,
                      p: 1.5,
                      mb: 2
                    }}
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Asset Value
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="#4A90E2"
                          align="right"
                        >
                          {asset.assetValue}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Location
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="text.secondary"
                          align="right"
                        >
                          {asset.location}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: '#F8F9FA',
                      borderRadius: 1,
                      p: 1.5,
                      mb: 2
                    }}
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Referral Id                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="#4A90E2"
                          align="right"
                        >
                          {asset.referralid}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Official Contact                         </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="text.secondary"
                          align="right"
                        >
                          {asset.officialcontact}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>

                {/* Funding Loading Status */}
                {asset.fundingProgress !== undefined && (
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Funding Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={asset.fundingProgress}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                      {asset.fundingProgress}% funded
                    </Typography>
                  </Box>
                )}

                <Box sx={{ p: 2 }}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Available Shares
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="#2ECC71"
                        >
                          {asset.shares}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{
                          padding: '8px 20px',
                          borderRadius: '6px',
                          backgroundColor: '#4A90E2',
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: '#357ABD',
                            transform: 'translateY(-1px)'
                          }
                        }}
                        onClick={() => handleOpenDialog(asset)}
                      >
                        View Details
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Dialog for Asset Details */}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
          {selectedAsset && (
            <>
              <DialogTitle>{selectedAsset.title}</DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <CardMedia
                      component="img"
                      image={selectedAsset.image}
                      alt={selectedAsset.title}
                      sx={{ borderRadius: 2, maxHeight: 300, objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                      {selectedAsset.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Asset Value: <strong>{selectedAsset.assetValue}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Location: <strong>{selectedAsset.location}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Available Shares: <strong>{selectedAsset.shares}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Status: <strong>{selectedAsset.status}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      No of Rooms: <strong>{selectedAsset.noofrooms}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Bed Rooms: <strong>{selectedAsset.bedrooms}</strong>
                    </Typography> <Typography variant="body2" color="text.secondary" gutterBottom>
                      Price: <strong>{selectedAsset.price}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </>
  );
};

export default AssetDashboard;
