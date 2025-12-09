import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Navbar/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { baseurl } from "../../../BaseURL/BaseURL";
import { useNavigate, useParams } from "react-router-dom";

function EditQA() {
  const { id } = useParams(); // Get ID from URL
  const [formData, setFormData] = useState({
    question_number: "",
    question: "",
    answer: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  // Fetch existing Q&A data by ID
  useEffect(() => {
    const fetchQA = async () => {
      try {
        const res = await axios.get(`${baseurl}/responses/${id}/`);
        setFormData({
          question_number: res.data.question_number,
          question: res.data.question,
          answer: res.data.answer,
        });
      } catch (error) {
        console.error("Error fetching Q&A:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch Q&A data",
          confirmButtonColor: "#d32f2f",
        });
      } finally {
        setFetching(false);
      }
    };
    fetchQA();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (PUT API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${baseurl}/responses/${id}/`, formData);

      Swal.fire({
        icon: "success",
        title: "Q&A Updated!",
        text: "Your Q&A has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/a-chatbot");
      });
    } catch (error) {
      console.error("Error updating Q&A:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Unable to update Q&A. Please try again.",
        confirmButtonColor: "#d32f2f",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <>
        <Header />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ padding: 4 }}>
        {/* Page Title */}
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "2.0rem", sm: "2.1rem", md: "2.2rem" },
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          Edit Q&A
        </Typography>

        {/* Form Box */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%" }}
        >
          <Grid container spacing={3} justifyContent="center">
            <Grid container item spacing={3} xs={12}>
              {/* Question Number */}
              {/* <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Question Number"
                  name="question_number"
                  type="number"
                  value={formData.question_number}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid> */}

              {/* Question */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Answer */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Answer"
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  multiline
                  rows={1}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Grid container justifyContent="center">
              <Grid item xs="auto">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ height: "46px", fontSize: "1rem", mt: 2, px: 4 }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Update Q&A"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default EditQA;
