import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../../Shared/Partner/PartnerNavbar";
import { Box, Card, CardContent, Typography, Button, Grid, Avatar } from '@mui/material';

const profiles = [
  {
    id: 1,
    label: 'Admin',
    image: '/images/coach.png',
    buttonText: 'Request Meeting',
  },
  {
    id: 2,
    label: 'Sales & Marketing',
    image: '/images/psychologist.png',
    buttonText: 'Request Meeting',
  },
];

function Meetings() {
  const navigate = useNavigate();

  const handleRequestMeeting = () => {
    navigate("/p-meetingrequest");
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          {profiles.map((profile) => (
            <Grid item xs={12} sm={6} md={4} key={profile.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  textAlign: 'center',
                  background: 'linear-gradient(180deg, #fdf9ff 0%, #e7f2ff 100%)',
                  boxShadow: 3,
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      fontWeight: 500,
                      color: '#4A4A4A',
                    }}
                  >
                    {profile.label}
                  </Typography>

                  <Avatar
                    src={profile.image}
                    alt={profile.label}
                    sx={{
                      width: 100,
                      height: 100,
                      margin: '60px auto 20px',
                    }}
                  />

                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      borderRadius: 10,
                      px: 4,
                      py: 1.5,
                      fontWeight: 'bold',
                      backgroundColor: '#fff',
                      color: '#673ab7',
                      border: '2px solid #673ab7',
                      '&:hover': {
                        backgroundColor: '#f3e5f5',
                      },
                    }}
                    onClick={() => handleRequestMeeting()}
                  >
                    {profile.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Meetings;
