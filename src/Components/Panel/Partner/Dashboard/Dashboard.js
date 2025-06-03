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
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Agent Dashboard
          </Typography>
        </Box>

        {/* Top Metrics Row */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {[
            { title: 'Listing Properties', value: property?.total_properties ?? 0, icon: faBuilding, path: '/p-listingassets' },
            // { title: 'Team', value: totalAgents.toString(), icon: faUsers, path: '/p-myteam' },
            { title: 'Team', value: totalAgents.toString(), icon: faUsers, path: '/p-team' },
            { title: 'Active Agents', value: totalActiveAgents, icon: faUserCheck, path: '/p-activeagents' },
            { title: 'Latest Properties', value: property?.total_latest_properties ?? 0, icon: faHome, path: '/p-latestProperties' },
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

        {transactionSummary && (
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: "15px",
                  boxShadow: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
                onClick={() => navigate('/p-bookedassets')}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faUserPlus} size="2x" color="#666" />
                  <Typography sx={{ mt: 1 }}>Bookings</Typography>
                  <Typography variant="h4">{transactionSummary.bookings.properties.count}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: "15px",
                  boxShadow: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
                onClick={() => navigate('/p-purchasedassets')}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faTags} size="2x" color="#666" />
                  <Typography sx={{ mt: 1 }}>Purchased</Typography>
                  <Typography variant="h4">{transactionSummary.purchased.properties.count}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: "15px",
                  boxShadow: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
                onClick={() => navigate('/p-soldassets')}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#666" />
                  <Typography sx={{ mt: 1 }}>Sold</Typography>
                  <Typography variant="h4">{property?.total_sold_properties ?? 0}</Typography>
                </CardContent>
              </Card>
            </Grid>


            {/* <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: "15px", boxShadow: 3 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faMoneyBillWave} size="2x" color="#666" />
                  <Typography sx={{ mt: 1 }}>Agent Total Commission</Typography>
                  <Typography variant="h4">
                    ₹{transactionSummary.totals.total_agent_commission}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
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


        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} lg={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent sx={{ height: 335 }}>
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
        </Grid>

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