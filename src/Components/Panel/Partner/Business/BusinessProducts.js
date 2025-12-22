// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CardMedia,
//   Box,
//   CircularProgress,
//   Divider,
//   Button,
//   IconButton,
//   Popover,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Tooltip
// } from "@mui/material";
// import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import PaginationComponent from "../../../Shared/Pagination";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// function BusinessProducts() { 
//   const { id } = useParams();
//   const [products, setProducts] = useState([]);
//   const [commissions, setCommissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("user_id");

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [hoveredProduct, setHoveredProduct] = useState(null);
//   const [wishlist, setWishlist] = useState([]);
  
//   // Delete confirmation dialog
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   // Fetch wishlist
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const res = await axios.get(`${baseurl}/wishlist/`);
//         const userWishlist = res.data
//           .filter(item => item.user === parseInt(userId))
//           .map(item => item.product);
//         setWishlist(userWishlist);
//       } catch (err) {
//         console.error("Error fetching wishlist:", err);
//       }
//     };
  
//     if (userId) fetchWishlist();
//   }, [userId]);
  
//   // Fetch products by business ID
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${baseurl}/products/`);
//         const data = await res.json();
//         const filtered = data.filter(
//           (item) => String(item.business_id) === String(id)
//         );
//         setProducts(filtered);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [id]);

//   // Fetch commission master
//   useEffect(() => {
//     const fetchCommissions = async () => {
//       try {
//         const response = await axios.get(`${baseurl}/commissions-master/`);
//         setCommissions(response.data);
//       } catch (error) {
//         console.error("Error fetching commissions:", error);
//       }
//     };
//     fetchCommissions();
//   }, []);

//   // Wishlist toggle
//   const handleWishlistToggle = async (productId) => {
//     if (!userId) {
//       alert("Please log in to add to wishlist.");
//       return;
//     }
  
//     try {
//       if (wishlist.includes(productId)) {
//         const res = await axios.get(`${baseurl}/wishlist/`);
//         const item = res.data.find(
//           (entry) => entry.user === parseInt(userId) && entry.product === productId
//         );
  
//         if (item) {
//           await axios.delete(`${baseurl}/wishlist/${item.id}/`);
//           setWishlist((prev) => prev.filter((id) => id !== productId));
//         }
//       } else {
//         await axios.post(`${baseurl}/wishlist/`, {
//           user: parseInt(userId),
//           product: productId,
//         });
//         setWishlist((prev) => [...prev, productId]);
//       }
//     } catch (error) {
//       console.error("Error updating wishlist:", error);
//     }
//   };

//   // Popover handlers
//   const handlePopoverOpen = (event, productId) => {
//     setAnchorEl(event.currentTarget);
//     setHoveredProduct(productId);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//     setHoveredProduct(null);
//   };

//   // Edit product - Navigate to AddProduct form with pre-filled data
//   const handleEditClick = (product) => {
//     // Navigate to AddProduct form with product data
//     navigate("/p-addproduct", {
//       state: {
//         business: { business_id: id }, // Pass business ID
//         editMode: true,
//         productData: product // Pass the product data to pre-fill
//       }
//     });
//   };

//   // Delete product functions
//   const handleDeleteClick = (product) => {
//     setProductToDelete(product);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!productToDelete) return;

//     try {
//       await axios.delete(`${baseurl}/products/${productToDelete.id}/`);
      
//       // Remove from local state
//       setProducts(products.filter(p => p.id !== productToDelete.id));
      
//       alert("Product deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Failed to delete product.");
//     } finally {
//       setDeleteDialogOpen(false);
//       setProductToDelete(null);
//     }
//   };

//   // View details
//   const handleViewDetails = async (product) => {
//     try {
//       await fetch(`${baseurl}/products/${product.id}/`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           view_count: (product.view_count || 0) + 1,
//         }),
//       });
//       navigate(`/product-details/${product.id}`);
//     } catch (error) {
//       console.log("Error updating view count:", error);
//       navigate(`/product-details/${product.id}`);
//     }
//   };

//   // Pagination
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 6;

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const open = Boolean(anchorEl);
//   const totalPages = Math.ceil(products.length / itemsPerPage) || 1;
//   const startIndex = (page - 1) * itemsPerPage;
//   const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <>
//       <PartnerHeader />
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
//           Products for Business
//         </Typography>

//         {loading ? (
//           <Box display="flex" justifyContent="center" mt={5}>
//             <CircularProgress />
//           </Box>
//         ) : products.length === 0 ? (
//           <Typography align="center" sx={{ mt: 5 }} color="text.secondary">
//             No products found for this business.
//           </Typography>
//         ) : (
//           <Grid container spacing={3} sx={{ mt: 2 }}>
//             {paginatedProducts.map((product, index) => (
//               <Grid item xs={12} sm={6} md={4} key={product.id || index}>
//                 <Card
//                   sx={{
//                     borderRadius: 3,
//                     boxShadow: 4,
//                     height: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     position: "relative",
//                   }}
//                 >
//                   {/* Edit and Delete Buttons */}
//                   <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}>
//                     <Tooltip title="Edit Product">
//                       <IconButton
//                         size="small"
//                         sx={{ 
//                           backgroundColor: "white",
//                           mr: 1,
//                           "&:hover": { backgroundColor: "#f0f0f0" }
//                         }}
//                         onClick={() => handleEditClick(product)}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
                    
//                     <Tooltip title="Delete Product">
//                       <IconButton
//                         size="small"
//                         sx={{ 
//                           backgroundColor: "white",
//                           "&:hover": { backgroundColor: "#f0f0f0" }
//                         }}
//                         onClick={() => handleDeleteClick(product)}
//                       >
//                         <DeleteIcon fontSize="small" color="error" />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>

//                   {/* Product Image */}
//                   {product.product_image ? (
//                     <CardMedia
//                       component="img"
//                       alt={product.product_name}
//                       height="200"
//                       image={`${baseurl}/${product.product_image}`}
//                       sx={{ objectFit: "cover" }}
//                     />
//                   ) : (
//                     <Box
//                       height="200px"
//                       display="flex"
//                       alignItems="center"
//                       justifyContent="center"
//                       bgcolor="#f5f5f5"
//                     >
//                       <Typography color="text.secondary">No Image</Typography>
//                     </Box>
//                   )}

//                   {/* Product Info */}
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
//                       <Typography variant="h6" fontWeight="bold">
//                         {product.product_name} 
//                       </Typography>
//                       <IconButton
//                         onClick={() => handleWishlistToggle(product.id)}
//                         sx={{
//                           backgroundColor: "rgba(255,255,255,0.8)",
//                           "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
//                         }}
//                       >
//                         {wishlist.includes(product.id) ? (
//                           <FavoriteIcon sx={{ color: "red" }} />
//                         ) : (
//                           <FavoriteBorderIcon sx={{ color: "red" }} />
//                         )}
//                       </IconButton>
//                     </Box>

//                     <Divider sx={{ my: 1.5 }} />

//                     <Typography variant="body2">
//                       <strong>Selling Price:</strong> ₹{product.selling_price}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>MRP:</strong> ₹{product.mrp}
//                     </Typography>

//                     <Divider sx={{ my: 1.5 }} />

//                     {product.description && (
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{ mt: 1 }}
//                       >
//                         <strong>Description:</strong> {product.description}
//                       </Typography>
//                     )}

//                     <Box sx={{ mt: 2 }}>
//                       <Button
//                         onClick={() => handleViewDetails(product)}
//                         fullWidth
//                         variant="contained"
//                         sx={{
//                           color: "white",
//                           textTransform: "none",
//                           "&:hover": { color: "rgb(5,5,5)" },
//                           mb: 1,
//                           backgroundColor: "green",
//                         }}
//                       >
//                         View Details
//                       </Button>
//                     </Box>

//                     {/* Payout Button with Hover Popover */}
//                     <Box sx={{ mt: 1 }}>
//                       <Button
//                         onMouseEnter={(e) => handlePopoverOpen(e, product.id)}
//                         onMouseLeave={handlePopoverClose}
//                         fullWidth
//                         variant="contained"
//                         sx={{
//                           color: "white",
//                           textTransform: "none",
//                           "&:hover": { color: "rgb(5,5,5)" },
//                           mb: 1,
//                         }}
//                       >
//                         Payout
//                       </Button>

//                       <Popover
//                         id="mouse-over-popover"
//                         sx={{ pointerEvents: "none" }}
//                         open={open && hoveredProduct === product.id}
//                         anchorEl={anchorEl}
//                         anchorOrigin={{
//                           vertical: "bottom",
//                           horizontal: "left",
//                         }}
//                         transformOrigin={{
//                           vertical: "top",
//                           horizontal: "left",
//                         }}
//                         onClose={handlePopoverClose}
//                         disableRestoreFocus
//                       >
//                         <Box sx={{ p: 2 }}>
//                           <Typography fontWeight="bold">Commissions</Typography>
//                           {commissions.length > 0 ? (
//                             commissions.map((c) => {
//                               const amount =
//                                 (parseFloat(c.percentage) *
//                                   (product.distribution_commission || 0)) /
//                                 100;
//                               return (
//                                 <Typography key={c.id} variant="body2">
//                                   Team {c.level_no}: ₹
//                                   {amount.toLocaleString(undefined, {
//                                     minimumFractionDigits: 2,
//                                   })}
//                                 </Typography>
//                               );
//                             })
//                           ) : (
//                             <Typography variant="body2" color="text.secondary">
//                               No commission data
//                             </Typography>
//                           )}
//                         </Box>
//                       </Popover>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}

//         {products.length > 0 && (
//           <Box display="flex" justifyContent="flex-end" mt={4}>
//             <PaginationComponent
//               count={totalPages > 0 ? totalPages : 1}
//               page={page}
//               onChange={handlePageChange}
//             />
//           </Box>
//         )}
//       </Container>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete "{productToDelete?.product_name}"? 
//             This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleDeleteConfirm} variant="contained" color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default BusinessProducts;




// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CardMedia,
//   Box,
//   CircularProgress,
//   Divider,
//   Button,
//   IconButton,
//   Popover,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Tooltip,
//   Snackbar,
//   Alert,
//   Badge
// } from "@mui/material";
// import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import PaginationComponent from "../../../Shared/Pagination";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";

// function BusinessProducts() { 
//   const { id } = useParams();
//   const [products, setProducts] = useState([]);
//   const [commissions, setCommissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("user_id");

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [hoveredProduct, setHoveredProduct] = useState(null);
//   const [wishlist, setWishlist] = useState([]);
  
//   // Delete confirmation dialog
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   // Cart states
//   const [cartQuantities, setCartQuantities] = useState({});
//   const [cartItems, setCartItems] = useState([]);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
//   // Fetch wishlist
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const res = await axios.get(`${baseurl}/wishlist/`);
//         const userWishlist = res.data
//           .filter(item => item.user === parseInt(userId))
//           .map(item => item.product);
//         setWishlist(userWishlist);
//       } catch (err) {
//         console.error("Error fetching wishlist:", err);
//       }
//     };
  
//     if (userId) fetchWishlist();
//   }, [userId]);
  
//   // Fetch products by business ID
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${baseurl}/products/`);
//         const data = await res.json();
//         const filtered = data.filter(
//           (item) => String(item.business_id) === String(id)
//         );
//         setProducts(filtered);
        
