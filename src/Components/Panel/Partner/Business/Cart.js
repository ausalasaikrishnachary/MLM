// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Container,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Divider,
//   Snackbar,
//   Alert,
//   CircularProgress,
//   TextField
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("user_id");

//   // Fetch cart items and products
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!userId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch cart items
//         const cartResponse = await axios.get(`${baseurl}/cart/`);
//         const userCartItems = cartResponse.data.filter(
//           item => item.user === parseInt(userId)
//         );
//         setCartItems(userCartItems);

//         // Fetch all products to get product details
//         const productsResponse = await axios.get(`${baseurl}/products/`);
//         setProducts(productsResponse.data);
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   // Get product details for a cart item
//   const getProductDetails = (productId) => {
//     return products.find(product => product.id === productId) || {};
//   };

//   // Update quantity
//   const handleQuantityChange = async (cartItemId, newQuantity) => {
//     if (newQuantity < 1) return;

//     try {
//       await axios.put(`${baseurl}/cart/cart-id/${cartItemId}/`, {
//         user: parseInt(userId),
//         product: cartItems.find(item => item.id === cartItemId)?.product,
//         quantity: newQuantity
//       });

//       // Update local state
//       setCartItems(prev => prev.map(item => 
//         item.id === cartItemId ? { ...item, quantity: newQuantity } : item
//       ));

//       setSnackbarMessage("Quantity updated successfully");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       setSnackbarMessage("Failed to update quantity");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   // Remove item from cart
//   const handleRemoveItem = async (cartItemId) => {
//     try {
//       await axios.delete(`${baseurl}/cart/cart-id/${cartItemId}/`);
      
//       // Update local state
//       setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      
//       setSnackbarMessage("Item removed from cart");
//       setSnackbarSeverity("info");
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error("Error removing item:", error);
//       setSnackbarMessage("Failed to remove item");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   // Calculate total
//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       const product = getProductDetails(item.product);
//       const price = product.selling_price || product.mrp || 0;
//       return total + (price * item.quantity);
//     }, 0);
//   };

//   // Handle checkout
//   const handleCheckout = () => {
//     alert("Proceeding to checkout...");
//     // Add your checkout logic here
//   };

//   // Handle continue shopping
//   const handleContinueShopping = () => {
//     navigate(-1); // Go back to previous page
//   };

