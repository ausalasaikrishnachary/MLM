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
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Stack,
    InputLabel,
    Pagination,
    Autocomplete
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
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
import CallIcon from '@mui/icons-material/Call';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VideocamIcon from '@mui/icons-material/Videocam';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const InvestorLandingPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

    // Properties states
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [uniqueRoles, setUniqueRoles] = useState(['Agent', 'Client', 'Admin', 'All']);
    const [selectedRole, setSelectedRole] = useState('');

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [filters, setFilters] = useState({
        propertyType: '',
        priceRange: { min: '', max: '' },
        areaRange: { min: '', max: '' },
        bedrooms: '',
        bathrooms: '',
        city: '',
        state: '',
        status: '',
        facing: '',
        ownershipType: '',
        builtupArea: { min: '', max: '' },
        areaUnit: ''
    });
    const [availableCities, setAvailableCities] = useState([]);
    const [availableStates, setAvailableStates] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const [subscriptionPaid, setSubscriptionPaid] = useState(false);
    const [currentImageIndices, setCurrentImageIndices] = useState({});
    const [propertiesPage, setPropertiesPage] = useState(1);
    const propertiesPerPage = 30;
    const propertiesTotalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    const propertiesStartIndex = (propertiesPage - 1) * propertiesPerPage;
    const paginatedProperties = filteredProperties.slice(propertiesStartIndex, propertiesStartIndex + propertiesPerPage);

    // Wishlist and Likes
    const [likedProperties, setLikedProperties] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    // Report generation states
    const [openReportDialog, setOpenReportDialog] = useState(false);
    const [openReportConfigDialog, setOpenReportConfigDialog] = useState(false);
    const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
    const [endDate, setEndDate] = useState(new Date());
    const [reportType, setReportType] = useState('monthly');
    const [reportData, setReportData] = useState([]);
    const [reportColumns, setReportColumns] = useState([
        { id: 'property_title', label: 'Property Title', checked: true },
        { id: 'city', label: 'City', checked: true },
        { id: 'state', label: 'State', checked: true },
        { id: 'property_value', label: 'Value (₹)', checked: true },
        { id: 'status', label: 'Status', checked: true },
        { id: 'created_at', label: 'Date Added', checked: true },
        { id: 'owner_name', label: 'Owner', checked: false },
        { id: 'owner_contact', label: 'Contact', checked: false },
        { id: 'area', label: 'Area', checked: false },
        { id: 'builtup_area', label: 'Built-up Area', checked: false },
    ]);

    // Businesses states
    const [businesses, setBusinesses] = useState([]);
    const [loadingBusinesses, setLoadingBusinesses] = useState(true);
    const [businessSearchTerm, setBusinessSearchTerm] = useState('');
    const [businessFilters, setBusinessFilters] = useState({
        businessType: '',
        city: '',
        state: ''
    });
    const [businessesPage, setBusinessesPage] = useState(1);
    const businessesPerPage = 9;

    // Carousel state
    const [openCarousel, setOpenCarousel] = useState(false);

    // Fetch subscription status
    useEffect(() => {
        if (userId) {
            axios.get(`${baseurl}/user-subscriptions/user-id/${userId}/`)
                .then(response => {
                    const data = response.data;
                    const latest = data.find(item => item.latest_status !== undefined);
                    if (latest && latest.latest_status === "paid") {
                        setSubscriptionPaid(true);
                    } else {
                        setSubscriptionPaid(false);
                    }
                })
                .catch(error => {
                    console.error("Subscription fetch error:", error);
                });
        }
    }, [userId]);

    // Fetch properties
    useEffect(() => {
        const fetchProperties = async () => {
            const userId = localStorage.getItem("user_id");
            try {
                const response = await fetch(`${baseurl}/properties/approval-status/approved/`);
                const data = await response.json();

                // Filter out properties where user_id matches the current user's id
                const filteredProperties = data.filter(
                    (property) => property.user_id?.toString() !== userId
                );

                setProperties(filteredProperties);
                setFilteredProperties(filteredProperties);

                // Extract unique cities and states for filters
                const cities = [...new Set(filteredProperties.map(p => p.city).filter(Boolean))].sort();
                const states = [...new Set(filteredProperties.map(p => p.state).filter(Boolean))].sort();
                setAvailableCities(cities);
                setAvailableStates(states);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    // Filter and sort properties
    useEffect(() => {
        let results = [...properties];

        // Apply text search filter
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
                    property.total_property_value?.toString(),
                    property.area?.toString(),
                    property.builtup_area?.toString(),
                    property.property_type,
                    property.looking_to
                ].filter(Boolean);

                return searchFields.some(field => field.toLowerCase().includes(query));
            });
        }

        // Apply advanced filters
        if (filters.city) {
            results = results.filter(property =>
                property.city?.toLowerCase() === filters.city.toLowerCase()
            );
        }

        if (filters.state) {
            results = results.filter(property =>
                property.state?.toLowerCase() === filters.state.toLowerCase()
            );
        }

        if (filters.propertyType) {
            results = results.filter(property =>
                property.property_type === filters.propertyType
            );
        }

        if (filters.status) {
            results = results.filter(property =>
                property.status?.toLowerCase() === filters.status.toLowerCase()
            );
        }

        if (filters.facing) {
            results = results.filter(property =>
                property.facing === filters.facing
            );
        }

        if (filters.ownershipType) {
            results = results.filter(property =>
                property.ownership_type === filters.ownershipType
            );
        }

        if (filters.areaUnit) {
            results = results.filter(property =>
                property.area_unit === filters.areaUnit
            );
        }

        // Price range filter
        if (filters.priceRange.min) {
            const minPrice = parseFloat(filters.priceRange.min);
            results = results.filter(property => {
                const price = property.total_property_value || property.property_value || 0;
                return price >= minPrice;
            });
        }

        if (filters.priceRange.max) {
            const maxPrice = parseFloat(filters.priceRange.max);
            results = results.filter(property => {
                const price = property.total_property_value || property.property_value || 0;
                return price <= maxPrice;
            });
        }

        // Area range filter
        if (filters.areaRange.min) {
            const minArea = parseFloat(filters.areaRange.min);
            results = results.filter(property => {
                const area = parseFloat(property.area) || 0;
                return area >= minArea;
            });
        }

        if (filters.areaRange.max) {
            const maxArea = parseFloat(filters.areaRange.max);
            results = results.filter(property => {
                const area = parseFloat(property.area) || 0;
                return area <= maxArea;
            });
        }

        // Built-up area filter
        if (filters.builtupArea.min) {
            const minBuiltup = parseFloat(filters.builtupArea.min);
            results = results.filter(property => {
                const builtup = parseFloat(property.builtup_area) || 0;
                return builtup >= minBuiltup;
            });
        }

        if (filters.builtupArea.max) {
            const maxBuiltup = parseFloat(filters.builtupArea.max);
            results = results.filter(property => {
                const builtup = parseFloat(property.builtup_area) || 0;
                return builtup <= maxBuiltup;
            });
        }

        // Bedrooms filter
        if (filters.bedrooms) {
            results = results.filter(property =>
                property.bedrooms === parseInt(filters.bedrooms)
            );
        }

        // Bathrooms filter
        if (filters.bathrooms) {
            results = results.filter(property =>
                property.bathrooms === parseInt(filters.bathrooms)
            );
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
                results.sort((a, b) =>
                    (b.total_property_value || b.property_value || 0) -
                    (a.total_property_value || a.property_value || 0)
                );
                break;
            case 'price-low':
                results.sort((a, b) =>
                    (a.total_property_value || a.property_value || 0) -
                    (b.total_property_value || b.property_value || 0)
                );
                break;
            case 'area-high':
                results.sort((a, b) => (parseFloat(b.area) || 0) - (parseFloat(a.area) || 0));
                break;
            case 'area-low':
                results.sort((a, b) => (parseFloat(a.area) || 0) - (parseFloat(b.area) || 0));
                break;
            case 'sold':
                results = results.filter((property) => property.status?.toLowerCase() === 'sold');
                break;
            case 'available':
                results = results.filter((property) => property.status?.toLowerCase() === 'available');
                break;
            case 'booked':
                results = results.filter((property) => property.status?.toLowerCase() === 'booked');
                break;
            default:
                break;
        }

        setFilteredProperties(results);
        setPropertiesPage(1); // Reset to first page when filters change
    }, [searchQuery, sortBy, filters, properties]);

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
    }, [userId]);

    // Fetch likes
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const res = await axios.get(`${baseurl}/likes/`);
                const userLikes = res.data
                    .filter(item => item.user === parseInt(userId))
                    .map(item => item.property);
                setLikedProperties(userLikes);
            } catch (err) {
                console.error("Error fetching likes:", err);
            }
        };

        if (userId) fetchLikes();
    }, [userId]);

    // Fetch wishlist
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await axios.get(`${baseurl}/wishlist/`);
                const userWishlist = res.data
                    .filter(item => item.user === parseInt(userId))
                    .map(item => item.property);
                setWishlist(userWishlist);
            } catch (err) {
                console.error("Error fetching wishlist:", err);
            }
        };

        if (userId) fetchWishlist();
    }, [userId]);

    // Filter businesses
    const filteredBusinesses = businesses.filter(business => {
        if (businessSearchTerm) {
            const matchesSearch = business.business_type?.toLowerCase().includes(businessSearchTerm.toLowerCase()) ||
                business.business_name?.toLowerCase().includes(businessSearchTerm.toLowerCase());
            if (!matchesSearch) return false;
        }

        if (businessFilters.businessType) {
            if (business.business_type?.toLowerCase() !== businessFilters.businessType.toLowerCase()) {
                return false;
            }
        }

        if (businessFilters.city) {
            if (business.city?.toLowerCase() !== businessFilters.city.toLowerCase()) {
                return false;
            }
        }

        if (businessFilters.state) {
            if (business.state?.toLowerCase() !== businessFilters.state.toLowerCase()) {
                return false;
            }
        }

        return true;
    });

    const businessesTotalPages = Math.ceil(filteredBusinesses.length / businessesPerPage);
    const businessesStartIndex = (businessesPage - 1) * businessesPerPage;
    const paginatedBusinesses = filteredBusinesses.slice(businessesStartIndex, businessesStartIndex + businessesPerPage);

    // Handlers
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePriceRangeChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            priceRange: {
                ...prev.priceRange,
                [field]: value
            }
        }));
    };

    const handleAreaRangeChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            areaRange: {
                ...prev.areaRange,
                [field]: value
            }
        }));
    };

    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        setSelectedRole(newRole);
        setPropertiesPage(1);
    };

    const mapRole = (role) => {
        switch (role) {
            case 'Agent': return 'Team';
            case 'Client': return 'User';
            case 'Admin': return 'Admin';
            case 'All': return 'All Properties';
            default: return role;
        }
    };

    const handleBuiltupAreaChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            builtupArea: {
                ...prev.builtupArea,
                [field]: value
            }
        }));
    };

    const clearFilters = () => {
        setFilters({
            propertyType: '',
            priceRange: { min: '', max: '' },
            areaRange: { min: '', max: '' },
            bedrooms: '',
            bathrooms: '',
            city: '',
            state: '',
            status: '',
            facing: '',
            ownershipType: '',
            builtupArea: { min: '', max: '' },
            areaUnit: ''
        });
        setSearchQuery('');
        setSortBy('latest');
    };

    const handleBusinessFilterChange = (field, value) => {
        setBusinessFilters(prev => ({
            ...prev,
            [field]: value
        }));
        setBusinessesPage(1);
    };

    const clearBusinessFilters = () => {
        setBusinessFilters({
            businessType: '',
            city: '',
            state: ''
        });
        setBusinessSearchTerm('');
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

    // Like toggle handler
    const handleLikeToggle = async (propertyId) => {
        if (!userId) {
            alert("Please log in to like a property.");
            return;
        }

        try {
            if (likedProperties.includes(propertyId)) {
                // Remove like
                const res = await axios.get(`${baseurl}/likes/`);
                const item = res.data.find(
                    (entry) => entry.user === parseInt(userId) && entry.property === propertyId
                );
                if (item) {
                    await axios.delete(`${baseurl}/likes/${item.id}/`);
                    setLikedProperties(prev => prev.filter(id => id !== propertyId));
                }
            } else {
                // Add like
                await axios.post(`${baseurl}/likes/`, {
                    user: parseInt(userId),
                    property: propertyId
                });
                setLikedProperties(prev => [...prev, propertyId]);
            }
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    // Wishlist toggle handler
    const handleWishlistToggle = async (propertyId) => {
        if (!userId) {
            alert("Please log in to add to wishlist.");
            return;
        }

        try {
            if (wishlist.includes(propertyId)) {
                // Remove from wishlist
                const res = await axios.get(`${baseurl}/wishlist/`);
                const item = res.data.find(
                    (entry) => entry.user === parseInt(userId) && entry.property === propertyId
                );

                if (item) {
                    await axios.delete(`${baseurl}/wishlist/${item.id}/`);
                    setWishlist((prev) => prev.filter((id) => id !== propertyId));
                }
            } else {
                // Add to wishlist
                await axios.post(`${baseurl}/wishlist/`, {
                    user: parseInt(userId),
                    property: propertyId,
                });
                setWishlist((prev) => [...prev, propertyId]);
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    };

    // Image navigation handlers
    const handleNextImage = (propertyId, totalMedia) => (e) => {
        e.stopPropagation();
        setCurrentImageIndices(prev => ({
            ...prev,
            [propertyId]: (prev[propertyId] || 0) < totalMedia - 1 ? (prev[propertyId] || 0) + 1 : 0
        }));
    };

    const handlePrevImage = (propertyId, totalMedia) => (e) => {
        e.stopPropagation();
        setCurrentImageIndices(prev => ({
            ...prev,
            [propertyId]: (prev[propertyId] || 0) > 0 ? (prev[propertyId] || 0) - 1 : totalMedia - 1
        }));
    };

    // Get all media (images + videos) for a property
    const getAllMedia = (property) => {
        const media = [];

        // Add images
        if (property.images && property.images.length > 0) {
            media.push(...property.images.map(img => ({
                type: 'image',
                url: `${baseurl}${img.image}`,
                alt: `Property image`
            })));
        }

        // Add videos
        if (property.videos && property.videos.length > 0) {
            media.push(...property.videos.map(vid => ({
                type: 'video',
                url: `${baseurl}${vid.video}`,
                alt: `Property video`
            })));
        }

        return media;
    };

    // Get current media URL
    const getCurrentMediaUrl = (property) => {
        const media = getAllMedia(property);
        if (media.length === 0) return 'https://via.placeholder.com/300';

        const currentIndex = currentImageIndices[property.property_id] || 0;
        return media[currentIndex]?.url || 'https://via.placeholder.com/300';
    };

    // Check if current media is video
    const isCurrentMediaVideo = (property) => {
        const media = getAllMedia(property);
        if (media.length === 0) return false;

        const currentIndex = currentImageIndices[property.property_id] || 0;
        return media[currentIndex]?.type === 'video';
    };

    // View details handler
const handleViewDetails = async (property) => {
  try {
    await fetch(`${baseurl}/property/${property.property_id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        view_count: (property.view_count || 0) + 1
      })
    });

    console.log("View count updated");
  } catch (error) {
    console.log("Error updating view count:", error);
  }

  // navigate after update
  navigate(`/p-assets/${property.property_id}`, {
    state: { property }
  });
};

    // Report generation functions
    const openReportConfiguration = () => {
        setOpenReportConfigDialog(true);
    };

    const closeReportConfiguration = () => {
        setOpenReportConfigDialog(false);
    };

    const generateReport = () => {
        let filtered = [...properties];

        filtered = filtered.filter(property => {
            const propertyDate = new Date(property.created_at);
            return propertyDate >= startDate && propertyDate <= endDate;
        });

        if (reportType === 'monthly') {
            const grouped = filtered.reduce((acc, property) => {
                const date = new Date(property.created_at);
                const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

                if (!acc[monthYear]) {
                    acc[monthYear] = [];
                }
                acc[monthYear].push(property);
                return acc;
            }, {});

            const report = Object.entries(grouped).map(([monthYear, properties]) => ({
                period: monthYear,
                count: properties.length,
                totalValue: properties.reduce((sum, p) => sum + (p.total_property_value || p.property_value || 0), 0),
                properties
            }));

            setReportData(report);
        } else if (reportType === 'yearly') {
            const grouped = filtered.reduce((acc, property) => {
                const date = new Date(property.created_at);
                const year = date.getFullYear().toString();

                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push(property);
                return acc;
            }, {});

            const report = Object.entries(grouped).map(([year, properties]) => ({
                period: year,
                count: properties.length,
                totalValue: properties.reduce((sum, p) => sum + (p.total_property_value || p.property_value || 0), 0),
                properties
            }));

            setReportData(report);
        } else {
            setReportData([{
                period: `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
                count: filtered.length,
                totalValue: filtered.reduce((sum, p) => sum + (p.total_property_value || p.property_value || 0), 0),
                properties: filtered
            }]);
        }

        setOpenReportConfigDialog(false);
        setOpenReportDialog(true);
    };

    const exportToCSV = () => {
        const activeColumns = reportColumns.filter(col => col.checked).map(col => col.id);

        let csv = activeColumns.map(col =>
            reportColumns.find(rc => rc.id === col)?.label || col
        ).join(',') + '\n';

        reportData.forEach(group => {
            group.properties.forEach(property => {
                const row = activeColumns.map(col => {
                    if (col === 'created_at') {
                        return `"${new Date(property[col]).toLocaleDateString()}"`;
                    }
                    if (col === 'property_value') {
                        return `"₹${property.total_property_value || property.property_value || 0}"`;
                    }
                    return `"${property[col] || ''}"`;
                }).join(',');
                csv += row + '\n';
            });
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `property_report_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const exportToPDF = () => {
        const pdfContent = `
            Property Report\n\n
            Period: ${reportData[0]?.period || ''}\n
            Total Properties: ${reportData.reduce((sum, group) => sum + group.count, 0)}\n
            Total Value: ₹${reportData.reduce((sum, group) => sum + group.totalValue, 0).toLocaleString()}\n\n
            ${reportColumns.filter(col => col.checked).map(col => col.label).join(' | ')}\n
            ${reportData.flatMap(group =>
            group.properties.map(property =>
                reportColumns.filter(col => col.checked).map(col =>
                    col.id === 'created_at'
                        ? new Date(property[col.id]).toLocaleDateString()
                        : property[col.id] || ''
                ).join(' | ')
            ).join('\n')
        ).join('\n')}
        `;

        alert('In a real implementation, this would generate a PDF with the following content:\n\n' + pdfContent);
    };

    const printReport = () => {
        const printContent = `
            <html>
                <head>
                    <title>Property Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        h1 { color: #333; }
                        .report-header { margin-bottom: 20px; }
                        .report-summary { margin-bottom: 30px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .period { font-weight: bold; margin-top: 20px; }
                        .summary-item { margin: 5px 0; }
                    </style>
                </head>
                <body>
                    <h1>Property Report</h1>
                    <div class="report-header">
                        <div class="summary-item">Generated on: ${new Date().toLocaleDateString()}</div>
                        <div class="summary-item">Report period: ${reportData[0]?.period || ''}</div>
                    </div>
                    <div class="report-summary">
                        <h3>Summary</h3>
                        <div class="summary-item">Total properties: ${reportData.reduce((sum, group) => sum + group.count, 0)}</div>
                        <div class="summary-item">Total value: ₹${reportData.reduce((sum, group) => sum + group.totalValue, 0).toLocaleString()}</div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                ${reportColumns.filter(col => col.checked).map(col => `<th>${col.label}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${reportData.flatMap(group =>
            group.properties.map(property =>
                `<tr>
                            ${reportColumns.filter(col => col.checked).map(col =>
                    `<td>${col.id === 'created_at'
                        ? new Date(property[col.id]).toLocaleDateString()
                        : property[col.id] || ''
                    }</td>`
                ).join('')}
                        </tr>`
            ).join('')
        ).join('')}
                        </tbody>
                    </table>
                    <script>
                        window.onload = function() {
                            window.print();
                            setTimeout(function() { window.close(); }, 1000);
                        };
                    </script>
                </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
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

    // Property type options
    const propertyTypeOptions = [
        'Residential',
        'Commercial',
        'Industrial',
        'Agricultural',
        'Mixed Use',
        'Land'
    ];

    // Status options
    const statusOptions = ['Available', 'Sold', 'Booked', 'Rented'];

    // Facing options
    const facingOptions = [
        'North',
        'South',
        'East',
        'West',
        'North-East',
        'North-West',
        'South-East',
        'South-West'
    ];

    // Ownership type options
    const ownershipTypeOptions = [
        'Freehold',
        'Leasehold',
        'Co-operative Society',
        'Power of Attorney'
    ];

    // Area unit options
    const areaUnitOptions = [
        'sq.ft',
        'sq.m',
        'sq.yard',
        'acre',
        'hectare',
        'gunta',
        'bigha'
    ];

    // Bedroom options
    const bedroomOptions = ['1', '2', '3', '4', '5+'];

    // Bathroom options
    const bathroomOptions = ['1', '2', '3', '4+'];

    return (
        <>
            <InvestorHeader />
            <Container sx={{ py: 4 }}>
                {/* Header Section */}
                {/* <Box position="relative" mb={3} height="56px">
                    <Typography variant="h4" align="center" sx={{ lineHeight: '46px' }}>
                        client Dashboard
                    </Typography>
                </Box> */}

                {/* Tabs Section */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={activeTab} onChange={handleTabChange} centered>
                        <Tab label="Properties" />
                        <Tab label="Businesses" />
                    </Tabs>
                </Box>

                {/* Properties Tab Content */}
                {activeTab === 0 && (
                    <>
                        {/* Header with Add Property and Report Buttons */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 3,
                                flexDirection: { xs: "column", sm: "row" },
                                gap: 2,
                            }}
                        >
                            {/* <Typography
                                                    variant="h4"
                                                    sx={{ textAlign: { xs: "center", sm: "left" } }}
                                                    fontWeight="bold"
                                                >
                                                    Properties
                                                </Typography> */}

                            {/* <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 2,
                                                        ml: { sm: "auto" },
                                                        width: { xs: "100%", sm: "auto" },
                                                        flexDirection: { xs: "column", sm: "row" }
                                                    }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            padding: "12px 24px",
                                                            borderRadius: "8px",
                                                            backgroundColor: "#2ECC71",
                                                            textTransform: "none",
                                                            fontWeight: 500,
                                                            width: { xs: "100%", sm: "auto" },
                                                            "&:hover": {
                                                                backgroundColor: "#27AE60",
                                                            },
                                                        }}
                                                        onClick={() => navigate("/add-property")}
                                                    >
                                                        Add Property
                                                    </Button>
                    
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={openReportConfiguration}
                                                        startIcon={<DescriptionIcon />}
                                                        sx={{
                                                            px: 3,
                                                            py: 1,
                                                            height: "55px",
                                                            width: { xs: "100%", sm: "auto" },
                                                        }}
                                                    >
                                                        Generate All Properties Report
                                                    </Button>
                                                </Box> */}
                        </Box>
                        {/* Search, Sort and Filter Section */}
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
                                <Grid item xs={12} md={4}>
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

                                {/* ROLE FILTER */}
                                {/* <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="role-filter-label">Filter by Role</InputLabel>
                                        <Select
                                            labelId="role-filter-label"
                                            value={selectedRole}
                                            label="Filter by Role"
                                            onChange={handleRoleChange}
                                            sx={{
                                                borderRadius: '8px',
                                                fontSize: '15px'
                                            }}
                                        >
                                            {uniqueRoles.map((role) => (
                                                <MenuItem key={role} value={role}>
                                                    {mapRole(role)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> */}
                                {/* <Grid item xs={12} md={4}>
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
                                            <MenuItem value="area-high">Area: High to Low</MenuItem>
                                            <MenuItem value="area-low">Area: Low to High</MenuItem>
                                            <MenuItem value="sold">Sold</MenuItem>
                                            <MenuItem value="available">Available</MenuItem>
                                            <MenuItem value="booked">Booked</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid> */}

                            </Grid>

                            {/* Advanced Filters Panel */}
                            {showFilters && (
                                <Box sx={{ mt: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <Autocomplete
                                                options={availableCities}
                                                value={filters.city}
                                                onChange={(event, newValue) => handleFilterChange('city', newValue)}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="City" variant="outlined" />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Autocomplete
                                                options={availableStates}
                                                value={filters.state}
                                                onChange={(event, newValue) => handleFilterChange('state', newValue)}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="State" variant="outlined" />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl fullWidth>
                                                <InputLabel>Property Type</InputLabel>
                                                <Select
                                                    value={filters.propertyType}
                                                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                                                    label="Property Type"
                                                >
                                                    <MenuItem value="">All</MenuItem>
                                                    {propertyTypeOptions.map(type => (
                                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <FormControl fullWidth>
                                                <InputLabel>Status</InputLabel>
                                                <Select
                                                    value={filters.status}
                                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                                    label="Status"
                                                >
                                                    <MenuItem value="">All</MenuItem>
                                                    {statusOptions.map(status => (
                                                        <MenuItem key={status} value={status.toLowerCase()}>{status}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <FormControl fullWidth>
                                                <InputLabel>Facing</InputLabel>
                                                <Select
                                                    value={filters.facing}
                                                    onChange={(e) => handleFilterChange('facing', e.target.value)}
                                                    label="Facing"
                                                >
                                                    <MenuItem value="">Any</MenuItem>
                                                    {facingOptions.map(facing => (
                                                        <MenuItem key={facing} value={facing}>{facing}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <FormControl fullWidth>
                                                <InputLabel>Ownership Type</InputLabel>
                                                <Select
                                                    value={filters.ownershipType}
                                                    onChange={(e) => handleFilterChange('ownershipType', e.target.value)}
                                                    label="Ownership Type"
                                                >
                                                    <MenuItem value="">Any</MenuItem>
                                                    {ownershipTypeOptions.map(type => (
                                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <TextField
                                                fullWidth
                                                label="Min Price (₹)"
                                                type="number"
                                                value={filters.priceRange.min}
                                                onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <TextField
                                                fullWidth
                                                label="Max Price (₹)"
                                                type="number"
                                                value={filters.priceRange.max}
                                                onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                                                variant="outlined"
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <TextField
                                                fullWidth
                                                label="Min Area"
                                                type="number"
                                                value={filters.areaRange.min}
                                                onChange={(e) => handleAreaRangeChange('min', e.target.value)}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <TextField
                                                fullWidth
                                                label="Max Area"
                                                type="number"
                                                value={filters.areaRange.max}
                                                onChange={(e) => handleAreaRangeChange('max', e.target.value)}
                                                variant="outlined"
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <FormControl fullWidth>
                                                <InputLabel>Bedrooms</InputLabel>
                                                <Select
                                                    value={filters.bedrooms}
                                                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                                                    label="Bedrooms"
                                                >
                                                    <MenuItem value="">Any</MenuItem>
                                                    {bedroomOptions.map(bed => (
                                                        <MenuItem key={bed} value={bed}>{bed}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <FormControl fullWidth>
                                                <InputLabel>Bathrooms</InputLabel>
                                                <Select
                                                    value={filters.bathrooms}
                                                    onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                                                    label="Bathrooms"
                                                >
                                                    <MenuItem value="">Any</MenuItem>
                                                    {bathroomOptions.map(bath => (
                                                        <MenuItem key={bath} value={bath}>{bath}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <FormControl fullWidth>
                                                <InputLabel>Area Unit</InputLabel>
                                                <Select
                                                    value={filters.areaUnit}
                                                    onChange={(e) => handleFilterChange('areaUnit', e.target.value)}
                                                    label="Area Unit"
                                                >
                                                    <MenuItem value="">Any</MenuItem>
                                                    {areaUnitOptions.map(unit => (
                                                        <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={clearFilters}
                                                    startIcon={<ClearIcon />}
                                                >
                                                    Clear Filters
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                        </Box>

                        {/* Properties Count */}
                        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                            Showing {filteredProperties.length} of {properties.length} properties
                        </Typography>

                        {/* Properties Cards */}
                        {filteredProperties.length > 0 ? (
                            <>
                                <Grid container spacing={3}>
                                    {paginatedProperties.map((property) => {
                                        const media = getAllMedia(property);
                                        const currentIndex = currentImageIndices[property.property_id] || 0;
                                        const totalMedia = media.length;

                                        return (
                                            <Grid item xs={12} md={6} lg={4} key={property.property_id}>
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
                                                        {isCurrentMediaVideo(property) ? (
                                                            <Box sx={{ height: '220px', position: 'relative' }}>
                                                                <video
                                                                    controls
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '220px',
                                                                        objectFit: 'cover',
                                                                        borderRadius: '12px 12px 0 0',
                                                                        cursor: 'pointer'
                                                                    }}
                                                                    onClick={() => handleImageClick(property)}
                                                                >
                                                                    <source src={getCurrentMediaUrl(property)} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                                <VideocamIcon
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        top: 8,
                                                                        left: 8,
                                                                        color: 'white',
                                                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                                                        borderRadius: '50%',
                                                                        padding: '4px'
                                                                    }}
                                                                />
                                                            </Box>
                                                        ) : (
                                                            <CardMedia
                                                                component="img"
                                                                height="220"
                                                                image={getCurrentMediaUrl(property)}
                                                                alt={property.property_title}
                                                                sx={{ objectFit: 'cover', borderRadius: '12px 12px 0 0', cursor: 'pointer' }}
                                                                onClick={() => handleImageClick(property)}
                                                            />
                                                        )}

                                                        {/* Navigation arrows when there are multiple media items */}
                                                        {totalMedia > 1 && (
                                                            <>
                                                                <IconButton
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        left: 10,
                                                                        top: '50%',
                                                                        transform: 'translateY(-50%)',
                                                                        backgroundColor: 'rgba(36, 36, 36, 0.5)',
                                                                        color: 'white',
                                                                        '&:hover': {
                                                                            backgroundColor: 'rgba(0,0,0,0.7)'
                                                                        }
                                                                    }}
                                                                    onClick={handlePrevImage(property.property_id, totalMedia)}
                                                                >
                                                                    <ChevronLeftIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        right: 10,
                                                                        top: '50%',
                                                                        transform: 'translateY(-50%)',
                                                                        backgroundColor: 'rgba(90, 81, 81, 0.5)',
                                                                        color: 'white',
                                                                        '&:hover': {
                                                                            backgroundColor: 'rgba(0,0,0,0.7)'
                                                                        }
                                                                    }}
                                                                    onClick={handleNextImage(property.property_id, totalMedia)}
                                                                >
                                                                    <ChevronRightIcon />
                                                                </IconButton>
                                                                {/* Media counter */}
                                                                <Box
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        bottom: 10,
                                                                        right: 10,
                                                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                                                        color: 'white',
                                                                        px: 1,
                                                                        borderRadius: '4px',
                                                                        fontSize: '0.75rem'
                                                                    }}
                                                                >
                                                                    {`${currentIndex + 1}/${totalMedia}`}
                                                                </Box>
                                                            </>
                                                        )}
                                                    </Box>
                                                    <CardContent>
                                                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                                                            <Typography fontWeight="bold">
                                                                {property.property_title}
                                                            </Typography>
                                                            <Chip
                                                                label={property.status}
                                                                size="small"
                                                                sx={{
                                                                    backgroundColor:
                                                                        property.status === 'available'
                                                                            ? '#2ECC71'
                                                                            : property.status === 'booked'
                                                                                ? '#E67E22'
                                                                                : property.status === 'sold'
                                                                                    ? '#E74C3C'
                                                                                    : '#95A5A6',
                                                                    color: 'white',
                                                                    fontWeight: 'bold',
                                                                    textTransform: 'uppercase',
                                                                    fontSize: '0.7rem',
                                                                    minWidth: '70px'
                                                                }}
                                                            />
                                                        </Box>

                                                        <Typography variant="body2" color="text.secondary" mb={2}>
                                                            {property.city}, {property.state}
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
                                                                    ₹{property.total_property_value || property.property_value}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    Type
                                                                </Typography>
                                                                <Typography fontWeight="600" color="#4A90E2">
                                                                    {property.property_type}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'flex-end',
                                                                    alignItems: 'center',
                                                                    gap: 1.5,
                                                                    mt: 0.5,
                                                                }}
                                                            >
                                                                {/* Wishlist Button */}
                                                                <IconButton
                                                                    onClick={() => handleWishlistToggle(property.property_id)}
                                                                    sx={{
                                                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                                                        '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                                                                    }}
                                                                >
                                                                    {wishlist.includes(property.property_id) ? (
                                                                        <FavoriteIcon sx={{ color: 'red' }} />
                                                                    ) : (
                                                                        <FavoriteBorderIcon sx={{ color: 'red' }} />
                                                                    )}
                                                                </IconButton>

                                                                {/* Like Button */}
                                                                <IconButton
                                                                    onClick={() => handleLikeToggle(property.property_id)}
                                                                    size="small"
                                                                    sx={{
                                                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                                                        '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                                                                        color: likedProperties.includes(property.property_id)
                                                                            ? '#1a73e8'
                                                                            : 'grey',
                                                                    }}
                                                                >
                                                                    {likedProperties.includes(property.property_id) ? (
                                                                        <ThumbUpAltIcon />
                                                                    ) : (
                                                                        <ThumbUpAltOutlinedIcon />
                                                                    )}
                                                                </IconButton>

                                                                {/* Call Button */}
                                                                <IconButton
                                                                    component="a"
                                                                    href={`tel:${subscriptionPaid ? property.owner_contact : '9074307248'}`}
                                                                    size="small"
                                                                    sx={{
                                                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                                                        '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                                                                        color: '#4caf50',
                                                                    }}
                                                                >
                                                                    <CallIcon />
                                                                </IconButton>
                                                            </Box>
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
                                                                {subscriptionPaid && property.referral_id ? (
                                                                    <Grid item xs={12}>
                                                                        <Typography
                                                                            variant="body2"
                                                                            fontWeight="bold"
                                                                            color="#E67E22"
                                                                            textAlign="center"
                                                                            display="flex"
                                                                            justifyContent="center"
                                                                            alignItems="center"
                                                                            gap={1}
                                                                        >
                                                                            Added by: {property.username}
                                                                        </Typography>
                                                                        <Typography
                                                                            variant="body2"
                                                                            fontWeight="bold"
                                                                            color="#E67E22"
                                                                            textAlign="center"
                                                                            display="flex"
                                                                            justifyContent="center"
                                                                            alignItems="center"
                                                                            gap={1}
                                                                        >
                                                                            Referral ID: {property.referral_id}
                                                                        </Typography>
                                                                    </Grid>
                                                                ) : null}
                                                            </Grid>
                                                        </Box>

                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Button
  fullWidth
  variant="contained"
  sx={{
    color: 'white',
    textTransform: 'none',
    '&:hover': { color: 'rgb(5,5,5)' }
  }}
  disabled={!subscriptionPaid}
  onClick={(e) => handleViewDetails(property, e)}
>
  VIEW DETAILS
</Button>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Button
                                                                    fullWidth
                                                                    variant="contained"
                                                                    sx={{
                                                                        backgroundColor: '#1976d2',
                                                                        color: 'white',
                                                                        textTransform: 'none',
                                                                        '&:hover': { backgroundColor: '#115293' }
                                                                    }}
                                                                    disabled={!subscriptionPaid || property.status !== 'available'}
                                                                    onClick={() => navigate(`/i-bookingassets?property_id=${property.property_id}`)}
                                                                >
                                                                    {property.looking_to === 'sell' ? 'Buy Now' : 'Rent Now'}
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        );
                                    })}
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
                        {/* Business Search and Filters */}
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
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Search businesses..."
                                        variant="outlined"
                                        value={businessSearchTerm}
                                        onChange={handleBusinessSearchChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Business Type"
                                        variant="outlined"
                                        value={businessFilters.businessType}
                                        onChange={(e) => handleBusinessFilterChange('businessType', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        variant="outlined"
                                        value={businessFilters.city}
                                        onChange={(e) => handleBusinessFilterChange('city', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={clearBusinessFilters}
                                            startIcon={<ClearIcon />}
                                        >
                                            Clear Filters
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => navigate('/add-business')}
                                        >
                                            Add Business
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Business Count */}
                        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                            Showing {filteredBusinesses.length} of {businesses.length} businesses
                        </Typography>

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
                                                onClick={() => navigate(`/i-businessproducts/${business.business_id}`)}
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
                        {selectedProperty && getAllMedia(selectedProperty).length > 0 ? (
                            <Carousel
                                showThumbs={false}
                                infiniteLoop
                                useKeyboardArrows
                                dynamicHeight
                                autoPlay
                                emulateTouch
                            >
                                {getAllMedia(selectedProperty)
                                    .filter((media) => media.type === 'image')
                                    .map((media, idx) => (
                                        <div key={idx}>
                                            <img
                                                src={media.url}
                                                alt={media.alt || `Image ${idx + 1}`}
                                                style={{
                                                    borderRadius: 8,
                                                    maxHeight: '550px',
                                                    objectFit: 'cover',
                                                    width: '100%',
                                                }}
                                            />
                                        </div>
                                    ))}
                            </Carousel>
                        ) : (
                            <Typography color="white">No media available.</Typography>
                        )}
                    </Box>
                </Dialog>

                {/* Report Configuration Dialog */}
                <Dialog open={openReportConfigDialog} onClose={closeReportConfiguration} maxWidth="sm" fullWidth>
                    <DialogTitle>Generate Property Report</DialogTitle>
                    <DialogContent dividers>
                        <Stack spacing={3} sx={{ mt: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="report-type-label">Report Type</InputLabel>
                                <Select
                                    labelId="report-type-label"
                                    value={reportType}
                                    onChange={(e) => setReportType(e.target.value)}
                                    label="Report Type"
                                >
                                    <MenuItem value="monthly">Monthly</MenuItem>
                                    <MenuItem value="yearly">Yearly</MenuItem>
                                    <MenuItem value="custom">Custom Date Range</MenuItem>
                                </Select>
                            </FormControl>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Start Date
                                    </Typography>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        customInput={
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EventIcon color="action" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        }
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        End Date
                                    </Typography>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        customInput={
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CalendarMonthIcon color="action" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        }
                                    />
                                </Box>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                    Select Columns to Include
                                </Typography>
                                <FormGroup>
                                    {reportColumns.map((column) => (
                                        <FormControlLabel
                                            key={column.id}
                                            control={
                                                <Checkbox
                                                    checked={column.checked}
                                                    onChange={(e) => {
                                                        const updatedColumns = reportColumns.map(col =>
                                                            col.id === column.id ? { ...col, checked: e.target.checked } : col
                                                        );
                                                        setReportColumns(updatedColumns);
                                                    }}
                                                />
                                            }
                                            label={column.label}
                                        />
                                    ))}
                                </FormGroup>
                            </Box>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeReportConfiguration} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={generateReport} variant="contained" color="primary">
                            Generate Report
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Report Display Dialog */}
                <Dialog open={openReportDialog} onClose={() => setOpenReportDialog(false)} maxWidth="lg" fullWidth>
                    <DialogTitle>Property Report</DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Report Summary
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                                <Box>
                                    <Typography variant="subtitle2">Report Period</Typography>
                                    <Typography>{reportData.length > 0 ? reportData[0].period : ''}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2">Total Properties</Typography>
                                    <Typography>{reportData.reduce((sum, group) => sum + group.count, 0)}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2">Total Value</Typography>
                                    <Typography>₹{reportData.reduce((sum, group) => sum + group.totalValue, 0).toLocaleString()}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2">Generated On</Typography>
                                    <Typography>{new Date().toLocaleDateString()}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {reportColumns.filter(col => col.checked).map(column => (
                                            <TableCell key={column.id}>{column.label}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reportData.flatMap(group =>
                                        group.properties.map((property, idx) => (
                                            <TableRow key={`${group.period}-${idx}`}>
                                                {reportColumns.filter(col => col.checked).map(column => (
                                                    <TableCell key={`${property.id}-${column.id}`}>
                                                        {column.id === 'created_at'
                                                            ? new Date(property[column.id]).toLocaleDateString()
                                                            : column.id === 'property_value'
                                                                ? `₹${property.total_property_value || property.property_value || 0}`
                                                                : property[column.id] || '-'}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenReportDialog(false)} color="primary">
                            Close
                        </Button>
                        <Button onClick={printReport} startIcon={<PrintIcon />} color="primary">
                            Print
                        </Button>
                        <Button onClick={exportToPDF} startIcon={<PictureAsPdfIcon />} color="primary">
                            PDF
                        </Button>
                        <Button onClick={exportToCSV} startIcon={<DescriptionIcon />} color="primary">
                            CSV
                        </Button>
                    </DialogActions>
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

export default InvestorLandingPage;