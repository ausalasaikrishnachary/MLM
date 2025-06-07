import React, { useEffect, useState } from 'react';
import Header from '../../../Shared/Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import {
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

function SheduleMeeting() {
    const location = useLocation();
    const RequestId = location.state?.request_id;
    const navigate = useNavigate();


const [form, setForm] = useState({
    name: '',
    email: '',
    profile_type: '',
    date: '',
    startTime: '',
    meeting_link: '',
    notes: '',
    status: 'scheduled',  // default value
    referralId: '',       // add here
    userId: ''            // add here
});



    const [loading, setLoading] = useState(false);

    const [requestId, setRequestId] = useState(null);

    useEffect(() => {
        if (RequestId) {
            axios
                .get(`${baseurl}/meeting-requests/${RequestId}/`)
                .then((res) => {
                    const data = res.data;
                    setForm((prev) => ({
                        ...prev,
                        name: data.name,
                        email: data.email,
                        profile_type: data.profile_type,
                        date: data.requested_date,
                        startTime: data.requested_time,
                        referralId: data.referral_id,
                        userId: data.user_id,
                    }));
                    setRequestId(data.request_id); // Store request ID
                })
                .catch((err) => {
                    console.error('Failed to fetch agent details:', err);
                });
        }
    }, [RequestId]);


    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submit

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!requestId || !form.meeting_link) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Request ID or Meeting Link is missing.',
        });
        setLoading(false);
        return;
    }

    const payload = {
        request: requestId,
        scheduled_date: form.date,
        scheduled_time: form.startTime,
        meeting_link: form.meeting_link,
        scheduled_by: 1, // Update this dynamically later
        status: form.status,
        notes: form.notes,
        referral_id: form.referralId,
        user_id: form.userId,
        name: form.name,
        email: form.email,
        profile_type: form.profile_type,
    };

    console.log("Payload being sent:", payload);

    try {
        await axios.post(`${baseurl}/scheduled-meetings/`, payload);
        await Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Meeting scheduled successfully.',
            timer: 2000,
            showConfirmButton: false,
        });

        setForm({
            name: '',
            email: '',
            profile_type: '',
            date: '',
            startTime: '',
            meeting_link: '',
            notes: ''
        });

        // Navigate after success
        navigate('/a-meetings');

    } catch (error) {
        console.error('Error scheduling meeting:', error);
        if (error.response) {
            console.error('Server Response:', error.response.data);
        }
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to schedule meeting.',
        });
    } finally {
        setLoading(false);
    }
};


    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ p: 4 }}>
                <Typography variant="h6" mb={2}>
                    Meeting Request for <strong>{form.profile_type}</strong>
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
                                name="profile_type"
                                label="Profile Type"
                                value={form.profile_type}
                                onChange={handleChange}
                                required
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
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="meeting_link"
                                label="Meeting Link"
                                value={form.meeting_link}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={4}>
                            <FormControl fullWidth required>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="status"
                                    value={form.status}
                                    label="Status"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="scheduled">Scheduled</MenuItem>
                                    <MenuItem value="canceled">Canceled</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="notes"
                                label="Notes"
                                value={form.notes}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
}

export default SheduleMeeting;
