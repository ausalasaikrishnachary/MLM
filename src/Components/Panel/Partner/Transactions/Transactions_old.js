import React from "react";
import {
    Card, CardContent, Typography, Grid, Avatar, Box, TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper
} from "@mui/material";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

const Transaction = () => {

    const transactions = [
        { date: "2025-02-01", type: "Deposit", asset: "Property A", amount: "10,000/-" },
        { date: "2025-02-05", type: "Withdrawal", asset: "Property B", amount: "5,000/-" },
        { date: "2025-02-08", type: "Deposit", asset: "Property C", amount: "8,000/-" },
        { date: "2025-02-12", type: "Deposit", asset: "Property A", amount: "7,000/-" },
        { date: "2025-02-15", type: "Withdrawal", asset: "Property B", amount: "3,000/-" }
    ];

    return (
        <>
            <PartnerHeader />
            <Box p={3} sx={{ width: "80%", margin: "0 auto" }}>
                {/* Profile Section */}
                <Box display="flex" alignItems="center" mb={3} >
                    <Avatar
                        src="https://via.placeholder.com/100"
                        alt="Profile Picture"
                        sx={{ width: 80, height: 80, mr: 2 }}
                    />
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                        Partner
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Partner since 2004
                        </Typography>
                    </Box>
                </Box>

                {/* Cards Section */}
                <Grid container spacing={3}>
                    {[
                        { label: "Revenue", amount: "12,000/-", change: "+12%" },
                        { label: "Expenses", amount: "5,000/-", change: "-8%" },
                        { label: "Profit", amount: "7,000/-", change: "+15%" }
                    ].map((item, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Card sx={{ textAlign: "left", p: 2, border: '1px solid #000' }}>
                                <CardContent>
                                    <Typography variant="body1" >
                                        {item.label}
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold" mt={1}>
                                        {item.amount}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color={item.change.includes("+") ? "green" : "red"}
                                        fontWeight="bold"
                                        mt={1}
                                    >
                                        {item.change}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Assets Section */}
                <Box mb={3}>
                    <Typography variant="h6" fontWeight="bold" mb={2}>
                        Your Assets
                    </Typography>
                    <Grid container spacing={3}>
                        {[
                            { property: "Property A", share: "40%", amount: "100,000/-" },
                            { property: "Property B", share: "35%", amount: "80,000/-" },
                            { property: "Property C", share: "25%", amount: "60,000/-" }
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Card sx={{ textAlign: "left", p: 2, border: '1px solid #000' }}>
                                    <CardContent>
                                        <Typography variant="body1" fontWeight="bold">
                                            {item.property}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" mt={1}>
                                            Share: {item.share}
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold" mt={1}>
                                            {item.amount}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Recent Transactions Section */}
                <Box mt={5}>
                    <Typography variant="h6" fontWeight="bold" mb={2}>
                        Recent Transactions
                    </Typography>
                    <TableContainer component={Paper} elevation={3}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid #000' }}>Date</TableCell>
                                    <TableCell sx={{ border: '1px solid #000' }}>Type</TableCell>
                                    <TableCell sx={{ border: '1px solid #000' }}>Asset</TableCell>
                                    <TableCell sx={{ border: '1px solid #000' }}>Credit/Debit Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((tx, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ border: '1px solid #000' }}>{tx.date}</TableCell>
                                        <TableCell sx={{ border: '1px solid #000' }}>{tx.type}</TableCell>
                                        <TableCell sx={{ border: '1px solid #000' }}>{tx.asset}</TableCell>
                                        <TableCell sx={{ border: '1px solid #000' }}>{tx.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </Box>
        </>
    );
};

export default Transaction;
