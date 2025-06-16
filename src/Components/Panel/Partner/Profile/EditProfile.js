import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputLabel,
  Chip,
} from "@mui/material";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../../BaseURL/BaseURL";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const PartnerKyc = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    image: null,
    pan: null,
    aadhaar: null,
  });

  const handleRemove = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const handleReplace = (e, fieldName) => {
  const file = e.target.files[0];
  if (file) {
    const fileUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        url: fileUrl,
        file: file,
      },
    }));
  }
};

  const handleDelete = (fieldName) => {
  const updatedFormData = { ...formData };
  delete updatedFormData[fieldName];
  setFormData(updatedFormData);
};

  // Convert file URL string to object with name/url keys
  const toFileObject = (url) =>
    url
      ? {
          name: url.split("/").pop(),
          url,
          file: null,
        }
      : null;

  useEffect(() => {
    axios
      .get(`${baseurl}/users/${userId}/`)
      .then((response) => {
        const user = response.data;

        setFormData({
          ...user,

          // Normalize file objects
          image: toFileObject(user.image),
          pan: toFileObject(user.pan),
          aadhaar: toFileObject(user.aadhaar),
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [name]: {
          file,
          url,
          name: file.name,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (["image", "pan", "aadhaar"].includes(key)) {
        if (value?.file instanceof File) {
          form.append(key, value.file);
        }
      } else if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        (typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean")
      ) {
        form.append(key, value);
      }
    });

    try {
      const response = await axios.put(`${baseurl}/users/${userId}/`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully");
      console.log("Update response:", response.data);
      navigate("/p-profile");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Button startIcon={<ArrowBackIcon />} variant="outlined" onClick={() => navigate(-1)}>
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
            ].map(({ label, name, type = "text", disabled }) => (
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

            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
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
              { name: "pin_code", md: 3 },
            ].map(({ name, md }) => (
              <Grid item xs={12} md={md} key={name}>
                <TextField
                  fullWidth
                  label={name.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>

          {/* Banking Details */}
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
              "ifsc_code",
            ].map((field) => (
              <Grid item xs={12} md={4} key={field}>
                {field === "account type" ? (
                  <TextField
                    select
                    fullWidth
                    label="Account Type"
                    name="account type"
                    value={formData["account type"] || ""}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <MenuItem value="Savings">Savings</MenuItem>
                    <MenuItem value="Current">Current</MenuItem>
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    label={field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    variant="outlined"
                  />
                )}
              </Grid>
            ))}
          </Grid>

          {/* KYC Details */}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", mb: 2 }}>
            KYC Verification
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {["pan_number", "aadhaar_number"].map((field) => (
              <Grid item xs={12} md={6} key={field}>
                <TextField
                  fullWidth
                  label={field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>

          {/* Nominee */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {["nominee_reference_to"].map((field) => (
              <Grid item xs={12} md={6} key={field}>
                <TextField
                  fullWidth
                  label={field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
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
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {[
              { label: "Upload Image", name: "image" },
              { label: "Upload PAN", name: "pan" },
              { label: "Upload Aadhaar", name: "aadhaar" },
            ].map(({ label, name }) => (
              <Grid item xs={12} md={4} key={name}>
                <InputLabel shrink>{label}</InputLabel>
                <Button variant="outlined" fullWidth component="label">
                  {label}
                  <input
                    type="file"
                    name={name}
                    hidden
                    accept={name === "image" ? "image/*" : ".pdf,.jpg,.jpeg,.png"}
                    onChange={handleChange}
                  />
                </Button>

                {formData[name]?.name && (
                  <Chip
                    label={formData[name].name}
                    onDelete={() => handleRemove(name)}
                    sx={{ mt: 1 }}
                  />
                )}
              </Grid>
            ))}
          </Grid>




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

export default PartnerKyc;
