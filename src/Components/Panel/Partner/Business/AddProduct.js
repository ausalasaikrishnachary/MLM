// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Grid,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import axios from "axios";

// const AddProduct = () => {
//   const userId = localStorage.getItem("user_id");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { business, editMode, productData } = location.state || {};

//   const [offers, setOffers] = useState([]); // State to store offers
//   const [loading, setLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     agent_id: userId,
//     business_id: business?.business_id || "",
//     product_name: "",
//     sku: "",
//     description: "",
//     price: "",
//     selling_price: "",
//     mrp: "",
//     units: "",
//     // tax_percent: "",
//     // cgst_percent: "",
//     // cgst_amount: "",
//     // sgst_percent: "",
//     // sgst_amount: "",
//     // available_qty: "",
//     // company_commission: "",
//     // product_commission: "",
//     offer_id: "", // Changed from discount_percent to offer_id
//     product_image: null,
//   });

//   // Fetch offers from API
//   useEffect(() => {
//     const fetchOffers = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${baseurl}/offers/`);
//         console.log('Fetched offers:', response.data);
        
//         // Filter only active offers if needed
//         const activeOffers = response.data.filter(offer => offer.is_active === true);
//         setOffers(activeOffers);
//       } catch (error) {
//         console.error('Error fetching offers:', error);
//         alert('Failed to load offers. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOffers();
//   }, []);

//   // Pre-fill form if in edit mode
//   useEffect(() => {
//     if (editMode && productData) {
//       setFormData({
//         agent_id: userId,
//         business_id: productData.business_id || business?.business_id || "",
//         product_name: productData.product_name || "",
//         sku: productData.sku || "",
//         description: productData.description || "",
//         price: productData.distribution_commission || "", // Assuming distribution_commission is the price
//         selling_price: productData.selling_price || "",
//         mrp: productData.mrp || "",
//         units: productData.units || "",
//         offer_id: productData.offer_id || "", // Use offer_id instead of discount_percent
//         product_image: null,
//       });
//     }
//   }, [editMode, productData, business, userId]);

//   // Format offer display text
//   const getOfferDisplayText = (offer) => {
//     if (!offer) return '';
    
//     const formatDate = (dateString) => {
//       if (!dateString) return '';
//       const [day, month, year] = dateString.split('-');
//       return `${day}/${month}/${year}`;
//     };

//     const getOfferTypeDisplay = (type) => {
//       const types = {
//         'discount_percent': 'Discount %',
//         'discount_flat': 'Flat Discount',
//         'buy_x_get_y': 'Buy X Get Y',
//         'free_gift': 'Free Gift'
//       };
//       return types[type] || type;
//     };

//     const formatOfferValue = (offer) => {
//       switch(offer.offer_type) {
//         case 'discount_percent':
//           return `${offer.value}%`;
//         case 'discount_flat':
//           return `₹${offer.value}`;
//         case 'buy_x_get_y':
//           return `Buy ${offer.x_quantity} Get ${offer.y_quantity}`;
//         case 'free_gift':
//           return offer.description || 'Free Gift';
//         default:
//           return offer.value || '';
//       }
//     };

//     const offerValue = formatOfferValue(offer);
//     const offerType = getOfferTypeDisplay(offer.offer_type);
//     const startDate = formatDate(offer.start_date);
//     const endDate = formatDate(offer.end_date);
    
//     return `${offerType}`;
//   };

//   // Handle text input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: files[0] }));
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value !== null && value !== "") {
//           payload.append(key, value);
//         }
//       });

//       let res;
//       if (editMode && productData) {
//         // Update existing product
//         res = await fetch(`${baseurl}/products/${productData.id}/`, {
//           method: "PUT",
//           body: payload,
//         });
//       } else {
//         // Create new product
//         res = await fetch(`${baseurl}/products/`, {
//           method: "POST",
//           body: payload,
//         });
//       }

//       if (res.ok) {
//         alert(`✅ Product ${editMode ? 'updated' : 'added'} successfully!`);
//         navigate(`/p-businessproducts/${business?.business_id || productData?.business_id}`);
//       } else {
//         const error = await res.text();
//         alert(`❌ Failed to ${editMode ? 'update' : 'add'} product: ` + error);
//       }
//     } catch (err) {
//       console.error("Error posting product:", err);
//     }
//   };

//   return (
//     <>
//       <PartnerHeader />
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
//         <Box display="flex" justifyContent="center" mb={3}>
//           <Typography variant="h2" fontWeight="bold" textAlign="center">
//             {editMode ? 'Edit' : 'Add'} Product {business?.business_name ? `For ${business.business_name}` : ''}
//           </Typography>
//         </Box>

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             {/* Product Info */}
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Product Name"
//                 name="product_name"
//                 value={formData.product_name}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>

//             {/* <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="SKU"
//                 name="sku"
//                 value={formData.sku}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid> */}

//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>

//             {/* Pricing */}
//             {/* <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Selling Price"
//                 name="selling_price"
//                 value={formData.selling_price}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid> */}

//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="MRP"
//                 name="mrp"
//                 value={formData.mrp}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Available Quantity"
//                 name="units"
//                 value={formData.units}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>

//             {/* Offer Selection */}
//             <Grid item xs={12} md={4}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel id="offer-select-label">Select Offer</InputLabel>
//                 <Select
//                   labelId="offer-select-label"
//                   id="offer_id"
//                   name="offer_id"
//                   value={formData.offer_id}
//                   onChange={handleChange}
//                   label="Select Offer"
//                 >
//                   <MenuItem value="">
//                     <em>No Offer</em>
//                   </MenuItem>
//                   {loading ? (
//                     <MenuItem value="" disabled>
//                       Loading offers...
//                     </MenuItem>
//                   ) : offers.length > 0 ? (
//                     offers.map((offer) => (
//                       <MenuItem key={offer.id} value={offer.id}>
//                         {getOfferDisplayText(offer)}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem value="" disabled>
//                       No active offers available
//                     </MenuItem>
//                   )}
//                 </Select>
//               </FormControl>
//               <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
//                 Select an offer to apply to this product
//               </Typography>
//             </Grid>

//             {/* Product Image Upload */}
//             <Grid item xs={12} md={4}>
//               <Button variant="outlined" component="label" fullWidth>
//                 {editMode ? 'Update Product Image' : 'Upload Product Image'}
//                 <input
//                   type="file"
//                   name="product_image"
//                   hidden
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//               </Button>
//               {formData.product_image ? (
//                 <Typography mt={1}>{formData.product_image.name}</Typography>
//               ) : editMode && productData?.product_image ? (
//                 <Typography mt={1} variant="body2">
//                   Current: {productData.product_image.split('/').pop()}
//                 </Typography>
//               ) : null}
//             </Grid>
//           </Grid>

//           <Box display="flex" justifyContent="center" gap={2} mt={4}>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => navigate(`/p-businessproducts/${business?.business_id || productData?.business_id}`)}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{ bgcolor: "#1A0033", px: 5, py: 1.2 }}
//             >
//               {editMode ? 'Update Product' : 'Submit'}
//             </Button>
//           </Box>
//         </form>
//       </Container>
//     </>
//   );
// };

// export default AddProduct;


// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Grid,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   CircularProgress
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import axios from "axios";

// const AddProduct = () => {
//   const userId = localStorage.getItem("user_id");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { business, editMode, productData } = location.state || {};

//   const [offers, setOffers] = useState([]); // State to store offers
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [formData, setFormData] = useState({
//     agent_id: userId,
//     business_id: business?.business_id || "",
//     product_name: "",
//     sku: "",
//     description: "",
//     price: "",
//     selling_price: "",
//     mrp: "",
//     units: "",
//     offer_id: "", // Changed from discount_percent to offer_id
//     product_image: null,
//   });

//   // Fetch offers from API for the current user
//   useEffect(() => {
//     const fetchUserOffers = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Check if user is logged in
//         if (!userId) {
//           setError("Please login to view offers.");
//           setLoading(false);
//           return;
//         }

//         // Fetch offers for the specific user using user_id
//         const response = await axios.get(`${baseurl}/offers/user-id/${userId}/`);
//         console.log('Fetched offers for user:', userId, response.data);
        
//         // Filter only active offers (optional - you can remove this if you want to show all user offers)
//         const activeOffers = response.data.filter(offer => offer.is_active === true);
//         setOffers(activeOffers);
        
//       } catch (error) {
//         console.error('Error fetching offers:', error);
        
//         // Handle different types of errors
//         if (error.response) {
//           // Server responded with error
//           if (error.response.status === 404) {
//             setError("No offers found for your account.");
//             setOffers([]); // Set empty array
//           } else if (error.response.status === 500) {
//             setError("Server error. Please try again later.");
//           } else {
//             setError("Failed to load offers. Please try again.");
//           }
//         } else if (error.request) {
//           // Request made but no response
//           setError("Network error. Please check your connection.");
//         } else {
//           // Other errors
//           setError("An error occurred while loading offers.");
//         }
        
//         // Set empty offers array
//         setOffers([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserOffers();
//   }, [userId]);

//   // Pre-fill form if in edit mode
//   useEffect(() => {
//     if (editMode && productData) {
//       setFormData({
//         agent_id: userId,
//         business_id: productData.business_id || business?.business_id || "",
//         product_name: productData.product_name || "",
//         sku: productData.sku || "",
//         description: productData.description || "",
//         price: productData.distribution_commission || "", // Assuming distribution_commission is the price
//         selling_price: productData.selling_price || "",
//         mrp: productData.mrp || "",
//         units: productData.units || "",
//         offer_id: productData.offer_id || "", // Use offer_id instead of discount_percent
//         product_image: null,
//       });
//     }
//   }, [editMode, productData, business, userId]);

//   // Format offer display text
//   const getOfferDisplayText = (offer) => {
//     if (!offer) return '';
    
//     const formatDate = (dateString) => {
//       if (!dateString) return '';
//       try {
//         const [day, month, year] = dateString.split('-');
//         return `${day}/${month}/${year}`;
//       } catch (error) {
//         return dateString;
//       }
//     };

//     const getOfferTypeDisplay = (type) => {
//       const types = {
//         'discount_percent': 'Discount %',
//         'discount_flat': 'Flat Discount',
//         'buy_x_get_y': 'Buy X Get Y',
//         'free_gift': 'Free Gift'
//       };
//       return types[type] || type;
//     };

//     const formatOfferValue = (offer) => {
//       if (!offer) return '';
      
//       switch(offer.offer_type) {
//         case 'discount_percent':
//           return `${offer.value}%`;
//         case 'discount_flat':
//           return `₹${offer.value}`;
//         case 'buy_x_get_y':
//           return `Buy ${offer.x_quantity} Get ${offer.y_quantity}`;
//         case 'free_gift':
//           return offer.description || 'Free Gift';
//         default:
//           return offer.value || '';
//       }
//     };

//     const offerValue = formatOfferValue(offer);
//     const offerType = getOfferTypeDisplay(offer.offer_type);
//     const startDate = formatDate(offer.start_date);
//     const endDate = formatDate(offer.end_date);
    
//     // Create detailed display text
//     let displayText = `${offerType}`;
    
//     // Add value if available
//     if (offerValue) {
//       displayText += ` - ${offerValue}`;
//     }
    
//     // Add date range if available
//     if (startDate && endDate) {
//       displayText += ` (${startDate} to ${endDate})`;
//     }
    
//     return displayText;
//   };

//   // Handle text input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: files[0] }));
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Validate required fields
//       if (!formData.product_name || !formData.mrp || !formData.units) {
//         alert("❌ Please fill in all required fields: Product Name, MRP, and Available Quantity");
//         return;
//       }

//       const payload = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value !== null && value !== "" && value !== undefined) {
//           payload.append(key, value);
//         }
//       });

//       // Log payload for debugging
//       console.log('Submitting product data:');
//       for (let [key, value] of payload.entries()) {
//         console.log(key, value);
//       }

//       let res;
//       if (editMode && productData) {
//         // Update existing product
//         res = await fetch(`${baseurl}/products/${productData.id}/`, {
//           method: "PUT",
//           body: payload,
//         });
//       } else {
//         // Create new product
//         res = await fetch(`${baseurl}/products/`, {
//           method: "POST",
//           body: payload,
//         });
//       }

//       if (res.ok) {
//         alert(`✅ Product ${editMode ? 'updated' : 'added'} successfully!`);
//         navigate(`/p-businessproducts/${business?.business_id || productData?.business_id}`);
//       } else {
//         const error = await res.text();
//         alert(`❌ Failed to ${editMode ? 'update' : 'add'} product: ` + error);
//       }
//     } catch (err) {
//       console.error("Error posting product:", err);
//       alert("❌ An error occurred. Please try again.");
//     }
//   };

//   return (
//     <>
//       <PartnerHeader />
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
//         <Box display="flex" justifyContent="center" mb={3}>
//           <Typography variant="h2" fontWeight="bold" textAlign="center">
//             {editMode ? 'Edit' : 'Add'} Product {business?.business_name ? `For ${business.business_name}` : ''}
//           </Typography>
//         </Box>

//         {error && !loading && (
//           <Box sx={{ bgcolor: '#fff8e1', p: 2, mb: 3, borderRadius: 1, textAlign: 'center' }}>
//             <Typography color="warning.main">{error}</Typography>
//             <Typography variant="caption" display="block" mt={1}>
//               You can still add the product without an offer, or create offers first from the Offers page.
//             </Typography>
//           </Box>
//         )}

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             {/* Product Info */}
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Product Name"
//                 name="product_name"
//                 value={formData.product_name}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 required
//                 label="MRP"
//                 name="mrp"
//                 value={formData.mrp}
//                 onChange={handleChange}
//                 variant="outlined"
//                 inputProps={{ min: 0, step: "0.01" }}
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Available Quantity"
//                 name="units"
//                 value={formData.units}
//                 onChange={handleChange}
//                 variant="outlined"
//                 type="number"
//                 inputProps={{ min: 0 }}
//               />
//             </Grid>

//             {/* Offer Selection */}
//             <Grid item xs={12} md={4}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel id="offer-select-label">Select Offer</InputLabel>
//                 <Select
//                   labelId="offer-select-label"
//                   id="offer_id"
//                   name="offer_id"
//                   value={formData.offer_id}
//                   onChange={handleChange}
//                   label="Select Offer"
//                   disabled={loading}
//                 >
//                   <MenuItem value="">
//                     <em>No Offer</em>
//                   </MenuItem>
//                   {loading ? (
//                     <MenuItem value="" disabled>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <CircularProgress size={16} />
//                         Loading your offers...
//                       </Box>
//                     </MenuItem>
//                   ) : offers.length > 0 ? (
//                     offers.map((offer) => (
//                       <MenuItem key={offer.id} value={offer.id}>
//                         {getOfferDisplayText(offer)}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem value="" disabled>
//                       No offers available. Create offers first.
//                     </MenuItem>
//                   )}
//                 </Select>
//               </FormControl>
//               <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
//                 {loading ? 'Loading your offers...' : 
//                  offers.length > 0 ? `Select one of your ${offers.length} offer(s)` : 
//                  'No offers available. You can create offers from the Offers page.'}
//               </Typography>
              
//               {/* Link to create offers */}
//               {!loading && offers.length === 0 && (
//                 <Button 
//                   variant="text" 
//                   size="small" 
//                   sx={{ mt: 1 }}
//                   onClick={() => navigate('/p-offers')}
//                 >
//                   Go to Offers Page
//                 </Button>
//               )}
//             </Grid>

//             {/* Product Image Upload */}
//             <Grid item xs={12} md={4}>
//               <Button variant="outlined" component="label" fullWidth>
//                 {editMode ? 'Update Product Image' : 'Upload Product Image'}
//                 <input
//                   type="file"
//                   name="product_image"
//                   hidden
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//               </Button>
//               {formData.product_image ? (
//                 <Typography mt={1} variant="body2">
//                   Selected: {formData.product_image.name}
//                 </Typography>
//               ) : editMode && productData?.product_image ? (
//                 <Typography mt={1} variant="body2">
//                   Current: {productData.product_image.split('/').pop()}
//                 </Typography>
//               ) : (
//                 <Typography mt={1} variant="body2" color="textSecondary">
//                   Optional: Upload product image
//                 </Typography>
//               )}
//             </Grid>
//           </Grid>

//           <Box display="flex" justifyContent="center" gap={2} mt={4}>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => navigate(`/p-businessproducts/${business?.business_id || productData?.business_id}`)}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{ bgcolor: "#1A0033", px: 5, py: 1.2 }}
//             >
//               {editMode ? 'Update Product' : 'Submit'}
//             </Button>
//           </Box>
//         </form>
//       </Container>
//     </>
//   );
// };

// export default AddProduct;




// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Grid,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   CircularProgress,
//   Alert
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import axios from "axios";

// const AddProduct = () => {
//   const userId = localStorage.getItem("user_id");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { business, editMode, productData } = location.state || {};

//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [offersLoading, setOffersLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     agent_id: userId,
//     business_id: business?.business_id || "",
//     product_name: "",
//     description: "",
//     mrp: "",
//     available_qty: "",
//     // IMPORTANT: Changed from offer_id to offer (matching backend field name)
//     offer: "", // Field name must match the model field name
//     product_image: null,
//   });

//   // Fetch offers from API for the current user
//   useEffect(() => {
//     const fetchUserOffers = async () => {
//       try {
//         setOffersLoading(true);
//         setError(null);
        
//         // Check if user is logged in
//         if (!userId) {
//           setError("Please login to view offers.");
//           setOffersLoading(false);
//           return;
//         }

//         // Fetch offers for the specific user using user_id
//         const response = await axios.get(`${baseurl}/offers/user-id/${userId}/`);
//         console.log('Fetched offers for user:', userId, response.data);
        
//         // Filter only active offers
//         const activeOffers = response.data.filter(offer => offer.is_active === true);
//         setOffers(activeOffers);
        
//       } catch (error) {
//         console.error('Error fetching offers:', error);
        
//         if (error.response && error.response.status === 404) {
//           setError("No offers found for your account.");
//           setOffers([]);
//         } else if (error.response && error.response.status === 500) {
//           setError("Server error. Please try again later.");
//           setOffers([]);
//         } else if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
//           setError("Network error. Please check your connection.");
//           setOffers([]);
//         } else {
//           setError("An error occurred while loading offers.");
//           setOffers([]);
//         }
//       } finally {
//         setOffersLoading(false);
//         setLoading(false);
//       }
//     };

//     fetchUserOffers();
//   }, [userId]);

//   // Pre-fill form if in edit mode
//   useEffect(() => {
//     if (editMode && productData) {
//       console.log("Edit mode - Product data:", productData);
      
//       setFormData({
//         agent_id: userId,
//         business_id: productData.business_id || business?.business_id || "",
//         product_name: productData.product_name || "",
//         description: productData.description || "",
//         mrp: productData.mrp || "",
//         available_qty: productData.available_qty || "",
//         // IMPORTANT: Changed from offer_id to offer
//         offer: productData.offer || "", // Use offer field from productData
//         product_image: null,
//       });
      
//       // If product already has an offer, log it
//       if (productData.offer) {
//         console.log("Product has existing offer:", productData.offer);
//       }
//     }
//   }, [editMode, productData, business, userId]);

//   // Format offer display text
//   const getOfferDisplayText = (offer) => {
//     if (!offer) return '';
    
//     const getOfferTypeDisplay = (type) => {
//       const types = {
//         'discount_percent': 'Discount %',
//         'discount_flat': 'Flat Discount',
//         'buy_x_get_y': 'Buy X Get Y',
//         'free_gift': 'Free Gift'
//       };
//       return types[type] || type;
//     };

//     const formatOfferValue = (offer) => {
//       if (!offer) return '';
      
//       switch(offer.offer_type) {
//         case 'discount_percent':
//           return `${offer.value}%`;
//         case 'discount_flat':
//           return `₹${offer.value}`;
//         case 'buy_x_get_y':
//           return `Buy ${offer.x_quantity} Get ${offer.y_quantity}`;
//         case 'free_gift':
//           return offer.description || 'Free Gift';
//         default:
//           return offer.value || '';
//       }
//     };

//     const offerValue = formatOfferValue(offer);
//     const offerType = getOfferTypeDisplay(offer.offer_type);
    
//     // Create display text
//     let displayText = `${offerType}`;
    
//     // Add value if available
//     if (offerValue) {
//       displayText += ` - ${offerValue}`;
//     }
    
//     // Add ID for debugging
//     displayText += ` (ID: ${offer.id})`;
    
//     return displayText;
//   };

//   // Handle text input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(`Changing ${name} to:`, value);
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: files[0] }));
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitLoading(true);
    
