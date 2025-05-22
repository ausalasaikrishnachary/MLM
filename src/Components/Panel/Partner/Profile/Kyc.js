import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  InputLabel,
  Alert
} from "@mui/material";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { useNavigate } from 'react-router-dom';


const PartnerKyc = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
    pan_number: "",
    aadhaar_number: "",
    account_holder_name: "",
    bank_name: "",
    branch_name: "",
    account_number: "",
    ifsc_code: "",
    nominee_reference_to: "",
    referral_id: "",
    role_ids: [2] // Assuming partner role is 2
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const [panCardFile, setPanCardFile] = useState(null);
const [aadhaarCardFile, setAadhaarCardFile] = useState(null);

const handlePanCardUpload = (event) => {
  setPanCardFile(event.target.files[0]);
};

const handleAadharCardUpload = (event) => {
  setAadhaarCardFile(event.target.files[0]);
};


 const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setSuccess(false);

  if (!termsAccepted) {
    setError("Please accept the terms and conditions");
    return;
  }

  try {
    const formDataToSend = new FormData();

    // Add form fields
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach(val => formDataToSend.append(key, val));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Add fixed values
    formDataToSend.append("status", "Active");
    formDataToSend.append("kyc_status", "Pending");
    formDataToSend.append("account_type", "Savings");

    // Add files
    if (panCardFile) formDataToSend.append("pan", panCardFile);
    if (aadhaarCardFile) formDataToSend.append("aadhaar", aadhaarCardFile);

    const response = await fetch("https://rahul30.pythonanywhere.com/users/", {
      method: "POST",
      body: formDataToSend
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    setSuccess(true);

    // Reset form
    setFormData({
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      date_of_birth: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pin_code: "",
      pan_number: "",
      aadhaar_number: "",
      account_holder_name: "",
      bank_name: "",
      branch_name: "",
      account_number: "",
      ifsc_code: "",
      nominee_reference_to: "",
      referral_id: "",
      role_ids: [2]
    });
    // setTermsAccepted(false);
    setPanCardFile(null);
    setAadhaarCardFile(null);
    navigate('/p-myassets');

  } catch (err) {
    setError(err.message);
  }
};


  return (
    <>
      <PartnerHeader />
      <Container maxWidth="xl" sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          KYC Registration
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Registration successful!</Alert>}
        
        <Box 
          component="form" 
          onSubmit={handleSubmit}
        >
          {/* Basic Information Section */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "rgb(30, 10, 80)",
              marginBottom: 2
            }}
          >
            Basic Information
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                variant="outlined"
                type="tel"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField 
                fullWidth 
                label="Referral ID (Sponsor ID)" 
                name="referral_id"
                value={formData.referral_id}
                onChange={handleChange}
                variant="outlined" 
              />
            </Grid>
          </Grid>

          {/* Address Details Section */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "rgb(30, 10, 80)",
              marginBottom: 2
            }}
          >
            Address Details
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ZIP Code"
                name="pin_code"
                value={formData.pin_code}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
          </Grid>

          {/* Banking Details Section */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "rgb(30, 10, 80)",
              marginBottom: 2
            }}
          >
            Banking Details
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="PAN Number"
                name="pan_number"
                value={formData.pan_number}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Aadhar Number"
                name="aadhaar_number"
                value={formData.aadhaar_number}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Account Holder Name"
                name="account_holder_name"
                value={formData.account_holder_name}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Bank Name"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Branch Name"
                name="branch_name"
                value={formData.branch_name}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Account Number"
                name="account_number"
                value={formData.account_number}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="IFSC Code"
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
          </Grid>

        <Grid container spacing={2} sx={{ mb: 4 }} alignItems="flex-start">
  {/* Left Column: Nominee Details */}
  <Grid item xs={12} md={6}>
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        color: "rgb(30, 10, 80)",
        marginBottom: 2
      }}
    >
      Nominee Details
    </Typography>
    <TextField
      fullWidth
      label="Nominee Name"
      name="nominee_reference_to"
      value={formData.nominee_reference_to}
      onChange={handleChange}
      variant="outlined"
    />
  </Grid>

  {/* Right Column: KYC Verification */}
  <Grid item xs={12} md={6}>
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        color: "rgb(30, 10, 80)",
        marginBottom: 2
      }}
    >
      KYC Verification
    </Typography>

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <InputLabel shrink>PAN Card Upload</InputLabel>
        <Button variant="outlined" component="label" fullWidth>
          Upload PAN Card File
          <input
            type="file"
            hidden
            name="panCard"
            onChange={handlePanCardUpload}
          />
        </Button>
      </Grid>

      <Grid item xs={12} sm={6}>
        <InputLabel shrink>Aadhar Card Upload</InputLabel>
        <Button variant="outlined" component="label" fullWidth>
          Upload Aadhar Card File
          <input
            type="file"
            hidden
            name="aadharCard"
            onChange={handleAadharCardUpload}
          />
        </Button>
      </Grid>
    </Grid>
  </Grid>
</Grid>


          {/* Terms & Conditions */}
          <Grid container justifyContent="center" sx={{ mb: 4 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: "rgb(30, 10, 80)",
                  }}
                >
                  I agree to the Terms & Conditions
                </Typography>
              }
            />
          </Grid>

          {/* Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ 
                width: '50%',
                height: '56px',
                fontSize: '1rem',
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

export default PartnerKyc;