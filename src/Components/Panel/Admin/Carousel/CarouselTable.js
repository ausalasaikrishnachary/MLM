import React, { useEffect, useState } from 'react';
import Header from "../../../Shared/Navbar/Navbar";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography, Box, Button, IconButton, Container,
  Avatar
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseurl } from '../../../BaseURL/BaseURL';
import { display } from '@mui/system';

function CarouselList() {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setCarousels(carousels.filter(carousel => carousel.id !== id));
    } catch (error) {
      console.error('Error deleting carousel:', error);
    }
  };

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
            ) : carousels.length > 0 ? (
              carousels.map((carousel) => (
                <TableRow key={carousel.id}>
                  <TableCell sx={cellBodyStyle}>{carousel.id}</TableCell>
                  <TableCell
                    sx={{
                      ...cellBodyStyle,
                      
                    }}
                  >
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
                      {/* <IconButton
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/edit-carousel/${carousel.id}`)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton> */}
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
      </Container>
    </>
  );
}

export default CarouselList;