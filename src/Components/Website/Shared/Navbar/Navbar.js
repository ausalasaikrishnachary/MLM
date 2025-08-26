import React, { useState, useEffect } from 'react';
import Logo from '../../../Images/logo1.png';
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
import { NavLink, Link, useNavigate  } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { baseurl } from './../../../BaseURL/BaseURL';

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  
const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseurl}/property-categories/`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileSubmenuToggle = () => {
    setMobileSubmenuOpen(!mobileSubmenuOpen);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'How it works', path: '/aboutus' },
    { 
    label: 'Properties',
    path: '/properties',
    hasDropdown: true,
    dropdownItems: categories.map(category => ({
      label: category.name,
      onClick: () => navigate(`/properties?category=${category.property_category_id}`, {
        state: { categoryName: category.name }
      })
    }))
  },
    { label: 'Contact us', path: '/contactus' },
    { label: 'FAQs', path: '/FAQ' },
  ];

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
            {item.hasDropdown ? (
              <>
                <ListItem
                  button
                  onClick={handleMobileSubmenuToggle}
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
                  {mobileSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {mobileSubmenuOpen && (
                  <Box sx={{ pl: 3 }}>
                    {item.dropdownItems.map((dropdownItem) => (
                      <ListItem
                        key={dropdownItem.label}
                        button
                        component={NavLink}
                        to={dropdownItem.path}
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
                          primary={dropdownItem.label}
                          primaryTypographyProps={{
                            color: '#333333',
                            fontSize: '14px',
                            fontFamily: 'Calibre, sans-serif',
                          }}
                        />
                      </ListItem>
                    ))}
                  </Box>
                )}
              </>
            ) : (
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
            )}
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
                      transform: 'scale(1.5)',
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
                      transform: 'scale(1.5)',
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
                  item.hasDropdown ? (
                    <Box key={item.label}>
                      <Button
                        onClick={handleMenuOpen}
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
                        endIcon={<ExpandMore />}
                      >
                        {item.label}
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        {item.dropdownItems.map((dropdownItem) => (
                          <MenuItem
  key={dropdownItem.label}
  onClick={() => {
    dropdownItem.onClick();
    handleMenuClose();
  }}
>
  {dropdownItem.label}
</MenuItem>

                        ))}
                      </Menu>
                    </Box>
                  ) : (
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
                  )
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
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    '& .free-label': {
      backgroundColor: 'green',
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold',
      px: 1,
      py: '2px',
      borderRadius: '4px',
    },
    '&.active': {
      backgroundColor: '#2d1656',
      color: '#ffffff',
    },
  }}
>
  Post Property
  <Box className="free-label">Free</Box>
</Button>



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