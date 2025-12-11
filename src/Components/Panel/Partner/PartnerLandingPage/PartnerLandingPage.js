import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
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
    Divider,
    Link,
    IconButton,
    Tooltip,
    Popover,
    Pagination,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    DialogContentText,
    FormControlLabel,
    FormGroup,
    Stack,
    InputLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { baseurl } from '../../../BaseURL/BaseURL';
import PaginationComponent from '../../../Shared/Pagination';
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PartnerLandingPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

    // ========== PROPERTIES STATES ==========
    const [sortBy, setSortBy] = useState('latest');
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [subscriptionPaid, setSubscriptionPaid] = useState(false);
    const [currentImageIndices, setCurrentImageIndices] = useState({});
    const [page, setPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);
    const [openCarousel, setOpenCarousel] = useState(false);
    const [compareList, setCompareList] = useState([]);
    const [selectedTypeCategory, setSelectedTypeCategory] = useState('');
    const [commissions, setCommissions] = useState([]);
    const [likedProperties, setLikedProperties] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [hoveredProperty, setHoveredProperty] = useState(null);

    // ========== REPORT GENERATION STATES ==========
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

    // ========== BUSINESSES STATES ==========
    const [businesses, setBusinesses] = useState([]);
    const [loadingBusinesses, setLoadingBusinesses] = useState(true);
    const [businessSearchTerm, setBusinessSearchTerm] = useState('');
    const [businessesPage, setBusinessesPage] = useState(1);
    const businessesPerPage = 9;
    const businessesTotalPages = Math.ceil(businesses.filter(business => 
        !businessSearchTerm || business.business_type?.toLowerCase().includes(businessSearchTerm.toLowerCase())
    ).length / businessesPerPage);
    const businessesStartIndex = (businessesPage - 1) * businessesPerPage;
    const paginatedBusinesses = businesses
        .filter(business => !businessSearchTerm || business.business_type?.toLowerCase().includes(businessSearchTerm.toLowerCase()))
        .slice(businessesStartIndex, businessesStartIndex + businessesPerPage);

    // ========== PROPERTIES FUNCTIONS ==========
    // Fetch liked properties
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

    // Fetch commissions
    useEffect(() => {
        const fetchCommissions = async () => {
            try {
                const response = await axios.get(`${baseurl}/commissions-master/`);
                setCommissions(response.data);
            } catch (error) {
                console.error("Error fetching commissions:", error);
            }
        };
        fetchCommissions();
    }, []);

    // Check subscription status
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

    // Fetch approved properties (excluding user's own properties)
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${baseurl}/properties/approval-status/approved/`);
                const data = await response.json();
                
                // Filter out properties where user_id matches the current user's id
                const filteredProperties = data.filter(
                    (property) => property.user_id?.toString() !== userId
                );
                
                setProperties(filteredProperties);
                setFilteredProperties(filteredProperties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, [userId]);

    // Fetch property types
    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const response = await axios.get(`${baseurl}/property-types/`);
                setPropertyTypes(response.data);
            } catch (error) {
                console.error('Error fetching property types:', error);
            }
        };
        fetchPropertyTypes();
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
        
        // Apply type category filter
        if (selectedTypeCategory) {
            results = results.filter((property) => property.category === selectedTypeCategory);
        }

        setFilteredProperties(results);
    }, [searchQuery, sortBy, properties, selectedTypeCategory]);

    // ========== BUSINESSES FUNCTIONS ==========
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

    // ========== HANDLERS ==========
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(1);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
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

    const handleLikeToggle = async (propertyId) => {
        if (!userId) {
            alert("Please log in to like a property.");
            return;
        }

        try {
            if (likedProperties.includes(propertyId)) {
                const res = await axios.get(`${baseurl}/likes/`);
                const item = res.data.find(
                    (entry) => entry.user === parseInt(userId) && entry.property === propertyId
                );
                if (item) {
                    await axios.delete(`${baseurl}/likes/${item.id}/`);
                    setLikedProperties(prev => prev.filter(id => id !== propertyId));
                }
            } else {
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

    const handleWishlistToggle = async (propertyId) => {
        if (!userId) {
            alert("Please log in to add to wishlist.");
            return;
        }

        try {
            if (wishlist.includes(propertyId)) {
                const res = await axios.get(`${baseurl}/wishlist/`);
                const item = res.data.find(
                    (entry) => entry.user === parseInt(userId) && entry.property === propertyId
                );
                if (item) {
                    await axios.delete(`${baseurl}/wishlist/${item.id}/`);
                    setWishlist((prev) => prev.filter((id) => id !== propertyId));
                }
            } else {
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

    const handleCompareToggle = (property) => {
        setCompareList((prev) => {
            const exists = prev.find((p) => p.property_id === property.property_id);
            if (exists) {
                return prev.filter((p) => p.property_id !== property.property_id);
            } else {
                return [...prev, property];
            }
        });
    };

    const handlePopoverOpen = (event, propertyId) => {
        setAnchorEl(event.currentTarget);
        setHoveredProperty(propertyId);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setHoveredProperty(null);
    };

    const open = Boolean(anchorEl);

    // Function to get all media (images + videos) for a property
    const getAllMedia = (property) => {
        const media = [];

        if (property.images && property.images.length > 0) {
            media.push(...property.images.map(img => ({
                type: 'image',
                url: `${baseurl}${img.image}`,
                alt: `Property image`
            })));
        }

        if (property.videos && property.videos.length > 0) {
            media.push(...property.videos.map(vid => ({
                type: 'video',
                url: `${baseurl}${vid.video}`,
                alt: `Property video`
            })));
        }

        return media;
    };

    // Function to get the current media URL for a property
    const getCurrentMediaUrl = (property) => {
        const media = getAllMedia(property);
        if (media.length === 0) return 'https://via.placeholder.com/300';

        const currentIndex = currentImageIndices[property.property_id] || 0;
        return media[currentIndex]?.url || 'https://via.placeholder.com/300';
    };

    // Function to check if current media is a video
    const isCurrentMediaVideo = (property) => {
        const media = getAllMedia(property);
        if (media.length === 0) return false;

        const currentIndex = currentImageIndices[property.property_id] || 0;
        return media[currentIndex]?.type === 'video';
    };

    const getPropertyTypeName = (property_type_id) => {
        const type = propertyTypes.find(pt => pt.property_type_id === property_type_id);
        return type ? type.name : 'Unknown';
    };

    // ========== REPORT GENERATION FUNCTIONS ==========
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
                totalValue: properties.reduce((sum, p) => sum + (p.property_value || 0), 0),
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
                totalValue: properties.reduce((sum, p) => sum + (p.property_value || 0), 0),
                properties
            }));

            setReportData(report);
        } else {
            setReportData([{
                period: `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
                count: filtered.length,
                totalValue: filtered.reduce((sum, p) => sum + (p.property_value || 0), 0),
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

    return (
        <>
            <PartnerHeader />
            
            {/* ✅ Floating Compare Button */}
            {compareList.length > 0 && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        zIndex: 1300,
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            borderRadius: '50px',
                            px: 3,
                            py: 1.5,
                            boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
                            textTransform: 'none',
                            fontWeight: 'bold',
                        }}
                        onClick={() => navigate("/p-comparelist", { state: { compareList } })}
                    >
                        Compare ({compareList.length})
                    </Button>
                </Box>
            )}

            <Container sx={{ py: 4 }}>
                {/* Header Section */}
                {/* <Box mb={3} height="56px">
                    <Typography variant="h4" align="center" sx={{ lineHeight: '46px' }}>
                        Partner Dashboard
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

                            {/* Right-side Buttons Wrapper */}
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    ml: { sm: "auto" },
                                    width: { xs: "100%", sm: "auto" },
                                    flexDirection: { xs: "column", sm: "row" }
                                }}
                            >
                                {/* <Button
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
                                    onClick={() => navigate("/p-addasset")}
                                >
                                    Add Property
                                </Button> */}

                                {/* <Button
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
                                </Button> */}
                            </Box>
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
                                <Grid item xs={12} md={4}>
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
                                {/* <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <Select
                                            value={sortBy}
                                            onChange={handleSortChange}
                                            displayEmpty
                                            sx={{ borderRadius: '8px', fontSize: '15px' }}
                                        >
                                            <MenuItem value="">
                                                <em>Sort By</em>
                                            </MenuItem>
                                            <MenuItem value="latest">Latest</MenuItem>
                                            <MenuItem value="oldest">Oldest</MenuItem>
                                            <MenuItem value="price-high">Price: High to Low</MenuItem>
                                            <MenuItem value="price-low">Price: Low to High</MenuItem>
                                            <MenuItem value="sold">Sold</MenuItem>
                                            <MenuItem value="available">Available</MenuItem>
                                            <MenuItem value="booked">Booked</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid> */}
                                {/* <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <Select
                                            value={selectedTypeCategory}
                                            onChange={(e) => setSelectedTypeCategory(e.target.value)}
                                            displayEmpty
                                            sx={{ borderRadius: '8px', fontSize: '15px' }}
                                        >
                                            <MenuItem value="">
                                                <em>All Types</em>
                                            </MenuItem>
                                            {propertyTypes.map((type) => (
                                                <MenuItem key={type.property_type_id} value={type.category}>
                                                    {type.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> */}
                            </Grid>
                        </Box>

                        {/* Properties Cards */}
                        {filteredProperties.length > 0 ? (
                            <Grid container spacing={3}>
                                {paginatedProperties.map((property) => {
                                    const media = getAllMedia(property);
                                    const currentIndex = currentImageIndices[property.property_id] || 0;
                                    const totalMedia = media.length;

                                    return (
                                        <Grid item xs={12} md={6} lg={4} key={property.id}>
                                            <Card
                                                sx={{
                                                    borderRadius: 2,
                                                    transition: 'all 0.3s ease',
                                                    position: 'relative',
                                                    cursor: 'pointer',
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
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                        <Typography fontWeight="bold" sx={{ flex: 1, mr: 1 }}>
                                                            {/* Property title will be shown below */}
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
                                                                            : '#E74C3C',
                                                                color: 'white',
                                                                fontWeight: 'bold',
                                                                textTransform: 'uppercase',
                                                                fontSize: '0.7rem',
                                                                minWidth: '70px'
                                                            }}
                                                        />
                                                    </Box>
                                                    
                                                    {/* ✅ Title row with checkbox and label */}
                                                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                                                        <Typography fontWeight="bold">
                                                            {property.property_title}
                                                        </Typography>

                                                        {/* Checkbox + Text */}
                                                        <Box display="flex" alignItems="center" gap={1}>
                                                            {/* Compare Checkbox */}
                                                            <Checkbox
                                                                checked={compareList.some(p => p.property_id === property.property_id)}
                                                                onChange={() => handleCompareToggle(property)}
                                                                size="small"
                                                                color="primary"
                                                            />
                                                            <Typography variant="body2" color="textSecondary">
                                                                Compare
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    <Typography variant="body2" color="text.secondary" mb={1}>
                                                        {property.city}, {property.state} | Category: {getPropertyTypeName(property.property_type)}
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
                                                                ₹{property.total_property_value}
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
                                                    
                                                    {/* Action Icons */}
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
                                                            {/* Show referral info if available */}
                                                            {subscriptionPaid && property.referral_id && (
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
                                                            )}
                                                        </Grid>
                                                    </Box>

                                                    <Button
                                                        onMouseEnter={(e) => handlePopoverOpen(e, property.property_id)}
                                                        onMouseLeave={handlePopoverClose}
                                                        fullWidth
                                                        variant="contained"
                                                        sx={{
                                                            color: 'white',
                                                            textTransform: 'none',
                                                            '&:hover': { color: 'rgb(5,5,5)' },
                                                            marginBottom: "9px"
                                                        }}
                                                    >
                                                        Payout
                                                    </Button>

                                                    <Popover
                                                        id="mouse-over-popover"
                                                        sx={{ pointerEvents: "none" }}
                                                        open={open && hoveredProperty === property.property_id}
                                                        anchorEl={anchorEl}
                                                        anchorOrigin={{
                                                            vertical: "bottom",
                                                            horizontal: "left",
                                                        }}
                                                        transformOrigin={{
                                                            vertical: "top",
                                                            horizontal: "left",
                                                        }}
                                                        onClose={handlePopoverClose}
                                                        disableRestoreFocus
                                                    >
                                                        <Box sx={{ p: 2 }}>
                                                            <Typography fontWeight="bold">Commissions</Typography>
                                                            {commissions.length > 0 ? (
                                                                commissions.map((c) => {
                                                                    const amount =
                                                                        (parseFloat(c.percentage) * property.distribution_commission) / 100;
                                                                    return (
                                                                        <Typography key={c.id} variant="body2">
                                                                            Team {c.level_no}: ₹{amount.toLocaleString()}
                                                                        </Typography>
                                                                    );
                                                                })
                                                            ) : (
                                                                <Typography variant="body2" color="text.secondary">
                                                                    No commission data
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </Popover>

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
                                                               onClick={() => handleViewDetails(property)}
                                                            >
                                                                VIEW DETAILS
                                                            </Button>
                                                        </Grid>
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
                                                                disabled={!subscriptionPaid || property.status !== 'available'}
                                                                onClick={() => navigate(`/p-bookingassets?property_id=${property.property_id}`)}
                                                            >
                                                                Buy Now
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        ) : (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '200px',
                                textAlign: 'center'
                            }}>
                                <Typography variant="h6" color="textSecondary">
                                    No properties found matching your criteria.
                                </Typography>
                            </Box>
                        )}
                        
                        {/* Properties Pagination */}
                        {totalPages > 1 && (
                            <Box display="flex" justifyContent="center" mt={4}>
                                <PaginationComponent
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                />
                            </Box>
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
                        ) : paginatedBusinesses.length === 0 ? (
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

                {/* ========== DIALOGS ========== */}
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

                {/* ========== REPORT DIALOGS ========== */}
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
                        <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {reportColumns.filter(col => col.checked).map(column => (
                                            <TableCell key={column.id} sx={{ fontWeight: 'bold', color: "#4A90E2" }} >{column.label}</TableCell>
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
                                                                ? `₹${property[column.id]?.toLocaleString() || '-'}`
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
            </Container>
        </>
    );
};

export default PartnerLandingPage;