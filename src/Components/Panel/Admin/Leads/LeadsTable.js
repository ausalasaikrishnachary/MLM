import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Container,
  Typography,
  Box,
  TextField,
  Grid
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Swal from 'sweetalert2';
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../../Shared/Navbar/Navbar";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { baseurl } from "../../../BaseURL/BaseURL";

const LeadsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const cellStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #000',
    backgroundColor: '#f0f0f0',
  };

  const cellBodyStyle = {
    textAlign: 'center',
    border: '1px solid #000',
  };

  const noDataStyle = {
    textAlign: 'center',
    border: '1px solid #000',
    padding: 2,
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        console.log("Fetching leads data from API...");
        const response = await axios.get(`${baseurl}/leads/`);
        console.log("API response received:", response.data);
        
        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
          setFilteredData(response.data);
        } else {
          console.warn("Unexpected API response format:", response.data);
          setError("Unexpected data format received from server");
        }
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError("Failed to load leads data");
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch leads data',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(lead => 
        (lead.first_name && lead.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.last_name && lead.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.phone_number && lead.phone_number.includes(searchTerm))
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  return (
    <>
      <Header />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "10%" }}>
          <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
            Leads Management
          </Typography>
        </div>

        {error && (
          <Box sx={{ color: 'error.main', textAlign: 'center', mb: 2 }}>
            {error}
          </Box>
        )}

       <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
  <TextField
    variant="outlined"
    placeholder="Search by name, email or phone"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    InputProps={{
      startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
    }}
    sx={{
      minWidth: 300,
      '& .MuiOutlinedInput-root': {
        borderRadius: '4px',
        backgroundColor: '#f5f5f5',
      },
    }}
  />
</Box>

        <Table sx={{ border: '1px solid black', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>S.No</TableCell>
              <TableCell sx={cellStyle}>First Name</TableCell>
              <TableCell sx={cellStyle}>Last Name</TableCell>
              <TableCell sx={cellStyle}>Email</TableCell>
              <TableCell sx={cellStyle}>Phone Number</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} sx={noDataStyle}>Loading...</TableCell>
              </TableRow>
            ) : filteredData.length > 0 ? (
              filteredData.map((lead, index) => (
                <TableRow key={lead.id || lead.email}>
                  <TableCell sx={cellBodyStyle}>{index + 1}</TableCell>
                  <TableCell sx={cellBodyStyle}>{lead.first_name || '-'}</TableCell>
                  <TableCell sx={cellBodyStyle}>{lead.last_name || '-'}</TableCell>
                  <TableCell sx={cellBodyStyle}>{lead.email || '-'}</TableCell>
                  <TableCell sx={cellBodyStyle}>{lead.phone_number || '-'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={noDataStyle}>
                  {searchTerm ? 'No matching leads found' : 'No Leads Found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default LeadsTable;