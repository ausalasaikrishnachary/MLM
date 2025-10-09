import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from "../../../BaseURL/BaseURL";

const EditVideo = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // video ID from route
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
  });

  // Fetch video data by ID on component mount
useEffect(() => {
  const fetchVideo = async () => {
    try {
      const response = await fetch(`${baseurl}how-it-works/${id}/`); // using baseurl
      if (!response.ok) throw new Error("Failed to fetch video data");

      const data = await response.json();
      setFormData({
        title: data.title || "",
        description: data.description || "",
        video_url: data.video_url || "",
      });
    } catch (error) {
      console.error("Error fetching video:", error);
      alert("Error fetching video data");
    }
  };

  fetchVideo();
}, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(
      `${baseurl}how-it-works/${id}/`, // using baseurl
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) throw new Error("Failed to update video");

    const result = await response.json();
    console.log("✅ Video Updated:", result);
    alert("Video updated successfully!");
    navigate("/a-upvdhowitworks");
  } catch (error) {
    console.error("❌ Error updating:", error);
    alert("Error updating video. Please try again.");
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
            Edit Video
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
                {loading ? "Updating..." : "Update"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default EditVideo;
