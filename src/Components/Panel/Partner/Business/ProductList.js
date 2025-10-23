import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { baseurl } from "../../../BaseURL/BaseURL";

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { businessId } = location.state || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("BusinessId from state:", businessId);

  useEffect(() => {
    if (!businessId) return;

    fetch(`${baseurl}/products/`)
      .then((res) => res.json())
      .then((data) => {
        // Filter products for this business
        const filtered = data.filter(
          (product) => String(product.business_id) === String(businessId)
        );
        setProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [businessId]);

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Products
          </Typography>
        
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : products.length === 0 ? (
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            sx={{ mt: 5 }}
          >
            No products found for this business.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ borderRadius: 3, boxShadow: 4, height: "100%", display: "flex", flexDirection: "column" }}>
                  {product.product_image ? (
                    <CardMedia
                      component="img"
                      alt={product.product_name}
                      image={`${baseurl}/${product.product_image}`}
                      sx={{ height: 180, objectFit: "cover" }}
                    />
                  ) : (
                    <Box
                      height="180px"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      bgcolor="#f5f5f5"
                    >
                      <Typography color="text.secondary">No Image</Typography>
                    </Box>
                  )}

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {product.product_name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      SKU: {product.sku || "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ₹{product.price || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Selling Price: ₹{product.selling_price || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      MRP: ₹{product.mrp || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Units: {product.units || "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Available Qty: {product.available_qty || 0}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Typography variant="body2" color="text.secondary">
                      Tax: {product.tax_percent || 0}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      CGST: {product.cgst_percent || 0}% | Amount: ₹{product.cgst_amount || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      SGST: {product.sgst_percent || 0}% | Amount: ₹{product.sgst_amount || 0}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Company Commission: {product.company_commission || 0}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Product Commission: {product.product_commission || 0}%
                    </Typography>

                    {product.description && (
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        {product.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ProductList;
