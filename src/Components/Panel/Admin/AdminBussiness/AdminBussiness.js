
// import Header from "../../../Shared/Navbar/Navbar";
// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CardMedia,
//   Box,
//   CircularProgress,
//   Chip,
//   Divider,
//   Link,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import BusinessIcon from "@mui/icons-material/Business";
// import LanguageIcon from "@mui/icons-material/Language";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import DescriptionIcon from "@mui/icons-material/Description";
// import DownloadIcon from "@mui/icons-material/Download";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";


// import { useNavigate } from "react-router-dom";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import PaginationComponent from "../../../Shared/Pagination";

// function AllBusinesses() {
//   const userId = localStorage.getItem("user_id");
//   const [businesses, setBusinesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Pagination states
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 6;

//   // Fetch businesses
//   useEffect(() => {
//     fetch(`${baseurl}/business/`)
//       .then((res) => res.json())
//       .then((data) => {
//         const filtered = data
//         setBusinesses(filtered);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching businesses:", error);
//         setLoading(false);
//       });
//   }, [userId]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this business?")) {
//       fetch(`${baseurl}/business/${id}/`, { method: "DELETE" })
//         .then((res) => {
//           if (res.ok) {
//             setBusinesses((prev) =>
//               prev.filter((business) => business.business_id !== id)
//             );
//           } else {
//             alert("Failed to delete business");
//           }
//         })
//         .catch((err) => console.error("Error deleting:", err));
//     }
//   };

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   // Paginated data
//   const totalPages = Math.ceil(businesses.length / itemsPerPage);
//   const startIndex = (page - 1) * itemsPerPage;
//   const paginatedBusinesses = businesses.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   return (
//     <>
//       <Header />
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Box display="flex" justifyContent="center" mb={2}>
//           <Typography variant="h2" fontWeight="bold" sx={{ textAlign: "center" }}>
//             Businesses
//           </Typography>
//         </Box>

//         {/* <Box display="flex" justifyContent="flex-end" mb={3}>
//           <button
//             style={{
//               padding: "10px 20px",
//               borderRadius: "8px",
//               backgroundColor: "#1976d2",
//               color: "white",
//               border: "none",
//               cursor: "pointer",
//               fontWeight: "bold",
//             }}
//             onClick={() => navigate("/p-addbusiness")}
//           >
//             + Add Business
//           </button>
//         </Box> */}

//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
//             <CircularProgress />
//           </Box>
//         ) : businesses.length === 0 ? (
//           <Typography
//             variant="body1"
//             color="textSecondary"
//             align="center"
//             sx={{ mt: 5 }}
//           >
//             No businesses found for this user.
//           </Typography>
//         ) : (
//           <>
//             <Grid container spacing={3}>
//               {paginatedBusinesses.map((business) => (
//                 <Grid item xs={12} sm={6} md={4} key={business.business_id}>
//                   <Card
//                     sx={{
//                       borderRadius: 3,
//                       boxShadow: 4,
//                       height: "100%",
//                       display: "flex",
//                       flexDirection: "column",
//                       position: "relative",
//                       overflow: "hidden",
//                       borderTopLeftRadius: "15px",
//                       borderTopRightRadius: "15px",
//                     }}
//                   >
//                     {/* Offer Ribbon */}
//                     {business.offer_title && (
//                       <Box
//                         sx={{
//                           position: "absolute",
//                           top: 16,
//                           left: -25,
//                           width: "120px",
//                           transform: "rotate(-45deg)",
//                           backgroundColor: "#2ECC71",
//                           color: "white",
//                           textAlign: "center",
//                           fontSize: "12px",
//                           fontWeight: "bold",
//                           textTransform: "uppercase",
//                           py: "3px",
//                           boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//                           zIndex: 1,
//                         }}
//                       >
//                         {business.offer_title.toUpperCase()}
//                       </Box>
//                     )}

