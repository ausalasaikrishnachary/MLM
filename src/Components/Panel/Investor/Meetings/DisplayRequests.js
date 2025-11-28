import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableLayout from '../../../Shared/TableLayout';
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import { baseurl } from '../../../BaseURL/BaseURL';
import { Pagination, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function DisplayRequests() {
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const rowsPerPage = 8;
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    axios.get(`${baseurl}/departments/`)
      .then(res => setDepartments(res.data))
      .catch(err => console.log("Departments fetch error:", err));
  }, []);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseurl}/meeting-requests/${id}/`);

      setData(prev => prev.filter(item => item.request_id !== id));

    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const processedData = data.map(item => ({
    ...item,
    department_name: departments.find(d => d.id === Number(item.department))?.name || "N/A",
    actions: (
      <IconButton color="error" onClick={() => handleDelete(item.request_id)}>
        <DeleteIcon />
      </IconButton>
    )
  }));

  // Auto adjust page when deleting last row on current page
  useEffect(() => {
    const totalPages = Math.ceil(processedData.length / rowsPerPage);
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [processedData, page]);

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
      <InvestorHeader />

      <TableLayout
        title="Meeting Requests"
        headers={headers}
        data={paginatedData}
        loading={loading}
        showActions={false}
      />

      {/* SINGLE Pagination only (no duplicate now) */}
      <Box display="flex" justifyContent="flex-end" mt={2} mr={12}>
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
