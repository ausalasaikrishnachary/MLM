import React, { Profiler, useEffect, useState, } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import AdminDashboard from "./Components/Panel/Admin/Dashboard/Dashboard";
import AdminAsset from "./Components/Panel/Admin/Asset/Asset";
import InvestorDashboard from "./Components/Panel/Investor/Dashboard/Dashboard";
import InvestorAsset from "./Components/Panel/Investor/Asset/Asset";
import PartnerDashboard from "./Components/Panel/Partner/Dashboard/Dashboard";
import PartnerAsset from "./Components/Panel/Partner/Asset/Asset";
import Navbar from "./Components/Shared/Navbar/Navbar";
import InvestorHeader from "./Components/Shared/Investor/InvestorNavbar";
import PartnerHeader from "./Components/Shared/Partner/PartnerNavbar";
import BuyShares from "./Components/Panel/Investor/Transactions/BuyShares";
import SellShares from "./Components/Panel/Investor/Transactions/SellShares";
import Report from "./Components/Panel/Partner/Report/Report";
import AssetForm from "./Components/Panel/Partner/Asset/AssetForm";
import Tmanagement from "./Components/Panel/Admin/Investors/Investormanagement";
import Tmoniter from "./Components/Panel/Admin/Transactions/TransactionMoniter";
import Login from "./Components/Login/Login";
import Transaction from "./Components/Panel/Partner/Transaction/Transaction";
import InvestmentPage from "./Components/Panel/Investor/Asset/InvestmentPage";
import PartnersDashboard from "./Components/Panel/Admin/Partners/Partners";
import AssetDashboard from "./Components/Panel/Partner/Asset/Asset";
import InvestorProfile from "./Components/Panel/Investor/Profile/Profile";
import Kyc from "./Components/Panel/Investor/Profile/Kyc";
import PartnerProfile from "./Components/Panel/Partner/Profile/Profile";
import PartnerKyc from "./Components/Panel/Partner/Profile/Kyc";
import AdminProfile from "./Components/Panel/Admin/Profile/Profile";
import AdminKyc from "./Components/Panel/Admin/Profile/Kyc";
import AddLead from './Components/Panel/Admin/Investors/AddLead';
import Leads from './Components/Panel/Partner/MyLeads/Leads'
import PAddLead from './Components/Panel/Partner/MyLeads/AddLead'
import Referral from "./Components/Panel/Admin/Referral/Referral";
import PartnerReferral from "./Components/Panel/Partner/Referral/Referral";
import AdminAssetForm from "./Components/Panel/Admin/Asset/AssetForm";
import Services from "./Components/Panel/Investor/Servies/Servies";
import Subscription from "./Components/Panel/Admin/Subscription/Subscription";
import AddSubscription from "./Components/Panel/Admin/Subscription/AddSubscription";
import Plans from "./Components/Panel/Investor/Plans/Plans";
import Newkyc from "./Components/Panel/Investor/Profile/Newkyc";
import SignUp from "./Components/Login/SignUp";
import AddPropertyForm from "./Components/Panel/Investor/Asset/AddPropertyForm";
import MyAssets from "./Components/Panel/Investor/Asset/MyAssets";
import PartnerPlans from "./Components/Panel/Partner/Plans/Plans";
import PropertyDetails from "./Components/Panel/Investor/Asset/AssetDetails";
import AssetDetails from "./Components/Panel/Admin/Asset/AssetDetails";
import AssetDetail from "./Components/Panel/Partner/Asset/AssetDetails";
import PartnerMyAssets from "./Components/Panel/Partner/Asset/MyAssets";
import ViewAssetDetails from "./Components/Panel/Partner/Asset/ViewAssetDetails";
import MyTeam from "./Components/Panel/Partner/MyTeam/MyTeam";
import LatestAssets from "./Components/Panel/Partner/Asset/LatestAssets";
import MyAgents from "./Components/Panel/Partner/MyTeam/MyAgents/MyAgents";
import ActiveUserView from "./Components/Panel/Partner/MyTeam/MyAgents/ViewAgents";
import EditAsset from "./Components/Panel/Admin/Asset/EditAsset";
import EditMyAsset from "./Components/Panel/Investor/Asset/EditMyAsset";
import BookingAssets from "./Components/Panel/Partner/Asset/BookingAssets";
import PaymentForm from "./Components/Panel/Partner/Transaction/PaymentForm";
import TransactionList from "./Components/Panel/Partner/Transaction/TransactionDetails";
import EditSubscription from "./Components/Panel/Admin/Subscription/EditSubscription";
import View_Tmanagement from "./../src/Components/Panel/Admin/Investors/View_Tmanagement";

