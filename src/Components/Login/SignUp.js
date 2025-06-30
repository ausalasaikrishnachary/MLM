import React, { useState, useEffect } from "react";
import {
    Box, TextField, Button, Typography, Paper, Grid, MenuItem,
    IconButton, InputAdornment, Link, Checkbox, FormControlLabel
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import image2 from "./../Images/logo.png";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { baseurl } from '../BaseURL/BaseURL';
import Swal from "sweetalert2";
import { color } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";

const SignUp = () => {
    const [acceptedTC, setAcceptedTC] = useState(false);
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
        kyc_status: "pending",
        account_holder_name: "",
        bank_name: "",
        branch_name: "",
        account_number: "",
        account_type: "",
        ifsc_code: "",
        nominee_reference_to: "",
        referral_id: "",
        referred_by: "",
        status: ""
    });

    const hiddenFields = [
        "aadhaar_number",
        "pan_number",
        "referral_id",
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
        "referred_by",
        "phone_number",
        "email"
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

    const [errors, setErrors] = useState({
    email: "",
    phone_number: ""
});



    useEffect(() => {
        fetch(`${baseurl}/roles/`)
            .then((res) => res.json())
            .then((data) => setRoles(data))
            .catch((err) => console.error("Error fetching roles:", err));

        fetch(`${baseurl}/users/`)
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Error fetching users:", err));

        // Fetch users with role "Partner"
        fetch(`${baseurl}/users/role/Partner/`)
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

    // Reset previous errors
    setErrors({ email: "", phone_number: "" });

    const { email, phone_number } = formData;
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    if (!phone_number.trim()) newErrors.phone_number = "Phone number is required";

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    // Proceed with submission
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
    });

    if (pancard) formDataToSend.append("pan", pancard);
    if (aadhar) formDataToSend.append("aadhaar", aadhar);
    if (image) formDataToSend.append("image", image);

    try {
        const response = await fetch(`${baseurl}/users/`, {
            method: "POST",
            body: formDataToSend,
        });

        const responseData = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "User Registered",
                text: "User registered successfully!",
                confirmButtonColor: "#3085d6"
            }).then(() => {
                setUsers([...users, responseData]);
                navigate("/login");
            });
        } else {
            // Handle server validation errors
            if (responseData.email) {
                setErrors(prev => ({ ...prev, email: "Email already exists" }));
            }
            if (responseData.phone_number) {
                setErrors(prev => ({ ...prev, phone_number: "Phone number already exists" }));
            }

            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: "Please check the form for errors.",
                confirmButtonColor: "#d33"
            });
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire({
            icon: "error",
            title: "Submission Error",
            text: "An error occurred while submitting the form.",
            confirmButtonColor: "#d33"
        });
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
            const response = await fetch(`${baseurl}/roles/`, {
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
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: "url(https://cdn.pixabay.com/photo/2018/11/22/23/57/london-3833039_1280.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginTop: "-85px",
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
    fullWidth
    label="Email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    error={Boolean(errors.email)}
    helperText={errors.email}
/>
</Grid>
<Grid item xs={12} sm={6}>
<TextField
    fullWidth
    label="Phone Number"
    name="phone_number"
    value={formData.phone_number}
    onChange={handleChange}
    error={Boolean(errors.phone_number)}
    helperText={errors.phone_number}
/>
</Grid>

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

                                {roles.find(role => role.role_id === formData.role_ids[0])?.role_name === "Agent" && (
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Sponsor ID"
                                            name="referred_by"
                                            value={formData.referred_by}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                )}

                            </Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={acceptedTC}
                                        onChange={(e) => setAcceptedTC(e.target.checked)}
                                        name="acceptedTC"
                                        color="primary"
                                    />
                                }
                                label={
                                    <Typography variant="body2">
                                        I agree to the{" "}
                                        <Link href="/termsandconditions" target="_blank" underline="hover">
                                            Terms & Conditions
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacypolicy" target="_blank" underline="hover">
                                            Privacy Policy
                                        </Link>
                                    </Typography>
                                }
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={!acceptedTC}
                                sx={{
                                    mt: 3,
                                    bgcolor: acceptedTC ? "#00cc8f" : "grey.500",
                                    "&:hover": {
                                        bgcolor: acceptedTC ? "#004080" : "grey.600",
                                        color: acceptedTC ? "#fff" : "inherit"
                                    }
                                }}
                            >
                                Register
                            </Button>

                            <Typography align="center" sx={{ mt: 2 }}>
                                Already registered?{" "}
                                <Link href="/login" sx={{ cursor: "pointer", color: "primary.main" }}>
                                    Login
                                </Link>
                            </Typography>
                        </form>

                    </Grid>
                </Grid>
            </Paper>

            <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" color="white" sx={{ opacity: 0.9 }}>
                    © {new Date().getFullYear()} SHRIRAJ. All rights reserved. <br />
                    <Link
                        component={RouterLink}
                        to="/termsandconditions"
                        underline="hover"
                        color="inherit"
                        sx={{ mx: 1 }}
                    >
                        Terms & Conditions
                    </Link>
                    |
                    <Link
                        component={RouterLink}
                        to="/privacypolicy"
                        underline="hover"
                        color="inherit"
                        sx={{ mx: 1 }}
                    >
                        Privacy Policy
                    </Link>
                    |
                    <Link
                        component={RouterLink}
                        to="/refundpolicy"
                        underline="hover"
                        color="inherit"
                        sx={{ mx: 1 }}
                    >
                        Refund Policy
                    </Link>
                </Typography>
            </Box>

        </Box>
    );
};

export default SignUp;
