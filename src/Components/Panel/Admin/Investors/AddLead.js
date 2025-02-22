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
  MenuItem,
  Typography,
} from "@mui/material";
import Header from "../../../Shared/Navbar/Navbar";

const AddLeadForm = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
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
            title="Add New Lead"
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
              sx={{ fontWeight: "bold", color: "rgb(30, 10, 80)", marginTop: "15px" }}
            >
              Lead Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth placeholder="Full Name" variant="outlined" size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth placeholder="Email" variant="outlined" size="small" type="email" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth placeholder="Phone Number" variant="outlined" size="small" type="tel" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Primary Source" variant="outlined" size="small">
                  <MenuItem value="Referral">Referral</MenuItem>
                  <MenuItem value="Advertisement">Advertisement</MenuItem>
                  <MenuItem value="Cold Call">Cold Call</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Assign To" variant="outlined" size="small">
                  <MenuItem value="John Doe">John Doe</MenuItem>
                  <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth placeholder="Secondary Email" variant="outlined" size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth placeholder="Secondary Phone Number" variant="outlined" size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth placeholder="Destination" variant="outlined" size="small" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={3} placeholder="Description" variant="outlined" />
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

export default AddLeadForm;
