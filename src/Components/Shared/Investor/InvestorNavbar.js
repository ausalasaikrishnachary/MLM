import React, { useState, useEffect } from 'react';
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
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { baseurl } from '../../BaseURL/BaseURL';
import { Badge, Menu as MuiMenu } from '@mui/material';
import axios from 'axios';

export default function InvestorHeader() {
  // Define nav items with navigation paths.
  const navItems = [
    { label: 'Dashboard', path: '/i-dashboard' },
    { label: 'My Properties', path: '/i-myassets' },
    { label: 'Properties', path: '/i-asset' },
    { label: 'Transactions', path: '/i-transactions' }, // Direct link to transactions page
    { label: 'Plans', path: '/i-plans' },
  ];

    const userId = localStorage.getItem("user_id");
    const [notifications, setNotifications] = useState([]);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    const notificationMenuOpen = Boolean(notificationAnchorEl);
  
    const handleNotificationClick = (event) => {
      setNotificationAnchorEl(event.currentTarget);
    };
    const handleNotificationClose = () => {
      setNotificationAnchorEl(null);
    };
  
      useEffect(() => {
      const fetchNotifications = () => {
        axios.get(`${baseurl}/notifications/user-id/${userId}/`)
          .then(response => {
            const unread = response.data.filter(n => !n.is_read);
            setNotifications(unread);
          })
          .catch(error => {
            console.error("Error fetching notifications:", error);
          });
      };
  
      fetchNotifications(); // Initial load
      const interval = setInterval(fetchNotifications, 10000); // Every 10s
      return () => clearInterval(interval);
    }, [userId]);

  // Responsive helper.
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Navigation hooks.
  const navigate = useNavigate();
  const location = useLocation();

  // State for mobile drawer.
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // State for the Profile Avatar dropdown menu.
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const profileMenuOpen = Boolean(profileAnchorEl);
  const handleAvatarClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  // Drawer content for mobile view with a close (cross) button.
  const drawer = (
    <Box sx={{ width: 250 }}>
      {/* Drawer header with a close icon */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
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
                  fontSize: '16px',
                }}
              />
            </ListItemButton>
          </ListItem>
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
            // Mobile / iPad Layout.
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
                <Link to="/i-dashboard" style={{ textDecoration: 'none', color: '#333333' }}>
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
                <IconButton sx={{ color: '#000' }} onClick={handleNotificationClick}>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
                <Typography
                  sx={{
                    ml: 2,
                    mr: 2,
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '16px',
                  }}
                >
                  Client
                </Typography>
                <Avatar
                  onClick={handleAvatarClick}
                  sx={{ width: 40, height: 40, cursor: 'pointer' }}
                  alt="Profile Avatar"
                  src="https://via.placeholder.com/40"
                />
              </Box>
            </Box>
          ) : (
            // Desktop Layout.
            <>
              {/* Left: Logo */}
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/i-dashboard" style={{ textDecoration: 'none', color: '#333333' }}>
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
              </Typography>

              {/* Center: Nav Items */}
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    sx={{
                      color: location.pathname === item.path ? 'blue' : '#000',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      fontSize: '16px',
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              {/* Right: Notification, Username, Profile Avatar */}
                <IconButton sx={{ color: '#000' }} onClick={handleNotificationClick}>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <Typography
                sx={{
                  ml: 2,
                  mr: 2,
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                Client
              </Typography>
              <Avatar
                onClick={handleAvatarClick}
                sx={{ width: 40, height: 40, cursor: 'pointer' }}
                alt="Investor"
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

      {/* Profile Avatar Dropdown Menu */}
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
            navigate('/i-profile');
          }}
          sx={{ fontWeight: 'bold', fontSize: '16px' }}
        >
          Profile
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/i-profiledetails');
          }}
          sx={{ fontWeight: 'bold', fontSize: '16px' }}
        >
          KYC
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/login');
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

        <MuiMenu
        anchorEl={notificationAnchorEl}
        open={notificationMenuOpen}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <MenuItem
              key={notif.notification_status_id}
              onClick={() => {
                axios.post(`${baseurl}/notifications/mark-as-read/`, {
                  user_id: parseInt(userId),
                  notification_id: notif.notification_status_id
                })
                  .then(() => {
                    setNotifications(prev => prev.filter(n => n.notification_status_id !== notif.notification_status_id));
                    handleNotificationClose();
                    navigate('/i-asset');
                  })
                  .catch(error => {
                    console.error("Error marking notification as read:", error);
                  });
              }}
            >
              {notif.message}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No notifications</MenuItem>
        )}
      </MuiMenu>
    </>
  );
}