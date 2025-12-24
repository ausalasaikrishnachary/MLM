// import React, { useEffect, useState } from 'react';
// import Header from "../../../Shared/Navbar/Navbar";
// import {
//   Table, TableBody, TableCell, TableHead, TableRow,
//   Box, Button, IconButton, Container, Pagination
// } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { baseurl } from '../../../BaseURL/BaseURL';

// function BookingSlab() {
//   const [slabs, setSlabs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 5;

//   const navigate = useNavigate();

//   const cellStyle = {
//     fontWeight: 'bold',
//     textAlign: 'center',
//     border: '1px solid #000',
//     backgroundColor: '#f0f0f0',
//   };

//   const cellBodyStyle = {
//     textAlign: 'center',
//     border: '1px solid #000',
//   };

//   const noDataStyle = {
//     textAlign: 'center',
//     border: '1px solid #000',
//     padding: 2,
//   };

//   const fetchSlabs = () => {
//     setLoading(true);
//     axios.get(`${baseurl}/booking-slabs/`)
//       .then(response => {
//         setSlabs(response.data);
//         setPage(1); // reset to first page on data load
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching booking slabs:', error);
//         setLoading(false);
//       });
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this slab?")) {
//       axios.delete(`${baseurl}/booking-slabs/${id}/`)
//         .then(() => {
//           fetchSlabs(); // Refresh the list
//         })
//         .catch(error => {
//           console.error('Error deleting slab:', error);
//         });
//     }
//   };

//   useEffect(() => {
//     fetchSlabs();
//   }, []);

//   const handlePageChange = (_, value) => {
//     setPage(value);
//   };

//   const totalPages = Math.ceil(slabs.length / itemsPerPage);
//   const paginatedSlabs = slabs.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   return (
//     <>
//       <Header />
//       <Container>
//         <div style={{ textAlign: 'center', marginTop: "8%" }}>
//           <h2 style={{ fontWeight: 'bold' }}>Booking Slabs</h2>
//         </div>

//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate('/a-add-booking-slab')}
//           >
//             Add Slab
//           </Button>
//         </Box>



         
//                    <Box
//            sx={{
//              width: "100%",
//              overflowX: "auto", 
//              display: "block",
//            }}
//          >
             
//         <Table sx={{ border: '1px solid black', width: '100%' }}>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={cellStyle}>ID</TableCell>
//               <TableCell sx={cellStyle}>Min Value</TableCell>
//               <TableCell sx={cellStyle}>Max Value</TableCell>
//               <TableCell sx={cellStyle}>Booking Amount</TableCell>
//               <TableCell sx={cellStyle}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={5} sx={noDataStyle}>Loading...</TableCell>
//               </TableRow>
//             ) : paginatedSlabs.length > 0 ? (
//               paginatedSlabs.map((slab) => (
//                 <TableRow key={slab.id}>
//                   <TableCell sx={cellBodyStyle}>{slab.id}</TableCell>
//                   <TableCell sx={cellBodyStyle}>₹{parseFloat(slab.min_value).toLocaleString()}</TableCell>
//                   <TableCell sx={cellBodyStyle}>₹{parseFloat(slab.max_value).toLocaleString()}</TableCell>
//                   <TableCell sx={cellBodyStyle}>₹{parseFloat(slab.booking_amount).toLocaleString()}</TableCell>
//                   <TableCell sx={cellBodyStyle}>
//                     <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
//                       <IconButton
//                         color="primary"
//                         size="small"
//                         onClick={() => navigate(`/a-edit-booking-slab/${slab.id}`)}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         size="small"
//                         onClick={() => handleDelete(slab.id)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} sx={noDataStyle}>No booking slabs found</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//         </Box>

//         {/* Always show pagination when data is present */}
//         {!loading && slabs.length > 0 && (
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//             <Pagination
//               count={totalPages}
//               page={page}
//               onChange={handlePageChange}
//               color="primary"
//               sx={{
//                 '& .MuiPaginationItem-root': {
//                   borderRadius: 0, // Square shape
//                 },
//               }}
//             />

//           </Box>
//         )}
//       </Container>
//     </>
//   );
// }

// export default BookingSlab;



import React, { useEffect, useState } from 'react';
import Header from "../../../Shared/Navbar/Navbar";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Box, Button, IconButton, Container, Pagination, TextField
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseurl } from '../../../BaseURL/BaseURL';
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2';

