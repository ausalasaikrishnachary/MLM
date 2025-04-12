import React, { useState, useEffect } from 'react'; // ⬅ make sure useEffect is imported
import axios from 'axios';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../../Shared/Navbar/Navbar';

function AddSubscription() {
  const [formData, setFormData] = useState({
    plan_name: '',
    price: '',
    duration_in_days: '',
    description: '',
  });

  const [planOptions, setPlanOptions] = useState(['Basic', 'Standard', 'Premium']);

  const [openModal, setOpenModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    plan_name: '',
    description: '',
  });
  const [allPlans, setAllPlans] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'plan_id' || name === 'duration_in_days') && isNaN(value)) return;

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


  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('https://rahul30.pythonanywhere.com/subscription/plans/');
        const plans = response.data;

        // Extract unique plan names for the dropdown
        const uniquePlanNames = [...new Set(plans.map(plan => plan.plan_name))];

        setPlanOptions(uniquePlanNames);
        setAllPlans(plans); // Store full plan data
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const selectedPlan = allPlans.find(plan => plan.plan_name === formData.plan_name);
  
      if (!selectedPlan) {
        alert("Selected plan not found.");
        return;
      }
  
      const payload = {
        plan_id: selectedPlan.plan_id, // Fetch plan ID from selected plan
        duration_in_days: Number(formData.duration_in_days),
        price: Number(formData.price),
      };
  
      const response = await axios.post(
        'https://rahul30.pythonanywhere.com/subscription/plan-variants/',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      alert('Plan variant added successfully!');
      console.log(response.data);
  
      // Reset form
      setFormData({
        plan_name: '',
        price: '',
        duration_in_days: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding plan variant:', error);
      alert('Failed to add plan variant. Please try again.');
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
      };

      const response = await axios.post(
        'https://rahul30.pythonanywhere.com/subscription/plans/',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      alert('Plan added successfully!');
      setPlanOptions((prev) => [...prev, newPlan.plan_name]);
      setNewPlan({ plan_name: '', description: '' });
      setOpenModal(false);
    } catch (error) {
      console.error('Error adding plan:', error);
      alert(
        error?.response?.data?.message ||
        'Failed to add plan. Please check if all fields are filled correctly.'
      );
    }
  };


  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Add Subscription Plan Variant
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormControl fullWidth required>
                <InputLabel id="plan-name-label">Plan Name</InputLabel>
                <Select
                  labelId="plan-name-label"
                  id="plan-name"
                  name="plan_name"
                  value={formData.plan_name}
                  onChange={handleChange}
                  label="Plan Name"
                >
                  {planOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton color="primary" onClick={() => setOpenModal(true)}>
                <AddIcon />
              </IconButton>
            </Box>

            <TextField
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Duration (in days)"
              name="duration_in_days"
              value={formData.duration_in_days}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={3}
              required
              InputProps={{
                readOnly: true,
              }}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Add Plan Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>New Subscription Plan</DialogTitle>
        <DialogContent>
          <TextField
            label="Plan Name"
            name="plan_name"
            value={newPlan.plan_name}
            onChange={handleNewPlanChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={newPlan.description}
            onChange={handleNewPlanChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleAddPlan} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddSubscription;
