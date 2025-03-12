import React, { useEffect, useState } from "react";
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
import axios from "axios";

const Tmoniter = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://46.37.122.105:91/property/")
      .then((response) => {
        setProperties(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

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

  const filteredProperties = properties.filter((property) =>
    property.property_name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "property_id", headerName: "Property ID", width: 120 },
    { field: "property_name", headerName: "Property Name", width: 200 },
    { field: "property_type", headerName: "Type", width: 150 },
    { field: "location", headerName: "Location", width: 200 },
    { field: "city", headerName: "City", width: 100 },
    { field: "total_units", headerName: "Total Units", width: 120 },
    { field: "available_units", headerName: "Available Units", width: 150 },
    { field: "total_price", headerName: "Total Price", width: 150 },
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
      <Container sx={{ pt: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: "center" }}>
          Transaction Monitor
        </Typography>

        <Grid container spacing={2}>
          {summaryCardsData.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{textAlign: "center", p: 2, borderRadius: 2 }}>
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

        <Box sx={{ display: "flex", justifyContent: "right", gap: "10px", mt: 3, mb: 2 }}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{ width: "250px" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl size="small" sx={{ width: "120px" }}>
            <Select defaultValue="Latest">
              <MenuItem value="Latest">Latest</MenuItem>
              <MenuItem value="Oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" sx={{ width: "120px", fontSize: "14px", textTransform: "none" }}>
            Filters
          </Button>
        </Box>

        <Box sx={{ height: 400, width: "100%", mt: 3 }}>
          <DataGrid
            rows={filteredProperties}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            autoHeight
            disableSelectionOnClick
            loading={loading}
            getRowId={(row) => row.property_id}
          />
        </Box>
      </Container>
    </>
  );
};

export default Tmoniter;
