import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Typography,
} from "@mui/material";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

const PartnerKyc = () => {
  return (
    <>
    <PartnerHeader/>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh",
        // backgroundColor: "#f8f9fa",
        // paddingTop: "10x",
      }}
    >
      <Card
        sx={{
          width: 800,
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
          marginTop: "10px",
        }}
      >
        {/* Header */}
        <CardHeader
          title="Investor Registration"
          sx={{
            backgroundColor: "rgb(30, 10, 80)",
            color: "white",
            textAlign: "center",
            padding: "15px",
            fontSize: "20px",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        />

        {/* Form Content */}
        <CardContent>
          {/* Basic Information */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "rgb(30, 10, 80)",
              marginTop: "15px",
            }}
          >
            Basic Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Full Name"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Email"
                variant="outlined"
                size="small"
                type="email"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Mobile Number"
                variant="outlined"
                size="small"
                type="tel"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Date of Birth"
                variant="outlined"
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Gender"
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

          {/* Address Details */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "rgb(30, 10, 80)",
              marginTop: "15px",
            }}
          >
            Address Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Address"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                placeholder="Country"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                placeholder="State"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                placeholder="City"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                placeholder="ZIP Code"
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

          {/* Banking Details */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "rgb(30, 10, 80)",
              marginTop: "15px",
            }}
          >
            Banking Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="PAN Number"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Aadhar Number"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Bank Name"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Account Number"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="IFSC Code"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Bank Branch"
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

          {/* Investment Details */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "rgb(30, 10, 80)",
              marginTop: "15px",
            }}
          >
            Investment Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Investment Type"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Risk Profile"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Expected Investment Amount"
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

          {/* Nominee Details */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "rgb(30, 10, 80)",
              marginTop: "15px",
            }}
          >
            Nominee Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Nominee Name"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Nominee Relationship"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Nominee Date of Birth"
                variant="outlined"
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

          {/* KYC Verification */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "rgb(30, 10, 80)",
              marginTop: "15px",
            }}
          >
            KYC Verification
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Button
                variant="outlined"
                component="label"
                sx={{ flex: 1, marginRight: "10px" }}
              >
                Upload File
                <input type="file" hidden />
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  "&:hover": { backgroundColor: "darkred" },
                }}
              >
                KYC
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: "10px", borderWidth: "0.5px" }} />

          {/* Terms & Conditions */}
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ marginTop: "10px", whiteSpace: "nowrap" }}
          >
            <Grid item>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color: "rgb(30, 10, 80)",
                    }}
                  >
                    I agree to the Terms & Conditions
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        </CardContent>

        {/* Footer with Submit Button */}
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(20, 5, 60)",
              "&:hover": { backgroundColor: "rgb(15, 4, 50)" },
            }}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Box>
    </>
  );
};

export default PartnerKyc;
