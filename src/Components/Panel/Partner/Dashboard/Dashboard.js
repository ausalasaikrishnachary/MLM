import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // ✨ import axios
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
import { faHourglassHalf, faMoneyBillWave, faUserPlus, faTags, faUserCheck } from '@fortawesome/free-solid-svg-icons';
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
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
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
  const [totalAgents, setTotalAgents] = useState(0); // ✨ new state
  const [totalActiveAgents, setTotalActiveAgents] = useState(0); // ✨ new state
  const [counts, setCounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // Chart Data
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Properties',
        data: [4, 3, 5, 7, 6, 3, 2],
        backgroundColor: 'rgba(0, 123, 255, 0.6)',
      },
      {
        label: 'Existing Properties',
        data: [124, 128, 132, 139, 145, 148, 150],
        backgroundColor: 'rgba(40, 167, 69, 0.6)',
      },
    ],
  };

  const tools = [
    { icon: <CurrencyRupee color="primary" fontSize="large" />, title: "Commission Calculator", description: "Calculate your earnings" },
    { icon: <Group color="success" fontSize="large" />, title: "Referral System", description: "Refer clients and earn" },
    { icon: <Search color="warning" fontSize="large" />, title: "Lead Generator", description: "Find new clients" },
    { icon: <CalendarToday color="error" fontSize="large" />, title: "Schedule Viewings", description: "Book client appointments" }
  ];

  useEffect(() => {
    if (referralId) {
      axios.get(`${baseurl}/agents/referral-id/${referralId}/`)
        .then(response => {
          setTotalAgents(response.data.total_agents || 0); // ✨ set the real count
          setTotalActiveAgents(response.data.total_active_agents || 0); // ✨ set the real count
        })
        .catch(error => {
          console.error('Error fetching total agents:', error);
          setTotalAgents(0); // fallback
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

  const propertyListings = [
    {
      title: "Modern Apartment",
      price: "₹425,000",
      img: "https://media.istockphoto.com/id/1393537665/photo/modern-townhouse-design.jpg?s=612x612&w=0&k=20&c=vgQesOXDRzz0UfOZxmUtE-rFe75YgA9GvkKS8eeeumE=",
      badges: ["New", "3 Bed", "2 Bath"],
    },
    {
      title: "Suburban House",
      price: "₹685,000",
      img: "https://images.squarespace-cdn.com/content/v1/53dd6676e4b0fedfbc26ea91/b050385e-d2f4-4152-96e5-00c364e5ef18/2490861534_d220818fa4_o.jpg",
      badges: ["New", "4 Bed", "3 Bath"],
    },
  ];

  const inquiries = [
    {
      name: "Hrithik",
      status: "New",
      message: "Interested in Modern Apartment",
      time: "2 hours ago",
    },
    {
      name: "Varun",
      status: "Follow Up",
      message: "Scheduled viewing for Suburban House",
      time: "Yesterday at 4:30 PM",
    },
  ];


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

        return {
          title: property.property_title || "No Title",
          price: `₹${Number(property.total_property_value).toLocaleString()}`,
          badges: [
            property.status || "N/A",
            property.approval_status || "N/A",
            property.looking_to?.toUpperCase() || "N/A"
          ],
          img: imageUrl,
        };
      });

      setProperties(formatted.slice(0, 2)); // Show only 2 latest properties
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  fetchProperties();
}, []);




  return (
    <>
      <PartnerHeader />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Agent Dashboard
          </Typography>
        </Box>

        {/* Top Metrics Row */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {[
            { title: 'Listing Properties', value: counts?.total_properties ?? 0, icon: faBuilding, path: '/p-assets' },
            { title: 'Team', value: totalAgents.toString(), icon: faUsers, path: '/p-myteam' },
            { title: 'Active Agents', value: totalActiveAgents, icon: faUserCheck, path: '/p-activeagents' },
            { title: 'Latest Properties', value: counts?.total_latest_properties ?? 0, icon: faHome, path: '/p-latestassets' },
          ].map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Link to={metric.path} style={{ textDecoration: 'none' }}>
                <Card sx={{
                  borderRadius: "15px",
                  boxShadow: 3,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-5px)' },
                  cursor: 'pointer'
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <FontAwesomeIcon icon={metric.icon} size="2x" color="#666" />
                    <Typography sx={{ mt: 1 }}>{metric.title}</Typography>
                    <Typography variant="h4" sx={{ my: 1 }}>{metric.value}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* Second Metrics Row */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {[
            { title: 'Pending Commission', value: '2850', icon: faHourglassHalf },
            { title: 'Commission Received', value: '40000', icon: faMoneyBillWave },
            { title: 'Leads', value: '134', icon: faUserPlus },
            { title: 'Offer', value: '20%', progress: 20, color: 'error', icon: faTags },
          ].map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ boxShadow: 3, borderRadius: "15px", height: "150px" }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <FontAwesomeIcon icon={metric.icon} size="2x" color="#666" />
                  <Typography sx={{ mt: 1 }}>{metric.title}</Typography>
                  <Typography variant="h4" sx={{ my: 1 }}>{metric.value}</Typography>
                  {metric.progress ? (
                    <LinearProgress
                      variant="determinate"
                      value={metric.progress}
                      color={metric.color}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  ) : null}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Chart & Stats Section */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader
                title="Property Statistics"
                action={
                  <>
                    <Button variant="outlined" size="small" sx={{ mr: 1 }}>Daily</Button>
                    <Button variant="contained" size="small">Weekly</Button>
                  </>
                }
              />
              <CardContent sx={{ height: 300 }}>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader title="Property Statistics" />
              <CardContent>
                <Grid container spacing={2}>
                  {[
                    { title: "Today's New", value: 5 },
                    { title: "Weekly New", value: 28 },
                    { title: "Today's Viewings", value: 12 },
                    { title: "Weekly Viewings", value: 64 },
                    { title: "Today's Inquiries", value: 8 },
                    { title: "Weekly Inquiries", value: 47 },
                  ].map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="body2">{stat.title}</Typography>
                          <Typography >{stat.value}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>


        <Grid container spacing={4} mt={4}>
          {/* Latest Property Listings */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Latest Property Listings</Typography>
               <Button variant="outlined" size="small" onClick={() => navigate('/p-latestassets')}>
  View All
</Button>
              </CardContent>
              <CardContent sx={{ p: 0 }}>
                <Grid container spacing={2} justifyContent="center">
                  {properties.map((property, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card sx={{ m: 1 }}>
                        <CardMedia
                          component="img"
                          height="160"
                          image={property.img}
                          alt={property.title}
                        />
                        <CardContent>
                          <Typography>{property.title}</Typography>
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

          {/* Active Inquiries (unchanged) */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Active Inquiries</Typography>
                <Button variant="outlined" size="small">View All</Button>
              </CardContent>
              <CardContent>
                {inquiries.map((inquiry, index) => (
                  <Box key={index} p={2} sx={{ bgcolor: "background.default", borderRadius: 2, mb: 2 }}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>{inquiry.name}</Typography>
                      <Badge
                        badgeContent={inquiry.status}
                        color={inquiry.status === "New" ? "warning" : "info"}
                      />
                    </Box>
                    <Typography variant="body2">{inquiry.message}</Typography>
                    <Typography variant="caption" color="text.secondary">{inquiry.time}</Typography>
                    <Box mt={1}>
                      <Button variant="contained" size="small" startIcon={<Call />} sx={{ mr: 1 }}>
                        Call
                      </Button>
                      <Button variant="outlined" size="small" startIcon={<Email />}>
                        Email
                      </Button>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>



        <Box mt={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom>
                Quick Access Tools
              </Typography>
              <Grid container spacing={3} textAlign="center">
                {tools.map((tool, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box mb={1}>{tool.icon}</Box>
                        <Typography >{tool.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {tool.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
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
      </Container>
    </>
  );
};

export default AgentDashboard;