import React, { useState } from "react";
import "./Popup.css";
import Logo from "./../Images/logo.png";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close when overlay is clicked
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
    // setError(null);
    
    // Prepare payload according to API requirements
    const payload = {
      first_name: formData.name,
      last_name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number
    };

    console.group("Form Submission Details");
    console.log("Preparing to submit form with payload:", JSON.stringify(payload, null, 2));
    
    try {
      console.log("Making POST request to:", "https://rahul30.pythonanywhere.com/leads/");
      
      const response = await fetch("https://rahul30.pythonanywhere.com/leads/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Received response with status:", response.status);
      
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
      // setError("Failed to submit. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
      console.groupEnd();
    }
  };
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-card">
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
            <button 
              type="submit" 
              className="popup-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;