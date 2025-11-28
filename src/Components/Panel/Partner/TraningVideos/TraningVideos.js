import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
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
  Stack
} from '@mui/material';

function TrainingVideos() {
  const [materials, setMaterials] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState("all");

  const navigate = useNavigate();

  // Fetch training materials
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

  // Fetch departments
  useEffect(() => {
    fetch(`${baseurl}/departments/`)
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  // Filter materials based on selected department
  const filteredMaterials =
    selectedDept === "all"
      ? materials
      : materials.filter((item) => item.department === selectedDept);

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Training Materials
        </Typography>

        {/* ----------------------------- */}
        {/*  Department Tabs / Buttons   */}
        {/* ----------------------------- */}
        <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: "wrap" }}>
          <Button
            variant={selectedDept === "all" ? "contained" : "outlined"}
            onClick={() => setSelectedDept("all")}
          >
            All
          </Button>

          {departments.map((dept) => (
            <Button
              key={dept.id}
              variant={selectedDept === dept.id ? "contained" : "outlined"}
              onClick={() => setSelectedDept(dept.id)}
            >
              {dept.name}
            </Button>
          ))}
        </Stack>

        {/* ----------------------------- */}
        {/*  Loading Spinner              */}
        {/* ----------------------------- */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          /* ----------------------------- */
          /*  Video List                  */
          /* ----------------------------- */
          <Grid container spacing={4}>
            {filteredMaterials.length === 0 ? (
              <Typography variant="h6" sx={{ mt: 2, ml: 1 }}>
                No Training Materials Found.
              </Typography>
            ) : (
              filteredMaterials.map((item) => (
                <Grid item xs={12} md={4} key={item.id}>
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
              ))
            )}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default TrainingVideos;
