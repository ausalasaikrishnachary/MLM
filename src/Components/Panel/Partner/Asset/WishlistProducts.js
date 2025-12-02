// src/Pages/Partner/Wishlist/WishlistProducts.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Divider,
  Popover,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PaginationComponent from "../../../Shared/Pagination";
import { baseurl } from "../../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";

const WishlistProducts = () => {
  const userId = localStorage.getItem("user_id");

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [page, setPage] = useState(1);

  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const navigate = useNavigate();
  const itemsPerPage = 6;

  // -----------------------------
  // FETCH WISHLISTED PRODUCTS
  // -----------------------------
  useEffect(() => {
    const loadWishlistProducts = async () => {
      try {
        const wishlistRes = await axios.get(`${baseurl}/wishlist/`);
        const userWishlist = wishlistRes.data.filter(
          (w) => w.user === parseInt(userId) && w.product !== null
        );

        const productIds = userWishlist.map((w) => w.product);
        setWishlist(productIds);

        // Fetch all products
        const productsRes = await axios.get(`${baseurl}/products/`);
        setAllProducts(productsRes.data);

        // Filter only wishlisted products
        const matched = productsRes.data.filter((p) =>
          productIds.includes(p.id)
        );
        setProducts(matched);
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
      }
    };

    if (userId) loadWishlistProducts();
  }, [userId]);

  // -----------------------------
  // FETCH COMMISSIONS
  // -----------------------------
  useEffect(() => {
    axios
      .get(`${baseurl}/commissions-master/`)
      .then((res) => setCommissions(res.data))
      .catch((err) => console.log(err));
  }, []);

  // -----------------------------
  // WISHLIST TOGGLE
  // -----------------------------
  const handleWishlistToggle = async (productId) => {
    try {
      if (wishlist.includes(productId)) {
        const all = await axios.get(`${baseurl}/wishlist/`);
        const item = all.data.find(
          (i) => i.user === parseInt(userId) && i.product === productId
        );
        if (item) await axios.delete(`${baseurl}/wishlist/${item.id}/`);

        setWishlist((prev) => prev.filter((id) => id !== productId));
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } else {
        await axios.post(`${baseurl}/wishlist/`, {
          user: parseInt(userId),
          product: productId,
        });
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.log("Error wishlist toggle:", error);
    }
  };

  // -----------------------------
  // PAGINATION
  // -----------------------------
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginated = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // -----------------------------
  // POPOVER
  // -----------------------------
  const handlePopoverOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setHoveredProduct(id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setHoveredProduct(null);
  };

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {paginated.map((product) => (
          <Grid item xs={12} md={4} key={product.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              {product.product_image ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={`${baseurl}/${product.product_image}`}
                  alt={product.product_name}
                />
              ) : (
                <Box height="200px" display="flex" alignItems="center" justifyContent="center" bgcolor="#f2f2f2">
                  No Image
                </Box>
              )}

              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{product.product_name}</Typography>

                  <IconButton onClick={() => handleWishlistToggle(product.id)}>
                    {wishlist.includes(product.id) ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "red" }} />
                    )}
                  </IconButton>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Typography><b>Selling:</b> ₹{product.selling_price}</Typography>
                <Typography><b>MRP:</b> ₹{product.mrp}</Typography>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, background: "green", color: "white" }}
                  onClick={() => navigate(`/product-details/${product.id}`)}
                >
                  View Details
                </Button>

                <Button
                  onMouseEnter={(e) => handlePopoverOpen(e, product.id)}
                  onMouseLeave={handlePopoverClose}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1 }}
                >
                  Payout
                </Button>

                <Popover
                  open={hoveredProduct === product.id}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                  <Box p={2}>
                    <Typography fontWeight="bold">Commissions</Typography>
                    {commissions.map((c) => (
                      <Typography key={c.id}>
                        Team {c.level_no}: ₹
                        {(
                          (c.percentage * product.distribution_commission) /
                          100
                        ).toFixed(2)}
                      </Typography>
                    ))}
                  </Box>
                </Popover>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {products.length > 0 && (
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <PaginationComponent
            page={page}
            count={totalPages}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
      )}
    </>
  );
};

export default WishlistProducts;
