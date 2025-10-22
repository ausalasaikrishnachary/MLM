import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  CircularProgress,
  Divider,
  Button,
  Popover,
} from "@mui/material";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { baseurl } from "../../../BaseURL/BaseURL";
import PaginationComponent from "../../../Shared/Pagination";

function BusinessProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // ✅ Fetch Products by Business ID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseurl}/products/`);
        const data = await res.json();
        const filtered = data.filter(
          (item) => String(item.business_id) === String(id)
        );
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  // ✅ Fetch Commission Master
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

  // ✅ Popover Handlers
  const handlePopoverOpen = (event, productId) => {
    setAnchorEl(event.currentTarget);
    setHoveredProduct(productId);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setHoveredProduct(null);
  };

  const open = Boolean(anchorEl);

  // ✅ Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Products for Business
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : products.length === 0 ? (
          <Typography align="center" sx={{ mt: 5 }} color="text.secondary">
            No products found for this business.
          </Typography>
        ) : (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {paginatedProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={product.id || index}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Product Image */}
                  {product.product_image ? (
                    <CardMedia
                      component="img"
                      alt={product.product_name}
                      height="200"
                      image={`${baseurl}${product.product_image}`}
                      sx={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Box
                      height="200px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bgcolor="#f5f5f5"
                    >
                      <Typography color="text.secondary">No Image</Typography>
                    </Box>
                  )}

                  {/* Product Info */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {product.product_name}
                    </Typography>

                    <Divider sx={{ my: 1.5 }} />

                    <Typography variant="body2">
                      <strong>Selling Price:</strong> ₹{product.selling_price}
                    </Typography>
                    <Typography variant="body2">
                      <strong>MRP:</strong> ₹{product.mrp}
                    </Typography>

                    <Divider sx={{ my: 1.5 }} />

                    {product.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        <strong>Description:</strong> {product.description}
                      </Typography>
                    )}

                    {/* ✅ Payout Button with Hover Popover */}
                    <Box sx={{ mt: 2 }}>
                      <Button
                        onMouseEnter={(e) => handlePopoverOpen(e, product.id)}
                        onMouseLeave={handlePopoverClose}
                        fullWidth
                        variant="contained"
                        sx={{
                          color: "white",
                          textTransform: "none",
                          "&:hover": { color: "rgb(5,5,5)" },
                          mb: 1,
                        }}
                      >
                        Payout
                      </Button>

                      <Popover
                        id="mouse-over-popover"
                        sx={{ pointerEvents: "none" }}
                        open={open && hoveredProduct === product.id}
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
                        <Box sx={{ p: 2 }}>
                          <Typography fontWeight="bold">Commissions</Typography>
                          {commissions.length > 0 ? (
                            commissions.map((c) => {
                              const amount =
                                (parseFloat(c.percentage) *
                                  (product.distribution_commission || 0)) /
                                100;
                              return (
                                <Typography key={c.id} variant="body2">
                                  Team {c.level_no}: ₹
                                  {amount.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                  })}
                                </Typography>
                              );
                            })
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              No commission data
                            </Typography>
                          )}
                        </Box>
                      </Popover>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {products.length > 0 && (
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <PaginationComponent
              count={totalPages > 0 ? totalPages : 1}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        )}
      </Container>
    </>
  );
}

export default BusinessProducts;
