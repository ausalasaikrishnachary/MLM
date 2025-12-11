import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CircularProgress, Box, IconButton, LinearProgress, Typography } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useNavigate } from 'react-router-dom';
import ShirajLogo from "../src/Components/Images/logo1.png"
import './App.css';

// Lazy load components
const AdminDashboard = lazy(() => import("./Components/Panel/Admin/Dashboard/Dashboard"));
const AdminAsset = lazy(() => import("./Components/Panel/Admin/Asset/Asset"));
const InvestorDashboard = lazy(() => import("./Components/Panel/Investor/Dashboard/Dashboard"));
const InvestorAsset = lazy(() => import("./Components/Panel/Investor/Asset/Asset"));
const PartnerDashboard = lazy(() => import("./Components/Panel/Partner/Dashboard/Dashboard"));
const PartnerAsset = lazy(() => import("./Components/Panel/Partner/Asset/Asset"));
const Navbar = lazy(() => import("./Components/Shared/Navbar/Navbar"));
const InvestorHeader = lazy(() => import("./Components/Shared/Investor/InvestorNavbar"));
const PartnerHeader = lazy(() => import("./Components/Shared/Partner/PartnerNavbar"));
const Home = lazy(() => import("./Components/Website/Pages/Home/Home"));
const Login = lazy(() => import("./Components/Login/Login"));

