import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
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
            <Box
                sx={{
                    height: '100vh',
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
                        height: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 2,
                        overflow: 'hidden',
                        mt: 16,
                    }}
                >
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
                    </Box>

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
                        <Typography style={sectionTitleStyle}>1. Acceptance of Terms</Typography>
                        <Typography variant="body2">
                            By accessing our website (www.shrirajteam.com) or using our mobile application (collectively referred to as the "Platform"), you agree to the terms laid out by Shriraj Property Solutions Pvt. Ltd. and its affiliated companies.
                        </Typography>

                        <Typography style={sectionTitleStyle}>2. Non-Refundable Payments</Typography>
                        <Typography variant="body2">
                            The user agrees that the service fee and registration fee deposited through our Platform will not be refunded under any circumstances.
                        </Typography>

                        <Typography style={sectionTitleStyle}>3. Communication Consent</Typography>
                        <Typography variant="body2">
                            We (or our service providers/partners) may communicate with you via voice calls, SMS, emails, or Platform notifications regarding transactions or promotional content. You may opt out of promotional communications by contacting our grievance officer. Non-promotional messages may still be sent.
                        </Typography>

                        <Typography style={sectionTitleStyle}>4. Accuracy of Property Information</Typography>
                        <Typography variant="body2">
                            Users must enter correct and clear property details on the Platform. The Company will not be responsible for any incorrect entries made by users.
                        </Typography>

                        <Typography style={sectionTitleStyle}>5. Third-Party Links</Typography>
                        <Typography variant="body2">
                            Our Platform may display ads or contain links to third-party websites that may collect personal data. These sites are not governed by our terms, and the Company is not responsible for their practices. Users are advised to review the terms and policies of each linked third-party site.
                        </Typography>

                        <Typography style={sectionTitleStyle}>6. Modifications to Terms</Typography>
                        <Typography variant="body2">
                            The Platform reserves the right to update, change, or modify these Terms and Conditions at any time. Continued use of the Platform indicates acceptance of such updates.
                        </Typography>
                    </Box>

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
                            onClick={() => navigate('/login')}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/login')}
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
