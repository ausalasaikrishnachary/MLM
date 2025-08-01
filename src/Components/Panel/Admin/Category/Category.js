import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from '../../../BaseURL/BaseURL';

function Category() {
  const [categoryName, setCategoryName] = useState('');
  const [typeName, setTypeName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [allCategories, setAllCategories] = useState([]);

  const CATEGORY_URL = `${baseurl}/property-categories/`;
  const TYPE_URL = `${baseurl}/property-types/`;

  // Fetch all categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_URL);
      setAllCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) return Swal.fire('Error', 'Please enter a category name', 'error');

    try {
      const res = await axios.post(CATEGORY_URL, { name: categoryName });
      Swal.fire('Success', 'Category Created', 'success');
      setCategoryName('');
      fetchCategories(); // Refresh list
    } catch (err) {
      Swal.fire('Error', 'Failed to create category', 'error');
    }
  };

  const handleCreateType = async () => {
    if (!selectedCategory || !typeName.trim()) {
      return Swal.fire('Error', 'Please select category and enter type name', 'error');
    }

    try {
      const res = await axios.post(TYPE_URL, {
        category: selectedCategory,
        name: typeName,
      });
      Swal.fire('Success', 'Type Created', 'success');
      setTypeName('');
      setSelectedCategory('');
    } catch (err) {
      Swal.fire('Error', 'Failed to create type', 'error');
    }
  };

  return (
    <>
    <Header />
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create Category
      </Typography>
      <Box mb={3}>
        <TextField
          label="Category Name"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleCreateCategory}
        >
          Add Category
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        Create Type Under Category
      </Typography>
      <Box>
        <TextField
          select
          label="Select Category"
          fullWidth
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ mb: 2 }}
        >
          {allCategories.map((cat) => (
            <MenuItem key={cat.property_category_id} value={cat.property_category_id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Type Name"
          fullWidth
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleCreateType}
        >
          Add Type
        </Button>
      </Box>
    </Container>
    </>
  );
}

export default Category;
