import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Link, Paper, Grid } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import image2 from "./../Images/logo1.png";
import login1 from "./../Images/login1.jpg";
import login2 from "./../Images/login2.jpg";
import { baseurl } from '../BaseURL/BaseURL';
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
const [otpError, setOtpError] = useState("");

  useEffect(() => {
    return () => {
      // Clean up if component unmounts without login
      if (!localStorage.getItem('user_id')) {
        sessionStorage.removeItem('propertyData');
        sessionStorage.removeItem('propertyId');
      }
    };
  }, []);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  };

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  // Validate email & password...
  if (!email || !password) {
    setError("Email and Password are required");
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch(`${baseurl}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ Credentials valid, now send OTP
      const otpResponse = await fetch(`${baseurl}/send-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const otpData = await otpResponse.json();

      if (otpResponse.ok) {
        Swal.fire("Success", "OTP sent to your email. Please verify.", "success");
        setShowOtpVerification(true); // Show OTP input
      } else {
        setError(otpData.error || "Failed to send OTP");
      }
    } else {
      setError(data.error || "Invalid credentials");
    }
  } catch (err) {
    setError("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

const handleVerifyOtp = async () => {
  if (!otp) {
    setOtpError("OTP is required");
    return;
  }
  try {
    const response = await fetch(`${baseurl}/verify-otp/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

  if (response.ok) {
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.username);
        localStorage.setItem("phone_number", data.phone_number);
        localStorage.setItem("referral_id", data.referral_id);
        localStorage.setItem("referred_by", data.referred_by);
        localStorage.setItem("user_name", data.first_name);

        // Check if there's a property to redirect to
        const propertyId = sessionStorage.getItem('propertyId');
        const propertyData = sessionStorage.getItem('propertyData');
        
        if (propertyId && propertyData) {
          // Clean up the stored data
          sessionStorage.removeItem('propertyData');
          sessionStorage.removeItem('propertyId');
          
          // Redirect based on user role
          const userRoles = data.roles || [];
          
          if (userRoles.length > 1) {
            // If multiple roles, let user choose and then redirect
            selectUserRoleWithRedirect(userRoles, propertyId, JSON.parse(propertyData));
          } else if (userRoles.length === 1) {
            // Single role, redirect directly
            redirectToPropertyDetails(userRoles[0], propertyId, JSON.parse(propertyData));
          } else {
            // No roles, show error
            setError("No roles assigned. Please contact support.");
          }
          return;
        }

        const userRoles = data.roles || [];

        if (userRoles.length > 1) {
          selectUserRole(userRoles);
        } else if (userRoles.length === 1) {
          navigateToDashboard(userRoles[0]);
        } else {
          setError("No roles assigned. Please contact support.");
        }
      } else {
      setOtpError(data.error || "Invalid OTP");
    }
  } catch (error) {
    setOtpError("Something went wrong. Please try again.");
  }
};

const handleResendOtp = async () => {
  try {
    const response = await fetch(`${baseurl}/send-otp/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (response.ok) {
      Swal.fire("Success", "New OTP sent to your email.", "success");
    } else {
      Swal.fire("Error", data.error || "Failed to resend OTP", "error");
    }
  } catch (error) {
    Swal.fire("Error", "Something went wrong. Please try again.", "error");
  }
};
  const selectUserRoleWithRedirect = async (roles, propertyId, propertyData) => {
    const { value: selectedRole } = await Swal.fire({
      title: "Select Your Role",
      input: "select",
      inputOptions: roles.reduce((acc, role) => ({ ...acc, [role]: role }), {}),
      inputPlaceholder: "Choose your role",
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancel",
    });

    if (selectedRole) {
      redirectToPropertyDetails(selectedRole, propertyId, propertyData);
    }
  };

  const redirectToPropertyDetails = (role, propertyId, propertyData) => {
    let redirectPath = '';
    
    switch(role) {
      case "Admin":
        redirectPath = `/a-assets/${propertyId}`;
        break;
      case "Agent":
        redirectPath = `/p-assets/${propertyId}`;
        break;
      case "Client":
        redirectPath = `/i-assets/${propertyId}`;
        break;
      case "Super Admin":
        redirectPath = `/s-assets/${propertyId}`;
        break;
      default:
        // Default to client view if role not recognized
        redirectPath = `/i-assets/${propertyId}`;
    }
    
    navigate(redirectPath, { state: { property: propertyData } });
  };

  const selectUserRole = async (roles) => {
    const { value: selectedRole } = await Swal.fire({
      title: "Select Your Role",
      input: "select",
      inputOptions: roles.reduce((acc, role) => ({ ...acc, [role]: role }), {}),
      inputPlaceholder: "Choose your role",
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancel",
    });

    if (selectedRole) {
      navigateToDashboard(selectedRole);
    }
  };

  const navigateToDashboard = (role) => {
    if (role === "Admin") {
      navigate("/a-dashboard");
    } else if (role === "Agent") {
      navigate("/p-dashboard");
    } else if (role === "Client") {
      navigate("/i-dashboard");
    } else if (role === "Super Admin") {
      navigate("/s-dashboard");
    } else {
      setError("Invalid role assigned. Please contact support.");
    }
  };

  const handleSendOTP = async () => {
    if (!email || emailError) {
      setEmailError("Enter a valid email address");
      return;
    }

    try {
      const response = await fetch(`${baseurl}/send-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success", "OTP sent successfully. Check your email.", "success");
        setShowForgotPassword(false);
        setShowResetPassword(true);
      } else {
        Swal.fire("Error", data.error || "Failed to send OTP", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      Swal.fire("Error", "OTP and New Password are required", "error");
      return;
    }

    try {
      const response = await fetch(`${baseurl}/verify-otp-reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success", "Password reset successfully.", "success").then(() => {
          setShowResetPassword(false);
        });
      } else {
        Swal.fire("Error", data.error || "Failed to reset password", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
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
      <Paper elevation={4} sx={{ display: "flex", width: "90%", maxWidth: 900, borderRadius: 2, overflow: "hidden" }}>
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
            sx={{ padding: 4, display: "flex", flexDirection: "column", justifyContent: "center" }}
          >

        {showOtpVerification ? (
  <>
    <Typography variant="h5" align="center" gutterBottom>
      Verify OTP
    </Typography>
    <TextField
      fullWidth
      label="Email"
      value={email}
      disabled
      margin="normal"
    />
    <TextField
      fullWidth
      label="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      error={!!otpError}
      helperText={otpError}
      margin="normal"
    />
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 2, bgcolor: "#00cc8f" }}
      onClick={handleVerifyOtp}
    >
      Verify OTP
    </Button>
    <Button
      fullWidth
      variant="outlined"
      sx={{ mt: 2 }}
      onClick={handleResendOtp}
    >
      Resend OTP
    </Button>
  </>
) : showForgotPassword ? (
  <>
    <Typography variant="h4" align="center" gutterBottom>
      Forgot Password
    </Typography>
    <TextField
      fullWidth
      label="Email"
      variant="outlined"
      margin="normal"
      value={email}
      onChange={handleEmailChange}
      error={!!emailError}
      helperText={emailError}
    />
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 2, bgcolor: "#00cc8f", "&:hover": { bgcolor: "#004080", color: "#fff" } }}
      onClick={handleSendOTP}
    >
      Send OTP
    </Button>
  </>
) : showResetPassword ? (
  <>
    <Typography variant="h4" align="center" gutterBottom>
      Reset Password
    </Typography>
    <TextField
      fullWidth
      label="Email"
      variant="outlined"
      margin="normal"
      value={email}
      disabled
    />
    <TextField
      fullWidth
      label="OTP"
      variant="outlined"
      margin="normal"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
    />
    <TextField
      fullWidth
      label="New Password"
      type="password"
      variant="outlined"
      margin="normal"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 2, bgcolor: "#00cc8f", "&:hover": { bgcolor: "#004080", color: "#fff" } }}
      onClick={handleResetPassword}
    >
      Reset Password
    </Button>
  </>
) : (
  <>
    <Typography variant="h4" align="center" gutterBottom>
      Login
    </Typography>

    <TextField
      fullWidth
      label="Email"
      variant="outlined"
      margin="normal"
      value={email}
      onChange={handleEmailChange}
      error={!!emailError}
      helperText={emailError}
    />

    <TextField
      fullWidth
      label="Password"
      type={showPassword ? "text" : "password"}
      variant="outlined"
      margin="normal"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      error={!password && error === "Password is required"}
      helperText={!password && error === "Password is required" ? "Password is required" : ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />

    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
      <Link href="/signup" sx={{ cursor: "pointer", color: "primary.main" }}>
        Register
      </Link>
      <Link href="#" onClick={() => setShowForgotPassword(true)} sx={{ cursor: "pointer", color: "error.main" }}>
        Forgot Password?
      </Link>
    </Box>

    <Button
      fullWidth
      variant="contained"
      sx={{
        mt: 2,
        bgcolor: isLoading ? "#004080" : "#00cc8f",
        color: isLoading ? "#fff" : "inherit",
        "&:hover": {
          bgcolor: "#004080",
          color: "#fff"
        }
      }}
      onClick={handleLogin}
      disabled={isLoading}
    >
      {isLoading ? "Logging In..." : "Login"}
    </Button>

    {error && (
      <Typography
        variant="body2"
        color="error"
        sx={{ mt: 2, textAlign: 'center' }}
      >
        {error}
      </Typography>
    )}


              </>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body2" color="white" sx={{ opacity: 0.9 }}>
          © {new Date().getFullYear()} SHRIRAJ. All rights reserved. <br />
          <RouterLink to="/termsandconditions" style={{ color: "inherit", margin: "0 8px", textDecoration: "underline" }}>
            Terms & Conditions
          </RouterLink>
          |
          <RouterLink to="/privacypolicy" style={{ color: "inherit", margin: "0 8px", textDecoration: "underline" }}>
            Privacy Policy
          </RouterLink>
          |
          <RouterLink to="/refundpolicy" style={{ color: "inherit", margin: "0 8px", textDecoration: "underline" }}>
            Refund Policy
          </RouterLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;