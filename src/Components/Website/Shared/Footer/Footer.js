import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography, TextField, Button, Card, Grid, IconButton } from "@mui/material";
import { Facebook, Instagram, LinkedIn, YouTube, Twitter } from "@mui/icons-material";
// import "./Footer.css";
import Logo from '../../../Images/logo.png';
import Divider from '@mui/material/Divider';
import { Container, Navbar, Nav, Row, Col, Form, } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (

    <footer className="footer-custom">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <img
              src={Logo}
              alt="Shriraj Logo"
              className="footer-logo"
              style={{
                height: '40px',
                width: 'auto',
                maxWidth: '150px',
                transform: 'scale(2.0)',
                marginLeft:"25px",
              }}
            />
            <p className="mt-4">Premium commercial real estate investments for discerning investors. Discover exceptional opportunities in prime locations nationwide.</p>
            <div className="social-links mt-3">
              <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <div className="footer-links">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/properties">Properties</a></li>
                <li><a href="/">Why Shriraj</a></li>
                <li><a href="/aboutus">About Us</a></li>
                <li><a href="/contactus">Contact</a></li>
              </ul>
            </div>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <div className="footer-links">
              <h5>Properties</h5>
              <ul>
                <li><a href="#">Residential</a></li>
                <li><a href="#">Commercial</a></li>
                {/* <li><a href="#">Retail</a></li>
                <li><a href="#">Industrial</a></li>
                <li><a href="#">Mixed Use</a></li> */}
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
                            marginTop: '0px',
                            border: '1px solid #21a0ea',
                            height: "38px",
                            transition: 'none', // Disable all transitions
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
              <a href="/privacypolicy" className="text-white me-3">Privacy Policy</a>
              <a href="/termsandconditions" className="text-white me-3">Terms & Conditions</a>
              <a href="/refundpolicy" className="text-white">Refundpolicy</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>

  );
}

export default Footer;
