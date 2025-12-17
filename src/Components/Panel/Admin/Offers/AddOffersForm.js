// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
// import {
//   Box, Button, TextField, Typography, MenuItem,
//   Grid, FormControl, InputLabel, Select, Alert,
//   Container, CircularProgress
// } from '@mui/material';
// import { baseurl } from '../../../BaseURL/BaseURL';
// import Swal from 'sweetalert2';

// const OfferForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEditMode = Boolean(id);
//   const [loading, setLoading] = useState(isEditMode);
//   const [saving, setSaving] = useState(false);
  
//   const offerTypes = [
//     { value: 'discount_percent', label: 'Discount Percentage' },
//     { value: 'discount_flat', label: 'Flat Discount' },
//     { value: 'buy_x_get_y', label: 'Buy X Get Y' },
//     { value: 'free_gift', label: 'Free Gift' }
//   ];

//   const [formData, setFormData] = useState({
//     offer_type: '',
//     value: '',
//     x_quantity: '',
//     y_quantity: '',
//     description: '',
//     start_date: '',
//     end_date: '',
//   });

//   const [errors, setErrors] = useState({});

//   // Show SweetAlert notification
//   const showAlert = (icon, title, text, confirmCallback = null) => {
//     Swal.fire({
//       icon,
//       title,
//       text,
//       showConfirmButton: true,
//       confirmButtonColor: icon === 'success' ? '#3085d6' : '#d33',
//       ...(confirmCallback && {
//         showCancelButton: true,
//         cancelButtonColor: '#6c757d',
//         confirmButtonText: 'Leave',
//         cancelButtonText: 'Stay',
//         reverseButtons: true,
//       }),
//     }).then((result) => {
//       if (result.isConfirmed && confirmCallback) {
//         confirmCallback();
//       }
//     });
//   };

//   // Fetch offer data if in edit mode
//   useEffect(() => {
//     if (isEditMode) {
//       fetchOffer();
//     }
//   }, [id]);

//   const fetchOffer = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${baseurl}/offers/${id}/`);
//       const offer = response.data;
      
//       const parseDateFromAPI = (dateStr) => {
//         if (!dateStr) return '';
        
//         if (dateStr.includes('-')) {
//           const parts = dateStr.split('-');
//           if (parts.length === 3) {
//             if (parts[0].length === 4) {
//               return dateStr;
//             } else if (parts[2].length === 4) {
//               return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
//             }
//           }
//         }
        
//         const date = new Date(dateStr);
//         if (!isNaN(date.getTime())) {
//           return date.toISOString().split('T')[0];
//         }
        
//         return '';
//       };

