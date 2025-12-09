// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//     Container,
//     TextField,
//     Button,
//     Box,
//     Typography,
//     CircularProgress,
//     Grid,
// } from "@mui/material";
// import axios from "axios";
// import Header from "../../../Shared/Navbar/Navbar";
// import { baseurl } from "../../../BaseURL/BaseURL";

// const EditBussinessProducts = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         product_name: "",
//         sku: "",
//         description: "",
//         selling_price: "",
//         mrp: "",
//         units: "",
//         tax_percent: "",
//         cgst_percent: "",
//         cgst_amount: "",
//         sgst_percent: "",
//         sgst_amount: "",
//         available_qty: "",
//         company_commission: "",
//         distribution_commission: "",
//         discount_percent:"",
//         product_image: null,
//         offer:null
        
//     });
//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [productImage, setProductImage] = useState(null);


//     // 👇 Define which fields you want to show
//     const visibleFields = [
//         "product_name",
//         "sku",
//         "description",
//         "selling_price",
//         "mrp",
//         "units",
//         "tax_percent",
//         "cgst_percent",
//         "cgst_amount",
//         "sgst_percent",
//         "sgst_amount",
//         "available_qty",
//         "company_commission",
//         "distribution_commission",
//         //"discount_percent",
//         "offer",
//         "product_image",
        
//     ];

//     useEffect(() => {
//         console.log("Product ID:", id);
//         const fetchProduct = async () => {
//             try {
//                 const res = await axios.get(`${baseurl}/products/${id}/`);
//                 setFormData(res.data);
//             } catch (error) {
//                 console.error("Error fetching product:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         if (id) fetchProduct();
//     }, [id]);

//     // ✅ Handle image change
//     const handleImageChange = (e) => {
//         setProductImage(e.target.files[0]);
//     };

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (files) {
//             setFormData({ ...formData, [name]: files[0] });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//         const data = new FormData();

//         // Append all fields except product_image
//         for (const key in formData) {
//             if (key !== "product_image") {
//                 data.append(key, formData[key]);
//             }
//         }

//         // Append product_image only if user selected a new file
//         if (productImage) {
//             data.append("product_image", productImage);
//         }

//         const response = await axios.put(
//             `${baseurl}/products/${id}/`,
//             data,
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             }
//         );

//         console.log("Product updated successfully:", response.data);
//         alert("✅ Product updated successfully!");

//         // Navigate back to business products page
//         navigate(`/a-businessproducts/${formData.business_id}`);
//     } catch (error) {
//         console.error("Error updating product:", error.response?.data || error);
//         alert("❌ Failed to update product. Check console for details.");
//     } finally {
//         setSaving(false);
//     }
// };



//     if (loading) {
//         return (
//             <>
//                 <Header />
//                 <Box display="flex" justifyContent="center" mt={10}>
//                     <CircularProgress />
//                 </Box>
//             </>
//         );
//     }

//     return (
//         <>
//             <Header />
//             <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                     Edit Product
//                 </Typography>

//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         {visibleFields.map((key) =>
//                             key !== "product_image" ? (
//                                 <Grid item xs={12} sm={6} md={4} key={key}>
//                                     <TextField
//                                         label={key.replace(/_/g, " ").toUpperCase()}
//                                         name={key}
//                                         value={formData[key] ?? ""}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         variant="outlined"
//                                     />
//                                 </Grid>
//                             ) : (
//                                 <Grid item xs={12} key={key}>
//                                     <Box mt={2}>
//                                         <Typography variant="body2" mb={1}>
//                                             Product Image:
//                                         </Typography>

//                                         {/* ✅ Display existing product image if available */}
//                                         {formData.product_image && typeof formData.product_image === "string" && (
//                                             <Box mb={2}>
//                                                 <img
//                                                     src={
//                                                         formData.product_image.startsWith("http")
//                                                             ? formData.product_image
//                                                             : `${baseurl}${formData.product_image}`
//                                                     }
//                                                     alt="Product"
//                                                     style={{
//                                                         width: "200px",
//                                                         height: "auto",
//                                                         borderRadius: "8px",
//                                                         border: "1px solid #ccc",
//                                                     }}
//                                                 />
//                                             </Box>
//                                         )}

//                                         {/* ✅ File upload input */}
//                                         <input type="file" accept="image/*" onChange={handleImageChange} />
//                                     </Box>
//                                 </Grid>
//                             )
//                         )}

//                         <Grid item xs={3}>
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 fullWidth
//                                 sx={{ mt: 2 }}
//                                 disabled={saving}
//                             >
//                                 {saving ? "Updating..." : "Update Product"}
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </Container>
//         </>
//     );
// };

// export default EditBussinessProducts;





import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import axios from "axios";
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from "../../../BaseURL/BaseURL";

const EditBussinessProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        product_name: "",
        sku: "",
        description: "",
        selling_price: "",
        mrp: "",
        // units: "",
        // tax_percent: "",
        // cgst_percent: "",
        // cgst_amount: "",
        // sgst_percent: "",
        // sgst_amount: "",
        available_qty: "",
        company_commission: "",
        distribution_commission: "",
        discount_percent: "",
        product_image: null,
        offer: null // This should be offer ID, not offer object
    });
    const [offers, setOffers] = useState([]); // Store list of offers
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [productImage, setProductImage] = useState(null);
    const [fetchingOffers, setFetchingOffers] = useState(false);

    // 👇 Define which fields you want to show
    const visibleFields = [
        "product_name",
        "sku",
        "description",
        "selling_price",
        "mrp",
        // "units",
        // "tax_percent",
        // "cgst_percent",
        // "cgst_amount",
        // "sgst_percent",
        // "sgst_amount",
        "available_qty",
        "company_commission",
        "distribution_commission",
        "product_image",
    ];

    // Fetch offers from backend
    const fetchOffers = async () => {
        try {
            setFetchingOffers(true);
            const res = await axios.get(`${baseurl}/offers/`); // Create this endpoint
            setOffers(res.data);
        } catch (error) {
            console.error("Error fetching offers:", error);
        } finally {
            setFetchingOffers(false);
        }
    };

    useEffect(() => {
        console.log("Product ID:", id);
        
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${baseurl}/products/${id}/`);
                const productData = res.data;
                
                // Convert offer object to ID if it exists
                if (productData.offer && typeof productData.offer === 'object') {
                    productData.offer = productData.offer.id; // Extract only the ID
                }
                
                setFormData(productData);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        
        if (id) {
            fetchProduct();
            fetchOffers(); // Fetch offers when component mounts
        }
    }, [id]);

    // ✅ Handle image change
    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const data = new FormData();

            // Append all fields
            for (const key in formData) {
                if (key !== "product_image") {
                    // Convert offer field to integer or null
                    if (key === "offer") {
                        if (formData[key] && formData[key] !== "") {
                            data.append(key, parseInt(formData[key])); // Convert to integer
                        } else {
                            data.append(key, ""); // Or send empty string to clear offer
                        }
                    } else {
                        data.append(key, formData[key]);
                    }
                }
            }

            // Append product_image only if user selected a new file
            if (productImage) {
                data.append("product_image", productImage);
            }

            const response = await axios.put(
                `${baseurl}/products/${id}/`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Product updated successfully:", response.data);
            alert("✅ Product updated successfully!");

            // Navigate back to business products page
            navigate(`/a-businessproducts/${formData.business_id}`);
        } catch (error) {
            console.error("Error updating product:", error.response?.data || error);
            alert("❌ Failed to update product. Check console for details.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <Box display="flex" justifyContent="center" mt={10}>
                    <CircularProgress />
                </Box>
            </>
        );
    }

    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Edit Product
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {visibleFields.map((key) => {
                            // Special case for offer dropdown
                            if (key === "offer") {
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={key}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Select Offer</InputLabel>
                                            <Select
                                                label="Select Offer"
                                                name="offer"
                                                value={formData.offer || ""}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>No Offer</em>
                                                </MenuItem>
                                                {offers.map((offer) => (
                                                    <MenuItem key={offer.id} value={offer.id}>
                                                        {offer.description || offer.get_offer_type_display}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                );
                            }
                            
                            // Special case for product image
                            if (key === "product_image") {
                                return (
                                    <Grid item xs={12} key={key}>
                                        <Box mt={2}>
                                            <Typography variant="body2" mb={1}>
                                                Product Image:
                                            </Typography>

                                            {/* ✅ Display existing product image if available */}
                                            {formData.product_image && typeof formData.product_image === "string" && (
                                                <Box mb={2}>
                                                    <img
                                                        src={
                                                            formData.product_image.startsWith("http")
                                                                ? formData.product_image
                                                                : `${baseurl}${formData.product_image}`
                                                        }
                                                        alt="Product"
                                                        style={{
                                                            width: "200px",
                                                            height: "auto",
                                                            borderRadius: "8px",
                                                            border: "1px solid #ccc",
                                                        }}
                                                    />
                                                </Box>
                                            )}

                                            {/* ✅ File upload input */}
                                            <input type="file" accept="image/*" onChange={handleImageChange} />
                                        </Box>
                                    </Grid>
                                );
                            }
                            
                            // Regular text fields
                            return (
                                <Grid item xs={12} sm={6} md={4} key={key}>
                                    <TextField
                                        label={key.replace(/_/g, " ").toUpperCase()}
                                        name={key}
                                        value={formData[key] ?? ""}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                            );
                        })}

                        <Grid item xs={3}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2 }}
                                disabled={saving || fetchingOffers}
                            >
                                {saving ? "Updating..." : "Update Product"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
};

export default EditBussinessProducts;
