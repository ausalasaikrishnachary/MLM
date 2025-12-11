import "./Home.css";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Tabs, InputGroup } from "react-bootstrap";
import { FaSearch, FaCrosshairs, FaMicrophone } from 'react-icons/fa';
import { Carousel, Tab, Card } from "react-bootstrap";
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  Box,
  Grid,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Dialog,
  Pagination,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import {
  Chip,
  DialogContent,
  Divider,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/css/font-awesome.min.css';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {
  faSearch,
  faChartLine,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { baseurl } from './../../../BaseURL/BaseURL';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Loading Components
const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
    <CircularProgress />
  </Box>
);

const PropertyCardSkeleton = () => (
  <div className="col-md-4 mb-4">
    <div className="property-card card d-flex flex-column" style={{ height: "100%" }}>
      <div className="property-image-container">
        <div className="skeleton-image" style={{ height: "200px", backgroundColor: "#e0e0e0", borderRadius: "8px" }}></div>
      </div>
      <div className="card-body">
        <div className="skeleton-line" style={{ height: "20px", backgroundColor: "#e0e0e0", marginBottom: "10px" }}></div>
        <div className="skeleton-line" style={{ height: "16px", backgroundColor: "#e0e0e0", marginBottom: "8px", width: "70%" }}></div>
        <div className="skeleton-line" style={{ height: "14px", backgroundColor: "#e0e0e0", marginBottom: "6px", width: "50%" }}></div>
      </div>
    </div>
  </div>
);

const BusinessCardSkeleton = () => (
  <div className="business-card-wrapper">
    <div className="business-card">
      <div className="card-content">
        <div className="skeleton-image" style={{ height: "150px", backgroundColor: "#e0e0e0", borderRadius: "8px" }}></div>
        <div className="skeleton-line" style={{ height: "20px", backgroundColor: "#e0e0e0", margin: "10px 0" }}></div>
        <div className="skeleton-line" style={{ height: "16px", backgroundColor: "#e0e0e0", marginBottom: "8px" }}></div>
        <div className="skeleton-line" style={{ height: "14px", backgroundColor: "#e0e0e0", marginBottom: "6px", width: "80%" }}></div>
      </div>
    </div>
  </div>
);

