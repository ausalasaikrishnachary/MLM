import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    countryCode: '+91',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    agreed: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Confirm password validation while typing
    if (name === 'confirmPassword' || name === 'password') {
      const newPassword = name === 'password' ? val : formData.password;
      const newConfirm = name === 'confirmPassword' ? val : formData.confirmPassword;

      if (newConfirm && newConfirm !== newPassword) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    // Step 1: Register User
    const payload = {
      username: formData.firstName,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: `${formData.contactNumber}`,
      role_ids: [2],
      role_name: "Investor",
      referral_id: formData.referralCode,
      status: "active",
      kyc_status: "Pending"
    };

    try {
      const registerResponse = await fetch('http://175.29.21.7:83/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        console.error('Error registering user:', errorData);
        await Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorData.message || 'Unknown error',
        });

        setIsSubmitting(false);
        return;
      }

      const registeredUser = await registerResponse.json();
      console.log('User registered successfully:', registeredUser);

      // Step 2: Send OTP after successful registration
      const otpResponse = await fetch('http://175.29.21.7:83/send-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!otpResponse.ok) {
        const error = await otpResponse.json();
        console.error('Failed to send OTP:', error);
        await Swal.fire({
          icon: 'error',
          title: 'OTP Failed',
          text: error.message || 'Unknown error',
        });
        setIsSubmitting(false);
        return;
      }

      console.log('OTP sent successfully to email:', formData.email);
      await Swal.fire({
        icon: 'success',
        title: 'OTP Sent',
        text: 'OTP sent to your email for verification.',
      });
      setOtpSent(true)

      // TODO: Show OTP input field here (if needed for verification)
      // You can set some state like setShowOtpInput(true)

    } catch (error) {
      console.error('Network error:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'A network error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false); // Always stop loading
    }
  };



  const handleOtpVerify = async () => {
    try {
      const res = await fetch('http://175.29.21.7:83/verify-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      if (res.ok) {
        console.log('OTP Verified!');
        setOtpVerified(true);
        await Swal.fire({
          icon: 'success',
          title: 'Verified!',
          text: 'Your account has been verified!',
        });
      } else {
        const err = await res.json();
        console.error('OTP verification failed:', err);
        await Swal.fire({
          icon: 'error',
          title: 'Verification Failed',
          text: err.message || 'Invalid OTP',
        });
      }
    } catch (error) {
      console.error('OTP verification network error:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Network error occurred during OTP verification. Please try again.',
      });
    }
  };


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 700,
        mx: 'auto',
        p: 4,
        borderRadius: 2,
        pt: 3
      }}
    >
      <Typography variant="h4" sx={{ pb: 5, textAlign: "center" }}>
        SignUp as Investor
      </Typography>
      <Grid container spacing={2}>
        {!otpSent && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField InputLabelProps={{ shrink: true }} variant="outlined" label="First Name" name="firstName" fullWidth value={formData.firstName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Last Name" name="lastName" fullWidth value={formData.lastName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="contactNumber">Contact Number</InputLabel>
                <OutlinedInput
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <Select
                        value={formData.countryCode}
                        onChange={(e) =>
                          setFormData({ ...formData, countryCode: e.target.value })
                        }
                        variant="standard"
                        disableUnderline
                        sx={{ minWidth: 60 }}
                      >
                        <MenuItem value="+91">🇮🇳 +91</MenuItem>
                        <MenuItem value="+1">🇺🇸 +1</MenuItem>
                        <MenuItem value="+44">🇬🇧 +44</MenuItem>
                      </Select>
                    </InputAdornment>
                  }
                  label="Contact Number"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email ID" name="email" fullWidth value={formData.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  error={!!confirmPasswordError}
                  required
                />
                {confirmPasswordError && (
                  <Typography variant="caption" color="error">
                    {confirmPasswordError}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                label="Referral Code"
                name="referralCode"
                fullWidth
                value={formData.referralCode}
                onChange={handleChange}
              />
            </Grid> */}
            <Grid item xs={12}>


              <Typography variant="body2" textAlign="center">
                By continuing, you’re agreeing to our{' '}
                <a href="#" style={{ color: '#2d1656' }}>Terms of Service</a> and{' '}
                <a href="#" style={{ color: '#2d1656' }}>Privacy Policy</a>.
              </Typography>


            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                {/* <Button
                type="submit"
                fullWidth
                size="large"
                sx={{
                  backgroundColor: "#2d1656",
                  color: "#ffffff",
                  borderRadius: "20px",
                  '&:hover': {
                    backgroundColor: "#1e0f3a",
                  }
                }}
              >
                Submit
              </Button> */}

                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  sx={{
                    backgroundColor: "#2d1656",
                    color: "#ffffff",
                    borderRadius: "20px",
                    '&:hover': {
                      backgroundColor: "#1e0f3a",
                    }
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Box>
            </Grid>
          </>
        )}

        {otpSent && !otpVerified && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Enter OTP"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                onClick={handleOtpVerify}
                sx={{
                  backgroundColor: "#2d1656",
                  color: "#ffffff",
                  borderRadius: "20px",
                  '&:hover': {
                    backgroundColor: "#1e0f3a",
                  }
                }}
              >
                Verify OTP
              </Button>
            </Grid>
          </>
        )}

        {otpVerified && (
          <Grid item xs={12}>
            <Typography align="center" color="green">
              Your account has been created successfully!
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="body2" align="center">
            Already have an access?{' '}
            <a href="/signin" style={{ color: '#2d1656' }}>Login</a>
          </Typography>
        </Grid>
      </Grid>
    </Box>

  );
};

export default SignUp;  
