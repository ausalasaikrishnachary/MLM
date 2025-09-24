import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, Typography, Select, MenuItem } from "@mui/material";
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
import Header from "../../../Shared/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../../BaseURL/BaseURL";
import "./Dashboard.css";

const cardColors = [
  "#037af2ff",
  "#ff4901ff",
  "#028690ff",
  "#a6a302ff",
  "#6e8a07ff",
  "#024978ff",
  "#8300bbff",
  "#cd1400ff",
];

const AdminDashboard = () => {
  const [counts, setCounts] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Fetch counts
  useEffect(() => {
    axios
      .get(`${baseurl}/counts/`)
      .then((res) => setCounts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch chart data
  useEffect(() => {
    axios
      .get(`${baseurl}/property-stats/`)
      .then((res) => {
        const data = res.data;
        const labels = Object.keys(data);
        const available = labels.map((type) => data[type].available);
        const sold = labels.map((type) => data[type].sold);
        const pending = labels.map((type) => data[type].pending);
        const approved = labels.map((type) => data[type].approved);

        setChartData({
          labels,
          datasets: [
            { label: "Available", data: available, backgroundColor: "#3498db" },
            { label: "Sold", data: sold, backgroundColor: "#2ecc71" },
            { label: "Pending", data: pending, backgroundColor: "#f1c40f" },
            { label: "Approved", data: approved, backgroundColor: "#9b59b6" },
          ],
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const metrics = counts
    ? [
        { label: "Total Properties", value: counts.total_properties, icon: <Business />, path: "/a-asset" },
        { label: "Active Users", value: counts.total_active_users, icon: <People />, path: "/a-activeagents" },
        { label: "Inactive Users", value: counts.total_inactive_users, icon: <People />, path: "/a-Inactiveagents" },
        { label: "New Properties", value: counts.total_latest_properties, icon: <Home />, path: "/a-Newproperties" },
        { label: "Sold Properties", value: counts.total_sold_properties, icon: <CheckCircle />, path: "/a-soldassets" },
        { label: "Booked Properties", value: counts.total_booked_properties, icon: <EventAvailable />, path: "/a-bookedassets" },
        { label: "Available Properties", value: counts.total_available_properties, icon: <HomeWork />, path: "/a-availableassets" },
        { label: "Pending Properties", value: counts.total_pending_properties, icon: <HourglassEmpty />, path: "/a-pendingassets" },
        { label: "Approved Properties", value: counts.total_approved_properties, icon: <Verified />, path: "/a-approvedassets" },
        { label: "Rejected Properties", value: counts.total_rejected_properties, icon: <Cancel />, path: "/a-rejectedassets" },
        { label: "Company Commissions", value: `₹${counts.total_company_commission_paid.toLocaleString("en-IN")}`, icon: <AccountBalance />, path: "/a-transactionmoniter" },
        { label: "Agent Commissions", value: `₹${counts.total_agent_commission_paid.toLocaleString("en-IN")}`, icon: <Payments />, path: "/a-commission" },
      ]
    : [];

  const options = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: { y: { beginAtZero: true } },
  };

  const getFilteredChart = () => {
    if (!chartData) return null;
    if (filter === "all") return chartData;
    return { labels: chartData.labels, datasets: chartData.datasets.filter((d) => d.label === filter) };
  };

  return (
    <>
      <Header />
      <Box className="dashboard-container">
    {/* <Typography className="dashboard-heading" variant="h4" sx={{mb:2}}>
          Dashboard
        </Typography> */}
 
<Card
  sx={{
    padding: 2,
    // boxShadow: "0px 4px 10px #2121217b",
    borderRadius: 2, 
  }}
>    
    
           <Box className="dashboard-content">
       
              

          <Box className="metrics-grid">
            {metrics.map((metric, index) => (
              <Card
                key={index}
                className="metric-card"
                style={{ backgroundColor: cardColors[index % cardColors.length] }}
                onClick={() => navigate(metric.path)}
              >
                <Box className="icon">
                  {React.cloneElement(metric.icon, { sx: { fontSize: 30, color: "white" } })}
                  <Typography className="metric-label">{metric.label}</Typography>
                </Box>
                <Typography className="metric-value">{metric.value}</Typography>
              </Card>
            ))}
          </Box>
       

          {/* Right Chart */}
          <Card className="chart-card">
            <Box className="chart-header">
              <Typography className="chart-title">Properties Performance</Typography>
              <Select size="small" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Sold">Sold</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
              </Select>
            </Box>
            <Box className="chart-body">
              {chartData && <Bar data={getFilteredChart()} options={{ ...options, maintainAspectRatio: false }} />}
            </Box>
          </Card>
        </Box>
        </Card>
      </Box>
    </>
  );
};

export default AdminDashboard;
