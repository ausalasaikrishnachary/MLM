import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import { Box, Card, CardContent, Typography, Button, Grid, Avatar, Modal } from '@mui/material';
import TableLayout from '../../../Shared/TableLayout';
import DisplayRequest from './DisplayRequests';
import axios from 'axios';
import { baseurl } from '../../../BaseURL/BaseURL';
import { Pagination } from '@mui/material';


const profiles = [
    {
        id: 2,
        label: 'Sales & Marketing',
        image: '/images/psychologist.png',
        buttonText: 'Request Meeting',
    },
];

function I_Meetings() {
    const navigate = useNavigate();
    const [subscriptionPaid, setSubscriptionPaid] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const userId = localStorage.getItem("user_id");


    useEffect(() => {
        if (userId) {
            axios.get(`${baseurl}/user-subscriptions/user-id/${userId}/`)
                .then(response => {
                    const latest = response.data.find(item => item.latest_status !== undefined);
                    setSubscriptionPaid(latest?.latest_status === "paid");
                })
                .catch(error => {
                    console.error("Subscription fetch error:", error);
                });
        }
    }, [userId]);

    const handleRequestMeeting = (profileType) => {
        if (subscriptionPaid) {
            navigate("/i-meetingrequest", {
                state: { profileType },
            });
        } else {
            setOpenModal(true);
        }
    };

    const handleCloseModal = () => setOpenModal(false);
    const handleSubscribe = () => navigate('/i-plans');

    return (
        <>
            <InvestorHeader />
            <Box sx={{ p: 3 }}>
                <Grid container spacing={3} justifyContent="center">
                    {profiles.map((profile) => (
                        <Grid item xs={12} sm={6} md={4} key={profile.id}>
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    textAlign: 'center',
                                    background: 'linear-gradient(180deg, #fdf9ff 0%, #e7f2ff 100%)',
                                    boxShadow: 3,
                                    position: 'relative',
                                    overflow: 'visible',
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            left: 16,
                                            fontWeight: 500,
                                            color: '#4A4A4A',
                                        }}
                                    >
                                        {profile.label}
                                    </Typography>

                                    <Avatar
                                        src={profile.image}
                                        alt={profile.label}
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            margin: '60px auto 20px',
                                        }}
                                    />

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{
                                            borderRadius: 10,
                                            px: 4,
                                            py: 1.5,
                                            fontWeight: 'bold',
                                            backgroundColor: '#fff',
                                            color: '#673ab7',
                                            border: '2px solid #673ab7',
                                            '&:hover': {
                                                backgroundColor: '#f3e5f5',
                                            },
                                        }}
                                        onClick={() => handleRequestMeeting(profile.label)}
                                    >
                                        {profile.buttonText}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <DisplayRequest />

                {/* Subscription Required Modal */}
                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px'
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Subscription Required
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            You need an active subscription to <Box component="span" sx={{ fontWeight: 'bold' }}>request meetings</Box>.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button variant="outlined" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubscribe}
                                sx={{
                                    backgroundColor: '#673ab7',
                                    '&:hover': { backgroundColor: '#5e35b1' }
                                }}
                            >
                                Subscribe Now
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </>
    );
}

export default I_Meetings;