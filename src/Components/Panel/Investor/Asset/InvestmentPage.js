import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
// import image4k from "./images/4kimage.jpg";
import image4k from '../images/pic1.jpeg';
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";


const InvestmentPage = () => {
  const [investmentData, setInvestmentData] = useState({
    asset: "",
    shares: "",
    nominee: "",
    price: "",
    description: "",
    nomineeContact: "",
  });

  const assetDetails = {
    location: "Downtown, NY",
    investmentType: "Real Estate",
    holdingPeriod: "5 Years",
    projectedAnnualReturn: "15%",
    propertyArea: "50,000 sq.ft",
    rentalOccupancy: "95%",
    leaseTenure: "10 years (Fixed)",
    tenant: "Leading Manufacturing Firm",
    propertyAge: "3 years",
    exitStrategy: "Open market resale or REIT listing",
    taxBenefits: "Depreciation claims & capital gains exemption",
    managementFees: "1.5% annually",
  };

  const assetTransaction = {
    assetId: "INV-001",
    date: "2024-02-19",
    assetName: "Luxury Villa",
    creditDebit: "Credit",
    type: "Investment",
    amount: "$500,000",
  };

  const handleChange = (e) => {
    setInvestmentData({ ...investmentData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <InvestorHeader />
      <Box sx={{ width: "80%", margin: "0 auto", padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Select Investment to Buy
        </Typography>

        <Grid container spacing={4}>
          {/* Image & Asset Details */}
          <Grid item xs={12} md={6}>
            <img
              src={image4k}
              alt="Investment"
              style={{ width: "100%", borderRadius: 8, height: "250px" }}
            />

            <Box sx={{ marginTop: 2 }}>
              {Object.entries(assetDetails).map(([key, value]) => (
                <Typography key={key} variant="body1" paragraph>
                  <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong> {value}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Form & Transaction Details */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Select fullWidth name="asset" value={investmentData.asset} onChange={handleChange} displayEmpty>
                  <MenuItem value="" disabled>
                    Select Asset
                  </MenuItem>
                  <MenuItem value="Luxury Villa">Luxury Villa</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="No of Shares" name="shares" value={investmentData.shares} onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Nominee" name="nominee" value={investmentData.nominee} onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Price" name="price" value={investmentData.price} onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Description" name="description" multiline rows={2} value={investmentData.description} onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Nominee Contact" name="nomineeContact" value={investmentData.nomineeContact} onChange={handleChange} />
              </Grid>
            </Grid>

            <Box sx={{ marginTop: 3, padding: 2, borderRadius: 2 }}>
              {Object.entries(assetTransaction).map(([key, value]) => (
                <Typography key={key} variant="body1" paragraph>
                  <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong> {value}
                </Typography>
              ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, marginTop: 3 }}>
              <Button variant="contained" sx={{ backgroundColor: "#8FD14F", color: "white" }}>
                Confirm
              </Button>
              <Button variant="contained" sx={{ backgroundColor: "#185519", color: "white" }}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InvestmentPage;