//     try {
//       // Validate required fields
//       if (!formData.product_name.trim()) {
//         alert("❌ Please enter Product Name");
//         setSubmitLoading(false);
//         return;
//       }
      
//       if (!formData.mrp || parseFloat(formData.mrp) <= 0) {
//         alert("❌ Please enter a valid MRP");
//         setSubmitLoading(false);
//         return;
//       }
      
//       if (!formData.available_qty || parseInt(formData.available_qty) < 0) {
//         alert("❌ Please enter a valid Available Quantity");
//         setSubmitLoading(false);
//         return;
//       }

//       const payload = new FormData();
      
//       // Add all form data to payload
//       Object.entries(formData).forEach(([key, value]) => {
//         // Handle empty offer field
//         if (key === 'offer' && (value === '' || value === null || value === undefined)) {
//           // Don't send empty offer field
//           console.log("Skipping empty offer field");
//         } 
//         // Handle other fields
//         else if (value !== null && value !== "" && value !== undefined) {
//           console.log(`Appending ${key}:`, value);
//           payload.append(key, value);
//         }
//       });

//       // Log payload for debugging
//       console.log('=== SUBMITTING PRODUCT DATA ===');
//       for (let [key, value] of payload.entries()) {
//         console.log(`${key}:`, value);
//       }
//       console.log('==============================');

