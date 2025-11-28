import React, { useState, useEffect } from "react";
import Header from "../../../Shared/Navbar/Navbar";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Container,
  IconButton,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { baseurl } from "../../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

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
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${baseurl}/departments/`);
      setDepartments(res.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this department?")) return;
    try {
      await axios.delete(`${baseurl}/departments/${id}/`);
      fetchDepartments();
    } catch (err) {
      console.error("Delete Error", err);
    }
  };

  const paginate = (data, page) =>
    data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <Header />
      <Container>

        <h2 style={{ textAlign: "center", marginTop: "5%", fontWeight: "bold" }}>
          Departments
        </h2>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/adddepartment")}
          >
            Add Department
          </Button>
        </Box>

        <Table sx={{ border: "1px solid black", width: "100%", mb: 5 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>S.No</TableCell>
              <TableCell sx={cellStyle}>Department Name</TableCell>
              <TableCell sx={cellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {departments.length > 0 ? (
              paginate(departments, page).map((dept, index) => (
                <TableRow key={dept.department_id}>
                  <TableCell sx={cellBodyStyle}>
                    {(page - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell sx={cellBodyStyle}>{dept.name}</TableCell>
                  <TableCell sx={cellBodyStyle}>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(dept.department_id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} sx={noDataStyle}>
                  No departments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Pagination
            count={Math.ceil(departments.length / itemsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            sx={{ "& .MuiPaginationItem-root": { borderRadius: 0 } }}
          />
        </Box>
      </Container>
    </>
  );
};

export default Departments;