//                     {/* Business Logo */}
//                     {business.logo ? (
//                       <CardMedia
//                         component="img"
//                         alt={business.business_name || "Business Logo"}
//                         image={
//                           business.logo ? `${baseurl}/${business.logo}` : "/default-logo.png"
//                         }
//                         sx={{ objectFit: "contain" }}
//                       />
//                     ) : (
//                       <Box
//                         height="160px"
//                         display="flex"
//                         justifyContent="center"
//                         alignItems="center"
//                         bgcolor="#f5f5f5"
//                       >
//                         <BusinessIcon sx={{ fontSize: 60, color: "gray" }} />
//                       </Box>
//                     )}

//                     {/* Business Info */}
//                     <CardContent sx={{ flexGrow: 1 }}>
//                       <Typography variant="h6" fontWeight="bold" gutterBottom>
//                         {business.business_name}
//                       </Typography>

//                       <Chip
//                         label={business.business_type}
//                         color="primary"
//                         size="small"
//                         sx={{ mb: 1 }}
//                       />

//                       <Divider sx={{ my: 1.5 }} />

//                       {/* Website */}
//                       <Box display="flex" alignItems="center" gap={1} mb={1}>
//                         <LanguageIcon fontSize="small" color="primary" />
//                         <Link
//                           href={business.website}
//                           target="_blank"
//                           rel="noopener"
//                           underline="hover"
//                         >
//                           {business.website}
//                         </Link>
//                       </Box>

//                       {/* Email */}
//                       <Box display="flex" alignItems="center" gap={1} mb={1}>
//                         <EmailIcon fontSize="small" color="primary" />
//                         <Typography variant="body2">{business.email}</Typography>
//                       </Box>

//                       {/* Phone */}
//                       <Box display="flex" alignItems="center" gap={1} mb={1}>
//                         <PhoneIcon fontSize="small" color="primary" />
//                         <Typography variant="body2">{business.phone}</Typography>
//                       </Box>

//                       {/* Location */}
//                       {business.address && (
//                         <Box display="flex" alignItems="center" gap={1} mb={1}>
//                           <LocationOnIcon fontSize="small" color="primary" />
//                           <Typography variant="body2" color="text.secondary">
//                             {business.address}
//                           </Typography>
//                         </Box>
//                       )}

//                       {/* Description */}
//                       {business.description && (
//                         <Box display="flex" alignItems="flex-start" mb={1}>
//                           <DescriptionIcon
//                             fontSize="small"
//                             color="primary"
//                             sx={{ mr: 0.5, mt: 0.3 }}
//                           />
//                           <Typography variant="body2" color="text.secondary">
//                             {business.description}
//                           </Typography>
//                         </Box>
//                       )}
//                     </CardContent>

//                     {/* Action Buttons */}
//                     <Box display="flex" justifyContent="flex-end" p={1}>
//                       {/* Download Document */}
//                       {business.documents && (
//                         <Tooltip title="Download">
//                           <IconButton
//                             component="a"
//                             href={`${baseurl}/${business.documents}`}
//                             target="_blank"
//                             rel="noopener"
//                             color="primary"
//                           >
//                             <DownloadIcon />
//                           </IconButton>
//                         </Tooltip>
//                       )}

//                       {/* <Tooltip title="Edit">
//                         <IconButton
//                           color="primary"
//                           onClick={() =>
//                             navigate(`/p-editbusiness/${business.business_id}`)
//                           }
//                         >
//                           <EditIcon />
//                         </IconButton>
//                       </Tooltip> */}

//                       {/* <Tooltip title="Delete">
//                         <IconButton
//                           color="error"
//                           onClick={() => handleDelete(business.business_id)}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </Tooltip> */}
//                     </Box>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>

//             {/* Pagination */}
//         {/* Pagination */}
// {totalPages >= 1 && (
//   <Box display="flex" justifyContent="flex-end" mt={2}>
//     <PaginationComponent
//       count={totalPages || 1} // ensure at least 1 page
//       page={page}
//       onChange={handlePageChange}
//     />
//   </Box>
// )}

//           </>
//         )}
//       </Container>
//     </>
//   );
// }

// export default AllBusinesses;


// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CardMedia,
//   Box,
//   CircularProgress,
//   Chip,
//   Divider,
//   Link,
//   IconButton,
//   Tooltip,
//   TextField,
//   Button,
//   Popover
// } from "@mui/material";
// import BusinessIcon from "@mui/icons-material/Business";
// import LanguageIcon from "@mui/icons-material/Language";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import DescriptionIcon from "@mui/icons-material/Description";
// import DownloadIcon from "@mui/icons-material/Download";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";

