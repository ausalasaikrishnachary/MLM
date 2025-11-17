import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Navbar/Navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
  IconButton,
  Container,
  Pagination
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { baseurl } from "../../../BaseURL/BaseURL";

function TableCategory() {
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  // Styling – Matches your CommissionLevels UI
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

  const TYPE_URL = `${baseurl}/property-types/`;
  const CATEGORY_URL = `${baseurl}/property-categories/`;

  useEffect(() => {
    fetchTypes();
    fetchCategories();
  }, []);

  const fetchTypes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(TYPE_URL);
      setTypes(res.data);
      setPage(1);
    } catch (err) {
      console.error("Error fetching types:", err);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_URL);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const getCategoryName = (id) => {
    const found = categories.find(
      (cat) => cat.property_category_id === id
    );
    return found ? found.name : "Unknown";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this property type?")) return;

    try {
      await axios.delete(`${TYPE_URL}${id}/`);
      fetchTypes();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(types.length / itemsPerPage);

  const paginatedData = types.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Header />
      <Container>
        <div style={{ textAlign: "center", marginTop: "8%" }}>
          <h2 style={{ fontWeight: "bold" }}>Property Types</h2>
        </div>

        {/* Add Category Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/a-category")}
          >
            Add Category
          </Button>
        </Box>

        {/* Table */}
        <Table sx={{ border: "1px solid black", width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>ID</TableCell>
              <TableCell sx={cellStyle}>Type Name</TableCell>
              <TableCell sx={cellStyle}>Category</TableCell>
              <TableCell sx={cellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} sx={noDataStyle}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow key={item.property_type_id}>
                  <TableCell sx={cellBodyStyle}>
                    {item.property_type_id}
                  </TableCell>

                  <TableCell sx={cellBodyStyle}>{item.name}</TableCell>

                  <TableCell sx={cellBodyStyle}>
                    {getCategoryName(item.category)}
                  </TableCell>

                  <TableCell sx={cellBodyStyle}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                    <IconButton
  color="primary"
  size="small"
  onClick={() => navigate(`/editcategory/${item.property_type_id}`)}
>
  <EditIcon fontSize="small" />
</IconButton>


                      <IconButton
                        color="error"
                        size="small"
                        onClick={() =>
                          handleDelete(item.property_type_id)
                        }
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={noDataStyle}>
                  No types found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {!loading && types.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: 0,
                },
              }}
            />
          </Box>
        )}
      </Container>
    </>
  );
}

export default TableCategory;
