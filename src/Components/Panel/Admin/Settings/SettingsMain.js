import React, { useState } from 'react';
import { Box, Tabs, Tab, Container } from '@mui/material';
import Header from "../../../Shared/Navbar/Navbar";
import ReferralPrefix from './ReferralPrefix';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function SettingsMain() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab 
              label="Referral Prefix" 
              id="settings-tab-0"
              sx={{ fontWeight: 'bold', fontSize: '16px' }}
            />
            {/* Add more tabs here as needed */}
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <ReferralPrefix />
        </TabPanel>
      </Container>
    </>
  );
}

export default SettingsMain;