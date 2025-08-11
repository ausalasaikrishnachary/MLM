// import React from 'react';
// import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
// import { Line, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';

// // Register required ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   // Data and options for the line chart (Price Trend)
//   const priceData = {
//     labels: ['2023-01', '2023-02', '2023-03', '2023-04'],
//     datasets: [
//       {
//         label: 'Price Trend',
//         data: [200000, 210000, 220000, 240000],
//         borderColor: '#ffa500',
//         backgroundColor: 'rgba(255, 165, 0, 0.1)',
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   };

//   const priceOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: false,
//       },
//     },
//   };

//   // Data and options for the pie chart (Distribution)
//   const distributionData = {
//     labels: ['Apartments', 'Villas', 'Commercial Spaces'],
//     datasets: [
//       {
//         data: [45, 30, 25],
//         backgroundColor: ['#0066cc', '#ffa500', '#00cc88'],
//       },
//     ],
//   };

//   const distributionOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//     },
//   };

//   return (
//     <>
//       <InvestorHeader />
//       <Box

//       >
//         <Container>
//           {/* Page Title */}
//           <Typography
//             variant="h4"
//             sx={{ color: '#100f0f', fontSize: '28px', fontWeight: 700, mb: 4, pl: 2,textAlign:"center" }}
//           >
//             Dashboard
//           </Typography>

//           {/* Stats Cards */}
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             <Grid item xs={12} sm={6} md={4}>
//               <Card
//                 sx={{
//                   borderRadius: '10px',
//                   p: 2,
//                   boxShadow: 3,
//                   transition: 'transform 0.3s',
//                   '&:hover': { transform: 'translateY(-5px)' },
//                 }}
//               >
//                 <CardContent>
//                   <Typography sx={{ fontSize: '14px', color: '#666' }}>
//                     Total Portfolio Value
//                   </Typography>
//                   <Typography sx={{ fontSize: '24px', fontWeight: 'bold'}}>
//                     4.5 Cr
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Card
//                 sx={{
//                   borderRadius: '10px',
//                   p: 2,
//                   boxShadow: 3,
//                   transition: 'transform 0.3s',
//                   '&:hover': { transform: 'translateY(-5px)' },
//                 }}
//               >
//                 <CardContent>
//                   <Typography sx={{ fontSize: '14px', color: '#666' }}>
//                     Total Performance
//                   </Typography>
//                   <Typography sx={{ fontSize: '24px', fontWeight: 'bold'  }}>
//                     22.30%
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Card
//                 sx={{
//                   borderRadius: '10px',
//                   p: 2,
//                   boxShadow: 3,
//                   transition: 'transform 0.3s',
//                   '&:hover': { transform: 'translateY(-5px)' },
//                 }}
//               >
//                 <CardContent>
//                   <Typography sx={{ fontSize: '14px', color: '#666' }}>No of Assets</Typography>
//                   <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>
//                     2
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Card
//                 sx={{
//                   borderRadius: '10px',
//                   p: 2,
//                   boxShadow: 3,
//                   transition: 'transform 0.3s',
//                   '&:hover': { transform: 'translateY(-5px)' },
//                 }}
//               >
//                 <CardContent>
//                   <Typography sx={{ fontSize: '14px', color: '#666' }}>
//                     Total amount Invested
//                   </Typography>
//                   <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>
//                     10.5L
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Card
//                 sx={{
//                   borderRadius: '10px',
//                   p: 2,
//                   boxShadow: 3,
//                   transition: 'transform 0.3s',
//                   '&:hover': { transform: 'translateY(-5px)' },
//                 }}
//               >
//                 <CardContent>
//                   <Typography sx={{ fontSize: '14px', color: '#666' }}>Total Interest</Typography>
//                   <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>
//                     10%
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           {/* Analytics Section */}
//           <Typography
//             variant="h5"
//             sx={{ color: '#100f0f', fontSize: '28px', fontWeight: 700, mb: 3, pl: 2 }}
//           >
//             Analytics
//           </Typography>

//           <Grid container spacing={3}>
//             {/* Line Chart Card */}
//             <Grid item xs={12} md={6}>
//               <Box
//                 sx={{
//                   background: 'white',
//                   borderRadius: '10px',
//                   p: 2,
//                   boxShadow: 3,
//                   mb: 4,
//                 }}
//               >
//                 <Typography sx={{ fontSize: '16px', color: '#666', mb: 2 }}>
//                   Luxury apartment (ABC) Performance
//                 </Typography>
//                 <Box sx={{ height: 300 }}>
//                   <Line data={priceData} options={priceOptions} />
//                 </Box>
//               </Box>
//             </Grid>

