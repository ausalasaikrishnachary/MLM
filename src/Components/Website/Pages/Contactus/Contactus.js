import React from "react";
import { Box, Typography, TextField, Button, Card, Grid, IconButton } from "@mui/material";
import { Facebook, Instagram, LinkedIn, YouTube, Twitter } from "@mui/icons-material";
import "./Contactus.css";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const Contact = () => {
  return (
    <Box className="contact-container" sx={{ mt: 5, px: { xs: 2, sm: 5, md: 15 } }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} display="flex" alignItems="center">
          <Box>
            <Typography variant="h6" color="text.secondary" className="contact-subtitle">
              What Are You Waiting For...
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="text.primary" className="contact-title">
              Make an appointment
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="text.primary" mt={4} className="contact-location-title">
              Our Location:
            </Typography>
            <Typography variant="body1" color="text.secondary" className="contact-location">
              50/4, SHRIRAJ PROPERTY SOLUTIONS PRIVATE LIMITED,
              Atal Chowk, Main Road Boria Khurd, Near Durga Mandir,
              Raipur, Chhattisgarh, 492017
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="text.primary" mt={4} className="contact-contact-title">
              Contact:
            </Typography>
            <div className="contact-item">
              <PhoneIcon className="contact-icon" />
              <Typography variant="body1" color="text.secondary" className="contact-text">
                9074307248
              </Typography>
            </div>
            <div className="contact-item">
              <EmailIcon className="contact-icon" />
              <Typography variant="body1" color="text.secondary" className="contact-text">
                shrirajproperty00@gmail.com
              </Typography>
            </div>

            {/* Social Media Icons */}
            <Box mt={4}>
              <Typography variant="h6" fontWeight="bold" color="text.primary" className="contact-follow-title">
                Follow Us
              </Typography>
              <Box display="flex" gap={2} className="contact-social-icons">
                <IconButton color="primary">
                  <Facebook />
                </IconButton>
                <IconButton sx={{ color: "#E4405F" }}>
                  <Instagram />
                </IconButton>
                <IconButton color="primary">
                  <LinkedIn />
                </IconButton>
                <IconButton sx={{ color: "#FF0000" }}>
                  <YouTube />
                </IconButton>
                <IconButton color="inherit">
                  <Twitter />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" textAlign="center" fontWeight="bold" color="text.primary" mb={2} className="contact-form-title">
            Contact Us
          </Typography>
          <Card sx={{ p: 4, border: "2px solid black", boxShadow: 3 }} className="contact-card">
            <form>
              <TextField fullWidth label="Name" variant="outlined" margin="normal" className="contact-input" />
              <TextField fullWidth label="Contact" variant="outlined" margin="normal" className="contact-input" />
              <TextField fullWidth label="Email ID" variant="outlined" margin="normal" className="contact-input" />
              <TextField fullWidth label="Message" multiline rows={3} variant="outlined" margin="normal" className="contact-input" />
              <div style={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "rgb(46, 22, 109)",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    mt: 2,
                    '&:hover': { backgroundColor: "rgb(30, 10, 80)" },
                  }}
                  className="contact-submit-btn"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;