//       let endpoint, method;
//       if (editMode && productData) {
//         // Update existing product
//         endpoint = `${baseurl}/products/${productData.id}/`;
//         method = "PUT";
//       } else {
//         // Create new product
//         endpoint = `${baseurl}/products/`;
//         method = "POST";
//       }

//       const response = await axios({
//         method: method,
//         url: endpoint,
//         data: payload,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200 || response.status === 201) {
//         alert(`✅ Product ${editMode ? 'updated' : 'added'} successfully!`);
//         navigate(`/p-businessproducts/${business?.business_id || productData?.business_id}`);
//       } else {
//         alert(`❌ Failed to ${editMode ? 'update' : 'add'} product`);
//       }
//     } catch (err) {
//       console.error("Error posting product:", err);
      
//       // Show detailed error message
//       if (err.response) {
//         console.error("Response error data:", err.response.data);
//         console.error("Response error status:", err.response.status);
        
//         let errorMessage = `❌ Error: ${err.response.status}`;
        
//         if (err.response.data) {
//           if (typeof err.response.data === 'object') {
//             // Handle Django REST Framework validation errors
//             const errors = Object.entries(err.response.data)
//               .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
//               .join('\n');
//             errorMessage = `❌ Validation Errors:\n${errors}`;
//           } else if (typeof err.response.data === 'string') {
//             errorMessage = `❌ ${err.response.data}`;
//           } else if (err.response.data.detail) {
//             errorMessage = `❌ ${err.response.data.detail}`;
//           }
//         }
        
