import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../../Shared/Navbar/Navbar";
import axios from "axios";

const Tmoniter = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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
          "https://rahul30.pythonanywhere.com/transactions/payment-type/Full-Amount/"
        );
        setTransactions(res.data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handlePayCommission = async (transaction) => {
    const url = `https://rahul30.pythonanywhere.com/commission/distribute/${transaction.transaction_id}/`;

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

        <TableContainer>
          <Table sx={{ border: "1px solid black", width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>Transaction ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>Property Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>Property Value</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>Property Id</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>Payment Type</TableCell>
                {/* <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>Paid Amount</TableCell> */}
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>Company Commission</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>Payment Method</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>Transaction Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #000" }}>
                  Action
                </TableCell>
              </TableRow>

            </TableHead>
            <TableBody>
              {!loading && transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow
                    key={transaction.transaction_id}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{transaction.transaction_id}</TableCell>
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{transaction.property_name}</TableCell>
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{transaction.property_value || "N/A"}</TableCell>
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{transaction.property_id || "N/A"}</TableCell>
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{transaction.payment_type || "N/A"}</TableCell>
                    {/* <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{transaction.paid_amount}</TableCell> */}
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{transaction.company_commission}</TableCell>
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>{transaction.payment_mode || "cash"}</TableCell>
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>
                      {new Date(transaction.transaction_date).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", border: "1px solid #000" }}>
                      <button
                        style={{
                          backgroundColor: "#1976d2",
                          color: "white",
                          padding: "6px 12px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={() => handlePayCommission(transaction)}
                      >
                        Distribute Commission
                      </button>
                    </TableCell>

                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    {loading ? "Loading..." : "No transactions found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Tmoniter;
