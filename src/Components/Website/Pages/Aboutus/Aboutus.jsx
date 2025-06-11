import React from 'react';
import { Building2, LightbulbIcon, BarChart3, } from 'lucide-react';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import './Aboutus.css'; // Import the CSS file

const Aboutus = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          height: '60vh',

          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `linear-gradient(rgba(26, 32, 44, 0.7), rgba(45, 55, 72, 0.7)), `,
          display: 'flex',
          alignItems: 'center',
          mb: 8
        }}
      >





        <Container maxWidth="lg">
          <Box className="aboutus-hero-content" sx={{ textAlign: 'center' }}>
            <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
              Astra brings tangible transformation to the real estate sector.
            </Typography>
            <Typography variant="h6" sx={{ color: '#636363' }}>
              Astra brings tangible transformation to the real estate sector.
              Astra is a pioneering commercial real estate investment manager, driven by the core belief that a focused, value-investing strategy within the under-explored middle market can deliver superior returns. We engage in investments across diverse asset classes, risk profiles, and geographic regions, with a constant focus on delivering exceptional risk-adjusted returns for our clients. Our clients range from endowments, foundations, and wealth managers to family offices and individual investors.
            </Typography>
          </Box>
        </Container>

      </Paper>

      <Container maxWidth="lg">
        {/* Who We Are Section */}
        <Box className="aboutus-section">
          <Box className="aboutus-title">
            <Building2 size={32} color={theme.palette.primary.main} />
            <Typography variant="h3" color="primary" fontWeight="bold">
              Who We Are
            </Typography>
          </Box>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" className="aboutus-text">
                We are a dynamic investment firm specializing in commercial real estate. Our team of experts identifies high-potential properties and investment opportunities, ensuring that our clients achieve long-term financial growth.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={4}>
                <CardMedia
                  component="img"
                  height="300"
                  image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Modern office building"
                />
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* What We Do Section */}
        <Box className="aboutus-what-we-do">
          <Box className="aboutus-title">
            <LightbulbIcon size={32} color={theme.palette.primary.main} />
            <Typography variant="h3" color="primary" fontWeight="bold">
              What We Do
            </Typography>
          </Box>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Card elevation={4}>
                <CardMedia
                  component="img"
                  height="300"
                  image="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80"
                  alt="Business meeting"
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" className="aboutus-text" sx={{ fontStyle: 'italic' }}>
                We simplify commercial real estate investing by offering exclusive, data-driven opportunities. From sourcing prime properties to providing comprehensive investment analysis, we empower investors with the tools they need to build a strong and diverse portfolio.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Why Choose Us Section */}
        <Box className="aboutus-why-choose">
          <Box className="aboutus-title">
            <BarChart3 size={32} color={theme.palette.primary.main} />
            <Typography variant="h3" color="primary" fontWeight="bold">
              Why Choose Us?
            </Typography>
          </Box>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" className="aboutus-text" sx={{ fontStyle: 'italic' }}>
                With deep industry expertise, cutting-edge technology, and a commitment to excellence, we help investors make informed, strategic decisions. Our personalized approach ensures that every investment aligns with your financial goals, delivering sustainable growth and success.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={4}>
                <CardMedia
                  component="img"
                  height="300"
                  image="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
                  alt="Professional team meeting"
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Call to Action */}
      <Box className="aboutus-call-to-action">
        <Container maxWidth="lg">
          <Box className="aboutus-call-to-action-content">
            <Typography variant="h3" component="h2" gutterBottom>
              Ready to Transform Your Investment Strategy?
            </Typography>
            <Button
              variant="contained"
              size="large"
              className="aboutus-call-to-action-button"
            >
              Get Started Today
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Aboutus;
