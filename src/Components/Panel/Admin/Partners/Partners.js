// import React, { useState } from 'react';
// import {
//   Box,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Paper,
//   Typography,
//   Badge,
//   Avatar,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   LinearProgress,
//   Button,
// } from '@mui/material';
// import { styled } from '@mui/system';

// // Material UI Icons
// import HandshakeIcon from '@mui/icons-material/Handshake';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import ShowChartIcon from '@mui/icons-material/ShowChart';
// import StarIcon from '@mui/icons-material/Star';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import AccountTreeIcon from '@mui/icons-material/AccountTree';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import PersonIcon from '@mui/icons-material/Person';
// import CloseIcon from '@mui/icons-material/Close';
// import Header from '../../../Shared/Navbar/Navbar';

// // Custom colors (matching your CSS variables)
// const colors = {
//   primary: '#4a90e2',
//   secondary: '#f8f9fa',
//   accent: '#ff6b6b',
//   textPrimary: '#2c3e50',
//   textSecondary: '#6c757d',
//   active: '#2ecc71',
//   pending: '#f1c40f',
// };

// // Styled Paper for partner items with hover effect
// const PartnerItem = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(2),
//   borderRadius: theme.spacing(1.5),
//   backgroundColor: colors.secondary,
//   cursor: 'pointer',
//   transition: 'all 0.3s ease',
//   borderLeft: '4px solid transparent',
//   '&:hover': {
//     backgroundColor: '#ffffff',
//     borderLeft: `4px solid ${colors.primary}`,
//     transform: 'translateX(5px)',
//   },
// }));

// const PartnersDashboard = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedPartner, setSelectedPartner] = useState({
//     name: '',
//     role: '',
//     projects: 0,
//     rating: 0,
//   });

//   const showPartnerDetails = (name, role) => {
//     // In a real app, these values might be fetched dynamically
//     setSelectedPartner({ name, role, projects: 12, rating: 4.8 });
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => setModalOpen(false);

//   return (
//     <>
//     <Header/>
//     <Box
//       sx={{
//         minHeight: '100vh',
//         p: 2,
//         background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)',
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* Dashboard Header */}
//         <Paper
//           sx={{
//             p: 3,
//             mb: 3,
//             borderRadius: 2,
//             boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//             <HandshakeIcon sx={{ mr: 1, color: colors.primary }} />
//             <Typography variant="h5">
//               Partners <span style={{ color: colors.primary }}>Dashboard</span>
//             </Typography>
//           </Box>
//           <Typography variant="body2" color="textSecondary">
//             Manage partner applications, track performance, and handle permissions efficiently.
//           </Typography>
//         </Paper>

//         <Grid container spacing={3}>
//           {/* Pending Reviews */}
//           <Grid item xs={12} md={4}>
//             <Card
//               sx={{
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 transition: 'transform 0.3s',
//                 '&:hover': { transform: 'translateY(-5px)' },
//               }}
//             >
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                   <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary }}>
//                     Pending Reviews
//                   </Typography>
//                   <Badge
//                     badgeContent="2 New"
//                     color="warning"
//                     sx={{
//                       '& .MuiBadge-badge': {
//                         borderRadius: '20px',
//                         padding: '0.5em 1em',
//                         width:"70px",
//                         marginRight:"40px",
//                         marginTop:"15px",
//                       },
//                     }}
//                   />
//                 </Box>

//                 {/* Agent Items */}
//                 <PartnerItem>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <Box
//                       sx={{
//                         width: 8,
//                         height: 8,
//                         borderRadius: '50%',
//                         backgroundColor: colors.pending,
//                         mr: 1,
//                       }}
//                     />
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary }}>
//                       Naveenchary
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', color: colors.textSecondary, mb: 1 }}>
//                     <ApartmentIcon sx={{ fontSize: 16, mr: 0.5 }} />
//                     <Typography variant="body2">Property Manager</Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.9rem' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                       <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
//                       <Typography variant="body2">4.8</Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                       <AccessTimeIcon sx={{ fontSize: 16, color: 'info.main' }} />
//                       <Typography variant="body2">Last active: 2024-03-10</Typography>
//                     </Box>
//                   </Box>
//                 </PartnerItem>

