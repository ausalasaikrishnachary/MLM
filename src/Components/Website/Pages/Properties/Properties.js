import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  Menu,
  MenuItem,
  Box,
  Dialog,
  IconButton,
  Pagination,
} from '@mui/material';
import './Properties.css';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useLocation } from 'react-router-dom';
import { baseurl } from './../../../BaseURL/BaseURL';
import { Carousel } from 'react-responsive-carousel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSort, setSelectedSort] = useState('Sort By');
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const location = useLocation();
  const categoryName = location.state?.categoryName || "All";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertiesResponse = await fetch(`${baseurl}/property/`);
        if (!propertiesResponse.ok) throw new Error('Failed to fetch properties');
        const propertiesData = await propertiesResponse.json();
        setProperties(propertiesData);

        const typesResponse = await fetch(`${baseurl}/property-types/`);
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

  const handleSortSelect = (option) => {
    if (option.type === 'sort') {
      setSelectedSort(option.label);
    } else if (option.type === 'subtype') {
      setSelectedTypeId(option.id);
      setSelectedSort(option.label);
    }
    handleMenuClose();
  };

  const handleImageClick = (property) => {
    setSelectedProperty(property);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProperty(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getAllMedia = (property) => {
    if (!property.images || !Array.isArray(property.images)) {
      return [{ url: 'https://via.placeholder.com/300', type: 'image', alt: 'Placeholder' }];
    }
    return property.images.map((img) => ({
      url: `${baseurl}${img.image}`,
      type: 'image',
      alt: img.alt || property.property_title
    }));
  };

  const filteredAndSortedProperties = [...properties]
    .filter(property => {
      const matchesSearch =
        property.property_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.total_property_value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.plot_area_sqft.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.builtup_area_sqft.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !selectedTypeId || property.property_type === selectedTypeId;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (selectedSort === 'Latest') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (selectedSort === 'Oldest') {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (selectedSort === 'Price High to Low') {
        return parseFloat(b.total_property_value) - parseFloat(a.total_property_value);
      } else if (selectedSort === 'Price Low to High') {
        return parseFloat(a.total_property_value) - parseFloat(b.total_property_value);
      } else {
        return 0;
      }
    });

  // Calculate pagination values after filteredAndSortedProperties is defined
  const totalPages = Math.ceil(filteredAndSortedProperties.length / itemsPerPage);
  const paginatedProperties = filteredAndSortedProperties.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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
            aria-controls="sort-type-menu"
            aria-haspopup="true"
            endIcon={<ArrowDropDownIcon />}
          >
            {selectedSort}
          </Button>
          <Menu
            id="sort-type-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {/* Sorting Options */}
            <MenuItem onClick={() => handleSortSelect({ type: 'sort', label: 'Sort By' })}>
              Sort By
            </MenuItem>
            <MenuItem onClick={() => handleSortSelect({ type: 'sort', label: 'Latest' })}>
              Latest
            </MenuItem>
            <MenuItem onClick={() => handleSortSelect({ type: 'sort', label: 'Oldest' })}>
              Oldest
            </MenuItem>
            <MenuItem onClick={() => handleSortSelect({ type: 'sort', label: 'Price High to Low' })}>
              Price High to Low
            </MenuItem>
            <MenuItem onClick={() => handleSortSelect({ type: 'sort', label: 'Price Low to High' })}>
              Price Low to High
            </MenuItem>
            {/* Divider */}
            <MenuItem disabled>────────────</MenuItem>
            {/* Property Sub Types */}
            <MenuItem onClick={() => handleSortSelect({ type: 'subtype', label: 'All Sub Types', id: null })}>
              All Sub Types
            </MenuItem>
            {propertyTypes.map((type) => (
              <MenuItem
                key={type.property_type_id}
                onClick={() =>
                  handleSortSelect({
                    type: 'subtype',
                    label: type.name,
                    id: type.property_type_id
                  })
                }
              >
                {type.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </div>
      <Typography variant="h4" className="mt-3" gutterBottom>
        {categoryName} Properties:
      </Typography>
      {paginatedProperties.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No properties found matching your search criteria
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {paginatedProperties.map((property) => (
            <Grid item md={4} xs={12} key={property.property_id}>
              <div className="property-card">
                <img
                  src={
                    property.images && property.images.length > 0
                      ? `${baseurl}${property.images[0].image}`
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={property.property_title}
                  className="property-img"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleImageClick(property)}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                <div className="property-description">
                  <div className="property-title">{property.property_title}</div>
                  <p>
                    <strong>Address:</strong> {property.address}, {property.city}, {property.state}
                  </p>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Plot Area
                      </Typography>
                      <Typography fontWeight="600" color="#4A90E2">
                        {property.plot_area_sqft || 'N/A'} sqft
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Built-up Area
                      </Typography>
                      <Typography fontWeight="600" color="#4A90E2">
                        {property.builtup_area_sqft || 'N/A'} sqft
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Property Value
                      </Typography>
                      <Typography fontWeight="600" color="#4A90E2">
                        {formatCurrency(property.total_property_value) || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Floors
                      </Typography>
                      <Typography fontWeight="600" color="#4A90E2">
                        {property.number_of_floors || 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
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
                    onClick={() =>
                      navigate(`/viewpropertiesdetails/${property.property_id}`, {
                        state: { property }
                      })
                    }
                  >
                    View Details
                  </Button>
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
                    onClick={() => {
                      sessionStorage.setItem('propertyData', JSON.stringify(property));
                      sessionStorage.setItem('propertyId', property.property_id);
                      navigate('/login');
                    }}
                  >
                    Buy now
                  </Button>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          siblingCount={1}
          boundaryCount={0}
          renderItem={(item) => {
            // Only render Previous, Next, and up to 3 page numbers
            if (item.type === 'previous' || item.type === 'next') {
              return (
                <IconButton
                  {...item}
                  sx={{
                    color: item.disabled ? 'grey' : 'primary.main',
                    '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' },
                  }}
                >
                  {item.type === 'previous' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              );
            }
            // Only render page numbers within the range (current page ± 1)
            if (
              item.type === 'page' &&
              item.page >= Math.max(1, page - 1) &&
              item.page <= Math.min(totalPages, page + 1)
            ) {
              return (
                <Button
                  {...item}
                  sx={{
                    minWidth: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: item.selected ? 'primary.main' : 'transparent',
                    color: item.selected ? '#FFFFFF' : 'primary.main',
                    '&:hover': {
                      backgroundColor: item.selected ? 'primary.main' : 'rgba(25, 118, 210, 0.1)',
                    },
                  }}
                >
                  {item.page}
                </Button>
              );
            }
            return null; 
          }}
        />
      </Box>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "900px",
            width: "100%",
            background: "transparent",
            boxShadow: "none",
            borderRadius: 0,
          },
        }}
      >
        <Box sx={{ p: 2, position: "relative" }}>
          {selectedProperty && getAllMedia(selectedProperty).length > 0 ? (
            <>
              <Carousel
                showThumbs={false}
                infiniteLoop
                useKeyboardArrows
                dynamicHeight
                autoPlay
                emulateTouch
              >
                {getAllMedia(selectedProperty)
                  .filter((media) => media.type === "image")
                  .map((media, idx) => (
                    <div key={idx}>
                      <img
                        src={media.url}
                        alt={media.alt || `Image ${idx + 1}`}
                        style={{
                          borderRadius: 0,
                          maxHeight: "550px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    </div>
                  ))}
              </Carousel>
              {getAllMedia(selectedProperty).length > 1 && (
                <>
                  <IconButton
                    sx={{
                      position: "absolute",
                      left: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(36, 36, 36, 0.5)",
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                    }}
                    onClick={() =>
                      document.querySelector(".carousel .control-prev").click()
                    }
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(36, 36, 36, 0.5)",
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                    }}
                    onClick={() =>
                      document.querySelector(".carousel .control-next").click()
                    }
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </>
              )}
            </>
          ) : (
            <Typography color="white" textAlign="center">
              No media available.
            </Typography>
          )}
        </Box>
      </Dialog>
    </Container>
  );
};

export default Properties;