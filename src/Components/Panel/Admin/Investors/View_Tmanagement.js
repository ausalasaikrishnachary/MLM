import React, { useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../../Shared/Navbar/Navbar";
import jsPDF from "jspdf";

const View_Tmanagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const contentRef = useRef();

  if (!user) return <Typography sx={{ p: 3 }}>No user data available</Typography>;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.html(contentRef.current, {
      callback: function (pdf) {
        pdf.save(`${user.first_name}_details.pdf`);
      },
      x: 10,
      y: 10,
      width: 180,
      windowWidth: 800,
    });
  };

  const Section = ({ title, children }) => (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{ textDecoration: "none", color: "black" }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {children}
      </Grid>
    </Box>
  );

  const Field = (label, value) => (
    <Grid item xs={12} sm={6} md={3}>
      <Typography
        align="left"
        sx={{
          wordBreak: "break-word",
          fontSize: "0.95rem",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <strong>{label}:</strong> {value || "N/A"}
      </Typography>
    </Grid>
  );

  return (
    <>
      <Header />
      <Box
        sx={{
          bgcolor: "white",
          minHeight: "100vh",
          px: { xs: 2, sm: 4 },
          py: 3,
        }}
      >
        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3,width: "80%",
            mx: "auto", }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              color="success"
            >
              Download
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              color="secondary"
            >
              Print
            </Button>
          </Box>
        </Box>

        {/* Main Content */}
        <Box
          ref={contentRef}
          sx={{
            width: "80%",
            mx: "auto",
          }}
        >
          <Section title="Personal Information">
            {Field("User ID", user.user_id)}
            {Field("Username", user.username)}
            {Field("Role Name", user.role_name)}
            {Field("Role id", user.role_id)}
            {Field("First Name", user.first_name)}
            {Field("Last Name", user.last_name)}
            {Field("Referral ID", user.referral_id)}
            {Field("Gender", user.gender)}
            {Field("Date of Birth", user.date_of_birth)}
          </Section>

          <Section title="Contact Information">
            {Field("Email", user.email)}
            {Field("Phone Number", user.phone_number)}
            {Field("Address", user.address)}
            {Field("City", user.city)}
            {Field("State", user.state)}
            {Field("Country", user.country)}
            {Field("PIN Code", user.pin_code)}
            {Field("Status", user.status)}
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
          </Section>
        </Box>
      </Box>
    </>
  );
};

export default View_Tmanagement;
