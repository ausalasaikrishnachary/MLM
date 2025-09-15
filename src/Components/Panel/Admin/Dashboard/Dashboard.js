import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Card, Typography, Stack, CardContent, Container } from "@mui/material";
import { Business, People, Home } from "@mui/icons-material";
import { faInstagram, faFacebook , faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { 
  CheckCircle,
  EventAvailable,
  HomeWork,
  HourglassEmpty,
  Verified,
  Cancel,
  AccountBalance,
  Payments
} from "@mui/icons-material";


import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from "../../../Shared/Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';
import './Dashboard.css';

// Solid dark colors for cards
const cardColors = [
  "#037af2ff", // dark blue-gray
  "#ff4901ff", // dark slate
  "#028690ff", // gray
  "#a6a302ff", // dark teal
  "#6e8a07ff", // dark green
  "#024978ff", // dark blue
  "#8300bbff", // dark purple
  "#cd1400ff", // dark red
  "#a84300ff", // dark orange
  "#0266c4ff", // navy dark
  "#2400c0ff", // charcoal
  "#7a4646ff", // dark gray
  "#4a235a", // plum
  "#590063ff", // steel gray
  "#076b8fff", // brown
  "#7b241c", // maroon
];

const AdminDashboard = () => {
  const [counts, setCounts] = useState(null);
  const navigate = useNavigate();

  const propertyStatusCards = counts ? [
    { label: "Sold Properties", value: counts.total_sold_properties, icon: <CheckCircle sx={{ color: "white" }} />, path: "/a-soldassets" },
    { label: "Booked Properties", value: counts.total_booked_properties, icon: <EventAvailable sx={{ color: "white" }} />, path: "/a-bookedassets" },
    { label: "Available Properties", value: counts.total_available_properties, icon: <HomeWork sx={{ color: "white" }} />, path: "/a-availableassets" },
    { label: "Pending Properties", value: counts.total_pending_properties, icon: <HourglassEmpty sx={{ color: "white" }} />, path: "/a-pendingassets" },
    { label: "Approved Properties", value: counts.total_approved_properties, icon: <Verified sx={{ color: "white" }} />, path: "/a-approvedassets" },
    { label: "Rejected Properties", value: counts.total_rejected_properties, icon: <Cancel sx={{ color: "white" }} />, path: "/a-rejectedassets" },
   { label: "Company Commissions", value: `₹${counts.total_company_commission_paid.toLocaleString('en-IN')}`, icon: <AccountBalance sx={{ color: "white" }} />, path: "/a-transactionmoniter" },
{ 
  label: "Agent Commissions", 
  value: `₹${counts.total_agent_commission_paid.toLocaleString('en-IN')}`, 
  icon: <Payments sx={{ color: "white" }} />, 
  path: "/a-commission" 
},
  ] : [];


  useEffect(() => {
    axios.get(`${baseurl}/counts/`)
      .then((response) => setCounts(response.data))
      .catch((error) => console.error("Error fetching counts:", error));
  }, []);

  const metrics = counts ? [
    { value: counts.total_properties, label: "Total Properties", icon: <Business />, path: "/a-asset" },
    { value: counts.total_active_users, label: "Total Active Users", icon: <People />, path: "/a-activeagents" },
    { value: counts.total_inactive_users, label: "Total InActive Users", icon: <People />, path: "/a-Inactiveagents" },
    { value: counts.total_latest_properties, label: "New Properties", icon: <Home />, path: "/a-Newproperties" },
  ] : [];

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get(`${baseurl}/property-stats/`)
      .then((res) => {
        const data = res.data;
        const labels = Object.keys(data);
        const available = labels.map(type => data[type].available);
        const sold = labels.map(type => data[type].sold);
        const pending = labels.map(type => data[type].pending);
        const approved = labels.map(type => data[type].approved);

        setChartData({
          labels,
          datasets: [
            { label: 'Available', data: available, backgroundColor: '#3498db' },
            { label: 'Sold', data: sold, backgroundColor: '#2ecc71' },
            { label: 'Pending', data: pending, backgroundColor: '#f1c40f' },
            { label: 'Approved', data: approved, backgroundColor: '#9b59b6' }
          ]
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const options = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
    scales: { y: { beginAtZero: true } }
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 2 }}>
        {/* Dashboard Heading */}
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

        {/* Cards Section */}
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
                  backgroundColor: cardColors[index % cardColors.length], // unique dark color
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,

                  },
                }}
              >
                <Stack alignItems="center">   {/* reduce spacing */}
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {React.cloneElement(metric.icon, { sx: { fontSize: 50, color: "white" } })}
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

        {/* Chart Heading */}
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

        {/* Chart Section */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ overflowX: 'auto' }}>
                  <Box sx={{ minWidth: '1000px', maxWidth: '100%', height: 350 }}>
                    {chartData && (
                      <Bar
                        data={chartData}
                        options={{ ...options, maintainAspectRatio: false }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>



        {/* Social Links */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
          {[
            { icon: faInstagram, url: "https://www.instagram.com/shrirajteam/?igsh=YzhjcjVuMGIxZzJq#" },
            { icon: faFacebook, url: "https://www.facebook.com/shrirajteam/" },
            { icon: faXTwitter , url: "https://x.com/shrirajteam" },
            { icon: faYoutube, url: "https://www.youtube.com/@Shrirajteam" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Box
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
                <FontAwesomeIcon icon={item.icon} />
              </Box>
            </a>
          ))}
        </Box>

      </Box>
    </>
  );
};

export default AdminDashboard;
