import React from 'react';

const Refundpolicy = () => {
  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '20px',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 'bold' }}>Refund Policy</h2>

      <h3 style={sectionTitleStyle}>1. Overview</h3>
      <p>
        At Shriraj, we strive to provide excellent service and ensure customer satisfaction. This Refund Policy outlines the terms under which refunds may be issued.
      </p>

      <h3 style={sectionTitleStyle}>2. Eligibility for Refunds</h3>
      <ul>
        <li>Refunds may be considered only for payments made for premium services, promotions, or listing fees.</li>
        <li>Requests must be submitted within 30 days from the date of payment.</li>
        <li>Refunds are not provided for transactions related to property purchases, rentals, or leases facilitated through the platform.</li>
      </ul>

      <h3 style={sectionTitleStyle}>3. Process for Requesting Refunds</h3>
      <p>
        To request a refund, please contact our customer support team with your payment details and reason for the refund.
        We reserve the right to verify the claim and request additional information.
      </p>

      <h3 style={sectionTitleStyle}>4. Refund Approval and Processing</h3>
      <ul>
        <li>Once a refund request is approved, the refund will be processed within 7-10 business days.</li>
        <li>Refunds will be made through the original mode of payment wherever possible.</li>
        <li>In cases where original payment method refund is not feasible, alternate arrangements will be communicated.</li>
      </ul>

      <h3 style={sectionTitleStyle}>5. Non-Refundable Items</h3>
      <ul>
        <li>Any payments related to third-party services, including payment gateway fees.</li>
        <li>Fees paid to agents, brokers, or external vendors.</li>
        <li>Any penalties, fines, or government charges.</li>
      </ul>

      <h3 style={sectionTitleStyle}>6. Cancellation Policy</h3>
      <p>
        Users may cancel paid services before they are rendered. Cancellation requests must be submitted in writing. Refund eligibility will be evaluated as per this policy.
      </p>

      <h3 style={sectionTitleStyle}>7. Changes to Refund Policy</h3>
      <p>
        Shriraj reserves the right to update this Refund Policy at any time. Changes will be communicated via email or platform notifications.
      </p>

      <h3 style={sectionTitleStyle}>8. Contact Information</h3>
      <p>
        For questions or concerns regarding refunds, please contact our support team through the app or email.
      </p>
    </div>
  );
};

export default Refundpolicy;
