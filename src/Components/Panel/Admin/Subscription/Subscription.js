import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Shared/Navbar/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseurl } from '../../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

function Subscription() {
  const [userType, setUserType] = useState('Client');
  const [variantData, setVariantData] = useState([]);
  const [planDataMap, setPlanDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cellStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #000',
    backgroundColor: '#f0f0f0',
  };

  const cellBodyStyle = {
    textAlign: 'center',
    border: '1px solid #000',
  };

  const noDataStyle = {
    textAlign: 'center',
    border: '1px solid #000',
    padding: 2,
  };

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
  const result = await Swal.fire({
    title: `Delete Variant ID ${variantId}?`,
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    const response = await fetch(`${baseurl}/subscription/plan-variants/${variantId}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Variant ID ${variantId} deleted successfully.`,
        timer: 2000,
        showConfirmButton: false,
      });
      fetchVariantsAndPlans(userType);
    } else {
      const errorData = await response.json();
      await Swal.fire({
        icon: "error",
        title: "Failed to delete",
        text: errorData.detail || 'Unknown error',
      });
    }
  } catch (error) {
    console.error('Error deleting variant:', error);
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: 'An error occurred while trying to delete the variant.',
    });
  }
};


  return (
    <>
      <Header />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "12%" }}>
          <h2 style={{ fontWeight: 'bold' }}>Subscription Plan Variants</h2>
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <FormControl sx={{ width: 200 }}>
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
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/a-addsubscriptions')}
          >
            + Add Subscription
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Table sx={{ border: '1px solid black', width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={cellStyle}>Plan Name</TableCell>
                <TableCell sx={cellStyle}>Description</TableCell>
                <TableCell sx={cellStyle}>Duration (Days)</TableCell>
                <TableCell sx={cellStyle}>Price</TableCell>
                <TableCell sx={cellStyle}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {variantData.length > 0 ? (
                variantData.map((variant, index) => {
                  const plan = planDataMap[variant.plan_id] || {};
                  return (
                    <TableRow key={index}>
                      <TableCell sx={cellBodyStyle}>{plan.plan_name || '—'}</TableCell>
                      <TableCell sx={cellBodyStyle}>{plan.description || '—'}</TableCell>
                      <TableCell sx={cellBodyStyle}>{variant.duration_in_days}</TableCell>
                      <TableCell sx={cellBodyStyle}>₹{variant.price}</TableCell>
                      <TableCell sx={cellBodyStyle}>
                        <Box display="flex" justifyContent="center" gap={1}>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => navigate(`/a-edit-subscription/${variant.variant_id}`, { state: { variant } })}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(variant.variant_id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={noDataStyle}>
                    No subscription variants found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Container>
    </>
  );
}

export default Subscription;