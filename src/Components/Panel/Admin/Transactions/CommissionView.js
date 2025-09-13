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
  IconButton,
} from "@mui/material";
import { baseurl } from '../../../BaseURL/BaseURL';
import axios from "axios";
import Header from "../../../Shared/Navbar/Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CommissionView = () => {
  const { transactionId } = useParams();
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Pagination logic
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = commissions.slice(startIndex, startIndex + rowsPerPage);
  const pageCount = Math.ceil(commissions.length / rowsPerPage);

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
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: { xs: "1.6rem", sm: "2.1rem", md: "2.2rem" },
              fontWeight: "bold",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: "15px",
            }}
          >
            Commission Breakdown
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Transaction ID: {transactionId}
          </Typography>
        </div>

        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
          <Button
            sx={{ p: 1, display: { xs: "none", sm: "flex" } }}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>

        <Box sx={{ width: "100%", overflowX: "auto", display: "block" }}>
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
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
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
        </Box>

        {/* Pagination */}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              sx={{ borderRadius: "4px", width: { xs: 32, sm: 36, md: 40 }, height: { xs: 32, sm: 36, md: 40 } }}
            >
              <ChevronLeftIcon fontSize="small" sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
            </IconButton>

            {[...Array(pageCount)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <IconButton
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  sx={{
                    borderRadius: "4px",
                    width: { xs: 32, sm: 36, md: 35 },
                    height: { xs: 32, sm: 36, md: 38 },
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    backgroundColor: page === pageNum ? "primary.main" : "transparent",
                    color: page === pageNum ? "#fff" : "inherit",
                    "&:hover": { backgroundColor: page === pageNum ? "primary.dark" : "#f0f0f0" },
                  }}
                >
                  {pageNum}
                </IconButton>
              );
            })}

            <IconButton
              disabled={page === pageCount}
              onClick={() => setPage(page + 1)}
              sx={{ borderRadius: "4px", width: { xs: 32, sm: 36, md: 40 }, height: { xs: 32, sm: 36, md: 40 } }}
            >
              <ChevronRightIcon fontSize="small" sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
            </IconButton>
          </Box>
        </Box>

      </Container>
    </>
  );
};

export default CommissionView;
