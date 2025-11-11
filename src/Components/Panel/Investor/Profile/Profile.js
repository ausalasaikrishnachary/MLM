import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Box, 
  Card, 
  Typography, 
  Divider, 
  Button, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions 
} from "@mui/material";
import { baseurl } from "../../../BaseURL/BaseURL";
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const InvestorProfile = () => {
  const [userData, setUserData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseurl}/users/${userId}/`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleDeleteAccount = () => {
    const adminEmail = "shrirajteam@gmail.com";
    const subject = encodeURIComponent("Account Deletion Request");
    const body = encodeURIComponent(
      `Hello Admin,\n\nI would like to request deletion of my account.\n\nUser Details:\nName: ${userData.first_name} ${userData.last_name}\nEmail: ${userData.email}\nPhone: ${userData.phone_number}\nUser ID: ${userId}\n\nPlease confirm once my account has been deleted.\n\nThank you.`
    );

    window.location.href = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
    setOpenDeleteDialog(false);
  };

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
            position: "relative",
          }}
        >
          {/* Edit Icon */}
          <IconButton
            onClick={() => navigate("/clienteditprofile")}
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
            <ProfileField label="Role:" value={userData.roles[0]?.role_name || "N/A"} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Pan number:" value={userData.pan_number} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Aadhaar number:" value={userData.aadhaar_number} />
          </Box>

          {/* Footer Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              p: "15px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(20, 5, 60)",
                color: "white",
                padding: "8px 20px",
                fontSize: "14px",
                borderRadius: "20px",
                transition: "0.3s ease-in-out",
                "&:hover": { backgroundColor: "rgb(15, 4, 50)" },
              }}
              onClick={() => navigate("/i-dashboard")}
            >
              Close
            </Button>

            {/* Delete Account Button */}
            <Button
              variant="outlined"
              color="error"
              sx={{
                borderRadius: "20px",
                padding: "8px 20px",
                fontSize: "14px",
                borderWidth: 2,
              }}
              onClick={() => setOpenDeleteDialog(true)}
            >
              Request Account Deletion
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Request Account Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to request account deletion? You will be
            redirected to your email app to send a request to our support team.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
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



//Before delete account feature addition

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Box, Card, Typography, Divider, Button, IconButton } from "@mui/material";
// import { baseurl } from '../../../BaseURL/BaseURL';
// import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';
// import EditIcon from "@mui/icons-material/Edit";
// import { useNavigate } from "react-router-dom";

// const InvestorProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const userId = localStorage.getItem("user_id");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${baseurl}/users/${userId}/`)
//       .then((response) => setUserData(response.data))
//       .catch((error) => console.error("Error fetching user data:", error));
//   }, []);

//   if (!userData) return <Typography sx={{ mt: 4, textAlign: "center" }}>Loading...</Typography>;

//   return (
//     <>
//       <InvestorHeader />
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "flex-start",
//           height: "100vh",
//         }}
//       >
//         <Card
//           sx={{
//             width: "700px",
//             mt: "40px",
//             borderRadius: "12px",
//             boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
//             overflow: "hidden",
//             position: "relative", // Add this line
//           }}
//         >
//           {/* Edit Icon */}
//           <IconButton
//             onClick={() => navigate("/clienteditprofile")} // Updated path
//             sx={{
//               position: "absolute",
//               top: 10,
//               right: 10,
//               color: "rgb(30, 10, 80)",
//             }}
//           >
//             <EditIcon />
//           </IconButton>


//           {/* Header */}
//           <Box sx={{ textAlign: "center", py: 2 }}>
//             <Typography
//               variant="h5"
//               sx={{
//                 color: "rgb(30, 10, 80)",
//                 fontWeight: "bold",
//                 letterSpacing: 1,
//               }}
//             >
//               Profile
//             </Typography>
//           </Box>

//           {/* Card Body */}
//           <Box sx={{ p: "20px" }}>
//             <ProfileField label="First Name:" value={userData.first_name} />
//             <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
//             <ProfileField label="Last Name:" value={userData.last_name} />
//             <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
//             <ProfileField
//               label="Date of Birth:"
//               value={
//                 userData.date_of_birth
//                   ? new Date(userData.date_of_birth).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "2-digit",
//                     year: "numeric",
//                   })
//                   : "N/A"
//               }
//             />
//             <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
//             <ProfileField label="Gender:" value={userData.gender} />
//             <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
//             <ProfileField label="Email Address:" value={userData.email} />
//             <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
//             <ProfileField label="Mobile Number:" value={userData.phone_number} />
//             <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
//             <ProfileField label="Role:" value={userData.roles[0]?.role_name || "N/A"} />
//             <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
//             <ProfileField label="Pan number:" value={userData.pan_number} />
//             <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
//             <ProfileField label="Aadhaar number:" value={userData.aadhaar_number} />

//           </Box>

//           {/* Footer with Close Button */}
//           <Box sx={{ textAlign: "center", p: "15px" }}>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "rgb(20, 5, 60)",
//                 color: "white",
//                 padding: "8px 20px",
//                 fontSize: "14px",
//                 borderRadius: "20px",
//                 transition: "0.3s ease-in-out",
//                 "&:hover": {
//                   backgroundColor: "rgb(15, 4, 50)",
//                 },
//               }}
//                              onClick={() => navigate("/i-dashboard")}

//             >
//               Close
//             </Button>
//           </Box>
//         </Card>
//       </Box>
//     </>
//   );
// };

// const ProfileField = ({ label, value }) => (
//   <Box
//     sx={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       fontSize: "17px",
//       py: "10px",
//     }}
//   >
//     <Typography
//       component="span"
//       sx={{ color: "rgb(30, 10, 80)", flex: 1, textAlign: "left" }}
//     >
//       {label}
//     </Typography>
//     <Typography
//       component="span"
//       sx={{ flex: 2, textAlign: "right", color: "#333", fontWeight: 500 }}
//     >
//       {value}
//     </Typography>
//   </Box>
// );

// export default InvestorProfile;
