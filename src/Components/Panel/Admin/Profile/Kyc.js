import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from '../../../BaseURL/BaseURL';


const AdminKyc = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    role_ids: [],
    email: "",
    password: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
    status: "",
    pan_number: "",
    aadhaar_number: "",
    kyc_status: "Pending",
    account_holder_name: "",
    bank_name: "",
    branch_name: "",
    account_number: "",
    account_type: "",
    ifsc_code: "",
    nominee_reference_to: "",
    referral_id: "",
  });

  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [pancard, setPancard] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [image, setImage] = useState(null);
  const [pancardName, setPancardName] = useState("");
  const [aadharName, setAadharName] = useState("");
  const [imageName, setImageName] = useState("");
  const [partnerUsers, setPartnerUsers] = useState([]);

  useEffect(() => {
    fetch(`${baseurl}/roles/`)
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error("Error fetching roles:", err));

    fetch(`${baseurl}/users/`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));

    // Fetch users with role "Partner"
    fetch(`${baseurl}/users/role/Partner/`)
      .then((res) => res.json())
      .then((data) => setPartnerUsers(data))
      .catch((err) => console.error("Error fetching partner users:", err));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "role_ids") {
      setFormData({ ...formData, role_ids: [Number(e.target.value)] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (event, setFile, setFileName) => {
    const file = event.target.files[0];
    if (!file) return;
    setFile(file);
    setFileName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!pancard || !aadhar || !image) {
    //   alert("Please upload Pancard, Aadhar, and an Image.");
    //   return;
    // }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Append files ONLY if they are selected
    if (pancard) formDataToSend.append("pan", pancard);
    if (aadhar) formDataToSend.append("aadhaar", aadhar);
    if (image) formDataToSend.append("image", image);

    try {
      const response = await fetch(`${baseurl}/users/`, {
        method: "POST",
        body: formDataToSend,
      });
      const responseData = await response.json();
      if (response.ok) {
        alert("User registered successfully!");
        setUsers([...users, responseData]);
      } else {
        console.error("Server Error:", responseData);
        alert(`Failed to register user: ${JSON.stringify(responseData)}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  // Role Dialog States
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [newRole, setNewRole] = useState("");

  // Handle role addition popup
  const handleOpenRoleDialog = () => setOpenRoleDialog(true);
  const handleCloseRoleDialog = () => {
    setNewRole("");
    setOpenRoleDialog(false);
  };

  // Submit new role
  const handleAddRole = async () => {
    if (!newRole.trim()) {
      alert("Role name cannot be empty");
      return;
    }

    try {
      const response = await fetch(`${baseurl}/roles/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role_name: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to add role");
      }

      const addedRole = await response.json();
      setRoles([...roles, addedRole]); // Update roles list
      handleCloseRoleDialog(); // Close dialog
      alert("Role added successfully!");
    } catch (error) {
      console.error("Error adding role:", error);
      alert("Failed to add role");
    }
  };

  return (
    <>
      <Header />
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
        <Box style={{ padding: 20, maxWidth: 1200, margin: "auto", marginTop: 20, marginBottom: 50 }}>

          <Typography variant="h4" component="h2" gutterBottom align="center" marginBottom={5}>
            User Registration
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <Grid container spacing={2}>
              {Object.keys(formData).map(
                (key) =>
                  !["referral_id"].includes(key) &&
                  key !== "role_ids" && (
                    <Grid item xs={12} sm={4} key={key}>
                      <TextField
                        fullWidth
                        label={key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        type={key.includes("password") ? "password" : key.includes("date") ? "date" : "text"}
                        InputLabelProps={key.includes("date") ? { shrink: true } : {}}
                      />
                    </Grid>
                  )
              )}
              <Grid item xs={10} sm={3}>
                <TextField
                  select
                  fullWidth
                  label="Role"
                  name="role_ids"
                  value={formData.role_ids[0] || ""}
                  onChange={handleChange}
                  required
                >
                  {roles.map((role) => (
                    <MenuItem key={role.role_id} value={role.role_id}>
                      {role.role_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Add Role Button */}
              <Grid item xs={2} sm={1}>
                <IconButton color="primary" onClick={handleOpenRoleDialog}>
                  <AddIcon />
                </IconButton>
              </Grid>

              {/* Role Dialog Popup */}
              <Dialog open={openRoleDialog} onClose={handleCloseRoleDialog}>
                <DialogTitle>Add New Role</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Role Name"
                    type="text"
                    fullWidth
                    required
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseRoleDialog} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={handleAddRole} color="primary">
                    Add Role
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Referral ID Dropdown */}
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  label="Referral ID"
                  name="referral_id"
                  value={formData.referral_id}
                  onChange={handleChange}
                >
                  {partnerUsers.length > 0 ? (
                    partnerUsers.map((user) => (
                      <MenuItem key={user.user_id} value={user.user_id}>
                        {user.user_id} - {user.first_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Partners Available</MenuItem>
                  )}
                </TextField>
              </Grid>

              {/* <Box display="flex" justifyContent="center" alignItems="flex-start" gap={2} marginTop={3} marginBottom={3}>
                
                <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
                  <Button  variant="outlined" component="label">
                    Upload Pancard (PDF Only)
                    <input type="file" accept=".pdf" hidden onChange={(e) => handleFileChange(e, setPancard, setPancardName)} />
                  </Button>
                  {pancardName && <Typography variant="body2" color="textSecondary">{pancardName}</Typography>}
                </Box>

               
                <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
                  <Button variant="outlined" component="label">
                    Upload Aadhar Card (PDF Only)
                    <input type="file" accept=".pdf" hidden onChange={(e) => handleFileChange(e, setAadhar, setAadharName)} />
                  </Button>
                  {aadharName && <Typography variant="body2" color="textSecondary">{aadharName}</Typography>}
                </Box>

              
                <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
                  <Button variant="outlined" component="label">
                    Upload Image
                    <input type="file" accept="image/*" hidden onChange={(e) => handleFileChange(e, setImage, setImageName)} />
                  </Button>
                  {imageName && <Typography variant="body2" color="textSecondary">{imageName}</Typography>}
                </Box>
              </Box> */}

              <Box  display="flex" justifyContent="center" alignItems="flex-start" gap={2} marginTop={3} marginBottom={3}>
                {/* Pancard Upload */}
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    label="Pan Card"
                    type="file"
                    onChange={(e) => handleFileChange(e, setPancard, setPancardName)}
                    inputProps={{ accept: ".pdf" }}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                  {pancardName && (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      {pancardName}
                    </Typography>
                  )}
                </FormControl>

                {/* Aadhar Upload */}
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    label="Aadhar Card"
                    type="file"
                    onChange={(e) => handleFileChange(e, setAadhar, setAadharName)}
                    inputProps={{ accept: ".pdf" }}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                  {aadharName && (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      {aadharName}
                    </Typography>
                  )}
                </FormControl>

                {/* Image Upload */}
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    label="Profile Image"
                    type="file"
                    onChange={(e) => handleFileChange(e, setImage, setImageName)}
                    inputProps={{ accept: "image/*" }}
                    InputLabelProps={{ shrink: true }}
                   required
                  />
                  {imageName && (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      {imageName}
                    </Typography>
                  )}
                </FormControl>
              </Box>


            </Grid>
            <Grid container justifyContent="center" style={{ marginTop: 20 }}>
              <Button type="submit" variant="contained" color="primary" size="small">
                Submit
              </Button>
            </Grid>
          </form>
        </Box>
      </Grid>
    </>
  );
};

export default AdminKyc;