// Lazy load other components as needed...
const BuyShares = lazy(() => import("./Components/Panel/Investor/Transactions/BuyShares"));
const SellShares = lazy(() => import("./Components/Panel/Investor/Transactions/SellShares"));
const Report = lazy(() => import("./Components/Panel/Partner/Report/Report"));
const AssetForm = lazy(() => import("./Components/Panel/Partner/Asset/AssetForm"));
const Tmanagement = lazy(() => import("./Components/Panel/Admin/Investors/Investormanagement"));
const Tmoniter = lazy(() => import("./Components/Panel/Admin/Transactions/TransactionMoniter"));
const Transaction = lazy(() => import("./Components/Panel/Partner/Transaction/Transaction"));
const InvestmentPage = lazy(() => import("./Components/Panel/Investor/Asset/InvestmentPage"));
const PartnersDashboard = lazy(() => import("./Components/Panel/Admin/Partners/Partners"));
const AssetDashboard = lazy(() => import("./Components/Panel/Partner/Asset/Asset"));
const InvestorProfile = lazy(() => import("./Components/Panel/Investor/Profile/Profile"));
const Kyc = lazy(() => import("./Components/Panel/Investor/Profile/Kyc"));
const PartnerProfile = lazy(() => import("./Components/Panel/Partner/Profile/Profile"));
const PartnerKyc = lazy(() => import("./Components/Panel/Partner/Profile/Kyc"));
const AdminProfile = lazy(() => import("./Components/Panel/Admin/Profile/Profile"));
const AdminKyc = lazy(() => import("./Components/Panel/Admin/Profile/Kyc"));
const AddLead = lazy(() => import("./Components/Panel/Admin/Investors/AddLead"));
const Leads = lazy(() => import("./Components/Panel/Partner/MyLeads/Leads"));
const PAddLead = lazy(() => import("./Components/Panel/Partner/MyLeads/AddLead"));
const Referral = lazy(() => import("./Components/Panel/Admin/Referral/Referral"));
const PartnerReferral = lazy(() => import("./Components/Panel/Partner/Referral/Referral"));
const AdminAssetForm = lazy(() => import("./Components/Panel/Admin/Asset/AssetForm"));
const Services = lazy(() => import("./Components/Panel/Investor/Servies/Servies"));
const Subscription = lazy(() => import("./Components/Panel/Admin/Subscription/Subscription"));
const AddSubscription = lazy(() => import("./Components/Panel/Admin/Subscription/AddSubscription"));
const Plans = lazy(() => import("./Components/Panel/Investor/Plans/Plans"));
const Newkyc = lazy(() => import("./Components/Panel/Investor/Profile/Newkyc"));
const SignUp = lazy(() => import("./Components/Login/SignUp"));
const AddPropertyForm = lazy(() => import("./Components/Panel/Investor/Asset/AddPropertyForm"));
const MyAssets = lazy(() => import("./Components/Panel/Investor/Asset/MyAssets"));
const PartnerPlans = lazy(() => import("./Components/Panel/Partner/Plans/Plans"));
const PropertyDetails = lazy(() => import("./Components/Panel/Investor/Asset/AssetDetails"));
const AssetDetails = lazy(() => import("./Components/Panel/Admin/Asset/AssetDetails"));
const AssetDetail = lazy(() => import("./Components/Panel/Partner/Asset/AssetDetails"));
const PartnerMyAssets = lazy(() => import("./Components/Panel/Partner/Asset/MyAssets"));
const ViewAssetDetails = lazy(() => import("./Components/Panel/Partner/Asset/ViewAssetDetails"));
const MyTeam = lazy(() => import("./Components/Panel/Partner/MyTeam/MyTeam"));
const LatestAssets = lazy(() => import("./Components/Panel/Partner/Asset/LatestAssets"));
const MyAgents = lazy(() => import("./Components/Panel/Partner/MyTeam/MyAgents/MyAgents"));
const ActiveUserView = lazy(() => import("./Components/Panel/Partner/MyTeam/MyAgents/ViewAgents"));
const EditAsset = lazy(() => import("./Components/Panel/Admin/Asset/EditAsset"));
const EditMyAsset = lazy(() => import("./Components/Panel/Investor/Asset/EditMyAsset"));
const BookingAssets = lazy(() => import("./Components/Panel/Partner/Asset/BookingAssets"));
const PaymentForm = lazy(() => import("./Components/Panel/Partner/Transaction/PaymentForm"));
const TransactionList = lazy(() => import("./Components/Panel/Partner/Transaction/TransactionDetails"));
const EditSubscription = lazy(() => import("./Components/Panel/Admin/Subscription/EditSubscription"));
const View_Tmanagement = lazy(() => import("./../src/Components/Panel/Admin/Investors/View_Tmanagement"));
const Edit_Tmanagement = lazy(() => import("./Components/Panel/Admin/Investors/Edit_Tmanagement"));
const Commission = lazy(() => import("./Components/Panel/Admin/Commission/Commission"));
const CommissionByUser = lazy(() => import("./Components/Panel/Admin/Commission/CommissionByUserid"));
const PayCommissionForm = lazy(() => import("./Components/Panel/Admin/Commission/PayCommissionForm"));
const PartnerCommission = lazy(() => import("./Components/Panel/Partner/PartnerCommission/PartnerCommission"));
const EditMyAssets = lazy(() => import("./Components/Panel/Partner/Asset/EditMyAssets"));
const I_EditMyAsset = lazy(() => import("./Components/Panel/Investor/Asset/EditMyAsset"));
const I_MyAssests = lazy(() => import("./Components/Panel/Investor/Asset/New-AssetsDetails"));
const CommissionView = lazy(() => import("./Components/Panel/Admin/Transactions/CommissionView"));
const BookingSlab = lazy(() => import("./Components/Panel/Admin/BookingSlab/BookingSlab"));
const AddBookingSlab = lazy(() => import("./Components/Panel/Admin/BookingSlab/AddBookingSlab"));
const EditBookingSlab = lazy(() => import("./Components/Panel/Admin/BookingSlab/EditBookingSlab"));
const Team = lazy(() => import("./Components/Panel/Partner/MyTeam/Team"));
const ViewTeamDetails = lazy(() => import("./Components/Panel/Partner/MyTeam/ViewTeamDetails"));
const Meetings = lazy(() => import("./Components/Panel/Partner/Meetings/Meetings"));
const MeetingRequestForm = lazy(() => import("./Components/Panel/Partner/Meetings/MeetingRequestForm"));
const MeetingRequests = lazy(() => import("./Components/Panel/Admin/Meetings/MeetingRequests"));
const SheduleMeeting = lazy(() => import("./Components/Panel/Admin/Meetings/SheduleMeeting"));
const PendingAssets = lazy(() => import("./Components/Panel/Admin/Asset/PendingAssets"));
const BookedAssets = lazy(() => import("./Components/Panel/Admin/Asset/BookedAssets"));
const AvailableAssets = lazy(() => import("./Components/Panel/Admin/Asset/AvailableAssets"));
const RejectedAssets = lazy(() => import("./Components/Panel/Admin/Asset/RejectedAssets"));
const SoldAssets = lazy(() => import("./Components/Panel/Admin/Asset/SoldAssets"));
const ApprovedAssets = lazy(() => import("./Components/Panel/Admin/Asset/ApprovedAssets"));
const PartnerBookedAssets = lazy(() => import("./Components/Panel/Partner/Asset/PartnerBookedAssets"));
const PartnerPurchasedAssets = lazy(() => import("./Components/Panel/Partner/Asset/PartnerPurchasedAssets"));
const SoldProperties = lazy(() => import("./Components/Panel/Partner/Asset/SoldProperties"));
const ListingProperties = lazy(() => import("./Components/Panel/Partner/Asset/ListingProperties"));
const LatestProperties = lazy(() => import("./Components/Panel/Partner/Asset/LatestProperties"));
const ActiveAgents = lazy(() => import("./Components/Panel/Admin/Agents/ActiveAgents"));
const InactiveAgents = lazy(() => import("./Components/Panel/Admin/Agents/InactiveAgents"));
const NewProperties = lazy(() => import("./Components/Panel/Admin/Asset/NewProperties"));
const Transactions = lazy(() => import("./Components/Panel/Investor/Transactions/Transactions"));
const Tdetails = lazy(() => import("./Components/Panel/Investor/Transactions/T_Details"));
const Payment = lazy(() => import("./Components/Panel/Investor/Transactions/Payment"));
const Termsandconditions = lazy(() => import("./Components/Legal/Termsandconditions"));
const Privacypolicy = lazy(() => import("./Components/Legal/Privacypolicy"));
const Refundpolicy = lazy(() => import("./Components/Legal/Refundpolicy"));
const I_ListingProperties = lazy(() => import("./Components/Panel/Investor/Asset/ListingProperties"));
const I_LatestProperties = lazy(() => import("./Components/Panel/Investor/Asset/LatestProperties"));
const I_BookedAssets = lazy(() => import("./Components/Panel/Investor/Asset/BookedAssets"));
const I_PurchasedAssets = lazy(() => import("./Components/Panel/Investor/Asset/PurchasedAssets"));
const I_SoldProperties = lazy(() => import("./Components/Panel/Investor/Asset/SoldProperties"));
const LegalNavbar = lazy(() => import("./Components/Shared/LegalNavbar"));
const I_BookingAssets = lazy(() => import("./Components/Panel/Investor/Asset/BookingAssets"));
const EditProfile = lazy(() => import("./Components/Panel/Partner/Profile/EditProfile"));
const ClientEditProfile = lazy(() => import("./Components/Panel/Investor/Profile/ClientEditProfile"));
const LandingPage = lazy(() => import("./Components/Website/Pages/Landingpage"));
const Aboutus = lazy(() => import("./Components/Website/Pages/Aboutus/Aboutus"));
const FAQAccordion = lazy(() => import("./Components/Website/Pages/FAQs/Faqs"));
const Contact = lazy(() => import("./Components/Website/Pages/Contactus/Contactus"));
const Properties = lazy(() => import("./Components/Website/Pages/Properties/Properties"));
const Header = lazy(() => import("./Components/Website/Shared/Navbar/Navbar"));
const Footer = lazy(() => import("./Components/Website/Shared/Footer/Footer"));
const PropertyDetail = lazy(() => import("./Components/Website/Pages/Properties/ViewPropertiesDetails"));
const Popup = lazy(() => import("./Components/Popup/Popup"));
const FilteredProperties = lazy(() => import("./Components/Website/Pages/Home/FilteredProperties"));
const PaymentCallback = lazy(() => import("./Components/Panel/Partner/Plans/PaymentCallback"));
const LeadsTable = lazy(() => import("./Components/Panel/Admin/Leads/LeadsTable"));
const AddCarousel = lazy(() => import("./Components/Panel/Admin/Carousel/CarouselForm"));
const ViewPropertiesDetails = lazy(() => import("./Components/Website/Pages/Properties/ViewPropertiesDetails"));
const CarouselList = lazy(() => import("./Components/Panel/Admin/Carousel/CarouselTable"));
const TrainingMaterial = lazy(() => import("./Components/Panel/Admin/TrainingMaterial/TrainingMaterial"));
const AddTrainingMaterial = lazy(() => import("./Components/Panel/Admin/TrainingMaterial/AddTrainingMaterial"));
const TrainingVideos = lazy(() => import("./Components/Panel/Partner/TraningVideos/TraningVideos"));
const TransactionSummary = lazy(() => import("./Components/Panel/Admin/TransactionSummary/TransactionSummary"));
const TermsConditions = lazy(() => import("./Components/Legal/TermsConditions"));
const I_Meetings = lazy(() => import("./Components/Panel/Investor/Meetings/Meetings"));
const I_MeetingRequestForm = lazy(() => import("./Components/Panel/Investor/Meetings/MeetingRequestForm"));
const AdminMeetings = lazy(() => import("./Components/Panel/Admin/AdminMeetings/AdminMeetings"));
const TableAdminMeetings = lazy(() => import("./Components/Panel/Admin/AdminMeetings/TableAdminMeetings"));
const CommissionLevels = lazy(() => import("./Components/Panel/Admin/CommissionLevels/CommissionLevels"));
const AddCommissionLevels = lazy(() => import("./Components/Panel/Admin/CommissionLevels/AddCommissionLevels"));
const EditCommissionLevels = lazy(() => import("./Components/Panel/Admin/CommissionLevels/EditCommissionLevels"));
const Category = lazy(() => import("./Components/Panel/Admin/Category/Category"));
const AdminEdit = lazy(() => import("./Components/Panel/Admin/SiteVisits/AdminEdit"));
const Subcrptionplan = lazy(() => import("./Components/Panel/Partner/Plans/Subcrptionplan"));
const SearchBox = lazy(() => import("./Components/Website/Pages/Home/SearchBox"));
const AddBusiness = lazy(() => import("./Components/Panel/Partner/Business/AddBusiness"));
const ViewBusiness = lazy(() => import("./Components/Panel/Partner/Business/ViewBusiness"));
const AdminBussiness = lazy(() => import("./Components/Panel/Admin/AdminBussiness/AdminBussiness"));
const EditBusiness = lazy(() => import("./Components/Panel/Partner/Business/EditBusiness"));
const Comparelist = lazy(() => import("./Components/Panel/Partner/Asset/Comparelist"));
const BirthdayPopup = lazy(() => import("./Components/Panel/BirthdayPopup/BirthdayPopup"));
const UpVdHowitworks = lazy(() => import("./Components/Panel/Admin/UpVdHowitworks/UpVdHowitworks"));
const AddVideo = lazy(() => import("./Components/Panel/Admin/UpVdHowitworks/AddVideo"));
const EditVideo = lazy(() => import("./Components/Panel/Admin/UpVdHowitworks/EditVideo"));
const Business = lazy(() => import("./Components/Website/Pages/Business/Business"));
const AddInvestorBusiness = lazy(() => import("./Components/Panel/Investor/InvestorBusiness/AddInvestorBusiness"));
const InvestorBusiness = lazy(() => import("./Components/Panel/Investor/InvestorBusiness/InvestorBusiness"));
const EditInvestorBusiness = lazy(() => import("./Components/Panel/Investor/InvestorBusiness/EditInvestorBusiness"));
const AllBusinesses = lazy(() => import("./Components/Panel/Partner/Business/AllBusinesses"));
const AdminBussinessEdit = lazy(() => import("./Components/Panel/Admin/AdminBussiness/AdminBussinessEdit"));
const Wishlist = lazy(() => import("./Components/Panel/Partner/Asset/Wishlist "));
const AddProduct = lazy(() => import("./Components/Panel/Partner/Business/AddProduct"));
const BusinessProducts = lazy(() => import("./Components/Panel/Partner/Business/BusinessProducts"));
const AdminBussinessProducts = lazy(() => import("./Components/Panel/Admin/AdminBussiness/AdminBussinessProducts"));
const EditBussinessProducts = lazy(() => import("./Components/Panel/Admin/AdminBussiness/EditBussinessProducts"));
const Chatbot = lazy(() => import("./Components/Panel/Admin/Chatbot/Chatbot"));
const CreateQA = lazy(() => import("./Components/Panel/Admin/Chatbot/CreateQA"));
const ChatbotPopup = lazy(() => import("./Components/Website/Shared/ChatbotPopup/ChatbotPopup"));
const InvestorBusinessproducts = lazy(() => import("./Components/Panel/Investor/InvestorBusiness/InvestorBusinessproducts"));
const Sitevisit = lazy(() => import("./Components/Panel/Partner/Sitevisit/Sitevisit"));
const AddSitevisit = lazy(() => import("./Components/Panel/Partner/AddSitevisit/AddSitevisit"));
const EditSitevisit = lazy(() => import("./Components/Panel/Partner/AddSitevisit/EditSitevisit"));
const EditQA = lazy(() => import("./Components/Panel/Admin/Chatbot/EditQA"));
const SiteVisits = lazy(() => import("./Components/Panel/Admin/SiteVisits/SiteVisits"));
const EditTrainingMaterial = lazy(() => import("./Components/Panel/Admin/TrainingMaterial/EditTrainingMaterial"));
const VerifyOtp = lazy(() => import("./Components/Login/VerifyOtp"));
const InvestorWishlist = lazy(() => import("./Components/Panel/Investor/InvestorWishlist"));
const AdminReportsPage = lazy(() => import("./Components/Panel/Admin/Reports/AdminReportsPage"));
const InvestorReportsPage = lazy(() => import("./Components/Panel/Investor/Reports/InvestorReportPage"));
const TableCategory = lazy(() => import("./Components/Panel/Admin/Category/TableCategory"));
const EditCategory = lazy(() => import("./Components/Panel/Admin/Category/EditCategory"));
const PropertyCategoryform = lazy(() => import("./Components/Panel/Admin/Category/PropertyCategoryform"));
const ProductDetails = lazy(() => import("./Components/Panel/Partner/Business/ProductDetails"));
const I_ProductDetails = lazy(() => import("./Components/Panel/Investor/InvestorBusiness/I-ProductDetails"));
const WebBusinessProducts = lazy(() => import("./Components/Website/Pages/Business/WebBusinessProducts"));
const WebProductDetails = lazy(() => import("./Components/Website/Pages/Business/WebProductDetails"));
const Departments = lazy(() => import("./Components/Panel/Admin/Departments/Departments"));
const AddDepartments = lazy(() => import("./Components/Panel/Admin/Departments/AddDepartments"));
const PartnerLandingPage = lazy(() => import("./Components/Panel/Partner/PartnerLandingPage/PartnerLandingPage"));
const InvestorLandingPage = lazy(() => import("./Components/Panel/Investor/InvestorLandingPage/InvestorLandingPage"));
const AdminLandingPage = lazy(() => import("./Components/Panel/Admin/AdminLandingPage/AdminLandingPage"));
const UiProps = lazy(() => import("./Components/Ui/UiProps"));
const SettingsMain = lazy(() => import('./Components/Panel/Admin/Settings/SettingsMain'));
const AddReferralPrefix = lazy(() => import('./Components/Panel/Admin/Settings/AddReferralPrefix'));
const EditReferralPrefix = lazy(() => import('./Components/Panel/Admin/Settings/EditReferralPrefix'));
const HowToUse = lazy(() => import("./Components/Website/Pages/HowToUse/HowToUse"));
const OfferTable = lazy(() => import("./Components/Panel/Admin/Offers/OffersTable"));
const AddOffer = lazy(() => import("./Components/Panel/Admin/Offers/AddOffersForm"));



