import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  CardMedia,
  Select,
  MenuItem,
  CircularProgress,
  FormControl,
  Input,
} from '@mui/material';
import { faUserPlus, faTags, faCheckCircle, faBuilding, faHome } from '@fortawesome/free-solid-svg-icons';
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
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import { baseurl } from '../../../BaseURL/BaseURL';
import './Dashboard.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Card and text styling arrays
const cardColors = [
  '#ffecb3', '#ffecb3',
  '#ffe082f0', '#ffe082f0',
  '#ffd64fe7', '#ffd64fe7',
  '#ffc928e2', '#ffc928e2',
  '#ffbf00cd', '#ffbf00cd',
  '#ffc007', '#ffc007',
];

const textColors = [
  'rgba(2, 2, 2, 1)', 'rgba(2, 2, 2, 1)',
  'rgba(9, 9, 9, 0.87)', 'rgba(9, 9, 0, 0.87)',
  'rgba(10, 10, 10, 0.7)', 'rgba(10, 10, 10, 0.7)',
  'rgba(0, 0, 0, 0.61)', 'rgba(0, 0, 0, 0.61)',
  'rgba(0, 0, 0, 0.57)', 'rgba(0, 0, 0, 0.57)',
  'rgba(0, 0, 0, 0.51)', 'rgba(0, 0, 0, 0.51)',
];

const fontWeights = [1000, 1000, 900, 900, 800, 800, 700, 700, 600, 600, 600, 600];
const fontSizes = ['1.7rem', '1.7rem', '1.5rem', '1.5rem', '1.4rem', '1.4rem', '1.3rem', '1.3rem', '1.2rem', '1.2rem', '1.2rem', '1.0rem', '1.0rem'];

