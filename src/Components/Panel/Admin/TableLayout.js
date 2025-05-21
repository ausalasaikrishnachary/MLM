// src/components/CommissionTableLayout.js

import React from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';

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

function CommissionTableLayout({ title, headers, data, loading, onRowClick }) {
    return (
        <>
            <div style={{ textAlign: 'center', marginTop: "8%" }}>
                <h2 style={{ fontWeight: 'bold' }}>{title}</h2>
            </div>

            <Table sx={{ border: '1px solid black', width: '90%', marginLeft: "5%" }}>
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index} sx={cellStyle}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={headers.length} sx={noDataStyle}>Loading...</TableCell>
                        </TableRow>
                    ) : data.length > 0 ? (
                        data.map((row, index) => (
                            <TableRow
                                key={index}
                                hover
                                sx={{ cursor: 'pointer' }}
                                onClick={() => onRowClick(row)}
                            >
                                {Object.values(row).map((value, i) => (
                                    <TableCell key={i} sx={cellBodyStyle}>
                                        {value}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={headers.length} sx={noDataStyle}>No Data Found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}

export default CommissionTableLayout;
