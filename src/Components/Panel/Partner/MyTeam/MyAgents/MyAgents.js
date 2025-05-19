import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress
} from '@mui/material';
import PartnerHeader from '../../../../Shared/Partner/PartnerNavbar';
import axios from 'axios';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../../BaseURL/BaseURL';


const MyAgents = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.get(`${baseurl}/users/role/Agent/`);

                // Filter only agents with status "Active"
                const activeAgents = response.data.filter(agent => agent.status === "Active");

                setAgents(activeAgents);
            } catch (error) {
                console.error('Error fetching agents:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);


    return (
        <>
            <PartnerHeader />
            <Container maxWidth="lg" sx={{ pt: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5" fontWeight="bold">
                        My Agents
                    </Typography>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" mt={5}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer component={Paper}>
                        <Table aria-label="agents table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>User Name</strong></TableCell>
                                    <TableCell><strong>Email</strong></TableCell>
                                    <TableCell><strong>Phone Number</strong></TableCell>
                                    <TableCell><strong>Referral ID</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                    <TableCell><strong>Actions</strong></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {agents.map((agent, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{agent.username}</TableCell>
                                        <TableCell>{agent.email}</TableCell>
                                        <TableCell>{agent.phone_number}</TableCell>
                                        <TableCell>{agent.referral_id || '—'}</TableCell>
                                        <TableCell>{agent.status || '—'}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: "5px" }}>
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => navigate(`/p-view-activeagents/${agent.user_id}`)}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>

                                                <IconButton size="small" color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton size="small" color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </>
    );
};

export default MyAgents;
