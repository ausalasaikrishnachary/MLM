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
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function InvestorHeader() {
  // Define nav items with navigation paths.
  // For the "Transactions" item, we add a submenu.
  const navItems = [
    { label: 'Dashboard', path: '/i-dashboard' },
    { label: 'Properties', path: '/i-asset' },
    {
      label: 'Transactions',
      submenu: [
        { label: 'Buy Properties', path: '/i-buyshares' },
        // { label: 'Sell Shares', path: '/i-sellshares' },
      ],
    },
    { label: 'Services', path: '/i-servies' },
    { label: 'Plans', path: '/i-plans' },
  ];

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

  // State to manage open/close for mobile's nested submenu.
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  const toggleMobileSubmenu = (label) => {
    setMobileSubmenuOpen((prev) => ({ ...prev, [label]: !prev[label] }));
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

  // State for the Transactions dropdown menu in desktop view.
  const [transAnchorEl, setTransAnchorEl] = useState(null);
  const transMenuOpen = Boolean(transAnchorEl);
  const handleTransClick = (event) => {
    setTransAnchorEl(event.currentTarget);
  };
  const handleTransClose = () => {
    setTransAnchorEl(null);
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
          <Box key={item.label}>
            {item.submenu ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => toggleMobileSubmenu(item.label)}>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        color: item.submenu.some((sub) => sub.path === location.pathname)
                          ? 'blue'
                          : 'inherit',
                        fontWeight: 'bold',
                        fontSize: '16px',
                      }}
                    />
                    {mobileSubmenuOpen[item.label] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                {mobileSubmenuOpen[item.label] &&
                  item.submenu.map((subitem) => (
                    <ListItem key={subitem.label} disablePadding sx={{ pl: 4 }}>
                      <ListItemButton
                        onClick={() => {
                          handleDrawerToggle();
                          navigate(subitem.path);
                        }}
                      >
                        <ListItemText
                          primary={subitem.label}
                          primaryTypographyProps={{
                            color: location.pathname === subitem.path ? 'blue' : 'inherit',
                            fontWeight: 'bold',
                            fontSize: '16px',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </>
            ) : (
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
                      fontSize: '16px',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white', // Adjust color as needed.
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
                      // transform: 'scale(2.0)',
                    }}
                  />
                </Link>
              </Box>

              {/* Right: Notification, Username, Profile Avatar */}
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
                  Client
                </Typography>
                <Avatar
                  onClick={handleAvatarClick}
                  sx={{ width: 40, height: 40, cursor: 'pointer' }}
                  alt="Profile Avatar"
                  src="https://via.placeholder.com/40" // Replace with your own image.
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
                      // transform: 'scale(2.0)',
                    }}
                  />
                </Link>
              </Typography>

              {/* Center: Nav Items */}
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
                {navItems.map((item) =>
                  item.submenu ? (
                    // Nav Item with submenu (Transactions)
                    <Button
                      key={item.label}
                      onClick={handleTransClick}
                      sx={{
                        color: item.submenu.some((sub) => sub.path === location.pathname)
                          ? 'blue'
                          : '#000',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '16px',
                      }}
                      endIcon={<ExpandMore />}
                    >
                      {item.label}
                    </Button>
                  ) : (
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
                  )
                )}
              </Box>

              {/* Right: Notification, Username, Profile Avatar */}
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
                Client
              </Typography>
              <Avatar
                onClick={handleAvatarClick}
                sx={{ width: 40, height: 40, cursor: 'pointer' }}
                alt="Investor"
                src="https://via.placeholder.com/40" // Replace with your own image.
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
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/i-profiledetails');
          }}
          sx={{ fontWeight: 'bold', fontSize: '16px' }}
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

      {/* Transactions Dropdown Menu for Desktop */}
      <Menu
        anchorEl={transAnchorEl}
        open={transMenuOpen}
        onClose={handleTransClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {navItems
          .find((item) => item.label === 'Transactions')
          .submenu.map((subitem) => (
            <MenuItem
              key={subitem.label}
              onClick={() => {
                handleTransClose();
                navigate(subitem.path);
              }}
              sx={{
                color: location.pathname === subitem.path ? 'blue' : 'inherit',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              {subitem.label}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}
