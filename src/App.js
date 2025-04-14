import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Transaction from "./Components/Panel/Partner/Transactions/Transactions";
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



function App() {
  return (
      // <AuthProvider>
      <Router>
        {/* <Navbar/> */}
        {/* <InvestorHeader/> */}
        {/* <PartnerHeader/> */}
        <div style={{marginTop:"85px"}}>
          <Routes>
              <Route path="/a-dashboard" element={<AdminDashboard />} />
              <Route path="/a-asset" element={<AdminAsset />} />
              <Route path="/a-investormanagement" element={<Tmanagement />} />
              <Route path="/a-transactionmoniter" element={<Tmoniter />} />
              <Route path="/a-investment-page" element={<InvestmentPage />} />
              <Route path="/a-add-lead" element={<AddLead />} />
              <Route path="/a-partners" element={<PartnersDashboard />} />
              <Route path="/a-profile" element={<AdminProfile />} />
              <Route path="/a-profiledetails" element={<AdminKyc />} />

              <Route path="/Newkyc" element={<Newkyc />} />

              <Route path="/a-referal&commission" element={<Referral />} />
              <Route path="/a-addasset" element={<AdminAssetForm />} />
              <Route path="/a-subscriptions" element={<Subscription />} />
              <Route path="/a-addsubscriptions" element={<AddSubscription />} />


              <Route path="/i-dashboard" element={<InvestorDashboard />} />
              <Route path="/i-asset" element={<InvestorAsset />} />
              <Route path="/i-buyshares" element={<BuyShares />} />
              <Route path="/i-sellshares" element={<SellShares />} />
              {/* <Route path="/i-asset" element={<PartnerAsset />} /> */}
              <Route path="/i-profile" element={<InvestorProfile />} />
              <Route path="/i-servies" element={<Services />} />
              <Route path="/i-profiledetails" element={<Kyc />} />
              <Route path="/i-plans" element={<Plans />} />



              <Route path="/p-dashboard" element={<PartnerDashboard />} />
              <Route path="/p-report" element={<Report />} />
              <Route path="/p-addasset" element={<AssetForm />} />
              <Route path="/p-transactions" element={<Transaction />} />
              <Route path="/p-myassets" element={<AssetDashboard />} />
              <Route path="/p-profile" element={<PartnerProfile />} />
              <Route path="/p-profiledetails" element={<PartnerKyc/>} />
              <Route path="/p-leads" element={<Leads/>} />
              <Route path="/p-addleads" element={<PAddLead/>} />
              <Route path="/p-referal&commission" element={<PartnerReferral/>} />




              <Route path="/" element={<Login />} />
              
          </Routes>
          </div>
      </Router>
      // </AuthProvider>
  );
}

export default App;
