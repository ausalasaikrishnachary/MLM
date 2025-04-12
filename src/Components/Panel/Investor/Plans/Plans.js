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
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";

function Plans() {
    const [variantData, setVariantData] = useState([]);
    const [planDataMap, setPlanDataMap] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVariantsAndPlans = async () => {
            try {
                const variantRes = await fetch('https://rahul30.pythonanywhere.com/subscription/plan-variants/');
                const variants = await variantRes.json();
                setVariantData(variants);

                const planIds = [...new Set(variants.map(v => v.plan_id))];

                // Fetch plans for each unique plan_id
                const plansMap = {};
                await Promise.all(
                    planIds.map(async (id) => {
                        try {
                            const res = await fetch(`https://rahul30.pythonanywhere.com/subscription/plans/${id}/`);
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
        const confirmSubscribe = window.confirm("Are you sure you want to subscribe to this plan?");
        if (!confirmSubscribe) return;
    
        const userId = localStorage.getItem('user_id'); // Make sure it's already stored in localStorage
        if (!userId) {
            alert("User ID not found in localStorage!");
            return;
        }
    
        try {
            const response = await fetch('https://rahul30.pythonanywhere.com/subscribe/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: parseInt(userId),
                    subscription_variant: variant.variant_id,
                    subscription_status:"paid"
                }),
            });
    
            if (response.ok) {
                alert("Subscription successful!");
                setSubscribedVariants((prev) => [...prev, variant.variant_id]);
            } else {
                alert("Failed to subscribe. Please try again.");
            }
        } catch (error) {
            console.error("Subscription error:", error);
            alert("Something went wrong.");
        }
    };
    



    return (
        <>
            <InvestorHeader />
            <Container maxWidth="lg" sx={{ pt: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5" fontWeight="bold">
                        Subscription Plan Variants
                    </Typography>
                    {/* <Button variant="contained" color="primary" onClick={() => navigate('/a-addsubscriptions')}>
                  + Add Subscription
                </Button> */}
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" mt={5}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer component={Paper}>
                        <Table aria-label="plan variants table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Variant ID</strong></TableCell>
                                    <TableCell><strong>Plan Name</strong></TableCell>
                                    <TableCell><strong>Description</strong></TableCell>
                                    <TableCell><strong>Duration (Days)</strong></TableCell>
                                    <TableCell><strong>Price</strong></TableCell>
                                    <TableCell><strong>Action</strong></TableCell> {/* Added this line */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {variantData.map((variant, index) => {
                                    const plan = planDataMap[variant.plan_id] || {};
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{variant.variant_id}</TableCell>
                                            <TableCell>{plan.plan_name || '—'}</TableCell>
                                            <TableCell>{plan.description || '—'}</TableCell>
                                            <TableCell>{variant.duration_in_days}</TableCell>
                                            <TableCell>₹{variant.price}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={subscribedVariants.includes(variant.variant_id)}
                                                    onClick={() => handleBuy(variant)}
                                                >
                                                    {subscribedVariants.includes(variant.variant_id) ? "Subscribed" : "Subscribe"}
                                                </Button>

                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>

                        </Table>
                    </TableContainer>
                )}
            </Container>
        </>
    )
}

export default Plans
