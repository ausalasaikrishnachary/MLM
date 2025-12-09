import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Pagination,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FlagIcon from "@mui/icons-material/Flag";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseurl } from "../../../BaseURL/BaseURL";

const AboutUs = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const videosPerPage = 3; // ✅ 2 rows × 3 videos

  // ✅ Fetch videos from API
  useEffect(() => {
    axios
      .get(`${baseurl}/how-it-works/`)
      .then((res) => {
        setVideos(res.data); // API returns array of { title, description, video_url }
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
      });
  }, []);

  // ✅ Pagination logic
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const indexOfLastVideo = page * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  // ✅ Converts normal YouTube URLs to embed URLs
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container sx={{ mt: 5, maxWidth: "80%", display: "flex", justifyContent: "center" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <CardContent>
            <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
              How It Works – Investing with Shriraj
            </Typography>
            <Typography variant="body1" paragraph>
              ShriRaj Team Business Community is a group where entrepreneurs, business
              owners, and professionals connect with each other, share experiences, expand
              their network, and create growth opportunities together.
            </Typography>



            {/* ✅ Vision, Mission, Values Section */}
            <Box mt={4}>
              <Grid container spacing={4} justifyContent="center">

                {/* Our Vision */}
                <Grid item xs={12} md={4}>
                  <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" px={2}>
                    <VisibilityIcon fontSize="large" sx={{ mb: 1, color: "primary.main" }} />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Our Vision
                    </Typography>

                    <Typography variant="body2" sx={{ maxWidth: "280px" }}>
                      “Where businesses grow together.”
                    </Typography>
                    <Typography variant="body2" sx={{ maxWidth: "280px" }}>
                      “Stronger connections, endless opportunities.”
                    </Typography>
                    <Typography variant="body2" sx={{ maxWidth: "280px" }}>
                      “Learn, connect, grow.”
                    </Typography>
                    <Typography variant="body2" sx={{ maxWidth: "280px" }}>
                      “Your network, your progress.”
                    </Typography>
                    <Typography variant="body2" sx={{ maxWidth: "280px" }}>
                      “Support for entrepreneurs, a path to success.”
                    </Typography>
                  </Box>
                </Grid>

                {/* Our Mission */}
                <Grid item xs={12} md={4}>
                  <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" px={2}>
                    <FlagIcon fontSize="large" sx={{ mb: 1, color: "secondary.main" }} />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Our Mission
                    </Typography>

                    <Typography variant="body2" sx={{ maxWidth: "280px", mb: 2 }}>
                      Join the ShriRaj Team Business Community! Entrepreneurs, startups and professionals come together to learn, build
                      networks, and gain new opportunities.
                    </Typography>

                    <Typography variant="body2">• Networking</Typography>
                    <Typography variant="body2">• Experience Sharing</Typography>
                    <Typography variant="body2">• Business Guidance</Typography>
                    <Typography variant="body2">• Growth Events</Typography>
                  </Box>
                </Grid>

                {/* Our Values */}
                <Grid item xs={12} md={4}>
                  <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" px={2}>
                    <VerifiedUserIcon fontSize="large" sx={{ mb: 1, color: "success.main" }} />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Our Values
                    </Typography>

                    <Typography variant="body2" sx={{ maxWidth: "280px" }}>
                      We uphold integrity, transparency, and trust to support strong and reliable business growth.
                    </Typography>
                  </Box>
                </Grid>

              </Grid>
            </Box>


            




          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
