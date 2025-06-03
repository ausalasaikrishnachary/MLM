// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   MenuItem,
//   Grid,
//   Paper,
//   Typography,
//   IconButton,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import Header from "../../../Shared/Navbar/Navbar";
// import { baseurl } from '../../../BaseURL/BaseURL';


// const AdminKyc = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     first_name: "",
//     last_name: "",
//     role_ids: [],
//     email: "",
//     password: "",
//     phone_number: "",
//     date_of_birth: "",
//     gender: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     pin_code: "",
//     status: "",
//     pan_number: "",
//     aadhaar_number: "",
//     kyc_status: "Pending",
//     account_holder_name: "",
//     bank_name: "",
//     branch_name: "",
//     account_number: "",
//     account_type: "",
//     ifsc_code: "",
//     nominee_reference_to: "",
//     referral_id: "",
//   });

//   const [roles, setRoles] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [pancard, setPancard] = useState(null);
//   const [aadhar, setAadhar] = useState(null);
//   const [image, setImage] = useState(null);
//   const [pancardName, setPancardName] = useState("");
//   const [aadharName, setAadharName] = useState("");
//   const [imageName, setImageName] = useState("");
//   const [partnerUsers, setPartnerUsers] = useState([]);

//   useEffect(() => {
//     fetch(`${baseurl}/roles/`)
//       .then((res) => res.json())
//       .then((data) => setRoles(data))
//       .catch((err) => console.error("Error fetching roles:", err));

//     fetch(`${baseurl}/users/`)
//       .then((res) => res.json())
//       .then((data) => setUsers(data))
//       .catch((err) => console.error("Error fetching users:", err));

//     // Fetch users with role "Partner"
//     fetch(`${baseurl}/users/role/Partner/`)
//       .then((res) => res.json())
//       .then((data) => setPartnerUsers(data))
//       .catch((err) => console.error("Error fetching partner users:", err));
//   }, []);

//   const handleChange = (e) => {
//     if (e.target.name === "role_ids") {
//       setFormData({ ...formData, role_ids: [Number(e.target.value)] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleFileChange = (event, setFile, setFileName) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     setFile(file);
//     setFileName(file.name);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // if (!pancard || !aadhar || !image) {
//     //   alert("Please upload Pancard, Aadhar, and an Image.");
//     //   return;
//     // }

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       formDataToSend.append(key, formData[key]);
//     });

//     // Append files ONLY if they are selected
//     if (pancard) formDataToSend.append("pan", pancard);
//     if (aadhar) formDataToSend.append("aadhaar", aadhar);
//     if (image) formDataToSend.append("image", image);

//     try {
//       const response = await fetch(`${baseurl}/users/`, {
//         method: "POST",
//         body: formDataToSend,
//       });
//       const responseData = await response.json();
//       if (response.ok) {
//         alert("User registered successfully!");
//         setUsers([...users, responseData]);
//       } else {
//         console.error("Server Error:", responseData);
//         alert(`Failed to register user: ${JSON.stringify(responseData)}`);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("An error occurred while submitting the form.");
//     }
//   };

//   // Role Dialog States
//   const [openRoleDialog, setOpenRoleDialog] = useState(false);
//   const [newRole, setNewRole] = useState("");

//   // Handle role addition popup
//   const handleOpenRoleDialog = () => setOpenRoleDialog(true);
//   const handleCloseRoleDialog = () => {
//     setNewRole("");
//     setOpenRoleDialog(false);
//   };

//   // Submit new role
//   const handleAddRole = async () => {
//     if (!newRole.trim()) {
//       alert("Role name cannot be empty");
//       return;
//     }

//     try {
//       const response = await fetch(`${baseurl}/roles/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ role_name: newRole }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add role");
//       }

//       const addedRole = await response.json();
//       setRoles([...roles, addedRole]); // Update roles list
//       handleCloseRoleDialog(); // Close dialog
//       alert("Role added successfully!");
//     } catch (error) {
//       console.error("Error adding role:", error);
//       alert("Failed to add role");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
//         <Box style={{ padding: 20, maxWidth: 1200, margin: "auto", marginTop: 20, marginBottom: 50 }}>

//           <Typography variant="h4" component="h2" gutterBottom align="center" marginBottom={5}>
//             User Registration
//           </Typography>
//           <form onSubmit={handleSubmit} encType="multipart/form-data">

//             <Grid container spacing={2}>
//               {Object.keys(formData).map(
//                 (key) =>
//                   !["referral_id"].includes(key) &&
//                   key !== "role_ids" && (
//                     <Grid item xs={12} sm={4} key={key}>
//                       <TextField
//                         fullWidth
//                         label={key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
//                         name={key}
//                         value={formData[key]}
//                         onChange={handleChange}
//                         type={key.includes("password") ? "password" : key.includes("date") ? "date" : "text"}
//                         InputLabelProps={key.includes("date") ? { shrink: true } : {}}
//                       />
//                     </Grid>
//                   )
//               )}
//               <Grid item xs={10} sm={3}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Role"
//                   name="role_ids"
//                   value={formData.role_ids[0] || ""}
//                   onChange={handleChange}
//                   required
//                 >
//                   {roles.map((role) => (
//                     <MenuItem key={role.role_id} value={role.role_id}>
//                       {role.role_name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>

