import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  Typography,
  MenuItem
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from "../../../BaseURL/BaseURL";
import PaginationComponent from "../../../Shared/Pagination";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


const Tmanagement = () => { 
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("All");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const rowsPerPage = 5;

  // Fetch data
  useEffect(() => {
    axios
      .get(`${baseurl}/users/`)
      .then((res) => {
        const transformed = res.data.map((user) => ({
          id: user.user_id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          phone: user.phone_number,
          status: user.status,
          role: user.roles[0]?.role_name || "",
          referralId: user.referral_id,
          kycStatus: user.kyc_status,
          fullData: user,
          created_at: user.created_at,
          status: user.status
        }));
        setData(transformed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  // Unique roles for filter dropdown
  const uniqueRoles = ["All", ...new Set(data.map((user) => user.role).filter(Boolean))];

  const filteredData =
    selectedRole === "All"
      ? data
      : data.filter((user) => user.role === selectedRole);

  // Apply search filter
  const searchedData = filteredData.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Pagination uses searchedData instead of filteredData
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = searchedData.slice(startIndex, startIndex + rowsPerPage);
  const pageCount = Math.ceil(searchedData.length / rowsPerPage);




  // Reset to page 1 when filter changes
  useEffect(() => {
    setPage(1);
  }, [selectedRole]);

  const handleView = (user) => {
    navigate("/View_Tmanagement", { state: { user } });
  };

  const handleEdit = (user) => {
    navigate("/Edit_Tmanagement", { state: { user } });
  };

  const handleDelete = (user_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseurl}/users/${user_id}/`) // <-- ensure trailing slash
          .then((res) => {
            if (res.status === 204 || res.status === 200) {
              setData((prevData) =>
                prevData.filter((user) => user.id !== user_id)
              );
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "User has been deleted.",
                timer: 2000,
                showConfirmButton: false
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Failed to delete user."
              });
            }
          })
          .catch((err) => {
            console.error(
              "Error deleting user:",
              err.response ? err.response.data : err
            );
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error deleting user, please try again."
            });
          });
      }
    });
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.put(`${baseurl}/users/${userId}/`, { status: newStatus });
      setData((prevData) =>
        prevData.map((user) =>
          user.id === userId
            ? {
              ...user,
              status: newStatus,
              fullData: { ...user.fullData, status: newStatus },
            }
            : user
        )
      );
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Status updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error updating status:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update status.",
      });
    }
  };


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Styles
  const cellStyle = {
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid #000",
    backgroundColor: "#f0f0f0"
  };

  const cellBodyStyle = {
    textAlign: "center",
    border: "1px solid #000"
  };

  const noDataStyle = {
    textAlign: "center",
    border: "1px solid #000",
    padding: 2
  };

  return (
    <>
      <Header />
      <Container sx={{ mt: 7 }}>
      <div style={{ textAlign: 'center', marginTop: "7%" }}>
                <Typography
                                       variant="h4"
                                       sx={{
                                           fontSize: {
                                               xs: "1.8rem",
                                               sm: "2.1rem",
                                               md: "2.0rem",
                                           },
                                           fontWeight: "bold",
                                           whiteSpace: "nowrap",
                                           overflow: "hidden",
                                           textOverflow: "ellipsis",
                                           textAlign:'center',
                                           marginBottom:'10px',
                                       }}
                                   >
                  Users Table
                </Typography>
              </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            mt: 5
          }}
        >
          {/* Filter Dropdown */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="role-filter-label">Filter by Role</InputLabel>
            <Select
              labelId="role-filter-label"
              value={selectedRole}
              label="Filter by Role"
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {uniqueRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role === "Agent"
                    ? "Team"
                    : role === "Client"
                      ? "User"
                      : role || "Unknown"}
                </MenuItem>

              ))}
            </Select>
          </FormControl>

          {/* Search Bar */}
          <Box>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "10px",
                width: "250px",
                fontSize: "14px",
                borderRadius: "4px",
                border: "1px solid #999"
              }}
            />
          </Box>
        </Box>



        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            display: "block",
          }}
        >
          <Table sx={{ border: "1px solid black", width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={cellStyle}>User ID</TableCell>
                <TableCell sx={cellStyle}>Name</TableCell>
                <TableCell sx={cellStyle}>Email</TableCell>
                <TableCell sx={cellStyle}>Phone</TableCell>
                <TableCell sx={cellStyle}>Role</TableCell>
                <TableCell sx={cellStyle}>Referral ID</TableCell>
                <TableCell sx={cellStyle}>Created At</TableCell>
                <TableCell sx={cellStyle}>Status </TableCell>
                <TableCell sx={cellStyle}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} sx={noDataStyle}>
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredData.length > 0 ? (
                paginatedData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell sx={cellBodyStyle}>{user.id}</TableCell>
                    <TableCell sx={cellBodyStyle}>{user.name}</TableCell>
                    <TableCell sx={cellBodyStyle}>{user.email}</TableCell>
                    <TableCell sx={cellBodyStyle}>{user.phone}</TableCell>
                    <TableCell sx={cellBodyStyle}>
                      {user.role === "Agent" ? "Team" : user.role}
                    </TableCell>
                    <TableCell sx={cellBodyStyle}>{user.referralId}</TableCell>
                    <TableCell sx={cellBodyStyle}>
                      {new Date(user.created_at).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell sx={cellBodyStyle}>
                      <Select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        size="small"
                        sx={{
                          minWidth: 100,
                          color: user.status === "active" ? "green" : "red", // ✅ dynamic text color
                          fontWeight: "bold",
                        }}
                      >
                        <MenuItem value="active" sx={{ color: "green", }}>Active</MenuItem>
                        <MenuItem value="inactive" sx={{ color: "red", }}>Inactive</MenuItem>
                      </Select>
                    </TableCell>

                    <TableCell sx={cellBodyStyle}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "5px"
                        }}
                      >
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleView(user.fullData)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="warning"
                          size="small"
                          onClick={() => handleEdit(user.fullData)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDelete(user.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} sx={noDataStyle}>
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>

          {pageCount > 1 && (
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Box display="flex" alignItems="center" gap={1}>
                {/* Prev Button */}
                <IconButton
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  sx={{
                    borderRadius: "4px", // square button
                    width: { xs: 32, sm: 36, md: 40 },
                    height: { xs: 32, sm: 36, md: 40 },
                  }}
                >
                  <ChevronLeftIcon
                    fontSize="small"
                    sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }}
                  />
                </IconButton>

                {/* Show only 3 pages (current, prev, next) */}
                {[...Array(pageCount)].map((_, i) => {
                  const pageNum = i + 1;
                  if (
                    pageNum === page ||
                    pageNum === page - 1 ||
                    pageNum === page + 1
                  ) {
                    return (
                      <IconButton
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        sx={{
                          borderRadius: "4px", // square
                          width: { xs: 32, sm: 36, md: 35 },
                          height: { xs: 32, sm: 36, md: 38 },
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                          backgroundColor: page === pageNum ? "primary.main" : "transparent",
                          color: page === pageNum ? "#fff" : "inherit",
                          "&:hover": {
                            backgroundColor:
                              page === pageNum ? "primary.dark" : "#f0f0f0",
                          },
                        }}
                      >
                        {pageNum}
                      </IconButton>
                    );
                  }
                  return null;
                })}

                {/* Next Button */}
                <IconButton
                  disabled={page === pageCount}
                  onClick={() => setPage(page + 1)}
                  sx={{
                    borderRadius: "4px", // square button
                    width: { xs: 32, sm: 36, md: 40 },
                    height: { xs: 32, sm: 36, md: 40 },
                  }}
                >
                  <ChevronRightIcon
                    fontSize="small"
                    sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }}
                  />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Tmanagement;