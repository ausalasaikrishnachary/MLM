import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Container,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { baseurl } from "../../../BaseURL/BaseURL";
import PaginationComponent from "../../../Shared/Pagination";

const Sitevisit = () => {
  const [siteVisits, setSiteVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const rowsPerPage = 5;

  // Fetch site visits
  const fetchSiteVisits = async () => {
    try {
      const response = await axios.get(`${baseurl}/site-visits/`);
      setSiteVisits(response.data);
      setFilteredVisits(response.data);
    } catch (error) {
      console.error("Error fetching site visits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteVisits();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = siteVisits.filter((visit) => {
      return (
        (visit.date || "").toLowerCase().includes(query) ||
        (visit.time || "").toLowerCase().includes(query) ||
        (visit.site_name || "").toLowerCase().includes(query) ||
        (visit.site_owner_name || "").toLowerCase().includes(query) ||
        (visit.site_owner_mobile_number || "").toLowerCase().includes(query) ||
        (visit.site_owner_email || "").toLowerCase().includes(query) ||
        (visit.site_location || "").toLowerCase().includes(query) ||
        (visit.customer_name || "").toLowerCase().includes(query) ||
        (visit.customer_mobile_number || "").toLowerCase().includes(query) ||
        (visit.remarks || "").toLowerCase().includes(query)
      );
    });

    setFilteredVisits(filtered);
    setPage(1);
  };

  const paginatedData = filteredVisits.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const pageCount = Math.ceil(filteredVisits.length / rowsPerPage);

  const cellStyle = {
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid #000",
    backgroundColor: "#f0f0f0",
  };

  const cellBodyStyle = {
    textAlign: "center",
    border: "1px solid #000",
  };

  const noDataStyle = {
    textAlign: "center",
    border: "1px solid #000",
    padding: 2,
  };

  const handleImageClick = (imgUrl) => {
    // Prepend baseurl if it's just a filename
    const fullUrl = imgUrl.startsWith("http") ? imgUrl : `${baseurl}/${imgUrl}`;
    setSelectedImage(fullUrl);
    setImageDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setImageDialogOpen(false);
    setSelectedImage(null);
  };

  const handleEdit = (id) => {
    navigate(`/p-editsitevisit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this site visit?")) {
      try {
        await axios.delete(`${baseurl}/site-visits/${id}/`);
        fetchSiteVisits(); // refresh data
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };



  return (
    <>
      <PartnerHeader />
      <Container sx={{ mt: 10 }}>
        <Box sx={{ flex: 1, textAlign: "center", mb: 2 }}>
          <Typography variant="h4" fontWeight="bold">
            Site Visits
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField
            label="Search Site Visits"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            size="medium"
            sx={{ width: { xs: "100%", sm: 300, md: 400 } }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/p-addsitevisit")}
          >
            + Add Site Visit
          </Button>
        </Box>

        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Table sx={{ border: "1px solid black", width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={cellStyle}>Date</TableCell>
                <TableCell sx={cellStyle}>Time</TableCell>
                <TableCell sx={cellStyle}>Site Name</TableCell>
                <TableCell sx={cellStyle}>Owner Name</TableCell>
                <TableCell sx={cellStyle}>Owner Mobile</TableCell>
                <TableCell sx={cellStyle}>Owner Email</TableCell>
                <TableCell sx={cellStyle}>Location</TableCell>
                <TableCell sx={cellStyle}>Customer Name</TableCell>
                <TableCell sx={cellStyle}>Customer Mobile</TableCell>
                <TableCell sx={cellStyle}>Remarks</TableCell>
                <TableCell sx={cellStyle}>Photo</TableCell>
                <TableCell sx={cellStyle}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={12} sx={noDataStyle}>
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((visit, index) => (
                  <TableRow key={index}>
                    <TableCell sx={cellBodyStyle}>{visit.date}</TableCell>
                    <TableCell sx={cellBodyStyle}>{visit.time}</TableCell>
                    <TableCell sx={cellBodyStyle}>{visit.site_name}</TableCell>
                    <TableCell sx={cellBodyStyle}>{visit.site_owner_name}</TableCell>
                    <TableCell sx={cellBodyStyle}>{visit.site_owner_mobile_number}</TableCell>
                    <TableCell sx={cellBodyStyle}>{visit.site_owner_email}</TableCell>
                    <TableCell sx={cellBodyStyle}>{visit.site_location}</TableCell>
                    <TableCell sx={cellBodyStyle}>{visit.customer_name}</TableCell>
                    <TableCell sx={cellBodyStyle}>{visit.customer_mobile_number}</TableCell>
                    <TableCell sx={cellBodyStyle}>{visit.remarks}</TableCell>
                    <TableCell sx={cellBodyStyle}>
                      {visit.site_photo ? (
                        <img
                          src={visit.site_photo.startsWith("http") ? visit.site_photo : `${baseurl}/${visit.site_photo}`}
                          alt="Site"
                          style={{ width: 50, height: 50, cursor: "pointer", objectFit: "cover" }}
                          onClick={() => handleImageClick(visit.site_photo)}
                        />
                      ) : (
                        "No Image"
                      )}
                    </TableCell>
                    <TableCell sx={cellBodyStyle}>
                      <IconButton onClick={() => handleEdit(visit.id)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(visit.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={12} sx={noDataStyle}>
                    No Site Visits Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        <PaginationComponent
          count={pageCount}
          page={page}
          onChange={(e, value) => setPage(value)}
        />

        <Dialog open={imageDialogOpen} onClose={handleCloseDialog} maxWidth="lg">
          <DialogContent sx={{ position: "relative", p: 0 }}>
            <IconButton
              sx={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}
              onClick={handleCloseDialog}
            >
              <CloseIcon />
            </IconButton>
            {selectedImage && (
              <img
                src={selectedImage.startsWith("http") ? selectedImage : `${baseurl}/${selectedImage}`}
                alt="Site Large"
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default Sitevisit;