//               {/* Add Role Button */}
//               <Grid item xs={2} sm={1}>
//                 <IconButton color="primary" onClick={handleOpenRoleDialog}>
//                   <AddIcon />
//                 </IconButton>
//               </Grid>

//               {/* Role Dialog Popup */}
//               <Dialog open={openRoleDialog} onClose={handleCloseRoleDialog}>
//                 <DialogTitle>Add New Role</DialogTitle>
//                 <DialogContent>
//                   <TextField
//                     autoFocus
//                     margin="dense"
//                     label="Role Name"
//                     type="text"
//                     fullWidth
//                     required
//                     value={newRole}
//                     onChange={(e) => setNewRole(e.target.value)}
//                   />
//                 </DialogContent>
//                 <DialogActions>
//                   <Button onClick={handleCloseRoleDialog} color="secondary">
//                     Cancel
//                   </Button>
//                   <Button onClick={handleAddRole} color="primary">
//                     Add Role
//                   </Button>
//                 </DialogActions>
//               </Dialog>

//               {/* Referral ID Dropdown */}
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Referral ID"
//                   name="referral_id"
//                   value={formData.referral_id}
//                   onChange={handleChange}
//                 >
//                   {partnerUsers.length > 0 ? (
//                     partnerUsers.map((user) => (
//                       <MenuItem key={user.user_id} value={user.user_id}>
//                         {user.user_id} - {user.first_name}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem disabled>No Partners Available</MenuItem>
//                   )}
//                 </TextField>
//               </Grid>

//               {/* <Box display="flex" justifyContent="center" alignItems="flex-start" gap={2} marginTop={3} marginBottom={3}>
                
//                 <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
//                   <Button  variant="outlined" component="label">
//                     Upload Pancard (PDF Only)
//                     <input type="file" accept=".pdf" hidden onChange={(e) => handleFileChange(e, setPancard, setPancardName)} />
//                   </Button>
//                   {pancardName && <Typography variant="body2" color="textSecondary">{pancardName}</Typography>}
//                 </Box>

               
//                 <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
//                   <Button variant="outlined" component="label">
//                     Upload Aadhar Card (PDF Only)
//                     <input type="file" accept=".pdf" hidden onChange={(e) => handleFileChange(e, setAadhar, setAadharName)} />
//                   </Button>
//                   {aadharName && <Typography variant="body2" color="textSecondary">{aadharName}</Typography>}
//                 </Box>

              
//                 <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
//                   <Button variant="outlined" component="label">
//                     Upload Image
//                     <input type="file" accept="image/*" hidden onChange={(e) => handleFileChange(e, setImage, setImageName)} />
//                   </Button>
//                   {imageName && <Typography variant="body2" color="textSecondary">{imageName}</Typography>}
//                 </Box>
//               </Box> */}

//               <Box  display="flex" justifyContent="center" alignItems="flex-start" gap={2} marginTop={3} marginBottom={3}>
//                 {/* Pancard Upload */}
//                 <FormControl fullWidth>
//                   <TextField
//                     fullWidth
//                     label="Pan Card"
//                     type="file"
//                     onChange={(e) => handleFileChange(e, setPancard, setPancardName)}
//                     inputProps={{ accept: ".pdf" }}
//                     InputLabelProps={{ shrink: true }}
//                     required
//                   />
//                   {pancardName && (
//                     <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                       {pancardName}
//                     </Typography>
//                   )}
//                 </FormControl>

//                 {/* Aadhar Upload */}
//                 <FormControl fullWidth>
//                   <TextField
//                     fullWidth
//                     label="Aadhar Card"
//                     type="file"
//                     onChange={(e) => handleFileChange(e, setAadhar, setAadharName)}
//                     inputProps={{ accept: ".pdf" }}
//                     InputLabelProps={{ shrink: true }}
//                     required
//                   />
//                   {aadharName && (
//                     <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                       {aadharName}
//                     </Typography>
//                   )}
//                 </FormControl>

//                 {/* Image Upload */}
//                 <FormControl fullWidth>
//                   <TextField
//                     fullWidth
//                     label="Profile Image"
//                     type="file"
//                     onChange={(e) => handleFileChange(e, setImage, setImageName)}
//                     inputProps={{ accept: "image/*" }}
//                     InputLabelProps={{ shrink: true }}
//                    required
//                   />
//                   {imageName && (
//                     <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                       {imageName}
//                     </Typography>
//                   )}
//                 </FormControl>
//               </Box>


//             </Grid>
//             <Grid container justifyContent="center" style={{ marginTop: 20 }}>
//               <Button type="submit" variant="contained" color="primary" size="small">
//                 Submit
//               </Button>
//             </Grid>
//           </form>
//         </Box>
//       </Grid>
//     </>
//   );
// };

// export default AdminKyc;

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
import Header from "../../../Shared/Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';


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

    const response = await fetch(`${baseurl}/users/`, {
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
      <Header />
      <Container maxWidth="lg" sx={{ p: 4 }}>
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
