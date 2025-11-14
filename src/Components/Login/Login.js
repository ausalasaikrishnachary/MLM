import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material"; 
import Swal from "sweetalert2";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import image2 from "./../Images/logo1.png";
import login1 from "./../Images/login1.jpg";
import login2 from "./../Images/login2.jpg";
import { baseurl } from "../BaseURL/BaseURL";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [spinnerTarget, setSpinnerTarget] = useState(""); // "login", "forgot", "register"

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError("");
    setEmailError("");
    setMobileError("");
    setEmail("");
    setPassword("");
    setMobile("");
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

   const handleForgotEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) setEmailError("Email is required");
    else if (!emailRegex.test(value)) setEmailError("Enter a valid email address");
    else setEmailError("");
  };

  const handleEmailChange = (e) => {
  const value = e.target.value;
  setEmail(value);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[6-9]\d{9}$/; // Indian 10-digit numbers

  if (!value) {
    setEmailError("Email or Mobile Number is required");
  } else if (!emailRegex.test(value) && !mobileRegex.test(value)) {
    setEmailError("Enter a valid Email or Mobile Number");
  } else {
    setEmailError("");
  }
};


  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    const mobileRegex = /^[0-9]{10}$/;
    if (!value) setMobileError("Mobile number is required");
    else if (!mobileRegex.test(value)) setMobileError("Enter a valid 10-digit mobile number");
    else setMobileError("");
  };

  // Normal Login Implementation
  const handleNormalLogin = async (e) => {
  e.preventDefault();
  setError("");
  setSpinnerTarget("login");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  if (!email) {
    setEmailError("Email or Mobile Number is required");
    setSpinnerTarget("");
    return;
  } else if (!emailRegex.test(email) && !mobileRegex.test(email)) {
    setEmailError("Enter a valid Email or Mobile Number");
    setSpinnerTarget("");
    return;
  } else {
    setEmailError("");
  }

  if (!password) {
    setError("Password is required");
    setSpinnerTarget("");
    return;
  }

  try {
    const response = await fetch(`${baseurl}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email_or_phonenumber: email,  // ⬅ updated payload
        password,
      }),
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

      const userRoles = data.roles || [];
      if (userRoles.length > 1) {
        selectUserRole(userRoles);
      } else if (userRoles.length === 1) {
        navigateToDashboard(userRoles[0]);
      } else {
        setError("No roles assigned. Please contact support.");
      }
    } else {
      setError(data.error || "Invalid credentials");
    }
  } catch {
    setError("Something went wrong. Please try again.");
  } finally {
    setSpinnerTarget("");
  }
};


  // OTP Based Login Implementation
  const handleOtpLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSpinnerTarget("login");
    
    if (!mobile) {
      setMobileError("Mobile number is required");
      setSpinnerTarget("");
      return;
    } else if (mobileError) {
      setSpinnerTarget("");
      return;
    }

    try {
      const response = await fetch(`${baseurl}/login1/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: mobile }),
      });

      const data = await response.json();
      if (response.ok) {   
        Swal.fire("Success", "OTP sent to your registered mobile number", "success");
        navigate("/verify-otp");
      } else {
        setError(data.error || "Invalid mobile number");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSpinnerTarget("");
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
    if (selectedRole) navigateToDashboard(selectedRole);
  };

  const navigateToDashboard = (role) => {
    if (role === "Admin") navigate("/a-asset");
    else if (role === "Agent") navigate("/p-assets");
    else if (role === "Client") navigate("/i-asset");
    else if (role === "Super Admin") navigate("/s-dashboard");
    else setError("Invalid role assigned. Please contact support.");
  };

  const handleSendOTP = async () => {
    if (!email || emailError) {
      setEmailError("Enter a valid email address");
      return;
    }
    setSpinnerTarget("forgot");
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
    } catch {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    } finally {
      setSpinnerTarget("");
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
        Swal.fire("Success", "Password reset successfully.", "success").then(() =>
          setShowResetPassword(false)
        );
      } else {
        Swal.fire("Error", data.error || "Failed to reset password", "error");
      }
    } catch {
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
            {showForgotPassword ? (
              <>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{ mb: 4 }}
                >
                  Forgot Password
                </Typography>

                <Typography
                  variant="body2"
                  color="error"
                  sx={{
                    mb: -1.5,
                    mt: 0,
                    ml: 1,
                    textAlign: "left",
                    minHeight: "2em",
                    fontSize: "0.6rem",
                    lineHeight: 1.2,
                  }}
                >
                  {emailError || " "}
                </Typography>

                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={handleForgotEmailChange}
                  error={!!emailError}
                  helperText=""
                />

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, gap: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      borderColor: "#004080",
                      color: "#004080",
                      "&:hover": { bgcolor: "#004080", color: "#fff" },
                    }}
                    onClick={() => {
                      setShowForgotPassword(false);
                      setEmail("");
                      setEmailError("");
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "#00cc8f",
                      "&:hover": { bgcolor: "#004080", color: "#fff" },
                    }}
                    onClick={handleSendOTP}
                    disabled={spinnerTarget === "forgot"}
                  >
                    {spinnerTarget === "forgot" ? (
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Sending...
                      </Box>
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </Box>
              </>
            ) : showResetPassword ? (
              <>
                <Typography variant="h4" align="center" gutterBottom>
                  Reset Password
                </Typography>
                <TextField fullWidth label="Email" variant="outlined" margin="normal" value={email} disabled />
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
                  sx={{
                    mt: 2,
                    bgcolor: "#00cc8f",
                    "&:hover": { bgcolor: "#004080", color: "#fff" },
                  }}
                  onClick={handleResetPassword}
                >
                  Reset Password
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h4" align="center" sx={{ mb: 3 }} gutterBottom>
                  Login
                </Typography>

                {/* Tabs for Login Methods */}
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  centered
                  sx={{ mb: 3 }}
                >
                  <Tab label="Normal Login" />
                  <Tab label="OTP Login" />
                </Tabs>

                {activeTab === 0 ? (
                  // Normal Login Form
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    <Box sx={{ minHeight: "25px", ml: 1 }}>
                      {emailError && (
                        <Typography variant="caption" color="error">
                          {emailError}
                        </Typography>
                      )}
                    </Box>

                    <TextField
                      fullWidth
                      label="Email/Mobile Number"
                      variant="outlined"
                      value={email}
                      onChange={handleEmailChange}
                      error={!!emailError}
                      margin="dense"
                      sx={{ mt: 0.5 }}
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
                            <IconButton
                              onClick={handleTogglePassword}
                              edge="end"
                              sx={{ color: "#ffa000" }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2, gap: 1 }}>
                      <Typography variant="body2">Forgot Password?</Typography>
                      <Link
                        onClick={async () => {
                          setSpinnerTarget("forgot");
                          setShowForgotPassword(true);
                          setTimeout(() => setSpinnerTarget(""), 500);
                        }}
                        sx={{ cursor: "pointer", color: "#004080", display: "inline-flex", alignItems: "center", gap: 1 }}
                      >
                        {spinnerTarget === "forgot" && (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        )}
                        Reset Here
                      </Link>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        borderRadius: '50px',
                        bgcolor: spinnerTarget === "login" ? "#004080" : "#ffa000",
                        color: spinnerTarget === "login" ? "#fff" : "inherit",
                        border: "2px solid transparent",
                        "&:hover": {
                          bgcolor: "#fff",
                          color: "#ffa000",
                          border: "2px solid #ffa000",
                        },
                      }}
                      onClick={handleNormalLogin}
                      disabled={spinnerTarget === "login"}
                    >
                      {spinnerTarget === "login" ? (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Logging In...
                        </Box>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </Box>
                ) : (
                  // OTP Login Form
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    <Box sx={{ minHeight: "25px", ml: 1 }}>
                      {mobileError && (
                        <Typography variant="caption" color="error">
                          {mobileError}
                        </Typography>
                      )}
                    </Box>

                    <TextField
                      fullWidth
                      label="Mobile Number"
                      variant="outlined"
                      value={mobile}
                      onChange={handleMobileChange}
                      error={!!mobileError}
                      margin="normal"
                      placeholder="Enter 10-digit mobile number"
                      inputProps={{ maxLength: 10 }}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        borderRadius: '50px',
                        bgcolor: spinnerTarget === "login" ? "#004080" : "#ffa000",
                        color: spinnerTarget === "login" ? "#fff" : "inherit",
                        border: "2px solid transparent",
                        "&:hover": {
                          bgcolor: "#fff",
                          color: "#ffa000",
                          border: "2px solid #ffa000",
                        },
                      }}
                      onClick={handleOtpLogin}
                      disabled={spinnerTarget === "login"}
                    >
                      {spinnerTarget === "login" ? (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Sending OTP...
                        </Box>
                      ) : (
                        "Send OTP"
                      )}
                    </Button>
                  </Box>
                )}

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
                  <Typography variant="body2">Don't have an account?</Typography>
                  <Link
                    href="/signup"
                    sx={{ cursor: "pointer", color: "primary.main", ml: 1, display: "inline-flex", alignItems: "center", gap: 1 }}
                    onClick={(e) => {
                      setSpinnerTarget("register");
                      setTimeout(() => setSpinnerTarget(""), 1000);
                    }}
                  >
                    {spinnerTarget === "register" && (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    )}
                    Register Here
                  </Link>
                </Box>

                {error && (
                  <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: "center" }}>
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

export default Login;