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
    Chip,
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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    DialogContentText,
    FormControlLabel,
    Checkbox,
    FormGroup,
    Stack,
    InputLabel,
    Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Header from "../../../Shared/Navbar/Navbar";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { baseurl } from '../../../BaseURL/BaseURL';
import PaginationComponent from '../../../Shared/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const AdminLandingPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

    // ========== PROPERTIES STATES ==========
    const [sortBy, setSortBy] = useState('latest');
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentImageIndices, setCurrentImageIndices] = useState({});
    const itemsPerPage = 9;
    const [propertiesPage, setPropertiesPage] = useState(1);
    const propertiesTotalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const propertiesStartIndex = (propertiesPage - 1) * itemsPerPage;
    const paginatedProperties = filteredProperties.slice(propertiesStartIndex, propertiesStartIndex + itemsPerPage);
    const [openCarousel, setOpenCarousel] = useState(false);
    
    // Filter by role
    const [selectedRole, setSelectedRole] = useState('');
    const [uniqueRoles, setUniqueRoles] = useState(['Agent', 'Client', 'Admin', 'All']);

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

    // New state for listing days popup
    const [openListingDaysDialog, setOpenListingDaysDialog] = useState(false);
    const [listingDays, setListingDays] = useState('');
    const [propertyToUpdate, setPropertyToUpdate] = useState(null);
    const [pendingApprovalStatus, setPendingApprovalStatus] = useState('');

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
    // Function to check if property is expired
    const isPropertyExpired = (property) => {
        // Check 1: If expiry_date exists, use that
        if (property.expiry_date) {
            const expiryDate = new Date(property.expiry_date);
            const today = new Date();
            
            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const expiryDateStart = new Date(expiryDate.getFullYear(), expiryDate.getMonth(), expiryDate.getDate());
            
            if (todayStart > expiryDateStart) {
                return true;
            }
        }
        
        // Check 2: If no expiry_date but listing_days exists, calculate expiration
        if (!property.expiry_date && property.listing_days) {
            if (!property.created_at) {
                return false;
            }
            
            const createdDate = new Date(property.created_at);
            const expirationDate = new Date(createdDate);
            expirationDate.setDate(createdDate.getDate() + parseInt(property.listing_days));
            
            const today = new Date();
            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const expirationDateStart = new Date(expirationDate.getFullYear(), expirationDate.getMonth(), expirationDate.getDate());
            
            return todayStart > expirationDateStart;
        }
        
        return false;
    };

    // Function to get days remaining for a property
    const getDaysRemaining = (property) => {
        // First check expiry_date
        if (property.expiry_date) {
            const expiryDate = new Date(property.expiry_date);
            const today = new Date();
            
            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const expiryDateStart = new Date(expiryDate.getFullYear(), expiryDate.getMonth(), expiryDate.getDate());
            
            const timeDiff = expiryDateStart.getTime() - todayStart.getTime();
            const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            if (daysRemaining < 0) {
                return 'Expired';
            } else if (daysRemaining === 0) {
                return 'Expires today';
            } else {
                return `${daysRemaining} days remaining`;
            }
        }
        
        // Then check listing_days
        if (property.listing_days && property.created_at) {
            const createdDate = new Date(property.created_at);
            const expirationDate = new Date(createdDate);
            expirationDate.setDate(createdDate.getDate() + parseInt(property.listing_days));
            
            const today = new Date();
            const timeDiff = expirationDate.getTime() - today.getTime();
            const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            if (daysRemaining < 0) {
                return 'Expired';
            } else if (daysRemaining === 0) {
                return 'Expires today';
            } else {
                return `${daysRemaining} days remaining`;
            }
        }
        
        return 'Never expires';
    };

    // Function to filter out expired properties
    const filterActiveProperties = (propertiesList) => {
        return propertiesList.filter(property => !isPropertyExpired(property));
    };

    // Fetch properties
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                let endpoint = `${baseurl}/property/`;
                
                if (selectedRole && selectedRole !== 'All') {
                    endpoint = `${baseurl}/properties/by-role/${selectedRole}/`;
                }
                
                const response = await fetch(endpoint);
                const data = await response.json();
                
                setProperties(data);
                setFilteredProperties(filterActiveProperties(data));
            } catch (error) {
                console.error('Error fetching properties:', error);
                if (selectedRole && selectedRole !== 'All') {
                    try {
                        const fallbackResponse = await fetch(`${baseurl}/property/`);
                        const fallbackData = await fallbackResponse.json();
                        setProperties(fallbackData);
                        setFilteredProperties(filterActiveProperties(fallbackData));
                    } catch (fallbackError) {
                        console.error('Error fetching fallback properties:', fallbackError);
                    }
                }
            }
        };
        
        fetchProperties();
    }, [selectedRole]);

    // Apply both search and sort filters
    useEffect(() => {
        let results = [...properties];
        
        results = filterActiveProperties(results);

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            results = results.filter(property => {
                const searchFields = [
                    property.property_title,
                    property.first_name,
                    property.city,
                    property.owner_name,
                    property.owner_contact,
                    property.state,
                    property.address,
                    property.description,
                    property.referral_id,
                    property.property_value?.toString(),
                    property.area?.toString(),
                    property.builtup_area?.toString()
                ].filter(Boolean);

                return searchFields.some(field => field.toLowerCase().includes(query));
            });
        }

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

        setFilteredProperties(results);
    }, [searchQuery, sortBy, properties]);

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
    }, []);

    // ========== HANDLERS ==========
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handlePropertiesPageChange = (event, value) => {
        setPropertiesPage(value);
    };

    const handleBusinessesPageChange = (event, value) => {
        setBusinessesPage(value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPropertiesPage(1);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        setSelectedRole(newRole);
        setPropertiesPage(1);
    };

    const mapRole = (role) => {
        switch(role) {
            case 'Agent': return 'Team';
            case 'Client': return 'User';
            case 'Admin': return 'Admin';
            case 'All': return 'All Properties';
            default: return role;
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

    const handleBusinessSearchChange = (event) => {
        setBusinessSearchTerm(event.target.value);
        setBusinessesPage(1);
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

    const handleDelete = async (propertyId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this property?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!result.isConfirmed) return;

        try {
            const response = await fetch(`${baseurl}/property/${propertyId}/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProperties(prev => prev.filter(p => p.property_id !== propertyId));
                setFilteredProperties(prev => prev.filter(p => p.property_id !== propertyId));

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Property has been deleted.',
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Deletion Failed',
                    text: `Failed to delete property. Status: ${response.status}`
                });
            }
        } catch (error) {
            console.error('Error deleting property:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while deleting the property.'
            });
        }
    };

    const handleNextImage = (propertyId, totalImages) => (e) => {
        e.stopPropagation();
        setCurrentImageIndices(prev => ({
            ...prev,
            [propertyId]: (prev[propertyId] || 0) < totalImages - 1 ? (prev[propertyId] || 0) + 1 : 0
        }));
    };

    const handlePrevImage = (propertyId, totalImages) => (e) => {
        e.stopPropagation();
        setCurrentImageIndices(prev => ({
            ...prev,
            [propertyId]: (prev[propertyId] || 0) > 0 ? (prev[propertyId] || 0) - 1 : totalImages - 1
        }));
    };

    // Modified updateApprovalStatus to show popup for "approved"
    const handleApprovalStatusChange = (propertyId, newStatus) => {
        const property = properties.find(p => p.property_id === propertyId);
        setPropertyToUpdate(propertyId);
        setPendingApprovalStatus(newStatus);
        
        if (newStatus === 'approved') {
            setListingDays(property?.listing_days || '');
            setOpenListingDaysDialog(true);
        } else {
            updateApprovalStatus(propertyId, newStatus, null);
        }
    };

    const handleConfirmListingDays = async () => {
        if (!listingDays || isNaN(listingDays) || parseInt(listingDays) <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please enter a valid number of days (greater than 0)'
            });
            return;
        }

        await updateApprovalStatus(propertyToUpdate, pendingApprovalStatus, parseInt(listingDays));
        setOpenListingDaysDialog(false);
        setListingDays('');
        setPropertyToUpdate(null);
        setPendingApprovalStatus('');
    };

    const updateApprovalStatus = async (propertyId, newStatus, listingDaysValue) => {
        try {
            const updateData = { approval_status: newStatus };
            
            if (newStatus === 'approved' && listingDaysValue !== null) {
                updateData.listing_days = listingDaysValue;
                
                if (!updateData.expiry_date) {
                    const today = new Date();
                    const expiryDate = new Date(today);
                    expiryDate.setDate(today.getDate() + parseInt(listingDaysValue));
                    updateData.expiry_date = expiryDate.toISOString().split('T')[0];
                }
            }
            
            const response = await fetch(`${baseurl}/property/${propertyId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                const updatedData = await response.json();

                setProperties(prev =>
                    prev.map(p =>
                        p.property_id === propertyId
                            ? { ...p, 
                                approval_status: updatedData.approval_status,
                                listing_days: updatedData.listing_days || p.listing_days,
                                expiry_date: updatedData.expiry_date || p.expiry_date
                            }
                            : p
                    )
                );

                setFilteredProperties(prev =>
                    prev.map(p =>
                        p.property_id === propertyId
                            ? { ...p, 
                                approval_status: updatedData.approval_status,
                                listing_days: updatedData.listing_days || p.listing_days,
                                expiry_date: updatedData.expiry_date || p.expiry_date
                            }
                            : p
                    )
                );

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Approval status updated successfully.',
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: `Failed to update approval status. Status: ${response.status}`
                });
            }
        } catch (error) {
            console.error('Error updating approval status:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while updating the approval status.'
            });
        }
    };

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
            <Header />
            <Container sx={{ py: 4 }}>
                {/* Header Section */}
                {/* <Box position="relative" mb={3} height="56px">
                    <Typography variant="h4" align="center" sx={{ lineHeight: '46px' }}>
                        Admin Dashboard
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
                                    onClick={() => navigate("/a-addasset")}
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
                                            <MenuItem value="sold">Sold</MenuItem>
                                            <MenuItem value="available">Available</MenuItem>
                                            <MenuItem value="booked">Booked</MenuItem>
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
                                                    height: 800,
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
                                                    {/* Property title with status badge */}
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                        <Typography fontWeight="bold" sx={{ flex: 1, mr: 1 }}>
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
                                                                            : '#E74C3C',
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
                                                    {/* Add expiration info display */}
                                                    {(property.expiry_date || property.listing_days) && (
                                                        <Box sx={{ mb: 1 }}>
                                                            <Chip
                                                                label={getDaysRemaining(property)}
                                                                size="small"
                                                                variant="outlined"
                                                                sx={{
                                                                    fontWeight: 'bold',
                                                                    fontSize: '0.7rem',
                                                                    borderColor: getDaysRemaining(property).includes('Expired') ? '#E74C3C' : 
                                                                                getDaysRemaining(property).includes('today') ? '#E67E22' : '#2ECC71',
                                                                    color: getDaysRemaining(property).includes('Expired') ? '#E74C3C' : 
                                                                        getDaysRemaining(property).includes('today') ? '#E67E22' : '#2ECC71',
                                                                }}
                                                            />
                                                        </Box>
                                                    )}
                                                    <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                                                        <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 500 }}>
                                                            Approval Status
                                                        </Typography>
                                                        <Select
                                                            value={property.approval_status || ''}
                                                            onChange={(e) =>
                                                                handleApprovalStatusChange(property.property_id, e.target.value)
                                                            }
                                                            displayEmpty
                                                            sx={{
                                                                borderRadius: '8px',
                                                                backgroundColor: '#f9f9f9',
                                                                '&:hover': {
                                                                    backgroundColor: '#f0f0f0',
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>Select Status</em>
                                                            </MenuItem>
                                                            <MenuItem value="pending">Pending</MenuItem>
                                                            <MenuItem value="approved">Approved</MenuItem>
                                                            <MenuItem value="rejected">Rejected</MenuItem>
                                                        </Select>

                                                    </FormControl>

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
                                                    <Box
                                                        sx={{
                                                            backgroundColor: '#F8F9FA',
                                                            borderRadius: 1,
                                                            p: 1.5,
                                                            mb: 2
                                                        }}
                                                    >
                                                        <Grid container>
                                                            {property.referral_id === null ? (
                                                                <>
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
                                                                            display="flex"
                                                                            justifyContent="flex-end"
                                                                            alignItems="center"
                                                                            gap={1}
                                                                        >
                                                                            <EmailIcon fontSize="small" />
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
                                                                            display="flex"
                                                                            justifyContent="flex-end"
                                                                            alignItems="center"
                                                                            gap={1}
                                                                        >
                                                                            <CallIcon fontSize="small" />
                                                                            {property.owner_contact}
                                                                        </Typography>
                                                                    </Grid>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Grid item xs={6}>
                                                                        <Typography variant="body2" color="text.secondary">
                                                                            Added By
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <Typography
                                                                            variant="body2"
                                                                            fontWeight="bold"
                                                                            color="text.secondary"
                                                                            align="right"
                                                                            display="flex"
                                                                            justifyContent="flex-end"
                                                                            alignItems="center"
                                                                            gap={1}
                                                                        >
                                                                            <PersonAddAltIcon fontSize="small" />
                                                                            {property.username}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <Typography variant="body2" color="text.secondary">
                                                                            Agent Referral Id
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <Typography
                                                                            variant="body2"
                                                                            fontWeight="bold"
                                                                            color="text.secondary"
                                                                            align="right"
                                                                            display="flex"
                                                                            justifyContent="flex-end"
                                                                            alignItems="center"
                                                                            gap={1}
                                                                        >
                                                                            <PersonAddAltIcon fontSize="small" />
                                                                            {property.referral_id}
                                                                        </Typography>
                                                                    </Grid>
                                                                </>
                                                            )}
                                                        </Grid>
                                                    </Box>

                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12} display="flex" justifyContent="right" gap={2}>
                                                            <Tooltip title="Edit">
                                                                <IconButton
                                                                    sx={{ color: '#1976d2' }}
                                                                    onClick={() => navigate(`/a-assets/edit/${property.property_id}`, { state: { property } })}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>

                                                            <Tooltip title="Delete">
                                                                <IconButton
                                                                    sx={{ color: '#d32f2f' }}
                                                                    onClick={() => handleDelete(property.property_id)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
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
                                                                onClick={() => navigate(`/a-assets/${property.property_id}`, { state: { property } })}
                                                            >
                                                                VIEW DETAILS
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
                                                onClick={() => navigate(`/a-businessproducts/${business.business_id}`)}
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

                {/* Listing Days Dialog */}
                <Dialog open={openListingDaysDialog} onClose={() => setOpenListingDaysDialog(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Set Listing Days</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText sx={{ mb: 2 }}>
                            Please enter the number of days this property should remain listed (active).
                            <br />
                            <small>The expiry date will be calculated automatically.</small>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Listing Days"
                            type="number"
                            fullWidth
                            value={listingDays}
                            onChange={(e) => setListingDays(e.target.value)}
                            helperText="Enter number of days the property should be active"
                            inputProps={{ min: 1 }}
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenListingDaysDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmListingDays} variant="contained" color="primary">
                            Confirm & Update
                        </Button>
                    </DialogActions>
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
                        </DialogActions>
                    </Dialog>
                )}
            </Container>
        </>
    );
};

export default AdminLandingPage;