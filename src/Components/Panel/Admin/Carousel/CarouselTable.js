import React, { useEffect, useState } from 'react';
import Header from "../../../Shared/Navbar/Navbar";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography, Box, Button, IconButton, Container,
  Avatar, Pagination
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseurl } from '../../../BaseURL/BaseURL';

function CarouselList() {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await axios.get(`${baseurl}/carousel/`);
        setCarousels(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching carousels:', error);
        setLoading(false);
      }
    };

    fetchCarousels();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseurl}/carousel/${id}/`);
      const updated = carousels.filter(carousel => carousel.id !== id);
      setCarousels(updated);

      // Adjust page if current page has no items after deletion
      const newTotalPages = Math.ceil(updated.length / itemsPerPage);
      if (page > newTotalPages) {
        setPage(newTotalPages);
      }
    } catch (error) {
      console.error('Error deleting carousel:', error);
    }
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(carousels.length / itemsPerPage);
  const paginatedCarousels = carousels.slice(
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

  const imageStyle = {
    width: 80,
    height: 60,
    objectFit: 'cover',
    borderRadius: 1,
  };

  return (
    <>
      <Header />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "8%" }}>
          <h2 style={{ fontWeight: 'bold' }}>Carousel Items</h2>
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/a-carousel')}
          >
            Add Carousel
          </Button>
        </Box>

        <Table sx={{ border: '1px solid black', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>ID</TableCell>
              <TableCell sx={cellStyle}>Image</TableCell>
              <TableCell sx={cellStyle}>Title</TableCell>
              <TableCell sx={cellStyle}>Description</TableCell>
              <TableCell sx={cellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} sx={noDataStyle}>Loading...</TableCell>
              </TableRow>
            ) : paginatedCarousels.length > 0 ? (
              paginatedCarousels.map((carousel) => (
                <TableRow key={carousel.id}>
                  <TableCell sx={cellBodyStyle}>{carousel.id}</TableCell>
                  <TableCell sx={cellBodyStyle}>
                    <Avatar
                      variant="square"
                      src={`${baseurl}/${carousel.image}`}
                      sx={imageStyle}
                      alt={carousel.title}
                    />
                  </TableCell>
                  <TableCell sx={cellBodyStyle}>{carousel.title}</TableCell>
                  <TableCell sx={cellBodyStyle}>{carousel.description}</TableCell>
                  <TableCell sx={cellBodyStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(carousel.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={noDataStyle}>No carousel items found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
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

export default CarouselList;
