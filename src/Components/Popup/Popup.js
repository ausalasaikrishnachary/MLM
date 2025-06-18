import React from "react";
import "./Popup.css";
import Logo from "./../Images/logo.png"

const Popup = () => {
  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <div className="popup-header">
          <img
            src={Logo} // Replace with your logo URL or local import
            alt="Shriraj Team"
            className="popup-logo"
          />
          <div className="popup-title">
            <h2>Shriraj Team</h2>
            <p className="subtitle">Get the best space for your business.</p>
          </div>
        </div>
         <div className="popup-body">
          <label htmlFor="Name" className="popup-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            className="popup-input"
          />
        </div>
        <div className="popup-body">
          <label htmlFor="mobile" className="popup-label">
            Mobile Number
          </label>
          <input
            id="mobile"
            type="text"
            placeholder="Enter mobile number"
            className="popup-input"
          />
        </div>
         <div className="popup-body">
          <label htmlFor="Email" className="popup-label">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Enter email"
            className="popup-input"
          />
          <button className="popup-submit">Submit</button>
        </div>
        
      </div>
    </div>
  );
};

export default Popup;
