// import React, { useState } from 'react';
// import Header from '../../../Shared/Navbar/Navbar';
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   Chip,
//   LinearProgress,
//   Grid,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
// } from '@mui/material';
// import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';

// function PartnerReferral() {
//   const [agentName, setAgentName] = useState('');
//   const [propertiesSold, setPropertiesSold] = useState('');
//   const [commissionRate, setCommissionRate] = useState(2);
//   const [totalCommission, setTotalCommission] = useState(0);

//   const calculateCommission = () => {
//     const sold = parseFloat(propertiesSold);
//     const rate = parseFloat(commissionRate);
//     if (!isNaN(sold) && !isNaN(rate)) {
//       const total = sold * 100000 * (rate / 100);
//       setTotalCommission(total.toFixed(2));
//     }
//   };

//   const tableData = [
//     {
//       agent: 'Smita',
//       sold: 12,
//       rate: '3%',
//       earned: '₹12,000',
//       tier: 'Gold',
//       progress: 75,
//       chipColor: 'warning',
//     },
//     {
//       agent: 'Sheetal',
//       sold: 8,
//       rate: '2.5%',
//       earned: '₹8,000',
//       tier: 'Silver',
//       progress: 50,
//       chipColor: 'secondary',
//     },
//     {
//       agent: 'Sonu Sood',
//       sold: 20,
//       rate: '4%',
//       earned: '₹20,000',
//       tier: 'Platinum',
//       progress: 95,
//       chipColor: 'success',
//     },
//   ];

//   return (
//     <>
//       <PartnerHeader />
//       <Box sx={{ backgroundColor: '#f4f7f9', minHeight: '100vh', py: 4 }}>
//         <Container maxWidth="lg">
//           {/* <Typography variant="h4" align="center" gutterBottom>
//             Real Estate Partner Panel
//           </Typography> */}

