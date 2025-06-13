import React, { useState, useEffect } from 'react';
import axios from 'axios';
 import Swal from 'sweetalert2';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../../Shared/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';

function AddSubscription() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plan_name: '',
    price: '',
    duration_in_days: '',
    description: '',
  });

  const [planOptions, setPlanOptions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    plan_name: '',
    description: '',
    user_type: ""
  });
  const [allPlans, setAllPlans] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'duration_in_days') && isNaN(value)) return;

    if (name === 'plan_name') {
      const selected = allPlans.find(plan => plan.plan_name === value);
      setFormData({
        ...formData,
        plan_name: value,
        description: selected?.description || '',
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${baseurl}/subscription/plans/`);
      const plans = response.data;
      setPlanOptions(plans);
      setAllPlans(plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const selectedPlan = allPlans.find(plan => plan.plan_name === formData.plan_name);

    if (!selectedPlan) {
      await Swal.fire({
        icon: 'warning',
        title: 'Plan Not Found',
        text: 'Selected plan not found.',
      });
      return;
    }

    const payload = {
      plan_id: selectedPlan.plan_id,
      duration_in_days: Number(formData.duration_in_days),
      price: Number(formData.price),
    };

    await axios.post(
      `${baseurl}/subscription/plan-variants/`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    await Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Plan variant added successfully!',
      timer: 2000,
      showConfirmButton: false,
    });

    setFormData({
      plan_name: '',
      price: '',
      duration_in_days: '',
      description: '',
    });
    navigate('/a-subscriptions');
  } catch (error) {
    console.error('Error adding plan variant:', error);
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to add plan variant. Please try again.',
    });
  }
};


  const handleNewPlanChange = (e) => {
    const { name, value } = e.target;
    setNewPlan({ ...newPlan, [name]: value });
  };

const handleAddPlan = async () => {
  try {
    const payload = {
      plan_name: newPlan.plan_name,
      description: newPlan.description,
      user_type: newPlan.user_type,
    };

    await axios.post(
      `${baseurl}/subscription/plans/`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    await Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Plan added successfully!',
      timer: 2000,
      showConfirmButton: false,
    });

    setNewPlan({ plan_name: '', description: '', user_type: '' });
    setOpenModal(false);
    fetchPlans();
  } catch (error) {
    console.error('Error adding plan:', error);
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text:
        error?.response?.data?.message ||
        'Failed to add plan. Please check if all fields are filled correctly.',
    });
  }
};


  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Add Subscription Plan Variant
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            {/* Plan Selection */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FormControl fullWidth required>
                  <InputLabel id="plan-name-label">Plan</InputLabel>
                  <Select
                    labelId="plan-name-label"
                    id="plan-name"
                    name="plan_name"
                    value={formData.plan_name}
                    onChange={handleChange}
                    label="Plan"
                    variant="outlined"
                  >
                    {planOptions.map((plan) => (
                      <MenuItem key={plan.id} value={plan.plan_name}>
                        {`${plan.plan_name} (${plan.user_type})`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton 
                  color="primary" 
                  onClick={() => setOpenModal(true)}
                  sx={{ 
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    }
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>

            {/* Price */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                required
              />
            </Grid>

            {/* Duration */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Duration (in days)"
                name="duration_in_days"
                value={formData.duration_in_days}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                required
              />
            </Grid>

            {/* Description */}
            <Grid item xs={4}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
                rows={2}
                required
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Submit Button */}
          <Grid container justifyContent="center">
  <Grid item xs="auto">
    <Button 
      type="submit" 
      variant="contained" 
      fullWidth={false}
      sx={{ 
        height: '56px',
        fontSize: '1rem',
        mt: 2,
        px: 4 // optional: padding-x to widen the button a bit
      }}
    >
      Add Subscription Plan Variant
    </Button>
  </Grid>
</Grid>

          </Grid>
        </Box>
      </Container>

      {/* Add Plan Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Subscription Plan</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>User Type</InputLabel>
                <Select
                  name="user_type"
                  value={newPlan.user_type}
                  onChange={handleNewPlanChange}
                  label="User Type"
                  variant="outlined"
                >
                  <MenuItem value="agent">Agent</MenuItem>
                  <MenuItem value="client">Client</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Plan Name"
                name="plan_name"
                value={newPlan.plan_name}
                onChange={handleNewPlanChange}
                fullWidth
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={newPlan.description}
                onChange={handleNewPlanChange}
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenModal(false)} 
            variant="outlined"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddPlan} 
            variant="contained"
            sx={{ mr: 2 }}
          >
            Add Plan
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddSubscription;