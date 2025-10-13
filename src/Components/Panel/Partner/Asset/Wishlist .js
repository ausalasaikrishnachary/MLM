import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import axios from "axios";
import { baseurl } from "../../../BaseURL/BaseURL";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

const Wishlist = () => {
  const userId = localStorage.getItem("user_id");
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistRes = await axios.get(`${baseurl}/wishlist/`);
        const userWishlist = wishlistRes.data.filter(item => item.user === parseInt(userId));

        const propertyIds = userWishlist.map(item => item.property);
        const propertiesRes = await axios.get(`${baseurl}/properties/approval-status/approved/`);

        const wishlistedProperties = propertiesRes.data.filter(p => propertyIds.includes(p.property_id));
        setWishlistItems(wishlistedProperties);
      } catch (err) {
        console.error("Error loading wishlist:", err);
      }
    };
    if (userId) fetchWishlist();
  }, [userId]);

  return (
    <>
      <PartnerHeader />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" textAlign="center" mb={3}>
          My Wishlist ❤️
        </Typography>
        <Grid container spacing={3}>
          {wishlistItems.length > 0 ? (
            wishlistItems.map(property => (
              <Grid item xs={12} md={4} key={property.property_id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="220"
                    image={`${baseurl}${property.images?.[0]?.image || "/default.jpg"}`}
                    alt={property.property_title}
                  />
                  <CardContent>
                    <Typography fontWeight="bold">{property.property_title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.city}, {property.state}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{property.total_property_value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ width: "100%", textAlign: "center", mt: 5 }}>
              <Typography color="text.secondary">No wishlisted properties yet.</Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Wishlist;
