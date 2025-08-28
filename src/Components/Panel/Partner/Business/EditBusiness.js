import React, { useEffect, useState } from "react";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Box,
    CircularProgress,
    Typography,
    Grid,
} from "@mui/material";

function EditBusiness() {
    const { id } = useParams(); // business_id from URL
    const navigate = useNavigate();

    const [businessData, setBusinessData] = useState({
        business_name: "",
        business_type: "",
        description: "",
        website: "",
        email: "",
        phone: "",
        address: "",
        is_active: true,
    });

    const [logoFile, setLogoFile] = useState(null);
    const [documentFile, setDocumentFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch existing business details
    useEffect(() => {
        fetch(`https://shrirajteam.com:81/business/${id}/`)
            .then((res) => res.json())
            .then((data) => {
                setBusinessData({
                    business_name: data.business_name,
                    business_type: data.business_type,
                    description: data.description,
                    website: data.website,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    is_active: data.is_active,
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching business:", err);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBusinessData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleLogoChange = (e) => {
        setLogoFile(e.target.files[0]);
    };

    const handleDocumentChange = (e) => {
        setDocumentFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);

        const formData = new FormData();
        Object.keys(businessData).forEach((key) => {
            formData.append(key, businessData[key]);
        });

        if (logoFile) formData.append("logo", logoFile);
        if (documentFile) formData.append("documents", documentFile);

        fetch(`https://shrirajteam.com:81/business/${id}/`, {
            method: "PUT",
            body: formData,
        })
            .then((res) => {
                if (res.ok) {
                    alert("Business updated successfully!");
                    navigate("/p-viewbusiness");
                } else {
                    alert("Failed to update business.");
                }
            })
            .catch((err) => console.error("Error updating business:", err))
            .finally(() => setSaving(false));
    };

    if (loading) {
        return (
            <>
                <PartnerHeader />
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            </>
        );
    }

    return (
        <>
            <PartnerHeader />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" fontWeight="bold" mb={3}>
                    Edit Business
                </Typography>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Business Name"
                                name="business_name"
                                value={businessData.business_name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Business Type"
                                name="business_type"
                                value={businessData.business_type}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={businessData.phone}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={businessData.email}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Website"
                                name="website"
                                value={businessData.website}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={businessData.address}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Logo Upload + Preview */}
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2" mb={1}>
                                Existing Logo:
                            </Typography>
                            {businessData.logo ? (
                                <Box mb={1}>
                                    <img
                                        src={`https://shrirajteam.com:81/${businessData.logo}`}
                                        alt="Logo"
                                        style={{ width: "100%", maxHeight: "150px", objectFit: "contain" }}
                                    />
                                </Box>
                            ) : (
                                <Typography variant="body2">No logo uploaded</Typography>
                            )}
                            <Button variant="outlined" component="label" fullWidth>
                                Upload Logo
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleLogoChange}
                                    accept="image/*"
                                />
                            </Button>
                            {logoFile && <Typography mt={1}>{logoFile.name}</Typography>}
                        </Grid>

                        {/* Document Upload + Preview */}
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2" mb={1}>
                                Existing Document:
                            </Typography>
                            {businessData.documents ? (
                                <Box mb={1}>
                                    <a
                                        href={`https://shrirajteam.com:81/${businessData.documents}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Document
                                    </a>
                                </Box>
                            ) : (
                                <Typography variant="body2">No document uploaded</Typography>
                            )}
                            <Button variant="outlined" component="label" fullWidth>
                                Upload Document
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleDocumentChange}
                                    accept=".pdf,.doc,.docx"
                                />
                            </Button>
                            {documentFile && <Typography mt={1}>{documentFile.name}</Typography>}
                        </Grid>


                        <Grid item xs={12} sm={4}>
                            <Box display="flex" alignItems="center" gap={1} mt={1}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        checked={businessData.is_active}
                                        onChange={handleChange}
                                    />{" "}
                                    Active
                                </label>
                            </Box>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Update Business"}
                    </Button>
                </form>
            </Container>
        </>
    );
}

export default EditBusiness;
