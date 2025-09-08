import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AddTrainingMaterial() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: ''
    });

    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (videoFile) {
        data.append('video', videoFile);
    }

    try {
        await axios.post(`${baseurl}/training-materials/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Training material uploaded successfully!',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/a-trainingmaterial"); // ✅ redirect after success
            }
        });

        setFormData({ title: '', category: '', description: '' });
        setVideoFile(null);
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: 'Error uploading training material.'
        });
    } finally {
        setLoading(false);
    }
};


    return (
        <div>
            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Add Training Material
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

                        {/* Category Dropdown */}
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
                            <Typography sx={{ mb: 1 }}>Upload MP4 Video</Typography>
                            <input
                                type="file"
                                accept="video/mp4"
                                onChange={handleVideoChange}
                                required
                            />
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
                                {loading ? 'Uploading...' : 'Submit'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}

export default AddTrainingMaterial;
