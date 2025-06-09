import React from 'react';

const Termsandconditions = () => {
  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '20px',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 'bold' }}>Terms and Conditions</h2>
      <p><strong>Effective Date:</strong> June 9, 2025</p>

      <h3 style={sectionTitleStyle}>1. Introduction</h3>
      <p>
        Welcome to Shriraj, a real estate platform designed to help users buy, sell, rent, or lease properties such as land, flats, and buildings.
        By accessing or using our application, you agree to comply with and be bound by the following terms and conditions.
      </p>

      <h3 style={sectionTitleStyle}>2. Terms of Use for Users</h3>
      <ul>
        <li>
          By expressing interest in any property or service, you authorize us and our affiliates to contact you via phone, SMS, email, or messaging platforms—even if you are registered under DND/NCPR.
        </li>
        <li>
          You consent to share your personal details and uploaded documents with relevant agents, advertisers, or service providers.
        </li>
        <li>
          We are not responsible for how third parties use your data after it is shared. Please refer to their privacy policies.
        </li>
        <li>
          Information shared publicly (like in comments or profiles) may be viewed globally. Avoid posting sensitive or private data.
        </li>
        <li>
          You are responsible for managing your privacy settings and using opt-out options where available.
        </li>
        <li>
          Signing in via third-party platforms (Google, Facebook) allows us to access basic public information, such as your name and email.
        </li>
      </ul>

      <h3 style={sectionTitleStyle}>3. User Roles</h3>
      <ul>
        <li><strong>Client</strong> – Can browse, inquire, and initiate transactions for properties.</li>
        <li><strong>Agent</strong> – Can list properties, manage inquiries, and assist clients.</li>
        <li><strong>Admin</strong> – Oversees the platform, manages users, and resolves disputes.</li>
      </ul>

      <h3 style={sectionTitleStyle}>4. Services Offered</h3>
      <p>We offer modules to:</p>
      <ul>
        <li>Buy properties</li>
        <li>Sell properties</li>
        <li>Rent properties</li>
        <li>Lease properties</li>
      </ul>

      <h3 style={sectionTitleStyle}>5. User Responsibilities</h3>
      <ul>
        <li>Provide accurate, complete, and updated information.</li>
        <li>Maintain confidentiality of login credentials.</li>
        <li>Use the platform only for lawful and intended purposes.</li>
      </ul>

      <h3 style={sectionTitleStyle}>6. Property Listings</h3>
      <p>
        Agents and admins must ensure all listings are accurate and legal. Fake, misleading, or unauthorized listings are strictly prohibited.
      </p>

      <h3 style={sectionTitleStyle}>7. Communication & Interaction</h3>
      <p>
        Users agree to receive communications from us via email, phone, or notifications. All communication must remain professional.
        Harassment or abuse is prohibited.
      </p>

      <h3 style={sectionTitleStyle}>8. Payments</h3>
      <p>
        Fees (if applicable) for promotions, services, or premium listings must be paid promptly.
        Payment gateways are handled through secure third-party services.
      </p>

      <h3 style={sectionTitleStyle}>9. Account Termination</h3>
      <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>

      <h3 style={sectionTitleStyle}>10. Limitation of Liability</h3>
      <p>
        Shriraj is not responsible for disputes between clients and agents or the legality of property documents.
        Users must conduct due diligence.
      </p>

      <h3 style={sectionTitleStyle}>11. Governing Law</h3>
      <p>These terms shall be governed by the laws of India.</p>

      <h3 style={sectionTitleStyle}>12. Terms for Dealers, Builders, Banks, and Payment Gateways</h3>
      <ul>
        <li>
          You must comply with all applicable data protection laws in collecting and processing user data.
        </li>
        <li>
          Data must only be used for agreed-upon purposes and kept secure using appropriate technical and organizational safeguards.
        </li>
        <li>
          You are responsible for responding to user data access or deletion requests in compliance with applicable regulations.
        </li>
        <li>
          Do not share user data with sub-processors unless they offer equivalent data protection measures.
        </li>
        <li>
          Personal data must be deleted or anonymized once it is no longer needed.
        </li>
        <li>
          Notify us immediately in the event of a data breach involving personal data obtained from our platform.
        </li>
      </ul>
    </div>
  );
};

export default Termsandconditions;
