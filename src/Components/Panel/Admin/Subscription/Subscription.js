import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Pagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Shared/Navbar/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseurl } from '../../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

function Subscription() {
  const [userType, setUserType] = useState('client');
  const [variantData, setVariantData] = useState([]);
  const [planDataMap, setPlanDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
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

  const fetchVariantsAndPlans = async (type) => {
    setLoading(true);
    try {
      const variantRes = await fetch(`${baseurl}/subscription/plan-variants/${type}/`);
      const variants = await variantRes.json();
      setVariantData(variants);

      const planIds = [...new Set(variants.map(v => v.plan_id))];
      const plansMap = {};

      await Promise.all(
        planIds.map(async (id) => {
          try {
            const res = await fetch(`${baseurl}/subscription/plans/${id}/`);
            const plan = await res.json();
            plansMap[id] = plan;
          } catch (err) {
            console.error(`Error fetching plan with ID ${id}`, err);
          }
        })
      );
      setPlanDataMap(plansMap);
      setPage(1); // reset page on filter change
    } catch (error) {
      console.error('Error fetching variant data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariantsAndPlans(userType);
  }, [userType]);

  const handleDelete = async (variantId) => {
    const result = await Swal.fire({
      title: `Delete Variant ID ${variantId}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`${baseurl}/subscription/plan-variants/${variantId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `Variant ID ${variantId} deleted successfully.`,
          timer: 2000,
          showConfirmButton: false,
        });
        fetchVariantsAndPlans(userType);
      } else {
        const errorData = await response.json();
        await Swal.fire({
          icon: "error",
          title: "Failed to delete",
          text: errorData.detail || 'Unknown error',
        });
      }
    } catch (error) {
      console.error('Error deleting variant:', error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: 'An error occurred while trying to delete the variant.',
      });
    }
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(variantData.length / itemsPerPage);
  const paginatedData = variantData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Header />
      <Container>
      <Box
  sx={{
    textAlign: "center",
    marginTop: {
      xs: "8%",   
      sm: "10%",   
      md: "8%", 
    },
  }}
>
  <Typography
    variant="h4"
    gutterBottom
    sx={{
      fontSize: {
        xs: "1.6rem",
        sm: "2.1rem",
        md: "2.2rem",
      },
      fontWeight: "bold",
      textAlign: "center",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginBottom: "15px",
    }}
  >
    Subscription Plan Variants
  </Typography>
</Box>

<Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "row" }, 
    justifyContent: "space-between",
    alignItems: { xs: "stretch", sm: "center" }, // stretch children on mobile
    gap: 2, 
    mb: 3,
  }}
>

<Button
    variant="contained"
    color="primary"
    onClick={() => navigate("/a-addsubscriptions")}
    sx={{ width: { xs: "100%", sm: "auto" }, mt: { xs: 2, sm: 0 } ,p:1, mb:2 }} 
  >
    + Add Subscription
  </Button>


  <FormControl sx={{ width: { xs: "100%", sm: 200 } }}>
    <InputLabel>User Type</InputLabel>
    <Select
      value={userType}
      label="User Type"
      onChange={(e) => setUserType(e.target.value)}
    >
      <MenuItem value="client">Client</MenuItem>
      <MenuItem value="agent">Team</MenuItem>
    </Select>
  </FormControl>

  
</Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <>


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
                  <TableCell sx={cellStyle}>Plan Name</TableCell>
                  <TableCell sx={cellStyle}>Description</TableCell>
                  <TableCell sx={cellStyle}>Duration (Days)</TableCell>
                  <TableCell sx={cellStyle}>Price</TableCell>
                  <TableCell sx={cellStyle}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((variant, index) => {
                    const plan = planDataMap[variant.plan_id] || {};
                    return (
                      <TableRow key={index}>
                        <TableCell sx={cellBodyStyle}>{plan.plan_name || '—'}</TableCell>
                        <TableCell sx={cellBodyStyle}>{plan.description || '—'}</TableCell>
                        <TableCell sx={cellBodyStyle}>{variant.duration_in_days}</TableCell>
                        <TableCell sx={cellBodyStyle}>₹{variant.price}</TableCell>
                        <TableCell sx={cellBodyStyle}>
                          <Box display="flex" justifyContent="center" gap={1}>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => navigate(`/a-edit-subscription/${variant.variant_id}`, { state: { variant } })}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(variant.variant_id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} sx={noDataStyle}>
                      No subscription variants found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
      
            </Box>

            {/* Pagination Bottom Right */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: '0px', // makes buttons square
                  },
                }}
              />
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export default Subscription;
