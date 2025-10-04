import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Header from "../../../Shared/Navbar/Navbar";

const AddVideo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
  });

  // Handle inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(
      "https://rahul30.pythonanywhere.com/how-it-works/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload video");
    }

    const result = await response.json();
    console.log("✅ Video Uploaded:", result);

    // ✅ Show popup alert
    alert("Video submitted successfully!");

    // ✅ Redirect to video listing page
    navigate("/a-upvdhowitworks");
  } catch (error) {
    console.error("❌ Error uploading:", error);
    alert("Error submitting video. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Add Video
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              margin="normal"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
            />

            <TextField
              label="Video URL"
              name="video_url"
              fullWidth
              margin="normal"
              value={formData.video_url}
              onChange={handleChange}
              required
            />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Submit"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default AddVideo;
