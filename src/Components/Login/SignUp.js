import React, { useState, useEffect } from "react";
import {
    Box, TextField, Button, Typography, Paper, Grid, MenuItem,
    IconButton, InputAdornment
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import image2 from "./../Images/logo.png";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "", first_name: "", last_name: "", role_ids: [],
        email: "", password: "", phone_number: ""
    });
    const [roles, setRoles] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetch("https://rahul30.pythonanywhere.com/roles/")
            .then(res => res.json())
            .then(data => setRoles(data))
            .catch(err => console.error("Error fetching roles:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "role_ids" ? [Number(value)] : value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
            payload.append(key, val);
        });

        try {
            const res = await fetch("https://rahul30.pythonanywhere.com/users/", {
                method: "POST",
                body: payload,
            });
            const data = await res.json();
            if (res.ok) {
                alert("User registered successfully!");
            } else {
                alert("Error: " + JSON.stringify(data));
            }
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "url(https://cdn.pixabay.com/photo/2018/11/22/23/57/london-3833039_1280.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                mt: "-85px"
            }}
        >
            <Paper elevation={4} sx={{ display: "flex", width: "90%", maxWidth: 1000, borderRadius: 2, overflow: "hidden" }}>
                <Grid container>
                    <Grid
                        item xs={12} md={5}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundImage: "url(https://img.freepik.com/free-vector/background-banner-colorful-gradient_677411-3591.jpg?w=360)",
                            backgroundSize: "cover",
                            p: 2,
                        }}
                    >
                        <img src={image2} alt="Company Logo" style={{ maxWidth: "100%", height: "auto" }} />
                    </Grid>
                    <Grid item xs={12} md={7} sx={{ p: 4 }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Registration
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Username" fullWidth name="username" value={formData.username} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="First Name" fullWidth name="first_name" value={formData.first_name} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Last Name" fullWidth name="last_name" value={formData.last_name} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        label="Role"
                                        name="role_ids"
                                        value={formData.role_ids[0] || ""}
                                        onChange={handleChange}
                                        fullWidth
                                    >
                                        {roles.map((role) => (
                                            <MenuItem key={role.id} value={role.id}>
                                                {role.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Email" type="email" fullWidth name="email" value={formData.email} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Phone Number" fullWidth name="phone_number" value={formData.phone_number} onChange={handleChange} />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 3, bgcolor: "#00cc8f", "&:hover": { bgcolor: "#004080", color: "#fff" } }}
                            >
                                Register
                            </Button>
                            <Typography align="center" sx={{ mt: 2 }}>
                                Already registered?{" "}
                                <Link to="/" style={{ color: "#004080", textDecoration: "underline" }}>
                                    Login
                                </Link>
                            </Typography>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default SignUp;
