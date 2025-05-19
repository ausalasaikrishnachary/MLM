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
import { Grid, Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseurl } from '../../../BaseURL/BaseURL';


function Subscription() {
  const [userType, setUserType] = useState('Client');
  const [variantData, setVariantData] = useState([]);
  const [planDataMap, setPlanDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchVariantsAndPlans = async (type) => {
    setLoading(true);
    try {
      const variantRes = await fetch(`${baseurl}/subscription/plan-variants/${type}/`);
      const variants = await variantRes.json();
      setVariantData(variants);

      const planIds = [...new Set(variants.map(v => v.plan_id))];

      const plansMap = {};
      await Promise.all(
        planIds.map(async (id) => {
          try {
            const res = await fetch(`${baseurl}/subscription/plans/${id}/`);
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

  const handleDelete = async (variantId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete variant ID ${variantId}?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${baseurl}/subscription/plan-variants/${variantId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(`Variant ID ${variantId} deleted successfully.`);
        // Refresh the data
        fetchVariantsAndPlans(userType);
      } else {
        const errorData = await response.json();
        alert(`Failed to delete variant ID ${variantId}. Reason: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting variant:', error);
      alert('An error occurred while trying to delete the variant.');
    }
  };


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
                  <TableCell align="center"><strong>Actions</strong></TableCell>

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
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                          <Tooltip title="Edit">
                            <IconButton
                              sx={{ color: '#1976d2' }}
                              onClick={() => navigate(`/a-edit-subscription/${variant.variant_id}`, { state: { variant } })}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton
                              sx={{ color: '#d32f2f' }}
                              onClick={() => handleDelete(variant.variant_id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>

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
