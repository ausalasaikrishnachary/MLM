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
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
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
// import AddIcon from "@mui/icons-material/Add";

// import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
// import { useNavigate } from "react-router-dom";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import PaginationComponent from "../../../Shared/Pagination";

// function ViewBusiness() {
//   const userId = localStorage.getItem("user_id");
//   const [businesses, setBusinesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Pagination states
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 6;

//   // Dialog + Form states
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedBusiness, setSelectedBusiness] = useState(null);
//   const [formData, setFormData] = useState({
//     agent_id: userId,
//     business_id: "",
//     product_name: "",
//     sku: "",
//     description: "",
//     price: "",
//     selling_price: "",
//     mrp: "",
//     units: "",
//     tax_percent: "",
//     cgst_percent: "",
//     cgst_amount: "",
//     sgst_percent: "",
//     sgst_amount: "",
//     available_qty: "",
//     company_commission: "",
//     product_commission: "",
//   });

// // Fetch businesses
// useEffect(() => {
//   const fetchBusinesses = async () => {
//     try {
//       const res = await fetch(`${baseurl}/business/user-id/${userId}/`);
//       const data = await res.json();

//       // API already returns *only businesses for that user*
//       setBusinesses(data);
//       setLoading(false);

//     } catch (error) {
//       console.error("Error fetching businesses:", error);
//       setLoading(false);
//     }
//   };

//   fetchBusinesses();
// }, [userId]);


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

//   const totalPages = Math.ceil(businesses.length / itemsPerPage);
//   const startIndex = (page - 1) * itemsPerPage;
//   const paginatedBusinesses = Array.isArray(businesses)
//   ? businesses.slice(startIndex, startIndex + itemsPerPage)
//   : [];


//   // Handle dialog open
//   const handleOpenDialog = (business) => {
//     setSelectedBusiness(business);
//     setFormData({ ...formData, business_id: business.business_id });
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedBusiness(null);
//     setFormData({
//       agent_id: userId,
//       business_id: "",
//       product_name: "",
//       sku: "",
//       description: "",
//       price: "",
//       selling_price: "",
//       mrp: "",
//       units: "",
//       tax_percent: "",
//       cgst_percent: "",
//       cgst_amount: "",
//       sgst_percent: "",
//       sgst_amount: "",
//       available_qty: "",
//       company_commission: "",
//       product_commission: "",
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit Product
//   const handleSubmit = async () => {
//     try {
//       const res = await fetch(`${baseurl}/products/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (res.ok) {
//         alert("Product added successfully!");
//         handleCloseDialog();
//       } else {
//         const error = await res.text();
//         alert("Failed to add product: " + error);
//       }
//     } catch (err) {
//       console.error("Error posting product:", err);
//     }
//   };

//   return (
//     <>
//       <PartnerHeader />
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Box display="flex" justifyContent="center" mb={2}>
//           <Typography variant="h2" fontWeight="bold" sx={{ textAlign: "center",mt:5 }}>
//             My Businesses
//           </Typography>
//         </Box>

//         <Box display="flex" justifyContent="flex-end" mb={3}>
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
//                           business.logo
//                             ? `${baseurl}/${business.logo}`
//                             : "/default-logo.png"
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
//                       <Box
//                         display="flex"
//                         justifyContent="space-between"
//                         alignItems="center"
//                         mb={1}
//                       >
//                         <Typography variant="h6" fontWeight="bold">
//                           {business.business_name}
//                         </Typography>

//                         {/* Add Product Button */}

//                         <Tooltip title="Add Product">
//                           <IconButton
//                             color="primary"
//                             size="small"
//                             onClick={() =>
//                               navigate("/p-addproduct", { state: { business } })
//                             }
//                           >
//                             <AddIcon />
//                           </IconButton>
//                         </Tooltip>

//                       </Box>

//                       <Chip
//                         label={business.business_type}
//                         color="primary"
//                         size="small"
//                         sx={{ mb: 1 }}
//                       />

