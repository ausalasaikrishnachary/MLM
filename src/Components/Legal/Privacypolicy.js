// import React from 'react';
// import { Box, Button, Typography, Paper } from '@mui/material';
// import LegalNavbar from '../Shared/LegalNavbar';
// import { useNavigate } from 'react-router-dom';

// const Privacypolicy = () => {
//   const sectionTitleStyle = {
//     fontSize: '16px',
//     fontWeight: 'bold',
//     marginTop: '20px',
//   };
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* <LegalNavbar /> */}

//       <Box
//         sx={{
//           height: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           p: 2,
//           mt: -15,
//         }}
//       >
//           <Paper
//             elevation={3}
//             sx={{
//               width: '100%',
//               maxWidth: 900,
//               height: '80vh',
//               display: 'flex',
//               flexDirection: 'column',
//               borderRadius: 2,
//               overflow: 'hidden',
//               mt: 16,
//             }}
//           >
//             {/* Header */}
//             <Box
//               sx={{
//                 position: 'sticky',
//                 top: 0,
//                 backgroundColor: 'white',
//                 zIndex: 1,
//                 p: 3,
//                 borderBottom: '1px solid #e0e0e0',
//               }}
//             >
//               <Typography variant="h6" fontWeight="bold">
//                 Privacy Policy
//               </Typography>
//             </Box>

//             {/* Scrollable Content */}
//             <Box
//               sx={{
//                 overflowY: 'auto',
//                 flex: 1,
//                 px: 3,
//                 pt: 2,
//                 pb: 1,
//                 backgroundColor: '#fff',
//               }}
//             >
//               <Typography variant="body2" paragraph>
//                 We, Shriraj Property Solutions Pvt. Ltd. and our affiliated companies worldwide, are committed to respecting your online privacy and recognize your need for appropriate protection and management of any personally identifiable information you share with us.
//               </Typography>

//               <Typography variant="body2" paragraph>
//                 This Privacy Policy (“Policy”) governs our website available at www.shrirajteam.com and our mobile application (collectively, the “Platform”). The Policy describes how Shriraj Property Solutions Pvt. Ltd. (hereinafter referred to as the “Company”) collects, uses, discloses and transfers personal data of users while browsing the Platform or availing specific services therein (the “Services”).
//               </Typography>

//               <Typography variant="body2" paragraph>
//                 This Policy describes how we process personal data of all users of our Platform or Services, including buyers, renters, owners, dealers, brokers, and website visitors.
//               </Typography>

//               <Typography variant="body2" paragraph>
//                 If you wish to access, verify, correct, complete, update or erase any of your Personal Data collected through the Platforms or Services, you may write to us at <strong>shrirajteam@gmail.com</strong>.
//               </Typography>

//               <Typography variant="body2" paragraph>
//                 You may withdraw your consent for any or all processing of your Personal Data by contacting <strong>shrirajteam@gmail.com</strong>. Do note however, that the Company reserves the right to refuse to provide you access to the Platform and Services in circumstances where such Personal Data is essential to the provision of the Platform and Services.
//               </Typography>

//               <Typography variant="body2" paragraph>
//                 We (or our service providers or partners) may communicate with you through voice calls, text messages, emails, Platform notifications, or other means. The communication may relate to:
//                 <ul>
//                   <li>Your purchases, payments, or other messages related to your use of the Platform</li>
//                   <li>Offers or promotions about our Platform, new features or Services</li>
//                 </ul>
//                 You may opt out of receiving promotional offers by writing to our grievance officer. We may still need to send you non-promotional communication (information about the Platforms and Services).
//               </Typography>

//               <Typography variant="body2" paragraph>
//                 Please note that the Platform sometimes displays advertisements or contains links to third-party websites that may collect personal data, and those are not governed by this Policy. The Company will not be responsible for the privacy practices of such websites. The Company recommends that you review the privacy policy of each third-party site linked from the Platform to determine their use of your Personal Data.
//               </Typography>

//               <Typography variant="body2" paragraph>
//                 The Platform reserves the right to update, change or modify this Policy at any time. The Policy shall come into effect from the date of such update, change or modification.
//               </Typography>
//             </Box>

//             {/* Action Buttons */}
//             <Box
//               sx={{
//                 p: 2,
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 borderTop: '1px solid #e0e0e0',
//                 backgroundColor: '#fff',
//               }}
//             >
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 onClick={() => navigate('/login')}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => navigate('/login')}
//               >
//                 I have read and accept the Privacy Policy
//               </Button>
//             </Box>
//           </Paper>
//       </Box>
//     </>
//   );
// };

// export default Privacypolicy;



