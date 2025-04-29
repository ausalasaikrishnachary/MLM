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
import { useNavigate } from 'react-router-dom';


function AddSubscription() {
  const navigate = useNavigate();
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
    user_type: ""
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

        setPlanOptions(plans);
        setAllPlans(plans); // ← add this line
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

      // Navigate to /a-subscriptions
      navigate('/a-subscriptions');
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
        user_type: newPlan.user_type,
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
                <InputLabel id="plan-name-label">Plan</InputLabel>
                <Select
                  labelId="plan-name-label"
                  id="plan-name"
                  name="plan_name"
                  value={formData.plan_name}
                  onChange={handleChange}
                  label="Plan"
                >
                  {planOptions.map((plan) => (
                    <MenuItem key={plan.id} value={plan.plan_name}>
                      {`${plan.plan_name} (${plan.user_type})`}
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
          <FormControl fullWidth margin="normal" required>
            <InputLabel>User Type</InputLabel>
            <Select
              name="Applicable For"
              value={newPlan.user_type}
              onChange={handleNewPlanChange}
              label="User Type"
            >
              <MenuItem value="Agent">Agent</MenuItem>
              <MenuItem value="Client">Client</MenuItem>
            </Select>
          </FormControl>
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
