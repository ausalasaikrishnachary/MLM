import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    TextField,
    InputAdornment,
    FormControl,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { baseurl } from '../../../BaseURL/BaseURL';
import PaginationComponent from '../../../Shared/Pagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const I_BookedAssets = () => {
    const [sortBy, setSortBy] = useState('');
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        const fetchBookedProperties = async () => {
            try {
                const response = await fetch(`${baseurl}/transactions/grouped/user-id/${userId}/`);
                const data = await response.json();

                if (data.bookings && data.bookings.properties) {
                    setProperties(data.bookings.properties.list);
                    setFilteredProperties(data.bookings.properties.list);
                } else {
                    setProperties([]);
                }
            } catch (error) {
                console.error('Error fetching booked properties:', error);
            }
        };

        fetchBookedProperties();
    }, []);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedProperty(null);
    };

    const [openCarousel, setOpenCarousel] = useState(false);

    const handleImageClick = (property) => {
        setSelectedProperty(property);
        setOpenCarousel(true);
    };

    const handleCloseCarousel = () => {
        setOpenCarousel(false);
        setSelectedProperty(null);
    };

    const updateApprovalStatus = async (propertyId, newStatus) => {
        try {
            const response = await fetch(`${baseurl}/property/${propertyId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ approval_status: newStatus })
            });

            if (response.ok) {
                alert('Approval status updated successfully.');
                const updatedData = await response.json();
                setProperties(prev =>
                    prev.map(p => (p.property_id === propertyId ? { ...p, approval_status: updatedData.approval_status } : p))
                );
                setFilteredProperties(prev =>
                    prev.map(p => (p.property_id === propertyId ? { ...p, approval_status: updatedData.approval_status } : p))
                );
            } else {
                alert(`Failed to update approval status. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating approval status:', error);
            alert('An error occurred while updating the approval status.');
        }
    };
    useEffect(() => {
        let results = [...properties];

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            results = results.filter(property => {
                const searchFields = [
                    property.property_title,
                    property.first_name,
                    property.city,
                    property.state,
                    property.owner_name,
                    property.owner_contact,
                    property.address,
                    property.description,
                    property.property_value?.toString(),
                    property.plot_area_sqft?.toString(),
                    property.builtup_area_sqft?.toString()
                ].filter(Boolean);

                return searchFields.some(field => field.toLowerCase().includes(query));
            });
        }

        // Apply sort filter
        switch (sortBy) {
            case 'latest':
                results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case 'oldest':
                results.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                break;
            case 'price-high':
                results.sort((a, b) => b.property_value - a.property_value);
                break;
            case 'price-low':
                results.sort((a, b) => a.property_value - b.property_value);
                break;
            default:
                // No sorting
                break;
        }

        setFilteredProperties(results);
    }, [searchQuery, sortBy, properties]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };
    const handlePageChange = (event, value) => {
        setPage(value);
    };


    return (
        <>
            <InvestorHeader />
            <Container sx={{ py: 4 }}>
                <Box position="relative" mb={3} height="56px">
                    {/* Back Button aligned left */}
                    {/* <Box position="absolute" left={0} top={0}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                    </Box> */}

                    {/* Centered Heading */}
                    <Typography variant="h4" align="center" sx={{ lineHeight: '46px' }}>
                        Booked Assets
                    </Typography>
                </Box>

                <Box
                    sx={{
                        backgroundColor: 'white',
                        p: 2,
                        borderRadius: 2,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                        mb: 3
                    }}
                >
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                placeholder="Search assets..."
                                variant="outlined"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: '#757575' }} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <Select
                                    value={sortBy}
                                    onChange={handleSortChange}
                                    displayEmpty
                                    sx={{
                                        borderRadius: '8px',
                                        fontSize: '15px'
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Sort By</em>
                                    </MenuItem>
                                    <MenuItem value="latest">Latest</MenuItem>
                                    <MenuItem value="oldest">Oldest</MenuItem>
                                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                {filteredProperties.length > 0 ? (
                    <>
                        <Grid container spacing={3}>
                            {paginatedProperties.map((property) => (
                                <Grid item xs={12} md={6} lg={4} key={property.id}>
                                    <Card
                                        sx={{
                                            borderRadius: 2,
                                            transition: 'all 0.3s ease',
                                            position: 'relative',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.749)',
                                            }
                                        }}
                                    >
                                        <Box sx={{ position: 'relative' }}>
                                            <CardMedia
                                                component="img"
                                                height="220"
                                                image={property.images.length > 0 ? `${baseurl}${property.images[0].image}` : 'https://via.placeholder.com/300'}
                                                alt={property.property_title}
                                                sx={{ objectFit: 'cover', borderRadius: '12px 12px 0 0', cursor: 'pointer' }}
                                                onClick={() => handleImageClick(property)}
                                            />
                                            {property.status !== 'sold' && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 15,
                                                        right: -30,
                                                        width: '150px',
                                                        transform: 'rotate(45deg)',
                                                        backgroundColor: "red",
                                                        color: 'white',
                                                        textAlign: 'center',
                                                        fontSize: '12px',
                                                        fontWeight: 'bold',
                                                        textTransform: 'uppercase',
                                                        py: '4px',
                                                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                                    }}
                                                >
                                                    {property.looking_to === 'sell' ? 'Sell' : 'Rent'}
                                                </Box>
                                            )}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 15,
                                                    left: -30,
                                                    width: '150px',
                                                    transform: 'rotate(-45deg)',
                                                    backgroundColor:
                                                        property.status === 'available'
                                                            ? '#2ECC71'
                                                            : property.status === 'booked'
                                                                ? '#E67E22'
                                                                : '#E74C3C',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase',
                                                    py: '4px',
                                                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                                }}
                                            >
                                                {property.status}
                                            </Box>
                                        </Box>
                                        <CardContent>
                                            <Typography fontWeight="bold" mb={1}>
                                                {property.property_title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" mb={2}>
                                                {property.city}, {property.state}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" mb={1}>
                                                Added By: <strong>{property.first_name}</strong>
                                            </Typography>
                                            {/* <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 500 }}>
                                            Approval Status
                                        </Typography>
                                        <Select
                                            value={property.approval_status || ''}
                                            onChange={(e) => updateApprovalStatus(property.property_id, e.target.value)}
                                            displayEmpty
                                            sx={{
                                                borderRadius: '8px',
                                                backgroundColor: '#f9f9f9',
                                                '&:hover': {
                                                    backgroundColor: '#f0f0f0'
                                                }
                                            }}
                                        >
                                            <MenuItem value={property.approval_status}>
                                                <em>{property.approval_status}</em>
                                            </MenuItem>
                                            <MenuItem value="approved">Approved</MenuItem>
                                            <MenuItem value="rejected">Rejected</MenuItem>
                                        </Select>
                                    </FormControl> */}
                                            <Grid
                                                container
                                                spacing={2}
                                                sx={{
                                                    p: 1.5,
                                                    borderRadius: 1,
                                                    mb: 2
                                                }}
                                            >
                                                <Grid item xs={6}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Plot Area
                                                    </Typography>
                                                    <Typography fontWeight="600" color="#4A90E2">
                                                        {property.plot_area_sqft} sqft
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Built-up Area
                                                    </Typography>
                                                    <Typography fontWeight="600" color="#4A90E2">
                                                        {property.builtup_area_sqft} sqft
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Property Value
                                                    </Typography>
                                                    <Typography fontWeight="600" color="#4A90E2">
                                                        ₹{property.property_value}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Floors
                                                    </Typography>
                                                    <Typography fontWeight="600" color="#4A90E2">
                                                        {property.number_of_floors}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Box
                                                sx={{
                                                    backgroundColor: '#F8F9FA',
                                                    borderRadius: 1,
                                                    p: 1.5,
                                                    mb: 2
                                                }}
                                            >
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Owner Email
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography
                                                            variant="body2"
                                                            fontWeight="bold"
                                                            color="#4A90E2"
                                                            align="right"
                                                        >
                                                            {property.owner_email}
                                                        </Typography>
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Owner Contact
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography
                                                            variant="body2"
                                                            fontWeight="bold"
                                                            color="text.secondary"
                                                            align="right"
                                                        >
                                                            {property.owner_contact}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        sx={{
                                                            backgroundColor: '#149c33',
                                                            color: 'white',
                                                            textTransform: 'none',
                                                            '&:hover': { backgroundColor: '#59ed7c', color: 'rgb(5,5,5)' }
                                                        }}
                                                        onClick={() => navigate(`/i-assets/${property.property_id}`, { state: { property } })}
                                                    >
                                                        VIEW DETAILS
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        {/* Image Carousel Dialog */}
                                        <Dialog open={openCarousel} onClose={handleCloseCarousel} maxWidth="md" fullWidth>
                                            <Box sx={{ p: 2, background: '#000' }}>
                                                {selectedProperty && selectedProperty.images && selectedProperty.images.length > 0 ? (
                                                    <Carousel
                                                        showThumbs={false}
                                                        infiniteLoop
                                                        useKeyboardArrows
                                                        dynamicHeight
                                                        autoPlay
                                                        emulateTouch
                                                    >
                                                        {selectedProperty.images.map((imgObj, idx) => (
                                                            <div key={idx}>
                                                                <img
                                                                    src={`${baseurl}${imgObj.image}`}
                                                                    alt={`property-img-${idx}`}
                                                                    style={{ borderRadius: 8, maxHeight: '550px', objectFit: 'cover' }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </Carousel>
                                                ) : (
                                                    <Typography color="white">No images available.</Typography>
                                                )}
                                            </Box>
                                        </Dialog>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <PaginationComponent
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                        />
                    </>
                ) : (
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        No properties found matching your criteria
                    </Typography>
                )}

                {/* Property Details Dialog */}
                {selectedProperty && (
                    <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="lg">
                        <DialogTitle>{selectedProperty.property_title} - Details</DialogTitle>
                        <DialogContent dividers>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Box
                                        component="img"
                                        src={selectedProperty.images.length > 0 ? `${baseurl}/${selectedProperty.images[0].image}` : 'https://via.placeholder.com/300'}
                                        alt={selectedProperty.property_title}
                                        sx={{ width: '100%', borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 1 }}>
                                        <Typography fontWeight="bold">Description:</Typography>
                                        <Typography variant="body2">{selectedProperty.description}</Typography>
                                    </Box>
                                    <Box sx={{ mb: 1 }}>
                                        <Typography fontWeight="bold">Address:</Typography>
                                        <Typography variant="body2">
                                            {selectedProperty.address}, {selectedProperty.city}, {selectedProperty.state}, {selectedProperty.country} - {selectedProperty.pin_code}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mb: 1 }}>
                                        <Typography fontWeight="bold">Coordinates:</Typography>
                                        <Typography variant="body2">
                                            Latitude: {selectedProperty.latitude}, Longitude: {selectedProperty.longitude}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mb: 1 }}>
                                        <Typography fontWeight="bold">Dimensions:</Typography>
                                        <Typography variant="body2">
                                            Length: {selectedProperty.length_ft} ft, Breadth: {selectedProperty.breadth_ft} ft
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mb: 1 }}>
                                        <Typography fontWeight="bold">Facing Direction:</Typography>
                                        <Typography variant="body2">{selectedProperty.facing}</Typography>
                                    </Box>
                                    <Box sx={{ mb: 1 }}>
                                        <Typography fontWeight="bold">Ownership Type:</Typography>
                                        <Typography variant="body2">{selectedProperty.ownership_type}</Typography>
                                    </Box>
                                    <Box sx={{ mb: 1 }}>
                                        <Typography fontWeight="bold">Property Uniqueness:</Typography>
                                        <Typography variant="body2">{selectedProperty.property_uniqueness}</Typography>
                                    </Box>
                                    <Box sx={{ mb: 1 }}>
                                        <Typography fontWeight="bold">Location Advantages:</Typography>
                                        <Typography variant="body2">{selectedProperty.location_advantages}</Typography>
                                    </Box>
                                    <Box sx={{ mb: 1 }}>
                                        <Typography fontWeight="bold">Other Features:</Typography>
                                        <Typography variant="body2">{selectedProperty.other_features}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography fontWeight="bold">Contact:</Typography>
                                        <Typography variant="body2">
                                            {selectedProperty.owner_name} - {selectedProperty.owner_contact} ({selectedProperty.owner_email})
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} variant="contained" color="error">
                                CLOSE
                            </Button>
                            <Button variant="contained" color="success">
                                {selectedProperty.looking_to === 'sell' ? 'BUY NOW' : 'RENT NOW'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Container>
        </>
    );
};

export default I_BookedAssets;
