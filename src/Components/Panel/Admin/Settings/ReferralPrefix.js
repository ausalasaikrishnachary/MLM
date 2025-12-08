import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Box, Button, IconButton, Container, Pagination, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';

function ReferralPrefix() {
  const [prefixes, setPrefixes] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrefixes();
  }, []);

  const fetchPrefixes = async () => {
    try {
      const response = await axios.get(`${baseurl}/referral-prefix/`);
      console.log('Fetched referral prefixes:', response.data);
      setPrefixes(response.data);
    } catch (error) {
      console.error('Error fetching referral prefixes:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this prefix?')) {
      try {
        await axios.delete(`${baseurl}/referral-prefix/${id}/`);
        const updated = prefixes.filter(prefix => prefix.id !== id);
        setPrefixes(updated);

        const newTotalPages = Math.ceil(updated.length / itemsPerPage);
        if (page > newTotalPages && newTotalPages > 0) {
          setPage(newTotalPages);
        }
      } catch (error) {
        console.error('Error deleting prefix:', error);
        alert('Failed to delete prefix');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-referral-prefix/${id}`);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(prefixes.length / itemsPerPage);
  const paginatedPrefixes = prefixes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return dateString;
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: "30px" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: {
              xs: "1.8rem",
              sm: "2.1rem",
              md: "2.2rem",
            },
            fontWeight: "bold",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: '10px',
          }}
        >
          Referral Prefix Management
        </Typography>
      </div>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/add-referral-prefix')}
          sx={{ fontWeight: 'bold' }}
        >
          Add New Prefix
        </Button>
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
              <TableCell sx={cellStyle}>Prefix</TableCell>
              <TableCell sx={cellStyle}>Created At</TableCell>
              <TableCell sx={cellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPrefixes.length > 0 ? (
              paginatedPrefixes.map((prefix, index) => (
                <TableRow key={prefix.id}>
                  <TableCell sx={cellBodyStyle}>
                    {(page - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell sx={cellBodyStyle}>
                    <Typography sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      {prefix.prefix}
                    </Typography>
                  </TableCell>
                  <TableCell sx={cellBodyStyle}>
                    {formatDate(prefix.created_at)}
                  </TableCell>
                  <TableCell sx={cellBodyStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(prefix.id)}
                        sx={{ border: '1px solid #1976d2' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(prefix.id)}
                        sx={{ border: '1px solid #d32f2f' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={noDataStyle}>
                  No referral prefixes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "4px",
                fontWeight: 'bold',
              },
            }}
          />
        </Box>
      )}
    </>
  );
}

export default ReferralPrefix;