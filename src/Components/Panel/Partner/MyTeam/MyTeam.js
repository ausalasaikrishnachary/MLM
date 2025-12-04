import React, { useEffect, useState } from 'react';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import axios from 'axios';
import { Box, Avatar, Typography, Stack, Button, Container, IconButton } from '@mui/material';
import { baseurl } from '../../../BaseURL/BaseURL';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

function MyTeam() {
  const [currentAgent, setCurrentAgent] = useState(null);
  const [childAgents, setChildAgents] = useState([]);
  const [historyStack, setHistoryStack] = useState([]);

  const referralId = localStorage.getItem('referral_id');
  const agentName = localStorage.getItem('agent_name');

  useEffect(() => {
    if (referralId) {
      fetchAgentWithChildren(referralId).then((data) => {
        setCurrentAgent({ referral_id: referralId, first_name: agentName || 'You' });
        setChildAgents(data);
      });
    }
  }, [referralId]);

  const fetchAgentWithChildren = async (refId) => {
    console.log('fetchAgentWithChildren called with refId:', refId);
    try {
      console.log('Making API request to:', `${baseurl}/agents/referral-id/${refId}/`);
      
      const response = await axios.get(`${baseurl}/agents/referral-id/${refId}/`);
      
      console.log('API response received:', response);
      console.log('Response data:', response.data);
      console.log('Agents found:', response.data.agents?.length || 0);
      
      const formattedAgents = response.data.agents.map(user => ({
        ...user,
        children: [],
        expanded: false,
      }));
      
      console.log('Formatted agents:', formattedAgents);
      return formattedAgents;
      
    } catch (error) {
      console.error('Error fetching agents:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        refId: refId
      });
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
    if (historyStack.length > 0) {
      const last = historyStack[historyStack.length - 1];
      setCurrentAgent(last.agent);
      setChildAgents(last.children);
      setHistoryStack(prev => prev.slice(0, -1));
    }
  };

  // Scroll functions
  const scrollContainerRef = React.useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const renderMembers = (members) => (
    <Box sx={{ 
      width: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Left scroll button */}
      {members.length > 5 && (
        <IconButton 
          onClick={scrollLeft}
          sx={{ 
            position: 'absolute', 
            left: 0, 
            zIndex: 10,
            bgcolor: 'white',
            boxShadow: 2,
            '&:hover': { bgcolor: 'grey.100' }
          }}
        >
          <ChevronLeft />
        </IconButton>
      )}

      {/* Main container with connecting lines */}
      <Box sx={{ 
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Horizontal connecting line above all children */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            bgcolor: 'black',
            zIndex: 1
          }} 
        />

        {/* Scrollable container for agents */}
        <Box 
          ref={scrollContainerRef}
          sx={{ 
            display: 'flex',
            overflowX: 'auto',
            scrollbarWidth: 'thin',
            gap: 4,
            py: 3,
            px: 2,
            width: '100%',
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          {members.map((member, index) => (
            <Box 
              key={member.user_id || index} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                minWidth: 120,
                flexShrink: 0,
                position: 'relative'
              }}
            >
              {/* Vertical Line from parent to each child */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: -22,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '2px', 
                  height: '22px', 
                  bgcolor: 'black', 
                  zIndex: 2 
                }} 
              />

              {/* Avatar */}
              <Avatar
                sx={{
                  bgcolor: 'green',
                  width: 60,
                  height: 60,
                  border: '2px solid black',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 3,
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'transform 0.2s'
                  }
                }}
                onClick={() => handleAgentClick(member)}
              />

              {/* Name and ID below Avatar */}
              <Typography 
                variant="body2" 
                align="center" 
                mt={1} 
                fontWeight="bold" 
                sx={{ 
                  maxWidth: 100,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {member.first_name}
              </Typography>
              <Typography 
                variant="caption" 
                align="center" 
                color="textSecondary"
                sx={{ 
                  maxWidth: 100,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {member.referral_id}
              </Typography>
              
              {/* Show child count if any */}
              {member.children_count > 0 && (
                <Typography variant="caption" color="primary" sx={{ mt: 0.5 }}>
                  {member.children_count} ↓
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right scroll button */}
      {members.length > 5 && (
        <IconButton 
          onClick={scrollRight}
          sx={{ 
            position: 'absolute', 
            right: 0, 
            zIndex: 10,
            bgcolor: 'white',
            boxShadow: 2,
            '&:hover': { bgcolor: 'grey.100' }
          }}
        >
          <ChevronRight />
        </IconButton>
      )}
    </Box>
  );

  return (
    <>
      <PartnerHeader />
      <Box bgcolor="white" minHeight="100vh">
        <Container maxWidth="xl">
          {/* Back Button */}
          {historyStack.length > 0 && (
            <Box mb={2} mt={2}>
              <Button variant="outlined" color="primary" onClick={handleBack}>
                Back to {historyStack[historyStack.length - 1]?.agent?.first_name || 'Previous'}
              </Button>
            </Box>
          )}

          {/* Stats bar */}
          {/* <Box mb={4} p={2} bgcolor="#f5f5f5" borderRadius={2}>
            <Typography variant="h6">
              {currentAgent?.first_name || 'You'} ({currentAgent?.referral_id || ''})
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Direct Members: {childAgents.length}
            </Typography>
          </Box> */}

          {/* Centered Content */}
          <Box display="flex" flexDirection="column" alignItems="center">
            {/* Current Agent */}
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
              <Avatar 
                sx={{ 
                  bgcolor: 'red', 
                  width: 80, 
                  height: 80, 
                  border: '3px solid black',
                  mb: 1
                }} 
              />
              <Typography variant="h6" fontWeight="bold">
                {currentAgent?.first_name || 'You'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {currentAgent?.referral_id || ''}
              </Typography>
              <Typography variant="caption" color="primary" sx={{ mt: 1 }}>
                Direct Team: {childAgents.length} members
              </Typography>
            </Box>

            {/* Vertical line from parent to horizontal line */}
            {childAgents.length > 0 && (
              <Box 
                sx={{ 
                  width: '2px', 
                  height: '40px', 
                  bgcolor: 'black',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    bgcolor: 'black'
                  }
                }} 
              />
            )}

            {/* Children Section */}
            {childAgents.length > 0 ? (
              <>
                {/* <Typography variant="h6" mb={2}>
                  Direct Members ({childAgents.length})
                </Typography> */}
                
                {renderMembers(childAgents)}
              </>
            ) : (
              <Box textAlign="center" py={4}>
                <Typography variant="body1" color="textSecondary">
                  No direct members found
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default MyTeam;