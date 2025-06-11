import React from "react";
import { Box, Grid, Typography, Card } from "@mui/material";
import CountUp from "react-countup";

const StatsCard = ({ value, suffix, prefix, label, duration }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ p: 3, textAlign: "center", boxShadow: 3, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          {prefix}
          <CountUp start={0} end={value} duration={duration} separator="," />
          {suffix}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Card>
    </Grid>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 55000, suffix: " Cr", prefix: "₹", label: "Assets Under Management", duration: 3 },
    { value: 18, suffix: "%", prefix: "", label: "Annualized Returns Delivered", duration: 3 },
    { value: 1200, suffix: "+", prefix: "", label: "Number of Investors", duration: 3 },
    { value: 25, suffix: " Million", prefix: "", label: "Sq. Ft. of Industrial Space", duration: 3 }
  ];

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </Grid>
    </Box>
  );
};

export default StatsSection;
