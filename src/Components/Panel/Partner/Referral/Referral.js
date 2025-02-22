import React, { useState } from 'react';
import Header from '../../../Shared/Navbar/Navbar';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Chip,
  LinearProgress,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';

function PartnerReferral() {
  const [agentName, setAgentName] = useState('');
  const [propertiesSold, setPropertiesSold] = useState('');
  const [commissionRate, setCommissionRate] = useState(2);
  const [totalCommission, setTotalCommission] = useState(0);

  const calculateCommission = () => {
    const sold = parseFloat(propertiesSold);
    const rate = parseFloat(commissionRate);
    if (!isNaN(sold) && !isNaN(rate)) {
      const total = sold * 100000 * (rate / 100);
      setTotalCommission(total.toFixed(2));
    }
  };

  const tableData = [
    {
      agent: 'Smita',
      sold: 12,
      rate: '3%',
      earned: '₹12,000',
      tier: 'Gold',
      progress: 75,
      chipColor: 'warning',
    },
    {
      agent: 'Sheetal',
      sold: 8,
      rate: '2.5%',
      earned: '₹8,000',
      tier: 'Silver',
      progress: 50,
      chipColor: 'secondary',
    },
    {
      agent: 'Sonu Sood',
      sold: 20,
      rate: '4%',
      earned: '₹20,000',
      tier: 'Platinum',
      progress: 95,
      chipColor: 'success',
    },
  ];

  return (
    <>
      <PartnerHeader />
      <Box sx={{ backgroundColor: '#f4f7f9', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          {/* <Typography variant="h4" align="center" gutterBottom>
            Real Estate Partner Panel
          </Typography> */}

          {/* Overview Card */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              mb: 4,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.02)' },
            }}
          >
            <Typography variant="h5" gutterBottom>
              Agent Referral & Commission Overview
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: '#007bff', color: 'white' }}>
                      Agent Name
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#007bff', color: 'white' }}>
                      Properties Sold
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#007bff', color: 'white' }}>
                      Commission (%)
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#007bff', color: 'white' }}>
                      Total Earned
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#007bff', color: 'white' }}>
                      Tier
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#007bff', color: 'white' }}>
                      Progress
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{row.agent}</TableCell>
                      <TableCell>{row.sold}</TableCell>
                      <TableCell>{row.rate}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 'bold', color: '#28a745' }}
                        >
                          {row.earned}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={row.tier} color={row.chipColor} />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={row.progress}
                              sx={{
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: '#e0e0e0',
                                '& .MuiLinearProgress-bar': { backgroundColor: '#28a745' },
                              }}
                            />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">
                              {`${row.progress}%`}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Commission Calculation Card */}
          {/* <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.02)' },
            }}
          >
            <Typography variant="h5" gutterBottom>
              Calculate Agent Commission
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Agent Name"
                    variant="outlined"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Properties Sold"
                    variant="outlined"
                    value={propertiesSold}
                    onChange={(e) => setPropertiesSold(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="commissionRate-label">Commission Rate (%)</InputLabel>
                    <Select
                      labelId="commissionRate-label"
                      label="Commission Rate (%)"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(e.target.value)}
                    >
                      <MenuItem value={2}>2% (Bronze)</MenuItem>
                      <MenuItem value={2.5}>2.5% (Silver)</MenuItem>
                      <MenuItem value={3}>3% (Gold)</MenuItem>
                      <MenuItem value={4}>4% (Platinum)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={calculateCommission}
              >
                Calculate
              </Button>
            </Box>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Total Commission Earned:{' '}
              <span style={{ color: '#28a745' }}>₹{totalCommission}</span>
            </Typography>
          </Paper> */}
        </Container>
      </Box>
    </>
  );
}

export default PartnerReferral;