//         alert(errorMessage);
//       } else if (err.request) {
//         alert("❌ No response from server. Please check your connection.");
//       } else {
//         alert("❌ An error occurred. Please try again.");
//       }
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <>
//       <PartnerHeader />
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
//         <Box display="flex" justifyContent="center" mb={3}>
//           <Typography variant="h2" fontWeight="bold" textAlign="center">
//             {editMode ? 'Edit' : 'Add'} Product {business?.business_name ? `For ${business.business_name}` : ''}
//           </Typography>
//         </Box>

//         {error && !offersLoading && (
//           <Alert severity="warning" sx={{ mb: 3 }}>
//             {error}
//             <br />
//             <small>You can still add the product without an offer.</small>
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             {/* Product Info */}
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Product Name "
//                 name="product_name"
//                 value={formData.product_name}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 required
//                 label="MRP (₹) "
//                 name="mrp"
//                 value={formData.mrp}
//                 onChange={handleChange}
//                 variant="outlined"
//                 inputProps={{ min: 0, step: "0.01" }}
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Available Quantity "
//                 name="available_qty"
//                 value={formData.available_qty}
//                 onChange={handleChange}
//                 variant="outlined"
//                 type="number"
//                 inputProps={{ min: 0 }}
//               />
//             </Grid>

