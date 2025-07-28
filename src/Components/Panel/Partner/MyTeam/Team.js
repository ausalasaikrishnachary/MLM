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
  IconButton,
  Grid,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PaginationComponent from '../../../Shared/Pagination'; // ✅ added

const Team = () => {
  const [agents, setAgents] = useState([]);
  const [allAgents, setAllAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');
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
        setAllAgents(response.data.agents);
        setAgents(response.data.agents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [referral_id]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    setPage(1); // ✅ reset page when filter changes

    if (value === '') {
      setAgents(allAgents);
    } else {
      const filtered = allAgents.filter(agent =>
        value === 'active' ? agent.status === 'Active' : agent.status === 'Inactive'
      );
      setAgents(filtered);
    }
  };

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
          <h2 style={{ fontWeight: 'bold' }}>Team</h2>
        </div>

        <Grid container justifyContent="flex-end" sx={{ mt: 2, mb: 2 }}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                displayEmpty
                sx={{
                  borderRadius: '8px',
                  fontSize: '15px'
                }}
              >
                <MenuItem value="">
                  <em>All Agents</em>
                </MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

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
                  paginatedAgents.map((agent) => (
                    <TableRow key={agent.user_id}>
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
                            onClick={() => navigate(`/p-view-teamdetails/${agent.user_id}`)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} sx={noDataStyle}>
                      No Team Data Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <PaginationComponent // ✅ added
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

export default Team;