// import Header from "../../../Shared/Navbar/Navbar";
// import { useNavigate } from "react-router-dom";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import PaginationComponent from "../../../Shared/Pagination";

// function ViewBusiness() { 
//   const userId = localStorage.getItem("user_id");
//   const [businesses, setBusinesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [commissions, setCommissions] = useState([]);
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // Payout popover states
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [hoveredBusiness, setHoveredBusiness] = useState(null);

//   // Pagination states
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 6;

//   // Fetch businesses
//   useEffect(() => {
//     fetch(`${baseurl}/business/`)
//       .then((res) => res.json())
//       .then((data) => {
//         const filtered = data;
//         setBusinesses(filtered);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching businesses:", error);
//         setLoading(false);
//       });
//   }, [userId]);

//   // Fetch commissions
//   useEffect(() => {
//     const fetchCommissions = async () => {
//       try {
//         const response = await axios.get(`${baseurl}/commissions-master/`);
//         setCommissions(response.data);
//       } catch (error) {
//         console.error("Error fetching commissions:", error);
//       }
//     };

//     fetchCommissions();
//   }, []);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this business?")) {
//       fetch(`${baseurl}/business/${id}/`, { method: "DELETE" })
//         .then((res) => {
//           if (res.ok) {
//             setBusinesses((prev) =>
//               prev.filter((business) => business.business_id !== id)
//             );
//           } else {
//             alert("Failed to delete business");
//           }
//         })
//         .catch((err) => console.error("Error deleting:", err));
//     }
//   };

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   // Payout popover handlers
//   const handlePopoverOpen = (event, businessId) => {
//     event.stopPropagation(); // Prevent card click navigation
//     setAnchorEl(event.currentTarget);
//     setHoveredBusiness(businessId);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//     setHoveredBusiness(null);
//   };

//   const open = Boolean(anchorEl);

//   // Filter businesses based on business_type
//   const filteredBusinesses = businesses.filter(business => {
//     if (!searchTerm) return true;
//     return business.business_type?.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   // Paginated data
//   const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
//   const startIndex = (page - 1) * itemsPerPage;
//   const paginatedBusinesses = filteredBusinesses.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   return (
//     <>
//       <Header />
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Box display="flex" justifyContent="center" mb={2}>
//           <Typography variant="h2" fontWeight="bold" sx={{ textAlign: "center" }}>
//             Businesses
//           </Typography>
//         </Box>

//         {/* Search Bar */}
//         <Box sx={{ mb: 3, maxWidth: 400 }}>
//           <TextField
//             fullWidth
//             label="Search by business category or type..."
//             variant="outlined"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setPage(1);
//             }}
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: '12px',
//                 backgroundColor: 'white',
//               }
//             }}
//           />
//         </Box>

//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
//             <CircularProgress />
//           </Box>
//         ) : businesses.length === 0 ? (
//           <Typography
//             variant="body1"
//             color="textSecondary"
//             align="center"
//             sx={{ mt: 5 }}
//           >
//             No businesses found for this user.
//           </Typography>
//         ) : (
//           <>
//             <Grid container spacing={3}>
//               {paginatedBusinesses.map((business) => (
//                 <Grid item xs={12} sm={6} md={4} key={business.business_id}>
//                   <Card
//                     sx={{
//                       borderRadius: "20px",
//                       p: 2,
//                       boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
//                       bgcolor: "#fff",
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "space-between",
//                       width: "100%",
//                       height: "100%",
//                       position: "relative",
//                       overflow: "visible",
//                       cursor: 'pointer',
//                     }}
//                     onClick={() => navigate(`/a-businessproducts/${business.business_id}`)}
//                   >
//                     {/* Offer Ribbon */}
//                     {business.offer_title && (
//                       <Box
//                         sx={{
//                           position: "absolute",
//                           top: -5,
//                           left: -5,
//                           zIndex: 1,
//                           transform: "rotate(-5deg)",
//                           backgroundColor: "#ff6b6b",
//                           color: "white",
//                           px: 2,
//                           py: 0.5,
//                           borderRadius: "8px 8px 8px 0",
//                           fontSize: "0.75rem",
//                           fontWeight: "bold",
//                           textTransform: "uppercase",
//                           letterSpacing: "0.5px",
//                         }}
//                       >
//                         {business.offer_title.toUpperCase()}
//                       </Box>
//                     )}

