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

const gradientColors = [
  "linear-gradient(135deg, #6a11cb, #2575fc)",   // purple → blue
  "linear-gradient(135deg, #ff6a00, #ee0979)",   // orange → pink
  "linear-gradient(135deg, #fa709a, #fee140)",   // pink → yellow
  "linear-gradient(135deg, #667eea, #764ba2)",   // indigo → violet
  "linear-gradient(135deg, #ff9a9e, #fad0c4)",   // light pink → peach
  "linear-gradient(135deg, #00f2fe, #4facfe)",   // cyan → blue
  "linear-gradient(135deg, #fceabb, #f8b500)",   // pale yellow → orange
  "linear-gradient(135deg, #f093fb, #f5576c)",   // lavender → coral
  "linear-gradient(135deg, #fbc2eb, #a6c1ee)",   // blush pink → soft blue
  "linear-gradient(135deg, #fddb92, #d1fdff)",   // golden → pale blue
  "linear-gradient(135deg, #89f7fe, #66a6ff)",   // light blue → deeper blue
  "linear-gradient(135deg, #c471f5, #fa71cd)",   // violet → pink
  "linear-gradient(135deg, #ffecd2, #fcb69f)",   // beige → peach
  "linear-gradient(135deg, #e0c3fc, #8ec5fc)",   // lavender → light blue
  "linear-gradient(135deg, #f77062, #fe5196)",   // coral → magenta
  "linear-gradient(135deg, #a18cd1, #fbc2eb)"    // purple-gray → soft pink
];


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
      label: "Company Commissions ",
      value: `₹${counts.total_company_commission_paid.toLocaleString('en-IN')}`,
      icon: <Cancel sx={{ color: "#e74c3c" }} />,
      path: "/a-transactionmoniter",
    },
    {
      label: "Agent Commissions",
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


        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              letterSpacing: 1,
              position: "relative",
              display: "inline-block",
              '&::after': {
                content: '""',
                display: 'block',
                width: '60%',
                height: '4px',
                backgroundColor: 'primary.main',
                margin: '8px auto 0',
                borderRadius: '2px',
              },
            }}
          >
            Dashboard
          </Typography>
        </Box>


        <Grid container spacing={3}>
          {[...(metrics || []), ...(propertyStatusCards || [])].map((metric, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              <Card
                onClick={() => navigate(metric.path)}
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 4,
                  cursor: "pointer",
                  color: "#fff",
                  background: gradientColors[index % gradientColors.length],
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                    background: gradientColors[(index + 1) % gradientColors.length],
                  },
                }}
              >
                <Stack alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "50%",
                      width: 60,
                      height: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ fontSize: 30 }}>{metric.icon}</Box>
                  </Box>
                  <Typography variant="h4" fontWeight={700}>
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {metric.label}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>




        {/* Centered Heading for Chart */}
        <Box sx={{ mt: 6, mb: 4, display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              letterSpacing: 1,
              position: "relative",
              display: "inline-block",
              '&::after': {
                content: '""',
                display: 'block',
                width: '60%',
                height: '4px',
                backgroundColor: 'primary.main',
                margin: '8px auto 0',
                borderRadius: '2px',
              },
            }}
          >
            Properties Performance
          </Typography>
        </Box>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ overflowX: 'auto' }}>
                  {/* Wrap chart in a responsive box */}
                  <Box sx={{ minWidth: '1000px', maxWidth: '100%', height: 350 }}>
                    {chartData && (
                      <Bar
                        data={chartData}
                        options={{
                          ...options,
                          maintainAspectRatio: false, // allows height control
                        }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Social Links */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            mt: 4,
          }}
        >
          {[faInstagram, faFacebook, faTwitter, faLinkedin].map((icon, i) => (
            <Box
              key={i}
              sx={{
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: '#000',
                boxShadow: 2,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  transform: 'scale(1.1)',
                },
                '& svg': {
                  fontSize: 24,
                  color: '#fff',
                  transition: 'transform 0.3s ease',
                },
              }}
            >
              <FontAwesomeIcon icon={icon} />
            </Box>
          ))}
        </Box>

      </Box>
    </>
  );
};

export default AdminDashboard;