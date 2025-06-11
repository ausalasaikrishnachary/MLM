import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuilding,
    faRupeeSign,
    faChartPie,
    faLock,
    faClock,
    faCheck,
    faPencilRuler,
    faDirections,
    faMapMarkerAlt,  // Add this line
    faPhoneAlt,      // Add this line
    faDownload,      // Add this line
    faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import './PropertyDetails.css';


const PropertyDetails = () => {
    return (
        <div>
            <div className="container position-relative h-100">
                <div className="row h-100 align-items-end">
                    <div className="col-lg-10 position-relative z-index-2 d-flex justify-content-between align-items-center mt-3">
                        <div>
                            <h1 className="display-4 fw-bold">Gudur Asset 01</h1>
                            <p className="lead">Gudur, Chennai</p>
                        </div>
                        <div className="w-50 position-relative">
                            <div className="card">
                                <div className="card-body">
                                    <div className="progress" style={{ height: '30px' }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: '60%', backgroundColor: '#2a5f9e' }}
                                            aria-valuenow="60"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <span className="progress-text">60% Funded</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="container position-relative h-100">
      <div className="card">
      <div className="card-body text-center">
      <h2 className="mb-0">Transaction Profile</h2> */}
                <div className="row mb-5">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="mb-4">Transaction Profile</h2>


                                <p style={{ textAlign: 'left' }}>
                                    The asset is fully leased to a US-based Indian tech company offering AI-led customer services solutions having a presence in 6 countries and employing 15,000+ people.
                                </p>

                                <div className="row text-center">
                                    <div className="col-2 mb-4">
                                        <FontAwesomeIcon icon={faBuilding} size="2x" />
                                        <h6>246,935 sq.ft</h6>
                                        <p className="text-muted">Total Area</p>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <FontAwesomeIcon icon={faRupeeSign} size="2x" />
                                        <h6>₹103.2</h6>
                                        <p className="text-muted">Rent per sq.ft</p>
                                    </div>
                                    <div className="col-3 mb-4">
                                        <FontAwesomeIcon icon={faChartPie} size="2x" />
                                        <h6>Every 3 years</h6>
                                        <p className="text-muted">Rent Escalation</p>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <FontAwesomeIcon icon={faLock} size="2x" />
                                        <h6>4.6 years*</h6>
                                        <p className="text-muted">Tenant Lock-in</p>
                                    </div>
                                    <div className="col-3 mb-4">
                                        <FontAwesomeIcon icon={faClock} size="2x" />
                                        <h6>Dec 2024 - Dec 2033</h6>
                                        <p className="text-muted mt-2">Lease Period</p>
                                    </div>
                                </div>

                                {/* Lease Timeline */}
                                <h2 className="mb-0 text-start">Proposed Lease Timeline</h2>
                                <div className="progress-steps">
                                    <div className="progress-bar">
                                        <div className="progress-bar-fill"></div>
                                    </div>
                                    <div className="row text-center mt-3">
                                        <div className="col step completed">
                                            <FontAwesomeIcon icon={faCheck} size="2x" />
                                            <h6>Dec 2024</h6>
                                            <small className="text-muted">Purchase Date</small>
                                        </div>
                                        <div className="col step completed">
                                            <FontAwesomeIcon icon={faCheck} size="2x" />
                                            <h6>Dec 2027</h6>
                                            <small className="text-muted">First rent Escalation</small>
                                        </div>
                                        <div className="col step active">
                                            <FontAwesomeIcon icon={faPencilRuler} size="2x" />
                                            <h6>Dec 2030</h6>
                                            <small className="text-muted">Second rent Escalation</small>
                                        </div>
                                        <div className="col step">
                                            <FontAwesomeIcon icon={faCheck} size="2x" style={{ color: 'green' }} />
                                            <h6>Dec 2033</h6>
                                            <small className="text-muted">Lease Expiry</small>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">

                        <div className="card mb-5">
                            <div className="card-body">
                                <h2 className="mb-4">Property Details</h2>
                                <p>
                                    Astra Platina is the first scheme launched by Property Share Investment Trust (PSIT), India’s first registered Small and Medium REIT. We are the first listed SM REIT in India and believe that our first scheme - Astra Platina offers investors an opportunity to invest in six floors of a high-quality Grade A asset, Prestige Tech Platina, located on Outer Ring Road, Bengaluru – one of the largest office markets in the country.
                                </p>
                                <div className="mb-5">
                                    <h3 className="mb-3">360° Virtual Tour and Drone Video</h3>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="video-container">
                                                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allowFullScreen></iframe>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="video-container">
                                                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allowFullScreen></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section>
                            <div className="mb-5">
                                <h3 className="mb-3">Projected Net Distribution Cash Flow</h3>
                                <div className="table-striped table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Particulars</th>
                                                <th>FY26</th>
                                                <th>FY27</th>
                                                <th>FY28</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Net distributions to Investors (in INR)</td>
                                                <td>31.69 Cr.</td>
                                                <td>30.79 Cr.</td>
                                                <td>30.21 Cr.</td>
                                            </tr>
                                            <tr>
                                                <td>Yield (%)</td>
                                                <td>9.0%</td>
                                                <td>8.7%</td>
                                                <td>8.6%</td>
                                            </tr>
                                            <tr>
                                                <td>Post-Tax Yield</td>
                                                <td>8.2%</td>
                                                <td>8.2%</td>
                                                <td>8.2%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>




                        <div className="card mt-5">
                            <div className="card-body">
                                <h3 className="mb-5">Location</h3>
                                <p>Prestige Tech Platina is located along the main IT corridor on the Outer Ring Road, the largest office market in Bangalore with an office stock of 87.1 msf.</p>
                                <div className="ratio ratio-16x9 mb-3 mt-4">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.266589496342!2d78.3678744153536!3d17.44795050585151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8b5a06c3%3A0x123b726d3206a6e4!2sASQ%2C%20state!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                                        allowFullScreen
                                        loading="lazy"
                                    ></iframe>
                                </div>
                                <button className="btn w-100">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                                    Get Directions
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4">

                        <div className="card">
                            <div className="card-body">
                                <h2 className="mb-4">Property Gallery</h2>
                                <div className="photo-grid mb-4">
                                    <img src="https://www.vts.com/wp-content/uploads/2021/10/10.04.21-What-is-Industrial-Real-Estate-8-Types-of-Properties.png" alt="Property view 1" className="img-fluid" />
                                    <img src="https://www.belvoir.net/wp-content/uploads/2022/10/iStock-1138429558-1080x675.jpeg" alt="Property view 2" className="img-fluid" />
                                    <img src="https://www.schwarzproperties.net/wp-content/uploads/2022/01/pexels-tiger-lily-4483775-scaled.jpg" alt="Approval documents" className="img-fluid" />
                                    <img src="https://www.rmhsystems.com/wp-content/uploads/2021/08/DAKEquipmentCo-107009-Warehouse-Labor-Shortage-blogbanner1.jpeg" alt="Location map" className="img-fluid" />
                                </div>
                            </div>
                        </div>




                        <div className="card mt-5">
                            <div className="card-body">
                                <h3 className="mb-3">Astra Platina Webinar</h3>
                                <img src="data:image/jpeg;base64,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" alt="Webinar Image" className="img-fluid w-100 mb-3" />
                                <div className="video-placeholder position-relative mb-3">
                                    <button className="btn btn-primary">Play Webinar</button>
                                </div>
                                <p><strong>15 OCT 2024 | 4:00 PM IST DURATION: 45 MINS</strong></p>
                                <p><strong>Astra Platina: India’s 1st SM REIT scheme</strong></p>
                                <p>ICICI Securities, the lead merchant banker to the issue, hosted a live webinar to discuss SM REITs and details of the new scheme together with Kunal Moktan, Co-founder of the Property Share Group.</p>
                            </div>
                        </div>


                        <section className="card sticky-top">
                            <div className="card-body text-center">
                                <h5 className="mb-3">Interested in this property?</h5>
                                <button className="btn btn-primary btn-lg w-100 mb-3">
                                    <FontAwesomeIcon icon={faPhoneAlt} className="me-2" />
                                    Request Call Back
                                </button>
                                <button className="btn btn-primary btn-lg w-100 mb-3">
                                    <FontAwesomeIcon icon={faDownload} className="me-2" />
                                    Download Brochure
                                </button>
                                <button className="btn btn-primary btn-lg w-100 mb-3">
                                    <FontAwesomeIcon icon={faDownload} className="me-2" />
                                    Investment Note
                                </button>
                                <button className="btn btn-primary btn-lg w-100 mb-3">
                                    <FontAwesomeIcon icon={faDownload} className="me-2" />
                                    Final Offer Document
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div className="bg-dark text-white py-5 mt-5 w-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-1">

                        </div>
                        <div className="col-lg-5">
                            <h3 className="mb-4">About Astra</h3>
                            <p>
                                With over 15 years of experience in real estate development, we've delivered premium residential projects across ASQ. Our focus on transparency, quality, and customer satisfaction has made us one of the most trusted names in the industry.
                            </p>
                            <div className="mt-4">
                                <h5>Contact Info</h5>
                                <p><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> 123 Developer Lane, ASQ, state 500032</p>
                                <p><FontAwesomeIcon icon={faPhoneAlt} className="me-2" /> +91 xxxxx xxxxx</p>
                                <p><FontAwesomeIcon icon={faEnvelope} className="me-2" /> info@Astra.com</p>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="enquiry-form">
                                <h3 className="mb-4">Enquire About This Property</h3>
                                <form id="propertyEnquiryForm">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Your Name" required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" placeholder="Email Address" required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="tel" className="form-control" placeholder="Phone Number" required />
                                    </div>
                                    <div className="mb-3">
                                        <textarea className="form-control" rows="3" placeholder="Your Message"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-light w-100">Submit Enquiry</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-1">

                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="text-center">
                        <p className="mb-0">&copy; 2025 Astra Residency. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