const AgentDashboard = () => {
  const referralId = localStorage.getItem('referral_id');
  const [totalAgents, setTotalAgents] = useState(0);
  const [totalActiveAgents, setTotalActiveAgents] = useState(0);
  const [counts, setCounts] = useState(null);
  const [property, setProperty] = useState(null);
  const [transactionSummary, setTransactionSummary] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');
  const chartRef = useRef(null);

  // Fetch counts
  useEffect(() => {
    setLoading(true);
    axios.get(`${baseurl}/counts/`)
      .then((response) => setCounts(response.data))
      .catch((error) => console.error('Error fetching counts:', error))
      .finally(() => setLoading(false));
  }, []);

  // Fetch property stats
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    axios.get(`${baseurl}/property-stats/user-id/${userId}/`)
      .then((response) => {
        const data = response.data;
        setProperty({
          total_properties: data.listing.properties.count,
          total_latest_properties: data.latest.properties.count,
          total_sold_properties: data.sold.properties.count,
        });

        // Gradient color pairs
        const gradientPairs = {
          Listing: ['#3f51b5', '#7986cb6d'],
          Latest: ['#899600ff', '#a9b6006d'],
          Sold: ['#a40037ff', '#ff6f6f6d'],
        };

        const createGradients = (dataset, colors) => {
          const ctx = chartRef.current?.ctx;
          if (!ctx) return colors[1];
          const gradient = ctx.createLinearGradient(0, 400, 0, 0);
          gradient.addColorStop(0, colors[0]);
          gradient.addColorStop(1, colors[1]);
          return Array(dataset.length).fill(gradient);
        };

        setChartData({
          labels: ['Properties'],
          datasets: [
            { label: 'Listing Properties', data: [data.listing.properties.count], backgroundColor: createGradients([data.listing.properties.count], gradientPairs.Listing) },
            { label: 'Latest Properties', data: [data.latest.properties.count], backgroundColor: createGradients([data.latest.properties.count], gradientPairs.Latest) },
            { label: 'Sold', data: [data.sold.properties.count], backgroundColor: createGradients([data.sold.properties.count], gradientPairs.Sold) },
          ],
        });
      })
      .catch((error) => console.error('Error fetching property stats:', error))
      .finally(() => setLoading(false));
  }, [userId]);

  // Fetch transaction summary
  useEffect(() => {
    if (!userId) return;
    fetch(`${baseurl}/transactions/grouped/user-id/${userId}/`)
      .then((res) => res.json())
      .then((data) => setTransactionSummary(data))
      .catch((err) => console.error('Error fetching transaction summary:', err));
  }, [userId]);

  // Fetch total agents
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

  // Fetch latest properties (3 properties)
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${baseurl}/latest-properties/`);
        const data = await response.json();
        const filteredProperties = data.filter(p => p.user_id?.toString() !== userId);
        const formatted = filteredProperties.map((p) => ({
          title: p.property_title || 'No Title',
          price: p.total_property_value ? `₹${p.total_property_value}` : '₹0',
          badges: [p.status || 'N/A', p.approval_status || 'N/A', p.looking_to?.toUpperCase() || 'N/A'],
          img: p.images?.[0]?.image ? `${baseurl}${p.images[0].image}` : 'https://via.placeholder.com/400x200?text=No+Image',
        }));
        setProperties(formatted.slice(0, 3));
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, [userId]);

  const metrics = [
    { label: 'Listing Properties', value: property?.total_properties ?? 0, icon: <FontAwesomeIcon icon={faBuilding} />, path: '/i-listingassets' },
    { label: 'Latest Properties', value: property?.total_latest_properties ?? 0, icon: <FontAwesomeIcon icon={faHome} />, path: '/i-latestProperties' },
    { label: 'Bookings', value: transactionSummary?.bookings?.properties?.count ?? 0, icon: <FontAwesomeIcon icon={faUserPlus} />, path: '/i-bookedassets' },
    { label: 'Purchased', value: transactionSummary?.purchased?.properties?.count ?? 0, icon: <FontAwesomeIcon icon={faTags} />, path: '/i-purchasedassets' },
    { label: 'Sold', value: property?.total_sold_properties ?? 0, icon: <FontAwesomeIcon icon={faCheckCircle} />, path: '/i-soldassets' },
  ];

  const options = { responsive: true, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } }, maintainAspectRatio: false };

  const getFilteredChart = () => {
    if (!chartData) return null;
    if (filter === 'all') return chartData;
    return { labels: chartData.labels, datasets: chartData.datasets.filter(d => d.label === filter) };
  };

  return (
    <>
      <InvestorHeader />
      <Box className="agent_dashboard_container">
        <Box className="agent_dashboard_content">
          {loading ? (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box className="agent_dashboard_top_row">
                <Box className="agent_dashboard_metrics_grid">
                  {metrics.map((metric, index) => (
                    <Card
                      key={index}
                      className="agent_dashboard_metric_card"
                      style={{ backgroundColor: cardColors[index % cardColors.length] }}
                      onClick={() => navigate(metric.path)}
                    >
                      <Box className="agent_dashboard_icon">
                        {React.cloneElement(metric.icon, { sx: { fontSize: 20, color: textColors[index % textColors.length], fontWeight: fontWeights[index % fontWeights.length] } })}
                        <Typography
                          className="agent_dashboard_metric_label"
                          style={{
                            color: textColors[index % textColors.length],
                            fontWeight: fontWeights[index % fontWeights.length],
                            fontSize: fontSizes[index % fontSizes.length],
                          }}
                        >
                          {metric.label}
                        </Typography>
                      </Box>
                      <Typography
                        className="agent_dashboard_metric_value"
                        style={{
                          color: textColors[index % textColors.length],
                          fontWeight: fontWeights[index % fontWeights.length],
                          fontSize: fontSizes[index % fontSizes.length],
                        }}
                      >
                        {metric.value}
                      </Typography>
                    </Card>
                  ))}
                </Box>
                <Box className="agent_dashboard_chart_card">
                  <Box className="agent_dashboard_chart_header">
                    <Typography className="agent_dashboard_chart_title">Property Statistics</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: 200 }}>
                      <Input
                        value="Select Category"
                        readOnly
                        disableUnderline
                        sx={{ fontSize: 16, color: '#555', px: 1, ml: -2 }}
                      />
                      <FormControl size="small" sx={{ borderRadius: '50px' }}>
                        <Select
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                          displayEmpty
                          sx={{ borderRadius: '50px' }}
                        >
                          <MenuItem value="all">Select All</MenuItem>
                          <MenuItem value="Listing Properties">Listing Properties</MenuItem>
                          <MenuItem value="Latest Properties">Latest Properties</MenuItem>
                          <MenuItem value="Sold">Sold</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box className="agent_dashboard_chart_body">
                    {chartData && <Bar ref={chartRef} data={getFilteredChart()} options={options} />}
                  </Box>
                </Box>
              </Box>
              <Box className="agent_dashboard_property_listings">
                <Box className="agent_dashboard_chart_header">
                  <Typography className="agent_dashboard_chart_title">Latest Property Listings</Typography>
                  <Button variant="outlined" size="small" onClick={() => navigate('/i-latestProperties')}>
                    View All
                  </Button>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Box className="agent_dashboard_property_grid">
                    {properties.map((p, i) => (
                      <Card
                        key={i}
                        className="agent_dashboard_property_card"
                      >
                        <Box sx={{ px: 1, pt: 1 }}>
                          <CardMedia component="img" height="220" image={p.img} alt={p.title} sx={{ borderRadius: 1, objectFit: 'cover' }} />
                        </Box>
                        <CardContent>
                          <Typography fontWeight="bold">{p.title}</Typography>
                          <Typography variant="body2" color="text.secondary">{p.price}</Typography>
                          <Box mt={1}>
                            {p.badges.map((badge, idx) => (
                              <Chip key={idx} label={badge} color={idx === 0 ? 'success' : 'info'} size="small" sx={{ mr: 0.5 }} />
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AgentDashboard;