//         // Initialize cart quantities
//         const initialQuantities = {};
//         filtered.forEach(product => {
//           initialQuantities[product.id] = 1; // Default quantity
//         });
//         setCartQuantities(initialQuantities);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [id]);

//   // Fetch commission master
//   useEffect(() => {
//     const fetchCommissions = async () => {
//       try {
//         const response = await axios.get(`${baseurl}/commissions-master/`);
//         setCommissions(response.data);
//       } catch (error) {
//         console.error("Error fetching commissions:", error);
//       }
//     };
//     fetchCommissions();
//   }, []);

//   // Fetch cart items for the current user
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       if (!userId) return;
      
//       try {
//         const response = await axios.get(`${baseurl}/cart/`);
//         const userCartItems = response.data.filter(
//           item => item.user === parseInt(userId)
//         );
//         setCartItems(userCartItems);
        
//         // Update cart quantities from server
//         const quantities = {};
//         userCartItems.forEach(item => {
//           quantities[item.product] = item.quantity;
//         });
//         setCartQuantities(prev => ({ ...prev, ...quantities }));
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//       }
//     };
    
//     fetchCartItems();
//   }, [userId]);

//   // Wishlist toggle
//   const handleWishlistToggle = async (productId) => {
//     if (!userId) {
//       alert("Please log in to add to wishlist.");
//       return;
//     }
  
