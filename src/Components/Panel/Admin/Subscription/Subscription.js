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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Shared/Navbar/Navbar';

function Subscription() {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('https://rahul30.pythonanywhere.com/subscription/plans/');
        const data = await response.json();
        setSubscriptionData(data);
      } catch (error) {
        console.error('Error fetching subscription data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <>
    <Header/>
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Subscription Plans
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/a-addsubscriptions')}>
          + Add Subscription
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="subscription table">
            <TableHead>
              <TableRow>
              <TableCell><strong>Plan Id</strong></TableCell>
                <TableCell><strong>Plan Name</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Duration (Days)</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriptionData.map((plan, index) => (
                <TableRow key={index}>
                  <TableCell>{plan.plan_id}</TableCell>
                  <TableCell>{plan.plan_name}</TableCell>
                  <TableCell>₹{plan.price}</TableCell>
                  <TableCell>{plan.duration_in_days}</TableCell>
                  <TableCell>{plan.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
    </>
  );
}

export default Subscription;
