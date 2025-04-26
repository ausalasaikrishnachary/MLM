import React, { useEffect, useState } from 'react';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import axios from 'axios';
import { Box, Avatar, Typography, Stack } from '@mui/material';

function MyTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const referralId = localStorage.getItem('referred_by');

  useEffect(() => {
    if (referralId) {
      axios
        .get(`https://rahul30.pythonanywhere.com/agents/referral-id/${referralId}/`)
        .then((response) => {
          setTeamMembers(response.data);
        })
        .catch((error) => {
          console.error('Error fetching team members:', error);
        });
    }
  }, [referralId]);

  return (
    <>
      <PartnerHeader />
      <Box
        bgcolor="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        {/* Top Node (Red) */}
        <Box display="flex" flexDirection="column" alignItems="center" position="relative">
          <Avatar sx={{ bgcolor: 'red', width: 64, height: 64, border: '2px solid black' }}>
            <Typography variant="subtitle1" color="black">
              You
            </Typography>
          </Avatar>

          {/* Vertical Line */}
          <Box width="2px" height="40px" bgcolor="black" />

          {/* Horizontal Line Across All Children */}
          <Box position="relative"  width="100%">
            {/* Horizontal line */}
            <Box
            //   position="absolute"
              left="0"
              right="0"
              height="2px"
              bgcolor="black"
              zIndex={1}
            />

            {/* Child Agents */}
            <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={8}>
              {teamMembers.map((member, index) => (
                <Box key={member.user_id} display="flex" flexDirection="column" alignItems="center" position="relative">
                  {/* Vertical line from horizontal line to agent */}
                  <Box
                    position="absolute"
                    top={0}
                    width="2px"
                    height="24px"
                    bgcolor="black"
                    zIndex={2}
                  />

                  {/* Blue Circle */}
                  <Avatar sx={{ bgcolor: 'green', width: 50, height: 50, border: '2px solid black', mt: '24px' }}>
                    <Typography variant="caption" color="white">
                      {member.first_name}
                    </Typography>
                  </Avatar>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MyTeam;
