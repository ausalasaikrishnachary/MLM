import React from "react";
import { Container, Grid, Box, Typography, Button, useTheme } from "@mui/material";
import { Building2, LightbulbIcon, BarChart3 } from 'lucide-react';
import Divider from '@mui/material/Divider';

const Aboutus = () => {
  const theme = useTheme();
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          // background: "linear-gradient(rgba(26, 32, 44, 0.7), rgba(45, 55, 72, 0.7))",
          color: "white",
          marginTop: "-15px"
        }}
      >
        <Container>
          <Box sx={{ p: 2 }}>
            <Typography
              component="h3"
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                mb: 2,
                color: "black"
              }}
              variant="h3"
            >
              Astra brings tangible transformation to the real estate sector.
            </Typography>
            <Typography
              sx={{ fontSize: "1.2rem" }}
              variant="h6"
              color="#636363"
              textAlign="justify"
            >
              Astra is a pioneering commercial real estate investment manager, focused on delivering exceptional risk-adjusted returns for our clients. Our innovative strategies and deep market insights empower us to uncover unique investment opportunities that drive sustainable growth. Committed to excellence, we foster transparent partnerships and leverage cutting-edge technology to redefine industry standards and shape the future of commercial real estate.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Divider />

      <Container sx={{ my: 4 }}>
        {/* Who We Are */}
        <Grid container alignItems="center" spacing={4} sx={{ my: 4 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Building2 size={32} />
              <Typography variant="h4" fontWeight="bold">
                Who We Are
              </Typography>
            </Box>
            <Typography component="p" sx={{ textAlign: "justify", mb: 2 }}>
              We are a dynamic investment firm specializing in commercial real estate. Our team of experts identifies high-potential properties and investment opportunities, ensuring that our clients achieve long-term financial growth.
            </Typography>
            <Typography component="p" sx={{ textAlign: "justify", mb: 2 }}>
              At Astra, our journey is defined by a commitment to excellence, innovation, and integrity. With decades of combined experience in the industry, we have honed our expertise in market analysis, property evaluation, and strategic planning.
            </Typography>
            {/* <Typography component="p" sx={{textAlign:"justify"}}>
              We believe in building lasting relationships, not only with our investors but also with the communities in which we operate, ensuring that every project contributes positively to local growth and prosperity.
            </Typography> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Modern office"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </Grid>
        </Grid>

        {/* What We Do */}
        <Grid container alignItems="center" spacing={4} sx={{ my: 4 }}>
          {/* On medium and above, image comes first */}
          <Grid
            item
            xs={12}
            md={6}
            order={{ xs: 2, md: 1 }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8&auto=format&fit=crop&w=1774&q=80"
              alt="Business meeting"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            order={{ xs: 1, md: 2 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Building2 size={32} />
              <Typography variant="h4" fontWeight="bold">
                What We Do
              </Typography>
            </Box>
            <Typography component="p" sx={{ textAlign: "justify", mb: 2 }}>
              We simplify commercial real estate investing by offering exclusive, data-driven opportunities and insights. Our comprehensive approach leverages advanced analytics to identify and evaluate market trends.
            </Typography>
            <Typography component="p" sx={{ textAlign: "justify", mb: 2 }}>
              Utilizing proprietary algorithms and rigorous market research, we analyze a wide range of factors to pinpoint investments that not only promise strong returns but also demonstrate resilience in fluctuating markets.
            </Typography>
            {/* <Typography component="p" sx={{textAlign:"justify"}}>
              From property selection to ongoing portfolio management, our commitment is to provide clarity, transparency, and unparalleled expertise at every step of the investment process.
            </Typography> */}
          </Grid>
        </Grid>

        {/* Why Choose Us */}
        <Grid container alignItems="center" spacing={4} sx={{ my: 4 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Building2 size={32} />
              <Typography variant="h4" fontWeight="bold">
                Why Choose Us?
              </Typography>
            </Box>
            <Typography component="p" sx={{ textAlign: "justify", mb: 2 }}>
              With deep industry expertise, cutting-edge technology, and a commitment to excellence, we help investors make informed, strategic decisions. Our personalized approach ensures that every investment aligns with your financial goals.
            </Typography>
            <Typography component="p" sx={{ textAlign: "justify", mb: 2 }}>
              Our success is built on transparency, integrity, and a relentless drive to innovate. We continuously refine our strategies and adopt the latest technological advancements to deliver insights that keep you ahead of the market.
            </Typography>
            {/* <Typography component="p" sx={{textAlign:"justify"}}>
              Choose Astra for a partnership that prioritizes your financial success, offers tailored investment solutions, and consistently delivers sustainable growth and risk-adjusted returns.
            </Typography> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
              alt="Team meeting"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          textAlign: "center",
          py: 6,
          mt: 4,
        }}
      >
        <Container>
          <Typography component="h2" sx={{ fontSize: "1.75rem", mb: 2 }}>
            Ready to Transform Your Investment Strategy?
          </Typography>
          <Button
            sx={{
              mt: 2,
              px: 4,
              py: 1,
              borderRadius: "50px",
              fontSize: "1.1rem",
              backgroundColor: "white",
              color: "#1976d2",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            Get Started Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Aboutus;