//             {/* Pie Chart Card */}
//             <Grid item xs={12} md={6}>
//               <Box
//                 sx={{
//                   background: 'white',
//                   borderRadius: '10px',
//                   p: 2,
//                   boxShadow: 3,
//                   mb: 4,
//                 }}
//               >
//                 <Typography sx={{ fontSize: '16px', color: '#666', mb: 2 }}>
//                   Commercial Space (ABC) Performance
//                 </Typography>
//                 <Box sx={{ height: 300 }}>
//                   <Pie data={distributionData} options={distributionOptions} />
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  Badge,
  CardMedia,
} from '@mui/material';
import { faHourglassHalf, faMoneyBillWave, faUserPlus, faTags, faUserCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faBuilding,
  faUsers,
  faRupeeSign,
  faHome,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  CurrencyRupee,
  Group,
  Search,
  CalendarToday
} from "@mui/icons-material";
import { Call, Email } from "@mui/icons-material";
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { baseurl } from '../../../BaseURL/BaseURL';
import { useNavigate } from "react-router-dom";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AgentDashboard = () => {
  const referralId = localStorage.getItem('referral_id');
  const [totalAgents, setTotalAgents] = useState(0);
  const [totalActiveAgents, setTotalActiveAgents] = useState(0);
  const [counts, setCounts] = useState(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [transactionSummary, setTransactionSummary] = useState(null);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${baseurl}/property-stats/user-id/${userId}/`)
      .then((response) => {
        const data = response.data;
        setProperty({
          total_properties: data.listing.properties.count,
          total_latest_properties: data.latest.properties.count,
          total_sold_properties: data.sold.properties.count,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching counts:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${baseurl}/transactions/grouped/user-id/${userId}/`)
      .then((res) => res.json())
      .then((data) => {
        setTransactionSummary(data);
      })
      .catch((err) => {
        console.error("Error fetching transaction summary:", err);
      });
  }, []);

  useEffect(() => {
    if (referralId) {
      axios.get(`${baseurl}/agents/referral-id/${referralId}/`)
        .then(response => {
          setTotalAgents(response.data.total_agents || 0);
          setTotalActiveAgents(response.data.total_active_agents || 0);
        })
        .catch(error => {
          console.error('Error fetching total agents:', error);
          setTotalAgents(0);
          setTotalActiveAgents(0);
        });
    }
  }, [referralId]);

  useEffect(() => {
    axios
      .get(`${baseurl}/counts/`)
      .then((response) => {
        setCounts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching counts:", error);
        setLoading(false);
      });
  }, []);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    fetch(`${baseurl}/property-stats/user-id/${userId}/`)
      .then(res => res.json())
      .then(data => {
        const listingCount = data.listing.properties.count;
        const latestCount = data.latest.properties.count;
        const soldCount = data.sold.properties.count;

        setChartData({
          labels: ['Properties'],
          datasets: [
            {
              label: 'Listing Properties',
              data: [listingCount],
              backgroundColor: 'rgba(40, 167, 69, 0.6)',
            },
            {
              label: 'Latest Properties',
              data: [latestCount],
              backgroundColor: 'rgba(0, 123, 255, 0.6)',
            },
          ],
        });
      })
      .catch(err => console.error('Error fetching property stats:', err));
  }, []);

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const userId = localStorage.getItem("user_id");

      try {
        const response = await fetch(`${baseurl}/latest-properties/`);
        const data = await response.json();

        const filteredProperties = data.filter(
          (property) => property.user_id?.toString() !== userId
        );

        const formatted = filteredProperties.map((property) => {
          const imagePath = property.images?.[0]?.image;
          const imageUrl = imagePath
            ? `${baseurl}${imagePath}`
            : "https://via.placeholder.com/400x200?text=No+Image";

          const priceValue = Number(property.total_property_value);
          const formattedPrice = !isNaN(priceValue)
            ? `₹${priceValue}`
            : "₹0";

          return {
            title: property.property_title || "No Title",
            price: formattedPrice,
            badges: [
              property.status || "N/A",
              property.approval_status || "N/A",
              property.looking_to?.toUpperCase() || "N/A",
            ],
            img: imageUrl,
          };
        });

        setProperties(formatted.slice(0, 2));
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <InvestorHeader />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
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

        {/* Summary Cards with Gradient UI */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Listing Properties */}
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Link to="/i-listingassets" style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  boxShadow: 4,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-5px)' },
                  cursor: 'pointer',
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faBuilding} size="2x" color="#fff" />
                  <Typography sx={{ mt: 1 }}>Listing Properties</Typography>
                  <Typography variant="h4" sx={{ my: 1 }}>{property?.total_properties ?? 0}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          {/* Latest Properties */}
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Link to="/i-latestProperties" style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #d8e943ff 0%, #38f6f9ff 100%)',
                  color: '#fff',
                  boxShadow: 4,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-5px)' },
                  cursor: 'pointer',
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faHome} size="2x" color="#fff" />
                  <Typography sx={{ mt: 1 }}>Latest Properties</Typography>
                  <Typography variant="h4" sx={{ my: 1 }}>{property?.total_latest_properties ?? 0}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          {/* Bookings */}
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Card
              sx={{
                borderRadius: 3,
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: '#fff',
                boxShadow: 4,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' },
              }}
              onClick={() => navigate('/i-bookedassets')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <FontAwesomeIcon icon={faUserPlus} size="2x" color="#fff" />
                <Typography sx={{ mt: 1 }}>Bookings</Typography>
                <Typography variant="h4" sx={{ my: 1 }}>{transactionSummary?.bookings?.properties?.count ?? 0}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Purchased */}
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Card
              sx={{
                borderRadius: 3,
                background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                color: '#fff',
                boxShadow: 4,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' },
              }}
              onClick={() => navigate('/i-purchasedassets')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <FontAwesomeIcon icon={faTags} size="2x" color="#fff" />
                <Typography sx={{ mt: 1 }}>Purchased</Typography>
                <Typography variant="h4" sx={{ my: 1 }}>{transactionSummary?.purchased?.properties?.count ?? 0}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Sold */}
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Card
              sx={{
                borderRadius: 3,
                background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                color: '#fff',
                boxShadow: 4,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' },
              }}
              onClick={() => navigate('/i-soldassets')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#fff" />
                <Typography sx={{ mt: 1 }}>Sold</Typography>
                <Typography variant="h4" sx={{ my: 1 }}>{property?.total_sold_properties ?? 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Graphs */}
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
            Overview
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Property Statistics */}
          <Grid item xs={12} lg={6} sx={{ height: '100%' }}>
            <Card sx={{ height: 500, boxShadow: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold">
                  Property Statistics
                </Typography>
              </CardContent>
              <CardContent sx={{ height: 400, pt: 0 }}>
                {chartData ? (
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                    }}
                  />
                ) : (
                  <div>Loading chart...</div>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Latest Property Listings */}
          <Grid item xs={12} lg={6} sx={{ height: '100%' }}>
            <Card sx={{ height: 500, boxShadow: 3, display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ textAlign: "center", pb: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  Latest Property Listings
                </Typography>
              </CardContent>

              <CardContent sx={{ display: "flex", justifyContent: "flex-end", pt: 0, pb: 1 }}>
                <Button variant="outlined" size="small" onClick={() => navigate('/i-latestProperties')}>
                  View All
                </Button>
              </CardContent>


              {/* Scrollable property list */}
              <CardContent sx={{ p: 2, pt: 0, overflowY: 'auto', flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {properties.map((property, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card
                        sx={{
                          height: '100%',
                          backgroundColor: '#f9f9f9', // subtle grey
                          border: '1px solid #ddd',
                          transition: '0.3s',
                          boxShadow: 1,
                          '&:hover': {
                            boxShadow: 6,
                            backgroundColor: '#f1f1f1',
                            transform: 'scale(1.02)',
                          },
                        }}
                      >
                        <Box sx={{ px: 1, pt: 1 }}>
                          <CardMedia
                            component="img"
                            height="120"
                            image={property.img}
                            alt={property.title}
                            sx={{ borderRadius: 1, objectFit: 'cover' }}
                          />
                        </Box>
                        <CardContent>
                          <Typography fontWeight="bold">{property.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {property.price}
                          </Typography>
                          <Box mt={1}>
                            {property.badges.map((badge, i) => (
                              <Chip
                                key={i}
                                label={badge}
                                color={i === 0 ? "success" : "info"}
                                size="small"
                                sx={{ mr: 0.5 }}
                              />
                            ))}
                          </Box>
                        </CardContent>
                      </Card>


                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

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
                backgroundColor: '#000', // black background
                boxShadow: 2,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'primary.main', // change to your theme primary color on hover
                  transform: 'scale(1.1)',
                },
                '& svg': {
                  fontSize: 24,
                  color: '#fff', // white icon color
                  transition: 'transform 0.3s ease',
                },
              }}
            >
              <FontAwesomeIcon icon={icon} />
            </Box>
          ))}
        </Box>

      </Container>
    </>
  );
};

export default AgentDashboard;