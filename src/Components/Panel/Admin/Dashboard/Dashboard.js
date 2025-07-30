import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Card, Typography, Stack } from "@mui/material";
import { ArrowUpward, Business, People } from "@mui/icons-material";
import './Dashboard.css'
import { Edit, Delete } from "@mui/icons-material";
import { faInstagram, faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  CheckCircle,
  EventAvailable,
  HomeWork,
  HourglassEmpty,
  Verified,
  Cancel
} from "@mui/icons-material";
import { Bar } from 'react-chartjs-2';
import {
  CardContent,
  Container,
} from "@mui/material";
import { Person, Home, CurrencyRupee, Description } from "@mui/icons-material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from "../../../Shared/Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';

const AdminDashboard = () => {
  const [counts, setCounts] = useState(null);
  const navigate = useNavigate();

  const propertyStatusCards = counts ? [
    {
      label: "Sold Properties",
      value: counts.total_sold_properties,
      icon: <CheckCircle sx={{ color: "#2ecc71" }} />,
      path: "/a-soldassets",
    },
    {
      label: "Booked Properties",
      value: counts.total_booked_properties,
      icon: <EventAvailable sx={{ color: "#e67e22" }} />,
      path: "/a-bookedassets",
    },
    {
      label: "Available Properties",
      value: counts.total_available_properties,
      icon: <HomeWork sx={{ color: "#3498db" }} />,
      path: "/a-availableassets",
    },
    {
      label: "Pending Properties",
      value: counts.total_pending_properties,
      icon: <HourglassEmpty sx={{ color: "#f1c40f" }} />,
      path: "/a-pendingassets",
    },
    {
      label: "Approved Properties",
      value: counts.total_approved_properties,
      icon: <Verified sx={{ color: "#9b59b6" }} />,
      path: "/a-approvedassets",
    },
    {
      label: "Rejected Properties",
      value: counts.total_rejected_properties,
      icon: <Cancel sx={{ color: "#e74c3c" }} />,
      path: "/a-rejectedassets",
    },
  {
  label: "Total Company Commissions Paid",
  value: `₹${counts.total_company_commission_paid.toLocaleString('en-IN')}`,
  icon: <Cancel sx={{ color: "#e74c3c" }} />,
  path: "/a-transactionmoniter",
},
{
  label: "Total Agent Commissions Paid",
  value: `₹${counts.total_agent_commission_paid.toLocaleString('en-IN')}`,
  icon: <Cancel sx={{ color: "#e74c3c" }} />,
  path: "/a-commission",
},


  ] : [];


  useEffect(() => {
    axios.get(`${baseurl}/counts/`)
      .then((response) => {
        setCounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching counts:", error);
      });
  }, []);

  const metrics = counts ? [
    {
      value: counts.total_properties,
      label: "Total Properties",
      icon: <Business />,
      path: "/a-asset",

    },
    {
      value: counts.total_active_users,
      label: "Total Active Users",
      icon: <People />,
      path: "/a-activeagents",

    },
    {
      value: counts.total_inactive_users,
      label: "Total InActive Users",
      icon: <People />,
      path: "/a-Inactiveagents",

    },
    {
      value: counts.total_latest_properties,
      label: "New Properties",
      icon: <Home />,
      path: "/a-Newproperties",

    },
  ] : [];

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get(`${baseurl}/property-stats/`)
      .then((res) => {
        const data = res.data;

        const labels = Object.keys(data); // ['Residential', 'Flat', ...]

        const available = labels.map(type => data[type].available);
        const sold = labels.map(type => data[type].sold);
        const pending = labels.map(type => data[type].pending);
        const approved = labels.map(type => data[type].approved);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Available',
              data: available,
              backgroundColor: '#3498db'
            },
            {
              label: 'Sold',
              data: sold,
              backgroundColor: '#2ecc71'
            },
            {
              label: 'Pending',
              data: pending,
              backgroundColor: '#f1c40f'
            },
            {
              label: 'Approved',
              data: approved,
              backgroundColor: '#9b59b6'
            }
          ]
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };



  return (
    <>
      <Header />
      <Box sx={{ p: 2 }}>

        {/* Metrics Cards */}
        <Grid container spacing={3}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                onClick={() => navigate(metric.path)}
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 2,
                  cursor: "pointer",
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

                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {propertyStatusCards.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                onClick={() => navigate(metric.path)}
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 2,
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 3 },
                }}
              >
                <Stack alignItems="center" spacing={1}>
                  <Box sx={{ fontSize: 40 }}>{metric.icon}</Box>
                  <Typography variant="h4" fontWeight={700} color="text.primary">
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {metric.label}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>


        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            {/* Property Performance Chart */}
            <Grid item xs={12} lg={12}>
              <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ overflowX: 'auto' }}>
                  <div style={{ width: '1400px' }}> {/* or any width you need */}
                    {chartData && <Bar data={chartData} options={options} />}
                  </div>
                </CardContent>

              </Card>
            </Grid>
          </Grid>
        </Container>
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