//                 <PartnerItem>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <Box
//                       sx={{
//                         width: 8,
//                         height: 8,
//                         borderRadius: '50%',
//                         backgroundColor: colors.pending,
//                         mr: 1,
//                       }}
//                     />
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary }}>
//                       Naveen
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', color: colors.textSecondary, mb: 1 }}>
//                     <ApartmentIcon sx={{ fontSize: 16, mr: 0.5 }} />
//                     <Typography variant="body2">Property Manager</Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.9rem' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                       <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
//                       <Typography variant="body2">4.2</Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                       <AccessTimeIcon sx={{ fontSize: 16, color: 'info.main' }} />
//                       <Typography variant="body2">Last active: 2024-03-11</Typography>
//                     </Box>
//                   </Box>
//                 </PartnerItem>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Active Partners */}
//           <Grid item xs={12} md={4}>
//             <Card
//               sx={{
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 transition: 'transform 0.3s',
//                 '&:hover': { transform: 'translateY(-5px)' },
//               }}
//             >
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                   <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary }}>
//                     Active Partners
//                   </Typography>
//                   <Badge
//                     badgeContent="2 Online"
//                     color="success"
//                     sx={{
//                       '& .MuiBadge-badge': {
//                         borderRadius: '20px',
//                         padding: '0.5em 1em',
//                         width:"70px",
//                         marginRight:"40px",
//                         marginTop:"15px",
//                       },
//                     }}
//                   />
//                 </Box>

//                 <PartnerItem onClick={() => showPartnerDetails('Naveen', 'Investment Agent')}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <Box
//                       sx={{
//                         width: 8,
//                         height: 8,
//                         borderRadius: '50%',
//                         backgroundColor: colors.active,
//                         mr: 1,
//                       }}
//                     />
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary }}>
//                       Naveen
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', color: colors.textSecondary, mb: 1 }}>
//                     <ShowChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
//                     <Typography variant="body2">Investment Agent</Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.9rem' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                       <AccountTreeIcon sx={{ fontSize: 16, color: colors.primary }} />
//                       <Typography variant="body2">12 Projects</Typography>
//                     </Box>
//                   </Box>
//                 </PartnerItem>

//                 <PartnerItem onClick={() => showPartnerDetails('XYZ', 'Investment Agent')}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <Box
//                       sx={{
//                         width: 8,
//                         height: 8,
//                         borderRadius: '50%',
//                         backgroundColor: colors.active,
//                         mr: 1,
//                       }}
//                     />
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary }}>
//                       XYZ
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', color: colors.textSecondary, mb: 1 }}>
//                     <ShowChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
//                     <Typography variant="body2">Investment Agent</Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.9rem' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                       <AccountTreeIcon sx={{ fontSize: 16, color: colors.primary }} />
//                       <Typography variant="body2">8 Projects</Typography>
//                     </Box>
//                   </Box>
//                 </PartnerItem>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Performance Overview */}
//           <Grid item xs={12} md={4}>
//             <Card
//               sx={{
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 color: '#ffffff',
//               }}
//             >
//               <CardContent>
//                 <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
//                   Performance Overview
//                 </Typography>

//                 <Paper
//                   sx={{
//                     p: 2,
//                     mb: 2,
//                     borderRadius: 2,
//                     backgroundColor: 'rgba(255,255,255,0.1)',
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                     <Typography variant="body1">Average Rating</Typography>
//                     <Typography variant="h5">4.5</Typography>
//                   </Box>
//                   <LinearProgress
//                     variant="determinate"
//                     value={90}
//                     sx={{
//                       height: 8,
//                       borderRadius: 5,
//                       backgroundColor: 'rgba(255,255,255,0.3)',
//                       '& .MuiLinearProgress-bar': { backgroundColor: '#ffc107' },
//                     }}
//                   />
//                 </Paper>

