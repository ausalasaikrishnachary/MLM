import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from '../../../BaseURL/BaseURL';

const Tmanagement = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseurl}/users/`)
      .then((res) => {
        const transformed = res.data.map((user) => ({
          id: user.user_id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          phone: user.phone_number,
          status: user.status,
          role: user.roles[0]?.role_name || "",
          referralId: user.referral_id,
          kycStatus: user.kyc_status,
          fullData: user,
        }));
        setData(transformed);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleView = (user) => {
    navigate("/View_Tmanagement", { state: { user } });
  };

  const handleDelete = (user_id) => {
    axios
      .delete(`${baseurl}/users/${user_id}`)
      .then((res) => {
        if (res.status === 200) {
          setData((prevData) => prevData.filter((user) => user.id !== user_id));
          console.log("User deleted successfully");
        } else {
          console.error("Failed to delete user");
        }
      })
      .catch((err) => {
        console.error("Error deleting user:", err.response ? err.response.data : err);
        alert("Error deleting user, please try again.");
      });
  };

  const columns = [
    { field: "id", headerName: "User ID", width: 100 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Phone", width: 220 },
    { field: "role", headerName: "Role", width: 120 },
    { field: "referralId", headerName: "Referral ID", width: 140 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "5px" }}>
          <IconButton color="primary" onClick={() => handleView(params.row.fullData)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => navigate("/Edit_Tmanagement", { state: { user: params.row.fullData } })}
          >
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleCloseView = () => {
    setViewOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      {selectedUser && (
        <Dialog open={viewOpen} onClose={handleCloseView} maxWidth="sm" fullWidth>
          <DialogTitle>User Details</DialogTitle>
          <DialogContent dividers>
            <Box component="div" sx={{ display: "grid", rowGap: 2 }}>
              <Typography><strong>User ID:</strong> {selectedUser.user_id}</Typography>
              <Typography><strong>Referral ID:</strong> {selectedUser.referral_id}</Typography>
              <Typography><strong>First Name:</strong> {selectedUser.first_name}</Typography>
              <Typography><strong>Last Name:</strong> {selectedUser.last_name}</Typography>
              <Typography><strong>Gender:</strong> {selectedUser.gender || "N/A"}</Typography>
              <Typography><strong>Level No:</strong> {selectedUser.level_no || "N/A"}</Typography>
              <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
              <Typography><strong>Password (Hashed):</strong> {selectedUser.password}</Typography>
              <Typography><strong>Phone Number:</strong> {selectedUser.phone_number}</Typography>
              <Typography><strong>Date of Birth:</strong> {selectedUser.date_of_birth || "N/A"}</Typography>
              <Typography><strong>Address:</strong> {selectedUser.address || "N/A"}</Typography>
              <Typography><strong>City:</strong> {selectedUser.city || "N/A"}</Typography>
              <Typography><strong>State:</strong> {selectedUser.state || "N/A"}</Typography>
              <Typography><strong>Country:</strong> {selectedUser.country || "N/A"}</Typography>
              <Typography><strong>PIN Code:</strong> {selectedUser.pin_code || "N/A"}</Typography>
              <Typography><strong>Bank Name:</strong> {selectedUser.bank_name || "N/A"}</Typography>
              <Typography><strong>Account Holder Name:</strong> {selectedUser.account_holder_name || "N/A"}</Typography>
              <Typography><strong>Branch Name:</strong> {selectedUser.branch_name || "N/A"}</Typography>
              <Typography><strong>Account Type:</strong> {selectedUser.account_type || "N/A"}</Typography>
              <Typography><strong>Account Number:</strong> {selectedUser.account_number || "N/A"}</Typography>
              <Typography><strong>IFSC Code:</strong> {selectedUser.ifsc_code || "N/A"}</Typography>
              <Typography><strong>PAN Number:</strong> {selectedUser.pan || selectedUser.pan_number || "N/A"}</Typography>
              <Typography><strong>KYC Status:</strong> {selectedUser.kyc_status || "N/A"}</Typography>
              <Typography><strong>Aadhaar Number:</strong> {selectedUser.aadhaar_number || "N/A"}</Typography>
              <Typography><strong>Nominee Reference To:</strong> {selectedUser.nominee_reference_to || "N/A"}</Typography>
              <Typography><strong>Image:</strong> {selectedUser.image ? <img src={selectedUser.image} alt="User" width="100" /> : "N/A"}</Typography>
              <Typography><strong>Referred By:</strong> {selectedUser.referred_by || "N/A"}</Typography>
              <Typography><strong>Created At:</strong> {selectedUser.created_at}</Typography>
              <Typography><strong>Updated At:</strong> {selectedUser.updated_at}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseView} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}

      <Header />
      <Container sx={{ maxWidth: "900px", pt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Leads Management
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate("/a-add-lead")}>
            Add Lead
          </Button>
        </Box>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[4]}
            autoHeight
            disableSelectionOnClick
          />
        </Box>
      </Container>
    </>
  );
};

export default Tmanagement;
