import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../../Shared/Navbar/Navbar";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Box, Button, IconButton, Container, Pagination, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';

function TableAdminMeetings() {
  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${baseurl}/phonenumbers/`);
      console.log('Fetched data:', response.data);
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseurl}/phonenumbers/${id}/`);
      const updated = admins.filter(admin => admin.id !== id);
      setAdmins(updated);

      const newTotalPages = Math.ceil(updated.length / itemsPerPage);
      if (page > newTotalPages) {
        setPage(newTotalPages);
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(admins.length / itemsPerPage);
  const paginatedAdmins = admins.slice(
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

  return (
    <>
      <Header />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "8%" }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Helpline Number
          </Typography>
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/admin-meetings')} // update to your actual add page route
          >
            Add Phone Number
          </Button>
        </Box>

        <Table sx={{ border: '1px solid black', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>S.No</TableCell>
              <TableCell sx={cellStyle}>Name</TableCell>
              <TableCell sx={cellStyle}>Phone Number</TableCell>
              <TableCell sx={cellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAdmins.length > 0 ? (
              paginatedAdmins.map((admin, index) => (
                <TableRow key={admin.id}>
                  <TableCell sx={cellBodyStyle}>
                    {(page - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell sx={cellBodyStyle}>{admin.name}</TableCell>
                  <TableCell sx={cellBodyStyle}>{admin.phone_number}</TableCell>
                  <TableCell sx={cellBodyStyle}>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(admin.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={noDataStyle}>No admins found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "0px",
              },
            }}
          />
        </Box>
      </Container>
    </>
  );
}

export default TableAdminMeetings;
