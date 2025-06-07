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
import Swal from 'sweetalert2';
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import { baseurl } from '../../../BaseURL/BaseURL';

function PartnerPlans() {
  const [variantData, setVariantData] = useState([]);
  const [planDataMap, setPlanDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

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

  useEffect(() => {
    const fetchUserSubscription = async () => {
      try {
        const res = await fetch(`${baseurl}/user-subscriptions/${userId}/`);
        if (res.ok) {
          const subscription = await res.json();
          if (subscription.subscription_status === "paid") {
            setSubscribedVariants([subscription.subscription_variant]); // store the subscribed variant ID
          }
        }
      } catch (err) {
        console.error("Error fetching user subscription:", err);
      }
    };

    if (userId) {
      fetchUserSubscription();
    }
  }, [userId]);


  useEffect(() => {
    const fetchVariantsAndPlans = async () => {
      try {
        const variantRes = await fetch(`${baseurl}/subscription/plan-variants/Client/`);
        const variants = await variantRes.json();
        setVariantData(variants);

        const planIds = [...new Set(variants.map(v => v.plan_id))];

        // Fetch plans for each unique plan_id
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

    fetchVariantsAndPlans();
  }, []);

  const [subscribedVariants, setSubscribedVariants] = useState([]);

const handleBuy = async (variant) => {
  const confirmResult = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to subscribe to this plan?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, Subscribe',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  });

  if (!confirmResult.isConfirmed) return;

  const userId = localStorage.getItem('user_id');
  if (!userId) {
    Swal.fire({
      icon: 'error',
      title: 'Missing User ID',
      text: 'User ID not found in localStorage!',
    });
    return;
  }

  try {
    const response = await fetch(`${baseurl}/subscriptions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: parseInt(userId),
        subscription_variant: variant.variant_id,
        subscription_status: "paid",
      }),
    });

    if (response.ok) {
      setSubscribedVariants((prev) => [...prev, variant.variant_id]);

      await Swal.fire({
        icon: 'success',
        title: 'Subscribed!',
        text: 'Subscription successful!',
        timer: 2000,
        showConfirmButton: false,
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Subscription Failed',
        text: 'Please try again.',
      });
    }
  } catch (error) {
    console.error("Subscription error:", error);
    Swal.fire({
      icon: 'error',
      title: 'Something went wrong',
      text: error.message || 'Unexpected error occurred.',
    });
  }
};


  return (
    <>
      <InvestorHeader />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "12%" }}>
          <h2 style={{ fontWeight: 'bold' }}>Subscription Plan Variants</h2>
        </div>
        {/* <Button variant="contained" color="primary" onClick={() => navigate('/a-addsubscriptions')}>
                  + Add Subscription
                </Button> */}


        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Table sx={{ border: '1px solid black', width: '100%', mt: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={cellStyle}>Plan Name</TableCell>
                <TableCell sx={cellStyle}>Description</TableCell>
                <TableCell sx={cellStyle}>Duration (Days)</TableCell>
                <TableCell sx={cellStyle}>Price</TableCell>
                <TableCell sx={cellStyle}>Action</TableCell>
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
                        <Button
                          variant="contained"
                          size="small"
                          disabled={subscribedVariants.length > 0}
                          onClick={() => handleBuy(variant)}
                          sx={{
                            textTransform: 'none',
                            backgroundColor: subscribedVariants.includes(variant.variant_id) ? '#4caf50' : '#1976d2',
                            '&:disabled': {
                              backgroundColor: '#e0e0e0',
                              color: '#9e9e9e'
                            }
                          }}
                        >
                          {subscribedVariants.includes(variant.variant_id) ? "Subscribed" : "Subscribe"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={noDataStyle}>
                    No subscription plans available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Container>
    </>
  )
}

export default PartnerPlans
