import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  InputLabel,
} from "@mui/material";
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../../BaseURL/BaseURL";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ClientEditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    axios
      .get(`${baseurl}/users/${userId}/`)
      .then((response) => {
        const { password, ...userDataWithoutPassword } = response.data; // Remove password from state
        
        setUserData(userDataWithoutPassword);
        setFormData({
          ...userDataWithoutPassword,
          role_name: userDataWithoutPassword.roles?.[0]?.role_name || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Add all fields except 'password' (unless it's explicitly changed in a dedicated form)
    Object.entries(formData).forEach(([key, value]) => {
      if (value && key !== 'password') {  // Exclude password unless needed
        form.append(key, value);
      }
    });

    console.log("formdata:",formData)

    try {
      await axios.put(`${baseurl}/users/${userId}/`, form);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <>
      <InvestorHeader />
      <Container maxWidth="lg" sx={{ p: 4 }}>
        {/* Header with Back */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>

        <Typography variant="h4" gutterBottom textAlign="center">
          Profile Edit
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", mb: 2 }}>
            Basic Information
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[
              { label: "Username", name: "username" },
              { label: "First Name", name: "first_name" },
              { label: "Last Name", name: "last_name" },
              { label: "Email", name: "email" },
              { label: "Phone Number", name: "phone_number" },
              { label: "Date of Birth", name: "date_of_birth", type: "date" },
              { label: "Gender", name: "gender" },
              { label: "Status", name: "status" },
              { label: "Role Name", name: "role_name", disabled: true },
            ].map(({ label, name, type = "text", disabled }, i) => (
              <Grid item xs={12} md={4} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  type={type}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={type === "date" ? { shrink: true } : undefined}
                  disabled={disabled}
                />
              </Grid>
            ))}
          </Grid>

          {/* Address */}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", mb: 2 }}>
            Address Details
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[
              { name: "address", md: 6 },
              { name: "city", md: 3 },
              { name: "state", md: 3 },
              { name: "country", md: 3 },
              { name: "pin_code", md: 3 }
            ].map(({ name, md }) => (
              <Grid item xs={12} md={md} key={name}>
                <TextField
                  fullWidth
                  label={name.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>

          {/* Banking */}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", mb: 2 }}>
            Banking Details
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[
              "account_holder_name",
              "bank_name",
              "branch_name",
              "account_number",
              "account_type",
              "ifsc_code"
            ].map((field) => (
              <Grid item xs={12} md={4} key={field}>
                <TextField
                  fullWidth
                  label={field.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>

          {/* KYC */}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", mb: 2 }}>
            KYC Verification
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {["pan_number", "aadhaar_number"].map((field) => (
              <Grid item xs={12} md={6} key={field}>
                <TextField
                  fullWidth
                  label={field.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>

          {/* Other */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {["nominee_reference_to", "kyc_status"].map((field) => (
              <Grid item xs={12} md={6} key={field}>
                <TextField
                  fullWidth
                  label={field.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>

          {/* Uploads */}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", mb: 2 }}>
            Uploads
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[
              { label: "Upload Image", name: "image" },
              { label: "Upload PAN", name: "pan" },
              { label: "Upload Aadhaar", name: "aadhaar" }
            ].map(({ label, name }) => (
              <Grid item xs={12} md={4} key={name}>
                <InputLabel shrink>{label}</InputLabel>
                <Button variant="outlined" fullWidth component="label">
                  {label}
                  <input type="file" name={name} hidden onChange={handleChange} />
                </Button>
              </Grid>
            ))}
          </Grid>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "50%",
                height: "56px",
                fontSize: "1rem",
                backgroundColor: "rgb(20, 5, 60)",
                "&:hover": { backgroundColor: "rgb(15, 4, 50)" },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ClientEditProfile;