//                       <Divider sx={{ my: 1.5 }} />

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

//                       <Box display="flex" alignItems="center" gap={1} mb={1}>
//                         <EmailIcon fontSize="small" color="primary" />
//                         <Typography variant="body2">{business.email}</Typography>
//                       </Box>

//                       <Box display="flex" alignItems="center" gap={1} mb={1}>
//                         <PhoneIcon fontSize="small" color="primary" />
//                         <Typography variant="body2">{business.phone}</Typography>
//                       </Box>

//                       {business.address && (
//                         <Box display="flex" alignItems="center" gap={1} mb={1}>
//                           <LocationOnIcon fontSize="small" color="primary" />
//                           <Typography variant="body2" color="text.secondary">
//                             {business.address}
//                           </Typography>
//                         </Box>
//                       )}

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

//                       <Tooltip title="Edit">
//                         <IconButton
//                           color="primary"
//                           onClick={() =>
//                             navigate(`/p-editbusiness/${business.business_id}`)
//                           }
//                         >
//                           <EditIcon />
//                         </IconButton>
//                       </Tooltip>

//                       <Tooltip title="Delete">
//                         <IconButton
//                           color="error"
//                           onClick={() => handleDelete(business.business_id)}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>

//             {totalPages >= 1 && (
//               <Box display="flex" justifyContent="flex-end" mt={2}>
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
  Modal,
  Button
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
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../../BaseURL/BaseURL";
import PaginationComponent from "../../../Shared/Pagination";

