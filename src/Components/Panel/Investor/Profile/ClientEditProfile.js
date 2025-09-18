
// import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   TextField,
//   Button,
//   Typography,
//   MenuItem,
//   InputLabel,
//   Chip,
// } from "@mui/material";

// import { useNavigate } from "react-router-dom";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import axios from "axios";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { IconButton } from "@mui/material";

// const PartnerKyc = () => {
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("user_id");

//   const [formData, setFormData] = useState({
//     image: null,
//     pan: null,
//     aadhaar: null,
//   });

//   const handleRemove = (name) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: null,
//     }));
//   };

//   const handleReplace = (e, fieldName) => {
//   const file = e.target.files[0];
//   if (file) {
//     const fileUrl = URL.createObjectURL(file);
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: {
//         ...prev[fieldName],
//         url: fileUrl,
//         file: file,
//       },
//     }));
//   }
// };

//   const handleDelete = (fieldName) => {
//   const updatedFormData = { ...formData };
//   delete updatedFormData[fieldName];
//   setFormData(updatedFormData);
// };

//   // Convert file URL string to object with name/url keys
//   const toFileObject = (url) =>
//     url
//       ? {
//           name: url.split("/").pop(),
//           url,
//           file: null,
//         }
//       : null;

//   useEffect(() => {
//     axios
//       .get(`${baseurl}/users/${userId}/`)
//       .then((response) => {
//         const user = response.data;

//         setFormData({
//           ...user,

//           // Normalize file objects
//           image: toFileObject(user.image),
//           pan: toFileObject(user.pan),
//           aadhaar: toFileObject(user.aadhaar),
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;

//     if (type === "file" && files.length > 0) {
//       const file = files[0];
//       const url = URL.createObjectURL(file);
//       setFormData((prev) => ({
//         ...prev,
//         [name]: {
//           file,
//           url,
//           name: file.name,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();

//     Object.entries(formData).forEach(([key, value]) => {
//       if (["image", "pan", "aadhaar"].includes(key)) {
//         if (value?.file instanceof File) {
//           form.append(key, value.file);
//         }
//       } else if (
//         value !== null &&
//         value !== undefined &&
//         value !== "" &&
//         (typeof value === "string" ||
//           typeof value === "number" ||
//           typeof value === "boolean")
//       ) {
//         form.append(key, value);
//       }
//     });

//     try {
//       const response = await axios.put(`${baseurl}/users/${userId}/`, form, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("Profile updated successfully");
//       console.log("Update response:", response.data);
//       navigate("/i-profile");
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert("Failed to update profile");
//     }
//   };

//   return (
//     <>
//       <InvestorHeader />
//       <Container maxWidth="lg" sx={{ p: 4 }}>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Button startIcon={<ArrowBackIcon />} variant="outlined" onClick={() => navigate(-1)}>
//             Back
//           </Button>
//         </Box>

//         <Typography variant="h4" gutterBottom textAlign="center">
//           Profile Edit
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit}>
//           {/* Basic Info */}
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", mb: 2 }}>
//             Basic Information
//           </Typography>
//           <Grid container spacing={2} sx={{ mb: 4 }}>
//             {[
//               { label: "Username", name: "username" },
//               { label: "First Name", name: "first_name" },
//               { label: "Last Name", name: "last_name" },
//               { label: "Email", name: "email" },
//               { label: "Phone Number", name: "phone_number" },
//               { label: "Date of Birth", name: "date_of_birth", type: "date" },
//             ].map(({ label, name, type = "text", disabled }) => (
//               <Grid item xs={12} md={4} key={name}>
//                 <TextField
//                   fullWidth
//                   label={label}
//                   name={name}
//                   type={type}
//                   value={formData[name] || ""}
//                   onChange={handleChange}
//                   variant="outlined"
//                   InputLabelProps={type === "date" ? { shrink: true } : undefined}
//                   disabled={disabled}
//                 />
//               </Grid>
//             ))}

//             <Grid item xs={12} md={4}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Gender"
//                 name="gender"
//                 value={formData.gender || ""}
//                 onChange={handleChange}
//                 variant="outlined"
//               >
//                 <MenuItem value="Female">Female</MenuItem>
//                 <MenuItem value="Male">Male</MenuItem>
//               </TextField>
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Status"
//                 name="status"
//                 value={formData.status || ""}
//                 onChange={handleChange}
//                 variant="outlined"
//               >
//                 <MenuItem value="active">Active</MenuItem>
//                 <MenuItem value="inactive">Inactive</MenuItem>
//               </TextField>
//             </Grid>
//           </Grid>

