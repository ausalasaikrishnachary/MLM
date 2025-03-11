import React, { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import {
  CheckCircle,
  Home,
  Handyman,
  Person,
  Info,
  BusinessCenter,
  Description,
  SupportAgent,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";

const HeroSection = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const services = [
    {
      title: "Property Search",
      description:
        "Advanced filtering options to find your ideal property based on your specific requirements.",
      icon: <Home fontSize="large" color="primary" />,
    },
    {
      title: "Virtual Tours",
      description:
        "Explore properties remotely with our immersive 3D virtual tours and high-quality photos.",
      icon: <BusinessCenter fontSize="large" color="primary" />,
    },
    {
      title: "Market Analysis",
      description:
        "Get insights into property values and market trends to make informed decisions.",
      icon: <Info fontSize="large" color="primary" />,
    },
    {
      title: "Investment Calculator",
      description:
        "Estimate potential returns on your real estate investments with our advanced tools.",
      icon: <Handyman fontSize="large" color="primary" />,
    },
    {
      title: "Document Management",
      description:
        "Secure storage and management of all your property-related documents in one place.",
      icon: <Description fontSize="large" color="primary" />,
    },
    {
      title: "Consultation",
      description:
        "One-on-one consultations with experienced real estate professionals to guide you.",
      icon: <SupportAgent fontSize="large" color="primary" />,
    },
  ];

  const loanProcess = [
    {
      step: "Initial Consultation",
      description: "Discuss your financial goals and requirements with our loan experts.",
    },
    {
      step: "Pre-Approval",
      description: "Get pre-approved to understand your budget and strengthen your offer.",
    },
    {
      step: "Lender Matching",
      description: "We match you with the lenders offering the best terms for your situation.",
    },
    {
      step: "Closing Support",
      description: "Guidance through the closing process ensuring a smooth transaction.",
    },
  ];

  return (
    <>
      <InvestorHeader />

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #3a6ea5 0%, #6c63ff 100%)",
          color: "white",
          padding: "40px 0",
          borderRadius: "0 0 50px 50px",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Properties Services
          </Typography>
          <Typography variant="body1" mb={3}>
            Discover our extensive range of services designed to make your real estate journey seamless and successful.
          </Typography>
        </Container>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ mt: -5 }}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="Property Services" icon={<Home />} />
            <Tab label="Loan Assistance" icon={<Handyman />} />
            <Tab label="Agent Subscription" icon={<Person />} />
          </Tabs>
        </AppBar>
        <Box sx={{ p: 3 }}>
          {value === 0 && (
            <Grid container spacing={3}>
              {services.map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card elevation={3} sx={{ textAlign: "center", p: 2 }}>
                    <CardContent>
                      {service.icon}
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          {value === 1 && (
            <Box>
              <Typography variant="h4" mb={2}>
                Comprehensive Loan Solutions
              </Typography>
              <Typography variant="body1" mb={3}>
                Our loan assistance program simplifies the financing process, helping you secure the best rates and terms for your property purchase.
              </Typography>
              {loanProcess.map((step, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CheckCircle color="success" />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6">{step.step}</Typography>
                    <Typography variant="body2">{step.description}</Typography>
                  </Box>
                </Box>
              ))}
              <Button variant="contained" color="primary">
                Apply for Loan Assistance
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Call to Action Section */}
      <Container>
        <Box
          sx={{
            background: "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)",
            color: "white",
            borderRadius: "15px",
            padding: "50px",
            textAlign: "center",
            mt: 5,
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={3}>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" mb={4}>
            Join thousands of satisfied clients who have transformed their real estate experience with our premium services.
          </Typography>
          <Button variant="contained" sx={{ backgroundColor: "white", color: "black" }}>
            Contact Us Today
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: "black", color: "white", py: 3, mt: 5 }}>
        <Container>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="body2">© 2025 Premium Real Estate Services. All rights reserved.</Typography>
            </Grid>
            <Grid item>
              {[
                { icon: faFacebookF, link: "#" },
                { icon: faTwitter, link: "#" },
                { icon: faInstagram, link: "#" },
                { icon: faLinkedinIn, link: "#" },
              ].map((social, index) => (
                <IconButton key={index} href={social.link} color="inherit">
                  <FontAwesomeIcon icon={social.icon} />
                </IconButton>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;