//     try {
//       if (wishlist.includes(productId)) {
//         const res = await axios.get(`${baseurl}/wishlist/`);
//         const item = res.data.find(
//           (entry) => entry.user === parseInt(userId) && entry.product === productId
//         );
  
//         if (item) {
//           await axios.delete(`${baseurl}/wishlist/${item.id}/`);
//           setWishlist((prev) => prev.filter((id) => id !== productId));
//         }
//       } else {
//         await axios.post(`${baseurl}/wishlist/`, {
//           user: parseInt(userId),
//           product: productId,
//         });
//         setWishlist((prev) => [...prev, productId]);
//       }
//     } catch (error) {
//       console.error("Error updating wishlist:", error);
//     }
//   };

//   // Cart quantity handlers
//   const handleQuantityIncrease = (productId) => {
//     setCartQuantities(prev => ({
//       ...prev,
//       [productId]: (prev[productId] || 1) + 1
//     }));
//   };

//   const handleQuantityDecrease = (productId) => {
//     if (cartQuantities[productId] > 1) {
//       setCartQuantities(prev => ({
//         ...prev,
//         [productId]: prev[productId] - 1
//       }));
//     }
//   };

//   // Find cart item ID for a specific product
//   const getCartItemIdForProduct = (productId) => {
//     const cartItem = cartItems.find(
//       item => item.product === productId && item.user === parseInt(userId)
//     );
//     return cartItem ? cartItem.id : null;
//   };

//   // Add to cart function - using your correct API endpoints
//   const handleAddToCart = async (product) => {
//     if (!userId) {
//       alert("Please log in to add items to cart.");
//       return;
//     }

//     const quantity = cartQuantities[product.id] || 1;
//     const cartItemId = getCartItemIdForProduct(product.id);
    
//     try {
//       if (cartItemId) {
//         // Update existing cart item using PUT /cart/cart-id/{id}/
//         await axios.put(`${baseurl}/cart/cart-id/${cartItemId}/`, {
//           user: parseInt(userId),
//           product: product.id,
//           quantity: quantity
//         });
//         setSnackbarMessage(`Updated "${product.product_name}" quantity to ${quantity}`);
//       } else {
//         // Add new item to cart using POST /cart/
//         await axios.post(`${baseurl}/cart/`, {
//           user: parseInt(userId),
//           product: product.id,
//           quantity: quantity
//         });
//         setSnackbarMessage(`"${product.product_name}" added to cart successfully!`);
//       }
      
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
      
