import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, Typography, Divider, Button, IconButton } from "@mui/material";
import { baseurl } from '../../../BaseURL/BaseURL';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const InvestorProfile = () => {
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseurl}/users/${userId}/`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  if (!userData) return <Typography sx={{ mt: 4, textAlign: "center" }}>Loading...</Typography>;

  return (
    <>
      <InvestorHeader />
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
            width: "700px",
            mt: "40px",
            borderRadius: "12px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
            position: "relative", // Add this line
          }}
        >
          {/* Edit Icon */}
          <IconButton
            onClick={() => navigate("/clienteditprofile")} // Updated path
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "rgb(30, 10, 80)",
            }}
          >
            <EditIcon />
          </IconButton>


          {/* Header */}
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography
              variant="h5"
              sx={{
                color: "rgb(30, 10, 80)",
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              Profile
            </Typography>
          </Box>

          {/* Card Body */}
          <Box sx={{ p: "20px" }}>
            <ProfileField label="First Name:" value={userData.first_name} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Last Name:" value={userData.last_name} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Date of Birth:" value={userData.date_of_birth} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Gender:" value={userData.gender} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Email Address:" value={userData.email} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Mobile Number:" value={userData.phone_number} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Role:" value={userData.roles[0]?.role_name || "N/A"} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Pan number:" value={userData.pan_number} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Aadhaar number:" value={userData.aadhaar_number} />

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
                             onClick={() => navigate("/i-dashboard")}

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

export default InvestorProfile;
