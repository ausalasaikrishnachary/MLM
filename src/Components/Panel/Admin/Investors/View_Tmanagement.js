import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const View_Tmanagement = () => {
  const location = useLocation();
  const user = location.state?.user;

  if (!user)
    return <Typography sx={{ p: 3 }}>No user data available</Typography>;

  const Section = ({ title, children }) => (
    <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 800 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>{children}</Grid>
      </Box>
    </Box>
  );

  const Field = (label, value) => (
    <Grid item xs={12} sm={6}>
      <Typography align="left">
        <strong>{label}:</strong> {value || "N/A"}
      </Typography>
    </Grid>
  );

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card
        sx={{
          maxWidth: 900,
          mx: "auto",
          borderRadius: 3,
          boxShadow: 3,
          p: 2,
        }}
      >
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar
              src={user.image}
              alt="User"
              sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
            />
            <Typography variant="h5" fontWeight="bold">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography color="text.secondary">{user.email}</Typography>
          </Box>

          <Section title="Personal Information">
            {Field("User ID", user.user_id)}
            {Field("Referral ID", user.referral_id)}
            {Field("First Name", user.first_name)}
            {Field("Last Name", user.last_name)}
            {Field("Gender", user.gender)}
            {Field("Date of Birth", user.date_of_birth)}
            {Field("Level No", user.level_no)}
          </Section>

          <Section title="Contact Information">
            {Field("Email", user.email)}
            <Grid item xs={12} sm={6} md={4}>
              {/* <Typography
                sx={{ wordBreak: "break-word" }}
                align="left"
              >
                <strong>Password (Hashed):</strong> {user.password}
              </Typography> */}
            </Grid>
            {Field("Phone Number", user.phone_number)}
            {Field("Address", user.address)}
            {Field("City", user.city)}
            {Field("State", user.state)}
            {Field("Country", user.country)}
            {Field("PIN Code", user.pin_code)}
          </Section>

          <Section title="Bank Details">
            {Field("Bank Name", user.bank_name)}
            {Field("Account Holder Name", user.account_holder_name)}
            {Field("Branch Name", user.branch_name)}
            {Field("Account Type", user.account_type)}
            {Field("Account Number", user.account_number)}
            {Field("IFSC Code", user.ifsc_code)}
          </Section>

          <Section title="KYC & Identification">
            {Field("PAN Number", user.pan || user.pan_number)}
            {Field("Aadhaar Number", user.aadhaar_number)}
            {Field("KYC Status", user.kyc_status)}
            {Field("Nominee Reference To", user.nominee_reference_to)}
          </Section>

          <Section title="Other Information">
            {Field("Referred By", user.referred_by)}
            {Field("Created At", user.created_at)}
            {Field("Updated At", user.updated_at)}
          </Section>
        </CardContent>
      </Card>
    </Box>
  );
};

export default View_Tmanagement;
