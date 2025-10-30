import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Navbar/Navbar";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Pagination,
  Box,
  Button,
  Tooltip,
  IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";     // ✅ Import added
import DeleteIcon from "@mui/icons-material/Delete"; // ✅ Import added
import { baseurl } from "../../../BaseURL/BaseURL";

const UpVdHowitworks = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);

  // ✅ Show 6 per page (3 per row × 2 rows)
  const itemsPerPage = 6;

useEffect(() => {
  const fetchVideos = async () => {
    try {
      const res = await fetch(`${baseurl}/how-it-works/`);
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error("❌ Failed to fetch videos:", err);
    }
  };
  fetchVideos();
}, []);

  // Pagination
  const totalPages = Math.ceil(videos.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedVideos = videos.slice(startIndex, startIndex + itemsPerPage); // ✅ use this

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Converts normal YouTube URLs to embed URLs
  const getEmbedUrl = (url) => {
    if (!url) return "";
    try {
      const videoId = url.includes("youtu.be")
        ? url.split("/").pop().split("?")[0]
        : new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (err) {
      console.error("Invalid YouTube URL:", url);
      return "";
    }
  };

  return (
    <>
      <Header />
      <Container sx={{ mt: 4, width: "80%", margin: "auto" }}>
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
          How It Works Videos
        </Typography>

        {/* Add Video Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button variant="contained" onClick={() => navigate("/a-addvideo")}>
            Add Video
          </Button>
        </Box>

        {/* Video Grid */}
        <Grid container spacing={4}>
          {paginatedVideos.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Box sx={{ position: "relative" }}>
                  <iframe
                    src={getEmbedUrl(video.video_url)}
                    title={video.title}
                    style={{ width: "100%", height: "200px", border: 0 }}
                    allowFullScreen
                  />
                </Box>
                <CardContent>
                  {video.title && (
                    <Typography variant="h6" gutterBottom>
                      {video.title}
                    </Typography>
                  )}
                  {video.description && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {video.description}
                    </Typography>
                  )}

                  {/* ✅ Edit + Delete Icons */}
                  <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
                        <Tooltip title="Edit">
      <IconButton
        sx={{ color: "#1976d2" }}
        onClick={() => navigate(`/a-editvideo/${video.id}`)}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>

               

<Tooltip title="Delete">
 <IconButton
  sx={{ color: "#d32f2f" }}
  onClick={async () => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      const res = await fetch(`${baseurl}/how-it-works/${video.id}/`, { method: "DELETE" });

      if (!res.ok) throw new Error("Failed to delete video");

      // ✅ Remove deleted video from state to update UI immediately
      setVideos(prev => prev.filter(v => v.id !== video.id));

      alert("Video deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting video:", err);
      alert("Error deleting video. Please try again.");
    }
  }}
>
  <DeleteIcon />
</IconButton>
</Tooltip>

                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, mb: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default UpVdHowitworks;
