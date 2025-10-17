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

function BusinessProducts() {
  const { id } = useParams(); // get business_id from URL
  const [products, setProducts] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    fetch(`${baseurl}/products/`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (item) => String(item.business_id) === String(id)
        );
        setProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await axios.get(`${baseurl}/commissions-master/`);
        setCommissions(response.data); // assuming response.data is an array
      } catch (error) {
        console.error("Error fetching commissions:", error);
      }
    };

    fetchCommissions();
  }, []);

  const handlePopoverOpen = (event, productId) => {
    setAnchorEl(event.currentTarget);
    setHoveredProduct(productId);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setHoveredProduct(null);
  };

  const open = Boolean(anchorEl);

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
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
{/* 
                    <Typography variant="body2" color="text.secondary">
                      <strong>Agent:</strong> {product.agent_name || "N/A"}
                    </Typography> */}

                    {/* <Typography variant="body2" color="text.secondary">
                      <strong>SKU:</strong> {product.sku || "N/A"}
                    </Typography> */}

                    <Divider sx={{ my: 1.5 }} />

                    <Typography variant="body2">
                      <strong>Selling Price:</strong> ₹{product.selling_price}
                    </Typography>
                    <Typography variant="body2">
                      <strong>MRP:</strong> ₹{product.mrp}
                    </Typography>

                    {/* <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Units:</strong> {product.units}
                    </Typography> */}

                    {/* <Divider sx={{ my: 1.5 }} />

                    <Typography variant="body2">
                      <strong>Tax %:</strong> {product.tax_percent}%
                    </Typography>
                    <Typography variant="body2">
                      <strong>CGST %:</strong> {product.cgst_percent}% (
                      ₹{product.cgst_amount})
                    </Typography>
                    <Typography variant="body2">
                      <strong>SGST %:</strong> {product.sgst_percent}% (
                      ₹{product.sgst_amount})
                    </Typography> */}

                    <Divider sx={{ my: 1.5 }} />

                    {/* <Typography variant="body2">
                      <strong>Available Qty:</strong> {product.available_qty}
                    </Typography> */}

                    {/* <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Company Commission:</strong> ₹
                      {product.company_commission}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Product Commission:</strong> ₹
                      {product.product_commission}
                    </Typography> */}

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
                        onMouseEnter={(e) =>
                          handlePopoverOpen(e, product.id)
                        }
                        onMouseLeave={handlePopoverClose}
                        fullWidth
                        variant="contained"
                        sx={{
                          color: "white",
                          textTransform: "none",
                          "&:hover": { color: "rgb(5,5,5)" },
                          marginBottom: "9px",
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
                                  product.distribution_commission) /
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
      </Container>
    </>
  );
}

export default BusinessProducts;
