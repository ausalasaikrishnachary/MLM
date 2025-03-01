// import React from 'react';
// import {
//   Box,
//   Container,
//   Grid,
//   Paper,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
// } from '@mui/material';
// import { styled } from '@mui/system';
// import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
// import { useNavigate } from "react-router-dom";

// // You can also import Material UI icons if needed
// // import SettingsIcon from '@mui/icons-material/Settings';
// // import AddIcon from '@mui/icons-material/Add';

// const AssetDashboard = () => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/p-addasset');
//   };

//   return (
//     <>
//       <PartnerHeader />
//       <Container
//         sx={{
//           py: 4,
//           backgroundColor: '#F8FAFC',
//           minHeight: '100vh',
//           fontFamily:
//             "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//         }}
//         maxWidth="lg"
//       >
//         <Typography variant="h4" sx={{ marginLeft: '10px', textAlign: "center" }}>
//           Properties
//         </Typography>
//         {/* Profile Section */}
//         <Paper
//           elevation={1}
//           sx={{
//             backgroundColor: '#fff',
//             p: { xs: 2, sm: 3 },
//             borderRadius: '12px',
//             mb: 4,
//             boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               flexWrap: 'wrap',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Box
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   backgroundColor: '#E8F5E9',
//                   color: '#10B981',
//                   borderRadius: '10px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontWeight: 600,
//                   fontSize: '1.2rem',
//                 }}
//               >
//                 p
//               </Box>
//               <Box>
//                 <Typography variant="h6" sx={{ mb: 0 }}>
//                   Partner
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{ color: '#64748B', fontSize: '0.875rem', mb: 0 }}
//                 >
//                   Premium Partner
//                 </Typography>
//               </Box>
//             </Box>
//             <Button
//               variant="outlined"
//               sx={{
//                 border: '1px solid #E2E8F0',
//                 backgroundColor: 'transparent',
//                 padding: '0.5rem 1rem',
//                 borderRadius: '8px',
//                 color: '#64748B',
//                 transition: 'all 0.2s ease',
//                 '&:hover': {
//                   backgroundColor: '#0a549e',
//                   color: '#fff',
//                 },
//               }}
//             >
//               <Box component="span" sx={{ mr: 1 }}>
//                 <i className="fas fa-cog"></i>
//               </Box>
//               Settings
//             </Button>
//           </Box>
//         </Paper>

//         {/* Stats Grid */}
//         <Grid container spacing={2} sx={{ mb: 4 }}>
//           {[
//             { label: 'Total Assets', value: '12' },
//             { label: 'Total Value', value: '8.5cr' },
//             { label: 'Active Shares', value: '450' },
//           ].map((stat, index) => (
//             <Grid item xs={12} sm={4} key={index}>
//               <Paper
//                 sx={{
//                   backgroundColor: '#fff',
//                   border: '1px solid #E2E8F0',
//                   borderRadius: '12px',
//                   p: 2,
//                   transition: 'all 0.2s ease',
//                   boxShadow: '0 4px 6px rgb(0, 0, 0)',
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
//                     background: 'linear-gradient(135deg, #ffede6 0%, #d6bdbd 100%)',
//                   },
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     color: '#64748B',
//                     fontSize: '0.875rem',
//                     fontWeight: 500,
//                     '&:hover': { color: 'rgb(7, 7, 7)' },
//                   }}
//                 >
//                   {stat.label}
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: '1.5rem',
//                     fontWeight: 600,
//                     color: '#0f141d',
//                     mt: 0.5,
//                   }}
//                 >
//                   {stat.value}
//                 </Typography>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Assets Header */}
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mb: 3,
//             flexDirection: { xs: 'column', sm: 'row' },
//             gap: { xs: 2, sm: 0 },
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{ fontSize: '1.25rem', fontWeight: 600, m: 0 }}
//           >
//             My Assets
//           </Typography>
//           <Button
//             onClick={handleClick}
//             variant="contained"
//             sx={{
//               backgroundColor: '#10B981',
//               color: '#fff',
//               border: 'none',
//               padding: '0.625rem 1.25rem',
//               borderRadius: '8px',
//               fontWeight: 500,
//               transition: 'all 0.2s ease',
//               '&:hover': { backgroundColor: '#059669', transform: 'translateY(-1px)' },
//             }}
//           >
//             <Box component="span" sx={{ mr: 1 }}>
//               <i className="fas fa-plus"></i>
//             </Box>
//             Submit New Asset
//           </Button>
//         </Box>