// Loader Component
const Loader = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#ffffff',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
    }}
  >
    {/* Shiraj Logo - REPLACE src WITH YOUR ACTUAL LOGO PATH */}
    <Box
      component="img"
      src= {ShirajLogo} // 👈 CHANGE THIS TO YOUR LOGO PATH
      alt="Shiraj Logo"
      sx={{
        width: '220px',
        height: 'auto',
        marginBottom: 4,
        animation: 'fadeInScale 0.6s ease-out',
        '@keyframes fadeInScale': {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      }}
      onError={(e) => {
        // Fallback if logo doesn't load
        e.target.style.display = 'none';
      }}
    />
    
    <CircularProgress 
      size={60} 
      thickness={4} 
      sx={{ 
        color: '#2E166D', 
        mb: 3,
      }} 
    />
    
    <LinearProgress 
      sx={{ 
        width: '280px', 
        height: '6px', 
        borderRadius: '3px',
        backgroundColor: '#e0e0e0',
        '& .MuiLinearProgress-bar': {
          backgroundColor: '#2E166D',
        }
      }} 
    />
    
    <Typography 
      variant="body1" 
      sx={{ 
        mt: 2, 
        color: '#666',
        fontWeight: 500,
        fontSize: '16px',
        animation: 'pulse 1.5s ease-in-out infinite',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
      }}
    >
      Loading your experience...
    </Typography>
  </Box>
);

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Define paths where Header and Footer should be visible
  const publicPaths = ["/", "/aboutus", "/FAQ", "/contactus", "/how-to-use", "/properties", "/propertydetails", "/termsandconditions", "/privacypolicy", "/refundpolicy", "/filteredproperties", "/viewpropertiesdetails/:id", "/business", "/web-businessproducts/:id", "/web-product-details/:id"];
  const footerPaths = ["/", "/aboutus", "/FAQ", "/contactus", "/how-to-use", "/properties", "/termsandconditions", "/privacypolicy", "/refundpolicy", "/filteredproperties", "/viewpropertiesdetails/:id", "/business"];

  // Trigger popup after 60 seconds on public pages
  useEffect(() => {
    let timeoutId;

    if (publicPaths.includes(location.pathname)) {
      timeoutId = setTimeout(() => {
        setShowPopup(true);
      }, 60000); // 60 seconds
    }

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <>
      <Suspense fallback={<LinearProgress />}>
        {publicPaths.some(path => {
          if (path.includes(":id")) {
            const base = path.split("/:")[0];
            return location.pathname.startsWith(base);
          }
          return location.pathname === path;
        }) && <Header />}
      </Suspense>

      <div className="main-container">
        <Suspense fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </Box>
        }>
          <Routes>
            {/* UI Improvement */}
            <Route path="/uiprops" element={<UiProps />} />

            <Route path="/" element={<Home />} />
            <Route path="/popup" element={<Popup />} />
            <Route path="/birthdaypopup" element={<BirthdayPopup />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/FAQ" element={<FAQAccordion />} />
            <Route path="/contactus" element={<Contact />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/propertydetails" element={<PropertyDetail />} />
            <Route path="/viewpropertiesdetails/:id" element={<ViewPropertiesDetails />} />
            <Route path="/business" element={<Business />} />
            <Route path="/web-businessproducts/:id" element={<WebBusinessProducts />} />
            <Route path="/how-to-use" element={<HowToUse />} />

            <Route path="/a-trainingmaterial" element={<TrainingMaterial />} />
            <Route path="/a-upvdhowitworks" element={<UpVdHowitworks />} />
            <Route path="/a-editvideo/:id" element={<EditVideo />} />
            <Route path="/a-addvideo" element={<AddVideo />} />
            <Route path="/a-addtrainingmaterial" element={<AddTrainingMaterial />} />
            <Route path="/a-edittrainingmaterial" element={<EditTrainingMaterial />} />
            <Route path="/a-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-meetings" element={<AdminMeetings />} />
            <Route path="/tableadminmeetings" element={<TableAdminMeetings />} />
            <Route path="/a-asset" element={<AdminAsset />} />
            <Route path="/a-investormanagement" element={<Tmanagement />} />
            <Route path="/a-popup-leads" element={<LeadsTable />} />
            <Route path="/a-carousel" element={<AddCarousel />} />
            <Route path="/a-table-carousel" element={<CarouselList />} />
            <Route path="/View_Tmanagement" element={<View_Tmanagement />} />
            <Route path="/Edit_Tmanagement" element={<Edit_Tmanagement />} />
            <Route path="/web-product-details/:id" element={<WebProductDetails />} />

            <Route path="/a-transactionmoniter" element={<Tmoniter />} />
            <Route path="/a-investment-page" element={<InvestmentPage />} />
            <Route path="/a-reports" element={<AdminReportsPage />} />
            <Route path="/a-add-lead" element={<AddLead />} />
            <Route path="/a-partners" element={<PartnersDashboard />} />
            <Route path="/a-profile" element={<AdminProfile />} />
            <Route path="/a-profiledetails" element={<AdminKyc />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/Newkyc" element={<Newkyc />} />
            <Route path="/a-commission" element={<Commission />} />
            <Route path="/a-commissions/:userId" element={<CommissionByUser />} />
            <Route path="/a-addasset" element={<AdminAssetForm />} />
            <Route path="/a-subscriptions" element={<Subscription />} />
            <Route path="/a-addsubscriptions" element={<AddSubscription />} />
            <Route path="/a-edit-subscription/:id" element={<EditSubscription />} />
            <Route path="/a-assets/:id" element={<AssetDetails />} />
            <Route path="/a-assets/edit/:id" element={<EditAsset />} />
            <Route path="/a-commission/:transactionId" element={<CommissionView />} />
            <Route path="/a-bookingslab" element={<BookingSlab />} />
            <Route path="/a-add-booking-slab" element={<AddBookingSlab />} />
            <Route path="/a-edit-booking-slab/:id" element={<EditBookingSlab />} />
            <Route path="/a-meetings" element={<MeetingRequests />} />
            <Route path="/shedulemeet/:agentId" element={<SheduleMeeting />} />
            <Route path="/a-pendingassets" element={<PendingAssets />} />
            <Route path="/a-bookedassets" element={<BookedAssets />} />
            <Route path="/a-availableassets" element={<AvailableAssets />} />
            <Route path="/a-rejectedassets" element={<RejectedAssets />} />
            <Route path="/a-soldassets" element={<SoldAssets />} />
            <Route path="/a-approvedassets" element={<ApprovedAssets />} />
            <Route path="/a-activeagents" element={<ActiveAgents />} />
            <Route path="/a-Inactiveagents" element={<InactiveAgents />} />
            <Route path="/a-Newproperties" element={<NewProperties />} />
            <Route path="/a-transactionsummary" element={<TransactionSummary />} />
            <Route path="/a-commissionmaster" element={<CommissionLevels />} />
            <Route path="/a-add-commissionmaster" element={<AddCommissionLevels />} />
            <Route path="/a-edit-commissionmaster/:id" element={<EditCommissionLevels />} />
            <Route path="/a-category" element={<Category />} />
            <Route path="/tablecategory" element={<TableCategory />} />
            <Route path="/a-departments" element={<Departments />} />
            <Route path="/adddepartment" element={<AddDepartments />} />
            <Route path="/propertycategoryform" element={<PropertyCategoryform />} />
            <Route path="/editcategory/:id" element={<EditCategory />} />
            <Route path="/a-business" element={<AdminBussiness />} />
            <Route path="/a-editbusiness/:id" element={<AdminBussinessEdit />} />
            <Route path="/a-businessproducts/:id" element={<AdminBussinessProducts />} />
            <Route path="/a-editbusinessproducts/:id" element={<EditBussinessProducts />} />
            <Route path="/a-chatbot" element={<Chatbot />} />
            <Route path="/a-createq&a" element={<CreateQA />} />
            <Route path="/a-editqa/:id" element={<EditQA />} />
            <Route path="/a-sitevisit" element={<SiteVisits />} />
            <Route path="/a-admiteditsite/:id" element={<AdminEdit />} />
            <Route path="/adminlandingpage" element={<AdminLandingPage />} />

            <Route path="/i-dashboard" element={<InvestorDashboard />} />
            <Route path="/i-listingassets" element={<I_ListingProperties />} />
            <Route path="/i-latestProperties" element={<I_LatestProperties />} />
            <Route path="/i-bookedassets" element={<I_BookedAssets />} />
            <Route path="/i-purchasedassets" element={<I_PurchasedAssets />} />
            <Route path="/i-soldassets" element={<I_SoldProperties />} />
            <Route path="/i-asset" element={<InvestorAsset />} />
            <Route path="/i-transactions" element={<Transactions />} />
            <Route path="/i-transaction-details" element={<Tdetails />} />
            <Route path="/i-payment-form" element={<Payment />} />
            <Route path="/i-profile" element={<InvestorProfile />} />
            <Route path="/i-reports" element={<InvestorReportsPage />} />
            <Route path="/clienteditprofile" element={<ClientEditProfile />} />
            <Route path="/i-servies" element={<Services />} />
            <Route path="/i-profiledetails" element={<Kyc />} />
            <Route path="/i-plans" element={<Plans />} />
            <Route path="/i-myassets" element={<MyAssets />} />
            <Route path="/i-bookingassets" element={<I_BookingAssets />} />
            <Route path="/i-assets/:id" element={<PropertyDetails />} />
            <Route path="/i-myassets/edit/:id" element={<I_EditMyAsset />} />
            <Route path="/assets/:id" element={<I_MyAssests />} />
            <Route path="/i-addproperty" element={<AddPropertyForm />} />
            <Route path="/i-assets/edit/:id" element={<EditMyAsset />} />
            <Route path="/i-meetings" element={<I_Meetings />} />
            <Route path="/i-meetingrequest" element={<I_MeetingRequestForm />} />
            <Route path="/i-addbusiness" element={<AddInvestorBusiness />} />
            <Route path="/i-business" element={<InvestorBusiness />} />
            <Route path="/i-businessproducts/:id" element={<InvestorBusinessproducts />} />
            <Route path="/i-wishlist" element={<InvestorWishlist />} />
            <Route path="/investorlandingpage" element={<InvestorLandingPage />} />
            <Route path="/i-editbusiness/:id" element={<EditInvestorBusiness />} />

            <Route path="/p-trainingmaterial" element={<TrainingVideos />} />
            <Route path="/p-dashboard" element={<PartnerDashboard />} />
            <Route path="/p-report" element={<Report />} />
            <Route path="/p-addasset" element={<AssetForm />} />
            <Route path="/p-assets" element={<AssetDashboard />} />
            <Route path="/p-wishlist" element={<Wishlist />} />
            <Route path="/p-comparelist" element={<Comparelist />} />
            <Route path="/p-profile" element={<PartnerProfile />} />
            <Route path="/p-profiledetails" element={<PartnerKyc />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/p-leads" element={<Leads />} />
            <Route path="/p-addleads" element={<PAddLead />} />
            <Route path="/p-commission" element={<PartnerCommission />} />
            <Route path="/p-plans" element={<PartnerPlans />} />
            <Route path="/p-assets/:id" element={<AssetDetail />} />
            <Route path="/p-myassets" element={<PartnerMyAssets />} />
            <Route path="/audio" element={<SearchBox />} />
            <Route path="/p-myteam" element={<MyTeam />} />
            <Route path="/p-sitevisits" element={<Sitevisit />} />
            <Route path="/p-addsitevisit" element={<AddSitevisit />} />
            <Route path="/p-editsitevisit/:id" element={<EditSitevisit />} />
            <Route path="/p-latestassets" element={<LatestAssets />} />
            <Route path="/p-activeagents" element={<MyAgents />} />
            <Route path="/p-view-activeagents/:id" element={<ActiveUserView />} />
            <Route path="/p-view-teamdetails/:id" element={<ViewTeamDetails />} />
            <Route path="/p-myassets/edit/:id" element={<EditMyAssets />} />
            <Route path="/p-bookingassets" element={<BookingAssets />} />
            <Route path="/p-transaction" element={<Transaction />} />
            <Route path="/p-payment-form" element={<PaymentForm />} />
            <Route path="/p-transaction-details" element={<TransactionList />} />
            <Route path="/p-pay-commission/:propertyId" element={<PayCommissionForm />} />
            <Route path="/p-team" element={<Team />} />
            <Route path="/p-meetings" element={<Meetings />} />
            <Route path="/p-meetingrequest" element={<MeetingRequestForm />} />
            <Route path="/p-bookedassets" element={<PartnerBookedAssets />} />
            <Route path="/p-purchasedassets" element={<PartnerPurchasedAssets />} />
            <Route path="/p-soldassets" element={<SoldProperties />} />
            <Route path="/p-listingassets" element={<ListingProperties />} />
            <Route path="/p-latestProperties" element={<LatestProperties />} />
            <Route path="/subscriptionplans" element={<Subcrptionplan />} />
            <Route path="/p-addbusiness" element={<AddBusiness />} />
            <Route path="/p-addproduct" element={<AddProduct />} />
            <Route path="/p-viewbusiness" element={<ViewBusiness />} />
            <Route path="/p-editbusiness/:id" element={<EditBusiness />} />
            <Route path="/p-allbusinesses" element={<AllBusinesses />} />
            <Route path="/p-businessproducts/:id" element={<BusinessProducts />} />
            <Route path="/partnerlandingpage" element={<PartnerLandingPage />} />
            <Route path="/a-settings" element={<SettingsMain />} />
            <Route path="/p-offers" element={<OfferTable />} />
            <Route path="/add-offer" element={<AddOffer />} />
            <Route path="/edit-offer/:id" element={<AddOffer />} />
            <Route path="/add-referral-prefix" element={<AddReferralPrefix />} />
            <Route path="/edit-referral-prefix/:id" element={<EditReferralPrefix />} />

            <Route path="/termsandconditions" element={<Termsandconditions />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/i-product-details/:id" element={<I_ProductDetails />} />
            <Route path="/privacypolicy" element={<Privacypolicy />} />
            <Route path="/refundpolicy" element={<Refundpolicy />} />
            <Route path="/legalnavbar" element={<LegalNavbar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/filteredproperties" element={<FilteredProperties />} />
            <Route path="/payment-callback" element={<PaymentCallback />} />
            <Route path="/t&c" element={<TermsConditions />} />
          </Routes>
        </Suspense>
      </div>

      <Suspense fallback={null}>
        {footerPaths.includes(location.pathname) && <Footer />}
        {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      </Suspense>

      {/* Chatbot Floating Button */}
      {publicPaths.includes(location.pathname) && !showChat && (
        <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
          <IconButton
            sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#1565c0" }, width: 60, height: 60 }}
            onClick={() => setShowChat(true)}
          >
            <ChatBubbleIcon sx={{ fontSize: 30, color: "white" }} />
          </IconButton>
        </Box>
      )}

      {/* Chatbot Popup */}
      <Suspense fallback={null}>
        {showChat && <ChatbotPopup onClose={() => setShowChat(false)} />}
      </Suspense>
    </>
  );
}

function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (appLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;