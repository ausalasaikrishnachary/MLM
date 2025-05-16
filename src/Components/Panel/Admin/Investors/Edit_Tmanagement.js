import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../../Shared/Navbar/Navbar";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Edit_Tmanagement = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  const [formData, setFormData] = useState(user || {});
  const [selectedImage, setSelectedImage] = useState(null);

  if (!user)
    return (
      <Typography sx={{ p: 3 }}>
        No user data available
      </Typography>
    );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "role_name") {
      setFormData((prev) => ({
        ...prev,
        roles: [{ ...prev.roles?.[0], role_name: value }],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      // Append all form fields
      for (const key in formData) {
        if (key !== "roles" && formData[key] !== undefined && formData[key] !== null) {
          data.append(key, formData[key]);
        }
      }

      // Add roles if present
      if (formData.roles?.[0]?.role_name) {
        data.append("roles", JSON.stringify([{ role_name: formData.roles[0].role_name }]));
      }

      // Add image if selected
      if (selectedImage) {
        data.append("image", selectedImage);
      }

      // Debug: Log FormData content
      console.log("FormData being submitted:");
      for (let pair of data.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      await axios.patch(
        `https://rahul30.pythonanywhere.com/users/${formData.user_id}/`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("User updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        alert(`Failed to update user: ${JSON.stringify(error.response.data)}`);
      } else {
        alert("Failed to update user.");
      }
    }
  };

  const Section = ({ title, children }) => (
    <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: "1.4rem" }}>
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {children}
        </Grid>
      </Box>
    </Box>
  );

  const InputField = (label, name, type = "text", valueOverride = null) => (
    <Grid item xs={12} sm={3} key={name}>
      <TextField
        label={label}
        name={name}
        type={type}
        value={valueOverride ?? formData[name] ?? ""}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        // size="small"
        InputLabelProps={type === "date" ? { shrink: true } : {}}
      />
    </Grid>
  );

  return (
    <>
      <Header />
      <Box sx={{ p: 4, backgroundColor: "#ffffff" }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          {/* Avatar */}
          {/* <Box sx={{ textAlign: "center", mb: 3 }}>
            {/* <Avatar
              src={selectedImage ? URL.createObjectURL(selectedImage) : formData.image}
              alt="User"
              sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
            /> */}
            {/* <Typography variant="h5" fontWeight="bold">
              {formData.username}
            </Typography>
            <Typography color="text.secondary">
              {formData.email}
            </Typography>
          </Box> */} 

          {/* Back Button */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
              Back
            </Button>
          </Box>

          {/* Form Sections */}
          <Section title="Basic Details">
            {InputField("Username", "username")}
            {InputField("Email", "email")}
            {InputField("Phone Number", "phone_number")}
            {InputField("Role", "role_name", "text", formData.roles?.[0]?.role_name || "")}
          </Section>

          <Section title="Personal Information">
            {InputField("User ID", "user_id")}
            {InputField("Referral ID", "referral_id")}
            {InputField("First Name", "first_name")}
            {InputField("Last Name", "last_name")}
            {InputField("Gender", "gender")}
            {InputField("Level No", "level_no")}

            {/* Image Upload */}
            <Grid item xs={12} sm={3}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ height: 52, textTransform: "none" }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSelectedImage(file);
                      setFormData((prev) => ({
                        ...prev,
                        image: URL.createObjectURL(file),
                      }));
                    }
                  }}
                />
              </Button>
              {selectedImage && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {selectedImage.name}
                </Typography>
              )}
            </Grid>
          </Section>

          <Section title="Contact Information">
            {InputField("Address", "address")}
            {InputField("City", "city")}
            {InputField("State", "state")}
            {InputField("Country", "country")}
            {InputField("PIN Code", "pin_code")}
          </Section>

          <Section title="Bank Details">
            {InputField("Bank Name", "bank_name")}
            {InputField("Account Holder Name", "account_holder_name")}
            {InputField("Branch Name", "branch_name")}
            {InputField("Account Type", "account_type")}
            {InputField("Account Number", "account_number")}
            {InputField("IFSC Code", "ifsc_code")}
          </Section>

          <Section title="KYC & Identification">
            {InputField("PAN Number", "pan_number")}
            {InputField("Aadhaar Number", "aadhaar_number")}
            {InputField("KYC Status", "kyc_status")}
            {InputField("Nominee Reference To", "nominee_reference_to")}
          </Section>

          <Section title="Other Information">
            {InputField("Referred By", "referred_by")}
            {InputField("Created At", "created_at")}
            {InputField("Updated At", "updated_at")}
          </Section>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Update Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Edit_Tmanagement;
