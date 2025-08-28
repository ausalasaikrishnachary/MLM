import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import Header from "../../../Shared/Navbar/Navbar";

const sectors = [
  "All Businesses",
  "IT Services",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
];

const stats = [
  { icon: <BusinessIcon />, value: "2", label: "Total Businesses", color: "#1976d2" },
  { icon: <TrendingUpIcon />, value: "2", label: "Active Sectors", color: "#2e7d32" },
  { icon: <PeopleIcon />, value: "50K+", label: "Monthly Visitors", color: "#ed6c02" },
  { icon: <StarIcon />, value: "4.8", label: "Average Rating", color: "#9c27b0" },
];

const AdminBusiness = () => {
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businesses, setBusinesses] = useState([]);

  // 🔹 Fetch businesses from API
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get("https://shrirajteam.com:81/business/");
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

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: "#fafbfe", minHeight: "100vh", p: 4, position: "relative" }}>
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{ fontSize: { xs: "2rem", md: "3.2rem" }, lineHeight: 1.2 }}
          >
            Discover Amazing <span style={{ color: "#4776E6" }}>Businesses</span>
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            mt={2}
            maxWidth="650px"
            mx="auto"
          >
            Explore a curated directory of innovative companies and services. Find your next business partner or discover inspiring organizations.
          </Typography>

          {/* Search */}
          <Box mt={4} display="flex" justifyContent="center" alignItems="center" gap={2}>
            <TextField
              placeholder="Search businesses, services, or locations..."
              variant="outlined"
              sx={{
                width: "45%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  bgcolor: "#fff",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              sx={{
                px: 4,
                borderRadius: "30px",
                background: "linear-gradient(90deg, #4776E6, #8E54E9)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                "&:hover": {
                  background: "linear-gradient(90deg, #3b66d9, #7a46d3)",
                },
              }}
            >
              Search
            </Button>
          </Box>
        </Box>

        {/* Filter Tabs */}
        <Box display="flex" justifyContent="center" mb={6}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              "& .MuiTab-root": {
                borderRadius: "25px",
                px: 3,
                py: 1,
                m: 1,
                bgcolor: "#f9f9f9",
                textTransform: "none",
                fontWeight: 500,
                minHeight: "36px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                "&:hover": { bgcolor: "#f0f0f0" },
              },
              "& .Mui-selected": {
                background: "linear-gradient(90deg, #4776E6, #8E54E9)",
                color: "#fff !important",
                fontWeight: "bold",
              },
            }}
          >
            {sectors.map((sector) => (
              <Tab
                key={sector}
                label={sector}
                icon={<BusinessIcon fontSize="small" />}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Box>

        {/* Business Cards */}
<Grid container spacing={3} justifyContent="center" mb={10}>
  {businesses.length > 0 ? (
    businesses.map((biz, idx) => (
      <Grid item xs={12} sm={6} md={4} key={idx}>
        <Card
          sx={{
            borderRadius: "20px",
            p: 2,
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            bgcolor: "#fff",
          }}
        >
          <CardContent>
            {/* Logo or Default Icon */}
  <Box display="flex" justifyContent="space-between" alignItems="center">
  {biz.logo ? (
    <img
      src={`https://shrirajteam.com:81${biz.logo}`}   // prepend base URL
      alt={`${biz.business_name} Logo`}
      style={{
        width: 50,
        height: 50,
        objectFit: "contain",
        borderRadius: "8px",
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

            {/* Buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} gap={1}>
              <Button
                variant="contained"
                sx={{
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
              </Button>

              {/* Call Button */}
              <IconButton
                sx={{ bgcolor: "#f2f2f7", "&:hover": { bgcolor: "#e1e1ec" } }}
                onClick={() => (window.location.href = `tel:${biz.phone}`)}
              >
                <PhoneIcon />
              </IconButton>

              {/* Download Button if document exists */}
             {biz.documents && (
  <IconButton
    sx={{ bgcolor: "#f2f2f7", "&:hover": { bgcolor: "#e1e1ec" } }}
    onClick={() => window.open(`https://shrirajteam.com:81${biz.documents}`, "_blank")}
  >
    ⬇️
  </IconButton>
)}

            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))
  ) : (
    <Typography variant="body1" color="text.secondary" mt={4}>
      No businesses found.
    </Typography>
  )}
</Grid>


        {/* Platform Stats */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 5 }}>
            Platform Statistics
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Card
                  sx={{
                    borderRadius: "20px",
                    textAlign: "center",
                    p: 4,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                    bgcolor: "#fff",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      mx: "auto",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: stat.color,
                      color: "#fff",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    }}
                  >
                    {React.cloneElement(stat.icon, { fontSize: "medium" })}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1, color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Business Details Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: { borderRadius: "20px", p: 2 } }}
        >
          {selectedBusiness && (
            <DialogContent>
              {/* Header */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={2}>
                  <BusinessIcon
                    sx={{
                      fontSize: 40,
                      p: 1,
                      borderRadius: "12px",
                      bgcolor: "#f0f0f5",
                      color: "#4776E6",
                    }}
                  />
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

              {/* About */}
              <Typography variant="subtitle1" fontWeight="bold">
                About
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {selectedBusiness.description}
              </Typography>

              {/* Contact Info + Location */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Contact Information
                  </Typography>
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
                    <a
                      href={selectedBusiness.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#1976d2", fontSize: "0.9rem" }}
                    >
                      {selectedBusiness.website}
                    </a>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Location
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <LocationOnIcon color="error" fontSize="small" />
                    <Typography variant="body2">{selectedBusiness.address}</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Footer Buttons */}
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  variant="contained"
                  startIcon={<EmailIcon />}
                  sx={{
                    background: "linear-gradient(90deg, #4776E6, #8E54E9)",
                    borderRadius: "30px",
                    px: 3,
                    "&:hover": {
                      background: "linear-gradient(90deg, #3b66d9, #7a46d3)",
                    },
                  }}
                >
                  Contact Business
                </Button>
                <Button variant="outlined" startIcon={<ShareIcon />} sx={{ borderRadius: "30px" }}>
                  Share
                </Button>
              </Box>
            </DialogContent>
          )}
        </Dialog>
      </Box>
    </>
  );
};

export default AdminBusiness;
