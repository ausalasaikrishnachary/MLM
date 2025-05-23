import React, { useEffect, useState } from 'react';
import Header from "../../../Shared/Navbar/Navbar";
import {
  Table, TableBody, TableCell, TableHead, TableRow, 
  Typography, Box, Button, IconButton, Container
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function BookingSlab() {
  const [slabs, setSlabs] = useState([]);
  const [loading, setLoading] = useState(true);
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
    axios.get('https://rahul30.pythonanywhere.com/booking-slabs/')
      .then(response => {
        setSlabs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching booking slabs:', error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this slab?")) {
      axios.delete(`https://rahul30.pythonanywhere.com/booking-slabs/${id}/`)
        .then(() => {
          fetchSlabs(); // Refresh the list
        })
        .catch(error => {
          console.error('Error deleting slab:', error);
        });
    }
  };

  useEffect(() => {
    fetchSlabs();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "8%" }}>
          <h2 style={{ fontWeight: 'bold' }}>Booking Slabs</h2>
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/a-add-booking-slab')}
          >
            Add Slab
          </Button>
        </Box>

        <Table sx={{ border: '1px solid black', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>ID</TableCell>
              <TableCell sx={cellStyle}>Min Value</TableCell>
              <TableCell sx={cellStyle}>Max Value</TableCell>
              <TableCell sx={cellStyle}>Booking Amount</TableCell>
              <TableCell sx={cellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} sx={noDataStyle}>Loading...</TableCell>
              </TableRow>
            ) : slabs.length > 0 ? (
              slabs.map((slab) => (
                <TableRow key={slab.id}>
                  <TableCell sx={cellBodyStyle}>{slab.id}</TableCell>
                  <TableCell sx={cellBodyStyle}>₹{parseFloat(slab.min_value).toLocaleString()}</TableCell>
                  <TableCell sx={cellBodyStyle}>₹{parseFloat(slab.max_value).toLocaleString()}</TableCell>
                  <TableCell sx={cellBodyStyle}>₹{parseFloat(slab.booking_amount).toLocaleString()}</TableCell>
                  <TableCell sx={cellBodyStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/a-edit-booking-slab/${slab.id}`)}
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
      </Container>
    </>
  );
}

export default BookingSlab;