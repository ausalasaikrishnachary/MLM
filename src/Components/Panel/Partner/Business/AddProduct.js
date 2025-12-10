import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { baseurl } from "../../../BaseURL/BaseURL";
import axios from "axios";

const AddProduct = () => {
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const location = useLocation();
  const { business, editMode, productData } = location.state || {};

  const [offers, setOffers] = useState([]); // State to store offers
  const [loading, setLoading] = useState(true);

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
    // tax_percent: "",
    // cgst_percent: "",
    // cgst_amount: "",
    // sgst_percent: "",
    // sgst_amount: "",
    // available_qty: "",
    // company_commission: "",
    // product_commission: "",
    offer_id: "", // Changed from discount_percent to offer_id
    product_image: null,
  });

  // Fetch offers from API
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseurl}/offers/`);
        console.log('Fetched offers:', response.data);
        
        // Filter only active offers if needed
        const activeOffers = response.data.filter(offer => offer.is_active === true);
        setOffers(activeOffers);
      } catch (error) {
        console.error('Error fetching offers:', error);
        alert('Failed to load offers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Pre-fill form if in edit mode
  useEffect(() => {
    if (editMode && productData) {
      setFormData({
        agent_id: userId,
        business_id: productData.business_id || business?.business_id || "",
        product_name: productData.product_name || "",
        sku: productData.sku || "",
        description: productData.description || "",
        price: productData.distribution_commission || "", // Assuming distribution_commission is the price
        selling_price: productData.selling_price || "",
        mrp: productData.mrp || "",
        units: productData.units || "",
        offer_id: productData.offer_id || "", // Use offer_id instead of discount_percent
        product_image: null,
      });
    }
  }, [editMode, productData, business, userId]);

  // Format offer display text
  const getOfferDisplayText = (offer) => {
    if (!offer) return '';
    
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const [day, month, year] = dateString.split('-');
      return `${day}/${month}/${year}`;
    };

    const getOfferTypeDisplay = (type) => {
      const types = {
        'discount_percent': 'Discount %',
        'discount_flat': 'Flat Discount',
        'buy_x_get_y': 'Buy X Get Y',
        'free_gift': 'Free Gift'
      };
      return types[type] || type;
    };

    const formatOfferValue = (offer) => {
      switch(offer.offer_type) {
        case 'discount_percent':
          return `${offer.value}%`;
        case 'discount_flat':
          return `₹${offer.value}`;
        case 'buy_x_get_y':
          return `Buy ${offer.x_quantity} Get ${offer.y_quantity}`;
        case 'free_gift':
          return offer.description || 'Free Gift';
        default:
          return offer.value || '';
      }
    };

    const offerValue = formatOfferValue(offer);
    const offerType = getOfferTypeDisplay(offer.offer_type);
    const startDate = formatDate(offer.start_date);
    const endDate = formatDate(offer.end_date);
    
    return `${offerType}`;
  };

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
        if (value !== null && value !== "") {
          payload.append(key, value);
        }
      });

      let res;
      if (editMode && productData) {
        // Update existing product
        res = await fetch(`${baseurl}/products/${productData.id}/`, {
          method: "PUT",
          body: payload,
        });
      } else {
        // Create new product
        res = await fetch(`${baseurl}/products/`, {
          method: "POST",
          body: payload,
        });
      }

      if (res.ok) {
        alert(`✅ Product ${editMode ? 'updated' : 'added'} successfully!`);
        navigate(`/p-businessproducts/${business?.business_id || productData?.business_id}`);
      } else {
        const error = await res.text();
        alert(`❌ Failed to ${editMode ? 'update' : 'add'} product: ` + error);
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
            {editMode ? 'Edit' : 'Add'} Product {business?.business_name ? `For ${business.business_name}` : ''}
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

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Available Quantity"
                name="units"
                value={formData.units}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Offer Selection */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="offer-select-label">Select Offer</InputLabel>
                <Select
                  labelId="offer-select-label"
                  id="offer_id"
                  name="offer_id"
                  value={formData.offer_id}
                  onChange={handleChange}
                  label="Select Offer"
                >
                  <MenuItem value="">
                    <em>No Offer</em>
                  </MenuItem>
                  {loading ? (
                    <MenuItem value="" disabled>
                      Loading offers...
                    </MenuItem>
                  ) : offers.length > 0 ? (
                    offers.map((offer) => (
                      <MenuItem key={offer.id} value={offer.id}>
                        {getOfferDisplayText(offer)}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No active offers available
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                Select an offer to apply to this product
              </Typography>
            </Grid>

            {/* Product Image Upload */}
            <Grid item xs={12} md={4}>
              <Button variant="outlined" component="label" fullWidth>
                {editMode ? 'Update Product Image' : 'Upload Product Image'}
                <input
                  type="file"
                  name="product_image"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {formData.product_image ? (
                <Typography mt={1}>{formData.product_image.name}</Typography>
              ) : editMode && productData?.product_image ? (
                <Typography mt={1} variant="body2">
                  Current: {productData.product_image.split('/').pop()}
                </Typography>
              ) : null}
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" gap={2} mt={4}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(`/p-businessproducts/${business?.business_id || productData?.business_id}`)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#1A0033", px: 5, py: 1.2 }}
            >
              {editMode ? 'Update Product' : 'Submit'}
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default AddProduct;