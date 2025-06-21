import React, { useEffect, useState, useRef  } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from "../../../Shared/Partner/PartnerNavbar";
import { baseurl } from '../../../BaseURL/BaseURL';
import Swal from 'sweetalert2';
import { useSearchParams } from 'react-router-dom';

function PartnerPlans() {
  const [variantData, setVariantData] = useState([]);
  const [planDataMap, setPlanDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [subscribedVariants, setSubscribedVariants] = useState([]);
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
        const res = await fetch(`${baseurl}/user-subscriptions/user-id/${userId}/`);
        if (res.ok) {
          const data = await res.json();

          // data[0] contains latest_status, data[1] contains subscription info
          if (data[0]?.latest_status === "paid") {
            setSubscribedVariants([data[1].subscription_variant]);
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
        const variantRes = await fetch(`${baseurl}/subscription/plan-variants/agent/`);
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

    fetchVariantsAndPlans();
  }, []);

const handleBuy = async (variant) => {
  const confirmResult = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to subscribe to this plan?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, subscribe!",
    cancelButtonText: "Cancel"
  });

  if (!confirmResult.isConfirmed) return;

  try {
    const initiateRes = await fetch(`${baseurl}/subscription/initiate-payment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: Number(userId),
        subscription_variant: variant.variant_id,
        redirect_url: "http://localhost:3000/p-plans" // redirect back here after payment
      })
    });

    if (!initiateRes.ok) throw new Error('Failed to initiate payment');

    const initiateData = await initiateRes.json();
    const { payment_url, merchant_order_id } = initiateData;

    // 👉 Save merchant_order_id in localStorage or append in redirect_url
    localStorage.setItem("merchant_order_id", merchant_order_id);
    localStorage.setItem("subscription_variant", variant.variant_id);

    // 👉 Now redirect to payment page
    window.location.href = payment_url;

  } catch (error) {
    console.error('Subscription process failed:', error);
    Swal.fire("Error", "Something went wrong while processing your subscription.", "error");
  }
};

  const hasPostedStatus = useRef(false); // flag to prevent duplicate calls

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const merchant_order_id = localStorage.getItem("merchant_order_id");
    const subscription_variant = localStorage.getItem("subscription_variant");

    const updatePaymentStatus = async () => {
      if (
        hasPostedStatus.current || // already posted
        !userId || !merchant_order_id || !subscription_variant
      ) return;

      try {
        hasPostedStatus.current = true; // set flag before making the request

        await fetch(`${baseurl}/subscription/payment-status/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: Number(userId),
            subscription_variant: Number(subscription_variant),
            merchant_order_id
          })
        });

        // Clean up storage to avoid future duplicates
        localStorage.removeItem("merchant_order_id");
        localStorage.removeItem("subscription_variant");

      } catch (err) {
        console.error("Error sending payment status:", err);
        hasPostedStatus.current = false; // allow retry if it failed
      }
    };

    updatePaymentStatus();
  }, []);



  return (
    <>
      <Header />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "12%" }}>
          <h2 style={{ fontWeight: 'bold' }}>Subscription Plan Variants</h2>
        </div>

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
  );
}

export default PartnerPlans;