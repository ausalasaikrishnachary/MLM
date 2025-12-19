// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from "../../../Shared/Navbar/Navbar";
// import {
//   Table, TableBody, TableCell, TableHead, TableRow,
//   Box, Button, IconButton, Container, Pagination, Typography
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from '../../../BaseURL/BaseURL';

// function TableAdminMeetings() {
//   const [admins, setAdmins] = useState([]);
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 5;
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   const fetchAdmins = async () => {
//     try {
//       const response = await axios.get(`${baseurl}/phonenumbers/`);
//       console.log('Fetched data:', response.data);
//       setAdmins(response.data);
//     } catch (error) {
//       console.error('Error fetching admins:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${baseurl}/phonenumbers/${id}/`);
//       const updated = admins.filter(admin => admin.id !== id);
//       setAdmins(updated);

//       const newTotalPages = Math.ceil(updated.length / itemsPerPage);
//       if (page > newTotalPages) {
//         setPage(newTotalPages);
//       }
//     } catch (error) {
//       console.error('Error deleting admin:', error);
//     }
//   };

//   const handlePageChange = (_, value) => {
//     setPage(value);
//   };

//   const totalPages = Math.ceil(admins.length / itemsPerPage);
//   const paginatedAdmins = admins.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

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

//   return (
//     <>
//       <Header />
//       <Container>
//         <div style={{ textAlign: 'center', marginTop: "10%" }}>
        

//                  <Typography
//                     variant="h4"
//                     gutterBottom
//                     sx={{
//                       fontSize: {
//                         xs: "2.0rem",  
//                         sm: "2.1rem",   
//                         md: "2.2rem",     
//                       },
//                       fontWeight: "bold",  
//                       textAlign: "center",    
//                       whiteSpace: "nowrap",   
//                       overflow: "hidden",
//                       textOverflow: "ellipsis", 
//                       marginBottom:'10px',
//                     }}
//                   >
//                   Helpline Number
//                   </Typography>
//         </div>

//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate('/admin-meetings')} // update to your actual add page route
//           >
//             Add Phone Number
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
//               <TableCell sx={cellStyle}>S.No</TableCell>
//               <TableCell sx={cellStyle}>Name</TableCell>
//               <TableCell sx={cellStyle}>Phone Number</TableCell>
//               <TableCell sx={cellStyle}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedAdmins.length > 0 ? (
//               paginatedAdmins.map((admin, index) => (
//                 <TableRow key={admin.id}>
//                   <TableCell sx={cellBodyStyle}>
//                     {(page - 1) * itemsPerPage + index + 1}
//                   </TableCell>
//                   <TableCell sx={cellBodyStyle}>{admin.name}</TableCell>
//                   <TableCell sx={cellBodyStyle}>{admin.phone_number}</TableCell>
//                   <TableCell sx={cellBodyStyle}>
//                     <IconButton
//                       color="error"
//                       size="small"
//                       onClick={() => handleDelete(admin.id)}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} sx={noDataStyle}>No admins found</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
        
//         </Box>

//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//           <Pagination
//             count={totalPages}
//             page={page}
//             onChange={handlePageChange}
//             color="primary"
//             sx={{
//               "& .MuiPaginationItem-root": {
//                 borderRadius: "0px",
//               },
//             }}
//           />
//         </Box>
//       </Container>
//     </>
//   );
// }

// export default TableAdminMeetings;



// TableAdminMeetings.jsx - Updated with delete confirmation and sorted by newest first
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../../Shared/Navbar/Navbar";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Box, Button, IconButton, Container, Pagination, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';
import Swal from 'sweetalert2'; // Import SweetAlert2

function TableAdminMeetings() {
  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${baseurl}/phonenumbers/`);
      console.log('Fetched data:', response.data);
      // Sort by ID in descending order (newest first)
      const sortedAdmins = response.data.sort((a, b) => b.id - a.id);
      setAdmins(sortedAdmins);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleDelete = async (id, name) => {
    // SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseurl}/phonenumbers/${id}/`);
        
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Phone number has been deleted successfully.',
          timer: 2000,
          showConfirmButton: false
        });

        // Update local state (no need to re-sort here as we remove the item)
        const updated = admins.filter(admin => admin.id !== id);
        setAdmins(updated);

        // Adjust pagination if needed
        const newTotalPages = Math.ceil(updated.length / itemsPerPage);
        if (page > newTotalPages && newTotalPages > 0) {
          setPage(newTotalPages);
        } else if (updated.length === 0) {
          setPage(1);
        }
      } catch (error) {
        console.error('Error deleting admin:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete phone number.'
        });
      }
    }
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const totalPages = Math.max(1, Math.ceil(admins.length / itemsPerPage));
  const paginatedAdmins = admins.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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

  return (
    <>
      <Header />
      <Container>
        <div style={{ textAlign: 'center', marginTop: "10%" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: {
                xs: "2.0rem",  
                sm: "2.1rem",   
                md: "2.2rem",     
              },
              fontWeight: "bold",  
              textAlign: "center",    
              whiteSpace: "nowrap",   
              overflow: "hidden",
              textOverflow: "ellipsis", 
              marginBottom:'10px',
            }}
          >
            Helpline Number
          </Typography>
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/admin-meetings')}
          >
            Add Phone Number
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
                <TableCell sx={cellStyle}>Name</TableCell>
                <TableCell sx={cellStyle}>Phone Number</TableCell>
                <TableCell sx={cellStyle}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAdmins.length > 0 ? (
                paginatedAdmins.map((admin, index) => (
                  <TableRow key={admin.id}>
                    <TableCell sx={cellBodyStyle}>
                      {(page - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell sx={cellBodyStyle}>{admin.name}</TableCell>
                    <TableCell sx={cellBodyStyle}>{admin.phone_number}</TableCell>
                    <TableCell sx={cellBodyStyle}>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(admin.id, admin.name)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={noDataStyle}>No phone numbers found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        {admins.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: "0px",
                },
              }}
            />
          </Box>
        )}
      </Container>
    </>
  );
}

export default TableAdminMeetings;