import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableHead, TableRow,
    Tabs, Tab, Box, Typography
} from '@mui/material';
import Header from "../../../Shared/Partner/PartnerNavbar";
import { baseurl } from '../../../BaseURL/BaseURL';
import { Pagination } from '@mui/material';


function PartnerCommission() {
    const [propertyData, setPropertyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [companyCommissionData, setCompanyCommissionData] = useState(null);
    const [companyLoading, setCompanyLoading] = useState(true);
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");
    const referralId = localStorage.getItem("referral_id");

    useEffect(() => {
        axios.get(`${baseurl}/properties/user-id/${userId}/`)
            .then((response) => {
                const soldProperties = response.data.filter(property => property.status === 'sold');
                setPropertyData(soldProperties);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching property data:', error);
                setLoading(false);
            });
    }, [userId]);

    useEffect(() => {
        if (referralId) {
            axios.get(`${baseurl}/company-commissions/referral-id/${referralId}/`)
                .then((response) => {
                    setCompanyCommissionData(response.data);
                    setCompanyLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching company commission:', error);
                    setCompanyLoading(false);
                });
        } else {
            console.warn("Referral ID not found in localStorage.");
            setCompanyLoading(false);
        }
    }, [referralId]); // <-- Add referralId in dependency


    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const [page, setPage] = useState(1);
const itemsPerPage = 5;

const totalPages = Math.ceil(propertyData.length / itemsPerPage);

const paginatedData = propertyData.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
);


    return (
        <>
            <Header />
            <div style={{ textAlign: 'center', paddingTop: "1%" }}>
                <h2 style={{ fontWeight: 'bold' }}>Commission Dashboard</h2>
            </div>

            <Box sx={{ width: '90%', margin: 'auto', mt: 4 }}>
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="Team Commission" />
                    <Tab label="Company Commission" />
                </Tabs>

                {/* Agent Commission Tab */}
                {tabIndex === 0 && (
                    <Box mt={4}>
                        <Table sx={{ border: '1px solid black' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={cellStyle}>Property Name</TableCell>
                                    <TableCell sx={cellStyle}>Property Value</TableCell>
                                    <TableCell sx={cellStyle}>Property Status</TableCell>
                                    <TableCell sx={cellStyle}>Team Commission</TableCell>
                                    <TableCell sx={cellStyle}>Received Commission</TableCell>
                                    <TableCell sx={cellStyle}>Balance Commission</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} sx={noDataStyle}>Loading...</TableCell>
                                    </TableRow>
                                ) : paginatedData.length > 0 ? (
                                    paginatedData.map((property) => (
                                        <TableRow key={property.id}>
                                            <TableCell sx={cellBodyStyle}>{property.property_title}</TableCell>
                                            <TableCell sx={cellBodyStyle}>{property.total_property_value}</TableCell>
                                            <TableCell sx={cellBodyStyle}>{property.status}</TableCell>
                                            <TableCell sx={cellBodyStyle}>{property.agent_commission}</TableCell>
                                            <TableCell sx={cellBodyStyle}>{property.agent_commission_paid}</TableCell>
                                            <TableCell sx={cellBodyStyle}>{property.agent_commission_balance}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} sx={noDataStyle}>No Data Found</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination Bottom Right */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(_, value) => setPage(value)}
                                color="primary"
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        borderRadius: '0px',
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                )}



                {/* Company Commission Tab */}
                {tabIndex === 1 && (
                    <Box mt={4}>
                        {/* <Typography variant="h6" gutterBottom align="center">
                            Company Commission
                        </Typography> */}

                        {companyLoading ? (
                            <Typography align="center">Loading...</Typography>
                        ) : !companyCommissionData || (Array.isArray(companyCommissionData) && companyCommissionData.length === 0) ? (
                            <Typography align="center">No data available.</Typography>
                        ) : (
                            <Table sx={{ border: '1px solid black' }}>
                                <TableHead>
                                    <TableRow>
                                        {/* <TableCell sx={cellStyle}>Commission ID</TableCell> */}
                                        {/* <TableCell sx={cellStyle}>Transaction ID</TableCell> */}
                                        {/* <TableCell sx={cellStyle}>Agent ID</TableCell> */}
                                        <TableCell sx={cellStyle}>Property Name</TableCell>
                                        <TableCell sx={cellStyle}>Buyer Name</TableCell>
                                        {/* <TableCell sx={cellStyle}>Agent Name</TableCell> */}

                                        {/* <TableCell sx={cellStyle}>Referral ID</TableCell> */}

                                        <TableCell sx={cellStyle}>My Level No</TableCell>
                                        <TableCell sx={cellStyle}>Percentage</TableCell>
                                        <TableCell sx={cellStyle}>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(Array.isArray(companyCommissionData)
                                        ? companyCommissionData
                                        : [companyCommissionData]
                                    ).map((item, index) => (
                                        <TableRow key={index}>
                                            {/* <TableCell sx={cellBodyStyle}>{item.commission_id}</TableCell> */}
                                            {/* <TableCell sx={cellBodyStyle}>{item.transaction_id}</TableCell> */}
                                            {/* <TableCell sx={cellBodyStyle}>{item.agent_id}</TableCell> */}
                                            <TableCell sx={cellBodyStyle}>{item.property_name}</TableCell>
                                            <TableCell sx={cellBodyStyle}>{item.buyer_username}</TableCell>
                                            {/* <TableCell sx={cellBodyStyle}>{item.agent_name}</TableCell> */}
                                            {/* <TableCell sx={cellBodyStyle}>{item.referral_id}</TableCell> */}
                                            <TableCell sx={cellBodyStyle}>{item.level_no}</TableCell>
                                            <TableCell sx={cellBodyStyle}>{item.percentage_value}%</TableCell>
                                            <TableCell sx={cellBodyStyle}>{item.amount}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </Box>
                )}

            </Box>
        </>
    );
}

const cellStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #000',
    backgroundColor: '#f0f0f0',
};

const cellBodyStyle = {
    textAlign: 'center',
    border: '1px solid #000',
};

const noDataStyle = {
    textAlign: 'center',
    border: '1px solid #000',
    padding: 2,
};

export default PartnerCommission;
