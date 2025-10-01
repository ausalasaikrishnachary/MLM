  import React, { useEffect, useState, useRef } from "react";
  import axios from "axios";

  import { Box, Card, Typography, Select, MenuItem, CircularProgress, FormControl, Input } from "@mui/material";

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
    Payments,
    Business,
    People,
    Home,
  } from "@mui/icons-material";
  import { Bar } from "react-chartjs-2";
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import Header from "../../../Shared/Navbar/Navbar";
  import { useNavigate } from "react-router-dom";
  import { baseurl } from "../../../BaseURL/BaseURL";
  import "./Dashboard.css";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

  // Register Chart.js components
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const cardColors = [
    "#ffecb3","#ffecb3",
    "#ffe082f0","#ffe082f0",
    "#ffd64fe7","#ffd64fe7",
    "#ffc928e2","#ffc928e2",
    "#ffbf00cd","#ffbf00cd",
    "#ffc007","#ffc007",
  ];

  const textColors = [
    "rgba(2, 2, 2, 1)","rgba(2, 2, 2, 1)",
    "rgba(9, 9, 9, 0.87)","rgba(9, 9, 0, 0.87)",
    "rgba(10, 10, 10, 0.7)","rgba(10, 10, 10, 0.7)",
    "rgba(0, 0, 0, 0.61)","rgba(0, 0, 0, 0.61)",
    "rgba(0, 0, 0, 0.57)","rgba(0, 0, 0, 0.57)",
    "rgba(0, 0, 0, 0.51)","rgba(0, 0, 0, 0.51)",
  ];

  const fontWeights = [1000,1000,900,900,800,800,700,700,600,600,600,600];
  const fontSizes = ["1.7rem","1.7rem","1.5rem","1.5rem","1.4rem","1.4rem","1.3rem","1.3rem","1.2rem","1.2rem","1.2rem","1.0rem","1.0rem"];

  const AdminDashboard = () => {
    const [counts, setCounts] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const chartRef = useRef(null);

    // Fetch counts
    useEffect(() => {
      setLoading(true);
      axios.get(`${baseurl}/counts/`)
        .then(res => setCounts(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }, []);

    // Fetch chart data
useEffect(() => {
  setLoading(true);
  axios.get(`${baseurl}/property-stats/`)
    .then(res => {
      const data = res.data;
      const labels = Object.keys(data);
      const available = labels.map(type => data[type].available);
      const sold = labels.map(type => data[type].sold);
      const pending = labels.map(type => data[type].pending);
      const approved = labels.map(type => data[type].approved);

      // Gradient color pairs (bottom -> top)
      const gradientPairs = {
        Available: ["#e53935", "#ff6f6f6d"], // red gradient
        Sold: ["#4caf50", "#81c7846d"],      // green gradient
        Pending: ["#ffeb3b", "#fff1766d"],   // yellow gradient
        Approved: ["#ba68c8f9", "#9b27b04f"],  // purple gradient (unchanged)
      };

      const createGradients = (dataset, colors) => {
        const ctx = chartRef.current?.ctx;
        if (!ctx) return colors[1]; // fallback
        const gradient = ctx.createLinearGradient(0, 400, 0, 0); 
        gradient.addColorStop(0, colors[0]); // bottom color (darker)
        gradient.addColorStop(1, colors[1]); // top color (lighter)
        return Array(dataset.length).fill(gradient);
      };

      setChartData({
        labels,
        datasets: [
          { label: "Available", data: available, backgroundColor: createGradients(available, gradientPairs.Available) },
          { label: "Sold", data: sold, backgroundColor: createGradients(sold, gradientPairs.Sold) },
          { label: "Pending", data: pending, backgroundColor: createGradients(pending, gradientPairs.Pending) },
          { label: "Approved", data: approved, backgroundColor: createGradients(approved, gradientPairs.Approved) },
        ]
      });
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
}, []);



    const metrics = counts ? [
      { label:"Total Properties", value: counts.total_properties, icon:<Business />, path:"/a-asset" },
      { label:"Active Users", value: counts.total_active_users, icon:<People />, path:"/a-activeagents" },
      { label:"Inactive Users", value: counts.total_inactive_users, icon:<People />, path:"/a-Inactiveagents" },
      { label:"New Properties", value: counts.total_latest_properties, icon:<Home />, path:"/a-Newproperties" },
      { label:"Sold Properties", value: counts.total_sold_properties, icon:<CheckCircle />, path:"/a-soldassets" },
      { label:"Booked Properties", value: counts.total_booked_properties, icon:<EventAvailable />, path:"/a-bookedassets" },
      { label:"Available Properties", value: counts.total_available_properties, icon:<HomeWork />, path:"/a-availableassets" },
      { label:"Pending Properties", value: counts.total_pending_properties, icon:<HourglassEmpty />, path:"/a-pendingassets" },
      { label:"Approved Properties", value: counts.total_approved_properties, icon:<Verified />, path:"/a-approvedassets" },
      { label:"Rejected Properties", value: counts.total_rejected_properties, icon:<Cancel />, path:"/a-rejectedassets" },
      { label:"Company Commissions", value:`₹${counts.total_company_commission_paid.toLocaleString("en-IN")}`, icon:<AccountBalance />, path:"/a-transactionmoniter" },
      { label:"Agent Commissions", value:`₹${counts.total_agent_commission_paid.toLocaleString("en-IN")}`, icon:<Payments />, path:"/a-commission" },
    ] : [];

    const options = { responsive:true, plugins:{ legend:{ position:"bottom" }}, scales:{ y:{ beginAtZero:true }}, maintainAspectRatio:false };
    const getFilteredChart = () => {
      if(!chartData) return null;
      if(filter==="all") return chartData;
      return { labels: chartData.labels, datasets: chartData.datasets.filter(d=>d.label===filter) };
    };

    return (
      <>
        <Header />
        <Box className="dashboard-container">
          <Box className="dashboard-content">
            {loading ? (
              <Box sx={{ width:"100%", display:"flex", justifyContent:"center", alignItems:"center", minHeight:400 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box className="metrics-grid">
                  {metrics.map((metric,index)=>(
                    <Card key={index} className="metric-card" style={{backgroundColor: cardColors[index % cardColors.length]}} onClick={()=>navigate(metric.path)}>
                      <Box className="icon">
                        {React.cloneElement(metric.icon,{ sx:{ fontSize:20, color:textColors[index % textColors.length], fontWeight: fontWeights[index % fontWeights.length] } })}
                        <Typography className="metric-label" style={{ color:textColors[index % textColors.length], fontWeight: fontWeights[index % fontWeights.length], fontSize: fontSizes[index % fontSizes.length] }}>
                          {metric.label}
                        </Typography>
                      </Box>
                      <Typography className="metric-value" style={{ color:textColors[index % textColors.length], fontWeight: fontWeights[index % fontWeights.length], fontSize: fontSizes[index % fontSizes.length] }}>
                        {metric.value}
                      </Typography>
                    </Card>
                  ))}
                </Box>

                <Box className="chart-card">
                  <Box className="chart-header">
                    <Typography className="chart-title">Properties Performance</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap:0, minWidth: 200 }}>
    {/* Plain input acting as a label */}
    <Input
      value="Select Category"
      readOnly
      disableUnderline
      sx={{ fontSize: 16, color: '#555', px: 1, ml:-2 }}
    />

    {/* Actual Select */}
    <FormControl size="small" sx={{ borderRadius: '50px' }}>
      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        displayEmpty
        sx={{ borderRadius: '50px' }}
      >
        <MenuItem value="all">Select All</MenuItem>
        <MenuItem value="Available">Available</MenuItem>
        <MenuItem value="Sold">Sold</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Approved">Approved</MenuItem>
      </Select>
    </FormControl>
  </Box>

                  </Box>
                  <Box className="chart-body">
                    {chartData && <Bar ref={chartRef} data={getFilteredChart()} options={options} />}
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </>
    );
  };

  export default AdminDashboard;