//             {/* Offer Selection */}
//             <Grid item xs={12} md={4}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel id="offer-select-label">Select Offer</InputLabel>
//                 <Select
//                   labelId="offer-select-label"
//                   id="offer"
//                   name="offer" // IMPORTANT: Changed from offer_id to offer
//                   value={formData.offer}
//                   onChange={handleChange}
//                   label="Select Offer"
//                   disabled={offersLoading}
//                 >
//                   <MenuItem value="">
//                     <em>No Offer</em>
//                   </MenuItem>
//                   {offersLoading ? (
//                     <MenuItem value="" disabled>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <CircularProgress size={16} />
//                         Loading your offers...
//                       </Box>
//                     </MenuItem>
//                   ) : offers.length > 0 ? (
//                     offers.map((offer) => (
//                       <MenuItem key={offer.id} value={offer.id}> {/* Send offer ID */}
//                         {getOfferDisplayText(offer)}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem value="" disabled>
//                       No offers available
//                     </MenuItem>
//                   )}
//                 </Select>
//               </FormControl>
//               <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
//                 {offersLoading ? 'Loading...' : 
//                  offers.length > 0 ? `Select one of your ${offers.length} offer(s)` : 
//                  'No offers available'}
//               </Typography>
              
//               {!offersLoading && offers.length === 0 && (
//                 <Button 
//                   variant="text" 
//                   size="small" 
//                   sx={{ mt: 1 }}
//                   onClick={() => navigate('/p-offers')}
//                 >
//                   Create Offers First
//                 </Button>
//               )}
//             </Grid>

//             {/* Product Image Upload */}
//             <Grid item xs={12} md={4}>
//               <Button variant="outlined" component="label" fullWidth>
//                 {editMode ? 'Update Product Image' : 'Upload Product Image'}
//                 <input
//                   type="file"
//                   name="product_image"
//                   hidden
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//               </Button>
//               {formData.product_image ? (
//                 <Typography mt={1} variant="body2">
//                   Selected: {formData.product_image.name}
//                 </Typography>
//               ) : editMode && productData?.product_image ? (
//                 <Typography mt={1} variant="body2">
//                   Current: {productData.product_image.split('/').pop()}
//                 </Typography>
//               ) : (
//                 <Typography mt={1} variant="body2" color="textSecondary">
//                   Optional: Upload product image
//                 </Typography>
//               )}
//             </Grid>
//           </Grid>

//           <Box display="flex" justifyContent="center" gap={2} mt={4}>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => navigate(`/p-businessproducts/${business?.business_id || productData?.business_id}`)}
//               disabled={submitLoading}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               disabled={submitLoading}
//               sx={{ 
//                 bgcolor: "#1A0033", 
//                 px: 5, 
//                 py: 1.2,
//                 '&:disabled': {
//                   bgcolor: '#ccc'
//                 }
//               }}
//             >
//               {submitLoading ? (
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <CircularProgress size={20} color="inherit" />
//                   {editMode ? 'Updating...' : 'Submitting...'}
//                 </Box>
//               ) : (
//                 editMode ? 'Update Product' : 'Submit'
//               )}
//             </Button>
//           </Box>
//         </form>
//       </Container>
//     </>
//   );
// };

// export default AddProduct;


import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { baseurl } from "../../../BaseURL/BaseURL";
import axios from "axios";

