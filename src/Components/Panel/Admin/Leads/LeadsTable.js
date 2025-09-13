import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Typography,
  Box,
  TextField,
  Pagination,
  IconButton,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2';
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from "../../../BaseURL/BaseURL";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const LeadsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

const [page, setPage] = useState(1);
    const rowsPerPage = 5; 

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
    setPage(1); // Reset to first page on search change
  }, [searchTerm, data]);


const itemsPerPage = rowsPerPage; // make sure pagination uses the same rows per page
const pageCount = Math.ceil(filteredData.length / itemsPerPage);

// Slice data for current page
const paginatedData = filteredData.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
);


  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <>
      <Header />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "10%" }}>
          <Typography
                                 variant="h4"
                                 sx={{
                                     fontSize: {
                                         xs: "1.8rem",
                                         sm: "2.1rem",
                                         md: "2.0rem",
                                     },
                                     fontWeight: "bold",
                                     whiteSpace: "nowrap",
                                     overflow: "hidden",
                                     textOverflow: "ellipsis",
                                     textAlign:'center',
                                     marginBottom:'10px',
                                 }}
                             >
            Leads Management
          </Typography>
        </div>

        {error && (
          <Box sx={{ color: 'error.main', textAlign: 'center', mb: 2 }}>
            {error}
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: {xs:"center",sm:"flex-end", md:"flex-end"}, alignItems: 'center', mb: 2 }}>
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
            }}
          />
        </Box>



           <Box
           sx={{
             width: "100%",
             overflowX: "auto", 
             display: "block",
           }}
         >
        <Table sx={{ border: '1px solid black', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>S.No</TableCell>
              <TableCell sx={cellStyle}>Name</TableCell>
              <TableCell sx={cellStyle}>Email</TableCell>
              <TableCell sx={cellStyle}>Phone Number</TableCell>
            </TableRow>
          </TableHead>

     <TableBody>
  {loading ? (
    <TableRow>
      <TableCell colSpan={4} sx={noDataStyle}>Loading...</TableCell>
    </TableRow>
  ) : paginatedData.length > 0 ? (
    paginatedData.map((lead, index) => (
      <TableRow key={lead.id || lead.email}>
        <TableCell sx={cellBodyStyle}>
          {(page - 1) * itemsPerPage + index + 1}
        </TableCell>
        <TableCell sx={cellBodyStyle}>{lead.first_name || '-'}</TableCell>
        <TableCell sx={cellBodyStyle}>{lead.email || '-'}</TableCell>
        <TableCell sx={cellBodyStyle}>{lead.phone_number || '-'}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={4} sx={noDataStyle}>
        {searchTerm ? 'No matching leads found' : 'No Leads Found'}
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
     
        </Box>

        {/* Pagination Controls */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
           {pageCount > 1 && (
  <Box display="flex" justifyContent="flex-end" mt={2}>
    <Box display="flex" alignItems="center" gap={1}>
      {/* Prev Button */}
      <IconButton
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        sx={{
          borderRadius: "4px", // square button
          width: { xs: 32, sm: 36, md: 40 },
          height: { xs: 32, sm: 36, md: 40 },
        }}
      >
        <ChevronLeftIcon
          fontSize="small"
          sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }}
        />
      </IconButton>

      {/* Show only 3 pages (current, prev, next) */}
      {[...Array(pageCount)].map((_, i) => {
        const pageNum = i + 1;
        if (
          pageNum === page ||
          pageNum === page - 1 ||
          pageNum === page + 1
        ) {
          return (
            <IconButton
              key={pageNum}
              onClick={() => setPage(pageNum)}
              sx={{
                borderRadius: "4px", // square
                width: { xs: 32, sm: 36, md: 35 },
                height: { xs: 32, sm: 36, md: 38 },
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                backgroundColor: page === pageNum ? "primary.main" : "transparent",
                color: page === pageNum ? "#fff" : "inherit",
                "&:hover": {
                  backgroundColor:
                    page === pageNum ? "primary.dark" : "#f0f0f0",
                },
              }}
            >
              {pageNum}
            </IconButton>
          );
        }
        return null;
      })}

      {/* Next Button */}
      <IconButton
        disabled={page === pageCount}
        onClick={() => setPage(page + 1)}
        sx={{
          borderRadius: "4px", // square button
          width: { xs: 32, sm: 36, md: 40 },
          height: { xs: 32, sm: 36, md: 40 },
        }}
      >
        <ChevronRightIcon
          fontSize="small"
          sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }}
        />
      </IconButton>
    </Box>
  </Box>
)}
        </Box>
      </Container>
    </>
  );
};

export default LeadsTable;
