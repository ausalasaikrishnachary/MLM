import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';
import Header from '../../../Shared/Navbar/Navbar';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Button,
  Pagination,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

function TrainingMaterial() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = () => {
    fetch(`${baseurl}/training-materials/`)
      .then((res) => res.json())
      .then((data) => {
        setMaterials(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching training materials:', error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${baseurl}/training-materials/${id}/`, {
          method: 'DELETE',
        })
        .then((res) => {
          if (res.ok) {
            Swal.fire(
              'Deleted!',
              'Training material has been deleted.',
              'success'
            );
            fetchMaterials(); // Refresh the list
          } else {
            throw new Error('Failed to delete');
          }
        })
        .catch((error) => {
          console.error('Error deleting training material:', error);
          Swal.fire(
            'Error!',
            'Failed to delete training material.',
            'error'
          );
        });
      }
    });
  };

  const handleEdit = (material) => {
    navigate('/a-edittrainingmaterial', { state: { material } });
  };

  const totalPages = Math.ceil(materials.length / itemsPerPage);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const paginatedMaterials = materials.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 5, mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: {
              xs: "2.0rem",  
              sm: "2.1rem",   
              md: "2.2rem",     
            },
            fontWeight: "bold",  
            textAlign: "center",    
            whiteSpace: "nowrap",   
            overflow: "hidden",
            textOverflow: "ellipsis", 
            marginBottom:'15px',
          }}
        >
         Training Materials
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4"></Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/a-addtrainingmaterial')}
          >
            Add Video
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={4}>
              {paginatedMaterials.map((item, index) => (
                <Grid item xs={12} md={4} key={item.id || index}>
                  <Card sx={{ position: 'relative' }}>
                    <CardMedia
                      component="video"
                      src={`${baseurl}/${item.video}`}
                      controls
                      height="150"
                    />
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                        <Typography variant="body2" color="primary" gutterBottom sx={{ mb: 0 }}>
                          Category: {item.category}
                        </Typography>
                        <Box>
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleEdit(item)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDelete(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
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
          </>
        )}
      </Container>
    </>
  );
}

export default TrainingMaterial;