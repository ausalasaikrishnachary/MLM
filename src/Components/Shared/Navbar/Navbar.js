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
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { baseurl } from '../../BaseURL/BaseURL';
import { Badge, Menu as MuiMenu } from '@mui/material';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Header() {
  // Navigation items with Operations dropdown
  const navItems = [
    { label: 'Dashboard', path: '/a-dashboard' },
    { label: 'Properties', path: '/a-asset' },
    { label: 'Users', path: '/a-investormanagement' },
    {
      label: 'Operations',
      subItems: [
        { label: 'Company Commission', path: '/a-transactionmoniter' },
        { label: 'Agent Commission', path: '/a-commission' },
        { label: 'Subscriptions', path: '/a-subscriptions' },
        { label: 'Booking Slab', path: '/a-bookingslab' },
        { label: 'Training Material', path: '/a-trainingmaterial' },
        { label: 'Transaction', path: '/a-transactionsummary' },
        { label: 'Commission Master', path: '/a-commissionmaster' },
        { label: 'Create Category', path: '/a-category' },
      ]
    },
    { label: 'Meetings', path: '/a-meetings' },
    { label: 'Offer', path: '/a-table-carousel' },
    { label: 'Leads', path: '/a-popup-leads' },
    { label: 'Company', path: '/tableadminmeetings' },
    // { label: 'Agents', path: '/a-partners' },
  ];

  const userId = localStorage.getItem("user_id");
  const [notifications, setNotifications] = useState([]);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const notificationMenuOpen = Boolean(notificationAnchorEl);
  const goBack = () => navigate(-1);
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const user_name = localStorage.getItem("user_name");
  const navigate = useNavigate();
  const location = useLocation();

  const [showOperations, setShowOperations] = useState(false);

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
        // Main items with direct path
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
          {/* For items without path, like Operations */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                if (item.label === 'Operations') {
                  setShowOperations((prev) => !prev);
                }
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
              {item.label === 'Operations' && (
                <ArrowDropDownIcon
                  style={{
                    transform: showOperations ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>

          {/* Render subItems for expandable sections like Operations */}
          {item.label === 'Operations' && showOperations && item.subItems?.map((subItem) => (
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
                <IconButton sx={{ color: '#000' }} onClick={handleNotificationClick}>
                  <Badge badgeContent={notifications.length} color="error">
                    <NotificationsNoneIcon />
                  </Badge>
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

              <IconButton
                onClick={goBack}
                sx={{
                  backgroundColor: '#f0f0f0',
                  color: '#000',
                  borderRadius: '12px',
                  padding: '8px',
                  marginLeft: '20px', // left padding from edge of screen
                  marginRight: '10px', // space between button and logo
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <ArrowBackIcon />
              </IconButton>

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
              <IconButton sx={{ color: '#000' }} onClick={handleNotificationClick}>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsNoneIcon />
                </Badge>
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
        {/* <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/a-profiledetails');
          }}
          sx={{ fontWeight: 'bold' }}
        >
          KYC
        </MenuItem> */}
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
                    navigate('/a-asset');
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