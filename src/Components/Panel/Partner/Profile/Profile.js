import React, { useEffect, useState } from "react";
import { Box, Card, Typography, Divider, Button, CircularProgress } from "@mui/material";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

const PartnerProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetch(`https://rahul30.pythonanywhere.com/users/${userId}/`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!userData) {
    return <Typography textAlign="center" mt={5}>No user data available.</Typography>;
  }

  return (
    <>
      <PartnerHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Card
          sx={{
            width: "700px",
            mt: "40px",
            borderRadius: "12px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
          }}
        >
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

          <Box sx={{ p: "20px" }}>
            <ProfileField label="First Name:" value={userData.first_name || "-"} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Last Name:" value={userData.last_name || "-"} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Date of Birth:" value={userData.date_of_birth || "-"} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Gender:" value={userData.gender || "-"} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Email Address:" value={userData.email || "-"} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Mobile Number:" value={userData.phone_number || "-"} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Role:" value="Partner" />

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
            <ProfileField label="Nominee Name:" value={userData.nominee_reference_to || "-"} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Nominee Email:" value="-" />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Nominee Mobile Number:" value="-" />
          </Box>

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
