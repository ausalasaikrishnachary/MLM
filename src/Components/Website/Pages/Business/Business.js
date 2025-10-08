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

  return (
    <>
      {/* <Header /> */}
      <Box sx={{ bgcolor: "#fafbfe", minHeight: "100vh", p: { xs: 2, md: 4 }, position: "relative" }}>
        
        {/* Business Cards */}
        <Grid container spacing={3} justifyContent="flex-start">
          {businesses.length > 0 ? (
            businesses.map((biz, idx) => (
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
                  {/* Offer Ribbon - Top Left Corner */}
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
                          boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: -5,
                            left: 0,
                            width: 0,
                            height: 0,
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            borderTop: "5px solid #cc5555",
                          }
                        }}
                      >
                        {biz.offer_title}
                      </Box>
                    </Box>
                  )}

                  <CardContent sx={{ flexGrow: 1, pt: biz.offer_title ? 1 : 0 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      {biz.logo ? (
                        <img
                          src={`${baseurl}${biz.logo}`}
                          alt={`${biz.business_name} Logo`}
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "contain",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "transform 0.2s ease",
                          }}
                          onClick={() => handleLogoClick(biz)}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)";
                          }}
                        />
                      ) : (
                        <BusinessIcon fontSize="large" sx={{ color: "#4776E6" }} />
                      )}
                      <Chip
                        label={biz.is_active ? "Active" : "Inactive"}
                        color={biz.is_active ? "success" : "default"}
                        size="small"
                      />
                    </Box>

                    <Typography variant="h6" fontWeight="bold" mt={1}>
                      {biz.business_name}
                    </Typography>
                    <Typography color="primary" fontSize="0.9rem">
                      {biz.business_type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {biz.description}
                    </Typography>

                    {/* Offer Description */}
                    {biz.offer_description && (
                      <Box
                        sx={{
                          backgroundColor: "#fff9e6",
                          border: "1px solid #ffd54f",
                          borderRadius: "8px",
                          p: 1.5,
                          mt: 2,
                        }}
                      >
                        <Typography variant="body2" color="#e65100" fontWeight="medium">
                          {biz.offer_description}
                        </Typography>
                      </Box>
                    )}
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

                  {/* Buttons */}
                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    justifyContent={{ xs: "center", sm: "space-between" }}
                    alignItems={{ xs: "stretch", sm: "center" }}
                    mt={2}
                    gap={1}
                  >
                    {/* <Button
                      variant="contained"
                      fullWidth={false}
                      sx={{
                        width: { xs: "100%", sm: "auto" },
                        borderRadius: "30px",
                        px: 3,
                        background: "linear-gradient(90deg, #4776E6, #8E54E9)",
                        "&:hover": {
                          background: "linear-gradient(90deg, #3b66d9, #7a46d3)",
                        },
                      }}
                      onClick={() => handleOpen(biz)}
                    >
                      View Details
                    </Button> */}

                    <Box
                      display="flex"
                      justifyContent={{ xs: "center", sm: "flex-start" }}
                      gap={1}
                      mt={{ xs: 1, sm: 0 }}
                    >
                      <IconButton
                        sx={{ bgcolor: "#f2f2f7", "&:hover": { bgcolor: "#e1e1ec" } }}
                        onClick={() => (window.location.href = `tel:${biz.phone}`)}
                      >
                        <PhoneIcon />
                      </IconButton>
                    </Box>
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
      </Box>
    </>
  );
};

export default AdminBusiness;