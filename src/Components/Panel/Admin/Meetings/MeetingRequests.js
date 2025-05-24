import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Tabs, Tab, Box } from '@mui/material';
import Header from '../../../Shared/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const cellStyle = { fontWeight: 'bold', backgroundColor: '#f0f0f0' };
const cellBodyStyle = { fontSize: '14px' };
const noDataStyle = { textAlign: 'center', fontSize: '16px' };

function MeetingRequests() {
    const [tabValue, setTabValue] = useState(0);
    const [meetingData, setMeetingData] = useState([]);
    const [scheduledData, setScheduledData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMeetingRequests();
    }, []);

    // Fetch meeting requests
    const fetchMeetingRequests = () => {
        setLoading(true);
        axios.get('https://rahul30.pythonanywhere.com/meeting-requests/')
            .then((response) => {
                setMeetingData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching meeting requests:', error);
                setLoading(false);
            });
    };

    // Fetch scheduled meetings
    const fetchScheduledMeetings = () => {
        setLoading(true);
        axios.get('https://rahul30.pythonanywhere.com/scheduled-meetings/')  // <-- Replace with your actual scheduled meetings API
            .then((response) => {
                setScheduledData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching scheduled meetings:', error);
                setLoading(false);
            });
    };

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        if (newValue === 0) {
            fetchMeetingRequests();
        } else if (newValue === 1) {
            fetchScheduledMeetings();
        }
    };

    // Render table rows helper
    const renderRows = (data, isRequestsTab = true) => {
        if (loading) {
            return (
                <TableRow>
                    <TableCell colSpan={9} sx={noDataStyle}>Loading...</TableCell>
                </TableRow>
            );
        }
        if (data.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={9} sx={noDataStyle}>No Data Found</TableCell>
                </TableRow>
            );
        }

        return data.map((item) => (
            <TableRow key={item.request_id || item.schedule_id}>
                <TableCell sx={cellBodyStyle}>{item.request_id || item.schedule_id}</TableCell>
                <TableCell sx={cellBodyStyle}>{item.user_id}</TableCell>
                <TableCell sx={cellBodyStyle}>{item.name}</TableCell>
                <TableCell sx={cellBodyStyle}>{item.referral_id}</TableCell>
                <TableCell sx={cellBodyStyle}>{item.email}</TableCell>
                <TableCell sx={cellBodyStyle}>{item.profile_type}</TableCell>
                <TableCell sx={cellBodyStyle}>{item.requested_date || item.scheduled_date}</TableCell>
                <TableCell sx={cellBodyStyle}>{item.requested_time || item.scheduled_time}</TableCell>
                <TableCell sx={cellBodyStyle}>
                    {isRequestsTab ? (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() =>
                                navigate(`/shedulemeet/${item.user_id}`, {
                                    state: { request_id: item.request_id }
                                })
                            }
                        >
                            Schedule
                        </Button>
                    ) : (
                        <Button variant="outlined" size="small" disabled>
                            Scheduled
                        </Button>
                    )}
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <>
            <Header />
            <Box sx={{ width: '90%', margin: '2rem auto', }}>
                <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
                <Tabs  value={tabValue} onChange={handleTabChange} centered>
                    <Tab label="Meeting Requests" />
                    <Tab label="Scheduled Meetings" />
                </Tabs>
                </div>

                {/* <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <h2 style={{ fontWeight: 'bold' }}>
                        {tabValue === 0 ? 'Meeting Requests' : 'Scheduled Meetings'}
                    </h2>
                </div> */}

                <Table sx={{ border: '1px solid black', width: '100%', marginTop: '1rem' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={cellStyle}>{tabValue === 0 ? 'RequestId' : 'ScheduleId'}</TableCell>
                            <TableCell sx={cellStyle}>UserId</TableCell>
                            <TableCell sx={cellStyle}>Agent Name</TableCell>
                            <TableCell sx={cellStyle}>Agent Referral ID</TableCell>
                            <TableCell sx={cellStyle}>Email</TableCell>
                            <TableCell sx={cellStyle}>Profile Type</TableCell>
                            <TableCell sx={cellStyle}>{tabValue === 0 ? 'Requested Date' : 'Scheduled Date'}</TableCell>
                            <TableCell sx={cellStyle}>{tabValue === 0 ? 'Requested Time' : 'Scheduled Time'}</TableCell>
                            <TableCell sx={cellStyle}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tabValue === 0
                            ? renderRows(meetingData, true)
                            : renderRows(scheduledData, false)
                        }
                    </TableBody>
                </Table>
            </Box>
        </>
    );
}

export default MeetingRequests;
