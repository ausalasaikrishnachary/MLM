import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Box, List, ListItem, ListItemText, LinearProgress, useMediaQuery } from "@mui/material";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Report = () => {
  const isMobile = useMediaQuery("(max-width:767px)");

  const financialReturnsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Financial Returns",
        data: [1200, 1500, 1700, 1600, 2000, 2500, 2200],
        borderColor: "rgb(11, 174, 41)",
        backgroundColor: "rgba(86, 142, 102, 0.4)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const trendAnalysisData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Trend Analysis",
        data: [1200, 1500, 1700, 1600, 2000, 2500, 2200, 2000, 2100],
        borderColor: "rgb(33, 4, 148)",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Predictions",
        data: [1300, 1600, 1800, 1700, 2100, 2600, 2300, 2100, 2200],
        borderColor: "rgba(0, 123, 255, 1)",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      <PartnerHeader />
      {/* AppBar for header */}
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Partner Dashboard</Typography>
        </Toolbar>
      </AppBar> */}

      <Container maxWidth="lg" >
        
        <Box mt={4}>
          <Grid container spacing={3}>
            {/* Financial Returns Chart */}
            <Grid item xs={12} md={6} mt={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" align="center" gutterBottom>
                    Financial Returns
                  </Typography>
                  <Line data={financialReturnsData} />
                </CardContent>
              </Card>
            </Grid>

            {/* Trend Analysis Chart */}
            <Grid item xs={12} md={6} mt={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" align="center" gutterBottom>
                    Trend Analysis & Predictions
                  </Typography>
                  <Line data={trendAnalysisData} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Custom Reports Heading */}
          <Grid container spacing={3} alignItems="center" mt={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight="600">
                Custom Reports
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} textAlign="right">
              <Button variant="contained" color="primary">
                Export Report
              </Button>
            </Grid>
          </Grid>

          {/* Performance Summary and Key Insights */}
          <Grid container spacing={3} mt={4}>
            {/* Performance Summary */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" align="center" gutterBottom>
                    Performance Summary
                  </Typography>

                  <Box mt={2}>
                    <Typography>Return on Investment (+12.5%)</Typography>
                    <LinearProgress variant="determinate" value={75} color="success" />
                  </Box>

                  <Box mt={2}>
                    <Typography>Occupancy Rate (+12.5%)</Typography>
                    <LinearProgress variant="determinate" value={75} color="success" />
                  </Box>

                  <Box mt={2}>
                    <Typography>Monthly Revenue (+12.5%)</Typography>
                    <LinearProgress variant="determinate" value={75} color="success" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Key Insights */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" align="center" gutterBottom>
                    Key Insights
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="✅ ROI increased by 15% compared to last quarter" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="✅ Occupancy rate maintains steady at 95%" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="✅ Monthly revenue exceeds projections by 8%" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Report;
