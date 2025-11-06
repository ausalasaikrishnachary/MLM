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
  TextField
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

import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../../BaseURL/BaseURL";
import PaginationComponent from "../../../Shared/Pagination";
import { Pointer } from "lucide-react";

function AllBusinesses() { 
  const userId = localStorage.getItem("user_id");
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); // Added search term state

  // Pagination states
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch businesses
  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    fetch(`${baseurl}/business/`)
      .then((res) => res.json())
      .then((data) => {
        // Filter out businesses where user_id matches current userId
        const filtered = data.filter(
          (business) => String(business.user_id) !== String(userId)
        );
        setBusinesses(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error);
        setLoading(false);
      });
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

    // Filter businesses based on business_type
  const filteredBusinesses = businesses.filter(business => {
    if (!searchTerm) return true; // Show all if no search term
    
    return business.business_type?.toLowerCase().includes(searchTerm.toLowerCase());
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
      <PartnerHeader />
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

        {/* <Box display="flex" justifyContent="flex-end" mb={3}>
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
        </Box> */}

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
            No businesses found for this user.
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
                    onClick={() => navigate(`/p-businessproducts/${business.business_id}`)}
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
                          {business.offer_title.toUpperCase()}
                        </Box>
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
                        sx={{ objectFit: "contain" }}
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
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {business.business_name}
                      </Typography>

                      <Chip
                        label={business.business_type}
                        color="primary"
                        size="small"
                        sx={{ mb: 1 }}
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

                    {/* Action Buttons */}
                    <Box display="flex" justifyContent="flex-end" p={1}>
                      {/* Download Document */}
                      {business.documents && (
                        <Tooltip title="Download">
                          <IconButton
                            component="a"
                            href={`${baseurl}/${business.documents}`}
                            target="_blank"
                            rel="noopener"
                            color="primary"
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                      )}

                      {/* <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            navigate(`/p-editbusiness/${business.business_id}`)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip> */}

                      {/* <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(business.business_id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip> */}
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {/* Pagination */}
            {totalPages >= 1 && (
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <PaginationComponent
                  count={totalPages || 1} // ensure at least 1 page
                  page={page}
                  onChange={handlePageChange}
                />
              </Box>
            )}

          </>
        )}
      </Container>
    </>
  );
}

export default AllBusinesses;
