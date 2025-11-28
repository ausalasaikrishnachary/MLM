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
    Tabs,
    Tab,
    CircularProgress,
    Chip,
    Divider,
    Link,
    IconButton,
    Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Header from "../../../Shared/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { baseurl } from '../../../BaseURL/BaseURL';
import PaginationComponent from '../../../Shared/Pagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";

const AdminLandingPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

    // Properties states
    const [sortBy, setSortBy] = useState('');
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [propertiesPage, setPropertiesPage] = useState(1);
    const propertiesPerPage = 9;

    // Businesses states
    const [businesses, setBusinesses] = useState([]);
    const [loadingBusinesses, setLoadingBusinesses] = useState(true);
    const [businessSearchTerm, setBusinessSearchTerm] = useState('');
    const [businessesPage, setBusinessesPage] = useState(1);
    const businessesPerPage = 9;

    // Carousel state
    const [openCarousel, setOpenCarousel] = useState(false);

    // Fetch properties
    useEffect(() => {
        const fetchLatestProperties = async () => {
            try {
                const response = await fetch(`${baseurl}/property-stats/user-id/${userId}/`);
                const data = await response.json();

                if (data.latest && data.latest.properties) {
                    setProperties(data.latest.properties.list);
                    setFilteredProperties(data.latest.properties.list);
                } else {
                    setProperties([]);
                }
            } catch (error) {
                console.error('Error fetching booked properties:', error);
            }
        };

        fetchLatestProperties();
    }, []);

    // Fetch businesses
    useEffect(() => {
        fetch(`${baseurl}/business/`)
            .then((res) => res.json())
            .then((data) => {
                const filtered = data.filter(
                    (business) => String(business.user_id) !== String(userId)
                );
                setBusinesses(filtered);
                setLoadingBusinesses(false);
            })
            .catch((error) => {
                console.error("Error fetching businesses:", error);
                setLoadingBusinesses(false);
            });
    }, []);

    // Filter and sort properties
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
                    property.area?.toString(),
                    property.builtup_area?.toString()
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
                break;
        }

        setFilteredProperties(results);
    }, [searchQuery, sortBy, properties]);

    // Filter businesses
    const filteredBusinesses = businesses.filter(business => {
        if (!businessSearchTerm) return true;
        return business.business_type?.toLowerCase().includes(businessSearchTerm.toLowerCase());
    });

    // Pagination calculations
    const propertiesTotalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    const propertiesStartIndex = (propertiesPage - 1) * propertiesPerPage;
    const paginatedProperties = filteredProperties.slice(propertiesStartIndex, propertiesStartIndex + propertiesPerPage);

    const businessesTotalPages = Math.ceil(filteredBusinesses.length / businessesPerPage);
    const businessesStartIndex = (businessesPage - 1) * businessesPerPage;
    const paginatedBusinesses = filteredBusinesses.slice(businessesStartIndex, businessesStartIndex + businessesPerPage);

    // Handlers
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedProperty(null);
    };

    const handleImageClick = (property) => {
        setSelectedProperty(property);
        setOpenCarousel(true);
    };

    const handleCloseCarousel = () => {
        setOpenCarousel(false);
        setSelectedProperty(null);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPropertiesPage(1);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handlePropertiesPageChange = (event, value) => {
        setPropertiesPage(value);
    };

    const handleBusinessSearchChange = (event) => {
        setBusinessSearchTerm(event.target.value);
        setBusinessesPage(1);
    };

    const handleBusinessesPageChange = (event, value) => {
        setBusinessesPage(value);
    };

    const handleDeleteBusiness = (id) => {
        if (window.confirm("Are you sure you want to delete this business?")) {
            fetch(`${baseurl}/business/${id}/`, { method: "DELETE" })
                .then((res) => {
                    if (res.ok) {
                        setBusinesses((prev) =>
                            prev.filter((business) => business.business_id !== id)
                        );
                    } else {
                        alert("Failed to delete business");
                    }
                })
                .catch((err) => console.error("Error deleting:", err));
        }
    };

    return (
        <>
            <Header/>
            <Container sx={{ py: 4 }}>
                {/* Header Section */}
                <Box position="relative" mb={3} height="56px">
                    <Box position="absolute" left={0} top={0}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                    </Box>
                    <Typography variant="h4" align="center" sx={{ lineHeight: '46px' }}>
                        Admin Dashboard
                    </Typography>
                </Box>

                {/* Tabs Section */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={activeTab} onChange={handleTabChange} centered>
                        <Tab label="Latest Properties" />
                        <Tab label="Businesses" />
                    </Tabs>
                </Box>

                {/* Properties Tab Content */}
                {activeTab === 0 && (
                    <>
                        {/* Search and Filter Section */}
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
                                        placeholder="Search properties..."
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

                        {/* Properties Cards */}
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
                                                                Area
                                                            </Typography>
                                                            <Typography fontWeight="600" color="#4A90E2">
                                                                {property.area} {property.area_unit}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Built-up Area
                                                            </Typography>
                                                            <Typography fontWeight="600" color="#4A90E2">
                                                                {property.builtup_area} {property.area_unit}
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
                                                                onClick={() => navigate(`/p-assets/${property.property_id}`, { state: { property } })}
                                                            >
                                                                VIEW DETAILS
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* Properties Pagination */}
                                {propertiesTotalPages > 1 && (
                                    <Box display="flex" justifyContent="center" mt={4}>
                                        <PaginationComponent
                                            count={propertiesTotalPages}
                                            page={propertiesPage}
                                            onChange={handlePropertiesPageChange}
                                        />
                                    </Box>
                                )}
                            </>
                        ) : (
                            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                                No properties found matching your criteria
                            </Typography>
                        )}
                    </>
                )}

                {/* Businesses Tab Content */}
                {activeTab === 1 && (
                    <>
                        {/* Business Search */}
                        <Box sx={{ mb: 3, maxWidth: 400 }}>
                            <TextField
                                fullWidth
                                label="Search by business category or type..."
                                variant="outlined"
                                value={businessSearchTerm}
                                onChange={handleBusinessSearchChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        backgroundColor: 'white',
                                    }
                                }}
                            />
                        </Box>

                        {loadingBusinesses ? (
                            <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                                <CircularProgress />
                            </Box>
                        ) : filteredBusinesses.length === 0 ? (
                            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                                No businesses found matching your criteria
                            </Typography>
                        ) : (
                            <>
                                <Grid container spacing={3}>
                                    {paginatedBusinesses.map((business) => (
                                        <Grid item xs={12} sm={6} md={4} key={business.business_id}>
                                            <Card
                                                sx={{
                                                    borderRadius: "20px",
                                                    p: 2,
                                                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                                                    bgcolor: "#fff",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                    width: "100%",
                                                    height: "100%",
                                                    position: "relative",
                                                    overflow: "visible",
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => navigate(`/p-businessproducts/${business.business_id}`)}
                                            >
                                                {/* Offer Ribbon */}
                                                {business.offer_title && (
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            top: -5,
                                                            left: -5,
                                                            zIndex: 1,
                                                            transform: "rotate(-5deg)",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                backgroundColor: "#ff6b6b",
                                                                color: "white",
                                                                px: 2,
                                                                py: 0.5,
                                                                borderRadius: "8px 8px 8px 0",
                                                                fontSize: "0.75rem",
                                                                fontWeight: "bold",
                                                                textTransform: "uppercase",
                                                                letterSpacing: "0.5px",
                                                            }}
                                                        >
                                                            {business.offer_title.toUpperCase()}
                                                        </Box>
                                                    </Box>
                                                )}

                                                {/* Business Logo */}
                                                {business.logo ? (
                                                    <CardMedia
                                                        component="img"
                                                        alt={business.business_name || "Business Logo"}
                                                        image={
                                                            business.logo ? `${baseurl}/${business.logo}` : "/default-logo.png"
                                                        }
                                                        sx={{ objectFit: "contain" }}
                                                    />
                                                ) : (
                                                    <Box
                                                        height="160px"
                                                        display="flex"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        bgcolor="#f5f5f5"
                                                    >
                                                        <BusinessIcon sx={{ fontSize: 60, color: "gray" }} />
                                                    </Box>
                                                )}

                                                {/* Business Info */}
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                        {business.business_name}
                                                    </Typography>

                                                    <Chip
                                                        label={business.business_type}
                                                        color="primary"
                                                        size="small"
                                                        sx={{ mb: 1 }}
                                                    />

                                                    <Divider sx={{ my: 1.5 }} />

                                                    {/* Website */}
                                                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                                                        <LanguageIcon fontSize="small" color="primary" />
                                                        <Link
                                                            href={business.website}
                                                            target="_blank"
                                                            rel="noopener"
                                                            underline="hover"
                                                        >
                                                            {business.website}
                                                        </Link>
                                                    </Box>

                                                    {/* Email */}
                                                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                                                        <EmailIcon fontSize="small" color="primary" />
                                                        <Typography variant="body2">{business.email}</Typography>
                                                    </Box>

                                                    {/* Phone */}
                                                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                                                        <PhoneIcon fontSize="small" color="primary" />
                                                        <Typography variant="body2">{business.phone}</Typography>
                                                    </Box>

                                                    {/* Location */}
                                                    {business.address && (
                                                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                                                            <LocationOnIcon fontSize="small" color="primary" />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {business.address}
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {/* Description */}
                                                    {business.description && (
                                                        <Box display="flex" alignItems="flex-start" mb={1}>
                                                            <DescriptionIcon
                                                                fontSize="small"
                                                                color="primary"
                                                                sx={{ mr: 0.5, mt: 0.3 }}
                                                            />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {business.description}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </CardContent>

                                                {/* Action Buttons */}
                                                <Box display="flex" justifyContent="flex-end" p={1}>
                                                    {/* Download Document */}
                                                    {business.documents && (
                                                        <Tooltip title="Download">
                                                            <IconButton
                                                                component="a"
                                                                href={`${baseurl}/${business.documents}`}
                                                                target="_blank"
                                                                rel="noopener"
                                                                color="primary"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <DownloadIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* Businesses Pagination */}
                                {businessesTotalPages > 1 && (
                                    <Box display="flex" justifyContent="center" mt={4}>
                                        <PaginationComponent
                                            count={businessesTotalPages}
                                            page={businessesPage}
                                            onChange={handleBusinessesPageChange}
                                        />
                                    </Box>
                                )}
                            </>
                        )}
                    </>
                )}

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

export default AdminLandingPage;