//                 <Paper
//                   sx={{
//                     p: 2,
//                     borderRadius: 2,
//                     backgroundColor: 'rgba(255,255,255,0.1)',
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                     <Typography variant="body1">Total Partners</Typography>
//                     <Typography variant="h5">3</Typography>
//                   </Box>
//                   <LinearProgress
//                     variant="determinate"
//                     value={60}
//                     sx={{
//                       height: 8,
//                       borderRadius: 5,
//                       backgroundColor: 'rgba(255,255,255,0.3)',
//                       '& .MuiLinearProgress-bar': { backgroundColor: '#17a2b8' },
//                     }}
//                   />
//                 </Paper>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>

//       {/* Agent Details Modal */}
//       <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
//         <DialogTitle
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             pr: 2,
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <AccountCircleIcon sx={{ fontSize: 32, color: colors.primary }} />
//             <Typography variant="h6">Agent Details</Typography>
//           </Box>
//           <IconButton onClick={handleCloseModal}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Avatar sx={{ bgcolor: 'grey.200', width: 56, height: 56 }}>
//                 <PersonIcon sx={{ fontSize: 32, color: colors.primary }} />
//               </Avatar>
//               <Box>
//                 <Typography variant="h6" sx={{ mb: 0.5 }}>
//                   {selectedPartner.name}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {selectedPartner.role}
//                 </Typography>
//               </Box>
//             </Box>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Paper sx={{ p: 2, borderRadius: 2, textAlign: 'center', bgcolor: 'grey.100' }}>
//                   <Typography variant="caption" color="textSecondary">
//                     Projects
//                   </Typography>
//                   <Typography variant="h6">{selectedPartner.projects}</Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={6}>
//                 <Paper sx={{ p: 2, borderRadius: 2, textAlign: 'center', bgcolor: 'grey.100' }}>
//                   <Typography variant="caption" color="textSecondary">
//                     Rating
//                   </Typography>
//                   <Typography variant="h6">
//                     {selectedPartner.rating} ⭐
//                   </Typography>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </Box>
//     </>
//   );
// };

// export default PartnersDashboard;


import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import BusinessIcon from '@mui/icons-material/Business';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../../../Shared/Navbar/Navbar';
import { DataGrid } from '@mui/x-data-grid';

const partnersData = [
  { id: "AGENT001", name: "Naveen", role: "Property Manager", ownership: "10%", rating: "4.8", status: "Active" },
  { id: "AGENT002", name: "Rohit", role: "Investor", ownership: "15%", rating: "4.5", status: "Inactive" },
  { id: "AGENT003", name: "Anjali", role: "Co-Founder", ownership: "20%", rating: "4.7", status: "Active" },
  { id: "AGENT004", name: "Mahesh", role: "Business Consultant", ownership: "12%", rating: "4.2", status: "Inactive" },
  { id: "AGENT005", name: "Sonia", role: "Legal Advisor", ownership: "8%", rating: "4.9", status: "Active" },
  { id: "AGENT006", name: "Javid", role: "Technical Lead", ownership: "18%", rating: "4.3", status: "Active" },
  { id: "AGENT007", name: "Arjun", role: "Financial Advisor", ownership: "7%", rating: "4.6", status: "Inactive" },
  { id: "AGENT008", name: "Akhil", role: "Marketing Head", ownership: "9%", rating: "4.1", status: "Active" },
  { id: "AGENT009", name: "Dikshith", role: "Operations Manager", ownership: "11%", rating: "4.7", status: "Inactive" },
  { id: "AGENT010", name: "Abhishek", role: "HR Manager", ownership: "5%", rating: "4.4", status: "Active" },
];

const PartnersDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const totalPages = Math.ceil(partnersData.length / rowsPerPage);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePartnerClick = (partner) => {
    setSelectedPartner(partner);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Updated columns using flex and minWidth so cells adjust to content
  const columns = [
    { field: 'id', headerName: 'Agent ID', minWidth: 120, flex: 0.7 },
    { field: 'name', headerName: 'Agent Name', minWidth: 150, flex: 1 },
    { field: 'role', headerName: 'Role', minWidth: 150, flex: 1 },
    { field: 'ownership', headerName: 'Ownership%', minWidth: 100, flex: 0.8 },
    { field: 'rating', headerName: 'Rating', minWidth: 80, flex: 0.8 },
    { 
      field: 'status', 
      headerName: 'Status', 
      minWidth: 100, 
      flex: 0.8,
      renderCell: (params) => (
        <Box
          sx={{
            // backgroundColor: params.value === 'Active' ? '#2e7d32' : '#c62828',
            color: params.value === 'Active' ? '#2e7d32' : '#c62828',
            borderRadius: '20px',
            px: 1,
            py: 0.5,
            fontSize: '0.875rem',
            fontWeight: 500,
            textAlign: 'start',
            width: '100%'
          }}
        >
          {params.value}
        </Box>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: "5px" }}>
          <IconButton size="small" color="primary">
            <VisibilityIcon />
          </IconButton>
          <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
    
  ];

  // Updated renderPartnersList to use DataGrid with autoHeight and responsive columns
  const renderPartnersList = () => {
    const start = (page - 1) * rowsPerPage;
    const paginatedData = partnersData.slice(start, start + rowsPerPage);
    return (
      <Box sx={{ width: '100%', backgroundColor: 'white',  boxShadow: 2, mt: 2 }}>
        <DataGrid
          autoHeight
          rows={paginatedData}
          columns={columns}
          pageSize={rowsPerPage}
          hideFooter
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: 'white',
            },
            '& .MuiDataGrid-cell': {
              outline: 'none',
            }
          }}
        />
      </Box>
    );
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(255, 255, 255) 100%)',
          p: 2,
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
          {/* Dashboard Header */}
          <Box
            sx={{
              backgroundColor: 'white',
              p: 2,
              borderRadius: '15px',
              mb: 3,
              boxShadow: '0 2px 15px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <HandshakeIcon sx={{ mr: 1 }} />
              Agents <span style={{ color: '#4a90e2', marginLeft: 4 }}>Dashboard</span>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage agent applications, track performance, and handle permissions efficiently.
            </Typography>
          </Box>

          {/* Navigation Tabs */}
          <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
            <Tab label="Agents" />
            <Tab label="Agents List" />
          </Tabs>

          {/* Content Sections */}
          <Box sx={{ mt: 2 }}>
            {tabValue === 0 && (
              <Grid container spacing={2}>
                {/* Pending Reviews Card */}
                <Grid item xs={12} md={6}>

                  <Card
                    sx={{
                      borderRadius: '15px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography >Pending Reviews</Typography>
                        <Box
                          sx={{
                            backgroundColor: '#ffc107',
                            borderRadius: '20px',
                            px: 1,
                            py: 0.5,
                            color: 'white',
                            fontWeight: 500,
                          }}
                        >
                          2 New
                        </Box>
                      </Box>
                      {/* Pending Agent Item 1 */}
                      <Box
                        sx={{
                          backgroundColor: '#f8f9fa',
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': { backgroundColor: '#ffffff', borderLeft: '4px solid #4a90e2', transform: 'translateX(5px)' },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f1c40f', mr: 1 }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                            Naveenchary
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                          <BusinessIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">Property Manager</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, fontSize: '0.9rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ color: '#ffc107', fontSize: 16 }} />
                            <Typography variant="body2">4.8</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon sx={{ color: '#17a2b8', fontSize: 16 }} />
                            <Typography variant="body2">Last active: 2024-03-10</Typography>
                          </Box>
                        </Box>
                      </Box>
                      {/* Pending Agent Item 2 */}
                      <Box
                        sx={{
                          backgroundColor: '#f8f9fa',
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': { backgroundColor: '#ffffff', borderLeft: '4px solid #4a90e2', transform: 'translateX(5px)' },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f1c40f', mr: 1 }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                            Naveen
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                          <BusinessIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">Property Manager</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, fontSize: '0.9rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ color: '#ffc107', fontSize: 16 }} />
                            <Typography variant="body2">4.2</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon sx={{ color: '#17a2b8', fontSize: 16 }} />
                            <Typography variant="body2">Last active: 2024-03-11</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Active Partners Card */}
                <Grid item xs={12} md={6}>

                  <Card
                    sx={{
                      borderRadius: '15px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography >Active Agents</Typography>
                        <Box
                          sx={{
                            backgroundColor: '#28a745',
                            borderRadius: '20px',
                            px: 1,
                            py: 0.5,
                            color: 'white',
                            fontWeight: 500,
                          }}
                        >
                          2 Online
                        </Box>
                      </Box>
                      {/* Active Agent Item 1 */}
                      <Box
                        sx={{
                          backgroundColor: '#f8f9fa',
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': { backgroundColor: '#ffffff', borderLeft: '4px solid #4a90e2', transform: 'translateX(5px)' },
                        }}
                        onClick={() => handlePartnerClick({ name: 'Naveen', role: 'Investment Agent', projects: 12, rating: '4.8' })}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2ecc71', mr: 1 }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                            Naveen
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                          <ShowChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">Investment Agent</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, fontSize: '0.9rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ color: '#4a90e2', fontSize: 16 }} />
                            <Typography variant="body2">12 Projects</Typography>
                          </Box>
                        </Box>
                      </Box>
                      {/* Active Agent Item 2 */}
                      <Box
                        sx={{
                          backgroundColor: '#f8f9fa',
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': { backgroundColor: '#ffffff', borderLeft: '4px solid #4a90e2', transform: 'translateX(5px)' },
                        }}
                        onClick={() => handlePartnerClick({ name: 'XYZ', role: 'Investment Agent', projects: 8 })}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2ecc71', mr: 1 }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                            XYZ
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                          <ShowChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">Investment Agent</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, fontSize: '0.9rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ color: '#4a90e2', fontSize: 16 }} />
                            <Typography variant="body2">8 Projects</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Performance Overview Card */}
                {/* <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      borderRadius: '15px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' },
                    }}
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}
                  >
                   
                  </Card>
                </Grid> */}
              </Grid>
            )}
            {tabValue === 1 && (
              <Box>
                {/* Search & Filter Section */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', justifyContent: "right"}}>
                  <TextField
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Select defaultValue="latest" size="small">
                    <MenuItem value="latest">Latest</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                  </Select>
                  <Button variant="outlined" color="primary">
                    Filters
                  </Button>
                </Box>
                {renderPartnersList()}
                {/* Pagination Section */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2, gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </Button>
                  <Box
                    sx={{
                     
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      fontWeight: 'bold',
                      color: '#28a745',
                    }}
                  >
                    {page}
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* Agent Details Modal */}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle sx={{ m: 0, p: 2, position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ backgroundColor: '#f5f5f5', p: 1, borderRadius: '50%' }}>
                <PersonIcon sx={{ fontSize: 30, color: '#4a90e2' }} />
              </Box>
              <Typography variant="h6">Agent Details</Typography>
            </Box>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {selectedPartner && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: '50%' }}>
                    <PersonIcon sx={{ fontSize: 40, color: '#4a90e2' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6">{selectedPartner.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedPartner.role}
                    </Typography>
                  </Box>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        backgroundColor: '#f5f5f5',
                        p: 2,
                        borderRadius: 1,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Projects
                      </Typography>
                      <Typography variant="h6">{selectedPartner.projects || 12}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        backgroundColor: '#f5f5f5',
                        p: 2,
                        borderRadius: 1,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Rating
                      </Typography>
                      <Typography variant="h6">{selectedPartner.rating || '4.8 ⭐'}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default PartnersDashboard;


