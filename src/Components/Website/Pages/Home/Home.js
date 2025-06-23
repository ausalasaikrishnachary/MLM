
import "./Home.css"
import { Container, Navbar, Nav, Row, Col, Form, Button } from 'react-bootstrap';
import { Tabs, InputGroup } from "react-bootstrap";
import { FaSearch, FaCrosshairs, FaMicrophone } from 'react-icons/fa';
import { Carousel, Tab, Card } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
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

  const [activeTab, setActiveTab] = useState('buy');
  const [searchResults, setSearchResults] = useState([]);
const navigate = useNavigate();
 const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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


  const SearchInput = ({ activeTab }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

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
          setSuggestions(response.data);
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

            <div className="icon-btn">
              <FaCrosshairs />
            </div>
            <div className="icon-btn">
              <FaMicrophone />
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

  // Team member data
  const teamMembers = [
    {
      name: "John Doe",
      position: "Chief Executive Officer",
      description: "10+ years in investment banking, finance, or real estate. | Strong leadership, strategic planning, and risk management.",
      imgSrc: "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?ga=GA1.1.718196285.1710491388&semt=ais_hybrid&w=740"
    },
    {
      name: "Jane Smith",
      position: "Chief Financial Officer",
      description: "8+ years in finance, accounting, or wealth management. Strong analytical skills, financial forecasting, and risk assessment.",
      imgSrc: "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?ga=GA1.1.718196285.1710491388&semt=ais_hybrid&w=740"
    },
    {
      name: "Robert Johnson",
      position: "Chief Investment Officer",
      description: "10+ years Proven track record in achieving consistent investment growth and managing diversified portfolios.",
      imgSrc: "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?ga=GA1.1.718196285.1710491388&semt=ais_hybrid&w=740"
    },
    {
      name: "Sarah Williams",
      position: "Director of Marketing",
      description: "10+ years in finance, wealth management. Strong analytical skills, financial forecasting, and risk assessment.",
      imgSrc: "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?ga=GA1.1.718196285.1710491388&semt=ais_hybrid&w=740"
    }
  ];


  const processSteps = [
    {
      title: "Property Search",
      description: "Browse our extensive inventory of premium commercial properties"
    },
    {
      title: "Consultation",
      description: "Meet with our real estate experts to discuss your needs"
    },
    {
      title: "Closing",
      description: "Complete the transaction with our hassle-free process"
    }
  ];
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
      image: 'https://img.freepik.com/free-photo/real-estate-agent-holding-house_23-2147761175.jpg',
    },
    {
      title: 'Commercial',
      count: '521 Properties',
      image: 'https://img.freepik.com/premium-photo/business-center-buildings-real-estate-cityscape-background_10307-1926.jpg',
    },
    {
      title: 'Agriculture',
      count: '61 Properties',
      image: 'https://img.freepik.com/premium-photo/top-view-agriculture-green-fields_31965-27869.jpg',
    },
    {
      title: 'Industrial',
      count: '11 Properties',
      image: 'https://img.freepik.com/premium-photo/modern-industrial-building-exterior_1127-3055.jpg',
    },
  ];

  const properties = [
    {
      id: 1,
      title: 'Elegant Villa',
      details: '3 BHK in a prime location',
      images: [
        "https://www.shutterstock.com/image-photo/land-plot-management-real-estate-260nw-2591764263.jpg",
        "https://www.shutterstock.com/image-photo/land-plot-management-real-estate-260nw-2591764263.jpg",
        "https://www.shutterstock.com/image-photo/land-plot-management-real-estate-260nw-2591764263.jpg",
      ]
    },

    {
      id: 2,
      title: 'Villa Sahi',
      details: '3 BHK in a prime location',
      images: [
        'https://t4.ftcdn.net/jpg/03/70/64/43/360_F_370644357_MDF4UXLAXTyyi2OyuK66tWW9cA2f8svL.jpg',
        'https://t4.ftcdn.net/jpg/03/70/64/43/360_F_370644357_MDF4UXLAXTyyi2OyuK66tWW9cA2f8svL.jpg',
        'https://t4.ftcdn.net/jpg/03/70/64/43/360_F_370644357_MDF4UXLAXTyyi2OyuK66tWW9cA2f8svL.jpg',
      ]
    },


    {
      id: 3,
      title: 'luxurystays',
      details: '3 BHK in a prime location',
      images: [
        'https://luxurystays.in/villas/AzulD/BD2.jpg',
        'https://luxurystays.in/villas/AzulD/BD2.jpg',
        'https://luxurystays.in/villas/AzulD/BD2.jpg',
      ]
    },

  ];

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
        const response = await axios.get('https://rahul30.pythonanywhere.com/carousel/');
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



      <div className="container-fluid px-0 " style={{ marginTop: "-4px" }}>
        <Card className="shadow rounded-0 border-0">
          <Carousel
            fade={false}
            interval={3000}
            indicators={true}
            prevIcon={
              <span
                className="custom-arrow left-arrow"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "20px",
                  zIndex: 2,
                  fontSize: "2rem",
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
                  right: "20px",
                  zIndex: 2,
                  fontSize: "2rem",
                  color: "#fff",
                }}
              >
                <FaChevronRight />
              </span>
            }
          >
           {carouselItems.map((item, index) => (
            <Carousel.Item key={index} className="position-relative">
              {/* Image */}
              <img
                className="d-block w-100"
                src={`https://rahul30.pythonanywhere.com${item.image}`}
                alt={item.title || `Slide ${index + 1}`}
                style={{
                  maxHeight: "500px",
                  objectFit: "cover",
                  width: "100vw",
                }}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/1200x500?text=Image+Not+Found";
                }}
                />

                {/* ✅ Dark Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the opacity here
                    zIndex: 2,
                  }}
                ></div>

                {/* Hero Content Overlay */}
                <div
                  className="position-absolute top-50 start-50 translate-middle text-white text-center"
                  style={{ zIndex: 3, marginTop: "-40px" }} // Make sure this is above the overlay
                >
                  <div className="hero-content"> 
                    <h1 className="display-5 fw-bold mb-4">Premium Commercial Real Estate</h1>
                    <p className="lead mb-4">
                      Find the perfect warehouse or commercial building for your business with Shriraj Real Estate
                    </p>
                    <a href="/properties" className="btn view-property-btn px-4 py-2">
                      View Properties
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
                <SearchInput activeTab="buy" />
              </div>
            </Tab>
            <Tab eventKey="rent" title="Rent">
              <div className="mt-3">
                <SearchInput activeTab="rent" />
              </div>
            </Tab>
            <Tab eventKey="sell" title="Sell">
              <div className="mt-3">
                <SearchInput activeTab="sell" />
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

      {/* Team Section */}
      {/* <section className="py-5 bg-light Team-section">
        <div className="container">
          <h2 className="section-title text-left" data-aos="fade-up">Our Team</h2>
          <div className="row">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 mb-4"
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
              >
                <div className="property-card text-center">
                  <img
                    src={member.imgSrc}
                    alt={member.name}
                    className="img-fluid rounded-circle mb-3 mt-3 mx-auto"
                    style={{ width: '180px', height: '180px', objectFit: 'cover' }}
                  />
                  <div className="p-3">
                    <h5>{member.name}</h5>
                    <p className="text-muted">{member.position}</p>
                    <p>{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
      {/* <div className="text-center mt-4">
            <a href="#" className="btn btn-primary view-property-btn px-4 py-2" data-aos="fade-up">
              Meet Our Full Team
            </a>
          </div> */}
      {/* </div>
      </section> */}


      {/* Properties Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-left mb-5" data-aos="fade-up">Featured Property Sale</h2>
          <div className="row">
            {properties.map((property, index) => (
              <div
                className="col-md-4 mb-4"
                key={property.id}
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
              >
                <div className="property-card card">
                  <Carousel
                    interval={3000} // Auto-slide every 3 seconds
                    indicators={false}
                    controls={true}
                    pause={false} // Prevent pause on hover
                    prevLabel=""
                    nextLabel=""
                    prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
                    nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
                  >
                    {property.images.map((imgSrc, i) => (
                      <Carousel.Item key={i}>
                        <img
                          src={imgSrc}
                          className="d-block w-100"
                          alt={`slide-${i}`}
                          style={{ borderRadius: '8px', maxHeight: '200px', objectFit: 'cover' }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>

                  <div className="card-body">

                    {/* Row 1: Left - Sell/Residential | Right - Sqft/Price */}
                    <div className="row mb-2 align-items-center">
                      <div className="col text-start ps-0" style={{ marginLeft: '-5px' }}>
                        <span className="badge bg-success me-2">Sell</span>
                        <span className="badge bg-secondary">Residential</span>
                      </div>
                    </div>
                    {/* Row 2: Title, Details, Button */}
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text">{property.details}</p>
                    <a href="/properties" className="btn btn-primary view-property-btn px-4 py-2">
                      View Property
                    </a>

                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <a href="/properties" className="btn btn-primary view-property-btn px-4 py-2">
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
              <a href="/properties" className="btn view-property-btn mt-3">View Properties</a>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <img
                src="https://www.developer.com/wp-content/uploads/slider/cache/f8aa18e48223e00fe5e7658c206b4449/Empire-State-Building-1-1200-x-600.jpg"
                alt="Commercial Property"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* cards */}

      <Box sx={{ py: 6 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Explore Categories
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Find Best Categories in town with Shriraj Team
          </Typography>
        </Box>

        <Box sx={{ width: '80%', mx: 'auto' }}>
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
                    height="120"
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
                      <Typography variant="body2" color="text.secondary">
                        {category.count}
                      </Typography>
                    </Box>
                    <IconButton sx={{ backgroundColor: '#f1f1f1' }} size="small">
                      <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>



      {/* Why Commercial RE Section */}
      <section className="why-Shriraj-section">
        <div className="container">
          <h2
            className="section-title text-left"
            data-aos="fade-up"
            style={{ marginTop: '30px', paddingTop: '20px' }}
          >
            Why Commercial Real Estate
          </h2>
          <div className="row">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="video-container mb-4">
                <video width="100%" height="300" controls>
                  <source
                    src="https://media.gettyimages.com/id/1356847933/video/drone-view-of-warehouse-in-milton-keynes-uk.mp4?s=mp4-640x640-gi&k=20&c=z4Nixp-V5djCUdvjQ8f8GNWee8BRU6VW9q5du4wKzwU="
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="p-4">
                <h3 className="mb-4">Investment Benefits</h3>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                    Higher returns compared to residential properties
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                    Longer lease terms providing stable income
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                    Triple-net leases reducing ownership costs
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                    Opportunity for portfolio diversification
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                    Potential tax benefits through depreciation
                  </li>
                </ul>
                <div className="text-center text-lg-start mt-4">
                  <a href="/properties" className="btn view-property-btn mt-3">View Properties</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      {/* <section className="video-section">
        <div className="container">
          <h2 className="section-title text-left" data-aos="fade-up">How It Works</h2>
          <div className="row">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="p-4">
                <h3 className="mb-4">Our Process</h3>
                {processSteps.map((step, index) => (
                  <div className="d-flex mb-4" key={index}>
                    <div className="me-3">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success"
                        style={{ width: '20px', height: '20px' }}
                      />
                    </div>
                    <div>
                      <h5>{step.title}</h5>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
                <div className="text-center text-lg-start mt-4">
                  <a href="/properties" className="btn btn-primary view-property-btn px-4 py-2">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="video-container">
                <video width="100%" height="300" controls>
                  <source
                    src="https://media.gettyimages.com/id/1005428552/video/loading-docks.mp4?s=mp4-640x640-gi&k=20&c=pvbOZeOzq8K9p1_soQvYu-PIsZyaxRbltKDFACLVqEk="
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section> */}
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
          <h2 className="section-title text-left mb-5" data-aos="fade-up"> Properties</h2>
          <div className="row">
            {properties.map((property, index) => (
              <div
                className="col-md-4 mb-4"
                key={property.id}
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
              >
                <div className="property-card card">
                  <Carousel
                    interval={3000} // Auto-slide every 3 seconds
                    indicators={false}
                    controls={true}
                    pause={false} // Prevent pause on hover
                    prevLabel=""
                    nextLabel=""
                    prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
                    nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
                  >
                    {property.images.map((imgSrc, i) => (
                      <Carousel.Item key={i}>
                        <img
                          src={imgSrc}
                          className="d-block w-100"
                          alt={`slide-${i}`}
                          style={{ borderRadius: '8px', maxHeight: '200px', objectFit: 'cover' }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>

                  <div className="card-body">

                    {/* Row 1: Left - Sell/Residential | Right - Sqft/Price */}
                    <div className="row mb-2 align-items-center">
                      <div className="col text-start ps-0" style={{ marginLeft: '-5px' }}>
                        <span className="badge bg-success me-2">Sell</span>
                        <span className="badge bg-secondary">Residential</span>
                      </div>
                    </div>
                    {/* Row 2: Title, Details, Button */}
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text">{property.details}</p>
                    <a href="/properties" className="btn btn-primary view-property-btn px-4 py-2">
                      View Property
                    </a>

                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <a href="/properties" className="btn btn-primary view-property-btn px-4 py-2">
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

      {/* In The News Section */}
      {/* <section className="py-5">
        <div className="container">
          <h2 className="section-title text-left" data-aos="fade-up">In The News</h2>
          <div className="row">
            {newsItems.map((news) => (
              <div
                className="col-md-4 mb-4"
                key={news.id}
                data-aos="fade-up"
                data-aos-delay={news.delay}
              >
                <div className="news-card">
                  <img
                    src={news.image}
                    alt={`News ${news.id}`}
                    className="img-fluid rounded mb-3"
                  />
                  <p className="news-date">{news.date}</p>
                  <h5>{news.title}</h5>
                  <p>{news.excerpt}</p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* Contact Us Section */}
      <section className="py-5" id="contact" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <h2 className="section-title text-left mb-5">Contact Us</h2>
          <div className="row">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="contact-form">
                <p className="mb-4">Interested in learning more about our properties or investment opportunities? Get in touch with our team.</p>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Your Name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile Number</label>
                    <input type="tel" className="form-control" id="mobile" placeholder="Your Mobile Number" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="email" placeholder="Your Email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="comments" className="form-label">Comments</label>
                    <textarea className="form-control" id="comments" rows="4" placeholder="Your Message"></textarea>
                  </div>
                  <button type="submit" className="btn view-property-btn px-4 py-2">Submit</button>
                </form>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="ps-lg-4">
                <h5 className="contact">Top-Tier Commercial Investment Properties</h5>
                <p>Our carefully curated selection of commercial real estate offers exceptional returns and security for investors looking to diversify their portfolio.</p>

                {/* Google Map Placeholder */}
                <div className="map-container mt-4 mb-4">
                  <div style={{ width: '100%', height: '250px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <svg width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                      {/* Background */}
                      <rect width="100%" height="100%" fill="#e9f5f9" />

                      {/* Roads */}
                      <line x1="0" y1="100" x2="800" y2="100" stroke="#ffffff" strokeWidth="20" />
                      <line x1="0" y1="200" x2="800" y2="200" stroke="#ffffff" strokeWidth="30" />
                      <line x1="0" y1="300" x2="800" y2="300" stroke="#ffffff" strokeWidth="15" />
                      <line x1="200" y1="0" x2="200" y2="400" stroke="#ffffff" strokeWidth="25" />
                      <line x1="400" y1="0" x2="400" y2="400" stroke="#ffffff" strokeWidth="35" />
                      <line x1="600" y1="0" x2="600" y2="400" stroke="#ffffff" strokeWidth="20" />

                      {/* Buildings */}
                      <rect x="220" y="120" width="60" height="60" fill="#d3d3d3" />
                      <rect x="420" y="220" width="80" height="60" fill="#c0c0c0" />
                      <rect x="320" y="320" width="40" height="40" fill="#d3d3d3" />

                      {/* Location marker */}
                      <g transform="translate(400, 200)">
                        <path d="M0-48c-9.8 0-18 8.2-18 18 0 14 18 30 18 30s18-16 18-30c0-9.8-8.2-18-18-18z" fill="#FF5252" />
                        <circle cx="0" cy="-40" r="6" fill="white" />
                      </g>

                      {/* Water */}
                      <rect x="620" y="20" width="160" height="120" fill="#a5d7e8" />

                      {/* Parks */}
                      <rect x="50" y="320" width="100" height="60" fill="#b5d8b9" />
                      <rect x="500" y="50" width="80" height="80" fill="#b5d8b9" />

                      {/* Text */}
                      <text x="400" y="380" fontFamily="Arial" fontSize="16" textAnchor="middle" fill="#666">Shriraj Commercial Realty</text>
                    </svg>
                  </div>
                </div>

                <div className=" ipad-off">
                  <h5>Office Location</h5>
                  <p>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" style={{ color: 'var(--primary-color)' }} />
                    50/4, SHRIRAJ PROPERTY SOLUTIONS PRIVATE LIMITED, Atal Chowk, Main Road Boria Khurd, Near Durga Mandir, Raipur, Chhattisgarh, 492017
                  </p>
                  {/* <p>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" style={{ color: 'var(--primary-color)' }} />
                    Atal Chowk, Main Road Boria Khurd, Near Durga Mandir, Raipur, Chhattisgarh, 492017
                  </p> */}
                </div>
                <div className="mt-4">
                  <h5>Contact Information</h5>
                  <p>
                    <FontAwesomeIcon icon={faPhone} className="me-2" style={{ color: 'var(--primary-color)' }} />
                    9074307248
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" style={{ color: 'var(--primary-color)' }} />
                    shrirajproperty00@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      {/* <footer className="footer-custom">
        <Container>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <img
                src="http://175.29.21.7:84/static/media/Logo%20File.78893cdbe11c7dfa5f45.png"
                alt="Shriraj Logo"
                className="footer-logo"
              />
              <p className="mt-3">Premium commercial real estate investments for discerning investors. Discover exceptional opportunities in prime locations nationwide.</p>
              <div className="social-links mt-3">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </Col>
            <Col md={2} className="mb-4 mb-md-0">
              <div className="footer-links">
                <h5>Quick Links</h5>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Properties</a></li>
                  <li><a href="#">Why Shriraj</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
            </Col>
            <Col md={2} className="mb-4 mb-md-0">
              <div className="footer-links">
                <h5>Properties</h5>
                <ul>
                  <li><a href="#">Warehouses</a></li>
                  <li><a href="#">Office Spaces</a></li>
                  <li><a href="#">Retail</a></li>
                  <li><a href="#">Industrial</a></li>
                  <li><a href="#">Mixed Use</a></li>
                </ul>
              </div>
            </Col>
            <Col md={4}>
              <div className="footer-links">
                <h5>Newsletter</h5>
                <p>Subscribe to our newsletter for the latest property listings and market insights.</p>
                <Form className="mt-3">
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <Form.Control
                            type="email"
                            placeholder="Your Email"
                            style={{
                              borderRadius: '4px 0 0 4px',
                              borderRight: 'none',
                              width: '100%'
                            }}
                          />
                        </td>
                        <td style={{ width: '1%', padding: 0 }}>
                          <Button
                            variant="light"
                            type="submit"
                            style={{
                              borderRadius: '0 4px 4px 0',
                              whiteSpace: 'nowrap',
                              marginTop: '-20px',
                              border: '1px solid #21a0ea'
                            }}
                            className="newsletter-btn"
                          >
                            Subscribe
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Form>
              </div>
            </Col>
          </Row>
          <hr className="mt-4 mb-4 footer-divider" />
          <Row>
            <Col md={6} className="text-center text-md-start">
              <p className="mb-0">&copy; 2025 Shriraj Commercial Real Estate. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <p className="mb-0">
                <a href="#" className="text-white me-3">Privacy Policy</a>
                <a href="#" className="text-white me-3">Terms of Service</a>
                <a href="#" className="text-white">Sitemap</a>
              </p>
            </Col>
          </Row>
        </Container>
      </footer> */}

    </>
  );
};

export default ShrirajLandingPage;