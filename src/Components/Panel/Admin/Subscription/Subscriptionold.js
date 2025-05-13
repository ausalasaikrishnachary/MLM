import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Shared/Navbar/Navbar';

function Subscription() {
  const [userType, setUserType] = useState('Client');
  const [variantData, setVariantData] = useState([]);
  const [planDataMap, setPlanDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchVariantsAndPlans = async (type) => {
    setLoading(true);
    try {
      const variantRes = await fetch(`https://rahul30.pythonanywhere.com/subscription/plan-variants/${type}/`);
      const variants = await variantRes.json();
      setVariantData(variants);

      const planIds = [...new Set(variants.map(v => v.plan_id))];

      const plansMap = {};
      await Promise.all(
        planIds.map(async (id) => {
          try {
            const res = await fetch(`https://rahul30.pythonanywhere.com/subscription/plans/${id}/`);
            const plan = await res.json();
            plansMap[id] = plan;
          } catch (err) {
            console.error(`Error fetching plan with ID ${id}`, err);
          }
        })
      );
      setPlanDataMap(plansMap);
    } catch (error) {
      console.error('Error fetching variant data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariantsAndPlans(userType);
  }, [userType]);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            Subscription Plan Variants
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/a-addsubscriptions')}>
            + Add Subscription
          </Button>
        </Box>

        <Box mb={3}>
          <FormControl fullWidth sx={{ maxWidth: 300 }}>
            <InputLabel>User Type</InputLabel>
            <Select
              value={userType}
              label="User Type"
              onChange={(e) => setUserType(e.target.value)}
            >
              <MenuItem value="Client">Client</MenuItem>
              <MenuItem value="Agent">Agent</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="plan variants table">
              <TableHead>
                <TableRow>
                  {/* <TableCell><strong>Variant ID</strong></TableCell> */}
                  <TableCell><strong>Plan Name</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Duration (Days)</strong></TableCell>
                  <TableCell><strong>Price</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {variantData.map((variant, index) => {
                  const plan = planDataMap[variant.plan_id] || {};
                  return (
                    <TableRow key={index}>
                      {/* <TableCell>{variant.variant_id}</TableCell> */}
                      <TableCell>{plan.plan_name || '—'}</TableCell>
                      <TableCell>{plan.description || '—'}</TableCell>
                      <TableCell>{variant.duration_in_days}</TableCell>
                      <TableCell>₹{variant.price}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
}

export default Subscription;
