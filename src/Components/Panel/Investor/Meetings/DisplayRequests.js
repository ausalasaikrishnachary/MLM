import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableLayout from '../../../Shared/TableLayout';
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import { baseurl } from '../../../BaseURL/BaseURL';
import { Pagination, Box } from '@mui/material';

function DisplayRequests() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
   const userId = localStorage.getItem("user_id");


  const headers = [
    { key: 'request_id', label: 'Request ID' },
    // { key: 'referral_id', label: 'Referral ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'profile_type', label: 'Profile Type' },
    { key: 'requested_date', label: 'Requested Date' },
    { key: 'requested_time', label: 'Requested Time' },
    // { key: 'is_scheduled', label: 'Scheduled' },
    // { key: 'created_at', label: 'Created At' },
    // { key: 'user_id', label: 'User ID' },
  ];

 

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

   // Paginate the data
  const paginatedData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <InvestorHeader />
      <Box sx={{ mt: 4 }}>
  <TableLayout
    title="Meeting Requests"
    headers={headers}
    data={data}
    loading={loading}
    showActions={false}
  />
</Box>

      {/* Pagination Control */}
      <Box display="flex" justifyContent="flex-end" mt={2} mr={12}>
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
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
