import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

const Transaction = () => {
    return (
        <>
            <PartnerHeader />
            <Box sx={{ p: 4, minHeight: '100vh', width: "80%", margin: "0 auto" }}>
                <Typography variant="h4" sx={{ marginLeft: '10px', textAlign: "center" }}>
                    Transactions
                </Typography>
                {/* Profile Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar
                        src="https://www.w3schools.com/w3images/team2.jpg"
                        sx={{ width: 50, height: 50, mr: 2 }}
                    />
                    <Box>
                        <Typography variant="h6">ABC</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Partner since 2024
                        </Typography>
                    </Box>
                </Box>

                {/* Stat Cards */}
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    {[
                        {
                            title: 'Total Portfolio Value',
                            value: '₹750,000/-',
                            change: '+12.5%',
                        },
                        {
                            title: 'Monthly Returns',
                            value: '₹8,50,000/-',
                            change: '+5.2%',
                        },
                        {
                            title: 'Active Investments',
                            value: '3',
                            change: '+1',
                        },
                    ].map((stat, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card
                                sx={{
                                    borderRadius: '15px',
                                    boxShadow: 3,
                                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        {stat.title}
                                    </Typography>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {stat.value}
                                    </Typography>
                                    <Chip label={stat.change} color="success" size="small" />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Assets Section */}
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Your Assets
                </Typography>
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    {[
                        { name: 'Property A', value: '₹250,000/-', share: 'Share: 25%' },
                        { name: 'Property B', value: '₹180,000/-', share: 'Share: 15%' },
                        { name: 'Property C', value: '₹320,000/-', share: 'Share: 30%' },
                    ].map((asset, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card
                                sx={{
                                    borderRadius: '15px',
                                    boxShadow: 3,
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'translateY(-5px)' },
                                }}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography variant="subtitle1">{asset.name}</Typography>
                                        <InsertDriveFileIcon color="action" />
                                    </Box>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {asset.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {asset.share}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Recent Transactions */}
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Recent Transactions
                </Typography>
                <Card sx={{ borderRadius: '15px', boxShadow: 3 }}>
                    <CardContent>
                        <TableContainer
                            component={Paper}
                            sx={{ maxHeight: 300, overflow: 'auto' }}
                        >
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {['Date', 'Type', 'Asset', 'Credit/Debit Amount'].map((head, index) => (
                                            <TableCell
                                                key={index}
                                                align="center"
                                                sx={{
                                                    backgroundColor: '#3a575b',
                                                    color: '#fff',
                                                    fontWeight: '500',
                                                    position: 'sticky',
                                                    top: 0,
                                                    zIndex: 1,
                                                }}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[
                                        {
                                            date: '2024-03-15',
                                            type: 'Dividend',
                                            asset: 'Property A',
                                            amount: '+₹20000/-',
                                        },
                                        {
                                            date: '2024-03-10',
                                            type: 'Dividend',
                                            asset: 'Property B',
                                            amount: '+₹50000/-',
                                        },
                                        {
                                            date: '2024-03-05',
                                            type: 'Dividend',
                                            asset: 'Property C',
                                            amount: '+₹80000/-',
                                        },
                                    ].map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{row.date}</TableCell>
                                            <TableCell align="center">{row.type}</TableCell>
                                            <TableCell align="center">{row.asset}</TableCell>
                                            <TableCell align="center" sx={{ color: 'green' }}>
                                                {row.amount}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default Transaction;