//                     {/* Business Logo */}
//                     {business.logo ? (
//                       <CardMedia
//                         component="img"
//                         alt={business.business_name || "Business Logo"}
//                         image={
//                           business.logo ? `${baseurl}/${business.logo}` : "/default-logo.png"
//                         }
//                         sx={{ 
//                           height: 180,
//                           objectFit: "contain",
//                           width: "100%",
//                           borderRadius: "12px",
//                           mb: 2 
//                         }}
//                       />
//                     ) : (
//                       <Box
//                         height="160px"
//                         display="flex"
//                         justifyContent="center"
//                         alignItems="center"
//                         bgcolor="#f5f5f5"
//                         borderRadius="12px"
//                         mb={2}
//                       >
//                         <BusinessIcon sx={{ fontSize: 60, color: "gray" }} />
//                       </Box>
//                     )}

//                     {/* Business Info */}
//                     <CardContent sx={{ flexGrow: 1, p: 0, mb: 2 }}>
//                       <Typography variant="h6" fontWeight="bold" gutterBottom>
//                         {business.business_name}
//                       </Typography>

//                       <Chip
//                         label={business.business_type}
//                         color="primary"
//                         size="small"
//                         sx={{ mb: 2 }}
//                       />

//                       <Divider sx={{ my: 1.5 }} />

//                       {/* Website */}
//                       <Box display="flex" alignItems="center" gap={1} mb={1}>
//                         <LanguageIcon fontSize="small" color="primary" />
//                         <Link
//                           href={business.website}
//                           target="_blank"
//                           rel="noopener"
//                           underline="hover"
//                           sx={{ fontSize: "0.875rem" }}
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           {business.website}
//                         </Link>
//                       </Box>

//                       {/* Email */}
//                       <Box display="flex" alignItems="center" gap={1} mb={1}>
//                         <EmailIcon fontSize="small" color="primary" />
//                         <Typography variant="body2">{business.email}</Typography>
//                       </Box>

//                       {/* Phone */}
//                       <Box display="flex" alignItems="center" gap={1} mb={1}>
//                         <PhoneIcon fontSize="small" color="primary" />
//                         <Typography variant="body2">{business.phone}</Typography>
//                       </Box>

//                       {/* Location */}
//                       {business.address && (
//                         <Box display="flex" alignItems="center" gap={1} mb={1}>
//                           <LocationOnIcon fontSize="small" color="primary" />
//                           <Typography variant="body2" color="text.secondary">
//                             {business.address}
//                           </Typography>
//                         </Box>
//                       )}

//                       {/* Description */}
//                       {business.description && (
//                         <Box display="flex" alignItems="flex-start" mb={2}>
//                           <DescriptionIcon
//                             fontSize="small"
//                             color="primary"
//                             sx={{ mr: 0.5, mt: 0.3 }}
//                           />
//                           <Typography variant="body2" color="text.secondary">
//                             {business.description}
//                           </Typography>
//                         </Box>
//                       )}
//                     </CardContent>

//                     {/* Payout Button */}
//                     <Box sx={{ mb: 2 }}>
//                       <Button
//                         onMouseEnter={(e) => handlePopoverOpen(e, business.business_id)}
//                         onMouseLeave={handlePopoverClose}
//                         fullWidth
//                         variant="contained"
//                         sx={{
//                           color: "white",
//                           textTransform: "none",
//                           "&:hover": { color: "rgb(5,5,5)" },
//                           borderRadius: "8px",
//                         }}
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         Payout
//                       </Button>
//                     </Box>

//                     {/* Action Buttons */}
//                     <Box display="flex" justifyContent="space-between" alignItems="center" p={0}>
//                       {/* Download Document */}
//                       {business.documents && (
//                         <Tooltip title="Download Document">
//                           <IconButton
//                             component="a"
//                             href={`${baseurl}/${business.documents}`}
//                             target="_blank"
//                             rel="noopener"
//                             color="primary"
//                             onClick={(e) => e.stopPropagation()}
//                             size="small"
//                           >
//                             <DownloadIcon />
//                           </IconButton>
//                         </Tooltip>
//                       )}

