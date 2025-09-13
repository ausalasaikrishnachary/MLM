import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableLayout from '../../../Shared/TableLayout';
import Header from "../../../Shared/Partner/PartnerNavbar";
import { baseurl } from '../../../BaseURL/BaseURL';

function DisplayRequests() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

   const userId = localStorage.getItem("user_id");

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
  }, []);

  return (
    <>
      <Header />
      <TableLayout
       title="Meeting Requests"
        headers={headers}
        data={data}
        loading={loading}
        showActions={false} // set true if you want Edit/Delete
      />
    </>
  );
}

export default DisplayRequests;
