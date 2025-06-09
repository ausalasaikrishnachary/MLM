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

const ActiveAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
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
              {agents.length > 0 ? (
                agents.map((agent, index) => (
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
        )}
      </Container>
    </>
  );
};

export default ActiveAgents;