//                       <Box display="flex" gap={1} justifyContent="flex-end">
//                             <Tooltip title="Edit">
//                                 <IconButton
//                                     color="primary"
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         navigate(`/a-editbusiness/${business.business_id}`);
//                                     }}
//                                     size="small"
//                                 >
//                                     <EditIcon />
//                                 </IconButton>
//                             </Tooltip>

//                             <Tooltip title="Delete">
//                                 <IconButton
//                                     color="error"
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         handleDelete(business.business_id);
//                                     }}
//                                     size="small"
//                                 >
//                                     <DeleteIcon />
//                                 </IconButton>
//                             </Tooltip>
//                         </Box>
//                     </Box>
//                   </Card>

//                   {/* Payout Popover */}
//                   <Popover
//                     id="mouse-over-popover"
//                     sx={{ 
//                       pointerEvents: "none",
//                       zIndex: 9999 
//                     }}
//                     open={open && hoveredBusiness === business.business_id}
//                     anchorEl={anchorEl}
//                     anchorOrigin={{
//                       vertical: "bottom",
//                       horizontal: "left",
//                     }}
//                     transformOrigin={{
//                       vertical: "top",
//                       horizontal: "left",
//                     }}
//                     onClose={handlePopoverClose}
//                     disableRestoreFocus
//                   >
//                     <Box sx={{ p: 2, maxWidth: 300 }}>
//                       <Typography fontWeight="bold" gutterBottom>
//                         Commissions for {business.business_name}
//                       </Typography>
//                       {commissions.length > 0 ? (
//                         commissions.map((c) => {
//                           // Note: You might want to replace business.distribution_commission 
//                           // with the actual commission field from your business data
//                           const commissionAmount = business.distribution_commission || 0;
//                           const amount = (parseFloat(c.percentage) * commissionAmount) / 100;
//                           return (
//                             <Typography key={c.id} variant="body2" sx={{ mb: 0.5 }}>
//                               Team {c.level_no}: ₹
//                               {amount.toLocaleString(undefined, {
//                                 minimumFractionDigits: 2,
//                               })}
//                             </Typography>
//                           );
//                         })
//                       ) : (
//                         <Typography variant="body2" color="text.secondary">
//                           No commission data available
//                         </Typography>
//                       )}
//                       <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
//                         *Based on business distribution commission
//                       </Typography>
//                     </Box>
//                   </Popover>
//                 </Grid>
//               ))}
//             </Grid>

//             {/* Pagination */}
//             {totalPages >= 1 && (
//               <Box display="flex" justifyContent="flex-end" mt={3}>
//                 <PaginationComponent
//                   count={totalPages || 1}
//                   page={page}
//                   onChange={handlePageChange}
//                 />
//               </Box>
//             )}
//           </>
//         )}
//       </Container>
//     </>
//   );
// }

// export default ViewBusiness;

// =================================================================
// Implemented Global Search in below code

import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  CircularProgress,
  Chip,
  Divider,
  Link,
  IconButton,
  Tooltip,
  TextField,
  Button,
  Popover
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

import Header from "../../../Shared/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../../BaseURL/BaseURL";
import PaginationComponent from "../../../Shared/Pagination";