//       // Refresh cart items
//       const response = await axios.get(`${baseurl}/cart/`);
//       const userCartItems = response.data.filter(
//         item => item.user === parseInt(userId)
//       );
//       setCartItems(userCartItems);
      
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       setSnackbarMessage("Failed to add item to cart. Please try again.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   // Remove from cart function
//   const handleRemoveFromCart = async (product) => {
//     if (!userId) return;

//     const cartItemId = getCartItemIdForProduct(product.id);
//     if (!cartItemId) return;

//     try {
//       // Delete cart item using DELETE /cart/cart-id/{id}/
//       await axios.delete(`${baseurl}/cart/cart-id/${cartItemId}/`);
      
//       // Update local state
//       setCartItems(prev => prev.filter(item => item.id !== cartItemId));
//       setCartQuantities(prev => ({
//         ...prev,
//         [product.id]: 1 // Reset to default quantity
//       }));
      
//       setSnackbarMessage(`"${product.product_name}" removed from cart`);
//       setSnackbarSeverity("info");
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//       setSnackbarMessage("Failed to remove item from cart");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   // Check if product is in cart
//   const isProductInCart = (productId) => {
//     return cartItems.some(
//       item => item.product === productId && item.user === parseInt(userId || 0)
//     );
//   };

//   // Get current quantity in cart for a product
//   const getProductCartQuantity = (productId) => {
//     const cartItem = cartItems.find(
//       item => item.product === productId && item.user === parseInt(userId)
//     );
//     return cartItem ? cartItem.quantity : 0;
//   };

//   // Popover handlers
//   const handlePopoverOpen = (event, productId) => {
//     setAnchorEl(event.currentTarget);
//     setHoveredProduct(productId);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//     setHoveredProduct(null);
//   };

//   // Edit product - Navigate to AddProduct form with pre-filled data
//   const handleEditClick = (product) => {
//     // Navigate to AddProduct form with product data
//     navigate("/p-addproduct", {
//       state: {
//         business: { business_id: id }, // Pass business ID
//         editMode: true,
//         productData: product // Pass the product data to pre-fill
//       }
//     });
//   };

//   // Delete product functions
//   const handleDeleteClick = (product) => {
//     setProductToDelete(product);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!productToDelete) return;

//     try {
//       await axios.delete(`${baseurl}/products/${productToDelete.id}/`);
      
//       // Remove from local state
//       setProducts(products.filter(p => p.id !== productToDelete.id));
      
//       alert("Product deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Failed to delete product.");
//     } finally {
//       setDeleteDialogOpen(false);
//       setProductToDelete(null);
//     }
//   };

//   // View details
//   const handleViewDetails = async (product) => {
//     try {
//       await fetch(`${baseurl}/products/${product.id}/`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           view_count: (product.view_count || 0) + 1,
//         }),
//       });
//       navigate(`/product-details/${product.id}`);
//     } catch (error) {
//       console.log("Error updating view count:", error);
//       navigate(`/product-details/${product.id}`);
//     }
//   };

//   // Snackbar handler
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   // Navigate to cart page
//   const handleViewCart = () => {
//     navigate("/add-to-cart-list");
//   };

//   // Calculate total items in cart
//   const getTotalCartItems = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   // Pagination
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 6;

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const open = Boolean(anchorEl);
//   const totalPages = Math.ceil(products.length / itemsPerPage) || 1;
//   const startIndex = (page - 1) * itemsPerPage;
//   const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <>
//       <PartnerHeader />
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//           <Typography variant="h4" fontWeight="bold">
//             Products for Business
//           </Typography>
//           <Badge 
//             badgeContent={getTotalCartItems()} 
//             color="primary"
//             sx={{ mr: 2 }}
//           >
//             <Button
//               variant="contained"
//               startIcon={<ShoppingCartIcon />}
//               onClick={handleViewCart}
//               sx={{
//                 backgroundColor: "#1976d2",
//                 "&:hover": { backgroundColor: "#1565c0" }
//               }}
//             >
//               View Cart
//             </Button>
//           </Badge>
//         </Box>

//         {loading ? (
//           <Box display="flex" justifyContent="center" mt={5}>
//             <CircularProgress />
//           </Box>
//         ) : products.length === 0 ? (
//           <Typography align="center" sx={{ mt: 5 }} color="text.secondary">
//             No products found for this business.
//           </Typography>
//         ) : (
//           <Grid container spacing={3} sx={{ mt: 2 }}>
//             {paginatedProducts.map((product, index) => {
//               const currentQuantity = cartQuantities[product.id] || 1;
//               const isInCart = isProductInCart(product.id);
              
//               return (
//                 <Grid item xs={12} sm={6} md={4} key={product.id || index}>
//                   <Card
//                     sx={{
//                       borderRadius: 3,
//                       boxShadow: 4,
//                       height: "100%",
//                       display: "flex",
//                       flexDirection: "column",
//                       position: "relative",
//                     }}
//                   >
//                     {/* Edit and Delete Buttons */}
//                     {/* <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}>
//                       <Tooltip title="Edit Product">
//                         <IconButton
//                           size="small"
//                           sx={{ 
//                             backgroundColor: "white",
//                             mr: 1,
//                             "&:hover": { backgroundColor: "#f0f0f0" }
//                           }}
//                           onClick={() => handleEditClick(product)}
//                         >
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
                      
//                       <Tooltip title="Delete Product">
//                         <IconButton
//                           size="small"
//                           sx={{ 
//                             backgroundColor: "white",
//                             "&:hover": { backgroundColor: "#f0f0f0" }
//                           }}
//                           onClick={() => handleDeleteClick(product)}
//                         >
//                           <DeleteIcon fontSize="small" color="error" />
//                         </IconButton>
//                       </Tooltip>
//                     </Box> */}

//                     {/* Product Image */}
//                     {product.product_image ? (
//                       <CardMedia
//                         component="img"
//                         alt={product.product_name}
//                         height="200"
//                         image={`${baseurl}/${product.product_image}`}
//                         sx={{ objectFit: "cover" }}
//                       />
//                     ) : (
//                       <Box
//                         height="200px"
//                         display="flex"
//                         alignItems="center"
//                         justifyContent="center"
//                         bgcolor="#f5f5f5"
//                       >
//                         <Typography color="text.secondary">No Image</Typography>
//                       </Box>
//                     )}

//                     {/* Product Info */}
//                     <CardContent sx={{ flexGrow: 1 }}>
//                       <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
//                         <Typography variant="h6" fontWeight="bold">
//                           {product.product_name} 
//                         </Typography>
//                         <IconButton
//                           onClick={() => handleWishlistToggle(product.id)}
//                           sx={{
//                             backgroundColor: "rgba(255,255,255,0.8)",
//                             "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
//                           }}
//                         >
//                           {wishlist.includes(product.id) ? (
//                             <FavoriteIcon sx={{ color: "red" }} />
//                           ) : (
//                             <FavoriteBorderIcon sx={{ color: "red" }} />
//                           )}
//                         </IconButton>
//                       </Box>

//                       <Divider sx={{ my: 1.5 }} />

//                       <Typography variant="body2">
//                         <strong>Selling Price:</strong> ₹{product.selling_price}
//                       </Typography>
//                       <Typography variant="body2">
//                         <strong>MRP:</strong> ₹{product.mrp}
//                       </Typography>

//                       <Divider sx={{ my: 1.5 }} />

//                       {product.description && (
//                         <Typography
//                           variant="body2"
//                           color="text.secondary"
//                           sx={{ mt: 1 }}
//                         >
//                           <strong>Description:</strong> {product.description}
//                         </Typography>
//                       )}

//                       {/* Quantity Selector and Add to Cart */}
//                       <Box sx={{ mt: 2, mb: 2 }}>
//                         <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
//                           <Typography variant="body2" fontWeight="medium">
//                             Quantity:
//                           </Typography>
//                           <Box display="flex" alignItems="center">
//                             <IconButton
//                               size="small"
//                               onClick={() => handleQuantityDecrease(product.id)}
//                               disabled={currentQuantity <= 1}
//                               sx={{ mr: 1 }}
//                             >
//                               <RemoveIcon fontSize="small" />
//                             </IconButton>
//                             <Typography variant="body1" sx={{ minWidth: "30px", textAlign: "center" }}>
//                               {currentQuantity}
//                             </Typography>
//                             <IconButton
//                               size="small"
//                               onClick={() => handleQuantityIncrease(product.id)}
//                               sx={{ ml: 1 }}
//                             >
//                               <AddIcon fontSize="small" />
//                             </IconButton>
//                           </Box>
//                         </Box>
                        
//                         <Box display="flex" gap={1}>
//                           {isInCart ? (
//                             <>
//                               <Button
//                                 onClick={() => handleAddToCart(product)}
//                                 variant="contained"
//                                 startIcon={<ShoppingCartIcon />}
//                                 sx={{
//                                   flex: 2,
//                                   backgroundColor: "#ff9800",
//                                   "&:hover": { backgroundColor: "#f57c00" },
//                                   textTransform: "none",
//                                 }}
//                               >
//                                 Update Cart
//                               </Button>
//                               <Button
//                                 onClick={() => handleRemoveFromCart(product)}
//                                 variant="outlined"
//                                 color="error"
//                                 sx={{
//                                   flex: 1,
//                                   textTransform: "none",
//                                 }}
//                               >
//                                 Remove
//                               </Button>
//                             </>
//                           ) : (
//                             <Button
//                               onClick={() => handleAddToCart(product)}
//                               fullWidth
//                               variant="contained"
//                               startIcon={<ShoppingCartIcon />}
//                               sx={{
//                                 backgroundColor: "#1976d2",
//                                 "&:hover": { backgroundColor: "#1565c0" },
//                                 textTransform: "none",
//                               }}
//                             >
//                               Add to Cart
//                             </Button>
//                           )}
//                         </Box>
//                       </Box>

//                       <Box sx={{ mt: 1 }}>
//                         <Button
//                           onClick={() => handleViewDetails(product)}
//                           fullWidth
//                           variant="contained"
//                           sx={{
//                             color: "white",
//                             textTransform: "none",
//                             "&:hover": { color: "rgb(5,5,5)" },
//                             mb: 1,
//                             backgroundColor: "green",
//                           }}
//                         >
//                           View Details
//                         </Button>
//                       </Box>

//                       {/* Payout Button with Hover Popover */}
//                       <Box sx={{ mt: 1 }}>
//                         <Button
//                           onMouseEnter={(e) => handlePopoverOpen(e, product.id)}
//                           onMouseLeave={handlePopoverClose}
//                           fullWidth
//                           variant="contained"
//                           sx={{
//                             color: "white",
//                             textTransform: "none",
//                             "&:hover": { color: "rgb(5,5,5)" },
//                             mb: 1,
//                           }}
//                         >
//                           Payout
//                         </Button>

//                         <Popover
//                           id="mouse-over-popover"
//                           sx={{ pointerEvents: "none" }}
//                           open={open && hoveredProduct === product.id}
//                           anchorEl={anchorEl}
//                           anchorOrigin={{
//                             vertical: "bottom",
//                             horizontal: "left",
//                           }}
//                           transformOrigin={{
//                             vertical: "top",
//                             horizontal: "left",
//                           }}
//                           onClose={handlePopoverClose}
//                           disableRestoreFocus
//                         >
//                           <Box sx={{ p: 2 }}>
//                             <Typography fontWeight="bold">Commissions</Typography>
//                             {commissions.length > 0 ? (
//                               commissions.map((c) => {
//                                 const amount =
//                                   (parseFloat(c.percentage) *
//                                     (product.distribution_commission || 0)) /
//                                   100;
//                                 return (
//                                   <Typography key={c.id} variant="body2">
//                                     Team {c.level_no}: ₹
//                                     {amount.toLocaleString(undefined, {
//                                       minimumFractionDigits: 2,
//                                     })}
//                                   </Typography>
//                                 );
//                               })
//                             ) : (
//                               <Typography variant="body2" color="text.secondary">
//                                 No commission data
//                               </Typography>
//                             )}
//                           </Box>
//                         </Popover>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         )}

//         {products.length > 0 && (
//           <Box display="flex" justifyContent="flex-end" mt={4}>
//             <PaginationComponent
//               count={totalPages > 0 ? totalPages : 1}
//               page={page}
//               onChange={handlePageChange}
//             />
//           </Box>
//         )}
//       </Container>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete "{productToDelete?.product_name}"? 
//             This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleDeleteConfirm} variant="contained" color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for cart notifications */}
//       <Snackbar 
//         open={snackbarOpen} 
//         autoHideDuration={3000} 
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert 
//           onClose={handleSnackbarClose} 
//           severity={snackbarSeverity} 
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

// export default BusinessProducts;




import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  CircularProgress,
  Divider,
  Button,
  IconButton,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Snackbar,
  Alert,
  Badge
} from "@mui/material";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { baseurl } from "../../../BaseURL/BaseURL";
import PaginationComponent from "../../../Shared/Pagination";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function BusinessProducts() { 
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  
  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Cart states
  const [cartQuantities, setCartQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
  // Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${baseurl}/wishlist/`);
        const userWishlist = res.data
          .filter(item => item.user === parseInt(userId))
          .map(item => item.product);
        setWishlist(userWishlist);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };
  
    if (userId) fetchWishlist();
  }, [userId]);
  
  // Fetch products by business ID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseurl}/products/`);
        const data = await res.json();
        const filtered = data.filter(
          (item) => String(item.business_id) === String(id)
        );
        setProducts(filtered);
        
        // Initialize cart quantities
        const initialQuantities = {};
        filtered.forEach(product => {
          initialQuantities[product.id] = 1; // Default quantity
        });
        setCartQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  // Fetch commission master
  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await axios.get(`${baseurl}/commissions-master/`);
        setCommissions(response.data);
      } catch (error) {
        console.error("Error fetching commissions:", error);
      }
    };
    fetchCommissions();
  }, []);

  // Fetch cart items for the current user
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) return;
      
      try {
        const response = await axios.get(`${baseurl}/cart/`);
        const userCartItems = response.data.filter(
          item => item.user === parseInt(userId)
        );
        setCartItems(userCartItems);
        
        // Update cart quantities from server
        const quantities = {};
        userCartItems.forEach(item => {
          quantities[item.product] = item.quantity;
        });
        setCartQuantities(prev => ({ ...prev, ...quantities }));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    
    fetchCartItems();
  }, [userId]);

  // Wishlist toggle
  const handleWishlistToggle = async (productId) => {
    if (!userId) {
      alert("Please log in to add to wishlist.");
      return;
    }
  
    try {
      if (wishlist.includes(productId)) {
        const res = await axios.get(`${baseurl}/wishlist/`);
        const item = res.data.find(
          (entry) => entry.user === parseInt(userId) && entry.product === productId
        );
  
        if (item) {
          await axios.delete(`${baseurl}/wishlist/${item.id}/`);
          setWishlist((prev) => prev.filter((id) => id !== productId));
        }
      } else {
        await axios.post(`${baseurl}/wishlist/`, {
          user: parseInt(userId),
          product: productId,
        });
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  // Cart quantity handlers
  const handleQuantityIncrease = (productId) => {
    setCartQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  const handleQuantityDecrease = (productId) => {
    if (cartQuantities[productId] > 1) {
      setCartQuantities(prev => ({
        ...prev,
        [productId]: prev[productId] - 1
      }));
    }
  };

  // Find cart item ID for a specific product
  const getCartItemIdForProduct = (productId) => {
    const cartItem = cartItems.find(
      item => item.product === productId && item.user === parseInt(userId)
    );
    return cartItem ? cartItem.id : null;
  };

  // Add to cart function - using your correct API endpoints
  const handleAddToCart = async (product) => {
    if (!userId) {
      alert("Please log in to add items to cart.");
      return;
    }

    const quantity = cartQuantities[product.id] || 1;
    const cartItemId = getCartItemIdForProduct(product.id);
    
    try {
      if (cartItemId) {
        // Update existing cart item using PUT /cart/cart-id/{id}/
        await axios.put(`${baseurl}/cart/cart-id/${cartItemId}/`, {
          user: parseInt(userId),
          product: product.id,
          quantity: quantity
        });
        setSnackbarMessage(`Updated "${product.product_name}" quantity to ${quantity}`);
      } else {
        // Add new item to cart using POST /cart/
        await axios.post(`${baseurl}/cart/`, {
          user: parseInt(userId),
          product: product.id,
          quantity: quantity
        });
        setSnackbarMessage(`"${product.product_name}" added to cart successfully!`);
      }
      
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      
      // Refresh cart items
      const response = await axios.get(`${baseurl}/cart/`);
      const userCartItems = response.data.filter(
        item => item.user === parseInt(userId)
      );
      setCartItems(userCartItems);
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      setSnackbarMessage("Failed to add item to cart. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Remove from cart function
  const handleRemoveFromCart = async (product) => {
    if (!userId) return;

    const cartItemId = getCartItemIdForProduct(product.id);
    if (!cartItemId) return;

    try {
      // Delete cart item using DELETE /cart/cart-id/{id}/
      await axios.delete(`${baseurl}/cart/cart-id/${cartItemId}/`);
      
      // Update local state
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      setCartQuantities(prev => ({
        ...prev,
        [product.id]: 1 // Reset to default quantity
      }));
      
      setSnackbarMessage(`"${product.product_name}" removed from cart`);
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error removing from cart:", error);
      setSnackbarMessage("Failed to remove item from cart");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Check if product is in cart
  const isProductInCart = (productId) => {
    return cartItems.some(
      item => item.product === productId && item.user === parseInt(userId || 0)
    );
  };

  // Get current quantity in cart for a product
  const getProductCartQuantity = (productId) => {
    const cartItem = cartItems.find(
      item => item.product === productId && item.user === parseInt(userId)
    );
    return cartItem ? cartItem.quantity : 0;
  };

  // Popover handlers
  const handlePopoverOpen = (event, productId) => {
    setAnchorEl(event.currentTarget);
    setHoveredProduct(productId);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setHoveredProduct(null);
  };

  // Edit product - Navigate to AddProduct form with pre-filled data
  const handleEditClick = (product) => {
    // Navigate to AddProduct form with product data
    navigate("/p-addproduct", {
      state: {
        business: { business_id: id }, // Pass business ID
        editMode: true,
        productData: product // Pass the product data to pre-fill
      }
    });
  };

  // Delete product functions
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      await axios.delete(`${baseurl}/products/${productToDelete.id}/`);
      
      // Remove from local state
      setProducts(products.filter(p => p.id !== productToDelete.id));
      
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  // View details
  const handleViewDetails = async (product) => {
    try {
      await fetch(`${baseurl}/products/${product.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          view_count: (product.view_count || 0) + 1,
        }),
      });
      navigate(`/product-details/${product.id}`);
    } catch (error) {
      console.log("Error updating view count:", error);
      navigate(`/product-details/${product.id}`);
    }
  };

  // Snackbar handler
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Navigate to cart page
  const handleViewCart = () => {
    navigate("/add-to-cart-list");
  };

  // Calculate total items in cart
  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const open = Boolean(anchorEl);
  const totalPages = Math.ceil(products.length / itemsPerPage) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Products for Business
          </Typography>
          <Badge 
            badgeContent={getTotalCartItems()} 
            color="primary"
            sx={{ mr: 2 }}
          >
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              onClick={handleViewCart}
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" }
              }}
            >
              View Cart
            </Button>
          </Badge>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : products.length === 0 ? (
          <Typography align="center" sx={{ mt: 5 }} color="text.secondary">
            No products found for this business.
          </Typography>
        ) : (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {paginatedProducts.map((product, index) => {
              const currentQuantity = cartQuantities[product.id] || 1;
              const isInCart = isProductInCart(product.id);
              
              return (
                <Grid item xs={12} sm={6} md={4} key={product.id || index}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                    }}
                  >
                    {/* Product Image */}
                    {product.product_image ? (
                      <CardMedia
                        component="img"
                        alt={product.product_name}
                        height="200"
                        image={`${baseurl}/${product.product_image}`}
                        sx={{ objectFit: "cover" }}
                      />
                    ) : (
                      <Box
                        height="200px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bgcolor="#f5f5f5"
                      >
                        <Typography color="text.secondary">No Image</Typography>
                      </Box>
                    )}

                    {/* Product Info */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Product name and action icons in the same row */}
                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                        <Typography variant="h6" fontWeight="bold">
                          {product.product_name} 
                        </Typography>
                        
                        {/* Action Icons: Wishlist, Edit, Delete in the same row */}
                        <Box display="flex" alignItems="center" gap={0.5}>
                          {/* Wishlist Icon */}
                          <Tooltip title={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}>
                            <IconButton
                              onClick={() => handleWishlistToggle(product.id)}
                              size="small"
                              sx={{
                                backgroundColor: "rgba(255,255,255,0.8)",
                                "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                              }}
                            >
                              {wishlist.includes(product.id) ? (
                                <FavoriteIcon sx={{ color: "red", fontSize: "1.2rem" }} />
                              ) : (
                                <FavoriteBorderIcon sx={{ color: "red", fontSize: "1.2rem" }} />
                              )}
                            </IconButton>
                          </Tooltip>
                          
                          {/* Edit Icon */}
                          <Tooltip title="Edit Product">
                            <IconButton
                              size="small"
                              sx={{ 
                                backgroundColor: "rgba(255,255,255,0.8)",
                                "&:hover": { backgroundColor: "rgba(255,255,255,1)" }
                              }}
                              onClick={() => handleEditClick(product)}
                            >
                              <EditIcon fontSize="small" sx={{ color: "#1976d2" }} />
                            </IconButton>
                          </Tooltip>
                          
                          {/* Delete Icon */}
                          <Tooltip title="Delete Product">
                            <IconButton
                              size="small"
                              sx={{ 
                                backgroundColor: "rgba(255,255,255,0.8)",
                                "&:hover": { backgroundColor: "rgba(255,255,255,1)" }
                              }}
                              onClick={() => handleDeleteClick(product)}
                            >
                              <DeleteIcon fontSize="small" color="error" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 1.5 }} />

                      <Typography variant="body2">
                        <strong>Selling Price:</strong> ₹{product.selling_price}
                      </Typography>
                      <Typography variant="body2">
                        <strong>MRP:</strong> ₹{product.mrp}
                      </Typography>

                      <Divider sx={{ my: 1.5 }} />

                      {product.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          <strong>Description:</strong> {product.description}
                        </Typography>
                      )}

                      {/* Quantity Selector and Add to Cart */}
                      <Box sx={{ mt: 2, mb: 2 }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                          <Typography variant="body2" fontWeight="medium">
                            Quantity:
                          </Typography>
                          <Box display="flex" alignItems="center">
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityDecrease(product.id)}
                              disabled={currentQuantity <= 1}
                              sx={{ mr: 1 }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography variant="body1" sx={{ minWidth: "30px", textAlign: "center" }}>
                              {currentQuantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityIncrease(product.id)}
                              sx={{ ml: 1 }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        
                        <Box display="flex" gap={1}>
                          {isInCart ? (
                            <>
                              <Button
                                onClick={() => handleAddToCart(product)}
                                variant="contained"
                                startIcon={<ShoppingCartIcon />}
                                sx={{
                                  flex: 2,
                                  backgroundColor: "#ff9800",
                                  "&:hover": { backgroundColor: "#f57c00" },
                                  textTransform: "none",
                                }}
                              >
                                Update Cart
                              </Button>
                              <Button
                                onClick={() => handleRemoveFromCart(product)}
                                variant="outlined"
                                color="error"
                                sx={{
                                  flex: 1,
                                  textTransform: "none",
                                }}
                              >
                                Remove
                              </Button>
                            </>
                          ) : (
                            <Button
                              onClick={() => handleAddToCart(product)}
                              fullWidth
                              variant="contained"
                              startIcon={<ShoppingCartIcon />}
                              sx={{
                                backgroundColor: "#1976d2",
                                "&:hover": { backgroundColor: "#1565c0" },
                                textTransform: "none",
                              }}
                            >
                              Add to Cart
                            </Button>
                          )}
                        </Box>
                      </Box>

                      <Box sx={{ mt: 1 }}>
                        <Button
                          onClick={() => handleViewDetails(product)}
                          fullWidth
                          variant="contained"
                          sx={{
                            color: "white",
                            textTransform: "none",
                            "&:hover": { color: "rgb(5,5,5)" },
                            mb: 1,
                            backgroundColor: "green",
                          }}
                        >
                          View Details
                        </Button>
                      </Box>

                      {/* Payout Button with Hover Popover */}
                      <Box sx={{ mt: 1 }}>
                        <Button
                          onMouseEnter={(e) => handlePopoverOpen(e, product.id)}
                          onMouseLeave={handlePopoverClose}
                          fullWidth
                          variant="contained"
                          sx={{
                            color: "white",
                            textTransform: "none",
                            "&:hover": { color: "rgb(5,5,5)" },
                            mb: 1,
                          }}
                        >
                          Payout
                        </Button>

                        <Popover
                          id="mouse-over-popover"
                          sx={{ pointerEvents: "none" }}
                          open={open && hoveredProduct === product.id}
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          onClose={handlePopoverClose}
                          disableRestoreFocus
                        >
                          <Box sx={{ p: 2 }}>
                            <Typography fontWeight="bold">Commissions</Typography>
                            {commissions.length > 0 ? (
                              commissions.map((c) => {
                                const amount =
                                  (parseFloat(c.percentage) *
                                    (product.distribution_commission || 0)) /
                                  100;
                                return (
                                  <Typography key={c.id} variant="body2">
                                    Team {c.level_no}: ₹
                                    {amount.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                    })}
                                  </Typography>
                                );
                              })
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                No commission data
                              </Typography>
                            )}
                          </Box>
                        </Popover>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {products.length > 0 && (
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <PaginationComponent
              count={totalPages > 0 ? totalPages : 1}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        )}
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{productToDelete?.product_name}"? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for cart notifications */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default BusinessProducts;