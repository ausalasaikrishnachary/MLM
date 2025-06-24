import React, { useState, useEffect } from "react";
import "./Popup.css";
import Logo from "./../Images/logo.png";
import { baseurl } from "../BaseURL/BaseURL";
import { Button } from "@mui/material";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Disable background scroll and pointer events on mount
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("popup-active");
    } else {
      document.body.classList.remove("popup-active");
    }

    return () => {
      document.body.classList.remove("popup-active");
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      setIsOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      first_name: formData.name,
      last_name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number
    };

    try {
      const response = await fetch(`${baseurl}/leads/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Server responded with error details:", errorData);
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Successful submission! Response data:", data);

      setIsOpen(false);
    } catch (error) {
      console.error("Submission failed:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <img src={Logo} alt="Shriraj Team" className="popup-logo" />
          <div className="popup-title">
            <h2>Shriraj Team</h2>
            <p className="subtitle">Get the best space for your business.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="popup-body">
            <label htmlFor="name" className="popup-label">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              className="popup-input"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="popup-body">
            <label htmlFor="phone_number" className="popup-label">Phone Number</label>
            <input
              id="phone_number"
              type="tel"
              placeholder="Enter phone number"
              className="popup-input"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="popup-body">
            <label htmlFor="email" className="popup-label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              className="popup-input"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "rgb(46, 22, 109)",
                color: "white",
                fontWeight: "bold",
                borderRadius: "20px",
                mt: 2,
                display: "block",
                mx: "auto",
                '&:hover': {
                  backgroundColor: "rgb(30, 10, 80)",
                },
              }}
              className="contact-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
