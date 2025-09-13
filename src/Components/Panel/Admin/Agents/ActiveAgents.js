import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton
} from '@mui/material';
import Header from '../../../Shared/Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ActiveAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
    const rowsPerPage = 5; 
  const navigate = useNavigate();
  const referral_id = localStorage.getItem("referral_id");


    const startIndex = (page - 1) * rowsPerPage;
  const paginatedAgents = agents.slice(startIndex, startIndex + rowsPerPage);
  const pageCount = Math.ceil(agents.length / rowsPerPage);

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
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${baseurl}/users/status/active/`);
        setAgents(response.data); // assuming the API returns an array of agents
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);


  return (
    <>
      <Header />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "12%" }}>
          <h2 style={{ fontWeight: 'bold' }}>Active Users</h2>
        </div>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (

                     <Box
                     sx={{
                       width: "100%",
                       overflowX: "auto", 
                       display: "block",
                     }}
                   >
          <Table sx={{ border: '1px solid black', width: '100%', mt: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={cellStyle}>User Name</TableCell>
                <TableCell sx={cellStyle}>Email</TableCell>
                <TableCell sx={cellStyle}>Phone Number</TableCell>
                <TableCell sx={cellStyle}>Referral ID</TableCell>
                <TableCell sx={cellStyle}>Status</TableCell>
                {/* <TableCell sx={cellStyle}>Actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
           {paginatedAgents.length > 0 ? (
                  paginatedAgents.map((agent, index) => (
                  <TableRow key={index}>
                    <TableCell sx={cellBodyStyle}>{agent.username}</TableCell>
                    <TableCell sx={cellBodyStyle}>{agent.email}</TableCell>
                    <TableCell sx={cellBodyStyle}>{agent.phone_number}</TableCell>
                    <TableCell sx={cellBodyStyle}>{agent.referral_id || '—'}</TableCell>
                    <TableCell sx={cellBodyStyle}>{agent.status || '—'}</TableCell>
                    {/* <TableCell sx={cellBodyStyle}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          color="primary"
                        //   onClick={() => navigate(`/p-view-activeagents/${agent.user_id}`)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell> */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={noDataStyle}>
                    No active agents found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>




          </Box>
        )}

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
      </Container>
    </>
  );
};

export default ActiveAgents;