import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import Header from "../../../Shared/Navbar/Navbar";
import axios from "axios";
import { baseurl } from '../../../BaseURL/BaseURL';

const Tmoniter = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
   const summaryCardsData = [
    {
      title: "Total Transactions",
      value: "1274",
      subtext: "Last 7 Days",
    },
    {
      title: "Success Rate",
      value: "99.5%",
      subtext: "+2.3% from last week",
    },
    {
      title: "Total Volume",
      value: "2cr",
      subtext: "+12% increase",
    },
  ];


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          "baseurl/transactions/payment-type/Full-Amount/"
        );

        const transactionsWithStatus = await Promise.all(
          res.data.map(async (transaction) => {
            try {
              const propertyRes = await axios.get(
                `baseurl/property/${transaction.property_id}/`
              );
              const status = propertyRes.data.company_commission_status || "N/A";
              return {
                ...transaction,
                company_commission_status: status,
              };
            } catch (error) {
              console.error("Error fetching property status:", error);
              return {
                ...transaction,
                company_commission_status: "Error",
              };
            }
          })
        );

        setTransactions(transactionsWithStatus);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handlePayCommission = async (transaction) => {
    const url = `${baseurl}/commission/distribute/${transaction.transaction_id}/`;
    try {
      console.log("Initiating commission payment for:", transaction.transaction_id);
      const response = await axios.post(url);
      console.log("Commission distributed:", response.data);
      alert(`Commission distributed for Transaction ID ${transaction.transaction_id}`);
    } catch (error) {
      console.error("Failed to distribute commission:", error);
      alert(`Error distributing commission for Transaction ID ${transaction.transaction_id}`);
    }
  };

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

  return (
    <>
      <Header />
      <Container sx={{ pt: 3 }}>
         {/* <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 3, textAlign: "center" }}
        >
          Transaction Monitor
        </Typography>

        <Grid container spacing={2}>
          {summaryCardsData.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ textAlign: "center", p: 2, borderRadius: 2 }}>
                <CardContent>
                  <Typography gutterBottom>{card.title}</Typography>
                  <Typography variant="h4" sx={{ color: "rgb(30,10,80)" }}>
                    {card.value}
                  </Typography>
                  <Typography variant="body2">{card.subtext}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> */}

        <Typography
          variant="h5"
          sx={{
            marginTop: 4,
            marginBottom: 2,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Transaction List
        </Typography>

        <Table sx={{ border: '1px solid black', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>Transaction ID</TableCell>
              <TableCell sx={cellStyle}>Property Name</TableCell>
              <TableCell sx={cellStyle}>Property Value</TableCell>
              <TableCell sx={cellStyle}>Payment Type</TableCell>
              <TableCell sx={cellStyle}>Company Commission</TableCell>
              <TableCell sx={cellStyle}>Payment Method</TableCell>
              <TableCell sx={cellStyle}>Transaction Date</TableCell>
              <TableCell sx={cellStyle}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} sx={noDataStyle}>Loading...</TableCell>
              </TableRow>
            ) : transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction.transaction_id}>
                  <TableCell sx={cellBodyStyle}>{transaction.transaction_id}</TableCell>
                  <TableCell sx={cellBodyStyle}>{transaction.property_name}</TableCell>
                  <TableCell sx={cellBodyStyle}>{transaction.property_value || "N/A"}</TableCell>
                  <TableCell sx={cellBodyStyle}>{transaction.payment_type || "N/A"}</TableCell>
                  <TableCell sx={cellBodyStyle}>{transaction.company_commission}</TableCell>
                  <TableCell sx={cellBodyStyle}>{transaction.payment_mode || "cash"}</TableCell>
                  <TableCell sx={cellBodyStyle}>
                    {new Date(transaction.transaction_date).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell sx={cellBodyStyle}>
                    {transaction.company_commission_status === "paid" ? (
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        onClick={() => navigate(`/a-commission/${transaction.transaction_id}`)}
                        sx={{ textTransform: 'none' }}
                      >
                        View Commission
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handlePayCommission(transaction)}
                        sx={{ textTransform: 'none' }}
                      >
                        Distribute Commission
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} sx={noDataStyle}>No transactions found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default Tmoniter;