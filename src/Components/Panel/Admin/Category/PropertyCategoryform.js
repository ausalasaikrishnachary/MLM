import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box
} from "@mui/material";
import Header from "../../../Shared/Navbar/Navbar";  // ✅ Added here
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddPropertyCategory() {
  const [formData, setFormData] = useState({ name: "" });
  const navigate = useNavigate();

  const CATEGORY_URL = "https://rahul30.pythonanywhere.com/property-categories/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(CATEGORY_URL, formData);
      alert("Category added successfully!");
      navigate("/tablecategory");
    } catch (err) {
      console.error("Error posting:", err);
      alert("Error adding category");
    }
  };

  return (
    <>
      <Header /> {/* ✅ Navbar appears at the top */}

      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
          Add Property Category
        </h2>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Category Name"
            name="name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            sx={{ mb: 3 }}
          />

          <Box sx={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" color="success">
              Add Category
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default AddPropertyCategory;
