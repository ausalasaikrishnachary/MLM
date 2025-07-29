// import React from 'react'

// function CommissionLevels() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default CommissionLevels


import React, { useEffect, useState } from 'react';
import Header from "../../../Shared/Navbar/Navbar";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Box, Button, IconButton, Container, Pagination
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseurl } from '../../../BaseURL/BaseURL';

function CommissionLevels() {
  const [slabs, setSlabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

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

  const fetchSlabs = () => {
    setLoading(true);
    axios.get(`${baseurl}/commissions-master/`)
      .then(response => {
        setSlabs(response.data);
        setPage(1); // reset to first page on data load
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching :', error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Level?")) {
      axios.delete(`${baseurl}/commissions-master/${id}/`)
        .then(() => {
          fetchSlabs(); // Refresh the list
        })
        .catch(error => {
          console.error('Error deleting level:', error);
        });
    }
  };

  useEffect(() => {
    fetchSlabs();
  }, []);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(slabs.length / itemsPerPage);
  const paginatedSlabs = slabs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Header />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "8%" }}>
          <h2 style={{ fontWeight: 'bold' }}>Commission Levels</h2>
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/a-add-commissionmaster')}
          >
            Add Levels
          </Button>
        </Box>

        <Table sx={{ border: '1px solid black', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>Level_no</TableCell>
              <TableCell sx={cellStyle}>Percentage</TableCell>
              <TableCell sx={cellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} sx={noDataStyle}>Loading...</TableCell>
              </TableRow>
            ) : paginatedSlabs.length > 0 ? (
              paginatedSlabs.map((slab) => (
                <TableRow key={slab.id}>
                  <TableCell sx={cellBodyStyle}>{parseFloat(slab.level_no).toLocaleString()}</TableCell>
                  <TableCell sx={cellBodyStyle}>{parseFloat(slab.percentage).toLocaleString()}%</TableCell>
                  <TableCell sx={cellBodyStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/a-edit-commissionmaster/${slab.id}`)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(slab.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={noDataStyle}>No booking slabs found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Always show pagination when data is present */}
        {!loading && slabs.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 0, // Square shape
                },
              }}
            />

          </Box>
        )}
      </Container>
    </>
  );
}

export default CommissionLevels;
