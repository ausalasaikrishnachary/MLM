import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import { Box, Card, CardContent, Typography, Button, Grid, Avatar, Modal } from '@mui/material';
import DisplayRequest from './DisplayRequests';
import axios from 'axios';
import { baseurl } from '../../../BaseURL/BaseURL';
import { Pagination } from "@mui/material";


function I_Meetings() {
    const navigate = useNavigate();
    const [subscriptionPaid, setSubscriptionPaid] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [departments, setDepartments] = useState([]); // ⬅ Fetch dynamic departments
    const userId = localStorage.getItem("user_id");
    const [page, setPage] = useState(1);
const cardsPerPage = 10; // 10 departments → next page
const paginatedDepartments = departments.slice(
  (page - 1) * cardsPerPage,
  page * cardsPerPage
);

const totalPages = Math.ceil(departments.length / cardsPerPage);



    // Fetch subscription status
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

    // Fetch Departments
    useEffect(() => {
        axios.get(`${baseurl}/departments/`)
            .then(res => {
                setDepartments(res.data);
            })
            .catch(err => console.log("Departments fetch error:", err));
    }, []);

    // Handle meeting request
    const handleRequestMeeting = (departmentName, departmentId) => {
        if (subscriptionPaid) {
            navigate("/i-meetingrequest", {
                state: { departmentName, departmentId }, // ⬅ send department details
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
                    {paginatedDepartments.map((dept) => (
                        <Grid item xs={6} sm={4} md={2.4} key={dept.id}>
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    textAlign: 'center',
                                    background: 'linear-gradient(180deg, #fdf9ff 0%, #e7f2ff 100%)',
                                    boxShadow: 2,
                                    position: 'relative',
                                    overflow: 'visible',
                                    minHeight: 220,
                                    padding: 1,

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
                                        {dept.name}
                                    </Typography>

                                    <Avatar
                                        src="/images/coach.png"
                                        alt={dept.name}
                                         sx={{ width: 70, height: 70, margin: '30px auto 15px' }}
                                    />

                                    <Button
                                        variant="contained"
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
                                        onClick={() => handleRequestMeeting(dept.name, dept.id)}
                                    >
                                        Request Meeting
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Pagination */}
<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
  <Pagination
    count={totalPages}
    page={page}
    onChange={(e, value) => setPage(value)}
    color="primary"
    sx={{
      '& .MuiPaginationItem-root': {
        borderRadius: '0px',
      },
    }}
  />
</Box>

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