//   // Snackbar handler
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   if (!userId) {
//     return (
//       <>
//         <PartnerHeader />
//         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//           <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
//             <ShoppingCartIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
//             <Typography variant="h5" gutterBottom>
//               Please Login
//             </Typography>
//             <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
//               You need to be logged in to view your cart
//             </Typography>
//             <Button 
//               variant="contained" 
//               onClick={() => navigate("/login")}
//               sx={{ mt: 2 }}
//             >
//               Go to Login
//             </Button>
//           </Box>
//         </Container>
//       </>
//     );
//   }

//   if (loading) {
//     return (
//       <>
//         <PartnerHeader />
//         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//           <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//             <CircularProgress />
//           </Box>
//         </Container>
//       </>
//     );
//   }

//   return (
//     <>
//       <PartnerHeader />
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           Shopping Cart
//         </Typography>
//         <Divider sx={{ mb: 3 }} />

//         {cartItems.length === 0 ? (
//           <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
//             <ShoppingCartIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
//             <Typography variant="h5" gutterBottom>
//               Your cart is empty
//             </Typography>
//             <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
//               Add some products to your cart and they will appear here
//             </Typography>
//             <Button 
//               variant="contained" 
//               onClick={handleContinueShopping}
//               sx={{ mt: 2 }}
//             >
//               Continue Shopping
//             </Button>
//           </Box>
//         ) : (
//           <>
//             <TableContainer component={Paper} sx={{ mb: 3 }}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Product</TableCell>
//                     <TableCell align="center">Price</TableCell>
//                     <TableCell align="center">Quantity</TableCell>
//                     <TableCell align="center">Total</TableCell>
//                     <TableCell align="center">Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {cartItems.map((item) => {
//                     const product = getProductDetails(item.product);
//                     const totalPrice = (product.selling_price || product.mrp || 0) * item.quantity;

//                     return (
//                       <TableRow key={item.id}>
//                         <TableCell>
//                           <Box display="flex" alignItems="center">
//                             {product.product_image ? (
//                               <CardMedia
//                                 component="img"
//                                 image={`${baseurl}/${product.product_image}`}
//                                 alt={product.product_name}
//                                 sx={{ width: 80, height: 80, objectFit: "cover", mr: 2, borderRadius: 1 }}
//                               />
//                             ) : (
//                               <Box
//                                 width={80}
//                                 height={80}
//                                 display="flex"
//                                 alignItems="center"
//                                 justifyContent="center"
//                                 bgcolor="#f5f5f5"
//                                 borderRadius={1}
//                                 mr={2}
//                               >
//                                 <Typography variant="caption" color="text.secondary">
//                                   No Image
//                                 </Typography>
//                               </Box>
//                             )}
//                             <Box>
//                               <Typography variant="subtitle1" fontWeight="bold">
//                                 {product.product_name || "Unknown Product"}
//                               </Typography>
//                               <Typography variant="body2" color="text.secondary">
//                                 {product.description ? 
//                                   product.description.substring(0, 50) + "..." : 
//                                   "No description"}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </TableCell>
//                         <TableCell align="center">
//                           <Typography variant="body1" fontWeight="medium">
//                             ₹{product.selling_price || product.mrp || 0}
//                           </Typography>
//                           {product.mrp && product.selling_price && product.mrp > product.selling_price && (
//                             <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
//                               ₹{product.mrp}
//                             </Typography>
//                           )}
//                         </TableCell>
//                         <TableCell align="center">
//                           <Box display="flex" alignItems="center" justifyContent="center">
//                             <IconButton
//                               size="small"
//                               onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                               disabled={item.quantity <= 1}
//                             >
//                               <RemoveIcon fontSize="small" />
//                             </IconButton>
//                             <Typography sx={{ mx: 2, minWidth: "30px", textAlign: "center" }}>
//                               {item.quantity}
//                             </Typography>
//                             <IconButton
//                               size="small"
//                               onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                             >
//                               <AddIcon fontSize="small" />
//                             </IconButton>
//                           </Box>
//                         </TableCell>
//                         <TableCell align="center">
//                           <Typography variant="body1" fontWeight="bold" color="primary">
//                             ₹{totalPrice.toFixed(2)}
//                           </Typography>
//                         </TableCell>
//                         <TableCell align="center">
//                           <IconButton
//                             color="error"
//                             onClick={() => handleRemoveItem(item.id)}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* Order Summary */}
//             <Card sx={{ mb: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" fontWeight="bold" gutterBottom>
//                   Order Summary
//                 </Typography>
//                 <Divider sx={{ my: 2 }} />
                
//                 <Box display="flex" justifyContent="space-between" mb={1}>
//                   <Typography>Subtotal ({cartItems.length} items)</Typography>
//                   <Typography>₹{calculateTotal().toFixed(2)}</Typography>
//                 </Box>
                
//                 <Box display="flex" justifyContent="space-between" mb={2}>
//                   <Typography>Shipping</Typography>
//                   <Typography>Free</Typography>
//                 </Box>
                
//                 <Divider sx={{ my: 2 }} />
                
//                 <Box display="flex" justifyContent="space-between" mb={3}>
//                   <Typography variant="h6" fontWeight="bold">Total</Typography>
//                   <Typography variant="h6" fontWeight="bold" color="primary">
//                     ₹{calculateTotal().toFixed(2)}
//                   </Typography>
//                 </Box>

//                 <Box display="flex" gap={2}>
//                   <Button
//                     variant="outlined"
//                     fullWidth
//                     onClick={handleContinueShopping}
//                     sx={{ py: 1.5 }}
//                   >
//                     Continue Shopping
//                   </Button>
//                   <Button
//                     variant="contained"
//                     fullWidth
//                     onClick={handleCheckout}
//                     sx={{ py: 1.5 }}
//                   >
//                     Proceed to Checkout
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </>
//         )}
//       </Container>

//       {/* Snackbar */}
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

// export default Cart;



// Cart.js - Updated with payment flow
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import { baseurl } from "../../../BaseURL/BaseURL";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [merchantOrderId, setMerchantOrderId] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null); // For payment URL if provided
  const hasPostedStatus = useRef(false); // Flag to prevent duplicate payment confirmation
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  // Fetch cart items and products
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch cart items
        const cartResponse = await axios.get(`${baseurl}/cart/`);
        const userCartItems = cartResponse.data.filter(
          item => item.user === parseInt(userId)
        );
        setCartItems(userCartItems);

        // Fetch all products to get product details
        const productsResponse = await axios.get(`${baseurl}/products/`);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        showSnackbar("Error loading cart data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Handle payment confirmation on component mount (similar to Subscription component)
  useEffect(() => {
    const merchant_order_id = localStorage.getItem("merchant_order_id");
    
    const confirmCartPayment = async () => {
      if (hasPostedStatus.current || !merchant_order_id) return;
      
      try {
        hasPostedStatus.current = true;
        
        await axios.post(
          // "https://test.shrirajteam.com:85/product/confirm-payment/",
          `${baseurl}/product/confirm-payment/`, // Changed this line
          {
            merchant_order_id: merchant_order_id
          }
        );
        
        // Clear storage after successful confirmation
        localStorage.removeItem("merchant_order_id");
        
        // Refresh cart data
        await refreshCartData();
        
        showSnackbar("Payment confirmed successfully!", "success");
        
        // Optionally redirect to success page
        setTimeout(() => {
          navigate("/add-to-cart-list");
        }, 2000);
        
      } catch (error) {
        console.error("Error confirming payment:", error);
        hasPostedStatus.current = false; // Allow retry
        showSnackbar(
          error.response?.data?.message || "Payment confirmation failed",
          "error"
        );
      }
    };
    
    confirmCartPayment();
  }, []);

  // Refresh cart data after payment
  const refreshCartData = async () => {
    try {
      const cartResponse = await axios.get(`${baseurl}/cart/`);
      const userCartItems = cartResponse.data.filter(
        item => item.user === parseInt(userId)
      );
      setCartItems(userCartItems);
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  };

  // Get product details for a cart item
  const getProductDetails = (productId) => {
    return products.find(product => product.id === productId) || {};
  };

  // Update quantity
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axios.put(`${baseurl}/cart/cart-id/${cartItemId}/`, {
        user: parseInt(userId),
        product: cartItems.find(item => item.id === cartItemId)?.product,
        quantity: newQuantity
      });

      // Update local state
      setCartItems(prev => prev.map(item => 
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      ));

      showSnackbar("Quantity updated successfully", "success");
    } catch (error) {
      console.error("Error updating quantity:", error);
      showSnackbar("Failed to update quantity", "error");
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete(`${baseurl}/cart/cart-id/${cartItemId}/`);
      
      // Update local state
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      
      showSnackbar("Item removed from cart", "info");
    } catch (error) {
      console.error("Error removing item:", error);
      showSnackbar("Failed to remove item", "error");
    }
  };

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductDetails(item.product);
      const price = product.selling_price || product.mrp || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  // Initiate Payment (Adapted from Subscription component)
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      showSnackbar("Your cart is empty", "warning");
      return;
    }

    if (!userId) {
      showSnackbar("Please login to proceed", "warning");
      return;
    }

    setPaymentLoading(true);
    try {
      // Initiate payment API call for products
      const response = await axios.post(
        // "https://test.shrirajteam.com:85/product/initiate-payment/",
         `${baseurl}/product/initiate-payment/`, // Changed this line
        {
          user_id: parseInt(userId),
          redirect_url: window.location.origin + "/add-to-cart-list" // or your success page
        }
      );

      console.log("Payment initiation response:", response.data);

      if (response.data && response.data.merchant_order_id) {
        const orderId = response.data.merchant_order_id;
        setMerchantOrderId(orderId);
        
        // Check if payment_url is returned (like in subscription flow)
        if (response.data.payment_url) {
          // If payment_url is provided, redirect directly
          setPaymentUrl(response.data.payment_url);
          window.location.href = response.data.payment_url;
        } else {
          // If no payment_url, show confirmation dialog
          setConfirmDialogOpen(true);
        }
        
        // Store merchant_order_id for later confirmation
        localStorage.setItem("merchant_order_id", orderId);
        
      } else {
        showSnackbar("Failed to initiate payment. Please try again.", "error");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      showSnackbar(
        error.response?.data?.message || "Failed to initiate payment",
        "error"
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  // Confirm Payment (when no payment_url is provided)
  const handleConfirmPayment = async () => {
    if (!merchantOrderId) {
      showSnackbar("Payment order ID not found", "error");
      return;
    }

    setPaymentLoading(true);
    try {
      // Confirm payment API call
      const response = await axios.post(
        // "https://test.shrirajteam.com:85/product/confirm-payment/",
        `${baseurl}/product/confirm-payment/`, // Changed this line
        {
          merchant_order_id: merchantOrderId
        }
      );

      if (response.data) {
        // Handle successful payment response
        showSnackbar("Payment successful!", "success");
        setConfirmDialogOpen(false);
        setMerchantOrderId(null);
        
        // Clear cart after successful payment
        await clearCartAfterPayment();
        
        // Redirect to success page or home
        setTimeout(() => {
          navigate("/add-to-cart-list");
        }, 2000);
      }
    } catch (error) {
      console.error("Payment confirmation error:", error);
      showSnackbar(
        error.response?.data?.message || "Payment failed. Please try again.",
        "error"
      );
    } finally {
      setPaymentLoading(false);
      setConfirmDialogOpen(false);
    }
  };

  // Clear cart after successful payment
  const clearCartAfterPayment = async () => {
    try {
      // Delete all cart items for the user
      const deletePromises = cartItems.map(item =>
        axios.delete(`${baseurl}/cart/cart-id/${item.id}/`)
      );
      await Promise.all(deletePromises);
      
      // Clear local cart state
      setCartItems([]);
      
      showSnackbar("Cart cleared after successful payment", "success");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Helper function to show snackbar
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    navigate(-1);
  };

  // Snackbar handler
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setConfirmDialogOpen(false);
    setMerchantOrderId(null);
  };

  if (!userId) {
    return (
      <>
        <PartnerHeader />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
            <ShoppingCartIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Please Login
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
              You need to be logged in to view your cart
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => navigate("/login")}
              sx={{ mt: 2 }}
            >
              Go to Login
            </Button>
          </Box>
        </Container>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PartnerHeader />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress />
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Shopping Cart
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {cartItems.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
            <ShoppingCartIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
              Add some products to your cart and they will appear here
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleContinueShopping}
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => {
                    const product = getProductDetails(item.product);
                    const totalPrice = (product.selling_price || product.mrp || 0) * item.quantity;

                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {product.product_image ? (
                              <CardMedia
                                component="img"
                                image={`${baseurl}/${product.product_image}`}
                                alt={product.product_name}
                                sx={{ width: 80, height: 80, objectFit: "cover", mr: 2, borderRadius: 1 }}
                              />
                            ) : (
                              <Box
                                width={80}
                                height={80}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                bgcolor="#f5f5f5"
                                borderRadius={1}
                                mr={2}
                              >
                                <Typography variant="caption" color="text.secondary">
                                  No Image
                                </Typography>
                              </Box>
                            )}
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {product.product_name || "Unknown Product"}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {product.description ? 
                                  product.description.substring(0, 50) + "..." : 
                                  "No description"}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body1" fontWeight="medium">
                            ₹{product.selling_price || product.mrp || 0}
                          </Typography>
                          {product.mrp && product.selling_price && product.mrp > product.selling_price && (
                            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                              ₹{product.mrp}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ mx: 2, minWidth: "30px", textAlign: "center" }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body1" fontWeight="bold" color="primary">
                            ₹{totalPrice.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Order Summary */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Order Summary
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Subtotal ({cartItems.length} items)</Typography>
                  <Typography>₹{calculateTotal().toFixed(2)}</Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography>Shipping</Typography>
                  <Typography>Free</Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Typography variant="h6" fontWeight="bold">Total</Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    ₹{calculateTotal().toFixed(2)}
                  </Typography>
                </Box>

                <Box display="flex" gap={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleContinueShopping}
                    sx={{ py: 1.5 }}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleCheckout}
                    disabled={paymentLoading || cartItems.length === 0}
                    startIcon={paymentLoading ? <CircularProgress size={20} /> : <PaymentIcon />}
                    sx={{ py: 1.5 }}
                  >
                    {paymentLoading ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </>
        )}
      </Container>

      {/* Payment Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="payment-confirmation-dialog"
      >
        <DialogTitle id="payment-confirmation-dialog">
          Confirm Payment
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm your payment to complete the order.
            {merchantOrderId && (
              <Box mt={2}>
                <Typography variant="caption" color="text.secondary">
                  Order ID: {merchantOrderId}
                </Typography>
              </Box>
            )}
          </DialogContentText>
          <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
            <Typography variant="subtitle2" gutterBottom>
              Order Summary
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography>Total Items:</Typography>
              <Typography>{cartItems.length}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Total Amount:</Typography>
              <Typography fontWeight="bold">₹{calculateTotal().toFixed(2)}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmPayment}
            variant="contained"
            disabled={paymentLoading}
            startIcon={paymentLoading && <CircularProgress size={20} />}
          >
            {paymentLoading ? "Processing..." : "Confirm Payment"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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

export default Cart;