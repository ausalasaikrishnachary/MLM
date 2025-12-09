import React, { useState, useEffect } from 'react';
import { baseurl } from '../../../BaseURL/BaseURL';
import Header from '../../../Shared/Navbar/Navbar';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    MenuItem
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function EditTrainingMaterial() {
    const navigate = useNavigate();
    const location = useLocation();
    const { material } = location.state || {};

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: ''
    });

    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentVideo, setCurrentVideo] = useState('');

    useEffect(() => {
        if (material) {
            setFormData({
                title: material.title || '',
                category: material.category || '',
                description: material.description || ''
            });
            setCurrentVideo(material.video || '');
        }
    }, [material]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'video/mp4') {
            setVideoFile(file);
        } else {
            Swal.fire('Invalid File', 'Please upload an MP4 video only', 'error');
            setVideoFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!material || !material.id) {
            Swal.fire('Error', 'No material data found', 'error');
            return;
        }

        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('description', formData.description);
        
        // Only append video if a new one is selected
        if (videoFile) {
            data.append('video', videoFile);
        }

        try {
            await axios.put(`${baseurl}/training-materials/${material.id}/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Training material updated successfully!',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/a-trainingmaterial");
                }
            });

        } catch (error) {
            console.error('Update error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Error updating training material.'
            });
        } finally {
            setLoading(false);
        }
    };

    if (!material) {
        return (
            <div>
                <Header />
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h6" color="error">
                            No material data found. Please go back and try again.
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(-1)}
                            sx={{ mt: 2 }}
                        >
                            Back
                        </Button>
                    </Paper>
                </Container>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper sx={{ p: 4 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontSize: {
                                xs: "1.6rem",
                                sm: "2.1rem",
                                md: "2.2rem",
                            },
                            fontWeight: "bold",
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            marginBottom: "15px",
                        }}
                    >
                        Edit Training Material
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                        <TextField
                            label="Title"
                            name="title"
                            fullWidth
                            margin="normal"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            select
                            label="Category"
                            name="category"
                            fullWidth
                            margin="normal"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Sales">Sales</MenuItem>
                            <MenuItem value="Marketing">Marketing</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </TextField>

                        <TextField
                            label="Description"
                            name="description"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{ mb: 1 }}>Current Video</Typography>
                            {currentVideo && (
                                <Box sx={{ mb: 2 }}>
                                    <video 
                                        controls 
                                        width="100%" 
                                        height="200"
                                        style={{ maxWidth: '400px' }}
                                    >
                                        <source src={`${baseurl}/${currentVideo}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </Box>
                            )}
                            
                            <Typography sx={{ mb: 1 }}>Upload New MP4 Video (Optional)</Typography>
                            <input
                                type="file"
                                accept="video/mp4"
                                onChange={handleVideoChange}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                                Leave empty to keep the current video
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}

export default EditTrainingMaterial;