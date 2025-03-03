import React, { useState } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Icon,
} from '@mui/material';
import { CheckCircle, Home, Handyman, Person, Info } from '@mui/icons-material';
import { Box, Container, Typography, Button, Link, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const HeroSection = () => {


  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const services = [
    {
      title: 'Property Search',
      description: 'Advanced filtering options to find your ideal property based on your specific requirements.',
      icon: <Icon component={Home} />,
    },
    {
      title: 'Virtual Tours',
      description: 'Explore properties remotely with our immersive 3D virtual tours and high-quality photos.',
      icon: <Icon component={Handyman} />,
    },
    {
      title: 'Market Analysis',
      description: 'Get insights into property values and market trends to make informed decisions.',
      icon: <Icon component={Handyman} />,
    },
    {
      title: 'Investment Calculator',
      description: 'Estimate potential returns on your real estate investments with our advanced tools.',
      icon: <Icon component={Handyman} />,
    },
    {
      title: 'Document Management',
      description: 'Secure storage and management of all your property-related documents in one place.',
      icon: <Icon component={Handyman} />,
    },
    {
      title: 'Consultation',
      description: 'One-on-one consultations with experienced real estate professionals to guide you.',
      icon: <Icon component={Handyman} />,
    },
  ];

  const loanProcess = [
    {
      step: 'Initial Consultation',
      description: 'Discuss your financial goals and requirements with our loan experts.',
    },
    {
      step: 'Pre-Approval',
      description: 'Get pre-approved to understand your budget and strengthen your offer.',
    },
    {
      step: 'Lender Matching',
      description: 'We match you with the lenders offering the best terms for your situation.',
    },
    {
      step: 'Closing Support',
      description: 'Guidance through the closing process ensuring a smooth transaction.',
    },
  ];

  const subscriptionPlans = [
    {
      title: 'Basic',
      price: '₹49/month',
      description: 'Perfect for new agents',
      features: [
        '5 Property Listings',
        'Basic Analytics',
        'Email Support',
        'Featured Listings (No)',
        'Client Management (No)',
      ],
    },
    {
      title: 'Professional',
      price: '₹99/month',
      description: 'For growing agents',
      features: [
        '20 Property Listings',
        'Advanced Analytics',
        'Priority Email Support',
        '5 Featured Listings',
        'Basic Client Management',
      ],
      popular: true,
    },
    {
      title: 'Premium',
      price: '₹199/month',
      description: 'For established agencies',
      features: [
        'Unlimited Listings',
        'Premium Analytics',
        '24/7 Phone Support',
        '10 Featured Listings',
        'Advanced Client Management',
      ],
    },
  ];

  return (
    <>
    <Box
      sx={{
        background: 'linear-gradient(135deg, #3a6ea5 0%, #6c63ff 100%)',
        color: 'white',
        padding: '20px 0',
        borderRadius: '0 0 50px 50px',
        marginBottom: '60px',
      }}
    >
      <Container>
        <Box display="flex" justifyContent="center">
          <Box textAlign="center">
            <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
              Properties Services
            </Typography>
            <Typography variant="body1" component="body1" sx={{ mb: 5 }}>
              Discover our extensive range of services designed to make your real estate journey seamless and successful.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>



    <Box sx={{ mt: -10 }}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="Property Services" icon={<Home />} sx={{ color: value === 0 ? 'white' : 'inherit' }} />
          <Tab label="Loan Assistance" icon={<Handyman />} sx={{ color: value === 1 ? 'white' : 'inherit' }} />
          <Tab label="Agent Subscription" icon={<Person />} sx={{ color: value === 2 ? 'white' : 'inherit' }} />
        </Tabs>
      </AppBar>
      <Box sx={{ p: 3 }}>
        {value === 0 && (
          <Grid container spacing={2}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{service.icon} {service.title}</Typography>
                    <Typography variant="body2">{service.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        {value === 1 && (
          <Box>
            <Typography variant="h4">Comprehensive Loan Solutions</Typography>
            <Typography variant="body1">
              Our loan assistance program simplifies the financing process, helping you secure the best rates and terms for your property purchase.
            </Typography>
            {loanProcess.map((step, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle color="success" />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6">{step.step}</Typography>
                  <Typography variant="body2">{step.description}</Typography>
                </Box>
              </Box>
            ))}
            <Button variant="contained" color="primary">Apply for Loan Assistance</Button>
          </Box>
        )}
        {value === 2 && (
          <Box>
            <Typography variant="h4">Agent Subscription Plans</Typography>
            <Grid container spacing={2}>
              {subscriptionPlans.map((plan, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card>
                    <CardContent>
                      {plan.popular && <Box sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'secondary.main', color: 'white', p: 1 }}>POPULAR</Box>}
                      <Typography variant="h5">{plan.title}</Typography>
                      <Typography variant="h6">{plan.price}</Typography>
                      <Typography variant="body2">{plan.description}</Typography>
                      <Box>
                        {plan.features.map((feature, idx) => (
                          <Typography key={idx} variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircle color="success" sx={{ mr: 1 }} />
                            {feature}
                          </Typography>
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button variant="outlined" color="primary">Get Started</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(108, 99, 255, 0.1)', borderLeft: '4px solid', borderColor: 'accent.main', borderRadius: 1 }}>
              <Info sx={{ mr: 1 }} />
              Subscription pricing remains the same across all locations. No hidden fees or location-based surcharges.
            </Box>
          </Box>
        )}
      </Box>
    </Box>

    <Container>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
          color: 'white',
          borderRadius: '15px',
          padding: '60px 40px',
          marginBottom: '60px',
        }}
      >
        <Box display="flex" alignItems="center">
          <Box sx={{ flex: 1, mb: 4 }}>
            <Typography variant="h4" component="h4" sx={{ mb: 3 }}>
              Ready to Get Started?
            </Typography>
            <Typography variant="body1" component="body1" sx={{ mb: 0 }}>
              Join thousands of satisfied clients who have transformed their real estate experience with our premium services.
            </Typography>
          </Box>
          <Box textAlign="right">
            <Button variant="contained" color="light" size="large" href="#" sx={{ px: 4, background:'white', color:'black' }}>
              Contact Us Today
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>

    <Box sx={{ backgroundColor: 'black', color: 'white', py: 4 }}>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Typography variant="body2" sx={{ mb: 0 }}>
              © 2025 Premium Real Estate Services. All rights reserved.
            </Typography>
          </Grid>
          <Grid item md={6} textAlign="right">
            <Link href="#" color="inherit" sx={{ mr: 3 }}>
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link href="#" color="inherit" sx={{ mr: 3 }}>
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link href="#" color="inherit" sx={{ mr: 3 }}>
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link href="#" color="inherit">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>

    </>
    
  );
};

export default HeroSection;