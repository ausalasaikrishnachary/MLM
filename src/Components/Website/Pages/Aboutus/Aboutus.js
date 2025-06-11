import React from "react";
import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FlagIcon from "@mui/icons-material/Flag";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const AboutUs = () => {
  return (
    <Container sx={{ mt: 5, maxWidth: "80%", display: "flex", justifyContent: "center" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <CardContent>
            <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
              How It Works – Investing with Shriraj
            </Typography>
            <Typography variant="body1" paragraph>
              Shriraj offers a <strong>fractional ownership model</strong> that allows investors to invest in real estate assets 
              without needing to purchase an entire property. Here’s how it works:
            </Typography>

           
            {/* Vision, Mission, Values Section */}
            <Box mt={2}>

              <Grid container spacing={3} mt={2} justifyContent="center">
                {/* Our Vision */}
                <Grid item xs={12} sm={4}>
                  <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                    <VisibilityIcon fontSize="large" sx={{ mb: 1, color: "primary.main" }} />
                    <Typography variant="h6" fontWeight="bold">Our Vision</Typography>
                    <Typography variant="body2" sx={{ maxWidth: "250px" }}>
                      To empower financial independence through accessible, data-driven real estate investments.
                    </Typography>
                  </Box>
                </Grid>

                {/* Our Mission */}
                <Grid item xs={12} sm={4}>
                  <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                    <FlagIcon fontSize="large" sx={{ mb: 1, color: "secondary.main" }} />
                    <Typography variant="h6" fontWeight="bold">Our Mission</Typography>
                    <Typography variant="body2" sx={{ maxWidth: "250px" }}>
                      To transform the real estate landscape through technology, transparency, and investor-centric innovation.
                    </Typography>
                  </Box>
                </Grid>

                {/* Our Values */}
                <Grid item xs={12} sm={4}>
                  <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                    <VerifiedUserIcon fontSize="large" sx={{ mb: 1, color: "success.main" }} />
                    <Typography variant="h6" fontWeight="bold">Our Values</Typography>
                    <Typography variant="body2" sx={{ maxWidth: "250px" }}>
                    We prioritize integrity, transparency, and trust to create lasting value for our investors.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {/* Steps Section */}
            <Grid container spacing={2} mt={3}>
              {[
                { title: "Step 1: Browse & Select a Property", description: "Explore available properties with details like location, asset value, and expected returns." },
                { title: "Step 2: Choose Investment Amount", description: "Decide your investment amount using an investment calculator for estimated returns." },
                { title: "Step 3: Make the Investment", description: "Complete your investment using UPI, Razorpay, or bank transfers." },
                { title: "Step 4: Earn Rental Income & Appreciation", description: "Receive monthly rental income and benefit from property appreciation." },
                { title: "Step 5: Exit & Liquidate Investment", description: "Sell your fractional share or exit after a lock-in period." }
              ].map((step, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card sx={{ boxShadow: 2, height: "100%", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold">{step.title}</Typography>
                      <Typography variant="body2">{step.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Why Choose This Model? Section */}
            <Box textAlign="left" mt={5}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Why Choose This Model?
              </Typography>
              <Box component="ul" sx={{ paddingLeft: 0, listStyleType: "none", margin: 0 }}>
                {[
                  "✅ Diversified Investment: Spread money across multiple properties.",
                  "✅ Passive Income: Earn monthly rental income.",
                  "✅ Higher Returns: Real estate offers better ROI than fixed deposits and gold.",
                  "✅ Lower Entry Cost: Invest in real estate without buying an entire property."
                ].map((benefit, index) => (
                  <Box component="li" key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography variant="body1">{benefit}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

        

          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