function BookingSlab() {
  const [slabs, setSlabs] = useState([]);
  const [filteredSlabs, setFilteredSlabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const cellStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #000',
    backgroundColor: '#f0f0f0',
  };

  const cellBodyStyle = {
    textAlign: 'center',
    border: '1px solid #000',
  };

  const noDataStyle = {
    textAlign: 'center',
    border: '1px solid #000',
    padding: 2,
  };

  const fetchSlabs = () => {
    setLoading(true);
    axios.get(`${baseurl}/booking-slabs/`)
      .then(response => {
        // Sort slabs by ID in descending order (newest first)
        const sortedSlabs = response.data.sort((a, b) => b.id - a.id);
        setSlabs(sortedSlabs);
        setFilteredSlabs(sortedSlabs); // Initialize filtered slabs with sorted data
        setPage(1); // reset to first page on data load
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching booking slabs:', error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Show loading while deleting
        Swal.fire({
          title: 'Deleting...',
          text: 'Please wait',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        axios.delete(`${baseurl}/booking-slabs/${id}/`)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Booking slab has been deleted.',
              timer: 2000,
              showConfirmButton: false
            });
            fetchSlabs(); // Refresh the list
          })
          .catch(error => {
            console.error('Error deleting slab:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to delete booking slab. Please try again.',
              timer: 2000,
              showConfirmButton: false
            });
          });
      }
    });
  };

  useEffect(() => {
    fetchSlabs();
  }, []);

  // Helper function to safely convert value to string for searching
  const safeToString = (value) => {
    if (value === null || value === undefined) return '';
    return value.toString();
  };

  // Filter slabs based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      // When search is cleared, show all slabs sorted by newest first
      const sortedSlabs = [...slabs].sort((a, b) => b.id - a.id);
      setFilteredSlabs(sortedSlabs);
      setPage(1);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = slabs.filter(slab => {
      // Safely check each property for the search query
      const idStr = safeToString(slab.id);
      const minValueStr = safeToString(slab.min_value);
      const maxValueStr = safeToString(slab.max_value);
      const bookingAmountStr = safeToString(slab.booking_amount);
      
      return (
        idStr.includes(query) ||
        minValueStr.includes(query) ||
        maxValueStr.includes(query) ||
        bookingAmountStr.includes(query)
      );
    });
    
    // Sort search results by ID in descending order (newest first)
    const sortedFiltered = filtered.sort((a, b) => b.id - a.id);
    setFilteredSlabs(sortedFiltered);
    setPage(1);
  }, [searchQuery, slabs]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(filteredSlabs.length / itemsPerPage);
  const paginatedSlabs = filteredSlabs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Function to get serial number based on current page
  const getSerialNumber = (index) => {
    return (page - 1) * itemsPerPage + index + 1;
  };

  // Helper function to safely format currency values
  const formatCurrency = (value) => {
    if (value === null || value === undefined || value === '') return '₹0';
    return `₹${parseFloat(value).toLocaleString()}`;
  };

  return (
    <>
      <Header />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "8%" }}>
          <h2 style={{ fontWeight: 'bold' }}>Booking Slabs</h2>
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SearchIcon color="action" />
            <TextField
              placeholder="Search by ID, Min, Max, or Amount..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: '350px',
                '& .MuiOutlinedInput-root': {
                  height: '40px',
                }
              }}
            />
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/a-add-booking-slab')}
          >
            Add Slab
          </Button>
        </Box>

        <Box
          sx={{
            width: "100%",
            overflowX: "auto", 
            display: "block",
          }}
        >
          <Table sx={{ border: '1px solid black', width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={cellStyle}>S.No</TableCell>
                <TableCell sx={cellStyle}>ID</TableCell>
                <TableCell sx={cellStyle}>Min Value</TableCell>
                <TableCell sx={cellStyle}>Max Value</TableCell>
                <TableCell sx={cellStyle}>Booking Amount</TableCell>
                <TableCell sx={cellStyle}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} sx={noDataStyle}>Loading...</TableCell>
                </TableRow>
              ) : paginatedSlabs.length > 0 ? (
                paginatedSlabs.map((slab, index) => (
                  <TableRow key={slab.id}>
                    <TableCell sx={cellBodyStyle}>{getSerialNumber(index)}</TableCell>
                    <TableCell sx={cellBodyStyle}>{slab.id || 'N/A'}</TableCell>
                    <TableCell sx={cellBodyStyle}>{formatCurrency(slab.min_value)}</TableCell>
                    <TableCell sx={cellBodyStyle}>{formatCurrency(slab.max_value)}</TableCell>
                    <TableCell sx={cellBodyStyle}>{formatCurrency(slab.booking_amount)}</TableCell>
                    <TableCell sx={cellBodyStyle}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => navigate(`/a-edit-booking-slab/${slab.id}`)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDelete(slab.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={noDataStyle}>
                    {searchQuery ? `No booking slabs found for "${searchQuery}"` : 'No booking slabs found'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        {/* Always show pagination when data is present */}
        {!loading && filteredSlabs.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 0, // Square shape
                },
              }}
            />
          </Box>
        )}
      </Container>
    </>
  );
}

export default BookingSlab;