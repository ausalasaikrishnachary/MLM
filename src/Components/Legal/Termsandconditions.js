import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import LegalNavbar from '../Shared/LegalNavbar';
import { useNavigate } from 'react-router-dom';

const Termsandconditions = () => {
    const sectionTitleStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '20px',
    };
    const navigate = useNavigate();


    return (

        <>
            <LegalNavbar />
            <Box
                sx={{
                    height: '100vh',
                    // backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    mt:-15,
                    
                    
                  

                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: '100%',
                        maxWidth: 900,
                        height: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 2,
                        overflow: 'hidden',
                        mt:16,
                    }}
                >
                    {/* Fixed Header */}
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
                            Terms and Conditions
                        </Typography>
                        <Typography variant="body2">
                            <strong>Effective Date:</strong> June 9, 2025
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
                        <Typography style={sectionTitleStyle}>1. Introduction</Typography>
                        <Typography variant="body2">
                            Welcome to Shriraj, a real estate platform designed to help users buy, sell, rent, or lease properties such as land, flats, and buildings.
                            By accessing or using our application, you agree to comply with and be bound by the following terms and conditions.
                        </Typography>

                        <Typography style={sectionTitleStyle}>2. Terms of Use for Users</Typography>
                        <ul>
                            <li>By expressing interest in any property or service, you authorize us and our affiliates to contact you...</li>
                            <li>You consent to share your personal details and uploaded documents...</li>
                            <li>We are not responsible for how third parties use your data after it is shared...</li>
                            <li>Information shared publicly may be viewed globally...</li>
                            <li>You are responsible for managing your privacy settings...</li>
                            <li>Signing in via third-party platforms allows us to access basic public information...</li>
                        </ul>

                        <Typography style={sectionTitleStyle}>3. User Roles</Typography>
                        <ul>
                            <li><strong>Client</strong> – Can browse, inquire, and initiate transactions for properties.</li>
                            <li><strong>Agent</strong> – Can list properties, manage inquiries, and assist clients.</li>
                            <li><strong>Admin</strong> – Oversees the platform, manages users, and resolves disputes.</li>
                        </ul>

                        <Typography style={sectionTitleStyle}>4. Services Offered</Typography>
                        <ul>
                            <li>Buy properties</li>
                            <li>Sell properties</li>
                            <li>Rent properties</li>
                            <li>Lease properties</li>
                        </ul>

                        <Typography style={sectionTitleStyle}>5. User Responsibilities</Typography>
                        <ul>
                            <li>Provide accurate, complete, and updated information.</li>
                            <li>Maintain confidentiality of login credentials.</li>
                            <li>Use the platform only for lawful and intended purposes.</li>
                        </ul>

                        <Typography style={sectionTitleStyle}>6. Property Listings</Typography>
                        <Typography variant="body2">
                            Agents and admins must ensure all listings are accurate and legal...
                        </Typography>

                        <Typography style={sectionTitleStyle}>7. Communication & Interaction</Typography>
                        <Typography variant="body2">
                            Users agree to receive communications from us... Harassment or abuse is prohibited.
                        </Typography>

                        <Typography style={sectionTitleStyle}>8. Payments</Typography>
                        <Typography variant="body2">
                            Fees (if applicable) must be paid promptly. Payment gateways are secure third-party services.
                        </Typography>

                        <Typography style={sectionTitleStyle}>9. Account Termination</Typography>
                        <Typography variant="body2">
                            We reserve the right to suspend or terminate accounts that violate these terms.
                        </Typography>

                        <Typography style={sectionTitleStyle}>10. Limitation of Liability</Typography>
                        <Typography variant="body2">
                            Shriraj is not responsible for disputes between clients and agents... Users must conduct due diligence.
                        </Typography>

                        <Typography style={sectionTitleStyle}>11. Governing Law</Typography>
                        <Typography variant="body2">These terms shall be governed by the laws of India.</Typography>

                        <Typography style={sectionTitleStyle}>12. Terms for Dealers, Builders, Banks, and Payment Gateways</Typography>
                        <ul>
                            <li>Comply with data protection laws in collecting user data.</li>
                            <li>Data must only be used for agreed-upon purposes and kept secure.</li>
                            <li>Respond to user data access/deletion requests per law.</li>
                            <li>Do not share data with sub-processors unless compliant.</li>
                            <li>Delete/anonymize data when no longer needed.</li>
                            <li>Notify us of any data breach immediately.</li>
                        </ul>
                    </Box>

                    {/* Buttons */}
                    <Box
                        sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderTop: '1px solid #e0e0e0',
                            backgroundColor: '#fff',
                        }}
                    >
                     <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate('/')}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
      >
        I have read and accept the terms of service
      </Button>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default Termsandconditions;
