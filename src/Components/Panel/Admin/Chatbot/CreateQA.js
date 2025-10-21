import React, { useState } from "react";
import Header from "../../../Shared/Navbar/Navbar";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { baseurl } from "../../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom"; // ✅ For navigation

function CreateQA() {
  const [formData, setFormData] = useState({
    question_number: "",
    question: "",
    answer: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigation

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission (POST API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${baseurl}/responses/`, formData);

      // ✅ SweetAlert on success
      Swal.fire({
        icon: "success",
        title: "Q&A Created!",
        text: "Your Q&A has been added successfully.",
        confirmButtonColor: "#1976d2",
      }).then(() => {
        navigate("/a-chatbot"); // ✅ Navigate after alert confirmation
      });

      // Reset form
      setFormData({ question_number: "", question: "", answer: "" });
    } catch (error) {
      console.error("Error creating Q&A:", error);

      // ❌ SweetAlert on error
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Unable to create Q&A. Please try again.",
        confirmButtonColor: "#d32f2f",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Paper
          sx={{
            p: 4,
            maxWidth: 600,
            width: "100%",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Create New Q&A
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Question Number"
              name="question_number"
              type="number"
              value={formData.question_number}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Answer"
              name="answer"
              multiline
              rows={4}
              value={formData.answer}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
}

export default CreateQA;
