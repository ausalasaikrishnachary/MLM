import React, { useState, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  Grid, 
  Container, 
  Typography, 
  Menu, 
  MenuItem,
  Box
} from '@mui/material';
import './Properties.css';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedType, setSelectedType] = useState('Property Sub Types');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch properties
        const propertiesResponse = await fetch('https://shrirajteam.com:81/property/');
        if (!propertiesResponse.ok) throw new Error('Failed to fetch properties');
        const propertiesData = await propertiesResponse.json();
        setProperties(propertiesData);

        // Fetch property types
        const typesResponse = await fetch('https://shrirajteam.com:81/property-types/');
        if (!typesResponse.ok) throw new Error('Failed to fetch property types');
        const typesData = await typesResponse.json();
        setPropertyTypes(typesData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type.name || 'Property Sub Types');
    handleMenuClose();
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = 
      property.property_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
      property.total_property_value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.plot_area_sqft.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.builtup_area_sqft.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      selectedType === 'Property Sub Types' || 
      property.property_type === propertyTypes.find(t => t.name === selectedType)?.property_type_id;
    
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <Container className="properties">
        <Typography variant="h6" align="center">Loading properties...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="properties">
        <Typography variant="h6" color="error" align="center">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  

  return (
    <Container className="properties">
     <div className="filters-container">
        <TextField
          className="search-bar"
          label="Search properties here..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            sx={{ 
              color: "#2E166D", 
              border: "1px solid #2E166D",
              '&:hover': {
                backgroundColor: "#2E166D",
                color: "#FFFFFF"
              }
            }}
            onClick={handleMenuOpen}
            aria-controls="property-type-menu"
            aria-haspopup="true"
            endIcon={<ArrowDropDownIcon />}
          >
            {selectedType}
          </Button>
          <Menu
            id="property-type-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleTypeSelect({ name: 'Property Sub Types' })}>
              Property Sub Types
            </MenuItem>
            {propertyTypes.map((type) => (
              <MenuItem 
                key={type.property_type_id} 
                onClick={() => handleTypeSelect(type)}
              >
                {type.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </div>
      <Typography variant="h4" className="mt-3" gutterBottom>
        Properties:
      </Typography>
      
      {filteredProperties.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No properties found matching your search criteria
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredProperties.map((property) => (
            <Grid item md={4} xs={12} key={property.property_id}>
              <div className="property-card">
                <img
                  src={
                    property.images && property.images.length > 0 
                      ? `https://shrirajteam.com:81${property.images[0].image}` 
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={property.property_title}
                  className="property-img"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                <div className="property-description">
                  <div className="property-title">{property.property_title}</div>
                  <p>
                    <strong>Address:</strong> {property.address}, {property.city}, {property.state}
                  </p>
                  <p>
                    <strong>Value:</strong> {formatCurrency(property.total_property_value)}
                  </p>
                  {/* <p>
                    <strong>Status:</strong> {property.status} | {property.approval_status}
                  </p> */}
                </div>
                <div className="btn-container single-button">
                  <Button
                    sx={{ 
                      color: "#2E166D", 
                      border: "1px solid #2E166D", 
                      width: "100%",
                      '&:hover': {
                        backgroundColor: "#2E166D",
                        color: "#FFFFFF"
                      }
                    }}
                      onClick={() => navigate('/propertydetails')}
                    // onClick={() => navigate(`/propertydetails/${property.property_id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Properties;