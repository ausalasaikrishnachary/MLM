import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Box,
  Container,
} from "@mui/material";
import Header from "../../../Shared/Partner/PartnerNavbar";

const timeZones = [
  "UTC",
  "IST",
  "PST",
  "EST",
  "CST",
  "GMT",
  "UTC+5:30",
  "UTC-5:00",
];

const MeetingRequestForm = ({ profileType, onSubmit }) => {
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    name: "",
    email: "",
    referralId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const meetingData = {
      ...form,
      profileType,
      attendees: form.attendees.split(",").map((email) => email.trim()),
      createdAt: new Date().toISOString(),
    };
    onSubmit(meetingData);
    setForm({
      date: "",
      startTime: "",
      endTime: "",
      name: "",
      email: "",
      referralId: "",
    });
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ p: 4 }}>
        <Typography variant="h6" mb={2}>
          Meeting Request for <strong>{profileType}</strong>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} >
            {/* New fields */}
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
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                type="time"
                name="endTime"
                label="End Time"
                InputLabelProps={{ shrink: true }}
                value={form.endTime}
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

export default MeetingRequestForm;
