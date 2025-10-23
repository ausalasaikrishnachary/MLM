import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../../../BaseURL/BaseURL";

function EditSitevisit() {
  const navigate = useNavigate();
  const { id } = useParams(); // get site visit ID from URL
  const agentId = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    user_id: agentId,
    site_name: "",
    site_owner_name: "",
    site_owner_mobile_number: "",
    site_owner_email: "",
    site_location: "",
    customer_name: "",
    customer_mobile_number: "",
    remarks: "",
    site_photo: null,
  });

  // Fetch existing site visit data
  const fetchSiteVisit = async () => {
    try {
      const response = await axios.get(`${baseurl}/site-visits/${id}/`);
      const data = response.data;
      setFormData({
        date: data.date || "",
        time: data.time || "",
        user_id: agentId,
        site_name: data.site_name || "",
        site_owner_name: data.site_owner_name || "",
        site_owner_mobile_number: data.site_owner_mobile_number || "",
        site_owner_email: data.site_owner_email || "",
        site_location: data.site_location || "",
        customer_name: data.customer_name || "",
        customer_mobile_number: data.customer_mobile_number || "",
        remarks: data.remarks || "",
        site_photo: null, // keep null initially, user can re-upload
      });
    } catch (error) {
      console.error("Error fetching site visit:", error);
      alert("Failed to fetch site visit data");
    }
  };

  useEffect(() => {
    fetchSiteVisit();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "user_id") {
          payload.append("agent_id", parseInt(value));
        } else {
          payload.append(key, value);
        }
      });

      await axios.put(`${baseurl}/site-visits/${id}/`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Site Visit updated successfully!");
      navigate("/p-sitevisits");
    } catch (error) {
      console.error("Error updating site visit:", error.response?.data || error);
      alert("Failed to update site visit. Check console for details.");
    }
  };

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography variant="h2" fontWeight="bold" sx={{ textAlign: "center" }}>
            Edit Site Visit
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Time"
                name="time"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={formData.time}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Site Name"
                name="site_name"
                value={formData.site_name}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Site Owner Name"
                name="site_owner_name"
                value={formData.site_owner_name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Site Owner Mobile Number"
                name="site_owner_mobile_number"
                value={formData.site_owner_mobile_number}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Site Owner Email"
                name="site_owner_email"
                type="email"
                value={formData.site_owner_email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Site Location"
                name="site_location"
                value={formData.site_location}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Customer Name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Customer Mobile Number"
                name="customer_mobile_number"
                value={formData.customer_mobile_number}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Site Photo
                <input type="file" hidden name="site_photo" onChange={handleChange} />
              </Button>
              {formData.site_photo && <Typography mt={1}>{formData.site_photo.name}</Typography>}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box textAlign="center" mt={4}>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#1A0033", px: 5, py: 1.5 }}>
              Update
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default EditSitevisit;
