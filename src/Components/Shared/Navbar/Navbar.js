import React, { useState, useEffect } from 'react';
import Logo from '../../Images/logo1.png';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { baseurl } from '../../BaseURL/BaseURL';
import { Badge, Menu as MuiMenu } from '@mui/material';
import axios from 'axios';
import './Navbar.css'; // Import the updated CSS file

export default function Header() {

  const [subscriptionPaid, setSubscriptionPaid] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const userId = localStorage.getItem("user_id");


  // ✅ Subscription check
  useEffect(() => {
    if (userId) {
      axios
        .get(`${baseurl}/user-subscriptions/user-id/${userId}/`)
        .then((response) => {
          const latest = response.data.find(
            (item) => item.latest_status !== undefined
          );
          setSubscriptionPaid(latest?.latest_status === "paid");
        })
        .catch((error) => {
          console.error("Subscription fetch error:", error);
        });
    }
  }, [userId]);


  // Navigation items with Operations dropdown
  const navItems = [
    { label: 'Dashboard', path: '/a-dashboard' },
    { label: 'Properties', path: '/a-asset' },
    { label: 'Add Property', path: '/a-addasset' },
    { label: 'Users', path: '/a-investormanagement' },
    {
      label: 'Operations',
      subItems: [
        { label: 'Company Commission', path: '/a-transactionmoniter' },
        { label: 'Team Commission', path: '/a-commission' },
        { label: 'Subscriptions', path: '/a-subscriptions' },
        { label: 'Booking Slab', path: '/a-bookingslab' },
        { label: 'Training Material', path: '/a-trainingmaterial' },
         { label: 'How It Works', path: '/a-upvdhowitworks' },
        { label: 'Transaction', path: '/a-transactionsummary' },
        { label: 'Commission Master', path: '/a-commissionmaster' },
        { label: 'Create Category', path: '/a-category' },
        { label: 'Business', path: '/a-business' },
      ]
    },
    { label: 'Meetings', path: '/a-meetings' },
    { label: 'Offer', path: '/a-table-carousel' },
    { label: 'Leads', path: '/a-popup-leads' },
    { label: 'Company', path: '/tableadminmeetings' },
  ];

  // ✅ Intercept Add Property clicks
  const handleNavClick = (path) => {
    if (path === "/p-addasset") {
      if (subscriptionPaid) {
        navigate(path);
      } else {
        setOpenModal(true);
      }
    } else {
      navigate(path);
    }
  };


  const [notifications, setNotifications] = useState([]);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [avatarBlink, setAvatarBlink] = useState(false); // State for avatar blink
  const notificationMenuOpen = Boolean(notificationAnchorEl);
  const navigate = useNavigate();
  const location = useLocation();

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

  const [showOperations, setShowOperations] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [operationsAnchorEl, setOperationsAnchorEl] = useState(null);

  const profileMenuOpen = Boolean(profileAnchorEl);
  const operationsMenuOpen = Boolean(operationsAnchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleAvatarClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleOperationsClick = (event) => {
    setOperationsAnchorEl(event.currentTarget);
    triggerAvatarBlink(); // Trigger blink on Operations click
  };

  const handleOperationsMenuClose = () => {
    setOperationsAnchorEl(null);
  };

  // Trigger avatar blink animation
  const triggerAvatarBlink = () => {
    setAvatarBlink(true);
    setTimeout(() => setAvatarBlink(false), 1000); // Reset after animation duration
  };

  // Handle navigation with smooth scroll and blink
  const handleNavigate = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate(path);
      triggerAvatarBlink(); // Trigger blink on navigation
    }, 200);
  };

  const isOperationsActive = navItems
    .find(item => item.label === 'Operations')
    ?.subItems.some(subItem => location.pathname === subItem.path);

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
                    handleNavigate(item.path);
                  }}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      color: location.pathname === item.path ? '#FFA500' : 'inherit',
                      fontWeight: 'bold',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (item.label === 'Operations') {
                        setShowOperations((prev) => !prev);
                        triggerAvatarBlink(); // Trigger blink on Operations toggle
                      }
                    }}
                    className={isOperationsActive ? 'active' : ''}
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
                {item.label === 'Operations' && showOperations && item.subItems?.map((subItem) => (
                  <ListItem key={subItem.label} disablePadding sx={{ pl: 4 }}>
                    <ListItemButton
                      onClick={() => {
                        handleDrawerToggle();
                        handleNavigate(subItem.path);
                      }}
                      className={location.pathname === subItem.path ? 'active' : ''}
                    >
                      <ListItemText
                        primary={subItem.label}
                        primaryTypographyProps={{
                          color: location.pathname === subItem.path ? '#FFA500' : 'inherit',
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
          boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <Toolbar>
          {isMobile ? (
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
                      transform: 'scale(2.0)',
                    }}
                  />
                </Link>
              </Box>
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
                  className={avatarBlink ? 'avatar-blink' : ''}
                  alt="Admin"
                  src="https://via.placeholder.com/40"
                />
              </Box>
            </Box>
          ) : (
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
                      transform: 'scale(1.5)',
                    }}
                  />
                </Link>
              </Box>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
                {navItems.map((item) => (
                  item.path ? (
                    <Button
                      key={item.label}
                      onClick={() => handleNavigate(item.path)}
                      className={location.pathname === item.path ? 'active' : ''}
                      sx={{
                        color: location.pathname === item.path ? '#FFA500' : '#000',
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
                      className={isOperationsActive ? 'active' : ''}
                      sx={{
                        color: isOperationsActive ? '#FFA500' : '#000',
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
                className={avatarBlink ? 'avatar-blink' : ''}
                alt="Admin"
                src="https://via.placeholder.com/40"
              />
            </>
          )}
        </Toolbar>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </AppBar>
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
              handleNavigate(subItem.path);
            }}
            sx={{
              fontWeight: 'bold',
              color: location.pathname === subItem.path ? '#FFA500' : 'inherit',
              fontSize: "16px"
            }}
          >
            {subItem.label}
          </MenuItem>
        ))}
      </Menu>
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
            handleNavigate('/a-profile');
          }}
          sx={{ fontWeight: 'bold' }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();

            // Remove specific keys from localStorage
            localStorage.removeItem("user_id");
            localStorage.removeItem("email");
            localStorage.removeItem("username");
            localStorage.removeItem("phone_number");
            localStorage.removeItem("referral_id");
            localStorage.removeItem("referred_by");
            localStorage.removeItem("user_name");

            // Redirect to home (or login page)
            handleNavigate('/');
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
                    handleNavigate('/a-asset');
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