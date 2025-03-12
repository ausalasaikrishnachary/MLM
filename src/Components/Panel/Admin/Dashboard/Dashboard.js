import React from "react";
import { Box, Grid, Card, Typography, Stack } from "@mui/material";
import { ArrowUpward, Business, People } from "@mui/icons-material";
import './Dashboard.css'
import { Edit, Delete } from "@mui/icons-material";
import { faInstagram, faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import {
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Paper,
  useTheme,
  Container,
  Menu,
  MenuItem,


} from "@mui/material";
import { Person, Home, CurrencyRupee, Description } from "@mui/icons-material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserPlus, faExchangeAlt, faHandshake, faComment } from '@fortawesome/free-solid-svg-icons';
import {
  Chart,
  Title,
} from 'chart.js';
import Header from "../../../Shared/Navbar/Navbar";





const metrics = [
  { value: "384", label: "Total Properties", icon: <Business />, growth: "12% from last month" },
  { value: "76", label: "Total Agents", icon: <People />, growth: "8% from last month" },
  { value: "₹8.6M", label: "Total Commission", icon: <CurrencyRupee />, growth: "15% from last month" },
  { value: "43", label: "New Properties", icon: <Home />, growth: "7% from last week" },
];

const properties = [
  { id: "PRO-2501", name: "Luxury Villa", location: "Bandra West, Mumbai", price: "₹3.2Cr", listedBy: "Rahul Mehta", status: "Active" },
  { id: "PRO-2502", name: "Sea View Apartment", location: "Marine Lines, Mumbai", price: "₹1.8Cr", listedBy: "Priya Sharma", status: "Pending" },
  { id: "PRO-2503", name: "Garden View Townhouse", location: "Powai, Mumbai", price: "₹2.1Cr", listedBy: "Vikram Singh", status: "Active" },
  { id: "PRO-2504", name: "Downtown Apartment", location: "Worli, Mumbai", price: "₹1.5Cr", listedBy: "Deepak Patel", status: "Inactive" },
];

const statusColors = {
  Active: { bg: "rgba(46, 204, 113, 0.1)", color: "#2ecc71" },
  Pending: { bg: "rgba(241, 196, 15, 0.1)", color: "#f1c40f" },
  Inactive: { bg: "rgba(231, 76, 60, 0.1)", color: "#e74c3c" },
};
const quickActions = [
  { title: "Manage Users", description: "Add, edit, or deactivate users", icon: <Person />, bgColor: "primary.main" },
  { title: "Manage Properties", description: "Add or modify property listings", icon: <Home />, bgColor: "success.main" },
  { title: "Manage Commissions", description: "Review and approve commissions", icon: <CurrencyRupee />, bgColor: "warning.main" },
  { title: "Generate Reports", description: "Create custom performance reports", icon: <Description />, bgColor: "error.main" },
];

const statsData = [
  { type: 'daily', title: "Today's New Properties", value: '12' },
  { type: 'weekly', title: "This Week's New Properties", value: '43' },
  { type: 'daily', title: "Today's New Agents", value: '5' },
  { type: 'weekly', title: "This Week's New Agents", value: '14' },
  { type: 'daily', title: "Today's Sales", value: '₹1.2M' }
];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        callback: function(value) {
          if (value >= 100) return value;
        }
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 12,
        usePointStyle: true,
        pointStyle: 'circle'
      }
    }
  }
};





const AdminDashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);


  const theme = useTheme();

  // Chart Data
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Properties',
        data: [5, 8, 12, 7, 10, 6, 4],
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        borderColor: '#3498db',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#3498db',
        pointRadius: 4
      },
      {
        label: 'Sold Properties',
        data: [3, 5, 8, 4, 6, 5, 2],
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        borderColor: '#2ecc71',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#2ecc71',
        pointRadius: 4
      },
      {
        label: 'Total Properties',
        data: [340, 348, 360, 367, 377, 383, 384],
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        borderColor: '#e74c3c',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#e74c3c',
        pointRadius: 4,
        borderDash: [5, 5]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            if (value >= 100) return value;
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  };

  const statsData = [
    { type: 'daily', title: "Today's New Properties", value: '12' },
    { type: 'weekly', title: "This Week's New Properties", value: '43' },
    { type: 'daily', title: "Today's New Agents", value: '5' },
    { type: 'weekly', title: "This Week's New Agents", value: '14' },
    { type: 'daily', title: "Today's Sales", value: '₹1.2M' }
  ];


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const activityData = [
    { icon: faPlus, title: 'New property listed', time: 'Luxury Villa in Bandra - 32 mins ago', color: 'primary' },
    { icon: faUserPlus, title: 'New agent registered', time: 'Priya Sharma - 1 hour ago', color: 'success' },
    { icon: faExchangeAlt, title: 'Property status updated', time: 'Sea View Apartment - 2 hours ago', color: 'warning' },
    { icon: faHandshake, title: 'Property sale completed', time: 'Garden View Townhouse - 3 hours ago', color: 'error' },
    { icon: faComment, title: 'New client inquiry', time: 'For Downtown Apartment - 4 hours ago', color: 'info' },
  ];

  const distributionData = {
    labels: ['Apartments', 'Villas', 'Townhouses', 'Plots', 'Commercial'],
    datasets: [{
      data: [45, 20, 15, 10, 10],
      backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6'],
      borderColor: '#ffffff',
      borderWidth: 1,
    }],
  };

  const propertyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Properties',
        data: [5, 8, 12, 7, 10, 6, 4],
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        borderColor: '#3498db',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#3498db',
        pointRadius: 4,
      },
      {
        label: 'Sold Properties',
        data: [3, 5, 8, 4, 6, 5, 2],
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        borderColor: '#2ecc71',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#2ecc71',
        pointRadius: 4,
      },
      {
        label: 'Total Properties',
        data: [340, 348, 360, 367, 377, 383, 384],
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        borderColor: '#e74c3c',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#e74c3c',
        pointRadius: 4,
        borderDash: [5, 5],
      },
    ],
  };
  return (
    <>
        <Header/>
    <Box sx={{ p: 2 }}>
     
      {/* Metrics Cards */}
      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: 3 },
              }}
            >
              <Stack alignItems="center" spacing={1}>
                <Box sx={{ fontSize: 40, color: "#3498db" }}>{metric.icon}</Box>
                <Typography variant="h4" fontWeight={700} color="text.primary">
                  {metric.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  {metric.label}
                </Typography>
                <Typography variant="caption" sx={{ display: "flex", alignItems: "center", color: "#27ae60" }}>
                  <ArrowUpward fontSize="small" sx={{ mr: 0.5 }} /> {metric.growth}
                </Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Property Performance Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ 
            height: '100%',
            boxShadow: 3,
            borderRadius: 2,
            '&:hover': { transform: 'translateY(-2px)', transition: 'transform 0.3s' }
          }}>
            <CardHeader
              title="Property Performance"
              action={
                <Box>
                  <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                    Daily
                  </Button>
                  <Button variant="contained" size="small">
                    Weekly
                  </Button>
                </Box>
              }
              sx={{
                backgroundColor: '#fff',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                py: 2,
                '& .MuiCardHeader-title': {
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }
              }}
            />
            <CardContent sx={{ height: 300 }}>
              <Line data={chartData} options={chartOptions} />
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Statistics */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ 
            height: '100%',
            boxShadow: 3,
            borderRadius: 2,
            '&:hover': { transform: 'translateY(-2px)', transition: 'transform 0.3s' }
          }}>
            <CardHeader
              title="Performance Statistics"
              sx={{
                backgroundColor: '#fff',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                py: 2,
                '& .MuiCardHeader-title': {
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }
              }}
            />
            <CardContent>
              {statsData.map((stat, index) => (
                <Box key={index} sx={{
                  p: 2,
                  mb: 1.5,
                  borderRadius: 1,
                  backgroundColor: '#fff',
                  borderLeft: `4px solid ${stat.type === 'daily' ? '#3498db' : '#2ecc71'}`,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <Typography variant="body2" sx={{ 
                    color: '#7f8c8d',
                    fontSize: '0.875rem',
                    mb: 0.5 
                  }}>
                    {stat.title}
                  </Typography>
                  <Typography  sx={{ 
                    fontWeight: 700,
                    color: '#2c3e50',
                    fontSize: '1.125rem'
                  }}>
                    {stat.value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>

    <Box sx={{ padding: 2, backgroundColor: '#f0f4f8' }}>
      <Box display="flex" gap={3} mb={4}>
        <Card sx={{ flex: 1 }}>
          <CardHeader
            title="Recent Activities"
            action={<Button variant="outlined" size="small">View All</Button>}
          />
          <CardContent sx={{ p: 0 }}>
            {activityData.map((activity, index) => (
              <Box key={index} display="flex" alignItems="center" p={2} >
                <Box sx={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: activity.color }}>
                  <FontAwesomeIcon icon={activity.icon} color="blue" />
                </Box>
                <Box sx={{ flex: 1, ml: 2 }}>
                  <Typography  fontWeight="600">{activity.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{activity.time}</Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardHeader
            title="Property Distribution"
            action={
              <div>
                <Button variant="outlined" size="small" onClick={handleClick}>Filter</Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem onClick={handleClose}>By Type</MenuItem>
                  <MenuItem onClick={handleClose}>By Location</MenuItem>
                  <MenuItem onClick={handleClose}>By Price</MenuItem>
                </Menu>
              </div>
            }
          />
          <CardContent>
            <Box sx={{ position: 'relative', height: 300 }}>
              <Doughnut data={distributionData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Card>
        <CardHeader title="Property Trends" />
        <CardContent>
          <Box sx={{ position: 'relative', height: 300 }}>
            <Line data={propertyData} options={{ responsive: true, maintainAspectRatio: false }} />
          </Box>
        </CardContent>
      </Card>
    </Box>

      <Box mb={4} mt={4}>
      <Card elevation={3}>
        <CardHeader title="Quick Management Tools" sx={{ bgcolor: "#f4f6f8", fontWeight: 600 }} />
        <CardContent>
          <Grid container spacing={3}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  textAlign="center"
                  p={2}
                  borderRadius={2}
                  sx={{ transition: "0.3s", "&:hover": { bgcolor: "#f9fafc" } }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={50}
                    height={50}
                    borderRadius={2}
                    color="white"
                    bgcolor={action.bgColor}
                    mb={1.5}
                  >
                    {action.icon}
                  </Box>
                  <Typography  fontWeight={600} color="text.primary">
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>

      <Box sx={{ p: 2 }}>
      {/* Card Container */}
      <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
        <CardHeader
          title="Recent Properties"
          action={<Button variant="contained" size="small">Add New Property</Button>}
        />
        <CardContent>
          {/* Table Container */}
          <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 600 }}>
              {/* Table Header */}
              <TableHead>
                <TableRow sx={{ backgroundColor: "#white" }}>
                  {["Property", "Location", "Price", "Listed By", "Status", "Actions"].map((header) => (
                    <TableCell key={header} sx={{ fontWeight: "bold", color: "#black", fontSize: "13px", py: 1.5 }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id} sx={{ borderBottom: "1px solid #f0f4f8" }}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="600">{property.name}</Typography>
                      <Typography variant="caption" color="textSecondary">ID: {property.id}</Typography>
                    </TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>{property.price}</TableCell>
                    <TableCell>{property.listedBy}</TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          display: "inline-block",
                          px: 2,
                          py: 0.5,
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "500",
                          bgcolor: statusColors[property.status].bg,
                          color: statusColors[property.status].color,
                        }}
                      >
                        {property.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>

      {/* Social Links */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 3,
            mt: 4,
            '& svg': { fontSize: 28, color: 'primary.main' }
          }}>
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faLinkedin} />
          </Box>

 
    </Box>
    </>
  );
};

export default AdminDashboard;
