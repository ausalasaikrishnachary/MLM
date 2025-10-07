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
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from "../../../BaseURL/BaseURL"; // ✅ import baseurl

const AdminBusiness = () => {
  const [open, setOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(`${baseurl}/business/`); // ✅ replaced baseurl
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
      {/* <Header /> */}
      <Box sx={{ bgcolor: "#fafbfe", minHeight: "100vh", p: { xs: 2, md: 4 }, position: "relative" }}>
        
        {/* Business Cards */}
        <Grid container spacing={3} justifyContent="flex-start"> {/* ✅ spacing=3 adds middle gap */}
          {businesses.length > 0 ? (
            businesses.map((biz, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx} sx={{ display: "flex" }}> {/* left aligned */}
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
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      {biz.logo ? (
                        <img
                          src={`${baseurl}${biz.logo}`} // ✅ replaced baseurl
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
                    <Button
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
                    </Button>

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

                      {/* {biz.documents && (
                        <IconButton
                          sx={{ bgcolor: "#f2f2f7", "&:hover": { bgcolor: "#e1e1ec" } }}
                          onClick={() =>
                            window.open(`${baseurl}${biz.documents}`, "_blank") // ✅ replaced baseurl
                          }
                        >
                          ⬇️
                        </IconButton>
                      )} */}
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
                  <BusinessIcon
                    sx={{ fontSize: 40, p: 1, borderRadius: "12px", bgcolor: "#f0f0f5", color: "#4776E6" }}
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

              <Typography variant="subtitle1" fontWeight="bold">About</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {selectedBusiness.description}
              </Typography>

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

              {/* <Box display="flex" justifyContent="space-between" mt={2} flexWrap="wrap" gap={1}>
                <Button variant="contained" startIcon={<EmailIcon />} sx={{ background: "linear-gradient(90deg, #4776E6, #8E54E9)", borderRadius: "30px", px: 3, "&:hover": { background: "linear-gradient(90deg, #3b66d9, #7a46d3)" } }}>
                  Contact Business
                </Button>
                <Button variant="outlined" startIcon={<ShareIcon />} sx={{ borderRadius: "30px" }}>Share</Button>
              </Box> */}
            </DialogContent>
          )}
        </Dialog>
      </Box>
    </>
  );
};

export default AdminBusiness;
