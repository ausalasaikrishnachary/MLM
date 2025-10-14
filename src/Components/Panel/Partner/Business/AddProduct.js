import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { baseurl } from "../../../BaseURL/BaseURL";

const AddProduct = () => {
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const location = useLocation();
  const { business } = location.state || {}; // passed from ViewBusiness

  const [formData, setFormData] = useState({
    agent_id: userId,
    business_id: business?.business_id || "",
    product_name: "",
    sku: "",
    description: "",
    price: "",
    selling_price: "",
    mrp: "",
    units: "",
    tax_percent: "",
    cgst_percent: "",
    cgst_amount: "",
    sgst_percent: "",
    sgst_amount: "",
    available_qty: "",
    company_commission: "",
    product_commission: "",
    product_image: null,
  });

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") payload.append(key, value);
      });

      const res = await fetch(`${baseurl}/products/`, {
        method: "POST",
        body: payload,
      });

      if (res.ok) {
        alert("✅ Product added successfully!");
        navigate("/p-viewbusiness");
      } else {
        const error = await res.text();
        alert("❌ Failed to add product: " + error);
      }
    } catch (err) {
      console.error("Error posting product:", err);
    }
  };

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Typography variant="h2" fontWeight="bold" textAlign="center">
            Add Product For {business?.business_name || "N/A"}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Product Info */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Product Name"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Pricing */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Selling Price"
                name="selling_price"
                value={formData.selling_price}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="MRP"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Tax */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Units"
                name="units"
                value={formData.units}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Tax (%)"
                name="tax_percent"
                value={formData.tax_percent}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* GST */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="CGST (%)"
                name="cgst_percent"
                value={formData.cgst_percent}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="CGST Amount"
                name="cgst_amount"
                value={formData.cgst_amount}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="SGST (%)"
                name="sgst_percent"
                value={formData.sgst_percent}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="SGST Amount"
                name="sgst_amount"
                value={formData.sgst_amount}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Quantity & Commissions */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Available Quantity"
                name="available_qty"
                value={formData.available_qty}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Company Commission (%)"
                name="company_commission"
                value={formData.company_commission}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Product Commission (%)"
                name="product_commission"
                value={formData.product_commission}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Product Image Upload */}
            <Grid item xs={12} md={4}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Product Image
                <input
                  type="file"
                  name="product_image"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {formData.product_image && (
                <Typography mt={1}>{formData.product_image.name}</Typography>
              )}
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" gap={2} mt={4}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/p-viewbusiness")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#1A0033", px: 5, py: 1.2 }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default AddProduct;