function ViewBusiness() {
  const userId = localStorage.getItem("user_id");
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [subscriptionPaid, setSubscriptionPaid] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch businesses
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await fetch(`${baseurl}/business/user-id/${userId}/`);
        const data = await res.json();
        setBusinesses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching businesses:", error);
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [userId]);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${baseurl}/user-subscriptions/user-id/${userId}/`);
          const latest = response.data.find(item => item.latest_status !== undefined);
          setSubscriptionPaid(latest?.latest_status === "paid");
        } catch (error) {
          console.error("Subscription fetch error:", error);
        }
      }
    };

    fetchSubscriptionStatus();
  }, [userId]);

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

  //Subscription:
  const handleAddProductClick = (business, e) => {
    e.stopPropagation();
    if (subscriptionPaid) {
      navigate("/p-addproduct", { state: { business } });
    } else {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSubscribe = () => {
    setOpenModal(false);
    navigate('/p-plans');
  };

  // Function to handle container click
  const handleContainerClick = (businessId) => {
    navigate(`/p-businessproducts/${businessId}`);
  };

  const totalPages = Math.ceil(businesses.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedBusinesses = Array.isArray(businesses)
    ? businesses.slice(startIndex, startIndex + itemsPerPage)
    : [];

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ textAlign: "center", mt: 5 }}
          >
            My Businesses
          </Typography>
        </Box>

        <Box display="flex" justifyContent="flex-end" mb={3}>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/p-addbusiness")}
          >
            + Add Business
          </button>
        </Box>


        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}
          >
            <CircularProgress />
          </Box>
        ) : businesses.length === 0 ? (
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            sx={{ mt: 5 }}
          >
            No businesses found for this user.
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {paginatedBusinesses.map((business) => (
                <Grid item xs={12} sm={6} md={4} key={business.business_id}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      boxShadow: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    {/* Clickable Content Area */}
                    <Box
                      sx={{
                        flexGrow: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => handleContainerClick(business.business_id)}
                    >
                      <Card sx={{ flexGrow: 1, border: "none", boxShadow: "none" }}>
                        {/* Offer Ribbon */}
                        {business.offer_title && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 16,
                              left: -25,
                              width: "120px",
                              transform: "rotate(-45deg)",
                              backgroundColor: "#2ECC71",
                              color: "white",
                              textAlign: "center",
                              fontSize: "12px",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              py: "3px",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              zIndex: 1,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {business.offer_title.toUpperCase()}
                          </Box>
                        )}

                        {/* Business Logo - Now clickable */}
                        {business.logo ? (
                          <CardMedia
                            component="img"
                            height="200"
                            alt={business.business_name || "Business Logo"}
                            image={
                              business.logo
                                ? `${baseurl}/${business.logo}`
                                : "/default-logo.png"
                            }
                            sx={{
                              objectFit: "contain",
                              bgcolor: "#f5f5f5"
                            }}
                          />
                        ) : (
                          <Box
                            height="160px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            bgcolor="#f5f5f5"
                          >
                            <BusinessIcon sx={{ fontSize: 60, color: "gray" }} />
                          </Box>
                        )}

                        {/* Business Info */}
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1}
                          >
                            <Typography variant="h6" fontWeight="bold">
                              {business.business_name}
                            </Typography>

                            {/* Add Product Button */}
                            {/* Add Product Button */}
                            <Tooltip title="Add Product">
                              <IconButton
                                color="primary"
                                size="small"
                                onClick={(e) => handleAddProductClick(business, e)}
                              >
                                <AddIcon />
                              </IconButton>
                            </Tooltip>

                          </Box>

                          <Chip
                            label={business.business_type}
                            color="primary"
                            size="small"
                            sx={{ mb: 1 }}
                          />

                          <Divider sx={{ my: 1.5 }} />

                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            mb={1}
                          >
                            <LanguageIcon fontSize="small" color="primary" />
                            <Link
                              href={business.website}
                              target="_blank"
                              rel="noopener"
                              underline="hover"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                window.open(business.website, '_blank', 'noopener,noreferrer');
                              }}
                            >
                              {business.website}
                            </Link>
                          </Box>

                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <EmailIcon fontSize="small" color="primary" />
                            <Typography variant="body2">{business.email}</Typography>
                          </Box>

                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <PhoneIcon fontSize="small" color="primary" />
                            <Typography variant="body2">{business.phone}</Typography>
                          </Box>

                          {business.address && (
                            <Box display="flex" alignItems="center" gap={1} mb={1}>
                              <LocationOnIcon fontSize="small" color="primary" />
                              <Typography variant="body2" color="text.secondary">
                                {business.address}
                              </Typography>
                            </Box>
                          )}

                          {business.description && (
                            <Box display="flex" alignItems="flex-start" mb={1}>
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
                      </Card>
                    </Box>

                    {/* Action Buttons - Outside the clickable area */}
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      p={1}
                      sx={{
                        backgroundColor: '#f9f9f9',
                        borderTop: '1px solid #e0e0e0'
                      }}
                    >
                      {business.documents && (
                        <Tooltip title="Download">
                          <IconButton
                            component="a"
                            href={`${baseurl}/${business.documents}`}
                            target="_blank"
                            rel="noopener"
                            color="primary"
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(`${baseurl}/${business.documents}`, '_blank', 'noopener,noreferrer');
                            }}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                      )}

                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={(e) => {
                            navigate(`/p-editbusiness/${business.business_id}`);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={(e) => {
                            handleDelete(business.business_id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {totalPages >= 1 && (
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <PaginationComponent
                  count={totalPages || 1}
                  page={page}
                  onChange={handlePageChange}
                />
              </Box>
            )}
          </>
        )}
         {/* Subscription Modal */}
<Modal open={openModal} onClose={handleCloseModal}>
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px'
  }}>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
      Subscription Required
    </Typography>
    <Typography variant="body1" sx={{ mb: 3 }}>
      You need an active subscription to <Box component="span" sx={{ fontWeight: 'bold' }}>add products</Box> to your business.
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
      <Button variant="outlined" onClick={handleCloseModal}>
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={handleSubscribe}
        sx={{ backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#5e35b1' } }}
      >
        Subscribe Now
      </Button>
    </Box>
  </Box>
</Modal>
      </Container>
    </>
  );
}

export default ViewBusiness;