import React from "react";
import { Box, Card, Typography, Divider, Button } from "@mui/material";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

const PartnerProfile = () => {
  return (
    <>
    <PartnerHeader/>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        // pt: "40px",
      }}
    >
      <Card
        sx={{
          width: "700px",
          mt: "40px",
          borderRadius: "12px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
          overflow: "hidden", // Ensures header border radius is maintained
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: "rgb(30, 10, 80)",
            color: "white",
            textAlign: "center",
            p: "15px",
            fontSize: "20px",
          }}
        >
          <Typography variant="h6" sx={{ m: 0 }}>
            Profile Details
          </Typography>
        </Box>

        {/* Card Body */}
        <Box sx={{ p: "20px" }}>
          <ProfileField label="First Name:" value="Aditya" />
          <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
          <ProfileField label="Last Name:" value="Roy" />
          <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
          <ProfileField label="Date of Birth:" value="19 February 2001" />
          <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
          <ProfileField label="Gender:" value="Male" />
          <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
          <ProfileField
            label="Email Address:"
            value="aditya.roy@example.com"
          />
          <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
          <ProfileField label="Mobile Number:" value="+91 9876543210" />
          <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
          <ProfileField label="Role:" value="Buyer" />

          {/* Nominee Details */}
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              color: "rgb(30, 10, 80)",
              mt: "15px",
            }}
          >
            Nominee Details
          </Typography>
          <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
          <ProfileField label="Nominee Name:" value="Shanthi Roy" />
          <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
          <ProfileField
            label="Nominee Email:"
            value="nominee.roy@example.com"
          />
          <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
          <ProfileField
            label="Nominee Mobile Number:"
            value="+91 8765432109"
          />
        </Box>

        {/* Footer with Close Button */}
        <Box sx={{ textAlign: "center", p: "15px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(20, 5, 60)",
              color: "white",
              padding: "8px 20px",
              fontSize: "14px",
              borderRadius: "20px",
              transition: "0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "rgb(15, 4, 50)",
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Card>
    </Box>
    </>
  );
};

const ProfileField = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "17px",
      py: "10px",
    }}
  >
    <Typography
      component="span"
      sx={{ color: "rgb(30, 10, 80)", flex: 1, textAlign: "left" }}
    >
      {label}
    </Typography>
    <Typography
      component="span"
      sx={{ flex: 2, textAlign: "right", color: "#333", fontWeight: 500 }}
    >
      {value}
    </Typography>
  </Box>
);

export default PartnerProfile;