//         {/* Assets Grid */}
//         <Grid container spacing={3}>
//           {/* Asset Card 1 */}
//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               sx={{
//                 position: 'relative',
//                 background: 'linear-gradient(135deg, #ffffff 0%, #2e1e1500 100%)',
//                 borderRadius: '12px',
//                 overflow: 'hidden',
//                 border: '1px solid #E2E8F0',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 4px 6px rgb(0, 0, 0)',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
//                 },
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 image="https://t4.ftcdn.net/jpg/01/69/69/21/360_F_169692156_L1aGrmJaHsZxF1sWQGuRKn3mR60bBqhN.jpg"
//                 alt="Luxury Apartment Complex"
//                 sx={{ height: 350, objectFit: 'cover' }}
//               />
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: 15,
//                   right: 15,
//                   px: 2,
//                   py: 1,
//                   borderRadius: '20px',
//                   fontSize: '0.85rem',
//                   fontWeight: 500,
//                   zIndex: 1,
//                   backgroundColor: '#2ECC71',
//                   color: '#fff',
//                 }}
//               >
//                 Approved
//               </Box>
//               <CardContent sx={{ p: 2 }}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontSize: '1.125rem',
//                     fontWeight: 600,
//                     mb: 1,
//                   }}
//                 >
//                   Luxury Apartment Complex
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: '#64748B',
//                     fontSize: '0.875rem',
//                     mb: 2,
//                   }}
//                 >
//                   Prime location in downtown area with 24/7 security
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     background:
//                       'linear-gradient(135deg, #d6bdbd 0%, #ffede6 100%)',
//                     p: 2,
//                     borderRadius: '8px',
//                     color: 'black',
//                     transition: 'all 0.3s ease',
//                     marginBottom:'5px',

//                     '&:hover': {
//                       background:
//                         'linear-gradient(135deg, #ffede6 0%, #d6bdbd 100%)',
//                       boxShadow: '0 12px 24px rgb(0,0,0)',
//                     },
//                   }}
//                 >
//                   <Box>
//                     <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
//                       Value
//                     </Typography>
//                     <Typography sx={{ fontWeight: 600 }}>
//                       ₹2,500,000/-
//                     </Typography>
//                   </Box>
//                   <Box sx={{ textAlign: 'right' }}>
//                     <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
//                       Shares
//                     </Typography>
//                     <Typography sx={{ fontWeight: 600 }}>100</Typography>
//                   </Box>
//                 </Box>

//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     background:
//                       'linear-gradient(135deg, #d6bdbd 0%, #ffede6 100%)',
//                     p: 2,
//                     borderRadius: '8px',
//                     color: 'black',
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       background:
//                         'linear-gradient(135deg, #ffede6 0%, #d6bdbd 100%)',
//                       boxShadow: '0 12px 24px rgb(0,0,0)',
//                     },
//                   }}
//                 >
//                   <Box>
//                     <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
//                       Referral ID                    </Typography>
//                     <Typography sx={{ fontWeight: 600 }}>
//                       RID0213001
//                     </Typography>
//                   </Box>
//                   <Box sx={{ textAlign: 'right' }}>
//                     <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
//                       Official contact                    </Typography>
//                     <Typography sx={{ fontWeight: 600 }}>9876543210</Typography>
//                   </Box>
//                   <Box></Box>
//                 </Box>


//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Asset Card 2 */}
//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               sx={{
//                 position: 'relative',
//                 background: 'linear-gradient(135deg, #ffffff 0%, #2e1e1500 100%)',
//                 borderRadius: '12px',
//                 overflow: 'hidden',
//                 border: '1px solid #E2E8F0',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 4px 6px rgb(0, 0, 0)',
//                 marginBottom:'5px',

//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
//                 },
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 image="https://www.schwarzproperties.net/wp-content/uploads/2023/06/SHCZ-3.png"
//                 alt="Commercial Office Space"
//                 sx={{ height: 350, objectFit: 'cover' }}
//               />
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: 15,
//                   right: 15,
//                   px: 2,
//                   py: 1,
//                   borderRadius: '20px',
//                   fontSize: '0.85rem',
//                   fontWeight: 500,
//                   zIndex: 1,
//                   backgroundColor: 'rgb(248, 0, 0)',
//                   color: '#fff',
//                 }}
//               >
//                 Pending
//               </Box>
//               <CardContent sx={{ p: 2 }}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontSize: '1.125rem',
//                     fontWeight: 600,
//                     mb: 1,
//                   }}
//                 >
//                   Commercial Office Space
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: '#64748B',
//                     fontSize: '0.875rem',
//                     mb: 2,
//                   }}
//                 >
//                   Modern office building in tech district
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     background:
//                       'linear-gradient(135deg, #d6bdbd 0%, #ffede6 100%)',
//                     p: 2,
//                     borderRadius: '8px',
//                     color: 'black',
//                     transition: 'all 0.3s ease',
//                     marginBottom:'5px',

