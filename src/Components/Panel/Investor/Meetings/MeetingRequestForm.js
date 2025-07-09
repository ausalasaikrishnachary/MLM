import React, { useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
} from "@mui/material";
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import { useLocation, useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

const I_MeetingRequestForm = () => {
const [form, setForm] = useState({
    date: "",
    startTime: "",
    name: localStorage.getItem("user_name") || "",
    email: localStorage.getItem("email") || "",
    referralId: localStorage.getItem("referral_id") || "",
});

    const location = useLocation();
    const navigate = useNavigate();
    const { profileType } = location.state || {};
    const agentId = localStorage.getItem("user_id");  // agent = user_id


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        user_id: parseInt(agentId),
        referral_id: form.referralId,
        name: form.name,
        email: form.email,
        profile_type: profileType,
        requested_date: form.date,
        requested_time: form.startTime,
    };

    try {
        const response = await fetch(`${baseurl}/meeting-requests/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Meeting request submitted successfully!',
                timer: 2000,
                showConfirmButton: false
            });
            navigate("/i-meetings");
        } else {
            const errorData = await response.json();
            console.error("Submission failed:", errorData);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Please check your input and try again.'
            });
        }
    } catch (error) {
        console.error("Error submitting meeting request:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred. Please try again later.'
        });
    }
};



    return (
        <>
            <InvestorHeader />
            <Container maxWidth="lg" sx={{ p: 4 }}>
                <Typography variant="h6" mb={2}>
                    Meeting Request for <strong>{profileType}</strong>
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="referralId"
                                label="Referral ID"
                                value={form.referralId}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="date"
                                name="date"
                                label="Date"
                                InputLabelProps={{ shrink: true }}
                                value={form.date}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <TextField
                                fullWidth
                                type="time"
                                name="startTime"
                                label="Start Time"
                                InputLabelProps={{ shrink: true }}
                                value={form.startTime}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained">
                                Submit Meeting Request
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
};

export default I_MeetingRequestForm;
