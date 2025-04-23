import React, { useState, useEffect } from "react";
import {
    Box, TextField, Button, Typography, Paper, Grid, MenuItem,
    IconButton, InputAdornment
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import image2 from "./../Images/logo.png";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
      const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        role_ids: [],
        email: "",
        password: "",
        phone_number: "",
        date_of_birth: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pin_code: "",
        status: "",
        pan_number: "",
        aadhaar_number: "",
        kyc_status: "Pending",
        account_holder_name: "",
        bank_name: "",
        branch_name: "",
        account_number: "",
        account_type: "",
        ifsc_code: "",
        nominee_reference_to: "",
        referral_id: "",
    });

    const hiddenFields = [
        "aadhaar_number",
        "pan_number",
        "referral_id",
        "nominee_reference_to",
        "account_type",
        "image",
        "date_of_birth",
        "gender",
        "address",
        "city",
        "state",
        "country",
        "pin_code",
        "status",
        "pan_number",
        "aadhaar_number",
        "kyc_status",
        "account_holder_name",
        "bank_name",
        "branch_name",
        "account_number",
        "account_type",
        "ifsc_code",
        "nominee_reference_to",
        "referral_id",
    ];


    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [pancard, setPancard] = useState(null);
    const [aadhar, setAadhar] = useState(null);
    const [image, setImage] = useState(null);
    const [pancardName, setPancardName] = useState("");
    const [aadharName, setAadharName] = useState("");
    const [imageName, setImageName] = useState("");
    const [partnerUsers, setPartnerUsers] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };


    useEffect(() => {
        fetch("https://rahul30.pythonanywhere.com/roles/")
            .then((res) => res.json())
            .then((data) => setRoles(data))
            .catch((err) => console.error("Error fetching roles:", err));

        fetch("https://rahul30.pythonanywhere.com/users/")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Error fetching users:", err));

        // Fetch users with role "Partner"
        fetch("https://rahul30.pythonanywhere.com/users/role/Partner/")
            .then((res) => res.json())
            .then((data) => setPartnerUsers(data))
            .catch((err) => console.error("Error fetching partner users:", err));
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "role_ids") {
            setFormData({ ...formData, role_ids: [Number(e.target.value)] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleFileChange = (event, setFile, setFileName) => {
        const file = event.target.files[0];
        if (!file) return;
        setFile(file);
        setFileName(file.name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!pancard || !aadhar || !image) {
        //   alert("Please upload Pancard, Aadhar, and an Image.");
        //   return;
        // }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        // Append files ONLY if they are selected
        if (pancard) formDataToSend.append("pan", pancard);
        if (aadhar) formDataToSend.append("aadhaar", aadhar);
        if (image) formDataToSend.append("image", image);

        try {
            const response = await fetch("https://rahul30.pythonanywhere.com/users/", {
                method: "POST",
                body: formDataToSend,
            });
            const responseData = await response.json();
            if (response.ok) {
                alert("User registered successfully!");
                setUsers([...users, responseData]);
                navigate("/");
            } else {
                console.error("Server Error:", responseData);
                alert(`Failed to register user: ${JSON.stringify(responseData)}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred while submitting the form.");
        }
    };

    // Role Dialog States
    const [openRoleDialog, setOpenRoleDialog] = useState(false);
    const [newRole, setNewRole] = useState("");

    // Handle role addition popup
    const handleOpenRoleDialog = () => setOpenRoleDialog(true);
    const handleCloseRoleDialog = () => {
        setNewRole("");
        setOpenRoleDialog(false);
    };

    // Submit new role
    const handleAddRole = async () => {
        if (!newRole.trim()) {
            alert("Role name cannot be empty");
            return;
        }

        try {
            const response = await fetch("https://rahul30.pythonanywhere.com/roles/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role_name: newRole }),
            });

            if (!response.ok) {
                throw new Error("Failed to add role");
            }

            const addedRole = await response.json();
            setRoles([...roles, addedRole]); // Update roles list
            handleCloseRoleDialog(); // Close dialog
            alert("Role added successfully!");
        } catch (error) {
            console.error("Error adding role:", error);
            alert("Failed to add role");
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
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Grid container spacing={2}>
                                {Object.keys(formData).map(
                                    (key) =>
                                        !hiddenFields.includes(key) &&
                                        key !== "role_ids" && (
                                            <Grid item xs={12} sm={6} key={key}>
                                                <TextField
                                                    fullWidth
                                                    label={key
                                                        .replace(/_/g, " ")
                                                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                                                    name={key}
                                                    value={formData[key]}
                                                    onChange={handleChange}
                                                    type={
                                                        key.includes("password")
                                                            ? (showPassword ? "text" : "password")
                                                            : key.includes("date")
                                                                ? "date"
                                                                : "text"
                                                    }
                                                    InputLabelProps={key.includes("date") ? { shrink: true } : {}}
                                                    InputProps={
                                                        key.includes("password")
                                                            ? {
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                ),
                                                            }
                                                            : {}
                                                    }
                                                />

                                            </Grid>
                                        )
                                )}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Role"
                                        name="role_ids"
                                        value={formData.role_ids[0] || ""}
                                        onChange={handleChange}
                                        required
                                    >
                                        {roles
                                            .filter((role) => role.role_name.toLowerCase() !== "admin")
                                            .map((role) => (
                                                <MenuItem key={role.role_id} value={role.role_id}>
                                                    {role.role_name}
                                                </MenuItem>
                                            ))}
                                    </TextField>
                                </Grid>

                            </Grid>
                            {/* <Grid container justifyContent="center" style={{ marginTop: 20 }}>
                                <Button type="submit" variant="contained" color="primary" size="small">
                                    Submit
                                </Button>
                            </Grid> */}
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
