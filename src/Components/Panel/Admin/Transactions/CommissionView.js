import React, { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Box,
  Button,
  
} from "@mui/material";
import axios from "axios";
import Header from "../../../Shared/Navbar/Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CommissionView = () => {
  const { transactionId } = useParams();
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommissionData = async () => {
      try {
        const response = await axios.get(
          `https://rahul30.pythonanywhere.com/commissions/preview/${transactionId}/`
        );
        setCommissions(response.data);
      } catch (error) {
        console.error("Error fetching commission data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommissionData();
  }, [transactionId]);

  return (
    <>
    <Header/>
    <Container sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)} // Goes back to previous page
          >
            Back
          </Button>
        </Box>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
        Commission Breakdown - Transaction ID: {transactionId}
      </Typography>

      {loading ? (
        <Typography align="center">Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Level</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Agent Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Referral ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commissions.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center" }}>{item.level}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.agent_name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.referral_id}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.amount}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.percentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
    </>
  );
};

export default CommissionView;