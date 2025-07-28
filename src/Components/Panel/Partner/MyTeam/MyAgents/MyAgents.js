import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton
} from '@mui/material';
import PartnerHeader from '../../../../Shared/Partner/PartnerNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../../BaseURL/BaseURL';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PaginationComponent from '../../../../Shared/Pagination'; // ✅ added

const MyAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // ✅ added
  const itemsPerPage = 5; // ✅ added

  const navigate = useNavigate();
  const referral_id = localStorage.getItem("referral_id");

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
        const response = await axios.get(`${baseurl}/agents/referral-id/${referral_id}/`);
        setAgents(response.data.active_agents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [referral_id]);

  const totalPages = Math.ceil(agents.length / itemsPerPage); // ✅ added
  const paginatedAgents = agents.slice((page - 1) * itemsPerPage, page * itemsPerPage); // ✅ added

  const handlePageChange = (event, value) => {
    setPage(value); // ✅ added
  };

  return (
    <>
      <PartnerHeader />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "12%" }}>
          <h2 style={{ fontWeight: 'bold' }}>Active Agents</h2>
        </div>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Table sx={{ border: '1px solid black', width: '100%', mt: 3 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={cellStyle}>User Name</TableCell>
                  <TableCell sx={cellStyle}>Email</TableCell>
                  <TableCell sx={cellStyle}>Phone Number</TableCell>
                  <TableCell sx={cellStyle}>Referral ID</TableCell>
                  <TableCell sx={cellStyle}>Status</TableCell>
                  <TableCell sx={cellStyle}>Actions</TableCell>
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
                      <TableCell sx={cellBodyStyle}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => navigate(`/p-view-activeagents/${agent.user_id}`)}
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
                      </TableCell>
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

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <PaginationComponent
                count={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default MyAgents;
