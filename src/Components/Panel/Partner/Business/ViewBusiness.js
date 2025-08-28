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
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

function ViewBusiness() {
  const userId = localStorage.getItem("user_id");
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://shrirajteam.com:81/business/")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (business) => String(business.user_id) === String("11")
        );
        setBusinesses(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error);
        setLoading(false);
      });
  }, [userId]);

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          fontWeight="bold"
          sx={{ textAlign: "center", mb: 3 }}
        >
          My Businesses
        </Typography>

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
          <Grid container spacing={3}>
            {businesses.map((business) => (
              <Grid item xs={12} sm={6} md={4} key={business.business_id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Business Logo */}
                  {business.logo ? (
                    <CardMedia
                      component="img"
                      alt={business.business_name || "Business Logo"}
                      // height="160"
                      // borderRadius="10px"
                      image={business.logo ? `https://shrirajteam.com:81/${business.logo}` : "/default-logo.png"}
                      sx={{ objectFit: "contain", p: 2 }}
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

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {business.description}
                    </Typography>

                    <Divider sx={{ my: 1.5 }} />

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

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <EmailIcon fontSize="small" color="primary" />
                      <Typography variant="body2">{business.email}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <PhoneIcon fontSize="small" color="primary" />
                      <Typography variant="body2">{business.phone}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationOnIcon fontSize="small" color="primary" />
                      <Typography variant="body2">{business.address}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default ViewBusiness;
