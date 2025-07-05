import React, { useState } from 'react';
import { Container, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import { FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';
import './TermsConditions.css';

const TermsConditions = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const sections = [
    {
      title: "Terms of Sale",
      content: (
        <div>
          <p>
            These terms of offer for sale (<strong>"Terms of Offer For Sale"</strong>) between GNG Electronics Limited
            http:///www.electronicsbazaar.com (hereinafter referred as 'Seller/Seller's website') and the Buyers including
            online buyers and the Users of the Website (<strong>"You" or "Your" or "Yourself" or "User"</strong>) describe, inter alia,
            the terms of offer for sale, sale, purchase of goods online through Seller's website (<strong>"online sale"</strong>).
          </p>
          <p>
            Please read the terms of offer for sale carefully before buying any products or availing any services from the seller online. Any purchase made by you online shall signify your acceptance of the terms of offer for sale and your agreement to be legally bound by the clauses of this Terms of Sale.
          </p>
          <p>
            In addition to the foregoing, you shall also be bound by the terms of use of the website, terms of offer for sale issued by the Seller or additional terms of service/specification of product which are displayed with the selection of the product, if any (<strong>"additional terms"</strong>) at the website or provided along with the product. If there is any conflict between the terms of offer for sale and the additional terms, the additional terms shall take precedence in relation to that sale.
          </p>
          <p className="text-uppercase fw-bold">
            IF YOU DO NOT AGREE WITH THE TERMS OF OFFER FOR SALE, DO NOT ACCESS THE WEBSITE OR PLACE AN ORDER FOR ANY PURCHASE.
          </p>

          <h5 className="mt-4 fw-bold">Business</h5>
          <ul>
            <li>
              The Seller's Website is a platform that facilitates the online sale of New products or Open box or unboxed or refurbished products, online purchase of Old or used mobiles or laptops and the services offered by the Seller including its affiliates/associates/service partners. The products are sold/purchased or the Services are offered to the Users through various modes. The Seller will be solely responsible to you for the products sold or purchased by you online through the Website.
            </li>
            <li>
              You acknowledge that the Seller has the right to change or discontinue any Service at any time, without notice. You further acknowledge that the Seller may add or modify the procedures, modes, processes or conditions of purchase at any time to adapt to changes that the Seller makes to the Services or mode of providing services. You agree that the Seller shall not be liable to you or to any third party for any modification, suspension or discontinuance of any aspect of the Services.
            </li>
          </ul>

          <h5 className="mt-4 fw-bold">Products</h5>
          <ul>
            <li>
              The Seller makes available a variety of New products, Refurbished, Open-box, Used products any other products of trade (hereinafter referred as 'the products') at an agreed price to you through on –line sale or on their in-built software or on their website. Purchase of such products though any mode from the Seller will be subject to the Terms of Offer for Sale and such other additional terms, if any, as specified by the Seller.
            </li>
            <li>
              Seller offers Shipping for all the products intended to be sold online on the Website. However, the packaging of the product depends on the Category of the Products purchased by the Buyers. Terms of shipping or packaging will be governed by this Term of sale or the Seller's policy, which may be changed by the Seller without any notice to you.
            </li>
            <li>
              All the Products are governed by the terms of warranties provided by the respective manufacturer/ brands and subject to the Seller's Warranty. However, in case any product is covered under the Seller's warranty, it shall be specifically mentioned in the product details.
            </li>
            <li>
              We ensure that your order will be safely delivered at your place within promised timeline. However, the same is subject to certain unforeseeable situations and circumstances beyond our control.
            </li>
            <li>
              The Seller is liable for faults arising from products purchased or bought from the Seller only and not otherwise. You are requested to follow the procedure as laid down by the Seller for Replacement of the products.
            </li>
          </ul>

          <h5 className="mt-4 fw-bold">Responsibility towards Products & Services</h5>
          <ul>
            <li>
              You should take all responsibility for your own actions in buying the product or utilizing the services purchased by you and the Seller shall not be liable for any such action.
            </li>
            <li>
              You represent that you have the competency to or capacity to enter into and to form a binding legal contract with the Seller and are not a person barred by law from buying such product or availing services under the laws as applicable in India.
            </li>
          </ul>

          <h5 className="mt-4 fw-bold">Pricing Information</h5>
          <ul>
            <li>
              The Seller strives to provide you the best possible prices for all the products and services you buy or avail of from the Seller online. However, the Seller does not guarantee that the prices will be the lowest in the city, region or geographic region. Prices and availability are subject to change without prior notice or any consequential liability to you.
            </li>
            <li>
              While the Seller strives to provide accurate products, services and pricing information, typographical and other errors may occur. In the event that a product or service is listed at an incorrect price or with incorrect information due to an error in pricing or product or service information, the Seller may, at its discretion, either contact you for instructions or to cancel your order and notify you of such cancellation. The Seller will have the right to modify the price of the product or service. The Seller may contact you to obtain any further instructions in connection with the sale/purchase/cancellation transaction via e-mail address or on a Mobile number or any other contact details provided by you at the time of registration or cancel the order and notify you of such cancellation. If the Seller cancels the order after the payment has been processed, the said amount will be remitted to you to your bank account; details of which will be provided by you to the Seller.
            </li>
          </ul>

          <h5 className="mt-4 fw-bold">Credit Card/Net Banking Details</h5>
          <ul>
            <li>
              While making payment of purchase or in certain cases, specifically with regard to particular products/ services, you might be required to provide your credit card or debit card or Net Banking or online Banking details to the approved payment gateways. In this regard you agree to provide correct and accurate credit/ debit card/Net Banking details to the approved payment gateways for buying products or availing Services from the Seller or through the Seller's website. You shall not use any credit/ debit card/Net banking account that is not lawfully owned by you, i.e. in any transaction, you must use your own credit/ debit card/Net banking account. The information provided by you will not be utilized or shared with any third party unless circumstances demand, as more particularly mentioned in the Privacy Policy. You will be solely responsible for the security and confidentiality of your credit/ debit card/Net banking details. The Seller expressly disclaims all liabilities that may arise as a consequence of any unauthorized use of your credit/ debit card/Net Banking account.
            </li>
          </ul>

          <h5 className="mt-4 fw-bold">Delivery of the Product</h5>
          <ul>
            <li>
              Your shipping address, pin code will be verified with the database of the Seller before you proceed to pay for your purchase. In case your order is not serviceable by our delivery/logistics partners or the area is not covered, we would request you to provide us with an alternate shipping address which we expect to have on our logistic/delivery partner's deliverable area. In case there is any dispute regarding the shipment of the product or services for an area not covered by the Seller, in such a case, the Seller will not be responsible for the non-delivery of the product.
            </li>
            <li>
              In case you book multiple orders for the Products and Services in one transaction, the Seller would endeavor to ship all Products together. However, this may not always be possible due to some product characteristics and/or logistics' issues and the order may be delivered step by step. If you purchase multiple Products in a single transaction, then all the Products would be dispatched to a single shipping address given by you. If you wish to ship Products to different addresses, then you should book the orders separately based on the delivery addresses.
            </li>
          </ul>
        </div>
      )
    },
{
  title: "Terms of Use of Website",
  content: (
    <div>
      <li>
        Your use of a website www.electronicsbazaar.com (hereinafter referred to as "the website") and services and tools are governed by the following terms and conditions. If you transact on the website, you shall be subject to the policies that are applicable to the website for such transaction. By mere use of the website you shall be contracting with Electronics Bazaar -- A unit of GNG Electronics Limited, a company incorporated under Companies Act, 1956 having it's Corporate office at 415, Hubtown Solaris, N.S.Phadke Marg, Andheri East, Mumbai, Maharastra – 400069 and these terms and conditions constitute binding obligations upon you.
      </li>
      <li>
        For the purpose of these terms of use, wherever the context so require 'You' shall mean any natural or legal person who has agreed to become a member of the Website by providing Registration Data while registering on the Website as Registered User using the computer systems of the Electronics Bazaar.
      </li>
      <li>
        When you use any of the services provided by our website in any manner or for any purpose, you will be subject to the rules, guidelines, policies, terms, and conditions applicable to such service, and they shall be deemed to be incorporated into this Terms of Use and shall be considered as part and parcel of this Terms of Use. We reserve our rights, at our sole discretion, to change, modify, add or remove portions of these Terms of Use, at any time. It is your responsibility to check these Terms of Use periodically for changes. Your use of the website following the posting of changes will mean that you accept and agree to the changes. Compliance or agreement to the said Terms of Use grants you the privilege and rights to enter and use the Site.
      </li>
      <li>
        Opening, accessing, browsing or otherwise using the website implies your concurrence and acceptance to all the terms and conditions including the revised terms and conditions as set out in this agreement and therefore, we request you to read this agreement carefully before initiating any action from this website.
      </li>
      <li>
        A person who is competent to enter into a legally binding valid contract under the provisions of Indian Contract Act, 1872 is authorized to use the Website or place an order to or conduct other connected activities through this website. Persons who are "incompetent to contract" within the meaning of the Indian Contract Act, 1872 including minors, un-discharged insolvents etc. are not eligible to use or perform any transaction through the Website. However, they may enter into a contract with us only through Legal guardians who are registered as users on our Website. We reserve our rights to terminate your membership and refuse to provide you with access to our website if it is brought to our notice or if it is discovered that you are incompetent to contract.
      </li>
      <li>
        If you use our website, you shall be responsible for maintaining the confidentiality of your User ID and Password and you shall be responsible for all activities that occur under your User ID and Password. You agree that if you provide any or we have reasonable grounds to suspect that such information that is untrue, inaccurate, old or incomplete or not in accordance with the Terms of this Use, we have the right to indefinitely suspend or terminate or block access of your membership with us and refuse to provide you with access to the Website.
      </li>
      <li>
        When you use our Website or send emails or other data, information or communication to us, you agree and understand that you are communicating with us through electronic records and you consent to receive communications via electronic records from us periodically or as and when required. We may communicate with you by email or by such other modes of communication, electronic or otherwise.
      </li>
      <li>
        The Website contains materials, including but not limited to software, text, graphics and images (hereinafter referred as the "Content"). We may own the Content or portions of the Content may be made available to us through arrangements that we have entered into with third parties. Unauthorized use of the Content may result in violation of our copyright, trademark, and other right under the appropriate Indian Legislature. You have no rights to the Content, and you will not use, copy or display the Content except as permitted under this Agreement. No use of the said contents is permissible without our prior written consent. You may not sell, transfer, assign, license, sublicense, or modify the Content or reproduce, display, publicly perform, make a derivative version of, distribute, or otherwise use the Content in any way for any public or commercial purpose.
      </li>
      <li>
        The use or posting of any of the Content on any other web site or in a networked computer environment for any purpose is expressly prohibited. If you violate any part of this Agreement, your right to access and/or use the Content and Site shall automatically be terminated and you shall immediately destroy any copies you have made of the Content. You agree not to: (a) take any action which imposes an unreasonable load on the website's infrastructure; (b) use any device, software or routine to interfere or attempt to interfere with the proper working of the website or any activity being conducted on the website; (c) attempt to decipher, decompile, disassemble or reverse engineer any of the software comprising or making up the website; (d) delete or alter any material posted on the website by us or any other person or entity; or (e) frame or link to any of the materials or information available on the Site.
      </li>
      <li>
        The trademarks, service marks, and logos of Electronic Bazaar used and displayed on this Site or copyright subsisting in the said logos forms part of our Intellectual Property Rights. Nothing on this Site or in this Agreement should be construed as assigning or granting, by implication, estoppel, or otherwise, any license or right to use any of our said Intellectual Property Rights without our prior written consent. The said Intellectual Property Rights shall not be used to disparage our or third-party's products or services or to dilute our goodwill in the market. All goodwill generated from the use of any of such intellectual property rights shall inure to our benefit.
      </li>
      <li>
        We and our affiliates make no warranties or representations about the content, including but not limited to its accuracy, reliability, completeness, timeliness or reliability. You agree that your use of the website and the content is at your own risk. We do not warrant that the website will operate error free or that the website, its server, or the contents are free of computer viruses or similar contamination or destructive features. The website and contents are provided on an "as is" and "as available" basis without any warranties of any kind including merchantability or fitness for particular purpose. We shall not be liable for any damage of whatsoever nature including but not limited to loss of data or loss of profit or business resulting from the use or inability to use the website or the contents therein or from any claims whether based on warranty, contract, tort or any other legal incidents even if we have been informed about the possibility of such damage.
      </li>

      <h5 className="mt-4 fw-bold">Indemnity</h5>
      <li>
        You agree to defend, indemnify, and hold us harmless from and against any claims, actions or demands, including, without limitation, reasonable legal and accounting fees, arising or resulting from your breach of this Agreement or your access to, use or misuse of the Content or Site. We shall provide notice to you of any such claim, suit, or proceeding. We reserve our right to assume the exclusive defense and control of any matter which is subject to indemnification under this section. In such cases, you agree to cooperate with any reasonable requests assisting us in defending such matters.
      </li>
      <li>
        We reserve our rights at our own discretion, to restrict, suspend, or terminate this Agreement and your access to all or any part of the Site or the Content at any time and for any reason without prior notice or liability. We reserve our rights to change, suspend, or discontinue all or any part of the website or the Content at any time without prior notice or liability to the buyers.
      </li>
      <li>
        Membership on our Website is free and we do not charge any fee for accessing, browsing and buying on our website. We, however reserve our rights to charge fee and change our policies from time to time. In particular, we may on our own discretion introduce new services and modify/amend some or all of the existing or future services offered on our website or fees if any; which may be charged for the same; without prior notice to buyers. Revision or Amendment in policies or in any clause of the agreement shall automatically become effective immediately once implemented on our website.
      </li>
      <li>
        You shall be solely responsible for compliance of all applicable laws including those in India, once you abide by or agree to the terms and conditions of this Agreement. You agree that, the contents uploaded or forming part of our website is not in violation of any laws for time being in force in India.
      </li>
      <li>
        You shall not attempt to gain unauthorized access to any portion or feature of our website, or any other systems or networks connected to our Website or to any our server, computer, network, or to any of the services offered on or through our Website, by hacking, password or any other illegitimate means.
      </li>
      <li>
        You shall not probe, scan or test the vulnerability of our website or any network connected to our website nor breach the security or authentication measures on our website or any network connected to our Website. You may not reverse look-up, trace or seek to trace any information on any other user of or visitor to our Website, or any other customer of ours, including any account not owned by you, to its source, or exploit our Website or any service or information made available or offered by or through our Website, in any way where the purpose is to reveal any information, including but not limited to personal identification or information, other than your own information, as provided for by our Website.
      </li>
      <li>
        You may not forge headers or otherwise manipulate identifiers in order to disguise the origin of any message or transmittal you send to our Website or any service offered on or through the Website. You may not pretend that you are, or that you represent, someone else, or impersonate any other individual or entity.
      </li>
      <li>
        You may not use the Website or any Content for any purpose that is unlawful or prohibited by these Terms of Use, or to solicit the performance of any illegal activity or other activity violates our rights in any manner whatsoever.
      </li>
      <li>
        From time to time, you shall be responsible for providing information relating to the items or services proposed to be bought by or sold to you. In this connection, you undertake that all such information shall be accurate in all respects. You shall not exaggerate or over emphasize the attributes of such items or services so as to mislead other Users in any manner.
      </li>
      <li>
        You shall not engage in solicitation for our products or services displayed on our website. You may not transmit any chain letters or unsolicited commercial or junk email to other users via our website. It shall be a violation of these Terms of Use to use any information obtained from our website in order to harass, abuse, or harm another person, or in order to contact, advertise to, solicit, or sell to another person outside of the Electronic Bazaar without our prior explicit written consent. In order to protect our users from such advertising or solicitation, we reserve our rights to restrict the number of messages or emails which a user may send to other users in a reasonable period which we deem appropriate in its sole discretion.
      </li>
    </div>
  )
},
    {
  title: "Privacy Policy",
  content: (
    <div>
      <p>
        We value the trust you have placed in Electronics Bazaar (EB) and its affiliates/service partners and therefore we believe in keeping the highest standards for maintaining privacy of secured transactions and customer information. We follow the below-mentioned practices for gathering information and dissemination of the same, which policy is subject to change at any time without notice and therefore, the customers must review this policy periodically in order to be aware of any changes. EB & its website www.electronicsbazaar.com ("Website") are committed to provide the privacy and follow all the essential steps to safeguard the sensitive personal data or information of user/customer shared by him during the registration/transaction with us. This is in compliance with the prevailing Information Technology Act, 2000 (hereinafter referred as the "IT Act") and the Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011 made under the said Act.
      </p>

      <h5 className="mt-4 fw-bold">Applicability of the Privacy Policy</h5>
      <p>
        This Privacy Policy applies to www.electronicsbazaar.com and its employees staff and team members who collect, possess, use, process, record, store, transfer, disclose, deal, handle and receive, sensitive personal data or information of users/customers. Personal Data or Information we collect about you, purpose of collection, storage and usage of such data or information, to whom such data or information may be disclosed / transferred and how we protect your privacy.
      </p>

      <h5 className="mt-4 fw-bold">Collection of Personally Identifiable and Demographic Information</h5>
      <p>We collect personally identifiable and demographic information when you:</p>
      <ul>
        <li>Create an account with EB or in the process of registration or during the course of any transaction or you place an order for purchase of the products to EB or on its website. You can browse some sections of our website without being a registered member but certain activities like placing an order do require registration, which requires the said Personal information.</li>
        <li>Use of our services including our website of Electronics Bazaar.</li>
        <li>Request for quotes, support, information or access to our information including information related to products and services.</li>
        <li>Download content, software or a software update from our website;</li>
        <li>Subscribe to newsletters, promotional emails, alerts, updates or other materials etc.</li>
        <li>Register yourself for any contest, seminars, webinars or other contents or offers.</li>
        <li>Fill in the details for "Contact us" segment.</li>
      </ul>
      <p>
        "Personally Identifiable and Demographic Information" includes but not limited to; your full name including your First and Last name, password stored in an encrypted format, email addresses, mobile phone numbers and contact details, photographs, bank account, your home address, correspondence/communication address, ZIP/Postal code, demographic data like your age, gender, occupation, date of birth, education, address, your interest and preferences and opinions about our products/services or website, number of times you have visited/accessed to our website or any page of the website, items/products bought by you, loyalty points, notifications etc.
      </p>

      <h5 className="mt-4 fw-bold">Reasonable Use of the collected Data/Information</h5>
      <ul>
        <li>
          We may use your personal or demographic data to send various offers to you based on your previous orders and your interests or to provide the services you request. We shall however provide you an option to opt-out; in a manner more particularly mentioned in clause 10 of this policy; to the extent we use your personal information to provide marketing services to you.
        </li>
        <li>
          We may use your personal information to resolve disputes; troubleshoot problems; to help in promoting a safe service; collect dues owed; to measure consumer interest in our products and services, to inform you about online and offline offers, products, services, and updates; to customize your experience; to detect and protect us against error, fraud and other criminal activity; to enforce our terms and conditions; and as otherwise described to you at the time of collection.
        </li>
        <li>
          In our efforts to continuously improve our product and service offerings, we collect, analyze and update personal and profile data of our customers or users.
        </li>
        <li>
          In case of online transactions, we identify and use your IP address to help diagnose problems with our server and to manage our website. Your IP address is also used to help identify you and to gather broad demographic information.
        </li>
        <li>
          We will occasionally ask you to complete optional online or off-line surveys. These surveys may ask you for contact information and demographic information. We use this data to tailor your experience at our website or to improve our services to our customers or to provide you with the content of your interest or preferences.
        </li>
        <li>
          We do not capture financial information such as credit card/debit card detail during the course of transactions with EB.
        </li>
      </ul>

      <h5 className="mt-4 fw-bold">Purpose of collection of Information/Data</h5>
      <p>We may collect your personal identifiable/demographic data for:</p>
      <ul>
        <li>Business activities like processing of your order, fulfilling your transaction requests and delivery of goods, information and services requested by you or other services related inquiries.</li>
        <li>Managing Contact details of Clients or to update the profiles including administering and developing our business relationship with you or for providing information regarding products or services that you request from us or which accordingly to use may be of your interest.</li>
      </ul>

      <h5 className="mt-4 fw-bold">Cookies</h5>
      <ul>
        <li>
          In addition to Sensitive Personal Data, we may use technology or devices to store data collection such as "cookies" to get information when your web browser accesses our website. A "cookie" is a small piece of information stored by a Web server on a Web browser so it can be later read back from that browser. Cookies are useful for enabling the browser to remember information specific to a given user. Our website places both permanent and temporary cookies in your computer's hard drive. Our Website cookies do not contain any of your personally identifiable information.
        </li>
        <li>
          By tracking the cookies we can keep track of products and to collect data that we may be used to enhance our website and for marketing and promotional purposes.
        </li>
      </ul>

      <h5 className="mt-4 fw-bold">Disclosure of transfer or sharing your Sensitive Personal Data</h5>
      <p>We will disclose or transfer your Personal or Demographic Data or Information in accordance with this Policy and as per the applicable legal requirements. Your Personal/Demographic Data or Information will be disclosed or transferred, as may be required from time to time, as follows:</p>
      <ul>
        <li>
          <strong>Internal:</strong> (i) to/between/amongst Employees or team of Electronics Bazaar responsible to process the data for business purpose.
        </li>
        <li>
          <strong>To a Third Party:</strong> including our affiliates/service partners/logistics partners/Call centers working closely with or for or on behalf of or hired by us for improvement or enhancement or development or expansion of our business which includes but not limited to making welcome calls to customers or obtaining opinions from customers about our services or reviewing performance etc. We may process your personally identifiable or demographic data to such a Third party in a lawful, safe and responsible manner with all appropriate security and confidentiality.
        </li>
        <li>
          <strong>For Legal Requirements:</strong> including but not limited to government agencies, entities or as may be required under law and/or statutory authorities, Reserve Bank of India and Credit Information Bureau India Ltd ("CIBIL") or in response to legal/Court proceedings, for the purpose of verification of identity, or for prevention, detection, investigation including cyber incidents, prosecution.
        </li>
      </ul>

      <h5 className="mt-4 fw-bold">Sharing of Personal/Demographic information</h5>
      <p>We do not share, rent, sell or distribute your personal/demographic information and we will not disclose any of your personally identifiable information to third parties unless we have your permission or consent to provide products or services you have requested, which is subject to the following exceptions:</p>
      <ul>
        <li>We shall share personal/demographic information with our other Corporate entities, affiliates/associates and service partners to help detect and prevent identity theft, fraud, and other potentially illegal acts; correlate related or multiple accounts to prevent abuse of our commercial activities or business transactions.</li>
        <li>We shall disclose personal/demographic information; if required to do so by law or in the good-faith belief that such disclosure is reasonably necessary to respond to writs, summons, court orders, or other legal process. We may disclose personal information to law enforcement offices, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to: enforce our Terms or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public.</li>
        <li>We, EB and its affiliates/associates/service partners, shall share some or all of your personal/demographic information with another business entity, if we plan to merge with, or be acquired by that business entity, including our assets. The other business entity (or the new emerged/amalgamated entity) will be required to follow this privacy policy with respect to your personal/demographic information.</li>
      </ul>

      <h5 className="mt-4 fw-bold">Links to Other Sites</h5>
      <p>
        Our site is linked with other websites that may collect personally identifiable information about you. We (including our affiliates/associates and our website) are not responsible for the privacy practices or content on linked websites.
      </p>

      <h5 className="mt-4 fw-bold">Security Practice, Storage of Sensitive Personal Data</h5>
      <ul>
        <li>
          We, including our affiliates/associates/service partners & our website have stringent security measures in place to protect your personal/demographic data or the loss, misuse and alteration of the same information under our control. Whenever you change or access your account information, we offer the use of a secure server. Once your information comes under our possession, we adhere to the strict security guidelines to protect it against unauthorized access.
        </li>
        <li>
          We ensure to follow the required compliance under the IT Act to protect and preservation of privacy of Personal/Demographic Data. Our team/ employees/ third Party involved in the storage, access and process; follow all the security measures to protect the said sensitive Data. We have undertaken reasonable security measures to protect your Sensitive Data against unauthorized access, alteration, disclosure or destruction. It is managed by physical, electronic, and procedural safeguards/measures in place to protect the confidentiality, security, and integrity of Your Sensitive Data or Information. We including our team/employees of Electronics Bazaar or third party have limited access to your Sensitive Personal/Demographic Data. EB will initiate strict and disciplinary action in case of failure to meet these obligations.
        </li>
        <li>
          To further ensure enforcement of this Policy, the standard or code of best practices may be audited from time to time or as & when required or at least once a year or when we undertake significant up gradation of our process and computer resources and take such corrective action as per audit result; in order to comply with this Policy and provisions of the IT Act.
        </li>
        <li>
          We ensure that Sensitive Personal Data is not stored; if it is not in use or until there is a legal obligation to do so under law. It is our practice to destroy Sensitive Personal Data as soon as possible after it is no longer necessary for the purpose for which it was collected or used.
        </li>
        <li>
          You can contact and complain in case of any discrepancies or grievances with regard to the processing of your sensitive personal data or information, please contact at 1800-266-0786 or write us at support@electronicsbazaar.com. Further, on receipt of any concerns or complaints, the Grievance Officer will employ all commercially reasonable efforts to address the same within one (1) month of receipt of the same.
        </li>
        <li>
          We will ensure that the terms and clauses of this Policy are observed and employees of "Electronics Bazaar" or any third party involved on behalf of EB and/or who have access to Sensitive Personal/Demographic Data or Information are required to comply with this Privacy Policy. If "Electronics Bazaar" finds that any team member or employee, staff or third party or member of third party is not complying with these instructions or has violated this Policy or any other policies will be subject to disciplinary action, up to and including termination of employment including penalties under applicable laws. It/he/she may be liable under civil or criminal law in force, or EB will promptly take appropriate action(s) against such non-compliance or implement necessary sanctions to make sure that associated third parties must follow all the process to secure all sensitive data as per instruction.
        </li>
      </ul>

      <h5 className="mt-4 fw-bold">Choice to Opt-Out or Corrections</h5>
      <ul>
        <li>
          We, including our affiliates/associates/service partners & our website provide all users an opportunity to opt-out from receiving non-essential (promotional, marketing-related) communications from us or on behalf of our partners, and from us in general, after creating a contact or an account. If you want to remove your contact information from our database or our lists and newsletters etc., then please contact us for the same through e-mail.
        </li>
        <li>
          We also allow our customers to correct or update any information provided by you and saved in our database by using the 'EDIT' option logging into their own Account by themselves or by sending a communication via e-mail at our e-mail address or by contacting on the numbers as mentioned on our website.
        </li>
        <li>
          Any information provided by you will be considered as correct and complete in all respect. You may change your data directly on website by logging in your account or can send us written request to review the Sensitive Personal Data or Information provided by you or any amendments/changes thereof. We are not responsible for any inaccurate or deficient data fed by you. We however, correct or amend the same as may be feasible upon receipt of the written request from you indicating the said amendment/changes.
        </li>
        <li>
          You agree that we are not responsible for the accuracy and authenticity of such data or information provided to us by you and you agree to indemnify 'Electronics Bazaar' for all losses incurred by Electronicsbazaar due to any false, distorted, manipulated, defamatory, vulgar, obscene, fraudulent or misleading facts made by you to Electronicsbazaar.
        </li>
      </ul>

      <h5 className="mt-4 fw-bold">Advertisements on EB Website</h5>
      <p>
        Third-party advertising companies may use our website to display advertisements when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about their goods and services of interest to you. However, we including our affiliates/associates/service partners & our website do not warrant nor are responsible for any representations made by such a third party in any manner.
      </p>

      <h5 className="mt-4 fw-bold">Policy Updates</h5>
      <p>
        We reserve our right to change, alter, amend, modify, add or update this policy at any time without prior notification. The policy will be published on the website with such changes with immediate effect. A policy with the changes will supersede the last policy from that effective date of implementation & such changes will be effective immediately upon posting the same on our website. You can offer your views, suggestions if any, by submitting your feedback to our e-mail address.
      </p>
      <p>
        In case of any ambiguity, the definitions established under the IT Act shall apply.
      </p>
    </div>
  )
},
    {
  title: "Disclaimer",
  content: (
    <div>
      <li>
        The information contained on our website is for general information purposes only. We always endeavor to keep the information updated and correct and we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information related to products, services or related graphics contained on the website for any purpose. Any reliance placed by you on such information is therefore strictly at your own risk. We shall not be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any other loss or damage of whatsoever nature arising from loss of data or profits arise out of or in connection with the use of this website.
      </li>
      <li>
        This website contains links to third party websites which are not under our control. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorsing the views expressed within them. Every effort is made to keep the website updated and running smoothly. However, we take no responsibility for and will not be liable for the website being temporarily unavailable due to technical issues beyond our control.
      </li>
      <li>
        We being a Seller ensure that and claims that the listed items do not infringe upon the intellectual property rights including copyright, trademark or brand, design or patent, trade secret or other proprietary rights or rights of publicity or privacy rights of third parties or any other person or entity or organization. All listed items are kept in stock for successful fulfillment of sales being refurbished/repaired/Unboxed and Refurbished products. The listing descriptions of the item are not misleading and describe the actual condition of the product. If the item description does not match the actual condition of the item, the seller agrees to refund any amounts that they may have received from the buyer.
      </li>
    </div>
  )
}
  ];

  const handleNext = () => {
    if (activeStep < sections.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const progressPercentage = ((activeStep + 1) / sections.length) * 100;

  return (
    <Container className="terms-container py-4">
      <div className="terms-breadcrumbs">POLICIES</div>
      <h3 className="terms-page-title">
        Terms & Conditions: Your Guide to Electronics Bazaar Policies
      </h3>

      <div className="mb-4">
        <ProgressBar now={progressPercentage} className="mb-3" style={{ height: '6px' }} />
        
        <div className="d-flex justify-content-between mb-3">
          {sections.map((section, index) => (
            <div 
              key={index}
              className={`step-indicator ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
              onClick={() => setActiveStep(index)}
            >
              <div className="step-circle">
                {index < activeStep ? <FaCheck /> : index + 1}
              </div>
              <div className="step-label">{section.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="terms-box mb-4">
        <div className="terms-header">{sections[activeStep].title}</div>
        <div className="terms-body">
          {sections[activeStep].content}
        </div>
      </div>

      <Row className="justify-content-between mt-4">
        <Col xs={6} md={3}>
          {activeStep > 0 && (
            <Button 
              variant="outline-primary" 
              onClick={handlePrev}
              className="w-100"
            >
              <FaArrowLeft className="me-2" /> Previous
            </Button>
          )}
        </Col>
        <Col xs={6} md={3} className="text-end">
          {activeStep < sections.length - 1 ? (
            <Button 
              variant="primary" 
              onClick={handleNext}
              className="w-100"
            >
              Next <FaArrowRight className="ms-2" />
            </Button>
          ) : (
            <Button 
              variant="success" 
              onClick={() => console.log('Completed')}
              className="w-100"
            >
              I Agree
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TermsConditions;