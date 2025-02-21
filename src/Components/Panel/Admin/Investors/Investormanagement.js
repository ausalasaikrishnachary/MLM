import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Menu,
  MenuItem,
  Grid,
  Card,
  CardContent
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Header from "../../../Shared/Navbar/Navbar";

// Define summaryCardsData for the summary cards section
const summaryCardsData = [
  { title: "Total Leads", value: "5", subtext: "Active Investors" },
  { title: "Active", value: "3", subtext: "Currently active" },
  { title: "Inactive", value: "2", subtext: "Currently inactive" },
];

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
    { field: "name", headerName: "Lead Name", width: 200 },
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
        <Typography variant="h4" component="h2" gutterBottom style={{ textAlign: "center" }}>
          Leads Management
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={2}>
          {summaryCardsData.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "#f8f9fa",
                  textAlign: "center",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="h4" sx={{ color: "rgb(30,10,80)" }}>
                    {card.value}
                  </Typography>
                  <Typography variant="body2">{card.subtext}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Search, Sort & Filters Row */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2, gap: 2,mt: 3, }}>
          <TextField
             placeholder="Search..."
             variant="outlined"
             size="small"
             sx={{ width: "250px" }}
          />
          <Button variant="outlined" onClick={handleSortClick}>
            {sortBy}
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
