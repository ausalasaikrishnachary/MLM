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
  Badge,
  Menu as MuiMenu
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../../BaseURL/BaseURL';

export default function PartnerHeader() {
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

  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const fetchProfileImage = () => {
      axios.get(`${baseurl}/users/${userId}/`)
        .then(res => {
          setProfileImage(res.data.image || '');
        })
        .catch(err => {
          console.error('Error fetching profile image:', err);
        });
    };

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

    fetchProfileImage();
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [userId]);

  const navItems = [
    { label: 'Dashboard', path: '/p-dashboard' },
    { label: 'My Properties', path: '/p-myassets' },
    { label: 'Properties', path: '/p-assets' },
    { label: 'My Team', path: '/p-myteam' },
    {
      label: 'Operations',
      subItems: [
        { label: 'Transaction', path: '/p-transaction' },
        { label: 'Commission', path: '/p-commission' },
        { label: 'Plans', path: '/p-plans' },
        { label: 'Training Material', path: '/p-trainingmaterial' },
      ]
    },
    { label: 'Meetings', path: '/p-meetings' },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const referral_id = localStorage.getItem("referral_id");
  const first_name = localStorage.getItem("user_name");

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [operationsAnchorEl, setOperationsAnchorEl] = useState(null);
  const operationsMenuOpen = Boolean(operationsAnchorEl);
  const handleOperationsClick = (event) => {
    setOperationsAnchorEl(event.currentTarget);
  };
  const handleOperationsMenuClose = () => {
    setOperationsAnchorEl(null);
  };

  const isOperationsActive = navItems
    .find(item => item.label === 'Operations')
    ?.subItems.some(subItem => location.pathname === subItem.path);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const profileMenuOpen = Boolean(profileAnchorEl);
  const handleAvatarClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
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
                <Link to="/p-dashboard" style={{ textDecoration: 'none', color: '#333333' }}>
                  <img src={Logo} alt="logo" style={{ height: '50px', maxWidth: '150px' }} />
                </Link>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton sx={{ color: '#000' }} onClick={handleNotificationClick}>
                  <Badge badgeContent={notifications.length} color="error">
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>
                <Typography sx={{ ml: 2, mr: 2, color: '#000', fontWeight: 'bold' }}>
                  {first_name} ({referral_id})
                </Typography>
                <Avatar
                  onClick={handleAvatarClick}
                  sx={{ width: 40, height: 40, cursor: 'pointer' }}
                  alt="Profile Avatar"
                  src={profileImage ? `${baseurl}${profileImage}` : "https://via.placeholder.com/40"}
                />
              </Box>

            </Box>
          ) : (
            <>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/p-dashboard" style={{ textDecoration: 'none', color: '#333333' }}>
                  <img src={Logo} alt="logo" style={{ height: '75px', maxWidth: '150px', paddingTop: "8px" }} />
                </Link>
              </Typography>
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
              <IconButton sx={{ color: '#000' }} onClick={handleNotificationClick}>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <Typography sx={{ ml: 2, mr: 2, color: '#000', fontWeight: 'bold' }}>
                {first_name} ({referral_id})
              </Typography>
              <Avatar
                  onClick={handleAvatarClick}
                  sx={{ width: 40, height: 40, cursor: 'pointer' }}
                  alt="Profile Avatar"
                  src={profileImage ? `${baseurl}${profileImage}` : "https://via.placeholder.com/40"}
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
            navigate('/p-profile');
          }}
          sx={{ fontWeight: 'bold' }}
        >
          Profile
        </MenuItem>
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
                    navigate('/p-assets');
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
