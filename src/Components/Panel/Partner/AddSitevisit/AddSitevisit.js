import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../../BaseURL/BaseURL";

function AddSitevisit() {
  const navigate = useNavigate();
  const agentId = localStorage.getItem("user_id");

  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    agent_id: "", // Changed from user_id to agent_id for dropdown
    site_name: "",
    site_owner_name: "",
    site_owner_mobile_number: "",
    user_id: agentId, // Keep user_id as the logged-in agent
    site_location: "",
    customer_name: "",
    customer_mobile_number: "",
    remarks: "",
    site_photo: null,
  });

  // Fetch agents for dropdown
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const referralId = localStorage.getItem('referral_id');
        if (referralId) {
          const response = await axios.get(`${baseurl}/agents/referral-id/${referralId}/`);
          // Extract agents from response and format for dropdown
          const agentsList = response.data.agents.map(agent => ({
            id: agent.user_id,
            name: agent.first_name,
            referral_id: agent.referral_id
          }));
          setAgents(agentsList);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
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

      // Append fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          payload.append(key, value);
        }
      });

      // Debug log
      for (let pair of payload.entries()) {
        console.log(pair[0], pair[1]);
      }

      await axios.post(`${baseurl}/site-visits/`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Site Visit added successfully!");
      navigate("/p-sitevisits");
    } catch (error) {
      console.error("Error adding site visit:", error.response?.data || error);
      alert("Failed to add site visit. Check console for details.");
    }
  };

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography variant="h2" fontWeight="bold" sx={{ textAlign: "center" }}>
            Add Site Visit
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Row 1 */}
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

            {/* Agent ID Dropdown */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Agent ID</InputLabel>
                <Select
                  name="agent_id"
                  value={formData.agent_id}
                  onChange={handleChange}
                  label="Agent ID"
                >
                  {agents.map((agent) => (
                    <MenuItem key={agent.id} value={agent.id}>
                      {agent.name} - {agent.referral_id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Row 2 */}
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

            {/* Row 3 - Removed site_owner_email */}
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

            {/* Row 4 */}
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

            {/* Upload Section */}
            <Grid item xs={12} md={4}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Site Photo
                <input
                  type="file"
                  hidden
                  name="site_photo"
                  onChange={handleChange}
                />
              </Button>
              {formData.site_photo && (
                <Typography mt={1}>{formData.site_photo.name}</Typography>
              )}
            </Grid>

            {/* Remarks Field */}
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

          {/* Submit Button */}
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

export default AddSitevisit;