import React from 'react';

const Privacypolicy = () => {
  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '20px',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 'bold' }}>Privacy Policy</h2>
      <p><strong>Effective Date:</strong> June 9, 2025</p>

      <h3 style={sectionTitleStyle}>1. Introduction</h3>
      <p>
        This Privacy Policy describes how Shriraj collects, uses, and protects your personal information when you use our platform to buy, sell, rent, or lease properties.
        By using the platform, you agree to the practices outlined below.
      </p>

      <h3 style={sectionTitleStyle}>2. Information We Collect</h3>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, address, etc.</li>
        <li><strong>Property Details:</strong> Listings, preferences, and inquiry data.</li>
        <li><strong>Device & Usage Data:</strong> IP address, browser type, device info, and usage activity.</li>
        <li><strong>Documents:</strong> KYC documents, property documents, and proof of identity if uploaded.</li>
      </ul>

      <h3 style={sectionTitleStyle}>3. How We Use Your Information</h3>
      <ul>
        <li>To facilitate transactions between clients and agents/builders.</li>
        <li>To improve user experience and personalize services.</li>
        <li>To send updates, alerts, and promotional messages via email, SMS, or phone.</li>
        <li>To comply with legal obligations and platform policies.</li>
      </ul>

      <h3 style={sectionTitleStyle}>4. Data Sharing</h3>
      <p>
        We may share your information with:
      </p>
      <ul>
        <li>Agents, brokers, and builders you interact with.</li>
        <li>Third-party service providers for verification, analytics, or communication.</li>
        <li>Regulatory authorities when legally required.</li>
      </ul>
      <p>
        We do not sell your data to third parties for profit.
      </p>

      <h3 style={sectionTitleStyle}>5. Third-Party Logins</h3>
      <p>
        If you log in using Google or Facebook, we may access public profile information with your consent.
        This is used for authentication and personalization purposes only.
      </p>

      <h3 style={sectionTitleStyle}>6. Data Security</h3>
      <p>
        We implement standard security practices to protect your information from unauthorized access or misuse.
        However, no system can be 100% secure, and we cannot guarantee absolute security.
      </p>

      <h3 style={sectionTitleStyle}>7. Your Rights</h3>
      <ul>
        <li>Access your data at any time by contacting us.</li>
        <li>Request correction or deletion of inaccurate data.</li>
        <li>Opt out of marketing communications via provided links or settings.</li>
      </ul>

      <h3 style={sectionTitleStyle}>8. Data Retention</h3>
      <p>
        We retain your information as long as your account is active or as needed to comply with legal obligations and resolve disputes.
      </p>

      <h3 style={sectionTitleStyle}>9. Children's Privacy</h3>
      <p>
        Our services are not intended for children under the age of 18. We do not knowingly collect data from minors.
      </p>

      <h3 style={sectionTitleStyle}>10. Changes to This Policy</h3>
      <p>
        We may update this policy occasionally. We will notify you of significant changes via email or through the platform.
      </p>

      <h3 style={sectionTitleStyle}>11. Contact Us</h3>
      <p>
        If you have questions about this policy, please contact our support team through the app or via email.
      </p>

      <h3 style={sectionTitleStyle}>12. Governing Law</h3>
      <p>
        This Privacy Policy is governed by the laws of India.
      </p>
    </div>
  );
};

export default Privacypolicy;
