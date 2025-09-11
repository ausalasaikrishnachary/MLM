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

import { faInstagram, faFacebook, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
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
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [transactionSummary, setTransactionSummary] = useState(null);
  const userId = localStorage.getItem("user_id");
  const [commissionSummary, setCommissionSummary] = useState({
    total_agent_commission_paid: 0,
    total_company_commission_paid: 0,
  });

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;

    axios.get(`${baseurl}/commission-summary/${userId}/`)
      .then(response => {
        setCommissionSummary({
          total_agent_commission_paid: response.data.total_agent_commission_paid || 0,
          total_company_commission_paid: response.data.total_company_commission_paid || 0,
        });
      })
      .catch(error => {
        console.error('Error fetching commission summary:', error);
      });
  }, []);


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
              backgroundColor: 'rgba(0, 51, 12, 0.6)',
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

          // Safely format price
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

{/* Top Metrics Row */}
<Grid container spacing={3} sx={{ mb: 3 }}>
  {[
    {
      title: 'Listing Properties',
      value: property?.total_properties ?? 0,
      icon: faBuilding,
      path: '/p-listingassets',
      bgColor: '#054ea2ff'
    },
    {
      title: 'Team',
      value: totalAgents.toString(),
      icon: faUsers,
      path: '/p-team',
      bgColor: '#aa280bff'
    },
    {
      title: 'Active Team',
      value: totalActiveAgents,
      icon: faUserCheck,
      path: '/p-activeagents',
      bgColor: '#274f05ff'
    },
    {
      title: 'Latest Properties',
      value: property?.total_latest_properties ?? 0,
      icon: faHome,
      path: '/p-latestProperties',
      bgColor: '#5a4400ff'
    },
    {
      title: 'Bookings',
      value: transactionSummary?.bookings?.properties?.count ?? 0,
      icon: faUserPlus,
      path: '/p-bookedassets',
      bgColor: '#E74C3C' 
    },
  ].map((metric, index) => (
    <Grid
      key={index}
      item
      xs={6}    
      sm={6}
      md={2.4}  
    >
      <Link to={metric.path} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            borderRadius: 3,
            background: metric.bgColor,
            color: '#fff',
            boxShadow: 4,
            transition: 'transform 0.3s',
            '&:hover': { transform: 'translateY(-5px)' },
            cursor: 'pointer',
            height: { xs: 165, sm: 160, md: 160 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <FontAwesomeIcon icon={metric.icon} size="2x" color="#fff" />
            <Typography variant="h4" sx={{ my: 1, color: '#fff' }}>
              {metric.value}
            </Typography>
            <Typography sx={{ mt: 1, color: '#fff' }}>
              {metric.title}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  ))}
</Grid>



        {transactionSummary && (
          <Grid container spacing={3} sx={{ mb: 3, display: 'flex', flexWrap: 'wrap' }}>
            {[
              {
                title: 'Purchased',
                value: transactionSummary.purchased.properties.count,
                icon: faTags,
                onClick: () => navigate('/p-purchasedassets'),
                bgColor: '#37288eff'
              },
              {
                title: 'Sold',
                value: property?.total_sold_properties ?? 0,
                icon: faCheckCircle,
                onClick: () => navigate('/p-soldassets'),
                bgColor: '#bd7500ff'
              },
              {
                title: ' Team Commissions Paid',
                value: `₹${commissionSummary.total_agent_commission_paid?.toLocaleString('en-IN')}`,
                icon: faMoneyBillWave,
                onClick: () => navigate('/p-commission'),
                bgColor: '#005893ff'
              },
              {
                title: 'Company Commissions Paid',
                value: `₹${commissionSummary.total_company_commission_paid?.toLocaleString('en-IN')}`,
                icon: faMoneyBillWave,
                onClick: () => navigate('/p-commission'),
                bgColor: '#9B59B6'
              },
            ].map((card, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                md={2.4} // ✅ match first row (5 per row)
                sx={{ flex: '1 1 20%' }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    background: card.bgColor,
                    color: '#fff',
                    boxShadow: 4,
                    cursor: 'pointer',
                    minHeight: 160, // ✅ force equal height
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' },
                  }}
                  onClick={card.onClick}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <FontAwesomeIcon icon={card.icon} size="2x" color="#fff" />
                    <Typography variant="h4" sx={{ my: 1, color: '#fff' }}>{card.value}</Typography>
                    <Typography sx={{ mt: 1, color: '#fff' }}>{card.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}








            {/* <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: "15px", boxShadow: 3 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faMoneyBillWave} size="2x" color="#28a745" />
                  <Typography sx={{ mt: 1 }}>Agent Paid Commission</Typography>
                  <Typography variant="h4">
                    ₹{transactionSummary.totals.total_agent_commission_paid}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: "15px", boxShadow: 3 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faMoneyBillWave} size="2x" color="#dc3545" />
                  <Typography sx={{ mt: 1 }}>Agent Balance Commission</Typography>
                  <Typography variant="h4">
                    ₹{transactionSummary.totals.total_agent_commission_balance}
                  </Typography>
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
        )}

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
                <Button variant="outlined" size="small" onClick={() => navigate('/p-latestassets')}>
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
                          backgroundColor: '#f9f9f9',
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
               <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
                 {[
                   { icon: faInstagram, url: "https://www.instagram.com/shrirajteam/?igsh=YzhjcjVuMGIxZzJq#" },
                   { icon: faFacebook, url: "https://www.facebook.com/shrirajteam/" },
                   { icon: faTwitter, url: "https://x.com/shrirajteam" },
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
      </Container>
    </>
  );
};

export default AgentDashboard;