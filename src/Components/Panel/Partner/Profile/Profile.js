import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { baseurl } from "../../../BaseURL/BaseURL";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import BirthdayPopup from "./../../BirthdayPopup/BirthdayPopup"; // ✅ Import Popup

const PartnerProfile = () => {
  const [userData, setUserData] = useState(null);
  const [showBirthday, setShowBirthday] = useState(false); // ✅ birthday popup state
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    axios
      .get(`${baseurl}/users/${userId}/`)
      .then((response) => {
        const data = response.data;
        setUserData(data);

        // ✅ Check if today is user's birthday
        if (data.date_of_birth) {
          const today = new Date();
          const dob = new Date(data.date_of_birth);

          if (
            today.getDate() === dob.getDate() &&
            today.getMonth() === dob.getMonth()
          ) {
            setShowBirthday(true);
          }
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId]);

  if (!userData)
    return (
      <Typography sx={{ mt: 4, textAlign: "center" }}>Loading...</Typography>
    );

  return (
    <>
      <PartnerHeader />
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
            position: "relative",
          }}
        >
          {/* Edit Icon */}
          <IconButton
            onClick={() => navigate("/editprofile")}
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
            <ProfileField
              label="Date of Birth:"
              value={
                userData.date_of_birth
                  ? new Date(userData.date_of_birth).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "N/A"
              }
            />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Gender:" value={userData.gender} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Email Address:" value={userData.email} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Mobile Number:" value={userData.phone_number} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField
              label="Role:"
              value={
                userData.roles[0]?.role_name === "Agent"
                  ? "Team"
                  : userData.roles[0]?.role_name || "N/A"
              }
            />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Pan number:" value={userData.pan_number} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Aadhaar number:" value={userData.aadhaar_number} />
          </Box>
        </Card>
      </Box>

      {/* ✅ Birthday Popup with Confetti */}
      <BirthdayPopup
        open={showBirthday}
        onClose={() => setShowBirthday(false)}
        userName={userData.first_name}
      />
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
