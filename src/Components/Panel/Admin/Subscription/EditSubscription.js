import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import Header from '../../../Shared/Navbar/Navbar';
import { baseurl } from '../../../BaseURL/BaseURL';

const EditSubscription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [plansLoading, setPlansLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  
  // Get the variant data from navigation state
  const { variant } = location.state || {};
  
  const [formData, setFormData] = useState({
    plan_id: '',
    duration_in_days: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    // Fetch all plans from API
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${baseurl}/subscription/plans/`);
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        const data = await response.json();
        setPlans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setPlansLoading(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (variant && plans.length > 0) {
      // Find the current plan details
      const foundPlan = plans.find(plan => plan.plan_id === variant.plan_id);
      if (foundPlan) {
        setCurrentPlan(foundPlan);
        // Initialize form with the variant data and plan description
        setFormData({
          plan_id: variant.plan_id,
          duration_in_days: variant.duration_in_days,
          price: variant.price.toString(),
          description: foundPlan.description || ''
        });
      }
    }
  }, [variant, plans]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If plan_id changes, update the description from the selected plan
    if (name === 'plan_id') {
      const selectedPlan = plans.find(plan => plan.plan_id === Number(value));
      setCurrentPlan(selectedPlan);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        description: selectedPlan?.description || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  
  try {
    // First update the plan variant
    const variantPayload = {
      plan_id: Number(formData.plan_id),
      duration_in_days: Number(formData.duration_in_days),
      price: parseFloat(formData.price)
    };

    const variantResponse = await fetch(`${baseurl}/subscription/plan-variants/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(variantPayload)
    });

    if (!variantResponse.ok) {
      const errorData = await variantResponse.json();
      throw new Error(errorData.message || 'Failed to update subscription variant');
    }

    // Then update the plan description if it has changed
    if (currentPlan && formData.description !== currentPlan.description) {
      const planPayload = {
        plan_name: currentPlan.plan_name,
        description: formData.description,
        user_type: currentPlan.user_type
      };

      const planResponse = await fetch(`${baseurl}/subscription/plans/${formData.plan_id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(planPayload)
      });

      if (!planResponse.ok) {
        const errorData = await planResponse.json();
        throw new Error(errorData.message || 'Failed to update plan description');
      }
    }

    setSuccess(true);
    setTimeout(() => {
      navigate('/a-subscriptions'); // Redirect after success
    }, 2000);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  if (!variant) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">No variant data found. Please go back and try again.</Alert>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (plansLoading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
    <Header />
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
     

        <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: {
                xs: "1.1rem",
                sm: "2.1rem",
                md: "2.0rem",
              },
              fontWeight: "bold",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: "15px",
            }}
          >
  Edit Subscription Plan Variant
            </Typography>
        <Typography variant="subtitle1"
        sx={{display:'flex',justifyContent: { xs: 'center', sm: 'flex-start', md: 'flex-start' },}}
         color="text.secondary" gutterBottom>
          Variant ID: {id}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Subscription updated successfully! Redirecting...
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="plan-id-label">Plan</InputLabel>
            <Select
              labelId="plan-id-label"
              id="plan_id"
              name="plan_id"
              value={formData.plan_id}
              label="Plan"
              onChange={handleChange}
              required
            >
              {plans.map((plan) => (
                <MenuItem key={plan.plan_id} value={plan.plan_id}>
                  {plan.plan_name} ({plan.user_type})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            margin="normal"
            id="duration_in_days"
            name="duration_in_days"
            label="Duration (in days)"
            type="number"
            value={formData.duration_in_days}
            onChange={handleChange}
            required
            inputProps={{ min: 1 }}
          />
          
          <TextField
            fullWidth
            margin="normal"
            id="price"
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            inputProps={{ step: "0.01", min: 0 }}
            required
          />
          
          <TextField
            fullWidth
            margin="normal"
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
           
          />
          
          <Box sx={{ display: 'flex',
 justifyContent: { xs: 'center', sm: 'flex-end', md: 'flex-end' },
              gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Update Subscription'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
      </>
  );
};

export default EditSubscription;