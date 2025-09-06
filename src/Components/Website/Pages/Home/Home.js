
import "./Home.css"
import { Container, Navbar, Nav, Row, Col, Form, Button } from 'react-bootstrap';
import { Tabs, InputGroup } from "react-bootstrap";
import { FaSearch, FaCrosshairs, FaMicrophone } from 'react-icons/fa';
import { Carousel, Tab, Card } from "react-bootstrap";
import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Box, Grid, CardContent, Typography, CardMedia, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/css/font-awesome.min.css';
import 'aos/dist/aos.css';

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

const sliderSettings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  responsive: [
    {
      breakpoint: 992,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 },
    },
  ],
};

const ShrirajLandingPage = () => {

  const [activeTab, setActiveTab] = useState('sell');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState([]);



  useEffect(() => {
    // Initialize AOS (Animate On Scroll) if needed
    if (typeof window !== 'undefined') {
      const AOS = require('aos');
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
      });
    }
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${baseurl}/property/`);
        const allProperties = response.data;

        // Shuffle and pick 3 random properties
        const shuffled = allProperties.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        setProperties(selected);
      } catch (err) {
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);




  const SearchInput = ({ activeTab }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    // Initialize speech recognition
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
          // Automatically show suggestions when voice input is received
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

    // Function to remove spaces and special characters for comparison
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
            }
          );
          
          // Filter results to show matches regardless of spaces
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

            {/* <div className="icon-btn">
              <FaCrosshairs />
            </div> */}
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
      image: 'https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2217.jpg', // High-rise apartments
    },
    {
      title: 'Commercial',
      count: '521 Properties',
      image: 'https://img.freepik.com/free-photo/office-skyscrapers-business-district_107420-95733.jpg?ga=GA1.1.944433368.1729337049&semt=ais_hybrid&w=740', // Office buildings
    },
    {
      title: 'Agriculture',
      count: '61 Properties',
      image: 'https://img.freepik.com/free-photo/young-plants-growing-very-large-plant-commercial-greenhouse_273609-14259.jpg', // Lush farmland
    },
    {
      title: 'Industrial',
      count: '11 Properties',
      image: 'https://img.freepik.com/free-photo/portrait-engineer-job-site-work-hours_23-2151589636.jpg', // Factory building
    },
  ];

  // const properties = [
  //   {
  //     id: 1,
  //     title: 'Elegant Villa',
  //     details: '3 BHK in a prime location',
  //     images: [
  //       "https://www.shutterstock.com/image-photo/land-plot-management-real-estate-260nw-2591764263.jpg",
  //       "https://www.shutterstock.com/image-photo/land-plot-management-real-estate-260nw-2591764263.jpg",
  //       "https://www.shutterstock.com/image-photo/land-plot-management-real-estate-260nw-2591764263.jpg",
  //     ]
  //   },

  //   {
  //     id: 2,
  //     title: 'Villa Sahi',
  //     details: '3 BHK in a prime location',
  //     images: [
  //       'https://t4.ftcdn.net/jpg/03/70/64/43/360_F_370644357_MDF4UXLAXTyyi2OyuK66tWW9cA2f8svL.jpg',
  //       'https://t4.ftcdn.net/jpg/03/70/64/43/360_F_370644357_MDF4UXLAXTyyi2OyuK66tWW9cA2f8svL.jpg',
  //       'https://t4.ftcdn.net/jpg/03/70/64/43/360_F_370644357_MDF4UXLAXTyyi2OyuK66tWW9cA2f8svL.jpg',
  //     ]
  //   },


  //   {
  //     id: 3,
  //     title: 'luxurystays',
  //     details: '3 BHK in a prime location',
  //     images: [
  //       'https://luxurystays.in/villas/AzulD/BD2.jpg',
  //       'https://luxurystays.in/villas/AzulD/BD2.jpg',
  //       'https://luxurystays.in/villas/AzulD/BD2.jpg',
  //     ]
  //   },

  // ];

  // const properties = [
  //   {
  //     id: 1,
  //     title: "Farmland with Irrigation Facility",
  //     image: "https://www.shutterstock.com/image-photo/land-plot-management-real-estate-260nw-2591764263.jpg",
  //     details: "32,000 sq ft | ₹ 700000 /-"
  //   },
  //   {
  //     id: 2,
  //     title: "Villa Sahi",
  //     image: "https://t4.ftcdn.net/jpg/03/70/64/43/360_F_370644357_MDF4UXLAXTyyi2OyuK66tWW9cA2f8svL.jpg",
  //     details: "18,500 sq ft | ₹ 800000 /-"
  //   },
  //   {
  //     id: 3,
  //     title: "luxurystays",
  //     image: "https://luxurystays.in/villas/AzulD/BD2.jpg",
  //     details: "24,000 sq ft | ₹ 1200000 /-"
  //   }
  // ];

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

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await axios.get(`${baseurl}/carousel/`);
        setCarouselItems(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching carousel data:', err);
      }
    };

    fetchCarouselData();
  }, []);

  const imageUrl = "https://www.developer.com/wp-content/uploads/slider/cache/b6f674e40adb492ce3d3a75127c097a3/Art-Deco-City-1200-x-600.jpg";

  if (loading) return <div className="text-center py-5">Loading carousel...</div>;
  if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;
  if (!carouselItems.length) return <div className="text-center py-5">No carousel items found</div>;

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img 
              src="http://175.29.21.7:84/static/media/Logo%20File.78893cdbe11c7dfa5f45.png" 
              alt="Shriraj Logo" 
              className="logo"
            />
          </a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Properties</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Why Shriraj</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Sign Up</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      {/* <Navbar expand="lg" className="navbar-custom">
              <Container>
                <Navbar.Brand href="#">
                  <img 
                    src="http://175.29.21.7:84/static/media/Logo%20File.78893cdbe11c7dfa5f45.png" 
                    alt="Shriraj Logo" 
                    className="logo"
                  />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                    <Nav.Link href="#">Properties</Nav.Link>
                    <Nav.Link href="#">Why Shriraj</Nav.Link>
                    <Nav.Link href="#">Sign Up</Nav.Link>
                    <Nav.Link href="#">Login</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar> */}


      <div className="container-fluid px-0" style={{ marginTop: "-4px" }}>
        <Card className="shadow rounded-0 border-0">
          <Carousel
            fade={false}
            interval={2000}
            indicators={true}
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

                {/* Dark Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 2,
                  }}
                ></div>

                {/* Hero Content */}
                <div
                  className="position-absolute top-50 start-50 translate-middle text-white text-center px-3"
                  style={{ zIndex: 3 }}
                >
                  <div className="hero-content">
                    <h1 className="display-6 fw-bold mb-2">
                      Premium Commercial Real Estate
                    </h1>
                    <p className="lead mb-3 fs-6">
                      Find the perfect warehouse or commercial building for your
                      business with Shriraj Real Estate
                    </p>
                    <a href="/properties" className="btn view-property-btn px-3 py-2">
                      View all properties
                    </a>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Card>
      </div>



      {/* Search Bar Section */}
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
          </Tabs>
        </div>

        {/* Display search results */}
        {searchResults.length > 0 && (
          <div className="mt-3 p-3 bg-white rounded shadow">
            <h5>Search Results</h5>
            <div className="list-group">
              {searchResults.map((property) => (
                <div
                  key={property.property_id}
                  className="list-group-item list-group-item-action"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">{property.property_title}</h6>
                    <small>{property.property_type}</small>
                  </div>
                  <p className="mb-1">
                    {property.address}, {property.city}, {property.state}
                  </p>
                  <small>₹{property.price}</small>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>




      {/* Featured Properties Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-left mb-5" data-aos="fade-up">
            Featured Properties Section
          </h2>

          <div className="row">
            {loading ? (
              <div className="text-center">Loading properties...</div>
            ) : (
              properties.map((property, index) => (
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
                    {/* Carousel */}
                    <Carousel
                      interval={3000}
                      indicators={false}
                      controls={true}
                      pause={false}
                    >
                      {(property.images || []).map((imgObj, i) => (
                        <Carousel.Item key={i}>
                          <img
                            src={`${baseurl}${imgObj.image}`}
                            className="d-block w-100"
                            alt={`slide-${i}`}
                            style={{
                              borderRadius: "8px",
                              maxHeight: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>

                    {/* Card Body */}
                    <div
                      className="card-body d-flex flex-column justify-content-between"
                      style={{ flexGrow: 1 }}
                    >
                      <div>
                        <div className="row mb-2 align-items-center">
                          <div className="col text-start ps-0">
                            <span className="badge bg-success me-2">
                              {property.looking_to?.charAt(0).toUpperCase() +
                                property.looking_to?.slice(1)}
                            </span>
                            <span className="badge bg-secondary">
                              {property.furnishing_status}
                            </span>
                          </div>
                        </div>

                        <h5 className="card-title">{property.property_title}</h5>
                        <p className="card-text">{property.description}</p>
                      </div>


                      {/* Buttons Section */}
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
                          // onClick={() => navigate('/login')}
                          onClick={() => {
                      // Store the property ID and redirect info based on role
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
            )}
          </div>

          {/* Browse All */}
          <div className="text-center mt-3">
            <a href="/properties" className="btn btn-primary px-4 py-2">
              Browse All Properties
            </a>
          </div>
        </div>
      </section>



      {/* Intro Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-left">
            <div className="col-lg-6" data-aos="fade-right">
              <h2 className="section-title">Welcome to Shriraj Commercial Real Estate</h2>
              <p>We specialize in connecting investors with premium commercial real estate opportunities across various sectors including warehouses, office buildings, retail spaces, and industrial complexes.</p>
              <p>Our team of experts thoroughly vets each property to ensure it meets our high standards for investment potential, location quality, and long-term value appreciation.</p>
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

      {/* Explore Categories */}
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
                      {/* <Typography variant="body2" color="text.secondary">
                        {category.count}
                      </Typography> */}
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



      {/* Shriraj Advantage Section */}
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

      {/* Properties Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-left mb-5" data-aos="fade-up">
            Properties
          </h2>
          <div className="row">
            {loading ? (
              <div className="text-center">Loading properties...</div>
            ) : (
              properties.map((property, index) => (
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
                    <Carousel
                      interval={3000}
                      indicators={false}
                      controls={true}
                      pause={false}
                    >
                      {(property.images || []).map((imgObj, i) => (
                        <Carousel.Item key={i}>
                          <img
                            src={`${baseurl}${imgObj.image}`}
                            className="d-block w-100"
                            alt={`slide-${i}`}
                            style={{
                              borderRadius: '8px',
                              maxHeight: '200px',
                              objectFit: 'cover',
                            }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>

                    <div
                      className="card-body d-flex flex-column justify-content-between"
                      style={{ flexGrow: 1 }}
                    >
                      <div>
                        <div className="row mb-2 align-items-center">
                          <div className="col text-start ps-0">
                            <span className="badge bg-success me-2">
                              {property.looking_to?.charAt(0).toUpperCase() + property.looking_to?.slice(1)}
                            </span>
                            <span className="badge bg-secondary">{property.furnishing_status}</span>
                          </div>
                        </div>
                        <h5 className="card-title">{property.property_title}</h5>
                        <p className="card-text">{property.description}</p>
                      </div>

                      {/* Buttons Section */}
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
                          // onClick={() => navigate('/login')}
                          onClick={() => {
                      // Store the property ID and redirect info based on role
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
            )}
          </div>

          <div className="text-center mt-3">
            <a href="/properties" className="btn btn-primary px-4 py-2">
              Browse All Properties
            </a>
          </div>
        </div>
      </section>


      {/* Our Backers Section */}
      <section className="py-5" style={{ backgroundColor: '#e9e9e9' }}>
        <div className="container">
          <h2 className="section-title text-left mb-5" data-aos="fade-up">Our Backers</h2>
          <div className="row align-items-center justify-content-center">
            {backers.map((backer, index) => (
              <div
                className="col-md-2 col-4 text-center mb-4"
                key={backer.id}
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
              >
                <img
                  src={backer.logo}
                  alt={backer.alt}
                  className="backer-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShrirajLandingPage;