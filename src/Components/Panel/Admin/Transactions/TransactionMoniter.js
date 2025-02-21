import React from "react";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../../Shared/Navbar/Navbar";

const Tmoniter = () => {
  const summaryCardsData = [
    {
      title: "Total Transactions",
      value: "1274",
      subtext: "Last 7 Days",
    },
    {
      title: "Success Rate",
      value: "99.5%",
      subtext: "+2.3% from last week",
    },
    {
      title: "Total Volume",
      value: "2cr",
      subtext: "+12% increase",
    },
  ];

  const transactions = [
    {
      id: "ID001",
      date: "08-02-2025",
      desc: "Monthly subscription",
      amount: "50000/-",
      status: "Successful",
    },
    {
      id: "ID002",
      date: "07-02-2025",
      desc: "Service payment",
      amount: "500000/-",
      status: "Pending",
    },
    {
      id: "ID003",
      date: "06-02-2025",
      desc: "Product purchase",
      amount: "50000/-",
      status: "Failed",
    },
    {
      id: "ID004",
      date: "08-02-2025",
      desc: "Monthly subscription",
      amount: "50000/-",
      status: "Successful",
    },
  ];

  // Helper to set status text color
  const getStatusColor = (status) => {
    if (status === "Successful") return "green";
    if (status === "Pending") return "orange";
    if (status === "Failed") return "red";
    return "inherit";
  };

  // Define columns for the DataGrid
  const columns = [
    {
      field: "id",
      headerName: "Asset ID",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "desc",
      headerName: "Description",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerAlign: "center",
      align: "center",
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
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          <IconButton size="small">
            <VisibilityIcon />
          </IconButton>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: "red" }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Container sx={{ pt: 3 }}>
        {/* Page Title */}
        <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign:"center" }}>
          Transaction Monitor
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

        {/* Centered Search and Filters */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            mt: 3,
            mb: 2,
          }}
        >
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{ width: "250px" }}
          />
          <FormControl size="small" sx={{ width: "120px" }}>
            <Select defaultValue="Latest">
              <MenuItem value="Latest">Latest</MenuItem>
              <MenuItem value="Oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            sx={{
              width: "120px",
              fontSize: "14px",
              padding: "5px",
              backgroundColor: "white",
              border: "1px solid #ced4da",
              color: "black",
              textTransform: "none",
              "&:hover": { backgroundColor: "#f8f9fa" },
            }}
          >
            Filters
          </Button>
        </Box>

        {/* Transactions DataGrid */}
        <Box sx={{ height: 400, width: "100%", mt: 3 }}>
          <DataGrid
            rows={transactions}
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

export default Tmoniter;
