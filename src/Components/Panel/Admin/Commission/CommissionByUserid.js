import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableHead, TableRow, Button
} from '@mui/material';
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from '../../../BaseURL/BaseURL';


function CommissionByUser() {
    const { userId } = useParams();
    const [propertyData, setPropertyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get(`${baseurl}/properties/user-id/${userId}/`)
    //         .then((response) => {
    //             setPropertyData(response.data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //             setLoading(false);
    //         });
    // }, [userId]);

    useEffect(() => {
    axios.get(`${baseurl}/properties/user-id/${userId}/`)
        .then((response) => {
            // Filter properties where status is 'sold'
            const soldProperties = response.data.filter(property => property.status === 'sold');
            setPropertyData(soldProperties);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
}, [userId]);


    const handlePayCommission = (propertyId) => {
        navigate(`/p-pay-commission/${propertyId}`);
    };

    return (
        <>
            <Header />
            <div style={{ textAlign: 'center', marginTop: "8%" }}>
                <h2 style={{ fontWeight: 'bold' }}>Agent Commission Overview</h2>
            </div>
            <Table sx={{ border: '1px solid black', width: '90%', marginLeft: "5%", }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={cellStyle}>Agent Name</TableCell>
                        <TableCell sx={cellStyle}>Agent Referral Id</TableCell>
                        <TableCell sx={cellStyle}>Property Name</TableCell>
                        <TableCell sx={cellStyle}>Property Value</TableCell>
                        <TableCell sx={cellStyle}>Property Status</TableCell>
                        <TableCell sx={cellStyle}>Agent Commission</TableCell>
                        <TableCell sx={cellStyle}>Paid Commission</TableCell>
                        <TableCell sx={cellStyle}>Balance Commission</TableCell>
                        <TableCell sx={cellStyle}>Created</TableCell>
                        <TableCell sx={cellStyle}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={10} sx={noDataStyle}>Loading...</TableCell>
                        </TableRow>
                    ) : propertyData.length > 0 ? (
                        propertyData.map((property) => (
                            <TableRow key={property.id}>
                                <TableCell sx={cellBodyStyle}>{property.username}</TableCell>
                                <TableCell sx={cellBodyStyle}>{property.referral_id}</TableCell>
                                <TableCell sx={cellBodyStyle}>{property.property_title}</TableCell>
                                <TableCell sx={cellBodyStyle}>{property.property_value}</TableCell>
                                <TableCell sx={cellBodyStyle}>{property.status}</TableCell>
                                <TableCell sx={cellBodyStyle}>{property.agent_commission}</TableCell>
                                <TableCell sx={cellBodyStyle}>{property.agent_commission_paid}</TableCell>
                                <TableCell sx={cellBodyStyle}>{property.agent_commission_balance}</TableCell>
                                <TableCell sx={cellBodyStyle}>
                                    {new Date(property.created_at).toLocaleDateString('en-IN')}
                                </TableCell>
                                <TableCell sx={cellBodyStyle}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={() => handlePayCommission(property.property_id)}
                                        disabled={Number(property.agent_commission_balance) <= 0}
                                    >
                                        Pay Commission
                                    </Button>
                                </TableCell>
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

export default CommissionByUser;
