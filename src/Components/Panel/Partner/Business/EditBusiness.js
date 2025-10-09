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
import { baseurl } from "../../../BaseURL/BaseURL";   // ✅ use baseurl

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
        offer_title: "",
        offer_description: "",
        logo: "",        
        documents: "",   
        is_active: true,
    });

    const [logoFile, setLogoFile] = useState(null);
    const [documentFile, setDocumentFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch existing business details
    useEffect(() => {
        fetch(`${baseurl}/business/${id}/`)
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
                    offer_title: data.offer_title,
                    offer_description: data.offer_description,
                    logo: data.logo,
                    documents: data.documents,
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

    // Append all text fields
    const textFields = [
        "business_name",
        "business_type",
        "description",
        "website",
        "email",
        "phone",
        "address",
        "offer_title",
        "offer_description",
        "is_active",
    ];

    textFields.forEach((key) => {
        formData.append(key, businessData[key]);
    });

    // Append files only if new files are selected
    if (logoFile) formData.append("logo", logoFile);
    if (documentFile) formData.append("documents", documentFile);

    fetch(`${baseurl}/business/${id}/`, {
        method: "PUT",
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => {
            alert("Business updated successfully!");
            navigate("/p-viewbusiness");
        })
        .catch((err) => {
            console.error("Error updating business:", err);
            alert("Failed to update business.");
        })
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

    // ✅ Helper function to extract file name from path/url
    const getFileName = (path) => {
        if (!path) return "";
        return path.split("/").pop(); // take last part after /
    };

    return (
        <>
            <PartnerHeader />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" fontWeight="bold" mb={3}>
                    Edit Business
                </Typography>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Grid container spacing={2}>
                        {/* Inputs */}
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
                                label="Website URL"
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

<Grid
  item
  xs={12}
  sm={4}
  sx={{
    mt: { xs: 0, sm: "40px", md: "40px" } 
  }}
>
  <TextField
    fullWidth
    label="Offer Title"
    name="offer_title"
    value={businessData.offer_title}
    onChange={handleChange}
  />
</Grid>


                                {/* Logo File Name */}
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2" mb={1}>
                                Image File:
                            </Typography>
                            {logoFile ? (
                                <Typography variant="body2">{logoFile.name}</Typography>
                            ) : businessData.logo ? (
                                <Typography variant="body2">
                                    {getFileName(businessData.logo)}
                                </Typography>
                            ) : (
                                <Typography variant="body2">No Image uploaded</Typography>
                            )}

                            <Button variant="outlined" component="label" fullWidth>
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleLogoChange}
                                    accept="image/*"
                                />
                            </Button>
                        </Grid>

                        {/* Document File Name */}
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2" mb={1}>
                                Document File:
                            </Typography>
                            {documentFile ? (
                                <Typography variant="body2">{documentFile.name}</Typography>
                            ) : businessData.documents ? (
                                <Typography variant="body2">
                                    {getFileName(businessData.documents)}
                                </Typography>
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
                        </Grid>

<Grid item xs={12} sm={6} md={6}>
      <TextField
    fullWidth
    multiline
    rows={3}
    label="Offer Description"
    name="offer_description"
    value={businessData.offer_description}
    onChange={handleChange}
  />
</Grid>

<Grid item xs={12}  sm={6} md={6}>
      <TextField
    fullWidth
    multiline
    rows={3}
    label="Description"
    name="description"
    value={businessData.description}
    onChange={handleChange}
  />
</Grid>


                

                  
                    </Grid>



                              {/* Active Checkbox */}
                     <Grid item xs={12} sm={4}>
    <Box display="flex" alignItems="center" justifyContent="start" gap={0.5} mt={3}>
        <input
            type="checkbox"
            name="is_active"
            checked={businessData.is_active}
            onChange={handleChange}
            style={{ width: '20px', height: '15px', cursor: 'pointer' }} // ✅ bigger checkbox
        />
        <Typography variant="h6" sx={{ cursor: 'pointer' }}>
            Active
        </Typography>
    </Box>
</Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1.5}}
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