//           {/* Address */}
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", mb: 2 }}>
//             Address Details
//           </Typography>
//           <Grid container spacing={2} sx={{ mb: 4 }}>
//             {[
//               { name: "address", md: 6 },
//               { name: "city", md: 3 },
//               { name: "state", md: 3 },
//               { name: "country", md: 3 },
//               { name: "pin_code", md: 3 },
//             ].map(({ name, md }) => (
//               <Grid item xs={12} md={md} key={name}>
//                 <TextField
//                   fullWidth
//                   label={name.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                   name={name}
//                   value={formData[name] || ""}
//                   onChange={handleChange}
//                   variant="outlined"
//                 />
//               </Grid>
//             ))}
//           </Grid>

//           {/* Banking Details */}
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", mb: 2 }}>
//             Banking Details
//           </Typography>
//           <Grid container spacing={2} sx={{ mb: 4 }}>
//             {[
//               "account_holder_name",
//               "bank_name",
//               "branch_name",
//               "account_number",
//               "account_type",
//               "ifsc_code",
//             ].map((field) => (
//               <Grid item xs={12} md={4} key={field}>
//                 {field === "account type" ? (
//                   <TextField
//                     select
//                     fullWidth
//                     label="Account Type"
//                     name="account type"
//                     value={formData["account type"] || ""}
//                     onChange={handleChange}
//                     variant="outlined"
//                   >
//                     <MenuItem value="Savings">Savings</MenuItem>
//                     <MenuItem value="Current">Current</MenuItem>
//                   </TextField>
//                 ) : (
//                   <TextField
//                     fullWidth
//                     label={field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                     name={field}
//                     value={formData[field] || ""}
//                     onChange={handleChange}
//                     variant="outlined"
//                   />
//                 )}
//               </Grid>
//             ))}
//           </Grid>

//           {/* KYC Details */}
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", mb: 2 }}>
//             KYC Verification
//           </Typography>
//           <Grid container spacing={2} sx={{ mb: 4 }}>
//             {["pan_number", "aadhaar_number"].map((field) => (
//               <Grid item xs={12} md={6} key={field}>
//                 <TextField
//                   fullWidth
//                   label={field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                   name={field}
//                   value={formData[field] || ""}
//                   onChange={handleChange}
//                   variant="outlined"
//                 />
//               </Grid>
//             ))}
//           </Grid>

//           {/* Nominee */}
//           <Grid container spacing={2} sx={{ mb: 4 }}>
//             {["nominee_reference_to"].map((field) => (
//               <Grid item xs={12} md={6} key={field}>
//                 <TextField
//                   fullWidth
//                   label={field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                   name={field}
//                   value={formData[field] || ""}
//                   onChange={handleChange}
//                   variant="outlined"
//                 />
//               </Grid>
//             ))}
//           </Grid>

//           {/* Uploads */}
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", mb: 2 }}>
//             Uploads
//           </Typography>
//           <Grid container spacing={2} sx={{ mb: 2 }}>
//             {[
//               { label: "Upload Image", name: "image" },
//               { label: "Upload PAN", name: "pan" },
//               { label: "Upload Aadhaar", name: "aadhaar" },
//             ].map(({ label, name }) => (
//               <Grid item xs={12} md={4} key={name}>
//                 <InputLabel shrink>{label}</InputLabel>
//                 <Button variant="outlined" fullWidth component="label">
//                   {label}
//                   <input
//                     type="file"
//                     name={name}
//                     hidden
//                     accept={name === "image" ? "image/*" : ".pdf,.jpg,.jpeg,.png"}
//                     onChange={handleChange}
//                   />
//                 </Button>

//                 {formData[name]?.name && (
//                   <Chip
//                     label={formData[name].name}
//                     onDelete={() => handleRemove(name)}
//                     sx={{ mt: 1 }}
//                   />
//                 )}
//               </Grid>
//             ))}
//           </Grid>




//           <Box sx={{ display: "flex", justifyContent: "center" }}>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 width: "50%",
//                 height: "56px",
//                 fontSize: "1rem",
//                 backgroundColor: "rgb(20, 5, 60)",
//                 "&:hover": { backgroundColor: "rgb(15, 4, 50)" },
//               }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default PartnerKyc;


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

