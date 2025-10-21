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
  Pagination,
  Button,
  TableContainer,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from '../../../BaseURL/BaseURL';

function Chatbot() {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling

  // ✅ Fetch Q&A data from API
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

  // ✅ Handle Create Q&A click
  const handleCreate = () => {
    navigate("/a-createq&a"); // Change this route as needed
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 4 }}>
        {/* ✅ Title & Button Row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4"
        gutterBottom  sx={{
          fontSize: {
            xs: "2.0rem",
            sm: "2.1rem",
            md: "2.2rem",
          },
          fontWeight: "bold",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginBottom: "15px",
        }}>
            Chatbot Q&A Table
          </Typography>

          {/* ✅ Create Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
          >
            Create Q&A
          </Button>
        </Box>

        {/* ✅ Loading and Error Handling */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
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
                {data.length > 0 ? (
                  data.map((item, index) => (
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
        )}

        {/* ✅ Optional Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination count={1} color="primary" />
        </Box>
      </Box>
    </>
  );
}

export default Chatbot;
