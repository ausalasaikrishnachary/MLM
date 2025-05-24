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
        { label: 'Meetings', path: '/a-meetings' },
    // { label: 'Agents', path: '/a-partners' },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const user_name = localStorage.getItem("user_name");
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
                      fontWeight: 'bold',
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
                        fontWeight: 'bold',
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
                          fontWeight: 'bold',
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
          boxShadow: "-moz-initial"
        }}
      >
        <Toolbar>
          {isMobile ? (
            // Mobile / iPad Layout
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              {/* Left: Menu Icon */}
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>

              {/* Center: Logo */}
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

              {/* Right: Notification, Username, Profile Avatar */}
              <Box display="flex" alignItems="center">
                <IconButton sx={{ color: '#000' }}>
                  <NotificationsNoneIcon />
                </IconButton>
                <Typography sx={{ ml: 2, mr: 2, color: '#000', fontWeight: 'bold' }}>
                  {user_name}
                </Typography>
                <Avatar
                  onClick={handleAvatarClick}
                  sx={{ width: 40, height: 40, cursor: 'pointer' }}
                  alt="Admin"
                  src="https://via.placeholder.com/40"
                />
              </Box>
            </Box>
          ) : (
            // Desktop Layout
            <>
              {/* Left: Logo */}
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

              {/* Center: Nav Items */}
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
                {navItems.map((item) => (
                  item.path ? (
                    <Button
                      key={item.label}
                      onClick={() => navigate(item.path)}
                      sx={{
                        color: location.pathname === item.path ? 'blue' : '#000',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: "16px"
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
                        color: isOperationsActive ? 'blue' : '#000',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: "16px"
                      }}
                    >
                      {item.label}
                    </Button>
                  )
                ))}
              </Box>

              {/* Right: Notification, Username, Profile Avatar */}
              <IconButton sx={{ color: '#000' }}>
                <NotificationsNoneIcon />
              </IconButton>
              <Typography sx={{ ml: 2, mr: 2, color: '#000', fontWeight: 'bold' }}>
                {user_name}
              </Typography>
              <Avatar
                onClick={handleAvatarClick}
                sx={{ width: 40, height: 40, cursor: 'pointer' }}
                alt="Admin"
                src="https://via.placeholder.com/40"
              />
            </>
          )}
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </AppBar>

      {/* Operations Dropdown Menu */}
      <Menu
        anchorEl={operationsAnchorEl}
        open={operationsMenuOpen}
        onClose={handleOperationsMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {navItems.find(item => item.label === 'Operations')?.subItems.map((subItem) => (
          <MenuItem
            key={subItem.label}
            onClick={() => {
              handleOperationsMenuClose();
              navigate(subItem.path);
            }}
            sx={{
              fontWeight: 'bold',
              color: location.pathname === subItem.path ? 'blue' : 'inherit',
              fontSize: "16px"
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
      >
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/a-profile');
          }}
          sx={{ fontWeight: 'bold' }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/a-profiledetails');
          }}
          sx={{ fontWeight: 'bold' }}
        >
          KYC
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/');
          }}
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: "red",
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Logout <LogoutIcon sx={{ ml: 1 }} />
        </MenuItem>
      </Menu>
    </>
  );
}