//       setFormData({
//         offer_type: offer.offer_type || '',
//         value: offer.value || '',
//         x_quantity: offer.x_quantity || '',
//         y_quantity: offer.y_quantity || '',
//         description: offer.description || '',
//         start_date: parseDateFromAPI(offer.start_date),
//         end_date: parseDateFromAPI(offer.end_date),
//       });
//     } catch (error) {
//       console.error('Error fetching offer:', error);
//       showAlert('error', 'Error', 'Failed to load offer data.');
//       navigate('/p-offers');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'offer_type') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value,
//         x_quantity: '',
//         y_quantity: '',
//         value: ''
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
    
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.offer_type) {
//       newErrors.offer_type = 'Offer type is required';
//     }
    
//     if (!formData.start_date) {
//       newErrors.start_date = 'Start date is required';
//     }
    
//     if (!formData.end_date) {
//       newErrors.end_date = 'End date is required';
//     }
    
//     switch(formData.offer_type) {
//       case 'discount_percent':
//         if (!formData.value || parseFloat(formData.value) <= 0 || parseFloat(formData.value) > 100) {
//           newErrors.value = 'Please enter a valid percentage (1-100)';
//         }
//         break;
        
//       case 'discount_flat':
//         if (!formData.value || parseFloat(formData.value) <= 0) {
//           newErrors.value = 'Please enter a valid amount';
//         }
//         break;
        
//       case 'buy_x_get_y':
//         if (!formData.x_quantity || parseInt(formData.x_quantity) <= 0) {
//           newErrors.x_quantity = 'Please enter valid X quantity';
//         }
//         if (!formData.y_quantity || parseInt(formData.y_quantity) <= 0) {
//           newErrors.y_quantity = 'Please enter valid Y quantity';
//         }
//         break;
        
//       case 'free_gift':
//         if (!formData.description?.trim()) {
//           newErrors.description = 'Please describe the free gift';
//         }
//         break;
//     }
    
//     if (formData.start_date && formData.end_date) {
//       const start = new Date(formData.start_date);
//       const end = new Date(formData.end_date);
      
//       if (end < start) {
//         newErrors.end_date = 'End date must be after start date';
//       }
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const formatDateForAPI = (dateStr) => {
//     if (!dateStr) return '';
    
//     if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
//       return dateStr;
//     }
    
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime())) {
//       return '';
//     }
    
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
    
//     return `${year}-${month}-${day}`;
//   };

//   const prepareDataForAPI = () => {
//     const data = {
//       ...formData,
//       start_date: formatDateForAPI(formData.start_date),
//       end_date: formatDateForAPI(formData.end_date),
//     };

//     if (data.value) data.value = parseFloat(data.value);
//     if (data.x_quantity) data.x_quantity = parseInt(data.x_quantity);
//     if (data.y_quantity) data.y_quantity = parseInt(data.y_quantity);

//     if (!data.description) data.description = null;
//     if (!data.value) data.value = null;
//     if (!data.x_quantity) data.x_quantity = null;
//     if (!data.y_quantity) data.y_quantity = null;

//     return data;
//   };

//   const handleCancel = () => {
//     if (formData.offer_type || formData.start_date || formData.end_date) {
//       showAlert(
//         'warning',
//         'Unsaved Changes',
//         'You have unsaved changes. Are you sure you want to leave?',
//         () => navigate('/p-offers')
//       );
//     } else {
//       navigate('/p-offers');
//     }
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       showAlert('warning', 'Validation Error', 'Please fix the errors in the form.');
//       return;
//     }

//     setSaving(true);
//     try {
//       const apiData = prepareDataForAPI();

//       if (isEditMode) {
//         await axios.put(`${baseurl}/offers/${id}/`, apiData);
//         showAlert('success', 'Success', 'Offer has been updated successfully.');
//       } else {
//         await axios.post(`${baseurl}/offers/`, apiData);
//         showAlert('success', 'Success', 'Offer has been created successfully.');
//       }

//       // Navigate back to offers table after 2 seconds
//       setTimeout(() => {
//         navigate('/p-offers');
//       }, 2000);
//     } catch (error) {
//       console.error('Error:', error);
//       let errorMessage = isEditMode ? 'Failed to update offer.' : 'Failed to create offer.';
      
//       if (error.response?.data) {
//         const data = error.response.data;
//         if (typeof data === 'object') {
//           const fieldErrors = {};
//           Object.keys(data).forEach(key => {
//             fieldErrors[key] = Array.isArray(data[key]) ? data[key].join(', ') : data[key];
//           });
//           setErrors(fieldErrors);
          
//           if (fieldErrors.start_date && fieldErrors.start_date.includes('YYYY-AWADD')) {
//             showAlert('error', 'Date Format Error', 'Please ensure dates are in YYYY-MM-DD format.');
//           }
//           if (fieldErrors.end_date && fieldErrors.end_date.includes('YYYY-AWADD')) {
//             showAlert('error', 'Date Format Error', 'Please ensure dates are in YYYY-MM-DD format.');
//           }
          
//           errorMessage = 'Please fix the errors in the form.';
//         } else if (typeof data === 'string') {
//           errorMessage = data;
//         }
//       }
      
//       showAlert('error', 'Error', errorMessage);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const renderFieldsByType = () => {
//     switch(formData.offer_type) {
//       case 'discount_percent':
//         return (
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Discount Percentage"
//               name="value"
//               value={formData.value}
//               onChange={handleChange}
//               required
//               error={!!errors.value}
//               helperText={errors.value}
//               type="number"
//               InputProps={{ inputProps: { min: 1, max: 100, step: 0.01 } }}
//               placeholder="e.g., 10"
//             />
//           </Grid>
//         );
        
//       case 'discount_flat':
//         return (
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Flat Discount Amount"
//               name="value"
//               value={formData.value}
//               onChange={handleChange}
//               required
//               error={!!errors.value}
//               helperText={errors.value}
//               type="number"
//               InputProps={{ inputProps: { min: 0, step: 0.01 } }}
//               placeholder="e.g., 500"
//             />
//           </Grid>
//         );
        
//       case 'buy_x_get_y':
//         return (
//           <>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Buy Quantity (X)"
//                 name="x_quantity"
//                 value={formData.x_quantity}
//                 onChange={handleChange}
//                 required
//                 error={!!errors.x_quantity}
//                 helperText={errors.x_quantity}
//                 type="number"
//                 InputProps={{ inputProps: { min: 1 } }}
//                 placeholder="e.g., 2"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Get Quantity (Y)"
//                 name="y_quantity"
//                 value={formData.y_quantity}
//                 onChange={handleChange}
//                 required
//                 error={!!errors.y_quantity}
//                 helperText={errors.y_quantity}
//                 type="number"
//                 InputProps={{ inputProps: { min: 1 } }}
//                 placeholder="e.g., 1"
//               />
//             </Grid>
//           </>
//         );
        
//       case 'free_gift':
//         return (
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Gift Description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               error={!!errors.description}
//               helperText={errors.description}
//               multiline
//               rows={2}
//               placeholder="e.g., Free T-shirt with purchase"
//             />
//           </Grid>
//         );
        
//       default:
//         return null;
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <PartnerHeader />
//         <Container maxWidth="md" sx={{ mt: '100px', mb: 4, textAlign: 'center' }}>
//           <CircularProgress />
//           <Typography sx={{ mt: 2 }}>Loading offer data...</Typography>
//         </Container>
//       </>
//     );
//   }

//   return (
//     <>
//       <PartnerHeader />
//       <Container maxWidth="md" sx={{ mt: '100px', mb: 4 }}>
//         <Box sx={{ textAlign: 'center', mb: 4 }}>
//           <Typography
//             variant="h4"
//             sx={{
//               fontSize: {
//                 xs: "1.8rem",
//                 sm: "2.1rem",
//                 md: "2.2rem",
//               },
//               fontWeight: "bold",
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             {isEditMode ? 'Edit Offer' : 'Add New Offer'}
//           </Typography>
//         </Box>

//         {errors.non_field_errors && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {errors.non_field_errors}
//           </Alert>
//         )}

//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth error={!!errors.offer_type}>
//               <InputLabel>Offer Type *</InputLabel>
//               <Select
//                 name="offer_type"
//                 value={formData.offer_type}
//                 onChange={handleChange}
//                 label="Offer Type *"
//               >
//                 <MenuItem value=""><em>Select Offer Type</em></MenuItem>
//                 {offerTypes.map((type) => (
//                   <MenuItem key={type.value} value={type.value}>
//                     {type.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.offer_type && (
//                 <Typography color="error" variant="caption">
//                   {errors.offer_type}
//                 </Typography>
//               )}
//             </FormControl>
//           </Grid>

//           {formData.offer_type !== 'free_gift' && (
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Description (Optional)"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 error={!!errors.description}
//                 helperText={errors.description}
//                 placeholder="Brief description of the offer"
//               />
//             </Grid>
//           )}

//           {renderFieldsByType()}

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Start Date *"
//               name="start_date"
//               value={formData.start_date}
//               onChange={handleChange}
//               required
//               error={!!errors.start_date}
//               // helperText={errors.start_date || "Format: YYYY-MM-DD"}
//               type="date"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               inputProps={{
//                 max: formData.end_date || '2099-12-31'
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="End Date *"
//               name="end_date"
//               value={formData.end_date}
//               onChange={handleChange}
//               required
//               error={!!errors.end_date}
//               // helperText={errors.end_date || "Format: YYYY-MM-DD"}
//               type="date"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               inputProps={{
//                 min: formData.start_date || '1900-01-01'
//               }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
//               <Button
//                 variant="outlined"
//                 onClick={handleCancel}
//                 sx={{ px: 4, py: 1.5 }}
//                 disabled={saving}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="contained"
//                 onClick={handleSubmit}
//                 sx={{ px: 4, py: 1.5 }}
//                 disabled={saving}
//                 startIcon={saving ? <CircularProgress size={20} color="inherit" /> : null}
//               >
//                 {saving ? 'Saving...' : (isEditMode ? 'Update Offer' : 'Create Offer')}
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default OfferForm;



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import {
  Box, Button, TextField, Typography, MenuItem,
  Grid, FormControl, InputLabel, Select, Alert,
  Container, CircularProgress
} from '@mui/material';
import { baseurl } from '../../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

const OfferForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  
  // Get user_id from local storage (set during login)
  const userId = localStorage.getItem('user_id');
  
  const offerTypes = [
    { value: 'discount_percent', label: 'Discount Percentage' },
    { value: 'discount_flat', label: 'Flat Discount' },
    { value: 'buy_x_get_y', label: 'Buy X Get Y' },
    { value: 'free_gift', label: 'Free Gift' }
  ];

  const [formData, setFormData] = useState({
    offer_type: '',
    value: '',
    x_quantity: '',
    y_quantity: '',
    description: '',
    start_date: '',
    end_date: '',
    user_id: userId || '' // Initialize with user_id from localStorage
  });

  const [errors, setErrors] = useState({});

  // Show SweetAlert notification
  const showAlert = (icon, title, text, confirmCallback = null) => {
    Swal.fire({
      icon,
      title,
      text,
      showConfirmButton: true,
      confirmButtonColor: icon === 'success' ? '#3085d6' : '#d33',
      ...(confirmCallback && {
        showCancelButton: true,
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Leave',
        cancelButtonText: 'Stay',
        reverseButtons: true,
      }),
    }).then((result) => {
      if (result.isConfirmed && confirmCallback) {
        confirmCallback();
      }
    });
  };

  // Fetch offer data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchOffer();
    }
  }, [id]);

  // Check if user is logged in (has user_id)
  useEffect(() => {
    if (!userId) {
      showAlert('error', 'Authentication Required', 'Please login to create or edit offers.', () => {
        navigate('/login');
      });
    }
  }, [userId]);

  const fetchOffer = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/offers/${id}/`);
      const offer = response.data;
      
      const parseDateFromAPI = (dateStr) => {
        if (!dateStr) return '';
        
        if (dateStr.includes('-')) {
          const parts = dateStr.split('-');
          if (parts.length === 3) {
            if (parts[0].length === 4) {
              return dateStr;
            } else if (parts[2].length === 4) {
              return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            }
          }
        }
        
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
        
        return '';
      };

      setFormData({
        offer_type: offer.offer_type || '',
        value: offer.value || '',
        x_quantity: offer.x_quantity || '',
        y_quantity: offer.y_quantity || '',
        description: offer.description || '',
        start_date: parseDateFromAPI(offer.start_date),
        end_date: parseDateFromAPI(offer.end_date),
        user_id: offer.user_id || userId || '' // Use existing user_id or current user_id
      });
    } catch (error) {
      console.error('Error fetching offer:', error);
      showAlert('error', 'Error', 'Failed to load offer data.');
      navigate('/p-offers');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'offer_type') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        x_quantity: '',
        y_quantity: '',
        value: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check if user is logged in
    if (!userId) {
      newErrors.general = 'User authentication required. Please login again.';
      showAlert('error', 'Authentication Error', 'Your session may have expired. Please login again.', () => {
        navigate('/login');
      });
      return false;
    }
    
    if (!formData.offer_type) {
      newErrors.offer_type = 'Offer type is required';
    }
    
    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }
    
    if (!formData.end_date) {
      newErrors.end_date = 'End date is required';
    }
    
    switch(formData.offer_type) {
      case 'discount_percent':
        if (!formData.value || parseFloat(formData.value) <= 0 || parseFloat(formData.value) > 100) {
          newErrors.value = 'Please enter a valid percentage (1-100)';
        }
        break;
        
      case 'discount_flat':
        if (!formData.value || parseFloat(formData.value) <= 0) {
          newErrors.value = 'Please enter a valid amount';
        }
        break;
        
      case 'buy_x_get_y':
        if (!formData.x_quantity || parseInt(formData.x_quantity) <= 0) {
          newErrors.x_quantity = 'Please enter valid X quantity';
        }
        if (!formData.y_quantity || parseInt(formData.y_quantity) <= 0) {
          newErrors.y_quantity = 'Please enter valid Y quantity';
        }
        break;
        
      case 'free_gift':
        if (!formData.description?.trim()) {
          newErrors.description = 'Please describe the free gift';
        }
        break;
    }
    
    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      
      if (end < start) {
        newErrors.end_date = 'End date must be after start date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDateForAPI = (dateStr) => {
    if (!dateStr) return '';
    
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const prepareDataForAPI = () => {
    const data = {
      ...formData,
      start_date: formatDateForAPI(formData.start_date),
      end_date: formatDateForAPI(formData.end_date),
      user_id: parseInt(userId) // Convert to integer as required by backend
    };

    if (data.value) data.value = parseFloat(data.value);
    if (data.x_quantity) data.x_quantity = parseInt(data.x_quantity);
    if (data.y_quantity) data.y_quantity = parseInt(data.y_quantity);

    if (!data.description) data.description = null;
    if (!data.value) data.value = null;
    if (!data.x_quantity) data.x_quantity = null;
    if (!data.y_quantity) data.y_quantity = null;

    return data;
  };

  const handleCancel = () => {
    if (formData.offer_type || formData.start_date || formData.end_date) {
      showAlert(
        'warning',
        'Unsaved Changes',
        'You have unsaved changes. Are you sure you want to leave?',
        () => navigate('/p-offers')
      );
    } else {
      navigate('/p-offers');
    }
  };

  const handleSubmit = async () => {
    // Validate user is logged in
    if (!userId) {
      showAlert('error', 'Authentication Error', 'Please login to create or edit offers.', () => {
        navigate('/login');
      });
      return;
    }

    if (!validateForm()) {
      showAlert('warning', 'Validation Error', 'Please fix the errors in the form.');
      return;
    }

    setSaving(true);
    try {
      const apiData = prepareDataForAPI();

      // Log the data being sent (for debugging)
      console.log('Submitting offer data:', apiData);

      if (isEditMode) {
        await axios.put(`${baseurl}/offers/${id}/`, apiData);
        showAlert('success', 'Success', 'Offer has been updated successfully.');
      } else {
        await axios.post(`${baseurl}/offers/`, apiData);
        showAlert('success', 'Success', 'Offer has been created successfully.');
      }

      // Navigate back to offers table after 2 seconds
      setTimeout(() => {
        navigate('/p-offers');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = isEditMode ? 'Failed to update offer.' : 'Failed to create offer.';
      
      if (error.response?.data) {
        const data = error.response.data;
        if (typeof data === 'object') {
          const fieldErrors = {};
          Object.keys(data).forEach(key => {
            fieldErrors[key] = Array.isArray(data[key]) ? data[key].join(', ') : data[key];
          });
          setErrors(fieldErrors);
          
          if (fieldErrors.start_date && fieldErrors.start_date.includes('YYYY-AWADD')) {
            showAlert('error', 'Date Format Error', 'Please ensure dates are in YYYY-MM-DD format.');
          }
          if (fieldErrors.end_date && fieldErrors.end_date.includes('YYYY-AWADD')) {
            showAlert('error', 'Date Format Error', 'Please ensure dates are in YYYY-MM-DD format.');
          }
          
          errorMessage = 'Please fix the errors in the form.';
        } else if (typeof data === 'string') {
          errorMessage = data;
        }
      }
      
      showAlert('error', 'Error', errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const renderFieldsByType = () => {
    switch(formData.offer_type) {
      case 'discount_percent':
        return (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Discount Percentage"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
              error={!!errors.value}
              helperText={errors.value}
              type="number"
              InputProps={{ inputProps: { min: 1, max: 100, step: 0.01 } }}
              placeholder="e.g., 10"
            />
          </Grid>
        );
        
      case 'discount_flat':
        return (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Flat Discount Amount"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
              error={!!errors.value}
              helperText={errors.value}
              type="number"
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
              placeholder="e.g., 500"
            />
          </Grid>
        );
        
      case 'buy_x_get_y':
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Buy Quantity (X)"
                name="x_quantity"
                value={formData.x_quantity}
                onChange={handleChange}
                required
                error={!!errors.x_quantity}
                helperText={errors.x_quantity}
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                placeholder="e.g., 2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Get Quantity (Y)"
                name="y_quantity"
                value={formData.y_quantity}
                onChange={handleChange}
                required
                error={!!errors.y_quantity}
                helperText={errors.y_quantity}
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                placeholder="e.g., 1"
              />
            </Grid>
          </>
        );
        
      case 'free_gift':
        return (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Gift Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={2}
              placeholder="e.g., Free T-shirt with purchase"
            />
          </Grid>
        );
        
      default:
        return null;
    }
  };

  if (!userId) {
    return (
      <>
        <PartnerHeader />
        <Container maxWidth="md" sx={{ mt: '100px', mb: 4, textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            Please login to access this page.
          </Alert>
          <Button
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{ px: 4, py: 1.5 }}
          >
            Go to Login
          </Button>
        </Container>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PartnerHeader />
        <Container maxWidth="md" sx={{ mt: '100px', mb: 4, textAlign: 'center' }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading offer data...</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <PartnerHeader />
      <Container maxWidth="md" sx={{ mt: '100px', mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: {
                xs: "1.8rem",
                sm: "2.1rem",
                md: "2.2rem",
              },
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isEditMode ? 'Edit Offer' : 'Add New Offer'}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            User ID: {userId}
          </Typography> */}
        </Box>

        {errors.non_field_errors && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.non_field_errors}
          </Alert>
        )}

        {errors.general && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.general}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.offer_type}>
              <InputLabel>Offer Type *</InputLabel>
              <Select
                name="offer_type"
                value={formData.offer_type}
                onChange={handleChange}
                label="Offer Type *"
              >
                <MenuItem value=""><em>Select Offer Type</em></MenuItem>
                {offerTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.offer_type && (
                <Typography color="error" variant="caption">
                  {errors.offer_type}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {formData.offer_type !== 'free_gift' && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description (Optional)"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                placeholder="Brief description of the offer"
              />
            </Grid>
          )}

          {renderFieldsByType()}

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Date *"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              error={!!errors.start_date}
              helperText={errors.start_date}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: formData.end_date || '2099-12-31'
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="End Date *"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              error={!!errors.end_date}
              helperText={errors.end_date}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: formData.start_date || '1900-01-01'
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ px: 4, py: 1.5 }}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ px: 4, py: 1.5 }}
                disabled={saving}
                startIcon={saving ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {saving ? 'Saving...' : (isEditMode ? 'Update Offer' : 'Create Offer')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default OfferForm;