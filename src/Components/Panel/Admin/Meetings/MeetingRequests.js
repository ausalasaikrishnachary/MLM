import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Tabs, Tab, Box, Pagination, Select, MenuItem } from '@mui/material';
import Header from '../../../Shared/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import TableLayout from '../../../Shared/TableLayout'; // Adjust path as needed
import { baseurl } from '../../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

function MeetingRequests() {
  const [tabValue, setTabValue] = useState(0);
  const [meetingData, setMeetingData] = useState([]);
  const [scheduledData, setScheduledData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchMeetingRequests();
  }, []);

  const fetchMeetingRequests = () => {
    setLoading(true);
    axios.get(`${baseurl}/meeting-requests/`)
      .then((response) => {
        setMeetingData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching meeting requests:', error);
        setLoading(false);
      });
  };

  const fetchScheduledMeetings = () => {
    setLoading(true);
    axios.get(`${baseurl}/scheduled-meetings/`)
      .then((response) => {
        setScheduledData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching scheduled meetings:', error);
        setLoading(false);
      });
  }

  const handleStatusChange = (scheduleId, newStatus) => {
    const meeting = scheduledData.find((item) => item.scheduled_meeting_id === scheduleId);

    if (!meeting) {
      Swal.fire({
        icon: 'error',
        title: 'Not Found',
        text: 'Meeting not found',
      });
      return;
    }

    const payload = { status: newStatus };

    axios
      .put(`${baseurl}/scheduled-meetings/${scheduleId}/`, payload)
      .then(() => {
        fetchScheduledMeetings(); // Refresh data
        console.log(`Status updated to ${newStatus}`);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Status updated successfully!',
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error('Error updating meeting status:', error.response?.data || error.message);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Failed to update status. Please try again.',
        });
      });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1); // Reset to first page
    if (newValue === 0) fetchMeetingRequests();
    else fetchScheduledMeetings();
  };

  const headers = [
    ...(tabValue === 0 ? [{ label: 'RequestId', key: 'id' }] : []),
    { label: 'UserId', key: 'user_id' },
    { label: 'Agent Name', key: 'name' },
    { label: 'Agent Referral ID', key: 'referral_id' },
    { label: 'Email', key: 'email' },
    { label: 'Profile Type', key: 'profile_type' },
    { label: tabValue === 0 ? 'Requested Date' : 'Scheduled Date', key: 'date' },
    { label: tabValue === 0 ? 'Requested Time' : 'Scheduled Time', key: 'time' },
    { label: 'Action', key: 'action' },
  ];

  const getTableData = () => {
    const source = tabValue === 0 ? meetingData : scheduledData;

    const sliced = source.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return sliced.map((item) => {
      const isScheduled = item.is_scheduled;

      return {
        id: item.request_id || item.schedule_id,
        user_id: item.user_id,
        name: item.name,
        referral_id: item.referral_id,
        email: item.email,
        profile_type: item.profile_type,
        date: item.requested_date || item.scheduled_date,
        time: item.requested_time || item.scheduled_time,
        action:
          tabValue === 0 ? (
            <Button
              variant={isScheduled ? 'outlined' : 'contained'}
              size="small"
              disabled={isScheduled}
              onClick={(e) => {
                e.stopPropagation();
                if (!isScheduled) {
                  navigate(`/shedulemeet/${item.user_id}`, {
                    state: { request_id: item.request_id },
                  });
                }
              }}
            >
              {isScheduled ? 'Scheduled' : 'Schedule'}
            </Button>
          ) : (
            <Select
              size="small"
              value={item.status || 'Scheduled'}
              onChange={(e) => handleStatusChange(item.scheduled_meeting_id, e.target.value)}
              sx={{ minWidth: 140 }}
            >
              <MenuItem value="scheduled">Scheduled</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          ),
      };
    });
  };

  const totalPages = Math.ceil(
    (tabValue === 0 ? meetingData.length : scheduledData.length) / itemsPerPage
  );

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <>
      <Header />
      <Box sx={{ width: '90%', margin: '2rem auto' }}>
        <Box sx={{ textAlign: 'center', paddingTop: '2rem' }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Meeting Requests" />
            <Tab label="Scheduled Meetings" />
          </Tabs>
        </Box>

        <TableLayout
          title={tabValue === 0 ? 'Meeting Requests' : 'Scheduled Meetings'}
          headers={headers}
          data={getTableData()}
          loading={loading}
        />

        {/* Pagination Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "0px",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default MeetingRequests;