function ViewBusiness() { 
  const userId = localStorage.getItem("user_id");
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commissions, setCommissions] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Payout popover states
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredBusiness, setHoveredBusiness] = useState(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch businesses
  useEffect(() => {
    fetch(`${baseurl}/business/`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data;
        setBusinesses(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error);
        setLoading(false);
      });
  }, [userId]);

  // Fetch commissions
  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await axios.get(`${baseurl}/commissions-master/`);
        setCommissions(response.data);
      } catch (error) {
        console.error("Error fetching commissions:", error);
      }
    };

    fetchCommissions();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this business?")) {
      fetch(`${baseurl}/business/${id}/`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            setBusinesses((prev) =>
              prev.filter((business) => business.business_id !== id)
            );
          } else {
            alert("Failed to delete business");
          }
        })
        .catch((err) => console.error("Error deleting:", err));
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Payout popover handlers
  const handlePopoverOpen = (event, businessId) => {
    event.stopPropagation(); // Prevent card click navigation
    setAnchorEl(event.currentTarget);
    setHoveredBusiness(businessId);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setHoveredBusiness(null);
  };

  const open = Boolean(anchorEl);

  // Global search filter - fixed to search across multiple fields
  const filteredBusinesses = businesses.filter(business => {
    if (!searchTerm.trim()) return true;
    
    const searchLower = searchTerm.toLowerCase().trim();
    
    // Search across all relevant business fields
    return (
      (business.business_type && business.business_type.toLowerCase().includes(searchLower)) ||
      (business.business_name && business.business_name.toLowerCase().includes(searchLower)) ||
      (business.email && business.email.toLowerCase().includes(searchLower)) ||
      (business.phone && business.phone.toString().includes(searchTerm)) || // Keep original for phone
      (business.address && business.address.toLowerCase().includes(searchLower)) ||
      (business.description && business.description.toLowerCase().includes(searchLower)) ||
      (business.offer_title && business.offer_title.toLowerCase().includes(searchLower)) ||
      (business.website && business.website.toLowerCase().includes(searchLower))
    );
  });

  // Paginated data
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedBusinesses = filteredBusinesses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography variant="h2" fontWeight="bold" sx={{ textAlign: "center" }}>
            Businesses
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 3, maxWidth: 400 }}>
          <TextField
            fullWidth
            label="Search by business name, type, email, phone, address..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // Reset to first page when searching
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'white',
              }
            }}
          />
        </Box>

        {/* Show search results count */}
        {searchTerm && (
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Found {filteredBusinesses.length} business{filteredBusinesses.length !== 1 ? 'es' : ''} matching "{searchTerm}"
          </Typography>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : businesses.length === 0 ? (
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            sx={{ mt: 5 }}
          >
            No businesses found.
          </Typography>
        ) : (
          <>
            {/* Show message when no search results */}
            {searchTerm && filteredBusinesses.length === 0 ? (
              <Typography
                variant="body1"
                color="textSecondary"
                align="center"
                sx={{ mt: 5 }}
              >
                No businesses found matching "{searchTerm}". Try a different search term.
              </Typography>
            ) : (
              <>
                <Grid container spacing={3}>
                  {paginatedBusinesses.map((business) => (
                    <Grid item xs={12} sm={6} md={4} key={business.business_id}>
                      <Card
                        sx={{
                          borderRadius: "20px",
                          p: 2,
                          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                          bgcolor: "#fff",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          width: "100%",
                          height: "100%",
                          position: "relative",
                          overflow: "visible",
                          cursor: 'pointer',
                        }}
                        onClick={() => navigate(`/a-businessproducts/${business.business_id}`)}
                      >
                        {/* Offer Ribbon */}
                        {business.offer_title && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: -5,
                              left: -5,
                              zIndex: 1,
                              transform: "rotate(-5deg)",
                              backgroundColor: "#ff6b6b",
                              color: "white",
                              px: 2,
                              py: 0.5,
                              borderRadius: "8px 8px 8px 0",
                              fontSize: "0.75rem",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {business.offer_title.toUpperCase()}
                          </Box>
                        )}

                        {/* Business Logo */}
                        {business.logo ? (
                          <CardMedia
                            component="img"
                            alt={business.business_name || "Business Logo"}
                            image={
                              business.logo ? `${baseurl}/${business.logo}` : "/default-logo.png"
                            }
                            sx={{ 
                              height: 180,
                              objectFit: "contain",
                              width: "100%",
                              borderRadius: "12px",
                              mb: 2 
                            }}
                          />
                        ) : (
                          <Box
                            height="160px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            bgcolor="#f5f5f5"
                            borderRadius="12px"
                            mb={2}
                          >
                            <BusinessIcon sx={{ fontSize: 60, color: "gray" }} />
                          </Box>
                        )}

                        {/* Business Info */}
                        <CardContent sx={{ flexGrow: 1, p: 0, mb: 2 }}>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {business.business_name}
                          </Typography>

                          <Chip
                            label={business.business_type}
                            color="primary"
                            size="small"
                            sx={{ mb: 2 }}
                          />

                          <Divider sx={{ my: 1.5 }} />

                          {/* Website */}
                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <LanguageIcon fontSize="small" color="primary" />
                            <Link
                              href={business.website}
                              target="_blank"
                              rel="noopener"
                              underline="hover"
                              sx={{ fontSize: "0.875rem" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {business.website}
                            </Link>
                          </Box>

                          {/* Email */}
                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <EmailIcon fontSize="small" color="primary" />
                            <Typography variant="body2">{business.email}</Typography>
                          </Box>

                          {/* Phone */}
                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <PhoneIcon fontSize="small" color="primary" />
                            <Typography variant="body2">{business.phone}</Typography>
                          </Box>

                          {/* Location */}
                          {business.address && (
                            <Box display="flex" alignItems="center" gap={1} mb={1}>
                              <LocationOnIcon fontSize="small" color="primary" />
                              <Typography variant="body2" color="text.secondary">
                                {business.address}
                              </Typography>
                            </Box>
                          )}

                          {/* Description */}
                          {business.description && (
                            <Box display="flex" alignItems="flex-start" mb={2}>
                              <DescriptionIcon
                                fontSize="small"
                                color="primary"
                                sx={{ mr: 0.5, mt: 0.3 }}
                              />
                              <Typography variant="body2" color="text.secondary">
                                {business.description}
                              </Typography>
                            </Box>
                          )}
                        </CardContent>

                        {/* Payout Button */}
                        <Box sx={{ mb: 2 }}>
                          <Button
                            onMouseEnter={(e) => handlePopoverOpen(e, business.business_id)}
                            onMouseLeave={handlePopoverClose}
                            fullWidth
                            variant="contained"
                            sx={{
                              color: "white",
                              textTransform: "none",
                              "&:hover": { color: "rgb(5,5,5)" },
                              borderRadius: "8px",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Payout
                          </Button>
                        </Box>

                        {/* Action Buttons */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" p={0}>
                          {/* Download Document */}
                          {business.documents && (
                            <Tooltip title="Download Document">
                              <IconButton
                                component="a"
                                href={`${baseurl}/${business.documents}`}
                                target="_blank"
                                rel="noopener"
                                color="primary"
                                onClick={(e) => e.stopPropagation()}
                                size="small"
                              >
                                <DownloadIcon />
                              </IconButton>
                            </Tooltip>
                          )}

                          <Box display="flex" gap={1} justifyContent="flex-end">
                                <Tooltip title="Edit">
                                    <IconButton
                                        color="primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/a-editbusiness/${business.business_id}`);
                                        }}
                                        size="small"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete">
                                    <IconButton
                                        color="error"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(business.business_id);
                                        }}
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                      </Card>

                      {/* Payout Popover */}
                      <Popover
                        id="mouse-over-popover"
                        sx={{ 
                          pointerEvents: "none",
                          zIndex: 9999 
                        }}
                        open={open && hoveredBusiness === business.business_id}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                      >
                        <Box sx={{ p: 2, maxWidth: 300 }}>
                          <Typography fontWeight="bold" gutterBottom>
                            Commissions for {business.business_name}
                          </Typography>
                          {commissions.length > 0 ? (
                            commissions.map((c) => {
                              // Note: You might want to replace business.distribution_commission 
                              // with the actual commission field from your business data
                              const commissionAmount = business.distribution_commission || 0;
                              const amount = (parseFloat(c.percentage) * commissionAmount) / 100;
                              return (
                                <Typography key={c.id} variant="body2" sx={{ mb: 0.5 }}>
                                  Team {c.level_no}: ₹
                                  {amount.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                  })}
                                </Typography>
                              );
                            })
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              No commission data available
                            </Typography>
                          )}
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                            *Based on business distribution commission
                          </Typography>
                        </Box>
                      </Popover>
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                {totalPages >= 1 && (
                  <Box display="flex" justifyContent="flex-end" mt={3}>
                    <PaginationComponent
                      count={totalPages || 1}
                      page={page}
                      onChange={handlePageChange}
                    />
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default ViewBusiness;