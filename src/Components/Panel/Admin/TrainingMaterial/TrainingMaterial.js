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
  Pagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function TrainingMaterial() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4">Training Materials</Typography>
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
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="video"
                      src={`${baseurl}${item.video}`}
                      controls
                      height="150"
                    />
                    <CardContent>
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
