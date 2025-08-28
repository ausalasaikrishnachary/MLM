import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Container,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AddBusiness() {
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: userId,
    business_name: "",
    business_type: "",
    description: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    logo: null,
    documents: null,
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload;

      // If user uploaded logo or documents → use FormData
      if (formData.logo || formData.documents) {
        payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== null) {
            payload.append(key, value);
          }
        });

        await axios.post("https://shrirajteam.com:81/business/", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Otherwise → send as JSON
        const { logo, documents, ...jsonData } = formData;
        await axios.post("https://shrirajteam.com:81/business/", jsonData, {
          headers: { "Content-Type": "application/json" },
        });
      }

      alert("Business added successfully!");
      navigate("/p-viewbusiness");
    } catch (error) {
      console.error("Error while adding business:", error.response?.data || error.message);
      alert("Failed to add business. Check console for details.");
    }
  };


  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ textAlign: "center" }}
          >
            My Businesses
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Business Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Business Name"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Business Type"
                name="business_type"
                value={formData.business_type}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                type="email"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    color="primary"
                  />
                }
                label="Active"
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* File Uploads */}
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
              >
                Upload Logo
                <input
                  type="file"
                  hidden
                  name="logo"
                  onChange={handleFileChange}
                />
              </Button>
              {formData.logo && <Typography mt={1}>{formData.logo.name}</Typography>}
            </Grid>

            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
              >
                Upload Documents
                <input
                  type="file"
                  hidden
                  name="documents"
                  onChange={handleFileChange}
                />
              </Button>
              {formData.documents && <Typography mt={1}>{formData.documents.name}</Typography>}
            </Grid>


          </Grid>

          <Box textAlign="center" mt={4}>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#1A0033", px: 5, py: 1.5 }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default AddBusiness;
