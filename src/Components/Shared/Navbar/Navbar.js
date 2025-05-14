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
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Header() {
  // Updated nav items with no submenu for Transactions.
  const navItems = [
    { label: 'Dashboard', path: '/a-dashboard' },
    { label: 'Properties', path: '/a-asset' },
    { label: 'Transactions', path: '/a-transactionmoniter' },
    { label: 'All Leads', path: '/a-investormanagement' },
    { label: 'Agents', path: '/a-partners' },
    { label: 'Commission', path: '/a-commission' },
    { label: 'Subscriptions', path: '/a-subscriptions' },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  // State for mobile drawer.
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // State for Profile Avatar dropdown menu.
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
          boxShadow: '-moz-initial',
        }}
      >
        <Toolbar>
          {isMobile ? (
            // Mobile Layout.
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

                      // transform: 'scale(2.0)',
                    }}
                  />
                </Link>
              </Box>

              <Box display="flex" alignItems="center">
                <IconButton sx={{ color: '#000' }}>
                  <NotificationsNoneIcon />
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
                  Admin
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
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/a-dashboard" style={{ textDecoration: 'none', color: '#333333' }}>
                  <img
                    src={Logo}
                    alt="logo"
                    style={{
                      height: '75px',
                      width: 'auto',
                      maxWidth: '150px',
                      paddingTop: "8px"
                      // transform: 'scale(2.0)',
                    }}
                  />
                </Link>
              </Typography>

              {/* Nav Items rendered as simple buttons */}
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

              <IconButton sx={{ color: '#000' }}>
                <NotificationsNoneIcon />
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
                Admin
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
            navigate('/a-profile');
          }}
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
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
            fontSize: '16px',
            fontWeight: 'bold',
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
