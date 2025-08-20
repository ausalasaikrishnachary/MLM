import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Pagination
} from '@mui/material';
import Header from "../../../Shared/Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';

function Commission() {
    const [propertyData, setPropertyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        axios
            .get(`${baseurl}/property/`)
            .then((response) => {
                const filteredData = response.data.filter(
                    (item) =>
                        item.status === 'sold' && item.referral_id !== null
                );

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

    const totalPages = Math.ceil(propertyData.length / itemsPerPage);

    const paginatedData = propertyData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handlePageChange = (_, value) => {
        setPage(value);
    };

    return (
        <>
            <Header />
            <>
                <div style={{ textAlign: 'center', marginTop: "8%" }}>
                    <h2 style={{ fontWeight: 'bold' }}>Team Commission</h2>
                </div>
                <Table sx={{ border: '1px solid black', width: '90%', marginLeft: "5%", }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={cellStyle}>Team Name</TableCell>
                            <TableCell sx={cellStyle}>Team Referral Id</TableCell>
                            <TableCell sx={cellStyle}>Property Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={3} sx={noDataStyle}>Loading...</TableCell>
                            </TableRow>
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((property) => (
                                <TableRow
                                    key={property.id}
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/a-commissions/${property.user_id}`)}
                                >
                                    <TableCell sx={cellBodyStyle}>{property.username}</TableCell>
                                    <TableCell sx={cellBodyStyle}>{property.referral_id}</TableCell>
                                    <TableCell sx={cellBodyStyle}>{property.status}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} sx={noDataStyle}>No Data Found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination bottom right */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: "5%" }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                borderRadius: '0px', // makes buttons square
                            },
                        }}
                    />
                </Box>
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
