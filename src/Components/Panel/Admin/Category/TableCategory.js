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
  Pagination,
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { baseurl } from "../../../BaseURL/BaseURL";

function TableCategory() {
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pageCat, setPageCat] = useState(1);
  const [pageType, setPageType] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  const TYPE_URL = `${baseurl}/property-types/`;
  const CATEGORY_URL = `https://rahul30.pythonanywhere.com/property-categories/`;

  // SAME UI STYLE AS COMMISSION LEVELS
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

  useEffect(() => {
    fetchCategories();
    fetchTypes();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_URL);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchTypes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(TYPE_URL);
      setTypes(res.data);
    } catch (err) {
      console.error("Error fetching types:", err);
    }
    setLoading(false);
  };

  // DELETE CATEGORY
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Do you want to delete this category?")) return;

    try {
      await axios.delete(`${CATEGORY_URL}${id}/`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // DELETE TYPE
  const handleDeleteType = async (id) => {
    if (!window.confirm("Do you want to delete this property type?")) return;

    try {
      await axios.delete(`${TYPE_URL}${id}/`);
      fetchTypes();
    } catch (error) {
      console.error("Error deleting type:", error);
    }
  };

  const getCategoryName = (id) => {
    const found = categories.find((cat) => cat.property_category_id === id);
    return found ? found.name : "Unknown";
  };

  const paginate = (data, page) =>
    data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <Header />
      <Container>

        {/* CATEGORY TABLE */}
        <div style={{ textAlign: "center", marginTop: "5%" }}>
          <h2 style={{ fontWeight: "bold" }}>Property Categories</h2>
        </div>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/propertycategoryform")}
          >
            Add Property Category
          </Button>
        </Box>

        <Table sx={{ border: "1px solid black", width: "100%", mb: 5 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>S.No</TableCell>
              <TableCell sx={cellStyle}>Category Name</TableCell>
              <TableCell sx={cellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.length > 0 ? (
              paginate(categories, pageCat).map((cat, index) => (
                <TableRow key={cat.property_category_id}>
                  <TableCell sx={cellBodyStyle}>
                    {(pageCat - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell sx={cellBodyStyle}>{cat.name}</TableCell>

                  <TableCell sx={cellBodyStyle}>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() =>
                        handleDeleteCategory(cat.property_category_id)
                      }
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} sx={noDataStyle}>
                  No categories found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* CATEGORY Pagination */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Pagination
            count={Math.ceil(categories.length / itemsPerPage)}
            page={pageCat}
            onChange={(_, value) => setPageCat(value)}
            color="primary"
            sx={{ "& .MuiPaginationItem-root": { borderRadius: 0 } }}
          />
        </Box>

        {/* TYPES TABLE */}
        <div style={{ textAlign: "center", marginTop: "3%" }}>
          <h2 style={{ fontWeight: "bold" }}>Property Types</h2>
        </div>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/a-category")}
          >
            Add Property Type
          </Button>
        </Box>

        <Table sx={{ border: "1px solid black", width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>S.No</TableCell>
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
            ) : paginate(types, pageType).length > 0 ? (
              paginate(types, pageType).map((item, index) => (
                <TableRow key={item.property_type_id}>
                  <TableCell sx={cellBodyStyle}>
                    {(pageType - 1) * itemsPerPage + index + 1}
                  </TableCell>

                  <TableCell sx={cellBodyStyle}>{item.name}</TableCell>

                  <TableCell sx={cellBodyStyle}>
                    {getCategoryName(item.category)}
                  </TableCell>

                  <TableCell sx={cellBodyStyle}>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() =>
                          navigate(`/editcategory/${item.property_type_id}`)
                        }
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteType(item.property_type_id)}
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

        {/* TYPES Pagination */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Pagination
            count={Math.ceil(types.length / itemsPerPage)}
            page={pageType}
            onChange={(_, value) => setPageType(value)}
            color="primary"
            sx={{ "& .MuiPaginationItem-root": { borderRadius: 0 } }}
          />
        </Box>
      </Container>
    </>
  );
}

export default TableCategory;