//           {/* Overview Card */}
//           <Paper
//             elevation={3}
//             sx={{
//               p: 3,
//               borderRadius: 2,
//               mb: 4,
//               transition: 'transform 0.3s ease-in-out',
//               '&:hover': { transform: 'scale(1.02)' },
//             }}
//           >
//             <Typography variant="h5" gutterBottom>
//               Agent Referral & Commission Overview
//             </Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ backgroundColor: '#007bff', color: 'white' }}>
//                       Agent Name
//                     </TableCell>
//                     <TableCell sx={{ backgroundColor: '#007bff', color: 'white' }}>
//                       Properties Sold
//                     </TableCell>
//                     <TableCell sx={{ backgroundColor: '#007bff', color: 'white' }}>
//                       Commission (%)
//                     </TableCell>
//                     <TableCell sx={{ backgroundColor: '#007bff', color: 'white' }}>
//                       Total Earned
//                     </TableCell>
//                     <TableCell sx={{ backgroundColor: '#007bff', color: 'white' }}>
//                       Tier
//                     </TableCell>
//                     <TableCell sx={{ backgroundColor: '#007bff', color: 'white' }}>
//                       Progress
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {tableData.map((row, index) => (
//                     <TableRow key={index} hover>
//                       <TableCell>{row.agent}</TableCell>
//                       <TableCell>{row.sold}</TableCell>
//                       <TableCell>{row.rate}</TableCell>
//                       <TableCell>
//                         <Typography
//                           variant="body1"
//                           sx={{ fontWeight: 'bold', color: '#28a745' }}
//                         >
//                           {row.earned}
//                         </Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Chip label={row.tier} color={row.chipColor} />
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <Box sx={{ width: '100%', mr: 1 }}>
//                             <LinearProgress
//                               variant="determinate"
//                               value={row.progress}
//                               sx={{
//                                 height: 10,
//                                 borderRadius: 5,
//                                 backgroundColor: '#e0e0e0',
//                                 '& .MuiLinearProgress-bar': { backgroundColor: '#28a745' },
//                               }}
//                             />
//                           </Box>
//                           <Box sx={{ minWidth: 35 }}>
//                             <Typography variant="body2" color="text.secondary">
//                               {`${row.progress}%`}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>

//           {/* Commission Calculation Card */}
//           {/* <Paper
//             elevation={3}
//             sx={{
//               p: 3,
//               borderRadius: 2,
//               transition: 'transform 0.3s ease-in-out',
//               '&:hover': { transform: 'scale(1.02)' },
//             }}
//           >
//             <Typography variant="h5" gutterBottom>
//               Calculate Agent Commission
//             </Typography>
//             <Box component="form" noValidate autoComplete="off">
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={4}>
//                   <TextField
//                     fullWidth
//                     label="Agent Name"
//                     variant="outlined"
//                     value={agentName}
//                     onChange={(e) => setAgentName(e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <TextField
//                     fullWidth
//                     type="number"
//                     label="Properties Sold"
//                     variant="outlined"
//                     value={propertiesSold}
//                     onChange={(e) => setPropertiesSold(e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <FormControl fullWidth variant="outlined">
//                     <InputLabel id="commissionRate-label">Commission Rate (%)</InputLabel>
//                     <Select
//                       labelId="commissionRate-label"
//                       label="Commission Rate (%)"
//                       value={commissionRate}
//                       onChange={(e) => setCommissionRate(e.target.value)}
//                     >
//                       <MenuItem value={2}>2% (Bronze)</MenuItem>
//                       <MenuItem value={2.5}>2.5% (Silver)</MenuItem>
//                       <MenuItem value={3}>3% (Gold)</MenuItem>
//                       <MenuItem value={4}>4% (Platinum)</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//               </Grid>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ mt: 3 }}
//                 onClick={calculateCommission}
//               >
//                 Calculate
//               </Button>
//             </Box>
//             <Typography variant="h6" sx={{ mt: 3 }}>
//               Total Commission Earned:{' '}
//               <span style={{ color: '#28a745' }}>₹{totalCommission}</span>
//             </Typography>
//           </Paper> */}
//         </Container>
//       </Box>
//     </>
//   );
// }

// export default PartnerReferral;


import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Header from '../../../Shared/Navbar/Navbar';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';

const PartnerReferral = () => {
  const [commissionData, setCommissionData] = useState({
    agentName: '',
    propertiesSold: '',
    propertyValue: '',
    commissionRate: '2',
  });
  const [calculatedCommission, setCalculatedCommission] = useState(0);

  const handleChange = (e) => {
    setCommissionData({
      ...commissionData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateCommission = () => {
    const propertiesSold = parseFloat(commissionData.propertiesSold) || 0;
    const propertyValue = parseFloat(commissionData.propertyValue) || 0;
    const commissionRate = parseFloat(commissionData.commissionRate) || 0;
    const total = (propertiesSold * propertyValue * (commissionRate / 100)).toFixed(2);
    setCalculatedCommission(total);
  };

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4,pt: 4 }}>
          <Typography variant="h4">Referral and Commission Dashboard</Typography>
         
        </Box>

        <Grid container spacing={3}>
          {/* Stat Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 2,
                textAlign: 'center',
                p: 2,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <CardContent>
                <HomeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h5" component="div">
                  40
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Properties Sold
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 2,
                textAlign: 'center',
                p: 2,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <CardContent>
                <AttachMoneyIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h5" component="div">
                  ₹40,000
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Commission
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 2,
                textAlign: 'center',
                p: 2,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <CardContent>
                <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h5" component="div">
                  15
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Agents
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 2,
                textAlign: 'center',
                p: 2,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <CardContent>
                <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h5" component="div">
                  85%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monthly Growth
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Agent Performance Tracker */}
          <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Agent Performance Tracker</Typography>
                <Button variant="contained" startIcon={<PersonAddIcon />}>
                  Add Agent
                </Button>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'primary.main' }}>
                      <TableCell sx={{ color: '#fff' }}>Agent Name</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Properties Sold</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Commission Rate</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Total Earned</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Tier Status</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Progress to Next Tier</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1: Smita */}
                    <TableRow>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            alt="Smita"
                            src="https://www.w3schools.com/w3images/team2.jpg"
                            sx={{ width: 32, height: 32, mr: 1 }}
                          />
                          Smita
                        </Box>
                      </TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>3%</TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                          ₹12,000
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label="Gold" color="warning" size="small" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" value={75} />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">
                              75%
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    {/* Row 2: Sheetal */}
                    <TableRow>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            alt="Sheetal"
                            src="https://www.w3schools.com/w3images/team2.jpg"
                            sx={{ width: 32, height: 32, mr: 1 }}
                          />
                          Sheetal
                        </Box>
                      </TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>2.5%</TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                          ₹8,000
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label="Silver" color="default" size="small" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" value={50} />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">
                              50%
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    {/* Row 3: Sonu sood */}
                    <TableRow>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            alt="Sonu sood"
                            src="https://www.w3schools.com/w3images/team2.jpg"
                            sx={{ width: 32, height: 32, mr: 1 }}
                          />
                          Sonu sood
                        </Box>
                      </TableCell>
                      <TableCell>20</TableCell>
                      <TableCell>4%</TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                          ₹20,000
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label="Platinum" color="success" size="small" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" value={95} />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">
                              95%
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          {/* Commission Calculator & Recent Updates */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Commission Calculator
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Agent Name"
                    name="agentName"
                    fullWidth
                    value={commissionData.agentName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Properties Sold"
                    name="propertiesSold"
                    type="number"
                    fullWidth
                    value={commissionData.propertiesSold}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Property Value (₹)"
                    name="propertyValue"
                    type="number"
                    fullWidth
                    value={commissionData.propertyValue}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Commission Tier</InputLabel>
                    <Select
                      name="commissionRate"
                      value={commissionData.commissionRate}
                      label="Commission Tier"
                      onChange={handleChange}
                    >
                      <MenuItem value="2">Bronze (2%)</MenuItem>
                      <MenuItem value="2.5">Silver (2.5%)</MenuItem>
                      <MenuItem value="3">Gold (3%)</MenuItem>
                      <MenuItem value="4">Platinum (4%)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={calculateCommission}>
                    Calculate Commission
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">
                  Calculated Commission:{' '}
                  <span style={{ color: '#198754' }}>₹{calculatedCommission}</span>
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Updates
              </Typography>
              {/* Notification Card 1 */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  mb: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }}
              >
                <EmojiEventsIcon sx={{ color: 'warning.main', mr: 1 }} />
                <Box>
                  <Typography variant="subtitle2">
                    <strong>Smita achieved Gold tier!</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    2 hours ago
                  </Typography>
                </Box>
              </Box>
              {/* Notification Card 2 */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  mb: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }}
              >
                <HomeIcon sx={{ color: 'success.main', mr: 1 }} />
                <Box>
                  <Typography variant="subtitle2">
                    <strong>New property sale recorded</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    5 hours ago
                  </Typography>
                </Box>
              </Box>
              {/* Notification Card 3 */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  mb: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }}
              >
                <PersonAddIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Box>
                  <Typography variant="subtitle2">
                    <strong>New agent joined the team</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    1 day ago
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PartnerReferral;
