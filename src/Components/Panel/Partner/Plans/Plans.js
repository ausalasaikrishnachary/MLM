import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from "../../../Shared/Partner/PartnerNavbar";
import { baseurl } from '../../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

function PartnerPlans() {
  const [variantData, setVariantData] = useState([]);
  const [planDataMap, setPlanDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [subscribedVariants, setSubscribedVariants] = useState([]);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  const userId = localStorage.getItem("user_id");
  const hasPostedStatus = useRef(false);

  const fetchUserSubscription = async () => {
    try {
      const res = await fetch(`${baseurl}/user-subscriptions/user-id/${userId}/`);
      if (res.ok) {
        const data = await res.json();
        if (data[0]?.latest_status === "paid" && data[1]?.subscription_variant) {
          setSubscribedVariants([Number(data[1].subscription_variant)]);
        }
      }
    } catch (err) {
      console.error("Error fetching user subscription:", err);
    }
  };

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

  useEffect(() => {
    const merchant_order_id = localStorage.getItem("merchant_order_id");
    const variant_id = localStorage.getItem("variant_id");

    const updatePaymentStatus = async () => {
      if (hasPostedStatus.current || !userId || !merchant_order_id || !variant_id) return;

      try {
        hasPostedStatus.current = true;

        await fetch(`${baseurl}/subscription/confirm-payment/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: Number(userId),
            variant_id: Number(variant_id),
            merchant_order_id
          })
        });

        localStorage.removeItem("merchant_order_id");
        localStorage.removeItem("variant_id");
        fetchUserSubscription();
      } catch (err) {
        console.error("Error sending payment status:", err);
        hasPostedStatus.current = false;
      }
    };

    updatePaymentStatus();
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserSubscription();
    }
  }, [userId]);

  const handleBuy = async () => {
    if (!selectedVariantId) {
      Swal.fire("Please select a plan", "Choose a subscription variant to continue.", "warning");
      return;
    }

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: Number(userId),
          variant_id: selectedVariantId,
          redirect_url: "https://shrirajteam.com/p-plans"
        })
      });

      if (!initiateRes.ok) throw new Error('Failed to initiate payment');

      const initiateData = await initiateRes.json();
      const { payment_url, merchant_order_id } = initiateData;

      localStorage.setItem("merchant_order_id", merchant_order_id);
      localStorage.setItem("variant_id", selectedVariantId);

      window.location.href = payment_url;
    } catch (error) {
      console.error('Subscription process failed:', error);
      Swal.fire("Error", "Something went wrong while processing your subscription.", "error");
    }
  };

  const groupedVariants = variantData.reduce((acc, variant) => {
    const planId = variant.plan_id;
    if (!acc[planId]) acc[planId] = [];
    acc[planId].push(variant);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <Grid container spacing={3} mt={2}>
  {Object.entries(groupedVariants).map(([planId, variants], index) => {
    const plan = planDataMap[planId];
    const cardHasRadio = index === 0 || index === 1;

    return (
      <Grid item xs={12} md={6} lg={4} key={planId}>
        <Card elevation={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>{plan?.plan_name || "Unnamed Plan"}</Typography>
            <Typography variant="body2" gutterBottom>{plan?.description || "No description"}</Typography>
            <Divider sx={{ my: 2 }} />

            {cardHasRadio ? (
              <RadioGroup
                value={selectedVariantId}
                onChange={(e) => setSelectedVariantId(Number(e.target.value))}
              >
                {variants.map((variant) => (
                  <FormControlLabel
                    key={variant.variant_id}
                    value={variant.variant_id}
                    control={<Radio />}
                    label={`₹${variant.price} for ${variant.duration_in_days} days`}
                    disabled={subscribedVariants.includes(variant.variant_id)}
                  />
                ))}
              </RadioGroup>
            ) : (
              variants.map((variant) => (
                <Box key={variant.variant_id} mb={1}>
                  <Typography variant="body2">
                    <strong>₹{variant.price}</strong> for {variant.duration_in_days} days
                  </Typography>
                  <Typography
                    variant="caption"
                    color={subscribedVariants.includes(variant.variant_id) ? "success.main" : "text.secondary"}
                  >
                    {subscribedVariants.includes(variant.variant_id) ? "Already Subscribed" : ""}
                  </Typography>
                </Box>
              ))
            )}
          </CardContent>

          {cardHasRadio && (
            <Box px={2} pb={2}>
              <Button
                fullWidth
                variant="contained"
                size="small"
                disabled={
                  !selectedVariantId ||
                  !variants.find(v => v.variant_id === selectedVariantId) ||
                  subscribedVariants.includes(selectedVariantId)
                }
                onClick={() => handleBuy(selectedVariantId)}
                sx={{ textTransform: 'none', borderRadius: 2 }}
              >
                Subscribe
              </Button>
            </Box>
          )}
        </Card>
      </Grid>
    );
  })}
</Grid>

    </>
  );
}

export default PartnerPlans;
