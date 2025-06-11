import React, { useState, useRef } from 'react';
import Logo from '../../../Images/logo.png';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { NavLink, Link } from 'react-router-dom';

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorInvest, setAnchorInvest] = useState(null);
  const [anchorAbout, setAnchorAbout] = useState(null);
  const investTimerRef = useRef(null);
  const aboutTimerRef = useRef(null);

  const handleInvestButtonMouseEnter = (event) => {
    if (investTimerRef.current) clearTimeout(investTimerRef.current);
    setAnchorInvest(event.currentTarget);
  };

  const handleInvestButtonMouseLeave = () => {
    investTimerRef.current = setTimeout(() => setAnchorInvest(null), 300);
  };

  const handleInvestMenuMouseEnter = () => {
    if (investTimerRef.current) clearTimeout(investTimerRef.current);
  };

  const handleInvestMenuMouseLeave = () => {
    investTimerRef.current = setTimeout(() => setAnchorInvest(null), 300);
  };

  const handleAboutButtonMouseEnter = (event) => {
    if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current);
    setAnchorAbout(event.currentTarget);
  };

  const handleAboutButtonMouseLeave = () => {
    aboutTimerRef.current = setTimeout(() => setAnchorAbout(null), 300);
  };

  const handleAboutMenuMouseEnter = () => {
    if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current);
  };

  const handleAboutMenuMouseLeave = () => {
    aboutTimerRef.current = setTimeout(() => setAnchorAbout(null), 300);
  };

  const navItems = [
    { label: 'How it works', path: '/aboutus' },
    { label: 'Properties', path: '/properties' },
    { label: 'Contact us', path: '/contactus' },
    { label: 'FAQs', path: '/FAQ' },
  ];

  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  const toggleMobileSubmenu = (label) => {
    setMobileSubmenuOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1,
          justifyContent: 'flex-end',
        }}
      >
        <IconButton onClick={() => setMobileOpen(false)}>
          <CloseIcon sx={{ color: '#333333' }} />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Box key={item.label}>
            <ListItem
              button
              component={NavLink}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              sx={{
                textDecoration: 'none',
                '&.active .MuiListItemText-primary': {
                  color: '#2E166D',
                  textDecoration: 'underline',
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  color: '#333333',
                  fontSize: '16px',
                  fontFamily: 'Calibre, sans-serif',
                  fontWeight: 'bold',
                }}
              />
            </ListItem>
          </Box>
        ))}
        <Divider />
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#ffffff',
          color: '#333333',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton edge="start" onClick={() => setMobileOpen(true)}>
                <MenuIcon sx={{ color: '#333333' }} />
              </IconButton>
              <Box display="flex" justifyContent="center" flexGrow={1}>
                <Link to="/" style={{ textDecoration: 'none', color: '#333333' }}>
                   <img
                    src={Logo}
                    alt="logo"
                    style={{
                      height: '50px',
                      width: 'auto',
                      maxWidth: '150px',
                    }}
                  />
                </Link>
              </Box>
              <Button
                variant="outlined"
                component={NavLink}
                to="/signup"
                sx={{
                  mr: 1,
                  fontSize: '16px',
                  fontFamily: 'Calibre, sans-serif',
                  fontWeight: 'bold',
                  borderColor: '#2d1656',
                  color: '#2d1656',
                  '&.active': {
                    backgroundColor: '#2d1656',
                    color: '#ffffff',
                  },
                }}
              >
                Sign up
              </Button>

              <Button
                variant="outlined"
                component={NavLink}
                to="/login"
                sx={{
                  mr: 1,
                  fontSize: '16px',
                  fontFamily: 'Calibre, sans-serif',
                  fontWeight: 'bold',
                  borderColor: '#2d1656',
                  color: '#2d1656',
                  '&.active': {
                    backgroundColor: '#2d1656',
                    color: '#ffffff',
                  },
                }}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#333333' }}>
                   <img
                    src={Logo}
                    alt="logo"
                    style={{
                      height: '80px',
                      width: 'auto',
                      maxWidth: '150px',
                    }}
                  />
                </Link>
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexGrow: 1,
                  fontSize: '16px',
                  fontFamily: 'Calibre, sans-serif',
                  color: '#333333',
                  gap: 2,
                }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={NavLink}
                    to={item.path}
                    sx={{
                      fontFamily: 'Calibre, sans-serif',
                      fontWeight: 'bold',
                      color: '#333333',
                      textTransform: 'none',
                      textDecoration: 'none',
                      '&.active': {
                        color: '#0000FF',
                      },
                      fontSize: '16px',
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              <Button
                variant="outlined"
                component={NavLink}
                to="/signup"
                sx={{
                  mr: 1,
                  fontSize: '16px',
                  fontFamily: 'Calibre, sans-serif',
                  fontWeight: 'bold',
                  borderColor: '#2d1656',
                  color: '#2d1656',
                  '&.active': {
                    backgroundColor: '#2d1656',
                    color: '#ffffff',
                  },
                }}
              >
                Sign up
              </Button>

              <Button
                variant="outlined"
                component={NavLink}
                to="/login"
                sx={{
                  mr: 1,
                  fontSize: '16px',
                  fontFamily: 'Calibre, sans-serif',
                  fontWeight: 'bold',
                  borderColor: '#2d1656',
                  color: '#2d1656',
                  '&.active': {
                    backgroundColor: '#2d1656',
                    color: '#ffffff',
                  },
                }}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        {drawer}
      </Drawer>
    </>
  );
}

export default Header;
