import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link, Paper, Grid } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import image2 from "./../Images/logo.png";

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

    try {
      const response = await fetch("https://rahul30.pythonanywhere.com/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("user_name", data.first_name + data.last_name);
        const userRoles = data.roles || [];

        if (userRoles.length > 1) {
          selectUserRole(userRoles);
        } else if (userRoles.length === 1) {
          navigateToDashboard(userRoles[0]);
        } else {
          setError("No roles assigned. Please contact support.");
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
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
      const response = await fetch("https://rahul30.pythonanywhere.com/send-otp/", {
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
      const response = await fetch("https://rahul30.pythonanywhere.com/verify-otp-reset-password/", {
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
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url(https://cdn.pixabay.com/photo/2018/11/22/23/57/london-3833039_1280.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "-85px"
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
              backgroundImage: "url(https://img.freepik.com/free-vector/background-banner-colorful-gradient_677411-3591.jpg?w=360)",
              backgroundSize: "cover",
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
            {showForgotPassword ? (
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
                <TextField fullWidth label="Email" variant="outlined" margin="normal" value={email} onChange={handleEmailChange} />
                <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                  <Link href="/signup" sx={{ cursor: "pointer", color: "primary.main" }}>
                    Register
                  </Link>
                  <Link href="#" onClick={() => setShowForgotPassword(true)} sx={{ cursor: "pointer", color: "error.main" }}>
                    Forgot Password?
                  </Link>
                </Box>
                <Button fullWidth variant="contained" sx={{ mt: 2, bgcolor: "#00cc8f", "&:hover": { bgcolor: "#004080", color: "#fff" } }} onClick={handleLogin}>
                  Login
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
