import React, { useEffect, useState } from 'react';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import axios from 'axios';
import { Box, Avatar, Typography, Stack } from '@mui/material';

function MyTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const referralId = localStorage.getItem('referral_id');

  useEffect(() => {
    if (referralId) {
      fetchTeamMembers(referralId, setTeamMembers);
    }
  }, [referralId]);

  // Fetch team members by referral ID
  const fetchTeamMembers = async (refId, setter) => {
    try {
      const response = await axios.get(`https://rahul30.pythonanywhere.com/agents/referral-id/${refId}/`);
      const membersWithChildren = response.data.users.map(member => ({
        ...member,
        children: [],
        expanded: false
      }));
      setter(membersWithChildren);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  // Toggle expanding a member
  const handleMemberClick = async (member) => {
    // If already expanded, collapse it
    if (member.expanded) {
      setTeamMembers(prevMembers =>
        prevMembers.map(m =>
          m.user_id === member.user_id ? { ...m, expanded: false, children: [] } : m
        )
      );
    } else {
      // Expand: fetch children
      try {
        const response = await axios.get(`https://rahul30.pythonanywhere.com/agents/referral-id/${member.referral_id}/`);
        const children = response.data.users.map(child => ({
          ...child,
          children: [],
          expanded: false
        }));

        setTeamMembers(prevMembers =>
          prevMembers.map(m =>
            m.user_id === member.user_id ? { ...m, expanded: true, children } : m
          )
        );
      } catch (error) {
        console.error('Error fetching child agents:', error);
      }
    }
  };

  const renderMembers = (members) => (
    <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={8}>
      {members.map((member) => (
        <Box key={member.user_id} display="flex" flexDirection="column" alignItems="center" position="relative">
          {/* Vertical line from parent to agent */}
          <Box position="absolute" top={0} width="2px" height="24px" bgcolor="black" zIndex={2} />

          {/* Green Circle for agent */}
          <Avatar
            sx={{ bgcolor: 'green', width: 50, height: 50, border: '2px solid black', mt: '24px', cursor: 'pointer' }}
            onClick={() => handleMemberClick(member)}
          >
            <Typography variant="caption" color="white">
              {member.first_name}
            </Typography>
          </Avatar>

          {/* Render child members if expanded */}
          {member.expanded && member.children.length > 0 && (
            <Box >
              {/* Vertical Line */}
              <Box width="2px" height="40px" bgcolor="black" margin="auto" />
              {/* Horizontal Line */}
              <Box position="relative" width="100%">
                <Box height="2px" bgcolor="black" />
                {/* Child Agents */}
                {renderMembers(member.children)}
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  );

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
        {/* Top Node (You) */}
        <Box display="flex" flexDirection="column" alignItems="center" position="relative">
          <Avatar sx={{ bgcolor: 'red', width: 64, height: 64, border: '2px solid black' }}>
            <Typography variant="subtitle1" color="black">
              You
            </Typography>
          </Avatar>

          {/* Vertical Line */}
          <Box width="2px" height="40px" bgcolor="black" />

          {/* Direct Team Members */}
          <Box position="relative" width="100%">
            <Box height="2px" bgcolor="black" />
            {renderMembers(teamMembers)}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MyTeam;