const PartnerKyc = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    image: null,
    aadhaar_front: null,
    aadhaar_back: null,
    pan_front: null,
    pan_back: null,
    bank_passbook: null,
    cancelled_cheque: null,
  });

  const [errors, setErrors] = useState({}); // Track field errors

  const requiredFields = [
    "username", "first_name", "last_name", "email", "phone_number", "date_of_birth",
    "gender", "address", "city", "state", "country", "pin_code",
    "account_holder_name", "bank_name", "branch_name", "account_number", "account_type", "ifsc_code",
    "pan_number", "aadhaar_number", "nominee_reference_to",
    "image", "aadhaar_front", "aadhaar_back", "pan_front", "pan_back", "bank_passbook", "cancelled_cheque"
  ];

  // Fetch user data
  useEffect(() => {
    axios
      .get(`${baseurl}/users/${userId}/`)
      .then((response) => {
        const user = response.data;

        const toFileObject = (url) =>
          url ? { name: url.split("/").pop(), url, file: null } : null;

        setFormData({
          ...user,
          image: toFileObject(user.image),
          aadhaar_front: toFileObject(user.aadhaar_front),
          aadhaar_back: toFileObject(user.aadhaar_back),
          pan_front: toFileObject(user.pan_front),
          pan_back: toFileObject(user.pan_back),
          bank_passbook: toFileObject(user.bank_passbook),
          cancelled_cheque: toFileObject(user.cancelled_cheque),
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [name]: { file, url, name: file.name },
      }));
      setErrors((prev) => ({ ...prev, [name]: "" })); // clear error
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRemove = (name) => {
    setFormData((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    requiredFields.forEach((field) => {
      const value = formData[field];
      if (!value || (typeof value === "object" && !value.file && !value.url)) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // stop submission
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (
        ["image","aadhaar_front","aadhaar_back","pan_front","pan_back","bank_passbook","cancelled_cheque"].includes(key)
      ) {
        if (value?.file instanceof File) {
          form.append(key, value.file);
        }
      } else {
        form.append(key, value);
      }
    });

    try {
      await axios.put(`${baseurl}/users/${userId}/`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile updated successfully");
      navigate("/p-profile");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
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
            ].map(({ label, name, type = "text" }) => (
              <Grid item xs={12} md={4} key={name}>
                <TextField
                  fullWidth
                  required
                  label={label}
                  name={name}
                  type={type}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={type === "date" ? { shrink: true } : undefined}
                  error={!!errors[name]}
                  helperText={errors[name]}
                />
              </Grid>
            ))}

            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                required
                label="Gender"
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.gender}
                helperText={errors.gender}
              >
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {/* Address */}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", mb: 2 }}>
            Address Details
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {["address","city","state","country","pin_code"].map((name) => (
              <Grid item xs={12} md={3} key={name}>
                <TextField
                  fullWidth
                  required
                  label={name.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  variant="outlined"
                  error={!!errors[name]}
                  helperText={errors[name]}
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
              "ifsc_code",
            ].map((field) => (
              <Grid item xs={12} md={4} key={field}>
                <TextField
                  fullWidth
                  required
                  label={field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  variant="outlined"
                  error={!!errors[field]}
                  helperText={errors[field]}
                />
              </Grid>
            ))}

            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                required
                label="Account Type"
                name="account_type"
                value={formData.account_type || ""}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.account_type}
                helperText={errors.account_type}
              >
                <MenuItem value="Savings">Savings</MenuItem>
                <MenuItem value="Current">Current</MenuItem>
              </TextField>
            </Grid>
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
                  required
                  label={field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  variant="outlined"
                  error={!!errors[field]}
                  helperText={errors[field]}
                />
              </Grid>
            ))}
          </Grid>

          {/* Nominee */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Nominee Reference To"
                name="nominee_reference_to"
                value={formData.nominee_reference_to || ""}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.nominee_reference_to}
                helperText={errors.nominee_reference_to}
              />
            </Grid>
          </Grid>

          {/* File Uploads */}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", mb: 2 }}>
            Uploads
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {[
              { label: "Upload Image", name: "image" },
              { label: "Aadhaar Front", name: "aadhaar_front" },
              { label: "Aadhaar Back", name: "aadhaar_back" },
              { label: "PAN Front", name: "pan_front" },
              { label: "PAN Back", name: "pan_back" },
              { label: "Bank Passbook", name: "bank_passbook" },
              { label: "Cancelled Cheque", name: "cancelled_cheque" },
            ].map(({ label, name }) => (
              <Grid item xs={12} md={4} key={name}>
                <InputLabel shrink required>{label}</InputLabel>
                <Button variant="outlined" fullWidth component="label">
                  {label}
                  <input
                    type="file"
                    name={name}
                    hidden
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

                {errors[name] && (
                  <Typography color="error" variant="caption">
                    {errors[name]}
                  </Typography>
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

