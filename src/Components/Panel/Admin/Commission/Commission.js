import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableHead, TableRow, Button,
} from '@mui/material';
import Header from "../../../Shared/Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';

function Commission() {
    const [propertyData, setPropertyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${baseurl}/property/`)
            .then((response) => {
                // Filter sold properties with non-null, positive commission balance
                const filteredData = response.data.filter(
                    (item) =>
                        item.status === 'Sold' &&
                        item.agent_commission_balance !== null &&
                        parseFloat(item.agent_commission_balance) > 0
                );

                // Remove duplicates based on user_id
                const uniqueByUserId = [];
                const userIds = new Set();

                for (const item of filteredData) {
                    if (!userIds.has(item.user_id)) {
                        userIds.add(item.user_id);
                        uniqueByUserId.push(item);
                    }
                }

                setPropertyData(uniqueByUserId);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);



    return (
        <>
            <Header />
            <>
                <div style={{ textAlign: 'center',marginTop: "8%" }}>
                    <h2 style={{ fontWeight: 'bold' }}>Agent Commission</h2>
                </div>
                <Table sx={{ border: '1px solid black', width: '90%', marginLeft: "5%",  }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={cellStyle}>Agent Name</TableCell>
                            <TableCell sx={cellStyle}>Agent Referral Id</TableCell>
                            <TableCell sx={cellStyle}>Property Name</TableCell>
                            {/* <TableCell sx={cellStyle}>City</TableCell>
              <TableCell sx={cellStyle}>State</TableCell>
              <TableCell sx={cellStyle}>Country</TableCell>
              <TableCell sx={cellStyle}>Owner</TableCell> */}
                            <TableCell sx={cellStyle}>Property Value</TableCell>
                            <TableCell sx={cellStyle}>Property Status</TableCell>
                            {/* <TableCell sx={cellStyle}>Approval</TableCell> */}


                            {/* <TableCell sx={cellStyle}>Agent Name</TableCell> */}
                            {/* <TableCell sx={cellStyle}>Agent commission</TableCell>
                            <TableCell sx={cellStyle}>paid commission</TableCell>
                            <TableCell sx={cellStyle}>Balance commission</TableCell> */}
                            <TableCell sx={cellStyle}>Created</TableCell>
                            {/* <TableCell sx={cellStyle}>Action</TableCell> */}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={10} sx={noDataStyle}>Loading...</TableCell>
                            </TableRow>
                        ) : propertyData.length > 0 ? (
                            propertyData.map((property) => (
                                <TableRow
                                    key={property.id}
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/a-commissions/${property.user_id}`)}
                                >
                                    <TableCell sx={cellBodyStyle}>{property.username}</TableCell>
                                    <TableCell sx={cellBodyStyle}>{property.referral_id}</TableCell>
                                    <TableCell sx={cellBodyStyle}>{property.property_title}</TableCell>
                                    <TableCell sx={cellBodyStyle}>{property.total_property_value}</TableCell>
                                    <TableCell sx={cellBodyStyle}>{property.status}</TableCell>
                                    {/* <TableCell sx={cellBodyStyle}>{property.agent_commission}</TableCell>
                                    <TableCell sx={cellBodyStyle}>{property.agent_commission_paid}</TableCell>
                                    <TableCell sx={cellBodyStyle}>{property.agent_commission_balance}</TableCell> */}
                                    <TableCell sx={cellBodyStyle}>
                                        {new Date(property.created_at).toLocaleDateString('en-IN')}
                                    </TableCell>
                                    {/* <TableCell
                                        sx={cellBodyStyle}
                                        onClick={(e) => e.stopPropagation()} // Prevent row click
                                    >
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => alert(`Property ID: ${property.user_id}`)}
                                        >
                                            View
                                        </Button>
                                    </TableCell> */}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={10} sx={noDataStyle}>No Data Found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </>
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

export default Commission;
