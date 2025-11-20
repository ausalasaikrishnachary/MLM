import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Card, CardContent, Typography, CircularProgress, Button } from "@mui/material";
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from "../../../BaseURL/BaseURL";

const I_ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseurl}/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <Typography sx={{ mt: 5, textAlign: "center" }}>Product not found</Typography>;
  }

  return (
    <>
      <Header />

      <Box sx={{ p: 3 }}>

        {/* Back + Heading Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            position: "relative",
          }}
        >
          {/* Back Button (Left) */}
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{ position: "absolute", left: 0 }}
          >
            ← Back
          </Button>

          {/* Center Heading */}
          <Typography
            variant="h4"
            sx={{
              width: "100%",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Product Details
          </Typography>
        </Box>

        <Card sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              {product.product_name}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>SKU:</strong> {product.sku}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>Description:</strong> {product.description}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>Selling Price:</strong> ₹{product.selling_price}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>MRP:</strong> ₹{product.mrp}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>Available Qty:</strong> {product.available_qty}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>CGST:</strong> {product.cgst_percent}% — ₹{product.cgst_amount}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>SGST:</strong> {product.sgst_percent}% — ₹{product.sgst_amount}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>Company Commission:</strong> {product.company_commission}%
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>Distributor Commission:</strong> {product.distribution_commission}%
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default I_ProductDetails;
