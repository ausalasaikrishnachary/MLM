// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
// import {
//   Table, TableBody, TableCell, TableHead, TableRow,
//   Box, Button, IconButton, Container, Pagination, Typography,
//   Chip, Dialog, DialogTitle, DialogContent, DialogActions,
//   DialogContentText
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from '../../../BaseURL/BaseURL';
// import Swal from 'sweetalert2';

// function TableOffers() {
//   const [offers, setOffers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [offerToDelete, setOfferToDelete] = useState(null);
//   const itemsPerPage = 10;
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchOffers();
//   }, []);

//   const fetchOffers = async () => {
//     try {
//       const response = await axios.get(`${baseurl}/offers/`);
//       console.log('Fetched offers:', response.data);
//       setOffers(response.data);
//     } catch (error) {
//       console.error('Error fetching offers:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to load offers. Please try again.',
//         confirmButtonColor: '#3085d6',
//       });
//     }
//   };

//   const showSuccessAlert = (message) => {
//     Swal.fire({
//       icon: 'success',
//       title: 'Success',
//       text: message,
//       showConfirmButton: false,
//       timer: 2000,
//       timerProgressBar: true,
//     });
//   };

//   const showErrorAlert = (message) => {
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: message,
//       confirmButtonColor: '#d33',
//     });
//   };

//   const handleDeleteClick = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'Cancel',
//       reverseButtons: true,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteOffer(id);
//       }
//     });
//   };

//   const deleteOffer = async (id) => {
//     try {
//       await axios.delete(`${baseurl}/offers/${id}/`);
//       const updated = offers.filter(offer => offer.id !== id);
//       setOffers(updated);

//       const newTotalPages = Math.ceil(updated.length / itemsPerPage);
//       if (page > newTotalPages) {
//         setPage(newTotalPages);
//       }
      