import Edit_Tmanagement from "./Components/Panel/Admin/Investors/Edit_Tmanagement";
import Commission from "./Components/Panel/Admin/Commission/Commission";
import CommissionByUser from "./Components/Panel/Admin/Commission/CommissionByUserid";
import PayCommissionForm from "./Components/Panel/Admin/Commission/PayCommissionForm";
import PartnerCommission from "./Components/Panel/Partner/PartnerCommission/PartnerCommission";
import EditMyAssets from "./Components/Panel/Partner/Asset/EditMyAssets";
import I_EditMyAsset from "./Components/Panel/Investor/Asset/EditMyAsset";
import I_MyAssests from "./Components/Panel/Investor/Asset/New-AssetsDetails";
import CommissionView from "./Components/Panel/Admin/Transactions/CommissionView";
import BookingSlab from "./Components/Panel/Admin/BookingSlab/BookingSlab";
import AddBookingSlab from "./Components/Panel/Admin/BookingSlab/AddBookingSlab";
import EditBookingSlab from "./Components/Panel/Admin/BookingSlab/EditBookingSlab";
import Team from "./Components/Panel/Partner/MyTeam/Team";
import ViewTeamDetails from "./Components/Panel/Partner/MyTeam/ViewTeamDetails";
import Meetings from "./Components/Panel/Partner/Meetings/Meetings";
import MeetingRequestForm from "./Components/Panel/Partner/Meetings/MeetingRequestForm";
import MeetingRequests from "./Components/Panel/Admin/Meetings/MeetingRequests";
import SheduleMeeting from "./Components/Panel/Admin/Meetings/SheduleMeeting";
import PendingAssets from "./Components/Panel/Admin/Asset/PendingAssets";
import BookedAssets from "./Components/Panel/Admin/Asset/BookedAssets";
import AvailableAssets from "./Components/Panel/Admin/Asset/AvailableAssets";
import RejectedAssets from "./Components/Panel/Admin/Asset/RejectedAssets";
import SoldAssets from "./Components/Panel/Admin/Asset/SoldAssets";
import ApprovedAssets from "./Components/Panel/Admin/Asset/ApprovedAssets";
import PartnerBookedAssets from "./Components/Panel/Partner/Asset/PartnerBookedAssets";
import PartnerPurchasedAssets from "./Components/Panel/Partner/Asset/PartnerPurchasedAssets";
import SoldProperties from "./Components/Panel/Partner/Asset/SoldProperties";
import ListingProperties from "./Components/Panel/Partner/Asset/ListingProperties";
import LatestProperties from "./Components/Panel/Partner/Asset/LatestProperties";
import ActiveAgents from "./Components/Panel/Admin/Agents/ActiveAgents";
import InactiveAgents from "./Components/Panel/Admin/Agents/InactiveAgents";
import NewProperties from "./Components/Panel/Admin/Asset/NewProperties";
import Transactions from "./Components/Panel/Investor/Transactions/Transactions";
import Tdetails from "./Components/Panel/Investor/Transactions/T_Details";
import Payment from "./Components/Panel/Investor/Transactions/Payment";

import Termsandconditions from "./Components/Legal/Termsandconditions";
import Privacypolicy from "./Components/Legal/Privacypolicy";
import Refundpolicy from "./Components/Legal/Refundpolicy";

import I_ListingProperties from "./Components/Panel/Investor/Asset/ListingProperties";
import I_LatestProperties from "./Components/Panel/Investor/Asset/LatestProperties";
import I_BookedAssets from "./Components/Panel/Investor/Asset/BookedAssets";
import I_PurchasedAssets from "./Components/Panel/Investor/Asset/PurchasedAssets";
import I_SoldProperties from "./Components/Panel/Investor/Asset/SoldProperties";
import LegalNavabar from "./Components/Shared/LegalNavbar";
import LegalNavbar from "./Components/Shared/LegalNavbar";
import I_BookingAssets from "./Components/Panel/Investor/Asset/BookingAssets";
import EditProfile from "./Components/Panel/Partner/Profile/EditProfile";
import ClientEditProfile from "./Components/Panel/Investor/Profile/ClientEditProfile"
import LandingPage from "./Components/Website/Pages/Landingpage";

