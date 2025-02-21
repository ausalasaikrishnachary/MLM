import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Header from "../../../Shared/Navbar/Navbar";

const investors = [
  { id: "ID001", name: "Naveen", email: "xyz@gmail.com", lastActive: "2 hours ago", status: "Active" },
  { id: "ID002", name: "Xyz", email: "zyx@gmail.com", lastActive: "3 hours ago", status: "Inactive" },
  { id: "ID003", name: "Bharath", email: "abc@gmail.com", lastActive: "30 min ago", status: "Inactive" },
  { id: "ID004", name: "Naveen", email: "zyx@gmail.com", lastActive: "5 hours ago", status: "Active" },
  { id: "ID005", name: "Abc", email: "abc@gmail.com", lastActive: "1 day ago", status: "Active" },
];

const Tmanagement = () => {
  const [sortBy, setSortBy] = useState("Latest");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option) => {
    if (option) {
      setSortBy(option);
    }
    setAnchorEl(null);
  };

  const getStatusColor = (status) => (status === "Active" ? "green" : "red");

  const columns = [
    { field: "id", headerName: "Asset ID", width: 150 },
    { field: "name", headerName: "Investor Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "lastActive", headerName: "Last Active", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Typography sx={{ color: getStatusColor(params.value) }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: "5px" }}>
          <IconButton size="small" color="primary">
            <VisibilityIcon />
          </IconButton>
          <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Container sx={{ maxWidth: "900px", pt: 3 }}>
        {/* Header */}
        <Typography variant="h4" component="h2" gutterBottom style={{textAlign:"center"}}>
          Investor Management
        </Typography>

        {/* Search, Sort & Filters Row */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            fullWidth
          />
          <Button variant="outlined" onClick={handleSortClick}>
            Sort by: {sortBy}
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleSortClose(null)}>
            <MenuItem onClick={() => handleSortClose("Latest")}>Latest</MenuItem>
            <MenuItem onClick={() => handleSortClose("Oldest")}>Oldest</MenuItem>
          </Menu>
          <Button variant="contained">Filters</Button>
        </Box>

        {/* DataGrid Table */}
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={investors}
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
