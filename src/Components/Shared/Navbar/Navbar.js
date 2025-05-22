import React, { useState } from 'react';
import Logo from '../../Images/logo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Header() {
  // Navigation items with Operations dropdown
  const navItems = [
    { label: 'Dashboard', path: '/a-dashboard' },
    { label: 'Properties', path: '/a-asset' },
    { label: 'Users', path: '/a-investormanagement' },
    { 
      label: 'Operations', 
      subItems: [
        { label: 'Transactions', path: '/a-transactionmoniter' },
        { label: 'Commission', path: '/a-commission' },
        { label: 'Subscriptions', path: '/a-subscriptions' },
        { label: 'Booking Slab', path: '/a-bookingslab' },
        { label: 'KYC', path: '/a-profiledetails' },
      ]
    },
    // { label: 'Agents', path: '/a-partners' },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  // State for mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // State for Profile Avatar dropdown menu
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const profileMenuOpen = Boolean(profileAnchorEl);
  const handleAvatarClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  // State for Operations dropdown menu
  const [operationsAnchorEl, setOperationsAnchorEl] = useState(null);
  const operationsMenuOpen = Boolean(operationsAnchorEl);
  const handleOperationsClick = (event) => {
    setOperationsAnchorEl(event.currentTarget);
  };
  const handleOperationsMenuClose = () => {
    setOperationsAnchorEl(null);
  };

  // Check if any sub-item is active for highlighting the Operations button
  const isOperationsActive = navItems
    .find(item => item.label === 'Operations')
    ?.subItems.some(subItem => location.pathname === subItem.path);

  // Drawer content for mobile view
  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {navItems.map((item) => (
          <React.Fragment key={item.label}>
            {item.path ? (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleDrawerToggle();
                    navigate(item.path);
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      color: location.pathname === item.path ? 'blue' : 'inherit',
                      fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                      fontSize: '16px',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isOperationsActive ? 'bold' : 'normal',
                        fontSize: '16px',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                {item.subItems.map((subItem) => (
                  <ListItem key={subItem.label} disablePadding sx={{ pl: 4 }}>
                    <ListItemButton
                      onClick={() => {
                        handleDrawerToggle();
                        navigate(subItem.path);
                      }}
                    >
                      <ListItemText
                        primary={subItem.label}
                        primaryTypographyProps={{
                          color: location.pathname === subItem.path ? 'blue' : 'inherit',
                          fontWeight: location.pathname === subItem.path ? 'bold' : 'normal',
                          fontSize: '14px',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white',
          color: '#000',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: '64px' }}>
          {isMobile ? (
            // Mobile Layout
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>

              <Box display="flex" justifyContent="center" flexGrow={1}>
                <Link to="/a-dashboard" style={{ textDecoration: 'none', color: '#333333' }}>
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

              <Box display="flex" alignItems="center">
                <IconButton sx={{ color: '#000' }}>
                  <NotificationsNoneIcon />
                </IconButton>
                <Avatar
                  onClick={handleAvatarClick}
                  sx={{ width: 40, height: 40, cursor: 'pointer', ml: 2 }}
                  alt="Profile Avatar"
                  src="https://via.placeholder.com/40"
                />
              </Box>
            </Box>
          ) : (
            // Desktop Layout
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
                <Link to="/a-dashboard" style={{ textDecoration: 'none', color: '#333333' }}>
                  <img
                    src={Logo}
                    alt="logo"
                    style={{
                      height: '75px',
                      width: 'auto',
                      maxWidth: '150px',
                      paddingTop: "8px"
                    }}
                  />
                </Link>
              </Box>

              {/* Navigation Items */}
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
                {navItems.map((item) => (
                  item.path ? (
                    <Button
                      key={item.label}
                      onClick={() => navigate(item.path)}
                      sx={{
                        color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                        fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                        textTransform: 'none',
                        fontSize: '16px',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  ) : (
                    <Button
                      key={item.label}
                      onClick={handleOperationsClick}
                      endIcon={<ArrowDropDownIcon />}
                      sx={{
                        color: isOperationsActive ? 'primary.main' : 'text.primary',
                        fontWeight: isOperationsActive ? 'bold' : 'normal',
                        textTransform: 'none',
                        fontSize: '16px',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  )
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <IconButton sx={{ color: 'text.primary' }}>
                  <NotificationsNoneIcon />
                </IconButton>
                <Avatar
                  onClick={handleAvatarClick}
                  sx={{ width: 40, height: 40, cursor: 'pointer', ml: 2 }}
                  alt="Admin"
                  src="https://via.placeholder.com/40"
                />
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Operations Dropdown Menu */}
      <Menu
        anchorEl={operationsAnchorEl}
        open={operationsMenuOpen}
        onClose={handleOperationsMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: '8px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {navItems.find(item => item.label === 'Operations')?.subItems.map((subItem) => (
          <MenuItem
            key={subItem.label}
            onClick={() => {
              handleOperationsMenuClose();
              navigate(subItem.path);
            }}
            sx={{
              fontSize: '14px',
              fontWeight: location.pathname === subItem.path ? 'bold' : 'normal',
              color: location.pathname === subItem.path ? 'primary.main' : 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            {subItem.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Profile Dropdown Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={profileMenuOpen}
        onClose={handleProfileMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: '8px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/a-profile');
          }}
          sx={{
            fontSize: '14px',
            fontWeight: 'medium',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/a-profiledetails');
          }}
          sx={{
            fontSize: '14px',
            fontWeight: 'medium',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          KYC
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/');
          }}
          sx={{
            fontSize: '14px',
            fontWeight: 'medium',
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <LogoutIcon sx={{ mr: 1, fontSize: '18px' }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}