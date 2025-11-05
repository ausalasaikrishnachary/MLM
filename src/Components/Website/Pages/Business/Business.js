import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  Divider,
  Pagination,
  TextField,
  Dialog as LogoDialog,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from "../../../BaseURL/BaseURL";

const AdminBusiness = () => {
  const [open, setOpen] = useState(false); 
  const [logoOpen, setLogoOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Added search term state

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(`${baseurl}/business/`);
        setBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };
    fetchBusinesses();
  }, []);

  const handleOpen = (biz) => {
    setSelectedBusiness(biz);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBusiness(null);
  };

  const handleLogoClick = (biz) => {
    setSelectedLogo(biz);
    setLogoOpen(true);
  };

  const handleLogoClose = () => {
    setLogoOpen(false);
    setSelectedLogo(null);
  };

   // Filter businesses based on business_type
  const filteredBusinesses = businesses.filter(business => {
    if (!searchTerm) return true; // Show all if no search term
    
    return business.business_type?.toLowerCase().includes(searchTerm.toLowerCase());
  });

   const [page, setPage] = useState(1); // current page
  const [rowsPerPage] = useState(6); // businesses per page

  const totalPages = Math.ceil(filteredBusinesses.length / rowsPerPage);
  const paginatedBusinesses = filteredBusinesses.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

const handlePageChange = (event, value) => {
  setPage(value);
};

  return (
    <>
      {/* <Header /> */}
      <Box sx={{ bgcolor: "#fafbfe", minHeight: "100vh", p: { xs: 2, md: 4 }, position: "relative" }}>

         {/* Search Bar */}
        <Box sx={{ mb: 3, maxWidth: 400 }}>
          <TextField
            fullWidth
            label="Search by business category or type..."
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
        
        {/* Business Cards */}
      <Grid container spacing={3} justifyContent="flex-start">
        {paginatedBusinesses.length > 0 ? (
          paginatedBusinesses.map((biz, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx} sx={{ display: "flex" }}>
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
                }}
              >
                {/* Offer Ribbon */}
                {biz.offer_title && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -5,
                      left: -5,
                      zIndex: 1,
                      transform: "rotate(-5deg)",
                    }}
                  >
                    <Box
                      sx={{
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
                      {biz.offer_title}
                    </Box>
                  </Box>
                )}

                {/* Card Content */}
                <CardContent sx={{ flexGrow: 1, pt: biz.offer_title ? 1 : 0 }}>
                  {/* Image with Active Chip */}
                  <Box sx={{ position: "relative" }}>
                    <Chip
                      label={biz.is_active ? "Active" : "Inactive"}
                      color={biz.is_active ? "success" : "default"}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 20,
                        right: 10,
                        zIndex: 2,
                        fontWeight: "bold",
                      }}
                    />
                    {biz.logo ? (
                      <img
                        src={`${baseurl}${biz.logo}`}
                        alt={`${biz.business_name} Logo`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "transform 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                      />
                    ) : (
                      <BusinessIcon fontSize="large" sx={{ color: "#4776E6" }} />
                    )}
                  </Box>

                  {/* Business Info */}
                  <Typography variant="h6" fontWeight="bold" mt={1}>
                    {biz.business_name}
                  </Typography>
                  <Typography color="primary" fontSize="0.9rem">
                    {biz.business_type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {biz.description}
                  </Typography>

                  {/* Contact Info */}
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <EmailIcon color="primary" fontSize="small" />
                    <Typography variant="body2">{biz.email}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <PhoneIcon color="success" fontSize="small" />
                    <Typography variant="body2">{biz.phone}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={2} gap={1}>
                    <LocationOnIcon fontSize="small" color="error" />
                    <Typography variant="body2">{biz.address}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1} gap={1}>
                    <LanguageIcon fontSize="small" color="primary" />
                    <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                      {biz.website}
                    </Typography>
                  </Box>
                </CardContent>

                {/* Phone Icon Button */}
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  mt={2}
                >
                  <IconButton
                    sx={{ bgcolor: "#f2f2f7", "&:hover": { bgcolor: "#e1e1ec" } }}
                    onClick={() => (window.location.href = `tel:${biz.phone}`)}
                  >
                    <PhoneIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" mt={4}>
            No businesses found.
          </Typography>
        )}
      </Grid>

        {/* Business Details Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "20px", p: 2 } }}>
          {selectedBusiness && (
            <DialogContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <Box display="flex" alignItems="center" gap={2}>
                  {selectedBusiness.logo ? (
                    <img
                      src={`${baseurl}${selectedBusiness.logo}`}
                      alt={`${selectedBusiness.business_name} Logo`}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "contain",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleClose();
                        handleLogoClick(selectedBusiness);
                      }}
                    />
                  ) : (
                    <BusinessIcon
                      sx={{ fontSize: 40, p: 1, borderRadius: "12px", bgcolor: "#f0f0f5", color: "#4776E6" }}
                    />
                  )}
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {selectedBusiness.business_name}
                    </Typography>
                    <Typography color="#4776E6">{selectedBusiness.business_type}</Typography>
                  </Box>
                </Box>
                <Chip label={selectedBusiness.is_active ? "Active" : "Inactive"} color="success" />
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Offer in Dialog */}
              {selectedBusiness.offer_title && (
                <Box
                  sx={{
                    backgroundColor: "#ff6b6b",
                    color: "white",
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    borderRadius: "12px",
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    {selectedBusiness.offer_title}
                  </Typography>
                </Box>
              )}

              <Typography variant="subtitle1" fontWeight="bold">About</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {selectedBusiness.description}
              </Typography>

              {/* Offer Description in Dialog */}
              {selectedBusiness.offer_description && (
                <>
                  <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                    Special Offer
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {selectedBusiness.offer_description}
                  </Typography>
                </>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Contact Information</Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <EmailIcon color="primary" fontSize="small" />
                    <Typography variant="body2">{selectedBusiness.email}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <PhoneIcon color="success" fontSize="small" />
                    <Typography variant="body2">{selectedBusiness.phone}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <LanguageIcon color="secondary" fontSize="small" />
                    <a href={selectedBusiness.website} target="_blank" rel="noopener noreferrer" style={{ color: "#1976d2", fontSize: "0.9rem" }}>
                      {selectedBusiness.website}
                    </a>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Location</Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <LocationOnIcon color="error" fontSize="small" />
                    <Typography variant="body2">{selectedBusiness.address}</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />
            </DialogContent>
          )}
        </Dialog>

        {/* Logo Popup Dialog */}
        <LogoDialog
          open={logoOpen}
          onClose={handleLogoClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
              overflow: "hidden",
              maxWidth: "90vw",
              maxHeight: "90vh",
            }
          }}
        >
          {selectedLogo && (
            <Box sx={{ position: "relative" }}>
              {/* Close Button */}
              <IconButton
                onClick={handleLogoClose}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.7)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Logo Image */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 4,
                  backgroundColor: "#f5f5f5",
                  minHeight: "400px",
                }}
              >
                <img
                  src={`${baseurl}${selectedLogo.logo}`}
                  alt={`${selectedLogo.business_name} Logo`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "70vh",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
                
                {/* Business Name */}
                <Typography
                  variant="h6"
                  sx={{
                    mt: 2,
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {selectedLogo.business_name}
                </Typography>
                
                {/* Business Type */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    textAlign: "center",
                  }}
                >
                  {selectedLogo.business_type}
                </Typography>
              </Box>
            </Box>
          )}
        </LogoDialog>
           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, mb: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      </Box>
        
    </>
    
  );
};

export default AdminBusiness;