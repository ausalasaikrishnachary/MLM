import React, { useEffect, useState, useRef } from 'react';
import {
  Grid, Card, CardContent, Typography, Radio, RadioGroup,
  FormControlLabel, Button, Box, Chip, CircularProgress
} from '@mui/material';
import Swal from 'sweetalert2';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import { baseurl } from '../../../BaseURL/BaseURL';

const Subcrptionplan = () => {
  const [variantData, setVariantData] = useState([]);
  const [planDataMap, setPlanDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [subscribedVariants, setSubscribedVariants] = useState([]);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState({ name: '', duration: '', price: 0 });
  const userId = localStorage.getItem("user_id");

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
    const fetchPlans = async () => {
      try {
        const variantRes = await fetch(`${baseurl}/subscription/plan-variants/agent/`);
        const variants = await variantRes.json();
        setVariantData(variants);

        const planIds = [...new Set(variants.map(v => v.plan_id))];
        const planMap = {};

        await Promise.all(planIds.map(async (id) => {
          const res = await fetch(`${baseurl}/subscription/plans/${id}/`);
          const plan = await res.json();
          planMap[id] = plan;
        }));

        setPlanDataMap(planMap);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
    fetchUserSubscription();
  }, []);

  const handleSelection = (planName, durationText, price, variant_id) => {
    setSelectedVariantId(variant_id);
    setSelectedPlan({ name: planName, duration: durationText, price });
  };

  const groupedPlans = variantData.reduce((acc, variant) => {
    const plan = planDataMap[variant.plan_id];
    if (!plan) return acc;

    if (!acc[variant.plan_id]) {
      acc[variant.plan_id] = {
        name: plan.plan_name,
        description: plan.description,
        type: plan.plan_type || 'Self service',
        highlight: plan.plan_name === 'Advanced Plus' ? 'Most Bought' : null,
        color: ['#E3F2FD', '#F3E5F5', '#FFF3E0'][Object.keys(acc).length % 3], // cycle colors
        options: []
      };
    }

    acc[variant.plan_id].options.push({
      duration: `${variant.duration_in_days} Days`,
      price: variant.price,
      perMonth: `₹${Math.round(variant.price / (variant.duration_in_days / 30))}/month`,
      variant_id: variant.variant_id
    });

    return acc;
  }, {});


  const plansArray = Object.values(groupedPlans);

  const handleBuy = async () => {
    if (!selectedVariantId) {
      Swal.fire("Select a plan first", "", "warning");
      return;
    }

    try {
      const res = await fetch(`${baseurl}/subscription/initiate-payment/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: Number(userId),
          variant_id: selectedVariantId,
          redirect_url: "https://shrirajteam.com/p-plans",
        }),
      });

      const data = await res.json();
      localStorage.setItem("merchant_order_id", data.merchant_order_id);
      localStorage.setItem("variant_id", selectedVariantId);
      window.location.href = data.payment_url;
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const hasPostedStatus = useRef(false); // flag to prevent duplicate calls
  
    useEffect(() => {
      const userId = localStorage.getItem("user_id");
      const merchant_order_id = localStorage.getItem("merchant_order_id");
      const variant_id = localStorage.getItem("variant_id");
  
      const updatePaymentStatus = async () => {
        if (
          hasPostedStatus.current || // already posted
          !userId || !merchant_order_id || !variant_id
        ) return;
  
        try {
          hasPostedStatus.current = true; // set flag before making the request
  
          await fetch(`${baseurl}/subscription/confirm-payment/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: Number(userId),
              variant_id: Number(variant_id),
              merchant_order_id
            })
          });
  
          // Clean up storage to avoid future duplicates
          localStorage.removeItem("merchant_order_id");
          localStorage.removeItem("variant_id");
  
           // ✅ REFRESH subscription status
        fetchUserSubscription();
  
        } catch (err) {
          console.error("Error sending payment status:", err);
          hasPostedStatus.current = false; // allow retry if it failed
        }
      };
  
      updatePaymentStatus();
    }, []);
  
  useEffect(() => {
    if (userId) {
      fetchUserSubscription();
    }
  }, [userId]);

  return (
    <>
      <PartnerHeader />
      <Box sx={{ p: 4, pb: 16 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 4,
            mt: 2,
            color: '#001e3c',
          }}
        >
          Subscription Plans
        </Typography>

        {loading ? (
          <Box textAlign="center" py={10}><CircularProgress /></Box>
        ) : (

          <Grid container spacing={4}>
            {plansArray.map((plan, index) => {
              // Define gradient background options
              const gradients = [
                'linear-gradient(135deg, #E3F2FD, #BBDEFB)',    // Light blue
                'linear-gradient(135deg, #F3E5F5, #CE93D8)',    // Purple
                'linear-gradient(135deg, #FFF3E0, #FFCC80)',    // Orange
                'linear-gradient(135deg, #E8F5E9, #A5D6A7)',    // Green
                'linear-gradient(135deg, #FBE9E7, #FFAB91)',    // Peach
                'linear-gradient(135deg, #E1F5FE, #81D4FA)'     // Sky blue
              ];
              const gradientBg = gradients[index % gradients.length];

              return (
                <Grid item xs={12} md={6} lg={4} key={plan.name}>
                  <Card
                    sx={{
                      background: gradientBg,
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                      },
                      borderRadius: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                          pb: 1.5,
                          mb: 2,
                          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '1.9rem',        // Increased font size for header feel
                            fontWeight: 800,           // Stronger weight for prominence
                            color: '#1a1a1a',
                            background: 'transparent',
                          }}
                        >
                          {plan.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {plan.type}
                        </Typography>
                      </Box>




                      {plan.highlight && (
                        <Chip label={plan.highlight} size="small" color="warning" sx={{ mt: 1, mb: 1 }} />
                      )}

                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2, minHeight: 50 }}>
                        {plan.description}
                      </Typography>

                      <RadioGroup value={String(selectedVariantId)}>
                        {plan.options.map((opt) => {
                          const isBought = subscribedVariants.includes(opt.variant_id);
                          return (
                            <FormControlLabel
                              key={opt.variant_id}
                              value={String(opt.variant_id)}
                              control={<Radio />}
                              onClick={() =>
                                !subscribedVariants.length &&
                                handleSelection(plan.name, opt.duration, opt.price, opt.variant_id)
                              }
                              label={
                                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                  <Box>
                                    <Typography variant="body2" fontWeight={500}>
                                      {opt.duration}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {opt.perMonth}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant="body2" fontWeight={600}>
                                      ₹{opt.price}
                                    </Typography>
                                    {isBought && <Chip label="Bought" size="small" color="success" sx={{ ml: 1 }} />}
                                  </Box>
                                </Box>
                              }
                              disabled={!!subscribedVariants.length}
                              sx={{
                                mx: 0,
                                my: 1,
                                pl: 1,
                                pr: 2,
                                borderRadius: '8px',
                                '&.Mui-disabled': {
                                  opacity: 0.7,
                                },
                              }}
                            />
                          );
                        })}
                      </RadioGroup>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>


        )}

        {/* Fixed Footer */}
        {selectedPlan.name && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              backgroundColor: 'white',
              boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.1)',
              px: 4,
              py: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {selectedPlan.name} • {selectedPlan.duration}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{selectedPlan.price} incl tax
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="subtitle1">Total</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                ₹{selectedPlan.price}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#001e3c',
                  '&:hover': { backgroundColor: '#003060' },
                  borderRadius: '8px',
                  px: 3,
                }}
                onClick={handleBuy}
              >
                Buy Now &nbsp; →
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Subcrptionplan;

