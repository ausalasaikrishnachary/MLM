import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableLayout from '../../../Shared/TableLayout';
import Header from "../../../Shared/Partner/PartnerNavbar";
import { baseurl } from '../../../BaseURL/BaseURL';
import { Pagination, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function DisplayRequests() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  const userId = localStorage.getItem("user_id");

  // Fetch departments
  useEffect(() => {
    axios.get(`${baseurl}/departments/`)
      .then(res => setDepartments(res.data))
      .catch(err => console.log("Departments fetch error:", err));
  }, []);

  // Fetch meeting requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseurl}/meeting-requests/user-id/${userId}/`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching meeting requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // DELETE handler - FIXED
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseurl}/meeting-requests/${id}/`);

      const updated = data.filter(item => item.request_id !== id);
      setData(updated);

      // ✔ CHECK PAGE AFTER DATA UPDATE
      const totalPages = Math.ceil(updated.length / rowsPerPage);

      // If page is now empty → go to previous valid page
      if (page > totalPages) {
        setPage(totalPages === 0 ? 1 : totalPages);
      }

    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ADD department name + action button
  const processedData = data.map(item => ({
    ...item,
    department_name:
      departments.find(d => d.id === Number(item.department))?.name || "N/A",

    actions: (
      <IconButton color="error" onClick={() => handleDelete(item.request_id)}>
        <DeleteIcon />
      </IconButton>
    )
  }));

  // PAGINATION applied HERE
  const paginatedData = processedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const headers = [
    { key: 'request_id', label: 'Request ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'department_name', label: 'Department' },
    { key: 'requested_date', label: 'Requested Date' },
    { key: 'requested_time', label: 'Requested Time' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <>
      <Header />

      <TableLayout
        title="Meeting Requests"
        headers={headers}
        data={paginatedData}
        loading={loading}
        showActions={false}
      />

      {/* PAGINATION UI */}
      <Box display="flex" justifyContent="flex-end" mt={2} mr={3}>
        <Pagination
          count={Math.ceil(processedData.length / rowsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          shape="rounded"
        />
      </Box>
    </>
  );
}

export default DisplayRequests;
