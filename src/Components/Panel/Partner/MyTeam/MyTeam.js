import React, { useEffect, useState } from 'react';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import axios from 'axios';
import { Box, Avatar, Typography, Stack, Button } from '@mui/material';

function MyTeam() {
  const [currentAgent, setCurrentAgent] = useState(null);
  const [childAgents, setChildAgents] = useState([]);
  const [historyStack, setHistoryStack] = useState([]);

  const referralId = localStorage.getItem('referral_id');
  const agentName = localStorage.getItem('agent_name'); // Optional: assuming you store it

  useEffect(() => {
    if (referralId) {
      fetchAgentWithChildren(referralId).then((data) => {
        setCurrentAgent({ referral_id: referralId, first_name: agentName || 'You' });
        setChildAgents(data);
      });
    }
  }, [referralId]);

  const fetchAgentWithChildren = async (refId) => {
    try {
      const response = await axios.get(`https://rahul30.pythonanywhere.com/agents/referral-id/${refId}/`);
      return response.data.users.map(user => ({
        ...user,
        children: [],
        expanded: false,
      }));
    } catch (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
  };

  const handleAgentClick = async (agent) => {
    const children = await fetchAgentWithChildren(agent.referral_id);
    setHistoryStack(prev => [...prev, { agent: currentAgent, children: childAgents }]);
    setCurrentAgent(agent);
    setChildAgents(children);
  };

  const handleBack = () => {
    const last = historyStack.pop();
    if (last) {
      setCurrentAgent(last.agent);
      setChildAgents(last.children);
      setHistoryStack([...historyStack]);
    }
  };

  const renderMembers = (members) => (
    <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={8}>
      {members.map((member) => (
        <Box key={member.user_id} display="flex" flexDirection="column" alignItems="center" position="relative">
          {/* Vertical Line from parent */}
          <Box position="absolute" top={0} width="2px" height="24px" bgcolor="black" zIndex={2} />
  
          {/* Avatar */}
          <Avatar
            sx={{
              bgcolor: 'green',
              width: 50,
              height: 50,
              border: '2px solid black',
              mt: '24px',
              cursor: 'pointer'
            }}
            onClick={() => handleAgentClick(member)}
          />
  
          {/* Name and ID below Avatar */}
          <Typography variant="body2" align="center" mt={1} fontWeight="bold">
            {member.first_name}
          </Typography>
          <Typography variant="caption" align="center" color="textSecondary">
            {member.referral_id}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
  

  return (
    <>
      <PartnerHeader />
      <Box bgcolor="white" minHeight="100vh" p={4}>
        {/* Back Button aligned to the left */}
        {historyStack.length > 0 && (
          <Box mb={2}>
            <Button variant="outlined" color="primary" onClick={handleBack}>
              Back
            </Button>
          </Box>
        )}

        {/* Centered Content */}
        <Box display="flex" flexDirection="column" alignItems="center">
          {/* Current Agent */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: 'red', width: 64, height: 64, border: '2px solid black' }} />
            <Typography variant="subtitle1" mt={1} fontWeight="bold">
              {currentAgent?.first_name || 'You'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {currentAgent?.referral_id || ''}
            </Typography>
          </Box>


          {/* Vertical line */}
          <Box width="2px" height="40px" bgcolor="black" />

          {/* Children */}
          <Box position="relative">
            <Box height="2px" bgcolor="black" />
            {renderMembers(childAgents)}
          </Box>
        </Box>
      </Box>
    </>

  );
}

export default MyTeam;