//       showSuccessAlert('Offer has been deleted successfully.');
//     } catch (error) {
//       console.error('Error deleting offer:', error);
//       showErrorAlert('Failed to delete offer. Please try again.');
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/edit-offer/${id}`);
//   };

//   const handleAddNew = () => {
//     navigate('/add-offer');
//   };

//   const handlePageChange = (_, value) => {
//     setPage(value);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     const [day, month, year] = dateString.split('-');
//     return `${day}/${month}/${year}`;
//   };

//   const getOfferTypeDisplay = (type) => {
//     const types = {
//       'discount_percent': 'Discount %',
//       'discount_flat': 'Flat Discount',
//       'buy_x_get_y': 'Buy X Get Y',
//       'free_gift': 'Free Gift'
//     };
//     return types[type] || type;
//   };

//   const formatOfferValue = (offer) => {
//     switch(offer.offer_type) {
//       case 'discount_percent':
//         return `${offer.value}%`;
//       case 'discount_flat':
//         return `₹${offer.value}`;
//       case 'buy_x_get_y':
//         return `Buy ${offer.x_quantity} Get ${offer.y_quantity}`;
//       case 'free_gift':
//         return offer.description || 'Free Gift';
//       default:
//         return offer.value || '-';
//     }
//   };

//   const totalPages = Math.ceil(offers.length / itemsPerPage);
//   const paginatedOffers = offers.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const cellStyle = {
//     fontWeight: 'bold',
//     textAlign: 'center',
//     border: '1px solid #000',
//     backgroundColor: '#f0f0f0',
//     fontSize: '14px',
//   };

//   const cellBodyStyle = {
//     textAlign: 'center',
//     border: '1px solid #000',
//     fontSize: '14px',
//   };

//   const noDataStyle = {
//     textAlign: 'center',
//     border: '1px solid #000',
//     padding: 2,
//   };

//   return (
//     <>
//       <PartnerHeader />
//       <Container maxWidth="lg" sx={{ mt: '100px', mb: 4 }}>
//         <div style={{ textAlign: 'center', marginTop: "20px" }}>
//           <Typography
//             variant="h4"
//             gutterBottom
//             sx={{
//               fontSize: {
//                 xs: "1.8rem",
//                 sm: "2.1rem",
//                 md: "2.2rem",
//               },
//               fontWeight: "bold",
//               textAlign: "center",
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               marginBottom: '20px',
//             }}
//           >
//             Offers Management
//           </Typography>
//         </div>

//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddNew}
//             sx={{ px: 3, py: 1 }}
//           >
//             Add New Offer
//           </Button>
//         </Box>

//         <Box
//           sx={{
//             width: "100%",
//             overflowX: "auto",
//             display: "block",
//             boxShadow: 2,
//             borderRadius: 1,
//           }}
//         >
//           <Table sx={{ border: '1px solid #ddd', width: '100%' }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={cellStyle}>S.No</TableCell>
//                 <TableCell sx={cellStyle}>Offer Type</TableCell>
//                 <TableCell sx={cellStyle}>Offer Value</TableCell>
//                 <TableCell sx={cellStyle}>Description</TableCell>
//                 <TableCell sx={cellStyle}>Start Date</TableCell>
//                 <TableCell sx={cellStyle}>End Date</TableCell>
//                 <TableCell sx={cellStyle}>Status</TableCell>
//                 <TableCell sx={cellStyle}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedOffers.length > 0 ? (
//                 paginatedOffers.map((offer, index) => (
//                   <TableRow key={offer.id}>
//                     <TableCell sx={cellBodyStyle}>
//                       {(page - 1) * itemsPerPage + index + 1}
//                     </TableCell>
//                     <TableCell sx={cellBodyStyle}>
//                       {getOfferTypeDisplay(offer.offer_type)}
//                     </TableCell>
//                     <TableCell sx={cellBodyStyle}>
//                       {formatOfferValue(offer)}
//                     </TableCell>
//                     <TableCell sx={cellBodyStyle}>
//                       {offer.description || '-'}
//                     </TableCell>
//                     <TableCell sx={cellBodyStyle}>
//                       {formatDate(offer.start_date)}
//                     </TableCell>
//                     <TableCell sx={cellBodyStyle}>
//                       {formatDate(offer.end_date)}
//                     </TableCell>
//                     <TableCell sx={cellBodyStyle}>
//                       <Chip 
//                         label={offer.is_active ? "Active" : "Inactive"} 
//                         color={offer.is_active ? "success" : "error"}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell sx={cellBodyStyle}>
//                       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
//                         <IconButton
//                           color="primary"
//                           size="small"
//                           onClick={() => handleEdit(offer.id)}
//                           title="Edit"
//                         >
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                         <IconButton
//                           color="error"
//                           size="small"
//                           onClick={() => handleDeleteClick(offer.id)}
//                           title="Delete"
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={8} sx={noDataStyle}>
//                     No offers found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </Box>

//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
//           <Pagination
//             count={totalPages}
//             page={page}
//             onChange={handlePageChange}
//             color="primary"
//             sx={{
//               "& .MuiPaginationItem-root": {
//                 borderRadius: "4px",
//               },
//             }}
//           />
//         </Box>
//       </Container>
//     </>
//   );
// }

// export default TableOffers;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Box, Button, IconButton, Container, Pagination, Typography,
  Chip, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

function TableOffers() {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Get current user ID from localStorage
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      fetchOffers();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'Please login to view offers.',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate('/login');
      });
    }
  }, [userId]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch offers for the specific user
      const response = await axios.get(`${baseurl}/offers/user-id/${userId}/`);
      
      // Handle different response formats
      if (response.data && Array.isArray(response.data)) {
        setOffers(response.data);
      } else {
        // If response is not an array, set empty array
        setOffers([]);
      }
      
    } catch (error) {
      console.error('Error fetching offers:', error);
      
      // Check if it's a 404 error (no offers found)
      if (error.response && error.response.status === 404) {
        setOffers([]); // No offers available
        setError('No offers found for your account.');
      } 
      // Check if it's a 500 error (server error)
      else if (error.response && error.response.status === 500) {
        setError('Server error. Please try again later.');
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Unable to load offers. Please try again later.',
          confirmButtonColor: '#3085d6',
        });
      }
      // Check for network errors
      else if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
        setError('Network error. Please check your connection.');
        Swal.fire({
          icon: 'error',
          title: 'Network Error',
          text: 'Unable to connect to server. Please check your internet connection.',
          confirmButtonColor: '#3085d6',
        });
      }
      // Other errors
      else {
        setError('Failed to load offers.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load offers. Please try again.',
          confirmButtonColor: '#3085d6',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOffer(id);
      }
    });
  };

  const deleteOffer = async (id) => {
    try {
      await axios.delete(`${baseurl}/offers/${id}/`);
      const updated = offers.filter(offer => offer.id !== id);
      setOffers(updated);
      
      // Adjust page if needed
      const newTotalPages = Math.ceil(updated.length / itemsPerPage);
      if (page > newTotalPages && newTotalPages > 0) {
        setPage(newTotalPages);
      } else if (updated.length === 0) {
        setPage(1);
      }
      
      showSuccessAlert('Offer deleted successfully!');
    } catch (error) {
      console.error('Error deleting offer:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete offer. Please try again.',
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-offer/${id}`);
  };

  const handleAddNew = () => {
    navigate('/add-offer');
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const [day, month, year] = dateString.split('-');
      return `${day}/${month}/${year}`;
    } catch (error) {
      return dateString;
    }
  };

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
    if (!offer) return '-';
    
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
        return offer.value || '-';
    }
  };

  const totalPages = Math.ceil(offers.length / itemsPerPage) || 1;
  const paginatedOffers = offers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const cellStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #000',
    backgroundColor: '#f0f0f0',
    fontSize: '14px',
  };

  const cellBodyStyle = {
    textAlign: 'center',
    border: '1px solid #000',
    fontSize: '14px',
  };

  if (loading) {
    return (
      <>
        <PartnerHeader />
        <Container maxWidth="lg" sx={{ mt: '100px', mb: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mt: 4 }}>Loading your offers...</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="lg" sx={{ mt: '100px', mb: 4 }}>
        <div style={{ textAlign: 'center', marginTop: "20px" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: {
                xs: "1.8rem",
                sm: "2.1rem",
                md: "2.2rem",
              },
              fontWeight: "bold",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: '10px',
            }}
          >
            My Offers
          </Typography>
          {/* <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>
            User ID: {userId}
          </Typography> */}
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNew}
            sx={{ px: 3, py: 1 }}
          >
            + Add New Offer
          </Button>
        </Box>

        {/* Error message display */}
        {error && (
          <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: '#fff8e1' }}>
            <Typography color="text.secondary">{error}</Typography>
          </Paper>
        )}

        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            display: "block",
            boxShadow: 2,
            borderRadius: 1,
            minHeight: '300px',
          }}
        >
          {offers.length === 0 ? (
            <Paper 
              sx={{ 
                p: 6, 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px'
              }}
            >
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No Offers Available
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 3, maxWidth: '500px' }}>
                You haven't created any offers yet. Click the "Add New Offer" button to create your first offer.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddNew}
                sx={{ px: 4, py: 1.5 }}
              >
                Create Your First Offer
              </Button>
            </Paper>
          ) : (
            <>
              <Table sx={{ border: '1px solid #ddd', width: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={cellStyle}>S.No</TableCell>
                    <TableCell sx={cellStyle}>Offer Type</TableCell>
                    <TableCell sx={cellStyle}>Offer Value</TableCell>
                    <TableCell sx={cellStyle}>Description</TableCell>
                    <TableCell sx={cellStyle}>Start Date</TableCell>
                    <TableCell sx={cellStyle}>End Date</TableCell>
                    <TableCell sx={cellStyle}>Status</TableCell>
                    <TableCell sx={cellStyle}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedOffers.map((offer, index) => (
                    <TableRow key={offer.id}>
                      <TableCell sx={cellBodyStyle}>
                        {(page - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell sx={cellBodyStyle}>
                        {getOfferTypeDisplay(offer.offer_type)}
                      </TableCell>
                      <TableCell sx={cellBodyStyle}>
                        {formatOfferValue(offer)}
                      </TableCell>
                      <TableCell sx={cellBodyStyle}>
                        {offer.description || '-'}
                      </TableCell>
                      <TableCell sx={cellBodyStyle}>
                        {formatDate(offer.start_date)}
                      </TableCell>
                      <TableCell sx={cellBodyStyle}>
                        {formatDate(offer.end_date)}
                      </TableCell>
                      <TableCell sx={cellBodyStyle}>
                        <Chip 
                          label={offer.is_active ? "Active" : "Inactive"} 
                          color={offer.is_active ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={cellBodyStyle}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleEdit(offer.id)}
                            title="Edit"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDeleteClick(offer.id)}
                            title="Delete"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {offers.length > itemsPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, p: 2 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default TableOffers;