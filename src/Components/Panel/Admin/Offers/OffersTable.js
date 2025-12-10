import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Box, Button, IconButton, Container, Pagination, Typography,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  DialogContentText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

function TableOffers() {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(`${baseurl}/offers/`);
      console.log('Fetched offers:', response.data);
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load offers. Please try again.',
        confirmButtonColor: '#3085d6',
      });
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

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#d33',
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

      const newTotalPages = Math.ceil(updated.length / itemsPerPage);
      if (page > newTotalPages) {
        setPage(newTotalPages);
      }
      
      showSuccessAlert('Offer has been deleted successfully.');
    } catch (error) {
      console.error('Error deleting offer:', error);
      showErrorAlert('Failed to delete offer. Please try again.');
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
    const [day, month, year] = dateString.split('-');
    return `${day}/${month}/${year}`;
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

  const totalPages = Math.ceil(offers.length / itemsPerPage);
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

  const noDataStyle = {
    textAlign: 'center',
    border: '1px solid #000',
    padding: 2,
  };

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
              marginBottom: '20px',
            }}
          >
            Offers Management
          </Typography>
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNew}
            sx={{ px: 3, py: 1 }}
          >
            Add New Offer
          </Button>
        </Box>

        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            display: "block",
            boxShadow: 2,
            borderRadius: 1,
          }}
        >
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
              {paginatedOffers.length > 0 ? (
                paginatedOffers.map((offer, index) => (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} sx={noDataStyle}>
                    No offers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
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
      </Container>
    </>
  );
}

export default TableOffers;