import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Privacypolicy = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          mt: -15,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            maxWidth: 900,
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
            mt: 16,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              backgroundColor: 'white',
              zIndex: 1,
              p: 3,
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Privacy Policy
            </Typography>
          </Box>

          {/* Scrollable Content */}
          <Box
            sx={{
              overflowY: 'auto',
              flex: 1,
              px: 3,
              pt: 2,
              pb: 1,
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="body2" paragraph>
              This Privacy Policy applies to the Shriraj Property Solutions Pvt. Ltd. mobile application and the website www.shrirajteam.com, operated by Shriraj Property Solutions Pvt. Ltd.
            </Typography>

            <Typography variant="body2" paragraph>
              We, Shriraj Property Solutions Pvt. Ltd. and our affiliated companies worldwide, are committed to respecting your online privacy and recognize your need for appropriate protection and management of any personally identifiable information you share with us.
            </Typography>

            <Typography variant="body2" paragraph>
              This Privacy Policy ("Policy") governs our website available at www.shrirajteam.com and our mobile application (collectively, the "Platform"). The Policy describes how Shriraj Property Solutions Pvt. Ltd. (hereinafter referred to as the "Company") collects, uses, discloses and transfers personal data of users while browsing the Platform or availing specific services therein (the "Services").
            </Typography>

            <Typography variant="body2" paragraph>
              This Policy describes how we process personal data of all users of our Platform or Services, including buyers, renters, owners, dealers, brokers, and website visitors.
            </Typography>

            <Typography variant="body2" paragraph>
              If you wish to access, verify, correct, complete, update or erase any of your Personal Data collected through the Platforms or Services, you may write to us at <strong>shrirajteam@gmail.com</strong>.
            </Typography>

            <Typography variant="body2" paragraph>
              You may withdraw your consent for any or all processing of your Personal Data by contacting <strong>shrirajteam@gmail.com</strong>. Do note however, that the Company reserves the right to refuse to provide you access to the Platform and Services in circumstances where such Personal Data is essential to the provision of the Platform and Services.
            </Typography>

            <Typography variant="body2" paragraph>
              We (or our service providers or partners) may communicate with you through voice calls, text messages, emails, Platform notifications, or other means. The communication may relate to:
              <ul>
                <li>Your purchases, payments, or other messages related to your use of the Platform</li>
                <li>Offers or promotions about our Platform, new features or Services</li>
              </ul>
              You may opt out of receiving promotional offers by writing to our grievance officer. We may still need to send you non-promotional communication (information about the Platforms and Services).
            </Typography>

            <Typography variant="body2" paragraph>
              Please note that the Platform sometimes displays advertisements or contains links to third-party websites that may collect personal data, and those are not governed by this Policy. The Company will not be responsible for the privacy practices of such websites. The Company recommends that you review the privacy policy of each third-party site linked from the Platform to determine their use of your Personal Data.
            </Typography>

            <Typography variant="body2" paragraph>
              The Platform reserves the right to update, change or modify this Policy at any time. The Policy shall come into effect from the date of such update, change or modification.
            </Typography>

            {/* Information We Collect Section */}
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>
              Information We Collect
            </Typography>
            <Typography variant="body2" paragraph>
              We may collect and process the following categories of personal information when you use our Platform:
              <ul>
                <li>Personal information such as name, email address, phone number</li>
                <li>Location information such as city, area, and property location</li>
                <li>Property-related information including property details, images, pricing, and descriptions submitted by users</li>
                <li>Account information such as login credentials</li>
                <li>Communications shared with us via email, phone, or in-app support</li>
                <li>Technical information such as device information and log data for improving app performance</li>
              </ul>
            </Typography>

            {/* How We Use Your Information Section */}
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>
              How We Use Your Information
            </Typography>
            <Typography variant="body2" paragraph>
              We use the collected information to:
              <ul>
                <li>Provide and operate our property buy, sell, and rent services</li>
                <li>Enable users to post, manage, and view property listings</li>
                <li>Facilitate communication between buyers, sellers, renters, and agents</li>
                <li>Improve our Platform, features, and user experience</li>
                <li>Respond to user queries, support requests, and complaints</li>
                <li>Send service-related notifications and important updates</li>
              </ul>
            </Typography>

            {/* Data Security Section */}
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>
              Data Security
            </Typography>
            <Typography variant="body2" paragraph>
              We implement reasonable security practices and procedures, including the use of secure servers and encryption in transit, to protect personal data from unauthorized access, disclosure, alteration, or destruction.
            </Typography>

            {/* Account Deletion Section */}
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>
              Account Deletion and Data Removal
            </Typography>
            <Typography variant="body2" paragraph>
              Users may request deletion of their account and associated personal data at any time by emailing us at <strong>shrirajteam@gmail.com</strong> with the subject line "Account Deletion Request".
            </Typography>
            <Typography variant="body2" paragraph>
              Upon receiving a valid request, we will delete or anonymize the user's personal data, including profile information and property listings, within a reasonable timeframe, unless retention is required by applicable law.
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid #e0e0e0',
              backgroundColor: '#fff',
              position: 'sticky',
              bottom: 0,
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/login')}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/login')}
            >
              I have read and accept the Privacy Policy
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Privacypolicy;