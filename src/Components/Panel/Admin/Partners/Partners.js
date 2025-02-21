import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
  Typography,
  Badge,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';

// Material UI Icons
import HandshakeIcon from '@mui/icons-material/Handshake';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../../../Shared/Navbar/Navbar';

// Custom colors (matching your CSS variables)
const colors = {
  primary: '#4a90e2',
  secondary: '#f8f9fa',
  accent: '#ff6b6b',
  textPrimary: '#2c3e50',
  textSecondary: '#6c757d',
  active: '#2ecc71',
  pending: '#f1c40f',
};

// Styled Paper for partner items with hover effect
const PartnerItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  backgroundColor: colors.secondary,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  borderLeft: '4px solid transparent',
  '&:hover': {
    backgroundColor: '#ffffff',
    borderLeft: `4px solid ${colors.primary}`,
    transform: 'translateX(5px)',
  },
}));

const PartnersDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState({
    name: '',
    role: '',
    projects: 0,
    rating: 0,
  });

  const showPartnerDetails = (name, role) => {
    // In a real app, these values might be fetched dynamically
    setSelectedPartner({ name, role, projects: 12, rating: 4.8 });
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
    <Header/>
    <Box
      sx={{
        minHeight: '100vh',
        p: 2,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)',
      }}
    >
      <Container maxWidth="lg">
        {/* Dashboard Header */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <HandshakeIcon sx={{ mr: 1, color: colors.primary }} />
            <Typography variant="h5">
              Partners <span style={{ color: colors.primary }}>Dashboard</span>
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Manage partner applications, track performance, and handle permissions efficiently.
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {/* Pending Reviews */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                    Pending Reviews
                  </Typography>
                  <Badge
                    badgeContent="2 New"
                    color="warning"
                    sx={{
                      '& .MuiBadge-badge': {
                        borderRadius: '20px',
                        padding: '0.5em 1em',
                        width:"70px",
                        marginRight:"40px",
                        marginTop:"15px",
                      },
                    }}
                  />
                </Box>

                {/* Partner Items */}
                <PartnerItem>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: colors.pending,
                        mr: 1,
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                      Naveenchary
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: colors.textSecondary, mb: 1 }}>
                    <ApartmentIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">Property Manager</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.9rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                      <Typography variant="body2">4.8</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: 'info.main' }} />
                      <Typography variant="body2">Last active: 2024-03-10</Typography>
                    </Box>
                  </Box>
                </PartnerItem>

                <PartnerItem>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: colors.pending,
                        mr: 1,
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                      Naveen
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: colors.textSecondary, mb: 1 }}>
                    <ApartmentIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">Property Manager</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.9rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                      <Typography variant="body2">4.2</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: 'info.main' }} />
                      <Typography variant="body2">Last active: 2024-03-11</Typography>
                    </Box>
                  </Box>
                </PartnerItem>
              </CardContent>
            </Card>
          </Grid>

          {/* Active Partners */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                    Active Partners
                  </Typography>
                  <Badge
                    badgeContent="2 Online"
                    color="success"
                    sx={{
                      '& .MuiBadge-badge': {
                        borderRadius: '20px',
                        padding: '0.5em 1em',
                        width:"70px",
                        marginRight:"40px",
                        marginTop:"15px",
                      },
                    }}
                  />
                </Box>

                <PartnerItem onClick={() => showPartnerDetails('Naveen', 'Investment Partner')}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: colors.active,
                        mr: 1,
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                      Naveen
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: colors.textSecondary, mb: 1 }}>
                    <ShowChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">Investment Partner</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.9rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccountTreeIcon sx={{ fontSize: 16, color: colors.primary }} />
                      <Typography variant="body2">12 Projects</Typography>
                    </Box>
                  </Box>
                </PartnerItem>

                <PartnerItem onClick={() => showPartnerDetails('XYZ', 'Investment Partner')}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: colors.active,
                        mr: 1,
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                      XYZ
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: colors.textSecondary, mb: 1 }}>
                    <ShowChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">Investment Partner</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.9rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccountTreeIcon sx={{ fontSize: 16, color: colors.primary }} />
                      <Typography variant="body2">8 Projects</Typography>
                    </Box>
                  </Box>
                </PartnerItem>
              </CardContent>
            </Card>
          </Grid>

          {/* Performance Overview */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Performance Overview
                </Typography>

                <Paper
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Average Rating</Typography>
                    <Typography variant="h5">4.5</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={90}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      '& .MuiLinearProgress-bar': { backgroundColor: '#ffc107' },
                    }}
                  />
                </Paper>

                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Total Partners</Typography>
                    <Typography variant="h5">3</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={60}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      '& .MuiLinearProgress-bar': { backgroundColor: '#17a2b8' },
                    }}
                  />
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Partner Details Modal */}
      <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pr: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountCircleIcon sx={{ fontSize: 32, color: colors.primary }} />
            <Typography variant="h6">Partner Details</Typography>
          </Box>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'grey.200', width: 56, height: 56 }}>
                <PersonIcon sx={{ fontSize: 32, color: colors.primary }} />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  {selectedPartner.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {selectedPartner.role}
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, borderRadius: 2, textAlign: 'center', bgcolor: 'grey.100' }}>
                  <Typography variant="caption" color="textSecondary">
                    Projects
                  </Typography>
                  <Typography variant="h6">{selectedPartner.projects}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, borderRadius: 2, textAlign: 'center', bgcolor: 'grey.100' }}>
                  <Typography variant="caption" color="textSecondary">
                    Rating
                  </Typography>
                  <Typography variant="h6">
                    {selectedPartner.rating} ⭐
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
    </>
  );
};

export default PartnersDashboard;
