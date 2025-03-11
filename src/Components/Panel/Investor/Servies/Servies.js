import { useState } from 'react';
import { 
  Container,
  Grid,
  Typography,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  styled,
  useTheme
} from '@mui/material';
import {
  Home,
  Search,
  CameraAlt,
  ShowChart,
  Calculate,
  Description,
  Forum,
  Handshake,
  Person,
  CheckCircle,
  Cancel,
  Info,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn
} from '@mui/icons-material';

// Styled Components
const ServiceTabWrapper = styled(Paper)(({ theme }) => ({
  borderRadius: 15,
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
  boxShadow: theme.shadows[5],
}));

const FeatureBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10]
  }
}));

const SubscriptionCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  overflow: 'hidden',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-10px)'
  }
}));

const subscriptionPlans = [
  {
    title: 'Basic',
    price: '₹49',
    period: '/month',
    description: 'Perfect for new agents',
    features: [
      { text: '5 Property Listings', included: true },
      { text: 'Basic Analytics', included: true },
      { text: 'Email Support', included: true },
      { text: 'Featured Listings', included: false },
      { text: 'Client Management', included: false }
    ],
    popular: false
  },
  {
    title: 'Professional',
    price: '₹99',
    period: '/month',
    description: 'For growing agents',
    features: [
      { text: '20 Property Listings', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Priority Email Support', included: true },
      { text: '5 Featured Listings', included: true },
      { text: 'Basic Client Management', included: true }
    ],
    popular: true
  },
  {
    title: 'Premium',
    price: '₹199',
    period: '/month',
    description: 'For established agencies',
    features: [
      { text: 'Unlimited Listings', included: true },
      { text: 'Premium Analytics', included: true },
      { text: '24/7 Phone Support', included: true },
      { text: '10 Featured Listings', included: true },
      { text: 'Advanced Client Management', included: true }
    ],
    popular: false
  }
];

const features = [
  { icon: <Search fontSize="large" />, title: 'Property Search', text: 'Advanced filtering options to find your ideal property based on your specific requirements.' },
  { icon: <CameraAlt fontSize="large" />, title: 'Virtual Tours', text: 'Explore properties remotely with our immersive 3D virtual tours and high-quality photos.' },
  { icon: <ShowChart fontSize="large" />, title: 'Market Analysis', text: 'Get insights into property values and market trends to make informed decisions.' },
  { icon: <Calculate fontSize="large" />, title: 'Investment Calculator', text: 'Estimate potential returns on your real estate investments with our advanced tools.' },
  { icon: <Description fontSize="large" />, title: 'Document Management', text: 'Secure storage and management of all your property-related documents in one place.' },
  { icon: <Forum fontSize="large" />, title: 'Consultation', text: 'One-on-one consultations with experienced real estate professionals to guide you.' }
];

const loanFeatures = [
  'Personalized Mortgage Plans',
  'Multiple Lender Network',
  'Streamlined Application'
];

const processSteps = [
  { number: 1, title: 'Initial Consultation', text: 'Discuss your financial goals and requirements with our loan experts.' },
  { number: 2, title: 'Pre-Approval', text: 'Get pre-approved to understand your budget and strengthen your offer.' },
  { number: 3, title: 'Lender Matching', text: 'We match you with the lenders offering the best terms for your situation.' },
  { number: 4, title: 'Closing Support', text: 'Guidance through the closing process ensuring a smooth transaction.' }
];

export default function ServiceModule() {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #3a6ea5 0%, #6c63ff 100%)',
        color: 'white',
        py: 8,
        borderRadius: { xs: '0 0 30px 30px', md: '0 0 50px 50px' },
        mb: 8
      }}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8} textAlign="center">
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                Properties Services
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 400 }}>
                Discover our extensive range of services designed to make your real estate journey seamless and successful.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Service Tabs */}
      <Container sx={{ mt: { xs: -6, md: -12 } }}>
        <ServiceTabWrapper>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                height: 3
              }
            }}
          >
            <Tab label="Property Services" icon={<Home />} iconPosition="start" />
            <Tab label="Loan Assistance" icon={<Handshake />} iconPosition="start" />
            <Tab label="Agent Subscription" icon={<Person />} iconPosition="start" />
          </Tabs>

          {/* Property Services Tab */}
          {tabValue === 0 && (
            <Box p={3}>
              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <FeatureBox>
                      <Box sx={{
                        width: 70,
                        height: 70,
                        bgcolor: 'rgba(58, 110, 165, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        color: '#3a6ea5'
                      }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.text}
                      </Typography>
                    </FeatureBox>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Loan Assistance Tab */}
          {tabValue === 1 && (
            <Box p={3}>
              <Grid container spacing={5} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h3" gutterBottom>
                    Comprehensive Loan Solutions
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Our loan assistance program simplifies the financing process, helping you secure the best rates and terms for your property purchase.
                  </Typography>
                  
                  {loanFeatures.map((feature, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <CheckCircle color="success" sx={{ fontSize: 28, mr: 2 }} />
                      <Box>
                        <Typography variant="h6">{feature}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {index === 0 && 'Tailored financing solutions based on your financial profile.'}
                          {index === 1 && 'Access to a wide range of lenders for competitive options.'}
                          {index === 2 && 'Simplified paperwork and guided application process.'}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
                    <Typography variant="h4" gutterBottom>
                      Our Loan Process
                    </Typography>
                    {processSteps.map((step, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box sx={{
                          width: 50,
                          height: 50,
                          bgcolor: 'primary.main',
                          color: 'white',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          flexShrink: 0
                        }}>
                          {step.number}
                        </Box>
                        <Box>
                          <Typography variant="h6">{step.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {step.text}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Paper>
                </Grid>
              </Grid>

              <Box textAlign="center" mt={5}>
                <Button variant="contained" size="large" sx={{ 
                  px: 6,
                  py: 1.5,
                  borderRadius: 5,
                  fontSize: '1.1rem'
                }}>
                  Apply for Loan Assistance
                </Button>
              </Box>
            </Box>
          )}

          {/* Subscription Tab */}
          {tabValue === 2 && (
            <Box p={3}>
              <Box textAlign="center" mb={5}>
                <Typography variant="h3" gutterBottom>
                  Agent Subscription Plans
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Choose the right plan for your real estate business needs
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {subscriptionPlans.map((plan, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <SubscriptionCard>
                      {plan.popular && (
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: 'secondary.main',
                          color: 'white',
                          px: 2,
                          py: 1,
                          borderRadius: '0 0 0 15px',
                          fontSize: '0.875rem',
                          fontWeight: 700
                        }}>
                          POPULAR
                        </Box>
                      )}
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          {plan.title}
                        </Typography>
                        <Typography variant="h2" sx={{ color: 'primary.main' }}>
                          {plan.price}
                          <Typography component="span" variant="body1" color="text.secondary">
                            {plan.period}
                          </Typography>
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                          {plan.description}
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                          {plan.features.map((feature, idx) => (
                            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              {feature.included ? (
                                <CheckCircle color="success" sx={{ mr: 1.5 }} />
                              ) : (
                                <Cancel color="error" sx={{ mr: 1.5 }} />
                              )}
                              <Typography variant="body2">
                                {feature.text}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 2 }}>
                        <Button 
                          fullWidth 
                          variant={plan.popular ? 'contained' : 'outlined'}
                          color={plan.popular ? 'secondary' : 'primary'}
                          sx={{ borderRadius: 5, py: 1.5 }}
                        >
                          Get Started
                        </Button>
                      </CardActions>
                    </SubscriptionCard>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{
                bgcolor: 'rgba(108, 99, 255, 0.1)',
                borderLeft: '4px solid #6c63ff',
                p: 2,
                borderRadius: 1,
                mt: 3,
                display: 'flex',
                alignItems: 'center'
              }}>
                <Info color="primary" sx={{ mr: 2 }} />
                <Typography variant="body2" fontStyle="italic">
                  Subscription pricing remains the same across all locations. No hidden fees or location-based surcharges.
                </Typography>
              </Box>
            </Box>
          )}
        </ServiceTabWrapper>
      </Container>

      {/* CTA Section */}
      <Container sx={{ mb: 8 }}>
        <Paper sx={{
          background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
          color: 'white',
          p: 6,
          borderRadius: 3,
          boxShadow: 3
        }}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" gutterBottom>
                Ready to Get Started?
              </Typography>
              <Typography variant="h6">
                Join thousands of satisfied clients who have transformed their real estate experience with our premium services.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                sx={{ borderRadius: 5, px: 4, py: 1.5 }}
              >
                Contact Us Today
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', py: 4 }}>
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                © 2025 Premium Real Estate Services. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ 
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'flex-end' },
              gap: 3
            }}>
              <Facebook fontSize="small" />
              <Twitter fontSize="small" />
              <Instagram fontSize="small" />
              <LinkedIn fontSize="small" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}