import Home from "./Components/Website/Pages/Home/Home";
import Aboutus from "./Components/Website/Pages/Aboutus/Aboutus";
import FAQAccordion from "./Components/Website/Pages/FAQs/Faqs";
import Contact from "./Components/Website/Pages/Contactus/Contactus";
import Properties from "./Components/Website/Pages/Properties/Properties";
import Header from "./Components/Website/Shared/Navbar/Navbar";
import Footer from "./Components/Website/Shared/Footer/Footer";
import PropertyDetail from "./Components/Website/Pages/Properties/ViewPropertiesDetails";
import Popup from "./Components/Popup/Popup";
import FilteredProperties from "./Components/Website/Pages/Home/FilteredProperties";
import PaymentCallback from "./Components/Panel/Partner/Plans/PaymentCallback";
import LeadsTable from "./Components/Panel/Admin/Leads/LeadsTable";
import AddCarousel from "./Components/Panel/Admin/Carousel/CarouselForm";
import Viewdetails from "./Components/Website/Pages/Properties/ViewPropertiesDetails";
import ViewPropertiesDetails from "./Components/Website/Pages/Properties/ViewPropertiesDetails"
import CarouselList from "./Components/Panel/Admin/Carousel/CarouselTable";
import TrainingMaterial from "./Components/Panel/Admin/TrainingMaterial/TrainingMaterial";
import AddTrainingMaterial from "./Components/Panel/Admin/TrainingMaterial/AddTrainingMaterial";
import TrainingVideos from "./Components/Panel/Partner/TraningVideos/TraningVideos";
import TransactionSummary from "./Components/Panel/Admin/TransactionSummary/TransactionSummary";
import TermsConditions from "./Components/Legal/TermsConditions";
import I_Meetings from "./Components/Panel/Investor/Meetings/Meetings";
import I_MeetingRequestForm from "./Components/Panel/Investor/Meetings/MeetingRequestForm";
import AdminMeetings from "./Components/Panel/Admin/AdminMeetings/AdminMeetings";
import TableAdminMeetings from "./Components/Panel/Admin/AdminMeetings/TableAdminMeetings";
import CommissionLevels from "./Components/Panel/Admin/CommissionLevels/CommissionLevels";
import AddCommissionLevels from "./Components/Panel/Admin/CommissionLevels/AddCommissionLevels";
import EditCommissionLevels from "./Components/Panel/Admin/CommissionLevels/EditCommissionLevels";
import Category from "./Components/Panel/Admin/Category/Category";
import Subcrptionplan from "./Components/Panel/Partner/Plans/Subcrptionplan";
import SearchBox from "./Components/Website/Pages/Home/SearchBox";
import AddBusiness from "./Components/Panel/Partner/Business/AddBusiness";
import ViewBusiness from "./Components/Panel/Partner/Business/ViewBusiness";
import AdminBussiness from "./Components/Panel/Admin/AdminBussiness/AdminBussiness";




function Layout() {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  // Define paths where Header and Footer should be visible
  const publicPaths = ["/", "/aboutus", "/FAQ", "/contactus", "/properties", "/propertydetails", "/termsandconditions", "/privacypolicy", "/refundpolicy", "/filteredproperties", "/viewpropertiesdetails/:id"];
  const footerPaths = ["/", "/aboutus", "/FAQ", "/contactus", "/properties", "/termsandconditions", "/privacypolicy", "/refundpolicy", "/filteredproperties", "/viewpropertiesdetails/:id"]; // Removed '/propertydetails'

  // Trigger popup after 60 seconds on public pages
  useEffect(() => {
    let timeoutId;

    if (publicPaths.includes(location.pathname)) {
      timeoutId = setTimeout(() => {
        setShowPopup(true);
      }, 1000); // 60 seconds
    }

    return () => clearTimeout(timeoutId); // cleanup on route change
  }, [location.pathname]);


  return (

    <>
      {publicPaths.includes(location.pathname) && <Header />}

      <div className="main-container">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/popup" element={<Popup />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/FAQ" element={<FAQAccordion />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/propertydetails" element={<PropertyDetail />} />


          <Route path="/a-trainingmaterial" element={<TrainingMaterial />} />
          <Route path="/a-addtrainingmaterial" element={<AddTrainingMaterial />} />
          {/* <Route path="/home" element={<LandingPage />} /> */}
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

          <Route path="/a-transactionmoniter" element={<Tmoniter />} />
          <Route path="/a-investment-page" element={<InvestmentPage />} />
          <Route path="/a-add-lead" element={<AddLead />} />
          <Route path="/a-partners" element={<PartnersDashboard />} />
          <Route path="/a-profile" element={<AdminProfile />} />
          <Route path="/a-profiledetails" element={<AdminKyc />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Newkyc" element={<Newkyc />} />

          {/* <Route path="/a-commission" element={<Referral />} /> */}
          <Route path="/a-commission" element={<Commission />} />
          <Route path="/a-commissions/:userId" element={<CommissionByUser />} />
          <Route path="/a-addasset" element={<AdminAssetForm />} />
          <Route path="/a-subscriptions" element={<Subscription />} />
          <Route path="/a-addsubscriptions" element={<AddSubscription />} />
          <Route path="/a-edit-subscription/:id" element={<EditSubscription />} />
          <Route path="/a-assets/:id" element={<AssetDetails />} />
          <Route path="/viewpropertiesdetails/:id" element={<ViewPropertiesDetails />} />

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
          <Route path="/a-bussiness" element={<AdminBussiness/>} />



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


          <Route path="/p-trainingmaterial" element={<TrainingVideos />} />
          <Route path="/p-dashboard" element={<PartnerDashboard />} />
          <Route path="/p-report" element={<Report />} />
          <Route path="/p-addasset" element={<AssetForm />} />
          <Route path="/p-assets" element={<AssetDashboard />} />
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
          <Route path="/p-viewbusiness" element={<ViewBusiness />} />


          <Route path="/termsandconditions" element={<Termsandconditions />} />
          <Route path="/privacypolicy" element={<Privacypolicy />} />
          <Route path="/refundpolicy" element={<Refundpolicy />} />
          <Route path="/legalnavbar" element={<LegalNavbar />} />
          <Route path="/login" element={<Login />} />

          <Route path="/filteredproperties" element={<FilteredProperties />} />
          <Route path="/payment-callback" element={<PaymentCallback />} />

          <Route path="/t&c" element={<TermsConditions />} />

        </Routes>
      </div>
      {footerPaths.includes(location.pathname) && <Footer />}
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </>


  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
