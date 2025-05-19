import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import BuildIcon from '@mui/icons-material/Build';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';


// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
);

function Dashboard() {
  // Data and options for the Asset Performance bar chart
  const assetData = {
    labels: ['Property A', 'Property B', 'Property C'],
    datasets: [
      {
        data: [7500, 12000, 5000],
        backgroundColor: 'rgba(138, 113, 255, 0.8)',
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const assetOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { font: { size: 12 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
    },
  };

  // Data and options for the Revenue History line chart
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [22000, 25000, 27000, 25500, 29000, 31000],
        borderColor: 'rgba(138, 113, 255, 0.8)',
        backgroundColor: 'rgba(138, 113, 255, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(138, 113, 255, 0.8)',
        pointBorderWidth: 2,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { font: { size: 12 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
    },
  };

  return (
    <>
      <PartnerHeader />
      <Box
        sx={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/contemporary-building-blur_23-2147694747.jpg')",
          minHeight: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Container>
          <Typography variant="h4" sx={{ color: '#100f0f', fontWeight: 700, mb: 4, pl: 2,textAlign:"center" }}>
            Partner Dashboard
          </Typography>
          <Grid container spacing={3}>
            {/* Left Column */}

            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card sx={{ borderRadius: '15px', boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, mb: 2 }}>
                        Asset Performance
                      </Typography>
                      <Box sx={{ height: 280 }}>
                        <Bar data={assetData} options={assetOptions} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card sx={{ borderRadius: '15px', boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, mb: 2 }}>
                        Revenue History
                      </Typography>
                      <Box sx={{ height: 280 }}>
                        <Line data={revenueData} options={revenueOptions} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>


            {/* Right Column */}
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                {/* Required Actions Card */}
                <Card sx={{ borderRadius: '15px', boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, mb: 2 }}>
                      Required Actions
                    </Typography>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <AccessTimeIcon sx={{ fontSize: 24, color: '#5c6bc0' }} />
                        <Box>
                          <Typography variant="body1">
                            Property inspection required for 123 Main St
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#888' }}>
                            Due: Oct 15
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <DescriptionIcon sx={{ fontSize: 24, color: '#5c6bc0' }} />
                        <Box>
                          <Typography variant="body1">
                            Document verification pending for new investor
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#888' }}>
                            Due: Oct 16
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <BuildIcon sx={{ fontSize: 24, color: '#5c6bc0' }} />
                        <Box>
                          <Typography variant="body1">
                            Maintenance request needs approval
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#888' }}>
                            Due: Oct 18
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Financial Performance Card */}
                <Card sx={{ borderRadius: '15px', boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, mb: 2 }}>
                      Financial Performance
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #f0f0f0',
                        pb: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#888' }}>
                        Monthly Revenue
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#444', fontWeight: 700 }}>
                        25,000/-
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                {/* Asset Overview Card */}
                <Card sx={{ borderRadius: '15px', boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, mb: 2 }}>
                      Asset Overview
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" sx={{ color: '#888' }}>
                        Total Assets
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#444', fontWeight: 700 }}>
                        12
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ color: '#888' }}>
                        Active Listings
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#444', fontWeight: 700 }}>
                        8
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