const AddProduct = () => {
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const location = useLocation();
  const { business, editMode, productData } = location.state || {};

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offersLoading, setOffersLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState({
    agent_id: userId,
    business_id: business?.business_id || "",
    product_name: "",
    description: "",
    mrp: "",
    available_qty: "",
    // IMPORTANT: Changed from offer_id to offer (matching backend field name)
    offer: "", // Field name must match the model field name
    product_image: null,
    // CHANGED: Product commission field as amount (not percentage)
    product_commission: "", // Amount in currency (e.g., ₹500)
  });

  // Fetch offers from API for the current user
  useEffect(() => {
    const fetchUserOffers = async () => {
      try {
        setOffersLoading(true);
        setError(null);
        
        // Check if user is logged in
        if (!userId) {
          setError("Please login to view offers.");
          setOffersLoading(false);
          return;
        }

        // Fetch offers for the specific user using user_id
        const response = await axios.get(`${baseurl}/offers/user-id/${userId}/`);
        console.log('Fetched offers for user:', userId, response.data);
        
        // Filter only active offers
        const activeOffers = response.data.filter(offer => offer.is_active === true);
        setOffers(activeOffers);
        
      } catch (error) {
        console.error('Error fetching offers:', error);
        
        if (error.response && error.response.status === 404) {
          setError("No offers found for your account.");
          setOffers([]);
        } else if (error.response && error.response.status === 500) {
          setError("Server error. Please try again later.");
          setOffers([]);
        } else if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
          setError("Network error. Please check your connection.");
          setOffers([]);
        } else {
          setError("An error occurred while loading offers.");
          setOffers([]);
        }
      } finally {
        setOffersLoading(false);
        setLoading(false);
      }
    };

    fetchUserOffers();
  }, [userId]);

  // Pre-fill form if in edit mode
  useEffect(() => {
    if (editMode && productData) {
      console.log("Edit mode - Product data:", productData);
      
      setFormData({
        agent_id: userId,
        business_id: productData.business_id || business?.business_id || "",
        product_name: productData.product_name || "",
        description: productData.description || "",
        mrp: productData.mrp || "",
        available_qty: productData.available_qty || "",
        // IMPORTANT: Changed from offer_id to offer
        offer: productData.offer || "", // Use offer field from productData
        product_image: null,
        // CHANGED: Pre-fill commission as amount
        product_commission: productData.product_commission || "", // Amount field
      });
      
      // If product already has an offer, log it
      if (productData.offer) {
        console.log("Product has existing offer:", productData.offer);
      }
    }
  }, [editMode, productData, business, userId]);

  // Format offer display text
  const getOfferDisplayText = (offer) => {
    if (!offer) return '';
    
    const getOfferTypeDisplay = (type) => {
      const types = {
        'discount_percent': 'Discount %',
        'discount_flat': 'Flat Discount',
        'buy_x_get_y': 'Buy X Get Y',
        'free_gift': 'Free Gift'
      };
      return types[type] || type;
    };

    const formatOfferValue = (offer) => {
      if (!offer) return '';
      
      switch(offer.offer_type) {
        case 'discount_percent':
          return `${offer.value}%`;
        case 'discount_flat':
          return `₹${offer.value}`;
        case 'buy_x_get_y':
          return `Buy ${offer.x_quantity} Get ${offer.y_quantity}`;
        case 'free_gift':
          return offer.description || 'Free Gift';
        default:
          return offer.value || '';
      }
    };

    const offerValue = formatOfferValue(offer);
    const offerType = getOfferTypeDisplay(offer.offer_type);
    
    // Create display text
    let displayText = `${offerType}`;
    
    // Add value if available
    if (offerValue) {
      displayText += ` - ${offerValue}`;
    }
    
    // Add ID for debugging
    displayText += ` (ID: ${offer.id})`;
    
    return displayText;
  };

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to:`, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    try {
      // Validate required fields
      if (!formData.product_name.trim()) {
        alert("❌ Please enter Product Name");
        setSubmitLoading(false);
        return;
      }
      
      if (!formData.mrp || parseFloat(formData.mrp) <= 0) {
        alert("❌ Please enter a valid MRP");
        setSubmitLoading(false);
        return;
      }
      
      if (!formData.available_qty || parseInt(formData.available_qty) < 0) {
        alert("❌ Please enter a valid Available Quantity");
        setSubmitLoading(false);
        return;
      }

      // Validate commission field (optional but if provided should be valid)
      if (formData.product_commission && parseFloat(formData.product_commission) < 0) {
        alert("❌ Commission amount cannot be negative");
        setSubmitLoading(false);
        return;
      }

      const payload = new FormData();
      
      // Add all form data to payload
      Object.entries(formData).forEach(([key, value]) => {
        // Handle empty offer field
        if (key === 'offer' && (value === '' || value === null || value === undefined)) {
          // Don't send empty offer field
          console.log("Skipping empty offer field");
        } 
        // Handle product_commission field
        else if (key === 'product_commission') {
          // Send commission field as amount
          // If empty string, send empty string (not 0)
          console.log(`Appending ${key}:`, value);
          payload.append(key, value === '' ? '' : value);
        }
        // Handle other fields
        else if (value !== null && value !== "" && value !== undefined) {
          console.log(`Appending ${key}:`, value);
          payload.append(key, value);
        }
      });

      // Log payload for debugging
      console.log('=== SUBMITTING PRODUCT DATA ===');
      for (let [key, value] of payload.entries()) {
        console.log(`${key}:`, value);
      }
      console.log('==============================');

      let endpoint, method;
      if (editMode && productData) {
        // Update existing product
        endpoint = `${baseurl}/products/${productData.id}/`;
        method = "PUT";
      } else {
        // Create new product
        endpoint = `${baseurl}/products/`;
        method = "POST";
      }

      const response = await axios({
        method: method,
        url: endpoint,
        data: payload,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert(`✅ Product ${editMode ? 'updated' : 'added'} successfully!`);
        navigate(`/p-businessproducts/${business?.business_id || productData?.business_id}`);
      } else {
        alert(`❌ Failed to ${editMode ? 'update' : 'add'} product`);
      }
    } catch (err) {
      console.error("Error posting product:", err);
      
      // Show detailed error message
      if (err.response) {
        console.error("Response error data:", err.response.data);
        console.error("Response error status:", err.response.status);
        
        let errorMessage = `❌ Error: ${err.response.status}`;
        
        if (err.response.data) {
          if (typeof err.response.data === 'object') {
            // Handle Django REST Framework validation errors
            const errors = Object.entries(err.response.data)
              .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
              .join('\n');
            errorMessage = `❌ Validation Errors:\n${errors}`;
          } else if (typeof err.response.data === 'string') {
            errorMessage = `❌ ${err.response.data}`;
          } else if (err.response.data.detail) {
            errorMessage = `❌ ${err.response.data.detail}`;
          }
        }
        
        alert(errorMessage);
      } else if (err.request) {
        alert("❌ No response from server. Please check your connection.");
      } else {
        alert("❌ An error occurred. Please try again.");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Typography variant="h2" fontWeight="bold" textAlign="center">
            {editMode ? 'Edit' : 'Add'} Product {business?.business_name ? `For ${business.business_name}` : ''}
          </Typography>
        </Box>

        {error && !offersLoading && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {error}
            <br />
            <small>You can still add the product without an offer.</small>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Product Info */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Product Name "
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                required
                label="MRP (₹) "
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                variant="outlined"
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Available Quantity "
                name="available_qty"
                value={formData.available_qty}
                onChange={handleChange}
                variant="outlined"
                type="number"
                inputProps={{ min: 0 }}
              />
            </Grid>

            {/* CHANGED: Product Commission Field as amount */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Product Payout (₹) "
                name="product_commission"
                value={formData.product_commission}
                onChange={handleChange}
                variant="outlined"
                inputProps={{ 
                  min: 0,
                  step: "0.01"  // Allow decimal values
                }}
                helperText="Enter commission amount in ₹ (e.g., 500)"
              />
            </Grid>

            {/* Offer Selection */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="offer-select-label">Select Offer</InputLabel>
                <Select
                  labelId="offer-select-label"
                  id="offer"
                  name="offer" // IMPORTANT: Changed from offer_id to offer
                  value={formData.offer}
                  onChange={handleChange}
                  label="Select Offer"
                  disabled={offersLoading}
                >
                  <MenuItem value="">
                    <em>No Offer</em>
                  </MenuItem>
                  {offersLoading ? (
                    <MenuItem value="" disabled>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={16} />
                        Loading your offers...
                      </Box>
                    </MenuItem>
                  ) : offers.length > 0 ? (
                    offers.map((offer) => (
                      <MenuItem key={offer.id} value={offer.id}> {/* Send offer ID */}
                        {getOfferDisplayText(offer)}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No offers available
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                {offersLoading ? 'Loading...' : 
                 offers.length > 0 ? `Select one of your ${offers.length} offer(s)` : 
                 'No offers available'}
              </Typography>
              
              {!offersLoading && offers.length === 0 && (
                <Button 
                  variant="text" 
                  size="small" 
                  sx={{ mt: 1 }}
                  onClick={() => navigate('/p-offers')}
                >
                  Create Offers First
                </Button>
              )}
            </Grid>

            {/* Product Image Upload */}
            <Grid item xs={12} md={4}>
              <Button variant="outlined" component="label" fullWidth>
                {editMode ? 'Update Product Image' : 'Upload Product Image'}
                <input
                  type="file"
                  name="product_image"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {formData.product_image ? (
                <Typography mt={1} variant="body2">
                  Selected: {formData.product_image.name}
                </Typography>
              ) : editMode && productData?.product_image ? (
                <Typography mt={1} variant="body2">
                  Current: {productData.product_image.split('/').pop()}
                </Typography>
              ) : (
                <Typography mt={1} variant="body2" color="textSecondary">
                  Optional: Upload product image
                </Typography>
              )}
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" gap={2} mt={4}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(`/p-businessproducts/${business?.business_id || productData?.business_id}`)}
              disabled={submitLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitLoading}
              sx={{ 
                bgcolor: "#1A0033", 
                px: 5, 
                py: 1.2,
                '&:disabled': {
                  bgcolor: '#ccc'
                }
              }}
            >
              {submitLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  {editMode ? 'Updating...' : 'Submitting...'}
                </Box>
              ) : (
                editMode ? 'Update Product' : 'Submit'
              )}
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default AddProduct;