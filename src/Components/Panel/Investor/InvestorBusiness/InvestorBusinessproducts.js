import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    Popover,
    IconButton,
    Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PaginationComponent from "../../../Shared/Pagination";
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import { baseurl } from "../../../BaseURL/BaseURL";

function AdminBussinessProducts() {
    const { id } = useParams(); // get business_id from URL
    const [products, setProducts] = useState([]);
    const [commissions, setCommissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [businesses, setBusinesses] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${baseurl}/products/`)
            .then((res) => res.json())
            .then((data) => {
                const filtered = data.filter(
                    (item) => String(item.business_id) === String(id)
                );
                setProducts(filtered);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, [id]);

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

    const handlePopoverOpen = (event, productId) => {
        setAnchorEl(event.currentTarget);
        setHoveredProduct(productId);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setHoveredProduct(null);
    };

    const handleEdit = (productId) => {
        navigate(`/a-editbusinessproducts/${productId}`);
    };

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(`${baseurl}/products/${productId}/`);
            alert("✅ Product deleted successfully!");
            // Remove the deleted product from the state to update UI
            setProducts(products.filter((p) => p.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error.response?.data || error);
            alert("❌ Failed to delete product. Check console for details.");
        }
    };


    const open = Boolean(anchorEl);

    // ✅ Pagination for products
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // ✅ Calculate pagination based on products, not businesses
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);


    return (
        <>
            <InvestorHeader />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
                    Products for Business
                </Typography>

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
                        {paginatedProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
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
                                            image={`${baseurl}${product.product_image}`}
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
                                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                                            <Typography variant="h6" fontWeight="bold">
                                                {product.product_name}
                                            </Typography>

                                            {/* <Box display="flex" alignItems="center" gap={1}>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleEdit(product.id)}
                                                    sx={{ minWidth: "auto", p: 0.5 }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </Button>

                                                <Button
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDelete(product.id)}
                                                    sx={{ minWidth: "auto", p: 0.5 }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </Button>

                                            </Box> */}
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

                                        {/* ✅ Payout Button with Hover Popover */}
                                        <Box sx={{ mt: 2 }}>
                                            {/* <Button
                                                onMouseEnter={(e) => handlePopoverOpen(e, product.id)}
                                                onMouseLeave={handlePopoverClose}
                                                fullWidth
                                                variant="contained"
                                                sx={{
                                                    color: "white",
                                                    textTransform: "none",
                                                    "&:hover": { color: "rgb(5,5,5)" },
                                                    marginBottom: "9px",
                                                }}
                                            >
                                                Payout
                                            </Button> */}

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
                                                                    product.distribution_commission) /
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

                        ))}
                    </Grid>



                )}
                {/* Pagination */}
                {totalPages >= 1 && (
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <PaginationComponent
                            count={totalPages || 1} // ensure at least 1 page
                            page={page}
                            onChange={handlePageChange}
                        />
                    </Box>
                )}
            </Container>

        </>
    );
}

export default AdminBussinessProducts;
