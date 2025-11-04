import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  Grid,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import image2 from "./../Images/logo1.png";
import login1 from "./../Images/login1.jpg";
import login2 from "./../Images/login2.jpg";
import { baseurl } from "../BaseURL/BaseURL";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [spinnerTarget, setSpinnerTarget] = useState("");

  const navigateToDashboard = (role) => {
    if (role === "Admin") navigate("/a-dashboard");
    else if (role === "Agent") navigate("/p-dashboard");
    else if (role === "Client") navigate("/i-dashboard");
    else if (role === "Super Admin") navigate("/s-dashboard");
    else setError("Invalid role assigned. Please contact support.");
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSpinnerTarget("verify");
    
    if (!phoneNumber) {
      setError("Phone number is required");
      setSpinnerTarget("");
      return;
    }
    
    if (!otp) {
      setError("OTP is required");
      setSpinnerTarget("");
      return;
    }

    try {
      const response = await fetch(`${baseurl}/verify-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phone_number: phoneNumber, 
          otp: otp 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.username);
        localStorage.setItem("phone_number", data.phone_number);
        localStorage.setItem("referral_id", data.referral_id);
        localStorage.setItem("referred_by", data.referred_by);
        localStorage.setItem("user_name", data.first_name);
        localStorage.setItem("roles", JSON.stringify(data.roles));

        const userRoles = data.roles || [];
        
        if (userRoles.length > 1) {
          // If multiple roles, let user select
          const { value: selectedRole } = await Swal.fire({
            title: "Select Your Role",
            input: "select",
            inputOptions: userRoles.reduce((acc, role) => ({ ...acc, [role]: role }), {}),
            inputPlaceholder: "Choose your role",
            showCancelButton: true,
            confirmButtonText: "Proceed",
            cancelButtonText: "Cancel",
          });
          
          if (selectedRole) {
            navigateToDashboard(selectedRole);
          }
        } else if (userRoles.length === 1) {
          navigateToDashboard(userRoles[0]);
        } else {
          setError("No roles assigned. Please contact support.");
        }
      } else {
        setError(data.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSpinnerTarget("");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${login2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "-85px",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          width: "90%",
          maxWidth: 900,
          borderRadius: 4,
          overflow: "hidden",
          transition: "all 0.3s ease",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.47)",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url(${login1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: 2,
            }}
          >
            <img src={image2} alt="Login illustration" style={{ maxWidth: "100%", height: "auto" }} />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: 500,
            }}
          >
            <Typography variant="h4" align="center" sx={{ mb: 3 }} gutterBottom>
              Verify OTP
            </Typography>

            <Typography variant="body1" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
              Enter the OTP sent to your registered mobile number
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                margin="dense"
                sx={{ mt: 0.5 }}
              />

              <TextField
                fullWidth
                label="OTP"
                variant="outlined"
                margin="normal"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                inputProps={{ maxLength: 6 }}
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                borderRadius: '50px',
                bgcolor: spinnerTarget === "verify" ? "#004080" : "#ffa000",
                color: spinnerTarget === "verify" ? "#fff" : "inherit",
                border: "2px solid transparent",
                "&:hover": {
                  bgcolor: "#fff",
                  color: "#ffa000",
                  border: "2px solid #ffa000",
                },
              }}
              onClick={handleVerifyOTP}
              disabled={spinnerTarget === "verify"}
            >
              {spinnerTarget === "verify" ? (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Verifying...
                </Box>
              ) : (
                "Verify OTP"
              )}
            </Button>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
              <Typography variant="body2">Back to</Typography>
              <Link
                component={RouterLink}
                to="/login"
                sx={{ cursor: "pointer", color: "primary.main", ml: 1, display: "inline-flex", alignItems: "center", gap: 1 }}
              >
                Login
              </Link>
            </Box>

            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: "center" }}>
                {error}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body2" color="white" sx={{ opacity: 0.9 }}>
          © {new Date().getFullYear()} SHRIRAJ. All rights reserved. <br />
          <RouterLink
            to="/termsandconditions"
            style={{ color: "inherit", margin: "0 8px", textDecoration: "underline" }}
          >
            Terms & Conditions
          </RouterLink>
          |
          <RouterLink
            to="/privacypolicy"
            style={{ color: "inherit", margin: "0 8px", textDecoration: "underline" }}
          >
            Privacy Policy
          </RouterLink>
          |
          <RouterLink
            to="/refundpolicy"
            style={{ color: "inherit", margin: "0 8px", textDecoration: "underline" }}
          >
            Refund Policy
          </RouterLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default VerifyOTP;