const ShrirajLandingPage = () => {
  const [activeTab, setActiveTab] = useState('sell');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [carouselItems, setCarouselItems] = useState([]);
  const [carouselLoading, setCarouselLoading] = useState(true);
  const [carouselError, setCarouselError] = useState(null);
  const [properties, setProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const paginatedProperties = properties.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const [businesses, setBusinesses] = useState([]);
  const [businessesLoading, setBusinessesLoading] = useState(true);
  const [businessPage, setBusinessPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const businessItemsPerPage = 3;
  const businessTotalPages = Math.ceil(businesses.length / businessItemsPerPage);
  const paginatedBusinesses = businesses.slice(
    (businessPage - 1) * businessItemsPerPage,
    businessPage * businessItemsPerPage
  );
  const [selectedLogo, setSelectedLogo] = useState(null);

  // Initialize AOS with debounce
  useEffect(() => {
    const initAOS = () => {
      if (typeof window !== 'undefined') {
        const AOS = require('aos');
        AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true
        });
      }
    };

    // Delay AOS initialization for better performance
    const timer = setTimeout(() => {
      initAOS();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Fetch businesses with error handling
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setBusinessesLoading(true);
        const response = await axios.get(`${baseurl}/business/`, {
          timeout: 10000 // 10 second timeout
        });
        setBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setBusinessesLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  // Fetch properties with error handling
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setPropertiesLoading(true);
        const response = await axios.get(`${baseurl}/property/`, {
          timeout: 10000 // 10 second timeout
        });
        const allProperties = response.data;
        const shuffled = allProperties.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6);
        setProperties(selected);
      } catch (err) {
        console.error('Error fetching properties:', err);
      } finally {
        setPropertiesLoading(false);
      }
    };
    fetchProperties();
  }, []);

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

  // Fetch carousel data
  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        setCarouselLoading(true);
        const response = await axios.get(`${baseurl}/carousel/`, {
          timeout: 10000
        });
        setCarouselItems(response.data);
      } catch (err) {
        setCarouselError(err.message);
        console.error('Error fetching carousel data:', err);
      } finally {
        setCarouselLoading(false);
      }
    };
    fetchCarouselData();
  }, []);

  const handleImageClick = (property) => {
    setSelectedProperty(property);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProperty(null);
    setSelectedImage(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleLogoClick = (business) => {
    setSelectedLogo(business);
  };

  const handleCloseLogoModal = () => {
    setSelectedLogo(null);
  };

  const handleOpen = (biz) => {
    setSelectedBusiness(biz);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBusiness(null);
  };

  const handleBusinessPageChange = (event, value) => {
    setBusinessPage(value);
  };

  const SearchInput = ({ activeTab }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    // ... rest of SearchInput component remains the same ...
    // Keep the existing SearchInput component code
    useEffect(() => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          setIsListening(false);
          setShowSuggestions(true);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      } else {
        console.warn('Speech recognition not supported in this browser');
      }

      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.abort();
        }
      };
    }, []);

    const handleSearchClick = () => {
      if (query.trim().length >= 2) {
        navigate('/filteredproperties', {
          state: {
            q: query,
            looking_to: activeTab.toUpperCase(),
          },
        });
      }
    };

    const handleVoiceSearch = () => {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        setShowSuggestions(true);
        setIsListening(true);
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error('Voice recognition start failed:', error);
          setIsListening(false);
        }
      }
    };

    const normalizeString = (str) => {
      return str.replace(/\s+/g, '').toLowerCase();
    };

    useEffect(() => {
      const fetchSuggestions = async () => {
        if (query.length < 2) {
          setSuggestions([]);
          return;
        }

        setLoading(true);
        try {
          const response = await axios.get(
            `${baseurl}/properties/search/`,
            {
              params: {
                q: query,
                looking_to: activeTab.toUpperCase(),
              },
              timeout: 5000
            }
          );

          const normalizedQuery = normalizeString(query);
          const filteredSuggestions = response.data.filter(item => {
            const normalizedTitle = normalizeString(item.property_title || '');
            const normalizedAddress = normalizeString(item.address || '');
            const normalizedCity = normalizeString(item.city || '');

            return (
              normalizedTitle.includes(normalizedQuery) ||
              normalizedAddress.includes(normalizedQuery) ||
              normalizedCity.includes(normalizedQuery)
            );
          });

          setSuggestions(filteredSuggestions);
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setLoading(false);
        }
      };

      const timer = setTimeout(() => {
        fetchSuggestions();
      }, 300);

      return () => clearTimeout(timer);
    }, [query, activeTab]);

    const handleSelectSuggestion = (suggestion) => {
      setQuery(suggestion.property_title || suggestion.address);
      setShowSuggestions(false);
    };

    return (
      <div className="position-relative">
        <InputGroup className="custom-search-input">
          <Form.Control
            placeholder="Search property (e.g. villa, 2 bhk)"
            aria-label="search"
            className="py-2"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <InputGroup.Text className="icon-group">
            <div className="icon-btn" onClick={handleSearchClick} style={{ cursor: 'pointer' }}>
              <FaSearch />
            </div>
            <div
              className={`icon-btn ${isListening ? 'listening' : ''}`}
              onClick={handleVoiceSearch}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <FaMicrophone />
              {isListening && (
                <span className="pulse-ring"></span>
              )}
            </div>
          </InputGroup.Text>
        </InputGroup>

        {showSuggestions && query.length > 0 && (
          <div
            className="position-absolute w-100 bg-white shadow-sm mt-1 rounded"
            style={{ zIndex: 1000, maxHeight: '300px', overflowY: 'auto' }}
          >
            {loading ? (
              <div className="p-2 text-muted">Loading...</div>
            ) : suggestions.length > 0 ? (
              suggestions.map((item) => (
                <div
                  key={item.property_id}
                  className="p-2 border-bottom hover-cursor-pointer hover-bg-light"
                  onMouseDown={() => handleSelectSuggestion(item)}
                >
                  <div className="fw-bold">{item.property_title}</div>
                  <div className="text-muted small">
                    {item.address}, {item.city}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-muted">
                {query.length < 2
                  ? 'Type at least 2 characters'
                  : 'No properties found'}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const advantages = [
    {
      icon: faSearch,
      title: "Curated Selection",
      description: "We carefully select only the highest quality commercial properties with strong investment potential."
    },
    {
      icon: faChartLine,
      title: "Market Expertise",
      description: "Our team of analysts provide in-depth market insights and valuation assessments."
    },
    {
      icon: faShieldAlt,
      title: "Secure Process",
      description: "End-to-end secure transaction processes with full legal and compliance support."
    }
  ];

  const categories = [
    {
      title: 'Residential',
      count: '2437 Properties',
      image: 'https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2217.jpg',
    },
    {
      title: 'Commercial',
      count: '521 Properties',
      image: 'https://img.freepik.com/free-photo/office-skyscrapers-business-district_107420-95733.jpg?ga=GA1.1.944433368.1729337049&semt=ais_hybrid&w=740',
    },
    {
      title: 'Agriculture',
      count: '61 Properties',
      image: 'https://img.freepik.com/free-photo/young-plants-growing-very-large-plant-commercial-greenhouse_273609-14259.jpg',
    },
    {
      title: 'Industrial',
      count: '11 Properties',
      image: 'https://img.freepik.com/free-photo/portrait-engineer-job-site-work-hours_23-2151589636.jpg',
    },
  ];

  const backers = [
    {
      id: 1,
      logo: "https://img.freepik.com/free-psd/real-estate-logo-design_23-2151249802.jpg?ga=GA1.1.718196285.1710491388&semt=ais_hybrid&w=740",
      alt: "Backer 1"
    },
    {
      id: 2,
      logo: "https://img.freepik.com/free-vector/gradient-data-logo-template_23-2149200605.jpg?ga=GA1.1.718196285.1710491388&semt=ais_hybrid&w=740",
      alt: "Backer 2"
    },
    {
      id: 3,
      logo: "https://img.freepik.com/free-vector/modern-real-estate-logo_1025-685.jpg?ga=GA1.1.718196285.1710491388&semt=ais_hybrid&w=740",
      alt: "Backer 3"
    },
    {
      id: 4,
      logo: "https://img.freepik.com/free-vector/dome-logo-template-design_23-2149850065.jpg?ga=GA1.1.718196285.1710491388&semt=ais_hybrid&w=740",
      alt: "Backer 4"
    },
    {
      id: 5,
      logo: "https://img.freepik.com/free-vector/abstract-logo-business-made-with-colorful_341269-908.jpg?ga=GA1.1.718196285.1710491388&semt=ais_hybrid&w=740",
      alt: "Backer 5"
    }
  ];

  const newsItems = [
    {
      id: 1,
      image: "https://img.freepik.com/free-photo/modern-warehouse-bathed-glow-setting-sun_91128-4583.jpg?ga=GA1.1.718196285.1710491388&semt=ais_hybrid&w=740",
      date: "April 15, 2025",
      title: "Shriraj Expands Commercial Portfolio with New Acquisitions",
      excerpt: "Leading commercial real estate firm Shriraj announces expansion with five new premium properties...",
      delay: 100
    },
    {
      id: 2,
      image: "https://img.freepik.com/premium-photo/metallurgical-plant-against-blue-sky-sunny-day_1048944-19582239.jpg?ga=GA1.1.718196285.1710491388&semt=ais_hybrid&w=740",
      date: "April 5, 2025",
      title: "Market Trends Show Growing Demand for Warehouse Space",
      excerpt: "Recent market analysis reveals increasing demand for warehouse and distribution facilities...",
      delay: 200
    },
    {
      id: 3,
      image: "https://img.freepik.com/free-photo/modern-warehouse-bathed-glow-setting-sun_91128-4583.jpg?ga=GA1.1.718196285.1710491388&semt=ais_hybrid&w=740",
      date: "March 28, 2025",
      title: "Shriraj Named Top Commercial Real Estate Provider",
      excerpt: "Industry recognition highlights Shriraj's commitment to excellence in commercial real estate...",
      delay: 300
    }
  ];

  return (
    <>
      {/* Carousel Section with Loading */}
      <div className="container-fluid px-0" style={{ marginTop: "-4px" }}>
        <Card className="shadow rounded-0 border-0">
          {carouselLoading ? (
            <div style={{ height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress size={60} />
            </div>
          ) : carouselError ? (
            <div className="text-center py-5 text-danger">Error loading carousel</div>
          ) : !carouselItems.length ? (
            <div className="text-center py-5">No carousel items found</div>
          ) : (
            <Carousel
              fade={false}
              interval={2000}
              indicators={false}
              prevIcon={
                <span
                  className="custom-arrow left-arrow"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    zIndex: 2,
                    fontSize: "1.5rem",
                    color: "#fff",
                  }}
                >
                  <FaChevronLeft />
                </span>
              }
              nextIcon={
                <span
                  className="custom-arrow right-arrow"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    zIndex: 2,
                    fontSize: "1.5rem",
                    color: "#fff",
                  }}
                >
                  <FaChevronRight />
                </span>
              }
            >
              {carouselItems.map((item, index) => (
                <Carousel.Item key={index} className="position-relative">
                  <img
                    className="d-block w-100"
                    src={`${baseurl}${item.image}`}
                    alt={item.title || `Slide ${index + 1}`}
                    style={{
                      maxHeight: "500px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/1200x500?text=Image+Not+Found";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      zIndex: 2,
                    }}
                  ></div>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Card>
      </div>

      {/* Search Bar */}
      <div className="container search-bar-wrapper">
        <div
          className="search-bar-box bg-white rounded shadow p-3"
          style={{ border: '2px solid #6f979b' }}
        >
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            id="property-tabs"
            className="search-tabs"
          >
            <Tab eventKey="buy" title="Buy">
              <div className="mt-3">
                <SearchInput activeTab="Buy" />
              </div>
            </Tab>
            <Tab eventKey="sell" title="Sell">
              <div className="mt-3">
                <SearchInput activeTab="sell" />
              </div>
            </Tab>
            <Tab eventKey="rent" title="Rent">
              <div className="mt-3">
                <SearchInput activeTab="rent" />
              </div>
            </Tab>
            <Tab eventKey="View all properties" title="View all properties">
              <div className="mt-3">
                <a href="/properties" className="btn view-property-btn ">
                  View all properties
                </a>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* Featured Properties Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title text-left mb-5" data-aos="fade-up">
            Featured Properties Section
          </h2>

          <div className="row">
            {propertiesLoading ? (
              // Show skeleton loaders
              Array.from({ length: 3 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))
            ) : paginatedProperties.length > 0 ? (
              paginatedProperties.map((property, index) => (
                <div
                  className="col-md-4 mb-4"
                  key={property.property_id}
                  data-aos="fade-up"
                  data-aos-delay={(index + 1) * 100}
                >
                  <div
                    className="property-card card d-flex flex-column"
                    style={{ height: "100%" }}
                  >
                    <div className="property-image-container">
                      <img
                        src={`${baseurl}${property.images && property.images[0] ? property.images[0].image : ''}`}
                        className="d-block w-100"
                        alt="property"
                        style={{
                          borderRadius: "8px",
                          height: "200px",
                          width: "100%",
                          objectFit: "cover",
                          cursor: 'pointer'
                        }}
                        onClick={() => handleImageClick(property)}
                      />
                    </div>

                    <div
                      className="card-body d-flex flex-column justify-content-between"
                      style={{ flexGrow: 1 }}
                    >
                      <div>
                        <div className="row mb-2 align-items-center">
                          <div className="col text-start ps-0">
                            <span className="badge bg-secondary">
                              {property.furnishing_status}
                            </span>
                          </div>
                        </div>
                        <h5 className="card-title">{property.property_title}</h5>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">
                              Area
                            </Typography>
                            <Typography fontWeight="600" color="#4A90E2">
                              {property.area || 'N/A'} {property.area_unit}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">
                              Built-up Area
                            </Typography>
                            <Typography fontWeight="600" color="#4A90E2">
                              {property.builtup_area || 'N/A'} {property.area_unit}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">
                              Property Value
                            </Typography>
                            <Typography fontWeight="600" color="#4A90E2">
                              ₹{property.total_property_value || 'N/A'}
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
                      <div className="btn-container single-button mt-3">
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
                          onClick={() => navigate("/properties")}
                        >
                          View Property
                        </Button>
                        <Button
                          sx={{
                            color: "#2E166D",
                            border: "1px solid #2E166D",
                            width: "100%",
                            mt: 1,
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
                          Buy Property
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">No properties found</div>
            )}
          </div>
          
          {!propertiesLoading && paginatedProperties.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
          
          <div className="text-center mt-3">
            <a href="/properties" className="btn btn-primary px-4 py-2">
              Browse All Properties
            </a>
          </div>
        </div>
      </section>

      {/* Featured Businesses Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-left mb-5" data-aos="fade-up">
            Featured Businesses
          </h2>

          <div className="businesses-container">
            <div className="business-grid">
              {businessesLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <BusinessCardSkeleton key={idx} />
                ))
              ) : businesses.length > 0 ? (
                paginatedBusinesses.map((biz, idx) => (
                  <div className="business-card-wrapper" key={idx}>
                    <div className="business-card">
                      {biz.offer_title && (
                        <div className="offer-ribbon">
                          <div className="ribbon-content">
                            {biz.offer_title}
                          </div>
                        </div>
                      )}

                      <div className="card-content" style={{ position: "relative" }}>
                        <Chip
                          label={biz.is_active ? "Active" : "Inactive"}
                          color={biz.is_active ? "success" : "default"}
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 20,
                            right: 10,
                            zIndex: 2,
                            fontWeight: "bold",
                          }}
                        />

                        <div className="card-header">
                          <div className="logo-section" style={{ position: "relative" }}>
                            {biz.logo ? (
                              <img
                                src={`${baseurl}${biz.logo}`}
                                alt={`${biz.business_name} Logo`}
                                className="business-logo clickable-logo"
                                onClick={() => handleLogoClick(biz)}
                                style={{
                                  width: "100%",
                                  height: "Auto",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                  transition: "transform 0.2s ease",
                                }}
                              />
                            ) : (
                              <div className="business-icon">
                                <i className="fa fa-building"></i>
                              </div>
                            )}
                          </div>
                        </div>

                        <h3 className="business-name">{biz.business_name}</h3>
                        <p className="business-type">{biz.business_type}</p>
                        <p className="business-description">{biz.description}</p>

                        {biz.offer_description && (
                          <div className="offer-description">{biz.offer_description}</div>
                        )}

                        <div className="contact-info">
                          <div className="contact-item">
                            <i className="fa fa-envelope contact-icon email"></i>
                            <span className="contact-text">{biz.email}</span>
                          </div>
                          <div className="contact-item">
                            <i className="fa fa-phone contact-icon phone"></i>
                            <span className="contact-text">{biz.phone}</span>
                          </div>
                          <div className="contact-item">
                            <i className="fa fa-map-marker contact-icon location"></i>
                            <span className="contact-text">{biz.address}</span>
                          </div>
                          <div className="contact-item">
                            <i className="fa fa-globe contact-icon website"></i>
                            <span className="contact-text website-text">{biz.website}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-businesses">
                  No businesses found.
                </div>
              )}
            </div>

            {!businessesLoading && businesses.length > businessItemsPerPage && (
              <div className="pagination-container">
                <div className="pagination-wrapper">
                  <Pagination
                    count={businessTotalPages}
                    page={businessPage}
                    onChange={handleBusinessPageChange}
                    color="primary"
                  />
                </div>
              </div>
            )}

            <div className="text-center mt-4">
              <a href="/business" className="btn btn-primary px-4 py-2">
                Browse All Businesses
              </a>
            </div>
          </div>
        </div>

        {selectedLogo && (
          <div className="logo-modal-overlay" onClick={handleCloseLogoModal}>
            <div className="logo-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="logo-modal-header">
                <h4>{selectedLogo.business_name} Logo</h4>
                <button className="close-modal-btn" onClick={handleCloseLogoModal}>
                  <i className="fa fa-times"></i>
                </button>
              </div>
              <div className="logo-modal-body">
                <img
                  src={`${baseurl}${selectedLogo.logo}`}
                  alt={`${selectedLogo.business_name} Logo`}
                  className="full-size-logo"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Welcome Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-left">
            <div className="col-lg-6" data-aos="fade-right">
              <h2 className="section-title">Welcome to Shriraj Commercial Real Estate</h2>
              <p>ShriRaj Team Business Community is a group where entrepreneurs, business owners, and professionals connect with each other, share experiences, expand their network, and create growth opportunities together.</p>
              <div className="text-center text-lg-start mt-4">
                <a href="/properties" className="btn view-property-btn mt-3">View Properties</a>
              </div>
            </div>
            <div className="col-lg-6 mt-4" data-aos="fade-left">
              <img
                src="https://www.developer.com/wp-content/uploads/slider/cache/f8aa18e48223e00fe5e7658c206b4449/Empire-State-Building-1-1200-x-600.jpg"
                alt="Commercial Property"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <Box sx={{ py: 6 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Explore Categories
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Find Best Categories in town with Shriraj Team
          </Typography>
        </Box>
        <Box sx={{ width: '85%', mx: 'auto' }}>
          <Grid container spacing={3} justifyContent="center">
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%',
                    border: '1px solid #ddd',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={category.image}
                    alt={category.title}
                    sx={{
                      objectFit: 'cover',
                      px: 1,
                      pt: 1,
                      borderRadius: 2,
                    }}
                  />
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {category.title}
                      </Typography>
                    </Box>
                    <IconButton
                      sx={{ backgroundColor: '#f1f1f1' }}
                      size="small"
                      onClick={() => navigate('/properties')}
                    >
                      <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Advantages Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title text-left mb-5" data-aos="fade-up">Shriraj Advantage</h2>
          <div className="row">
            {advantages.map((advantage, index) => (
              <div
                className="col-md-4 mb-4"
                key={index}
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
              >
                <div className="advantage-card">
                  <FontAwesomeIcon
                    icon={advantage.icon}
                    className="fa-2x mb-3"
                    style={{ color: 'var(--primary-color)' }}
                  />
                  <h4>{advantage.title}</h4>
                  <p>{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <a href="/aboutus" className="btn btn-primary view-property-btn px-4 py-2">
              How it Works ?
            </a>
          </div>
        </div>
      </section>

      {/* Properties Gallery Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-left mb-5" data-aos="fade-up">
            Properties
          </h2>
          <div className="row">
            {propertiesLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))
            ) : paginatedProperties.length > 0 ? (
              paginatedProperties.map((property, index) => (
                <div
                  className="col-md-4 mb-4"
                  key={property.property_id}
                  data-aos="fade-up"
                  data-aos-delay={(index + 1) * 100}
                >
                  <div
                    className="property-card card d-flex flex-column"
                    style={{ height: '100%' }}
                  >
                    <div className="property-image-container">
                      <img
                        src={`${baseurl}${property.images && property.images[0] ? property.images[0].image : ''}`}
                        className="d-block w-100"
                        alt="property"
                        style={{
                          borderRadius: '8px',
                          height: '200px',
                          width: '100%',
                          objectFit: 'cover',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleImageClick(
                          property,
                          `${baseurl}${property.images && property.images[0] ? property.images[0].image : ''}`
                        )}
                      />
                    </div>
                    <div
                      className="card-body d-flex flex-column justify-content-between"
                      style={{ flexGrow: 1 }}
                    >
                      <div>
                        <div className="row mb-2 align-items-center">
                          <div className="col text-start ps-0">
                            <span className="badge bg-secondary">{property.furnishing_status}</span>
                          </div>
                        </div>
                        <h5 className="card-title">{property.property_title}</h5>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">
                              Area
                            </Typography>
                            <Typography fontWeight="600" color="#4A90E2">
                              {property.area || 'N/A'} {property.area_unit}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">
                              Built-up Area
                            </Typography>
                            <Typography fontWeight="600" color="#4A90E2">
                              {property.builtup_area || 'N/A'} {property.area_unit}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">
                              Property Value
                            </Typography>
                            <Typography fontWeight="600" color="#4A90E2">
                              ₹{property.total_property_value || 'N/A'}
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
                      <div className="btn-container single-button mt-3">
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
                          onClick={() => navigate("/properties")}
                        >
                          View Property
                        </Button>
                        <Button
                          sx={{
                            color: "#2E166D",
                            border: "1px solid #2E166D",
                            width: "100%",
                            mt: 1,
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
                          Buy Property
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">No properties found</div>
            )}
          </div>
          
          {!propertiesLoading && paginatedProperties.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
          
          <div className="text-center mt-3">
            <a href="/properties" className="btn btn-primary px-4 py-2">
              Browse All Properties
            </a>
          </div>
        </div>
      </section>

      {/* Property Modal */}
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
              <img
                src={getAllMedia(selectedProperty)[0].url}
                alt={getAllMedia(selectedProperty)[0].alt || "Property Image"}
                style={{
                  borderRadius: 0,
                  maxHeight: "550px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </>
          ) : (
            <Typography color="white" textAlign="center">
              No media available.
            </Typography>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default ShrirajLandingPage;