//                     '&:hover': {
//                       background:
//                         'linear-gradient(135deg, #ffede6 0%, #d6bdbd 100%)',
//                       boxShadow: '0 12px 24px rgb(0,0,0)',
//                     },
//                   }}
//                 >
//                   <Box>
//                     <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
//                       Value
//                     </Typography>
//                     <Typography sx={{ fontWeight: 600 }}>
//                       ₹5,000,000/-
//                     </Typography>
//                   </Box>
//                   <Box sx={{ textAlign: 'right' }}>
//                     <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
//                       Shares
//                     </Typography>
//                     <Typography sx={{ fontWeight: 600 }}>200</Typography>
//                   </Box>
//                 </Box>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     background:
//                       'linear-gradient(135deg, #d6bdbd 0%, #ffede6 100%)',
//                     p: 2,
//                     borderRadius: '8px',
//                     color: 'black',
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       background:
//                         'linear-gradient(135deg, #ffede6 0%, #d6bdbd 100%)',
//                       boxShadow: '0 12px 24px rgb(0,0,0)',
//                     },
//                   }}
//                 >
//                   <Box>
//                     <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
//                       Referral ID                    </Typography>
//                     <Typography sx={{ fontWeight: 600 }}>
//                       RID0213002
//                     </Typography>
//                   </Box>
//                   <Box sx={{ textAlign: 'right' }}>
//                     <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
//                       Official contact                    </Typography>
//                     <Typography sx={{ fontWeight: 600 }}>9876543210</Typography>
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               sx={{
//                 position: 'relative',
//                 background: 'linear-gradient(135deg, #ffffff 0%, #2e1e1500 100%)',
//                 borderRadius: '12px',
//                 overflow: 'hidden',
//                 border: '1px solid #E2E8F0',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 4px 6px rgb(0, 0, 0)',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
//                 },
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 image="https://www.schwarzproperties.net/wp-content/uploads/2023/06/SHCZ-3.png"
//                 alt="Commercial Office Space"
//                 sx={{ height: 350, objectFit: 'cover' }}
//               />
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: 15,
//                   right: 15,
//                   px: 2,
//                   py: 1,
//                   borderRadius: '20px',
//                   fontSize: '0.85rem',
//                   fontWeight: 500,
//                   zIndex: 1,
//                   backgroundColor: 'rgb(248, 0, 0)',
//                   color: '#fff',
//                 }}
//               >
//                 Pending
//               </Box>
//               <CardContent sx={{ p: 2 }}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontSize: '1.125rem',
//                     fontWeight: 600,
//                     mb: 1,
//                   }}
//                 >
//                   Commercial Office Space
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: '#64748B',
//                     fontSize: '0.875rem',
//                     mb: 2,
//                   }}
//                 >
//                   Modern office building in tech district
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     background:
//                       'linear-gradient(135deg, #d6bdbd 0%, #ffede6 100%)',
//                     p: 2,
//                     borderRadius: '8px',
//                     color: 'black',
//                     transition: 'all 0.3s ease',
//                     marginBottom:'5px',

//                     '&:hover': {
//                       background:
//                         'linear-gradient(135deg, #ffede6 0%, #d6bdbd 100%)',
//                       boxShadow: '0 12px 24px rgb(0,0,0)',
//                     },
//                   }}
//                 >
//                   <Box>
//                     <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
//                       Value
//                     </Typography>
//                     <Typography sx={{ fontWeight: 600 }}>
//                       ₹5,000,000/-
//                     </Typography>
//                   </Box>
//                   <Box sx={{ textAlign: 'right' }}>
//                     <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
//                       Shares
//                     </Typography>
//                     <Typography sx={{ fontWeight: 600 }}>200</Typography>
//                   </Box>
//                 </Box>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     background:
//                       'linear-gradient(135deg, #d6bdbd 0%, #ffede6 100%)',
//                     p: 2,
//                     borderRadius: '8px',
//                     color: 'black',
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       background:
//                         'linear-gradient(135deg, #ffede6 0%, #d6bdbd 100%)',
//                       boxShadow: '0 12px 24px rgb(0,0,0)',
//                     },
//                   }}
//                 >
//                   <Box>
//                     <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
//                       Referral ID                    </Typography>
//                     <Typography sx={{ fontWeight: 600 }}>
//                       RID0213003
//                     </Typography>
//                   </Box>
//                   <Box sx={{ textAlign: 'right' }}>
//                     <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
//                       Official contact                    </Typography>
//                     <Typography sx={{ fontWeight: 600 }}>9876543210</Typography>
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
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
import { useNavigate } from "react-router-dom";
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';

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
    referralid :"RID0123001",
    officialcontact:"9876543210",
    fundingProgress: 75,
    noofrooms: "100",
    bedrooms:"50",
    price:"₹25000",

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
    referralid :"RID0123002",
    officialcontact:"9876543210",
    fundingProgress: 40,
    noofrooms: "150",
    bedrooms:"40",
    price:"₹20000"
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
    referralid :"RID0123003",
    officialcontact:"9848032919",
    fundingProgress: 90,
    noofrooms: "200",
    bedrooms:"30",
    price:"₹30000"

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
    navigate('/p-addasset');
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
      <PartnerHeader />
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