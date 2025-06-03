import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
} from "@mui/material";
import { baseurl } from '../../../BaseURL/BaseURL';
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
          `${baseurl}/commissions/preview/${transactionId}/`
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
      <Container>
        <div style={{ textAlign: 'center', marginTop: "12%" }}>
          <h2 style={{ fontWeight: 'bold' }}>Commission Breakdown</h2>
          <Typography variant="subtitle1" gutterBottom>
            Transaction ID: {transactionId}
          </Typography>
        </div>

        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>

        <Table sx={{ border: '1px solid black', width: '100%', mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>Level</TableCell>
              <TableCell sx={cellStyle}>Agent Name</TableCell>
              <TableCell sx={cellStyle}>Referral ID</TableCell>
              <TableCell sx={cellStyle}>Amount</TableCell>
              <TableCell sx={cellStyle}>Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} sx={noDataStyle}>Loading...</TableCell>
              </TableRow>
            ) : commissions.length > 0 ? (
              commissions.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={cellBodyStyle}>{item.level}</TableCell>
                  <TableCell sx={cellBodyStyle}>{item.agent_name}</TableCell>
                  <TableCell sx={cellBodyStyle}>{item.referral_id}</TableCell>
                  <TableCell sx={cellBodyStyle}>{item.amount}</TableCell>
                  <TableCell sx={cellBodyStyle}>{item.percentage}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={noDataStyle}>No commission data found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default CommissionView;