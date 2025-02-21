import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import { useNavigate } from "react-router-dom";

// You can also import Material UI icons if needed
// import SettingsIcon from '@mui/icons-material/Settings';
// import AddIcon from '@mui/icons-material/Add';

const AssetDashboard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/p-addasset');
  };

  return (
    <>
      <PartnerHeader />
      <Container
        sx={{
          py: 4,
          backgroundColor: '#F8FAFC',
          minHeight: '100vh',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
        maxWidth="lg"
      >
        <Typography variant="h4" sx={{ marginLeft: '10px', textAlign: "center" }}>
          My Assets
        </Typography>
        {/* Profile Section */}
        <Paper
          elevation={1}
          sx={{
            backgroundColor: '#fff',
            p: { xs: 2, sm: 3 },
            borderRadius: '12px',
            mb: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: '#E8F5E9',
                  color: '#10B981',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                }}
              >
                p
              </Box>
              <Box>
                <Typography variant="h6" sx={{ mb: 0 }}>
                  Partner
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#64748B', fontSize: '0.875rem', mb: 0 }}
                >
                  Premium Partner
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              sx={{
                border: '1px solid #E2E8F0',
                backgroundColor: 'transparent',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                color: '#64748B',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#0a549e',
                  color: '#fff',
                },
              }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                <i className="fas fa-cog"></i>
              </Box>
              Settings
            </Button>
          </Box>
        </Paper>

        {/* Stats Grid */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[
            { label: 'Total Assets', value: '12' },
            { label: 'Total Value', value: '8.5cr' },
            { label: 'Active Shares', value: '450' },
          ].map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper
                sx={{
                  backgroundColor: '#fff',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  p: 2,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 6px rgb(0, 0, 0)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    background: 'linear-gradient(135deg, #ffede6 0%, #d6bdbd 100%)',
                  },
                }}
              >
                <Typography
                  sx={{
                    color: '#64748B',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    '&:hover': { color: 'rgb(7, 7, 7)' },
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#0f141d',
                    mt: 0.5,
                  }}
                >
                  {stat.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Assets Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: '1.25rem', fontWeight: 600, m: 0 }}
          >
            My Assets
          </Typography>
          <Button
            onClick={handleClick}
            variant="contained"
            sx={{
              backgroundColor: '#10B981',
              color: '#fff',
              border: 'none',
              padding: '0.625rem 1.25rem',
              borderRadius: '8px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              '&:hover': { backgroundColor: '#059669', transform: 'translateY(-1px)' },
            }}
          >
            <Box component="span" sx={{ mr: 1 }}>
              <i className="fas fa-plus"></i>
            </Box>
            Submit New Asset
          </Button>
        </Box>

        {/* Assets Grid */}
        <Grid container spacing={3}>
          {/* Asset Card 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                position: 'relative',
                background: 'linear-gradient(135deg, #ffffff 0%, #2e1e1500 100%)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgb(0, 0, 0)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardMedia
                component="img"
                image="https://t4.ftcdn.net/jpg/01/69/69/21/360_F_169692156_L1aGrmJaHsZxF1sWQGuRKn3mR60bBqhN.jpg"
                alt="Luxury Apartment Complex"
                sx={{ height: 350, objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 15,
                  right: 15,
                  px: 2,
                  py: 1,
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  zIndex: 1,
                  backgroundColor: '#2ECC71',
                  color: '#fff',
                }}
              >
                Approved
              </Box>
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Luxury Apartment Complex
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#64748B',
                    fontSize: '0.875rem',
                    mb: 2,
                  }}
                >
                  Prime location in downtown area with 24/7 security
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background:
                      'linear-gradient(135deg, #d6bdbd 0%, #ffede6 100%)',
                    p: 2,
                    borderRadius: '8px',
                    color: 'black',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #ffede6 0%, #d6bdbd 100%)',
                      boxShadow: '0 12px 24px rgb(0,0,0)',
                    },
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
                      Value
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      ₹2,500,000/-
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
                      Shares
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>100</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Asset Card 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                position: 'relative',
                background: 'linear-gradient(135deg, #ffffff 0%, #2e1e1500 100%)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgb(0, 0, 0)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardMedia
                component="img"
                image="https://www.schwarzproperties.net/wp-content/uploads/2023/06/SHCZ-3.png"
                alt="Commercial Office Space"
                sx={{ height: 350, objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 15,
                  right: 15,
                  px: 2,
                  py: 1,
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  zIndex: 1,
                  backgroundColor: 'rgb(248, 0, 0)',
                  color: '#fff',
                }}
              >
                Pending
              </Box>
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Commercial Office Space
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#64748B',
                    fontSize: '0.875rem',
                    mb: 2,
                  }}
                >
                  Modern office building in tech district
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background:
                      'linear-gradient(135deg, #d6bdbd 0%, #ffede6 100%)',
                    p: 2,
                    borderRadius: '8px',
                    color: 'black',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #ffede6 0%, #d6bdbd 100%)',
                      boxShadow: '0 12px 24px rgb(0,0,0)',
                    },
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
                      Value
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      ₹5,000,000/-
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
                      Shares
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>200</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                position: 'relative',
                background: 'linear-gradient(135deg, #ffffff 0%, #2e1e1500 100%)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgb(0, 0, 0)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardMedia
                component="img"
                image="https://www.schwarzproperties.net/wp-content/uploads/2023/06/SHCZ-3.png"
                alt="Commercial Office Space"
                sx={{ height: 350, objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 15,
                  right: 15,
                  px: 2,
                  py: 1,
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  zIndex: 1,
                  backgroundColor: 'rgb(248, 0, 0)',
                  color: '#fff',
                }}
              >
                Pending
              </Box>
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Commercial Office Space
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#64748B',
                    fontSize: '0.875rem',
                    mb: 2,
                  }}
                >
                  Modern office building in tech district
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background:
                      'linear-gradient(135deg, #d6bdbd 0%, #ffede6 100%)',
                    p: 2,
                    borderRadius: '8px',
                    color: 'black',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #ffede6 0%, #d6bdbd 100%)',
                      boxShadow: '0 12px 24px rgb(0,0,0)',
                    },
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
                      Value
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      ₹5,000,000/-
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>
                      Shares
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>200</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AssetDashboard;
