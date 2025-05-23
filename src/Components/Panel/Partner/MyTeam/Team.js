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

const Team = () => {
  const [agents, setAgents] = useState([]);
  const [allAgents, setAllAgents] = useState([]); // Store all agents for filtering
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');
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
        setAllAgents(response.data.agents); // Store all agents
        setAgents(response.data.agents); // Initially show all agents
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
    
    if (value === '') {
      setAgents(allAgents); // Show all when no filter
    } else {
      const filtered = allAgents.filter(agent => 
        value === 'active' ? agent.status === 'Active' : agent.status === 'Inactive'
      );
      setAgents(filtered);
    }
  };

  return (
    <>
      <PartnerHeader />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "12%" }}>
          <h2 style={{ fontWeight: 'bold' }}>Team</h2>
        </div>

        {/* Sort By Dropdown */}
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
              {agents.length > 0 ? (
                agents.map((agent) => (
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
        )}
      </Container>
    </>
  );
};

export default Team;