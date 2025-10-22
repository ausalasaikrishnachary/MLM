import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Navbar/Navbar";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  TableContainer,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../../BaseURL/BaseURL";
import PaginationComponent from "../../../Shared/Pagination";

function Chatbot() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Pagination states
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseurl}/responses/`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreate = () => {
    navigate("/a-createq&a");
  };

  // ✅ Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <Header />
      <Box sx={{ p: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: { xs: "2.0rem", sm: "2.1rem", md: "2.2rem" },
              fontWeight: "bold",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: "15px",
            }}
          >
            Chatbot Q&A Table
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
          >
            Create Q&A
          </Button>
        </Box>

        {/* Loader / Error */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Question No.</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Question</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Answer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{item.question_number}</TableCell>
                        <TableCell>{item.question}</TableCell>
                        <TableCell>{item.answer}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* ✅ Pagination */}
            {!loading && data.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <PaginationComponent
                  count={totalPages}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
}

export default Chatbot;
