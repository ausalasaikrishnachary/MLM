import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  CardContent,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Header from "../../../Shared/Partner/PartnerNavbar";

// Define summaryCardsData for the summary cards section
const summaryCardsData = [
  { title: "Total Leads", value: "5", subtext: "Active Investors" },
  { title: "Active", value: "3", subtext: "Currently active" },
  { title: "Inactive", value: "2", subtext: "Currently inactive" },
];


const leadNames = ["Naveen", "Xyz", "Bharath", "Abc"];
const leadStatuses = ["New", "In Progress", "Closed"];

const investors = [
  { id: "ID001", name: "Naveen", email: "xyz@gmail.com", lastActive: "2 hours ago", status: "Active", source: "Referral", assignedTo: "Naveen", leadStatus: "New" },
  { id: "ID002", name: "Xyz", email: "zyx@gmail.com", lastActive: "3 hours ago", status: "Inactive", source: "Online Ad", assignedTo: "Xyz", leadStatus: "In Progress" },
  { id: "ID003", name: "Bharath", email: "abc@gmail.com", lastActive: "30 min ago", status: "Inactive", source: "Event", assignedTo: "Bharath", leadStatus: "Closed" },
  { id: "ID004", name: "Naveen", email: "zyx@gmail.com", lastActive: "5 hours ago", status: "Active", source: "Cold Call", assignedTo: "Naveen", leadStatus: "New" },
  { id: "ID005", name: "Abc", email: "abc@gmail.com", lastActive: "1 day ago", status: "Active", source: "Website", assignedTo: "Abc", leadStatus: "In Progress" },
];

const Tmanagement = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("Latest");
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState(investors);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option) => {
    if (option) {
      setSortBy(option);
    }
    setAnchorEl(null);
  };
  const handleDropdownChange = (id, field, value) => {
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const getStatusColor = (status) => (status === "Active" ? "green" : "red");

  const columns = [
    { field: "id", headerName: "Lead ID", width: 150 },
    { field: "name", headerName: "Lead Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "lastActive", headerName: "Last Active", width: 180 },
    { field: "source", headerName: "Source", width: 150 },
//     {
//       field: "assignedTo",
//       headerName: "Assign to Lead",
//       width: 180,
//       renderCell: (params) => (
//         <FormControl fullWidth>
//           <Select
//             value={params.value}
//             onChange={(e) => handleDropdownChange(params.id, "assignedTo", e.target.value)}
//             size="small"
//           >
//             {leadNames.map((name) => (
//               <MenuItem key={name} value={name}>
//                 {name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       ),
//     },
    {
      field: "leadStatus",
      headerName: "Lead Status",
      width: 180,
      renderCell: (params) => (
        <FormControl fullWidth sx={{ mt: 0.6}}>
          <Select
            value={params.value}
            onChange={(e) => handleDropdownChange(params.id, "leadStatus", e.target.value)}
            size="small"
          >
            {leadStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
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
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Leads Management
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate("/p-addleads")}>
            Add Lead
          </Button>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={2}>
          {summaryCardsData.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "#ffff",
                  textAlign: "center",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardContent>
                  <Typography  gutterBottom>
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
        <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", mb: 2, gap: 2,mt: 3, }}>
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
