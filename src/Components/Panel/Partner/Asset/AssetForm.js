// import React, { useState, useEffect } from 'react';
// import { Country, State, City } from "country-state-city";
// import {
//   Box,
//   Typography,
//   Stepper,
//   Step,
//   StepLabel,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Paper,
//   Grid,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   Input,
//   Chip
// } from '@mui/material';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import { baseurl } from '../../../BaseURL/BaseURL';


// const steps = [
//   'Basic Details',
//   'Location Details',
//   'Property Profile',
//   'Media Upload',
//   'Pricing & Ownership'
// ];

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// const AssetForm = () => {  
//   const [activeStep, setActiveStep] = useState(0);
//   const [propertyCategories, setPropertyCategories] = useState([]);
//   const [propertyTypes, setPropertyTypes] = useState([]);
//   const [amenities, setAmenities] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();
//   const referralId = localStorage.getItem('referral_id');
//   const userId = localStorage.getItem('user_id');
//   const username = localStorage.getItem('user_name');
//   const [errors, setErrors] = useState({
//     description: false,
//     // ...other error states if needed
//   });

//   // Form State
//   const [formData, setFormData] = useState({
//     lookingTo: 'sell',
//     category: '',
//     propertyType: '',
//     propertyTitle: '',
//     description: '',
//     address: '',
//     city: '',
//     state: '',
//     country: 'India',
//     pinCode: '',
//     latitude: '',
//     longitude: '',
//     plotArea: '',
//     pricePerUnit: '',
//     areaUnit: 'sq.ft.',
//     length: '',
//     breadth: '',
//     numberOfFloors: 1,
//     numberOfBedrooms: '',
//     numberOfBalconies: '',
//     numberOfBathrooms: '',
//     floor: "",
//     furnishing_status: "",
//     openSides: 0,
//     builtupArea: '',
//     numberOfRoads: 0,
//     roadWidth1: null,
//     roadWidth2: null,
//     facing: 'east',
//     ownershipType: 'Freehold',
//     price: '',
//     maintenance: '',
//     amenities: [], // Default amenity
//     propertyUniqueness: '',
//     locationAdvantages: '',
//     otherFeatures: '',
//     ownerName: '',
//     ownerContact: '',
//     ownerEmail: '',
//     isFeatured: false,
//     images: [],
//     videos: [],
//     userId: userId,
//     agent_commission: "",
//     files: [],
//     preferred_tenants: '',
//     rent_amount: '',
//     deposit_amount: '',
//     available_from: '',
//     agreement_video: null,
//     agreement_file: null,
//   });

//    const countries = Country.getAllCountries();
//     const states = formData.country
//       ? State.getStatesOfCountry(formData.country)
//       : [];
//     const cities = formData.state
//       ? City.getCitiesOfState(formData.country, formData.state)
//       : [];

//   const [showResidentialFields, setShowResidentialFields] = useState(false);
//   // Add this useEffect after your existing useEffects
// const [showBuiltupArea, setShowBuiltupArea] = useState(true);

// useEffect(() => {
//   if (formData.propertyType) {
//     const selectedType = propertyTypes.find(type => type.property_type_id === formData.propertyType);
//     if (selectedType) {
//       const typeName = selectedType.name.toLowerCase();
      
//       // Show residential fields for residential property types
//       const shouldShowResidential = typeName.includes('flat') || typeName.includes('villa') ||
//         typeName.includes('apartment') || typeName.includes('house');
//       setShowResidentialFields(shouldShowResidential);
      
//       // Hide built-up area for plot types
//       const shouldShowBuiltupArea = !typeName.includes('plot');
//       setShowBuiltupArea(shouldShowBuiltupArea);
//     }
//   }
// }, [formData.propertyType, propertyTypes]);

//   useEffect(() => {
//     if (formData.propertyType) {
//       const selectedType = propertyTypes.find(type => type.property_type_id === formData.propertyType);
//       if (selectedType) {
//         const typeName = selectedType.name.toLowerCase();
//         const shouldShow = typeName.includes('flat') || typeName.includes('villa') ||
//           typeName.includes('apartment') || typeName.includes('house');
//         setShowResidentialFields(shouldShow);
//       }
//     }
//   }, [formData.propertyType, propertyTypes]);

//   // Fetch initial data
//   useEffect(() => {
//     const fetchData = async () => {
//     try {
//       const [categoriesRes, amenitiesRes] = await Promise.all([
//         axios.get(`${baseurl}/property-categories/`),
//         axios.get(`${baseurl}/amenities/`)
//       ]);
//       setPropertyCategories(categoriesRes.data);
      
//       // Convert amenity IDs to numbers
//       const formattedAmenities = amenitiesRes.data.map(amenity => ({
//         ...amenity,
//         amenity_id: parseInt(amenity.amenity_id)
//       }));
//       setAmenities(formattedAmenities);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (formData.category) {
//       console.log('Fetching property types for category:', formData.category);
//       axios
//         .get(`${baseurl}/property-types/category-id/${formData.category}/`)
//         .then((response) => {
//           console.log('Fetched property types:', response.data);
//           setPropertyTypes(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching property types:', error);
//         });
//     }
//   }, [formData.category]);

//   useEffect(() => {
//     if (formData.lookingTo === 'sell') {
//       const price = parseFloat(formData.price) || 0;
//       const commission = parseFloat(formData.agent_commission) || 0;
//       const total = price + commission;
//       setFormData(prev => ({
//         ...prev,
//         total_property_value: total
//       }));
//     }
//   }, [formData.price, formData.agent_commission, formData.lookingTo]);

//   const validateDescription = (value) => {
//     // Regex: Must contain at least one letter and one number
//     const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
//     return regex.test(value);
//   };

//  const handleChange = (e) => {
//   const { name, value, type, checked } = e.target;
//   const newValue = type === 'checkbox' ? checked : value;

//   setFormData((prev) => {
//     const updated = { ...prev, [name]: newValue };

//     // Auto-calculate price when pricePerUnit or plotArea changes
//     if (name === "pricePerUnit" || name === "plotArea") {
//       const pricePerUnit = parseFloat(updated.pricePerUnit) || 0;
//       const plotArea = parseFloat(updated.plotArea) || 0;
//       updated.price = pricePerUnit * plotArea;
//     }

//     return updated;
//   });

//   // Validate description
//   if (name === "description") {
//     setErrors((prev) => ({
//       ...prev,
//       description: !validateDescription(value),
//     }));
//   }
// };


//   const handleFileUpload = async (e, type) => {
//     const files = e.target.files;
//     if (!files.length) return;

//     const newFiles = Array.from(files).map(file => ({
//       name: file.name,
//       type: file.type,
//       size: file.size,
//       file // Store the actual file object for later upload
//     }));

//     setFormData(prev => ({
//       ...prev,
//       [type]: [...prev[type], ...newFiles]
//     }));
//   };

//   const removeFile = (index, type) => {
//     setFormData(prev => ({
//       ...prev,
//       [type]: prev[type].filter((_, i) => i !== index)
//     }));
//   };

//  const handleAmenityChange = (amenityId) => {
//   setFormData(prev => {
//     const numericId = parseInt(amenityId);
//     const newAmenities = prev.amenities.includes(numericId)
//       ? prev.amenities.filter(id => id !== numericId)
//       : [...prev.amenities, numericId];
//     return { ...prev, amenities: newAmenities };
//   });
// };

//   // Add these handler functions:
//   const handleAgreementVideoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         agreement_video: {
//           name: file.name,
//           type: file.type,
//           size: file.size,
//           file: file
//         }
//       }));
//     }
//   };

//   const handleAgreementFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         agreement_file: {
//           name: file.name,
//           type: file.type,
//           size: file.size,
//           file: file
//         }
//       }));
//     }
//   };

//   const removeAgreementVideo = () => {
//     setFormData(prev => ({
//       ...prev,
//       agreement_video: null
//     }));
//   };

//   const removeAgreementFile = () => {
//     setFormData(prev => ({
//       ...prev,
//       agreement_file: null
//     }));
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);

//     try {
//       // Convert Area to sq.ft based on selected unit
//       // let plotAreaSqft = parseFloat(formData.plotArea) || 0;
//       // switch (formData.areaUnit) {
//       //   case 'sq.m.': plotAreaSqft *= 10.7639; break;
//       //   case 'acres': plotAreaSqft *= 43560; break;
//       //   case 'hectares': plotAreaSqft *= 107639; break;
//       //   default: break; // Already in sq.ft
//       // }

//       // Prepare form data for API
//       const payload = new FormData();
//       const userId = localStorage.getItem("user_id");

//       // Append all basic fields
//       const formFields = {
//         looking_to: formData.lookingTo,
//         property_title: formData.propertyTitle,
//         description: formData.description,
//         address: formData.address,
//         city: formData.city,
//         state: formData.state,
//         country: formData.country,
//         pin_code: formData.pinCode,
//         latitude: formData.latitude || '12.120000',
//         longitude: formData.longitude || '12.120000',
//          area: formData.plotArea,
//         // area: plotAreaSqft.toFixed(2),
//         area_unit: formData.areaUnit,
//         price_per_unit: formData.pricePerUnit || '0.00',
//         builtup_area: formData.builtupArea || '0.00',
//         length_ft: formData.length || '0.00',
//         breadth_ft: formData.breadth || '0.00',
//         number_of_floors: formData.numberOfFloors,
//         number_of_open_sides: formData.openSides,
//         number_of_roads: formData.numberOfRoads,
//         road_width_1_ft: formData.roadWidth1 || '0.00',
//         road_width_2_ft: formData.roadWidth2 || '0.00',
//         facing: formData.facing,
//         ownership_type: formData.ownershipType,
//         property_value: formData.price,
//         property_uniqueness: formData.propertyUniqueness,
//         location_advantages: formData.locationAdvantages,
//         other_features: formData.otherFeatures,
//         owner_name: formData.ownerName,
//         owner_contact: formData.ownerContact,
//         owner_email: formData.ownerEmail,
//         is_featured: formData.isFeatured,
//         category: formData.category,
//         property_type: formData.propertyType,
//         user_id: userId,
//         referral_id: referralId,
//         number_of_bedrooms: formData.numberOfBedrooms,
//         number_of_balconies: formData.numberOfBalconies,
//         number_of_bathrooms: formData.numberOfBathrooms,
//         floor: formData.floor,
//         furnishing_status: formData.furnishing_status,
//         agent_commission: formData.agent_commission,
//         total_property_value: Number(formData.price) + Number(formData.agent_commission),
//         username: username,
//         preferred_tenants: formData.preferred_tenants,
//         rent_amount: formData.rent_amount,
//         deposit_amount: formData.deposit_amount,
//         available_from: formData.available_from,
//       };
//  console.log(typeof amenities); 
//       // Log the payload for debugging
//       console.log('Form payload:', formFields);

//       // Append fields to FormData
//       Object.entries(formFields).forEach(([key, value]) => {
//         if (value !== null && value !== undefined) {
//           payload.append(key, value);
//         }
//       });

//  // With this dynamic version:
// if (formData.amenities && formData.amenities.length > 0) {
//   formData.amenities.forEach((id) => {
//     payload.append("amenities", id.toString()); // Ensure it's string for FormData
//   });
// }

//       // Append files
//       formData.images.forEach((img) => {
//         if (img.file) {
//           payload.append('images', img.file, img.name);
//         }
//       });

//       formData.videos.forEach((vid) => {
//         if (vid.file) {
//           payload.append('videos', vid.file, vid.name);
//         }
//       });

//       // Add this section for files
//       formData.files.forEach((doc) => {
//         if (doc.file) {
//           payload.append('files', doc.file, doc.name);
//         }
//       });

//       // In the handleSubmit function, add these before the payload.append files section:
//       if (formData.agreement_video?.file) {
//         payload.append('agreement_video', formData.agreement_video.file, formData.agreement_video.name);
//       }

//       if (formData.agreement_file?.file) {
//         payload.append('agreement_file', formData.agreement_file.file, formData.agreement_file.name);
//       }

//       // Debug: Log FormData contents
//       for (let pair of payload.entries()) {
//         console.log(pair[0] + ', ' + pair[1]);
//       }

//       // Submit to API
//       const response = await axios.post(`${baseurl}/property/`, payload, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       console.log('Submission successful:', response.data);
//      Swal.fire('Success', 'Property Added Successfully!', 'success');
//       navigate("/p-myassets");

//       // Optionally reset form or redirect here
//     } catch (error) {
//       console.error('Detailed submission error:', {
//         message: error.message,
//         response: error.response?.data,
//         config: error.config
//       });

//       let errorMessage = 'Error submitting property';
//       if (error.response) {
//         // Handle specific backend validation errors
//         if (error.response.data) {
//           errorMessage += `: ${JSON.stringify(error.response.data)}`;
//         } else {
//           errorMessage += `: ${error.response.statusText}`;
//         }
//       } else {
//         errorMessage += `: ${error.message}`;
//       }
//       Swal.fire('Error', 'An error occurred while updating.', 'error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const validateStep = (step) => {
//     switch (step) {
//       case 0: // Basic Details
//         return (
//           formData.lookingTo &&
//           formData.propertyTitle?.trim() &&
//           formData.category &&
//           formData.propertyType &&
//           formData.description?.trim()
//           // !errors.description
//         );

//       case 1: // Location Details
//         return (
//           formData.address?.trim() &&
//           formData.city?.trim() &&
//           formData.state?.trim() &&
//           formData.country?.trim() &&
//           // formData.pinCode?.trim() &&
//           formData.latitude !== undefined &&
//           formData.longitude !== undefined
//         );

//       case 2: // Property Details
//         const basicPropertyValid = (
//           formData.plotArea &&
//           formData.areaUnit &&
//           formData.length &&
//           formData.breadth &&
//           formData.builtupArea &&
//           formData.facing &&
//           formData.ownershipType
//         );

//         // Additional validation for residential properties if shown
//         const residentialValid = !showResidentialFields || (
//           formData.numberOfFloors &&
//           formData.numberOfBedrooms &&
//           formData.numberOfBathrooms &&
//           formData.furnishing_status
//         );

//         // Road width validation based on number of roads
//         const roadsValid = (
//           formData.numberOfRoads === 0 || (
//             (formData.numberOfRoads >= 1 && formData.roadWidth1) &&
//             (formData.numberOfRoads < 2 || formData.roadWidth2)
//           )
//         );

//         return basicPropertyValid && residentialValid && roadsValid;

//       case 3: // Media Upload
//         // At least one image is required
//         return formData.images.length > 0;

//       case 4: // Pricing & Contact
//         if (formData.lookingTo === 'sell') {
//           return (
//             formData.price !== undefined &&
//             formData.company_commission !== undefined &&
//             formData.ownerName?.trim() &&
//             formData.ownerContact?.trim()
//           );
//         } else { // rent
//           return (
//             formData.rent_amount !== undefined &&
//             formData.deposit_amount !== undefined &&
//             formData.ownerName?.trim() &&
//             formData.ownerContact?.trim()
//           );
//         }

//       default:
//         return false;
//     }
//   };

//   const renderStepContent = () => {
//     switch (activeStep) {
//       case 0: return (
//         <Grid container spacing={3} sx={{ mt: 2 }}>
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Looking To</InputLabel>
//               <Select
//                 name="lookingTo"
//                 value={formData.lookingTo}
//                 onChange={handleChange}
//                 label="Looking To"
//               >
//                 <MenuItem value="sell">Sell</MenuItem>
//                 <MenuItem value="rent">Rent</MenuItem>
//                 {/* <MenuItem value="lease">Lease</MenuItem> */}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Property Category</InputLabel>
//               <Select
//                 name="category"
//                 value={formData.category || ''}
//                 onChange={(e) => {
//                   const selectedId = e.target.value;
//                   setFormData((prev) => ({
//                     ...prev,
//                     category: selectedId,
//                     propertyType: '', // reset propertyType when category changes
//                   }));
//                 }}
//                 label="Property Category"
//               >
//                 {propertyCategories.map((category) => (
//                   <MenuItem key={category.property_category_id} value={category.property_category_id}>
//                     {category.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Property Type</InputLabel>
//               <Select
//                 name="propertyType"
//                 value={formData.propertyType || ''}
//                 onChange={(e) => {
//                   const selectedId = e.target.value;
//                   setFormData((prev) => ({
//                     ...prev,
//                     propertyType: selectedId,
//                   }));
//                 }}
//                 label="Property Type"
//                 disabled={!formData.category}
//                 displayEmpty
//               >
//                 <MenuItem value="" disabled></MenuItem>
//                 {propertyTypes.map((type) => (
//                   <MenuItem key={type.property_type_id} value={type.property_type_id}>
//                     {type.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//           </Grid>

//           {/* <Grid item xs={12} sm={6}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Property Type</InputLabel>
//               <Select
//                 value={propertyType}
//                 onChange={(e) => setPropertyType(e.target.value)}
//                 label="Property Type"
//                 disabled={!propertyCategory} // optional: disable if no category is selected
//               >
//                 {propertyTypes.map((type) => (
//                   <MenuItem key={type.property_type_id} value={type.name}>
//                     {type.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid> */}

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Property Title"
//               name="propertyTitle"
//               value={formData.propertyTitle}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               multiline
//               rows={4}
//               label="Description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             //  error={errors.description}
//             //  helperText={
//             //    errors.description 
//             //      ? "Description must contain both letters and numbers." 
//             //      : ""
//             //  }
//             />
//           </Grid>
//         </Grid>
//       );

//       case 1: return (
//         <Grid container spacing={3} sx={{ mt: 2 }}>
         
//          <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Country"
//                   value={formData.country}
//                   onChange={(e) => {
//                     setFormData({
//                       ...formData,
//                       country: e.target.value,
//                       state: "",
//                       city: "",
//                     });
//                   }}
//                 >
//                   {countries.map((country) => (
//                     <MenuItem key={country.isoCode} value={country.isoCode}>
//                       {country.name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
        
//               {/* State Dropdown */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="State"
//                   value={formData.state}
//                   onChange={(e) => {
//                     setFormData({
//                       ...formData,
//                       state: e.target.value,
//                       city: "",
//                     });
//                   }}
//                   disabled={!formData.country}
//                 >
//                   {states.map((state) => (
//                     <MenuItem key={state.isoCode} value={state.isoCode}>
//                       {state.name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
        
//               {/* City Dropdown */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="City"
//                   value={formData.city}
//                   onChange={(e) => {
//                     setFormData({
//                       ...formData,
//                       city: e.target.value,
//                     });
//                   }}
//                   disabled={!formData.state}
//                 >
//                   {cities.map((city) => (
//                     <MenuItem key={city.name} value={city.name}>
//                       {city.name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Pin Code"
//               name="pinCode"
//               value={formData.pinCode}
//               onChange={handleChange}
//             />
//           </Grid>

//            <Grid item xs={12}>
//             <TextField
//               fullWidth
//               multiline
//               rows={2}
//               label="Full Address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//             />
//           </Grid>

//           {/* <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Latitude"
//               name="latitude"
//               type="number"
//               value={formData.latitude}
//               onChange={handleChange}
//               placeholder="12.120000"
//             />
//           </Grid> */}

//           {/* <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Longitude"
//               name="longitude"
//               type="number"
//               value={formData.longitude}
//               onChange={handleChange}
//               placeholder="12.120000"
//             />
//           </Grid> */}
//         </Grid>
//       );

//       case 2: return (
//         <Grid container spacing={3} sx={{ mt: 2 }}>
//           {showResidentialFields && (
//             <>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Number of Floors"
//                   name="numberOfFloors"
//                   type="number"
//                   value={formData.numberOfFloors}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Number of Bedrooms"
//                   name="numberOfBedrooms"
//                   type="number"
//                   value={formData.numberOfBedrooms}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Number of Balconies"
//                   name="numberOfBalconies"
//                   type="number"
//                   value={formData.numberOfBalconies}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Number of Bathrooms"
//                   name="numberOfBathrooms"
//                   type="number"
//                   value={formData.numberOfBathrooms}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Floor"
//                   name="floor"
//                   type="number"
//                   value={formData.floor}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Furnishing Status</InputLabel>
//                   {/* <Select
//                                   name="furnishing_status"
//                                   value={formData.furnishing_status}
//                                   onChange={handleChange}
//                                   label="furnishing status"
//                                 >
//                                   <MenuItem value="semi furnished">Semi Furnished</MenuItem>
//                                   <MenuItem value="fully furnished">Fully Furnished</MenuItem>
//                                 </Select> */}
//                   <Select
//                     name="furnishing_status"
//                     value={formData.furnishing_status}
//                     onChange={handleChange}
//                     label="Furnishing Status"
//                   >
//                     <MenuItem value="Semi-Furnished">Semi-Furnished</MenuItem>
//                     <MenuItem value="Fully-Furnished">Fully-Furnished</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </>
//           )}
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Area Unit</InputLabel>
//               <Select
//                 name="areaUnit"
//                 value={formData.areaUnit}
//                 onChange={handleChange}
//                 label="Area Unit"
//               >
//                 <MenuItem value="sq.ft.">Square Feet</MenuItem>
//                                <MenuItem value="sq.m.">Square Meters</MenuItem>
//                                <MenuItem value="sq.yd.">Square Yards</MenuItem>
//                                <MenuItem value="acres">Acres</MenuItem>
//                                <MenuItem value="hectares">Hectares</MenuItem>
//                                 <MenuItem value="cents">Cents</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//             <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="Area"
//                         name="plotArea"
//                         type="number"
//                         value={formData.plotArea}
//                         onChange={handleChange}
//                       />
//                     </Grid>
          
//                      <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="Price Per Unit"
//                         name="pricePerUnit"
//                         type="number"
//                         value={formData.pricePerUnit}
//                         onChange={handleChange}
//                       />
//                     </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Length (ft)"
//               name="length"
//               type="number"
//               value={formData.length}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Breadth (ft)"
//               name="breadth"
//               type="number"
//               value={formData.breadth}
//               onChange={handleChange}
//             />
//           </Grid>

          
//       {showBuiltupArea && (  // ✅ CORRECT - wraps entire Grid
//   <Grid item xs={12} sm={6}>
//     <TextField
//       fullWidth
//       label="Built-up Area"
//       name="builtupArea"
//       type="number"
//       value={formData.builtupArea}
//       onChange={handleChange}
//     />
//   </Grid>
// )}

//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Facing Direction</InputLabel>
//               <Select
//                 name="facing"
//                 value={formData.facing}
//                 onChange={handleChange}
//                 label="Facing Direction"
//               >
//                 <MenuItem value="east">East</MenuItem>
//                 <MenuItem value="west">West</MenuItem>
//                 <MenuItem value="north">North</MenuItem>
//                 <MenuItem value="south">South</MenuItem>
//                 <MenuItem value="north-east">North-East</MenuItem>
//                 <MenuItem value="north-west">North-West</MenuItem>
//                 <MenuItem value="south-east">South-East</MenuItem>
//                 <MenuItem value="south-west">South-West</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Ownership Type</InputLabel>
//               <Select
//                 name="ownershipType"
//                 value={formData.ownershipType}
//                 onChange={handleChange}
//                 label="Ownership Type"
//               >
//                 <MenuItem value="Freehold">Freehold</MenuItem>
//                 <MenuItem value="Leasehold">Leasehold</MenuItem>
//                 <MenuItem value="Cooperative">Cooperative</MenuItem>
//                 <MenuItem value="Condominium">Condominium</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Number of Open Sides"
//               name="openSides"
//               type="number"
//               value={formData.openSides}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Number of Roads"
//               name="numberOfRoads"
//               type="number"
//               value={formData.numberOfRoads}
//               onChange={handleChange}
//             />
//           </Grid>

//           {formData.numberOfRoads >= 1 && (
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Road 1 Width (ft)"
//                 name="roadWidth1"
//                 type="number"
//                 value={formData.roadWidth1}
//                 onChange={handleChange}
//               />
//             </Grid>
//           )}

//           {formData.numberOfRoads >= 2 && (
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Road 2 Width (ft)"
//                 name="roadWidth2"
//                 type="number"
//                 value={formData.roadWidth2}
//                 onChange={handleChange}
//               />
//             </Grid>
//           )}

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Property Uniqueness"
//               name="propertyUniqueness"
//               value={formData.propertyUniqueness}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               multiline
//               rows={3}
//               label="Location Advantages"
//               name="locationAdvantages"
//               value={formData.locationAdvantages}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               multiline
//               rows={3}
//               label="Other Features"
//               name="otherFeatures"
//               value={formData.otherFeatures}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>Amenities</Typography>
//             <FormGroup row>
//               {amenities.map(amenity => (
//                 <FormControlLabel
//                   key={amenity.amenity_id}
//                   control={
//                     <Checkbox
//                       checked={formData.amenities.includes(amenity.amenity_id)}
//                       onChange={() => handleAmenityChange(amenity.amenity_id)}
//                     />
//                   }
//                   label={amenity.name}
//                 />
//               ))}
//             </FormGroup>
//           </Grid>
//         </Grid>
//       );

//       case 3: return (
//         <Grid container spacing={3} sx={{ mt: 2 }}>
//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>Upload Images</Typography>
//             <Button
//               component="label"
//               variant="contained"
//               startIcon={<UploadFileIcon />}
//               sx={{ mb: 2 }}
//             >
//               Upload Property Images
//               <VisuallyHiddenInput
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={(e) => handleFileUpload(e, 'images')}
//               />
//             </Button>

//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               {formData.images.map((img, index) => (
//                 <Chip
//                   key={index}
//                   label={img.name}
//                   onDelete={() => removeFile(index, 'images')}
//                   sx={{ m: 0.5 }}
//                 />
//               ))}
//             </Box>
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>Upload Videos</Typography>
//             <Button
//               component="label"
//               variant="contained"
//               startIcon={<UploadFileIcon />}
//               sx={{ mb: 2 }}
//             >
//               Upload Property Videos
//               <VisuallyHiddenInput
//                 type="file"
//                 accept="video/*"
//                 multiple
//                 onChange={(e) => handleFileUpload(e, 'videos')}
//               />
//             </Button>

//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               {formData.videos.map((vid, index) => (
//                 <Chip
//                   key={index}
//                   label={vid.name}
//                   onDelete={() => removeFile(index, 'videos')}
//                   sx={{ m: 0.5 }}
//                 />
//               ))}
//             </Box>
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>Upload Documents</Typography>
//             <Button
//               component="label"
//               variant="contained"
//               startIcon={<UploadFileIcon />}
//               sx={{ mb: 2 }}
//             >
//               Upload Property Documents
//               <VisuallyHiddenInput
//                 type="file"
//                 accept=".pdf,.doc,.docx,.xls,.xlsx,.txt" // Specify accepted document types
//                 multiple
//                 onChange={(e) => handleFileUpload(e, 'files')}
//               />
//             </Button>

//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               {formData.files.map((doc, index) => (
//                 <Chip
//                   key={index}
//                   label={doc.name}
//                   onDelete={() => removeFile(index, 'files')}
//                   sx={{ m: 0.5 }}
//                 />
//               ))}
//             </Box>
//           </Grid>
//           {/* <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>Agreement Video</Typography>
//             <Button
//               component="label"
//               variant="contained"
//               startIcon={<UploadFileIcon />}
//               sx={{ mb: 2 }}
//             >
//               Upload Agreement Video
//               <VisuallyHiddenInput
//                 type="file"
//                 accept="video/*"
//                 onChange={handleAgreementVideoUpload}
//               />
//             </Button>

//             {formData.agreement_video && (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Chip
//                   label={formData.agreement_video.name}
//                   onDelete={removeAgreementVideo}
//                   sx={{ m: 0.5 }}
//                 />
//               </Box>
//             )}
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>Agreement Document</Typography>
//             <Button
//               component="label"
//               variant="contained"
//               startIcon={<UploadFileIcon />}
//               sx={{ mb: 2 }}
//             >
//               Upload Agreement Document
//               <VisuallyHiddenInput
//                 type="file"
//                 accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
//                 onChange={handleAgreementFileUpload}
//               />
//             </Button>

//             {formData.agreement_file && (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Chip
//                   label={formData.agreement_file.name}
//                   onDelete={removeAgreementFile}
//                   sx={{ m: 0.5 }}
//                 />
//               </Box>
//             )}
//           </Grid> */}

//         </Grid>
//       );

//       // case 4: return (
//       //   <Grid container spacing={3} sx={{ mt: 2 }}>
//       //     <Grid item xs={12} sm={6}>
//       //       <TextField
//       //         fullWidth
//       //         label="Property Value"
//       //         name="price"
//       //         type="number"
//       //         value={formData.price}
//       //         onChange={handleChange}
//       //       />
//       //     </Grid>

//       //     <Grid item xs={12} sm={6}>
//       //       <TextField
//       //         fullWidth
//       //         label="Agent Commission"
//       //         name="agent_commission"
//       //         type="number"
//       //         value={formData.agent_commission}
//       //         onChange={handleChange}
//       //       />
//       //     </Grid>
//       //     <Grid item xs={12} sm={6}>
//       //       <TextField
//       //         fullWidth
//       //         label="Owner Name"
//       //         name="ownerName"
//       //         value={formData.ownerName}
//       //         onChange={handleChange}
//       //       />
//       //     </Grid>

//       //     <Grid item xs={12} sm={6}>
//       //       <TextField
//       //         fullWidth
//       //         label="Owner Contact"
//       //         name="ownerContact"
//       //         value={formData.ownerContact}
//       //         onChange={handleChange}
//       //       />
//       //     </Grid>

//       //     <Grid item xs={12} sm={6}>
//       //       <TextField
//       //         fullWidth
//       //         label="Owner Email"
//       //         name="ownerEmail"
//       //         type="email"
//       //         value={formData.ownerEmail}
//       //         onChange={handleChange}
//       //       />
//       //     </Grid>
//       //   </Grid>
//       // );

//       case 4: return (
//         <Grid container spacing={3} sx={{ mt: 2 }}>
//           {formData.lookingTo === 'sell' ? (
//             <>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Property Value"
//                   name="price"
//                   type="number"
//                   value={formData.price}
//                   // onChange={handleChange}
//                    InputProps={{ readOnly: true }}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Team Payout"
//                   name="agent_commission"
//                   type="number"
//                   value={formData.agent_commission}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Total Property Value"
//                   name="total_property_value"
//                   type="number"
//                   value={formData.total_property_value || ''}
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                 />
//               </Grid>
//             </>
//           ) : (
//             <>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Preferred Tenants"
//                   name="preferred_tenants"
//                   value={formData.preferred_tenants || ''}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Rent Amount"
//                   name="rent_amount"
//                   type="number"
//                   value={formData.rent_amount || ''}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Deposit Amount"
//                   name="deposit_amount"
//                   type="number"
//                   value={formData.deposit_amount || ''}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Available From"
//                   name="available_from"
//                   value={formData.available_from || ''}
//                   onChange={handleChange}
//                 />
//               </Grid>
//             </>
//           )}

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Owner Name"
//               name="ownerName"
//               value={formData.ownerName}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Owner Contact"
//               name="ownerContact"
//               value={formData.ownerContact}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Owner Email"
//               name="ownerEmail"
//               type="email"
//               value={formData.ownerEmail}
//               onChange={handleChange}
//             />
//           </Grid>
//         </Grid>
//       );


//       default: return null;
//     }
//   };

//   return (
//     <>
//       <PartnerHeader />
//       <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, }}>
//         <Typography variant="h4" gutterBottom>Add New Property</Typography>

//         <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>

//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             width: { xs: '100%', sm: '100%', md: '80%' }
//           }}>
//           {renderStepContent()}

//           <Box display="flex" justifyContent="space-between" mt={3}>
//             <Button
//               disabled={activeStep === 0}
//               onClick={() => setActiveStep(prev => prev - 1)}
//               variant="outlined"
//             >
//               Back
//             </Button>

//             {activeStep === steps.length - 1 ? (
//               <Button
//                 variant="contained"
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Submitting...' : 'Submit Property'}
//               </Button>
//             ) : (
//               <Button
//                 variant="contained"
//                 onClick={() => setActiveStep(prev => prev + 1)}
//                 disabled={!validateStep(activeStep)}
//               >

//                 Next
//               </Button>
//             )}
//           </Box>
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default AssetForm;



// import React, { useState, useEffect } from 'react';
// import { Country, State, City } from "country-state-city";
// import {
//   Box,
//   Typography,
//   Stepper,
//   Step,
//   StepLabel,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Paper,
//   Grid,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   Input,
//   Chip
// } from '@mui/material';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import { baseurl } from '../../../BaseURL/BaseURL';


// const steps = [
//   'Basic Details',
//   'Location Details',
//   'Property Profile',
//   'Media Upload',
//   'Pricing & Ownership'
// ];

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// const AssetForm = () => {  
//   const [activeStep, setActiveStep] = useState(0);
//   const [propertyCategories, setPropertyCategories] = useState([]);
//   const [propertyTypes, setPropertyTypes] = useState([]);
//   const [amenities, setAmenities] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();
//   const referralId = localStorage.getItem('referral_id');
//   const userId = localStorage.getItem('user_id');
//   const username = localStorage.getItem('user_name');
//   const [errors, setErrors] = useState({
//     description: false,
//     // ...other error states if needed
//   });

//   // Form State
//   const [formData, setFormData] = useState({
//     lookingTo: 'sell',
//     category: '',
//     propertyType: '',
//     propertyTitle: '',
//     description: '',
//     address: '',
//     city: '',
//     state: '',
//     country: 'India',
//     pinCode: '',
//     latitude: '',
//     longitude: '',
//     plotArea: '',
//     pricePerUnit: '',
//     areaUnit: 'sq.ft.',
//     length: '',
//     breadth: '',
//     numberOfFloors: 1,
//     numberOfBedrooms: '',
//     numberOfBalconies: '',
//     numberOfBathrooms: '',
//     floor: "",
//     furnishing_status: "",
//     openSides: 0,
//     builtupArea: '',
//     numberOfRoads: 0,
//     roadWidth1: null,
//     roadWidth2: null,
//     facing: 'east',
//     ownershipType: 'Freehold',
//     price: '',
//     maintenance: '',
//     amenities: [], // Default amenity
//     propertyUniqueness: '',
//     locationAdvantages: '',
//     otherFeatures: '',
//     ownerName: '',
//     ownerContact: '',
//     ownerEmail: '',
//     isFeatured: false,
//     images: [],
//     videos: [],
//     userId: userId,
//     agent_commission: "",
//     files: [],
//     preferred_tenants: '',
//     rent_amount: '',
//     deposit_amount: '',
//     available_from: '',
//     agreement_video: null,
//     agreement_file: null,
//   });

//    const countries = Country.getAllCountries();
//     const states = formData.country
//       ? State.getStatesOfCountry(formData.country)
//       : [];
//     const cities = formData.state
//       ? City.getCitiesOfState(formData.country, formData.state)
//       : [];

//   const [showResidentialFields, setShowResidentialFields] = useState(false);
//   // Add this useEffect after your existing useEffects
// const [showBuiltupArea, setShowBuiltupArea] = useState(true);

// useEffect(() => {
//   if (formData.propertyType) {
//     const selectedType = propertyTypes.find(type => type.property_type_id === formData.propertyType);
//     if (selectedType) {
//       const typeName = selectedType.name.toLowerCase();
      
//       // Show residential fields for residential property types
//       const shouldShowResidential = typeName.includes('flat') || typeName.includes('villa') ||
//         typeName.includes('apartment') || typeName.includes('house');
//       setShowResidentialFields(shouldShowResidential);
      
//       // Hide built-up area for plot types
//       const shouldShowBuiltupArea = !typeName.includes('plot');
//       setShowBuiltupArea(shouldShowBuiltupArea);
//     }
//   }
// }, [formData.propertyType, propertyTypes]);

//   useEffect(() => {
//     if (formData.propertyType) {
//       const selectedType = propertyTypes.find(type => type.property_type_id === formData.propertyType);
//       if (selectedType) {
//         const typeName = selectedType.name.toLowerCase();
//         const shouldShow = typeName.includes('flat') || typeName.includes('villa') ||
//           typeName.includes('apartment') || typeName.includes('house');
//         setShowResidentialFields(shouldShow);
//       }
//     }
//   }, [formData.propertyType, propertyTypes]);

//   // Fetch initial data
//   useEffect(() => {
//     const fetchData = async () => {
//     try {
//       const [categoriesRes, amenitiesRes] = await Promise.all([
//         axios.get(`${baseurl}/property-categories/`),
//         axios.get(`${baseurl}/amenities/`)
//       ]);
//       setPropertyCategories(categoriesRes.data);
      
//       // Convert amenity IDs to numbers
//       const formattedAmenities = amenitiesRes.data.map(amenity => ({
//         ...amenity,
//         amenity_id: parseInt(amenity.amenity_id)
//       }));
//       setAmenities(formattedAmenities);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (formData.category) {
//       console.log('Fetching property types for category:', formData.category);
//       axios
//         .get(`${baseurl}/property-types/category-id/${formData.category}/`)
//         .then((response) => {
//           console.log('Fetched property types:', response.data);
//           setPropertyTypes(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching property types:', error);
//         });
//     }
//   }, [formData.category]);

//   useEffect(() => {
//     if (formData.lookingTo === 'sell') {
//       const price = parseFloat(formData.price) || 0;
//       const commission = parseFloat(formData.agent_commission) || 0;
//       const total = price + commission;
//       setFormData(prev => ({
//         ...prev,
//         total_property_value: total
//       }));
//     }
//   }, [formData.price, formData.agent_commission, formData.lookingTo]);

//   const validateDescription = (value) => {
//     // Regex: Must contain at least one letter and one number
//     const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
//     return regex.test(value);
//   };

//  const handleChange = (e) => {
//   const { name, value, type, checked } = e.target;
//   const newValue = type === 'checkbox' ? checked : value;

//   setFormData((prev) => {
//     const updated = { ...prev, [name]: newValue };

//     // Auto-calculate price when pricePerUnit or plotArea changes
//     if (name === "pricePerUnit" || name === "plotArea") {
//       const pricePerUnit = parseFloat(updated.pricePerUnit) || 0;
//       const plotArea = parseFloat(updated.plotArea) || 0;
//       updated.price = pricePerUnit * plotArea;
//     }

//     return updated;
//   });

//   // Validate description
//   if (name === "description") {
//     setErrors((prev) => ({
//       ...prev,
//       description: !validateDescription(value),
//     }));
//   }
// };


//   const handleFileUpload = async (e, type) => {
//     const files = e.target.files;
//     if (!files.length) return;

//     const newFiles = Array.from(files).map(file => ({
//       name: file.name,
//       type: file.type,
//       size: file.size,
//       file // Store the actual file object for later upload
//     }));

//     setFormData(prev => ({
//       ...prev,
//       [type]: [...prev[type], ...newFiles]
//     }));
//   };

//   const removeFile = (index, type) => {
//     setFormData(prev => ({
//       ...prev,
//       [type]: prev[type].filter((_, i) => i !== index)
//     }));
//   };

//  const handleAmenityChange = (amenityId) => {
//   setFormData(prev => {
//     const numericId = parseInt(amenityId);
//     const newAmenities = prev.amenities.includes(numericId)
//       ? prev.amenities.filter(id => id !== numericId)
//       : [...prev.amenities, numericId];
//     return { ...prev, amenities: newAmenities };
//   });
// };

//   // Add these handler functions:
//   const handleAgreementVideoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         agreement_video: {
//           name: file.name,
//           type: file.type,
//           size: file.size,
//           file: file
//         }
//       }));
//     }
//   };

//   const handleAgreementFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         agreement_file: {
//           name: file.name,
//           type: file.type,
//           size: file.size,
//           file: file
//         }
//       }));
//     }
//   };

//   const removeAgreementVideo = () => {
//     setFormData(prev => ({
//       ...prev,
//       agreement_video: null
//     }));
//   };

//   const removeAgreementFile = () => {
//     setFormData(prev => ({
//       ...prev,
//       agreement_file: null
//     }));
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);

//     try {
//       // Convert Area to sq.ft based on selected unit
//       // let plotAreaSqft = parseFloat(formData.plotArea) || 0;
//       // switch (formData.areaUnit) {
//       //   case 'sq.m.': plotAreaSqft *= 10.7639; break;
//       //   case 'acres': plotAreaSqft *= 43560; break;
//       //   case 'hectares': plotAreaSqft *= 107639; break;
//       //   default: break; // Already in sq.ft
//       // }

//       // Prepare form data for API
//       const payload = new FormData();
//       const userId = localStorage.getItem("user_id");

//       // Append all basic fields
//       const formFields = {
//         looking_to: formData.lookingTo,
//         property_title: formData.propertyTitle,
//         description: formData.description,
//         address: formData.address,
//         city: formData.city,
//         state: formData.state,
//         country: formData.country,
//         pin_code: formData.pinCode,
//         latitude: formData.latitude || '12.120000',
//         longitude: formData.longitude || '12.120000',
//          area: formData.plotArea,
//         // area: plotAreaSqft.toFixed(2),
//         area_unit: formData.areaUnit,
//         price_per_unit: formData.pricePerUnit || '0.00',
//         builtup_area: formData.builtupArea || '0.00',
//         length_ft: formData.length || '0.00',
//         breadth_ft: formData.breadth || '0.00',
//         number_of_floors: formData.numberOfFloors,
//         number_of_open_sides: formData.openSides,
//         number_of_roads: formData.numberOfRoads,
//         road_width_1_ft: formData.roadWidth1 || '0.00',
//         road_width_2_ft: formData.roadWidth2 || '0.00',
//         facing: formData.facing,
//         ownership_type: formData.ownershipType,
//         property_value: formData.price,
//         property_uniqueness: formData.propertyUniqueness,
//         location_advantages: formData.locationAdvantages,
//         other_features: formData.otherFeatures,
//         owner_name: formData.ownerName,
//         owner_contact: formData.ownerContact,
//         owner_email: formData.ownerEmail,
//         is_featured: formData.isFeatured,
//         category: formData.category,
//         property_type: formData.propertyType,
//         user_id: userId,
//         referral_id: referralId,
//         number_of_bedrooms: formData.numberOfBedrooms,
//         number_of_balconies: formData.numberOfBalconies,
//         number_of_bathrooms: formData.numberOfBathrooms,
//         floor: formData.floor,
//         furnishing_status: formData.furnishing_status,
//         agent_commission: formData.agent_commission,
//         total_property_value: Number(formData.price) + Number(formData.agent_commission),
//         username: username,
//         preferred_tenants: formData.preferred_tenants,
//         rent_amount: formData.rent_amount,
//         deposit_amount: formData.deposit_amount,
//         available_from: formData.available_from,
//       };
//  console.log(typeof amenities); 
//       // Log the payload for debugging
//       console.log('Form payload:', formFields);

//       // Append fields to FormData
//       Object.entries(formFields).forEach(([key, value]) => {
//         if (value !== null && value !== undefined) {
//           payload.append(key, value);
//         }
//       });

//  // With this dynamic version:
// if (formData.amenities && formData.amenities.length > 0) {
//   formData.amenities.forEach((id) => {
//     payload.append("amenities", id.toString()); // Ensure it's string for FormData
//   });
// }

//       // Append files
//       formData.images.forEach((img) => {
//         if (img.file) {
//           payload.append('images', img.file, img.name);
//         }
//       });

//       formData.videos.forEach((vid) => {
//         if (vid.file) {
//           payload.append('videos', vid.file, vid.name);
//         }
//       });

//       // Add this section for files
//       formData.files.forEach((doc) => {
//         if (doc.file) {
//           payload.append('files', doc.file, doc.name);
//         }
//       });

//       // In the handleSubmit function, add these before the payload.append files section:
//       if (formData.agreement_video?.file) {
//         payload.append('agreement_video', formData.agreement_video.file, formData.agreement_video.name);
//       }

//       if (formData.agreement_file?.file) {
//         payload.append('agreement_file', formData.agreement_file.file, formData.agreement_file.name);
//       }

//       // Debug: Log FormData contents
//       for (let pair of payload.entries()) {
//         console.log(pair[0] + ', ' + pair[1]);
//       }

//       // Submit to API
//       const response = await axios.post(`${baseurl}/property/`, payload, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       console.log('Submission successful:', response.data);
//      Swal.fire('Success', 'Property Added Successfully!', 'success');
//       navigate("/p-myassets");

//       // Optionally reset form or redirect here
//     } catch (error) {
//       console.error('Detailed submission error:', {
//         message: error.message,
//         response: error.response?.data,
//         config: error.config
//       });

//       let errorMessage = 'Error submitting property';
//       if (error.response) {
//         // Handle specific backend validation errors
//         if (error.response.data) {
//           errorMessage += `: ${JSON.stringify(error.response.data)}`;
//         } else {
//           errorMessage += `: ${error.response.statusText}`;
//         }
//       } else {
//         errorMessage += `: ${error.message}`;
//       }
//       Swal.fire('Error', 'An error occurred while updating.', 'error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const validateStep = (step) => {
//     // Always return true to allow navigation without validation
//     return true;
//   };

//   const renderStepContent = () => {
//     switch (activeStep) {
//       case 0: return (
//         <Grid container spacing={3} sx={{ mt: 2 }}>
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Looking To</InputLabel>
//               <Select
//                 name="lookingTo"
//                 value={formData.lookingTo}
//                 onChange={handleChange}
//                 label="Looking To"
//               >
//                 <MenuItem value="sell">Sell</MenuItem>
//                 <MenuItem value="rent">Rent</MenuItem>
//                 {/* <MenuItem value="lease">Lease</MenuItem> */}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Property Category</InputLabel>
//               <Select
//                 name="category"
//                 value={formData.category || ''}
//                 onChange={(e) => {
//                   const selectedId = e.target.value;
//                   setFormData((prev) => ({
//                     ...prev,
//                     category: selectedId,
//                     propertyType: '', // reset propertyType when category changes
//                   }));
//                 }}
//                 label="Property Category"
//               >
//                 {propertyCategories.map((category) => (
//                   <MenuItem key={category.property_category_id} value={category.property_category_id}>
//                     {category.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Property Type</InputLabel>
//               <Select
//                 name="propertyType"
//                 value={formData.propertyType || ''}
//                 onChange={(e) => {
//                   const selectedId = e.target.value;
//                   setFormData((prev) => ({
//                     ...prev,
//                     propertyType: selectedId,
//                   }));
//                 }}
//                 label="Property Type"
//                 disabled={!formData.category}
//                 displayEmpty
//               >
//                 <MenuItem value="" disabled></MenuItem>
//                 {propertyTypes.map((type) => (
//                   <MenuItem key={type.property_type_id} value={type.property_type_id}>
//                     {type.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//           </Grid>

//           {/* <Grid item xs={12} sm={6}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Property Type</InputLabel>
//               <Select
//                 value={propertyType}
//                 onChange={(e) => setPropertyType(e.target.value)}
//                 label="Property Type"
//                 disabled={!propertyCategory} // optional: disable if no category is selected
//               >
//                 {propertyTypes.map((type) => (
//                   <MenuItem key={type.property_type_id} value={type.name}>
//                     {type.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid> */}

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Property Title"
//               name="propertyTitle"
//               value={formData.propertyTitle}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               multiline
//               rows={4}
//               label="Description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             //  error={errors.description}
//             //  helperText={
//             //    errors.description 
//             //      ? "Description must contain both letters and numbers." 
//             //      : ""
//             //  }
//             />
//           </Grid>
//         </Grid>
//       );

//       case 1: return (
//         <Grid container spacing={3} sx={{ mt: 2 }}>
         
//          <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Country"
//                   value={formData.country}
//                   onChange={(e) => {
//                     setFormData({
//                       ...formData,
//                       country: e.target.value,
//                       state: "",
//                       city: "",
//                     });
//                   }}
//                 >
//                   {countries.map((country) => (
//                     <MenuItem key={country.isoCode} value={country.isoCode}>
//                       {country.name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
        
//               {/* State Dropdown */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="State"
//                   value={formData.state}
//                   onChange={(e) => {
//                     setFormData({
//                       ...formData,
//                       state: e.target.value,
//                       city: "",
//                     });
//                   }}
//                   disabled={!formData.country}
//                 >
//                   {states.map((state) => (
//                     <MenuItem key={state.isoCode} value={state.isoCode}>
//                       {state.name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
        
//               {/* City Dropdown */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="City"
//                   value={formData.city}
//                   onChange={(e) => {
//                     setFormData({
//                       ...formData,
//                       city: e.target.value,
//                     });
//                   }}
//                   disabled={!formData.state}
//                 >
//                   {cities.map((city) => (
//                     <MenuItem key={city.name} value={city.name}>
//                       {city.name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Pin Code"
//               name="pinCode"
//               value={formData.pinCode}
//               onChange={handleChange}
//             />
//           </Grid>

//            <Grid item xs={12}>
//             <TextField
//               fullWidth
//               multiline
//               rows={2}
//               label="Full Address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//             />
//           </Grid>

//           {/* <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Latitude"
//               name="latitude"
//               type="number"
//               value={formData.latitude}
//               onChange={handleChange}
//               placeholder="12.120000"
//             />
//           </Grid> */}

//           {/* <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Longitude"
//               name="longitude"
//               type="number"
//               value={formData.longitude}
//               onChange={handleChange}
//               placeholder="12.120000"
//             />
//           </Grid> */}
//         </Grid>
//       );

//       case 2: return (
//         <Grid container spacing={3} sx={{ mt: 2 }}>
//           {showResidentialFields && (
//             <>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Number of Floors"
//                   name="numberOfFloors"
//                   type="number"
//                   value={formData.numberOfFloors}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Number of Bedrooms"
//                   name="numberOfBedrooms"
//                   type="number"
//                   value={formData.numberOfBedrooms}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Number of Balconies"
//                   name="numberOfBalconies"
//                   type="number"
//                   value={formData.numberOfBalconies}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Number of Bathrooms"
//                   name="numberOfBathrooms"
//                   type="number"
//                   value={formData.numberOfBathrooms}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Floor"
//                   name="floor"
//                   type="number"
//                   value={formData.floor}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Furnishing Status</InputLabel>
//                   {/* <Select
//                                   name="furnishing_status"
//                                   value={formData.furnishing_status}
//                                   onChange={handleChange}
//                                   label="furnishing status"
//                                 >
//                                   <MenuItem value="semi furnished">Semi Furnished</MenuItem>
//                                   <MenuItem value="fully furnished">Fully Furnished</MenuItem>
//                                 </Select> */}
//                   <Select
//                     name="furnishing_status"
//                     value={formData.furnishing_status}
//                     onChange={handleChange}
//                     label="Furnishing Status"
//                   >
//                     <MenuItem value="Semi-Furnished">Semi-Furnished</MenuItem>
//                     <MenuItem value="Fully-Furnished">Fully-Furnished</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </>
//           )}
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Area Unit</InputLabel>
//               <Select
//                 name="areaUnit"
//                 value={formData.areaUnit}
//                 onChange={handleChange}
//                 label="Area Unit"
//               >
//                 <MenuItem value="sq.ft.">Square Feet</MenuItem>
//                                <MenuItem value="sq.m.">Square Meters</MenuItem>
//                                <MenuItem value="sq.yd.">Square Yards</MenuItem>
//                                <MenuItem value="acres">Acres</MenuItem>
//                                <MenuItem value="hectares">Hectares</MenuItem>
//                                 <MenuItem value="cents">Cents</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//             <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="Area"
//                         name="plotArea"
//                         type="number"
//                         value={formData.plotArea}
//                         onChange={handleChange}
//                       />
//                     </Grid>
          
//                      <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="Price Per Unit"
//                         name="pricePerUnit"
//                         type="number"
//                         value={formData.pricePerUnit}
//                         onChange={handleChange}
//                       />
//                     </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Length (ft)"
//               name="length"
//               type="number"
//               value={formData.length}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Breadth (ft)"
//               name="breadth"
//               type="number"
//               value={formData.breadth}
//               onChange={handleChange}
//             />
//           </Grid>

          
//       {showBuiltupArea && (  // ✅ CORRECT - wraps entire Grid
//   <Grid item xs={12} sm={6}>
//     <TextField
//       fullWidth
//       label="Built-up Area"
//       name="builtupArea"
//       type="number"
//       value={formData.builtupArea}
//       onChange={handleChange}
//     />
//   </Grid>
// )}

//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Facing Direction</InputLabel>
//               <Select
//                 name="facing"
//                 value={formData.facing}
//                 onChange={handleChange}
//                 label="Facing Direction"
//               >
//                 <MenuItem value="east">East</MenuItem>
//                 <MenuItem value="west">West</MenuItem>
//                 <MenuItem value="north">North</MenuItem>
//                 <MenuItem value="south">South</MenuItem>
//                 <MenuItem value="north-east">North-East</MenuItem>
//                 <MenuItem value="north-west">North-West</MenuItem>
//                 <MenuItem value="south-east">South-East</MenuItem>
//                 <MenuItem value="south-west">South-West</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Ownership Type</InputLabel>
//               <Select
//                 name="ownershipType"
//                 value={formData.ownershipType}
//                 onChange={handleChange}
//                 label="Ownership Type"
//               >
//                 <MenuItem value="Freehold">Freehold</MenuItem>
//                 <MenuItem value="Leasehold">Leasehold</MenuItem>
//                 <MenuItem value="Cooperative">Cooperative</MenuItem>
//                 <MenuItem value="Condominium">Condominium</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Number of Open Sides"
//               name="openSides"
//               type="number"
//               value={formData.openSides}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Number of Roads"
//               name="numberOfRoads"
//               type="number"
//               value={formData.numberOfRoads}
//               onChange={handleChange}
//             />
//           </Grid>

//           {formData.numberOfRoads >= 1 && (
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Road 1 Width (ft)"
//                 name="roadWidth1"
//                 type="number"
//                 value={formData.roadWidth1}
//                 onChange={handleChange}
//               />
//             </Grid>
//           )}

//           {formData.numberOfRoads >= 2 && (
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Road 2 Width (ft)"
//                 name="roadWidth2"
//                 type="number"
//                 value={formData.roadWidth2}
//                 onChange={handleChange}
//               />
//             </Grid>
//           )}

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Property Uniqueness"
//               name="propertyUniqueness"
//               value={formData.propertyUniqueness}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               multiline
//               rows={3}
//               label="Location Advantages"
//               name="locationAdvantages"
//               value={formData.locationAdvantages}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               multiline
//               rows={3}
//               label="Other Features"
//               name="otherFeatures"
//               value={formData.otherFeatures}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>Amenities</Typography>
//             <FormGroup row>
//               {amenities.map(amenity => (
//                 <FormControlLabel
//                   key={amenity.amenity_id}
//                   control={
//                     <Checkbox
//                       checked={formData.amenities.includes(amenity.amenity_id)}
//                       onChange={() => handleAmenityChange(amenity.amenity_id)}
//                     />
//                   }
//                   label={amenity.name}
//                 />
//               ))}
//             </FormGroup>
//           </Grid>
//         </Grid>
//       );

//       case 3: return (
//         <Grid container spacing={3} sx={{ mt: 2 }}>
//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>Upload Images</Typography>
//             <Button
//               component="label"
//               variant="contained"
//               startIcon={<UploadFileIcon />}
//               sx={{ mb: 2 }}
//             >
//               Upload Property Images
//               <VisuallyHiddenInput
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={(e) => handleFileUpload(e, 'images')}
//               />
//             </Button>

//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               {formData.images.map((img, index) => (
//                 <Chip
//                   key={index}
//                   label={img.name}
//                   onDelete={() => removeFile(index, 'images')}
//                   sx={{ m: 0.5 }}
//                 />
//               ))}
//             </Box>
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>Upload Videos</Typography>
//             <Button
//               component="label"
//               variant="contained"
//               startIcon={<UploadFileIcon />}
//               sx={{ mb: 2 }}
//             >
//               Upload Property Videos
//               <VisuallyHiddenInput
//                 type="file"
//                 accept="video/*"
//                 multiple
//                 onChange={(e) => handleFileUpload(e, 'videos')}
//               />
//             </Button>

//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               {formData.videos.map((vid, index) => (
//                 <Chip
//                   key={index}
//                   label={vid.name}
//                   onDelete={() => removeFile(index, 'videos')}
//                   sx={{ m: 0.5 }}
//                 />
//               ))}
//             </Box>
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>Upload Documents</Typography>
//             <Button
//               component="label"
//               variant="contained"
//               startIcon={<UploadFileIcon />}
//               sx={{ mb: 2 }}
//             >
//               Upload Property Documents
//               <VisuallyHiddenInput
//                 type="file"
//                 accept=".pdf,.doc,.docx,.xls,.xlsx,.txt" // Specify accepted document types
//                 multiple
//                 onChange={(e) => handleFileUpload(e, 'files')}
//               />
//             </Button>

//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               {formData.files.map((doc, index) => (
//                 <Chip
//                   key={index}
//                   label={doc.name}
//                   onDelete={() => removeFile(index, 'files')}
//                   sx={{ m: 0.5 }}
//                 />
//               ))}
//             </Box>
//           </Grid>
//           {/* <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>Agreement Video</Typography>
//             <Button
//               component="label"
//               variant="contained"
//               startIcon={<UploadFileIcon />}
//               sx={{ mb: 2 }}
//             >
//               Upload Agreement Video
//               <VisuallyHiddenInput
//                 type="file"
//                 accept="video/*"
//                 onChange={handleAgreementVideoUpload}
//               />
//             </Button>

//             {formData.agreement_video && (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Chip
//                   label={formData.agreement_video.name}
//                   onDelete={removeAgreementVideo}
//                   sx={{ m: 0.5 }}
//                 />
//               </Box>
//             )}
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>Agreement Document</Typography>
//             <Button
//               component="label"
//               variant="contained"
//               startIcon={<UploadFileIcon />}
//               sx={{ mb: 2 }}
//             >
//               Upload Agreement Document
//               <VisuallyHiddenInput
//                 type="file"
//                 accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
//                 onChange={handleAgreementFileUpload}
//               />
//             </Button>

//             {formData.agreement_file && (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Chip
//                   label={formData.agreement_file.name}
//                   onDelete={removeAgreementFile}
//                   sx={{ m: 0.5 }}
//                 />
//               </Box>
//             )}
//           </Grid> */}

//         </Grid>
//       );

//       // case 4: return (
//       //   <Grid container spacing={3} sx={{ mt: 2 }}>
//       //     <Grid item xs={12} sm={6}>
//       //       <TextField
//       //         fullWidth
//       //         label="Property Value"
//       //         name="price"
//       //         type="number"
//       //         value={formData.price}
//       //         onChange={handleChange}
//       //       />
//       //     </Grid>

//       //     <Grid item xs={12} sm={6}>
//       //       <TextField
//       //         fullWidth
//       //         label="Agent Commission"
//       //         name="agent_commission"
//       //         type="number"
//       //         value={formData.agent_commission}
//       //         onChange={handleChange}
//       //       />
//       //     </Grid>
//       //     <Grid item xs={12} sm={6}>
//       //       <TextField
//       //         fullWidth
//       //         label="Owner Name"
//       //         name="ownerName"
//       //         value={formData.ownerName}
//       //         onChange={handleChange}
//       //       />
//       //     </Grid>

//       //     <Grid item xs={12} sm={6}>
//       //       <TextField
//       //         fullWidth
//       //         label="Owner Contact"
//       //         name="ownerContact"
//       //         value={formData.ownerContact}
//       //         onChange={handleChange}
//       //       />
//       //     </Grid>

//       //     <Grid item xs={12} sm={6}>
//       //       <TextField
//       //         fullWidth
//       //         label="Owner Email"
//       //         name="ownerEmail"
//       //         type="email"
//       //         value={formData.ownerEmail}
//       //         onChange={handleChange}
//       //       />
//       //     </Grid>
//       //   </Grid>
//       // );

//       case 4: return (
//         <Grid container spacing={3} sx={{ mt: 2 }}>
//           {formData.lookingTo === 'sell' ? (
//             <>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Property Value"
//                   name="price"
//                   type="number"
//                   value={formData.price}
//                   // onChange={handleChange}
//                    InputProps={{ readOnly: true }}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Team Payout"
//                   name="agent_commission"
//                   type="number"
//                   value={formData.agent_commission}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Total Property Value"
//                   name="total_property_value"
//                   type="number"
//                   value={formData.total_property_value || ''}
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                 />
//               </Grid>
//             </>
//           ) : (
//             <>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Preferred Tenants"
//                   name="preferred_tenants"
//                   value={formData.preferred_tenants || ''}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Rent Amount"
//                   name="rent_amount"
//                   type="number"
//                   value={formData.rent_amount || ''}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Deposit Amount"
//                   name="deposit_amount"
//                   type="number"
//                   value={formData.deposit_amount || ''}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Available From"
//                   name="available_from"
//                   value={formData.available_from || ''}
//                   onChange={handleChange}
//                 />
//               </Grid>
//             </>
//           )}

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Owner Name"
//               name="ownerName"
//               value={formData.ownerName}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Owner Contact"
//               name="ownerContact"
//               value={formData.ownerContact}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Owner Email"
//               name="ownerEmail"
//               type="email"
//               value={formData.ownerEmail}
//               onChange={handleChange}
//             />
//           </Grid>
//         </Grid>
//       );


//       default: return null;
//     }
//   };

//   return (
//     <>
//       <PartnerHeader />
//       <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, }}>
//         <Typography variant="h4" gutterBottom>Add New Property</Typography>

//         <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>

//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             width: { xs: '100%', sm: '100%', md: '80%' }
//           }}>
//           {renderStepContent()}

//           <Box display="flex" justifyContent="space-between" mt={3}>
//             <Button
//               disabled={activeStep === 0}
//               onClick={() => setActiveStep(prev => prev - 1)}
//               variant="outlined"
//             >
//               Back
//             </Button>

//             {activeStep === steps.length - 1 ? (
//               <Button
//                 variant="contained"
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Submitting...' : 'Submit Property'}
//               </Button>
//             ) : (
//               <Button
//                 variant="contained"
//                 onClick={() => setActiveStep(prev => prev + 1)}
//                 // Removed the disabled prop - Next button is always enabled
//               >
//                 Next
//               </Button>
//             )}
//           </Box>
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default AssetForm;



import React, { useState, useEffect } from 'react';
import { Country, State, City } from "country-state-city";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Input,
  Chip
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { baseurl } from '../../../BaseURL/BaseURL';

const steps = [
  'Basic Details',
  'Location Details',
  'Property Profile',
  'Media Upload',
  'Pricing & Ownership'
];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AssetForm = () => {  
  const [activeStep, setActiveStep] = useState(0);
  const [propertyCategories, setPropertyCategories] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const referralId = localStorage.getItem('referral_id');
  const userId = localStorage.getItem('user_id');
  const username = localStorage.getItem('user_name');

  // Error States
  const [errors, setErrors] = useState({
    // Step 0 errors
    propertyTitle: false,
    category: false,
    propertyType: false,
    
    // Step 1 errors
    address: false,
    city: false,
    state: false,
    country: false,
    pinCode: false,
    
    // Step 2 errors
    plotArea: false,
    pricePerUnit: false,
    length: false,
    breadth: false,
    builtupArea: false,
    facing: false,
    ownershipType: false,
    numberOfRoads: false,
    openSides: false,
    areaUnit: false,
    
    // Step 4 errors
    price: false,
    total_property_value: false,
    ownerName: false,
    ownerContact: false,
    rent_amount: false,
  });

  // Form State
  const [formData, setFormData] = useState({
    lookingTo: 'sell',
    category: '',
    propertyType: '',
    propertyTitle: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pinCode: '',
    latitude: '',
    longitude: '',
    plotArea: '',
    pricePerUnit: '',
    areaUnit: 'sq.ft.',
    length: '',
    breadth: '',
    numberOfFloors: 1,
    numberOfBedrooms: '',
    numberOfBalconies: '',
    numberOfBathrooms: '',
    floor: "",
    furnishing_status: "",
    openSides: 0,
    builtupArea: '',
    numberOfRoads: 0,
    roadWidth1: null,
    roadWidth2: null,
    facing: 'east',
    ownershipType: 'Freehold',
    price: '',
    maintenance: '',
    amenities: [],
    propertyUniqueness: '',
    locationAdvantages: '',
    otherFeatures: '',
    ownerName: '',
    ownerContact: '',
    ownerEmail: '',
    isFeatured: false,
    images: [],
    videos: [],
    userId: userId,
    agent_commission: "",
    files: [],
    preferred_tenants: '',
    rent_amount: '',
    deposit_amount: '',
    available_from: '',
    agreement_video: null,
    agreement_file: null,
  });

  const countries = Country.getAllCountries();
  const states = formData.country
    ? State.getStatesOfCountry(formData.country)
    : [];
  const cities = formData.state
    ? City.getCitiesOfState(formData.country, formData.state)
    : [];

  const [showResidentialFields, setShowResidentialFields] = useState(false);
  const [showBuiltupArea, setShowBuiltupArea] = useState(true);

  useEffect(() => {
    if (formData.propertyType) {
      const selectedType = propertyTypes.find(type => type.property_type_id === formData.propertyType);
      if (selectedType) {
        const typeName = selectedType.name.toLowerCase();
        
        // Show residential fields for residential property types
        const shouldShowResidential = typeName.includes('flat') || typeName.includes('villa') ||
          typeName.includes('apartment') || typeName.includes('house');
        setShowResidentialFields(shouldShowResidential);
        
        // Hide built-up area for plot types
        const shouldShowBuiltupArea = !typeName.includes('plot');
        setShowBuiltupArea(shouldShowBuiltupArea);
      }
    }
  }, [formData.propertyType, propertyTypes]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, amenitiesRes] = await Promise.all([
          axios.get(`${baseurl}/property-categories/`),
          axios.get(`${baseurl}/amenities/`)
        ]);
        setPropertyCategories(categoriesRes.data);
        
        const formattedAmenities = amenitiesRes.data.map(amenity => ({
          ...amenity,
          amenity_id: parseInt(amenity.amenity_id)
        }));
        setAmenities(formattedAmenities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.category) {
      axios
        .get(`${baseurl}/property-types/category-id/${formData.category}/`)
        .then((response) => {
          setPropertyTypes(response.data);
        })
        .catch((error) => {
          console.error('Error fetching property types:', error);
        });
    }
  }, [formData.category]);

  useEffect(() => {
    if (formData.lookingTo === 'sell') {
      const price = parseFloat(formData.price) || 0;
      const commission = parseFloat(formData.agent_commission) || 0;
      const total = price + commission;
      setFormData(prev => ({
        ...prev,
        total_property_value: total
      }));
    }
  }, [formData.price, formData.agent_commission, formData.lookingTo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };

      // Auto-calculate price when pricePerUnit or plotArea changes
      if (name === "pricePerUnit" || name === "plotArea") {
        const pricePerUnit = parseFloat(updated.pricePerUnit) || 0;
        const plotArea = parseFloat(updated.plotArea) || 0;
        updated.price = pricePerUnit * plotArea;
      }

      // Calculate total property value for sell
      if (formData.lookingTo === 'sell') {
        const price = parseFloat(updated.price) || 0;
        const commission = parseFloat(updated.agent_commission) || 0;
        updated.total_property_value = price + commission;
      }

      return updated;
    });
  };

  const handleFileUpload = async (e, type) => {
    const files = e.target.files;
    if (!files.length) return;

    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      file
    }));

    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ...newFiles]
    }));
  };

  const removeFile = (index, type) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleAmenityChange = (amenityId) => {
    setFormData(prev => {
      const numericId = parseInt(amenityId);
      const newAmenities = prev.amenities.includes(numericId)
        ? prev.amenities.filter(id => id !== numericId)
        : [...prev.amenities, numericId];
      return { ...prev, amenities: newAmenities };
    });
  };

  const handleAgreementVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        agreement_video: {
          name: file.name,
          type: file.type,
          size: file.size,
          file: file
        }
      }));
    }
  };

  const handleAgreementFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        agreement_file: {
          name: file.name,
          type: file.type,
          size: file.size,
          file: file
        }
      }));
    }
  };

  const removeAgreementVideo = () => {
    setFormData(prev => ({
      ...prev,
      agreement_video: null
    }));
  };

  const removeAgreementFile = () => {
    setFormData(prev => ({
      ...prev,
      agreement_file: null
    }));
  };

  // Validation Functions
  const validateStep0 = () => {
    const newErrors = {};
    
    if (!formData.propertyTitle?.trim()) newErrors.propertyTitle = true;
    if (!formData.category) newErrors.category = true;
    if (!formData.propertyType) newErrors.propertyType = true;
    // Description is optional - no validation needed
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.address?.trim()) newErrors.address = true;
    if (!formData.city?.trim()) newErrors.city = true;
    if (!formData.state?.trim()) newErrors.state = true;
    if (!formData.country?.trim()) newErrors.country = true;
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    // Area Unit validation
    if (!formData.areaUnit?.trim()) newErrors.areaUnit = true;
    
    // Area validation
    if (!formData.plotArea || formData.plotArea <= 0) newErrors.plotArea = true;
    
    // Price Per Unit validation
    if (!formData.pricePerUnit || formData.pricePerUnit <= 0) newErrors.pricePerUnit = true;
    
    // Length validation
    if (!formData.length || formData.length <= 0) newErrors.length = true;
    
    // Breadth validation
    if (!formData.breadth || formData.breadth <= 0) newErrors.breadth = true;
    
    // Built-up Area validation (only if shown)
    if (showBuiltupArea && (!formData.builtupArea || formData.builtupArea <= 0)) {
      newErrors.builtupArea = true;
    }
    
    // Facing Direction validation
    if (!formData.facing?.trim()) newErrors.facing = true;
    
    // Ownership Type validation
    if (!formData.ownershipType?.trim()) newErrors.ownershipType = true;
    
    // Number of Roads validation
    if (formData.numberOfRoads === null || formData.numberOfRoads === undefined || formData.numberOfRoads < 0) {
      newErrors.numberOfRoads = true;
    }
    
    // Number of Open Sides validation
    if (formData.openSides === null || formData.openSides === undefined || formData.openSides < 0) {
      newErrors.openSides = true;
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    if (formData.images.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Required Field',
        text: 'Please upload at least one property image',
        confirmButtonColor: '#3085d6',
      });
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    const newErrors = {};
    
    if (formData.lookingTo === 'sell') {
      // Property Value validation for sell
      if (!formData.price || formData.price <= 0) newErrors.price = true;
      
      // Total Property Value validation
      if (!formData.total_property_value || formData.total_property_value <= 0) newErrors.total_property_value = true;
    } else {
      // Rent Amount validation for rent
      if (!formData.rent_amount || formData.rent_amount <= 0) newErrors.rent_amount = true;
    }
    
    // Owner Name validation
    if (!formData.ownerName?.trim()) newErrors.ownerName = true;
    
    // Owner Contact validation
    if (!formData.ownerContact?.trim()) newErrors.ownerContact = true;
    
    // Owner Email is optional - no validation needed
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = true;
    
    switch (activeStep) {
      case 0:
        isValid = validateStep0();
        break;
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        break;
      default:
        isValid = true;
    }
    
    if (isValid) {
      setActiveStep(prev => prev + 1);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill all required fields correctly',
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleSubmit = async () => {
    // Validate all steps before submission
    const stepValidations = [
      validateStep0(),
      validateStep1(),
      validateStep2(),
      validateStep3(),
      validateStep4()
    ];
    
    if (stepValidations.some(valid => !valid)) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please complete all required fields in all steps',
        confirmButtonColor: '#d33',
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const payload = new FormData();

      const formFields = {
        looking_to: formData.lookingTo,
        property_title: formData.propertyTitle,
        description: formData.description || '',
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pin_code: formData.pinCode,
        latitude: formData.latitude || '12.120000',
        longitude: formData.longitude || '12.120000',
        area: formData.plotArea,
        area_unit: formData.areaUnit,
        price_per_unit: formData.pricePerUnit || '0.00',
        builtup_area: formData.builtupArea || '0.00',
        length_ft: formData.length || '0.00',
        breadth_ft: formData.breadth || '0.00',
        number_of_floors: formData.numberOfFloors,
        number_of_open_sides: formData.openSides,
        number_of_roads: formData.numberOfRoads,
        road_width_1_ft: formData.roadWidth1 || '0.00',
        road_width_2_ft: formData.roadWidth2 || '0.00',
        facing: formData.facing,
        ownership_type: formData.ownershipType,
        property_value: formData.price,
        property_uniqueness: formData.propertyUniqueness || '',
        location_advantages: formData.locationAdvantages || '',
        other_features: formData.otherFeatures || '',
        owner_name: formData.ownerName,
        owner_contact: formData.ownerContact,
        owner_email: formData.ownerEmail || '',
        is_featured: formData.isFeatured,
        category: formData.category,
        property_type: formData.propertyType,
        user_id: userId,
        referral_id: referralId,
        number_of_bedrooms: formData.numberOfBedrooms || 0,
        number_of_balconies: formData.numberOfBalconies || 0,
        number_of_bathrooms: formData.numberOfBathrooms || 0,
        floor: formData.floor || 0,
        furnishing_status: formData.furnishing_status || '',
        agent_commission: formData.agent_commission || '0.00',
        total_property_value: formData.total_property_value,
        username: username,
        preferred_tenants: formData.preferred_tenants || '',
        rent_amount: formData.rent_amount || '0.00',
        deposit_amount: formData.deposit_amount || '0.00',
        available_from: formData.available_from || '',
      };

      Object.entries(formFields).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });

      if (formData.amenities && formData.amenities.length > 0) {
        formData.amenities.forEach((id) => {
          payload.append("amenities", id.toString());
        });
      }

      formData.images.forEach((img) => {
        if (img.file) {
          payload.append('images', img.file, img.name);
        }
      });

      formData.videos.forEach((vid) => {
        if (vid.file) {
          payload.append('videos', vid.file, vid.name);
        }
      });

      formData.files.forEach((doc) => {
        if (doc.file) {
          payload.append('files', doc.file, doc.name);
        }
      });

      if (formData.agreement_video?.file) {
        payload.append('agreement_video', formData.agreement_video.file, formData.agreement_video.name);
      }

      if (formData.agreement_file?.file) {
        payload.append('agreement_file', formData.agreement_file.file, formData.agreement_file.name);
      }

      const response = await axios.post(`${baseurl}/property/`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Property Added Successfully!',
        confirmButtonColor: '#3085d6',
      });
      navigate("/p-myassets");

    } catch (error) {
      console.error('Detailed submission error:', error);
      
      let errorMessage = 'Error submitting property';
      if (error.response?.data) {
        errorMessage += `: ${JSON.stringify(error.response.data)}`;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0: return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Looking To *</InputLabel>
              <Select
                name="lookingTo"
                value={formData.lookingTo}
                onChange={handleChange}
                label="Looking To *"
              >
                <MenuItem value="sell">Sell</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={errors.category}>
              <InputLabel>Property Category *</InputLabel>
              <Select
                name="category"
                value={formData.category || ''}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    category: selectedId,
                    propertyType: '',
                  }));
                }}
                label="Property Category *"
                required
              >
                {propertyCategories.map((category) => (
                  <MenuItem key={category.property_category_id} value={category.property_category_id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && <Typography color="error" variant="caption">Category is required</Typography>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={errors.propertyType}>
              <InputLabel>Property Type *</InputLabel>
              <Select
                name="propertyType"
                value={formData.propertyType || ''}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    propertyType: selectedId,
                  }));
                }}
                label="Property Type *"
                disabled={!formData.category}
                required
              >
                <MenuItem value="" disabled></MenuItem>
                {propertyTypes.map((type) => (
                  <MenuItem key={type.property_type_id} value={type.property_type_id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.propertyType && <Typography color="error" variant="caption">Property Type is required</Typography>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Property Title "
              name="propertyTitle"
              value={formData.propertyTitle}
              onChange={handleChange}
              error={errors.propertyTitle}
              helperText={errors.propertyTitle ? "Property Title is required" : ""}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      );

      case 1: return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Country "
              value={formData.country}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  country: e.target.value,
                  state: "",
                  city: "",
                });
              }}
              error={errors.country}
              helperText={errors.country ? "Country is required" : ""}
              required
            >
              {countries.map((country) => (
                <MenuItem key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="State "
              value={formData.state}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  state: e.target.value,
                  city: "",
                });
              }}
              disabled={!formData.country}
              error={errors.state}
              helperText={errors.state ? "State is required" : ""}
              required
            >
              {states.map((state) => (
                <MenuItem key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="City "
              value={formData.city}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  city: e.target.value,
                });
              }}
              disabled={!formData.state}
              error={errors.city}
              helperText={errors.city ? "City is required" : ""}
              required
            >
              {cities.map((city) => (
                <MenuItem key={city.name} value={city.name}>
                  {city.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pin Code "
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
           
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Full Address "
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              helperText={errors.address ? "Address is required" : ""}
              required
            />
          </Grid>
        </Grid>
      );

      case 2: return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {showResidentialFields && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Number of Floors"
                  name="numberOfFloors"
                  type="number"
                  value={formData.numberOfFloors}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Number of Bedrooms"
                  name="numberOfBedrooms"
                  type="number"
                  value={formData.numberOfBedrooms}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Number of Balconies"
                  name="numberOfBalconies"
                  type="number"
                  value={formData.numberOfBalconies}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Number of Bathrooms"
                  name="numberOfBathrooms"
                  type="number"
                  value={formData.numberOfBathrooms}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Floor"
                  name="floor"
                  type="number"
                  value={formData.floor}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Furnishing Status</InputLabel>
                  <Select
                    name="furnishing_status"
                    value={formData.furnishing_status}
                    onChange={handleChange}
                    label="Furnishing Status"
                  >
                    <MenuItem value="Semi-Furnished">Semi-Furnished</MenuItem>
                    <MenuItem value="Fully-Furnished">Fully-Furnished</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={errors.areaUnit}>
              <InputLabel>Area Unit *</InputLabel>
              <Select
                name="areaUnit"
                value={formData.areaUnit}
                onChange={handleChange}
                label="Area Unit *"
                required
              >
                <MenuItem value="sq.ft.">Square Feet</MenuItem>
                <MenuItem value="sq.m.">Square Meters</MenuItem>
                <MenuItem value="sq.yd.">Square Yards</MenuItem>
                <MenuItem value="acres">Acres</MenuItem>
                <MenuItem value="hectares">Hectares</MenuItem>
                <MenuItem value="cents">Cents</MenuItem>
              </Select>
              {errors.areaUnit && <Typography color="error" variant="caption">Area Unit is required</Typography>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Area "
              name="plotArea"
              type="number"
              value={formData.plotArea}
              onChange={handleChange}
              error={errors.plotArea}
              helperText={errors.plotArea ? "Area must be greater than 0" : ""}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price Per Unit "
              name="pricePerUnit"
              type="number"
              value={formData.pricePerUnit}
              onChange={handleChange}
              error={errors.pricePerUnit}
              helperText={errors.pricePerUnit ? "Price Per Unit must be greater than 0" : ""}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Length (ft) "
              name="length"
              type="number"
              value={formData.length}
              onChange={handleChange}
              error={errors.length}
              helperText={errors.length ? "Length must be greater than 0" : ""}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Breadth (ft) "
              name="breadth"
              type="number"
              value={formData.breadth}
              onChange={handleChange}
              error={errors.breadth}
              helperText={errors.breadth ? "Breadth must be greater than 0" : ""}
              required
            />
          </Grid>

          {showBuiltupArea && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Built-up Area *"
                name="builtupArea"
                type="number"
                value={formData.builtupArea}
                onChange={handleChange}
                error={errors.builtupArea}
                helperText={errors.builtupArea ? "Built-up Area must be greater than 0" : ""}
                required
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={errors.facing}>
              <InputLabel>Facing Direction *</InputLabel>
              <Select
                name="facing"
                value={formData.facing}
                onChange={handleChange}
                label="Facing Direction *"
                required
              >
                <MenuItem value="east">East</MenuItem>
                <MenuItem value="west">West</MenuItem>
                <MenuItem value="north">North</MenuItem>
                <MenuItem value="south">South</MenuItem>
                <MenuItem value="north-east">North-East</MenuItem>
                <MenuItem value="north-west">North-West</MenuItem>
                <MenuItem value="south-east">South-East</MenuItem>
                <MenuItem value="south-west">South-West</MenuItem>
              </Select>
              {errors.facing && <Typography color="error" variant="caption">Facing Direction is required</Typography>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={errors.ownershipType}>
              <InputLabel>Ownership Type *</InputLabel>
              <Select
                name="ownershipType"
                value={formData.ownershipType}
                onChange={handleChange}
                label="Ownership Type *"
                required
              >
                <MenuItem value="Freehold">Freehold</MenuItem>
                <MenuItem value="Leasehold">Leasehold</MenuItem>
                <MenuItem value="Cooperative">Cooperative</MenuItem>
                <MenuItem value="Condominium">Condominium</MenuItem>
              </Select>
              {errors.ownershipType && <Typography color="error" variant="caption">Ownership Type is required</Typography>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Open Sides "
              name="openSides"
              type="number"
              value={formData.openSides}
              onChange={handleChange}
              error={errors.openSides}
              helperText={errors.openSides ? "Number of Open Sides is required" : ""}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Roads "
              name="numberOfRoads"
              type="number"
              value={formData.numberOfRoads}
              onChange={handleChange}
              error={errors.numberOfRoads}
              helperText={errors.numberOfRoads ? "Number of Roads is required" : ""}
              required
            />
          </Grid>

          {formData.numberOfRoads >= 1 && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Road 1 Width (ft)"
                name="roadWidth1"
                type="number"
                value={formData.roadWidth1}
                onChange={handleChange}
              />
            </Grid>
          )}

          {formData.numberOfRoads >= 2 && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Road 2 Width (ft)"
                name="roadWidth2"
                type="number"
                value={formData.roadWidth2}
                onChange={handleChange}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Property Uniqueness"
              name="propertyUniqueness"
              value={formData.propertyUniqueness}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Location Advantages"
              name="locationAdvantages"
              value={formData.locationAdvantages}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Other Features"
              name="otherFeatures"
              value={formData.otherFeatures}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Amenities</Typography>
            <FormGroup row>
              {amenities.map(amenity => (
                <FormControlLabel
                  key={amenity.amenity_id}
                  control={
                    <Checkbox
                      checked={formData.amenities.includes(amenity.amenity_id)}
                      onChange={() => handleAmenityChange(amenity.amenity_id)}
                    />
                  }
                  label={amenity.name}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>
      );

      case 3: return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Upload Images *</Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<UploadFileIcon />}
              sx={{ mb: 2 }}
            >
              Upload Property Images
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileUpload(e, 'images')}
              />
            </Button>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.images.map((img, index) => (
                <Chip
                  key={index}
                  label={img.name}
                  onDelete={() => removeFile(index, 'images')}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
            {formData.images.length === 0 && (
              <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
                At least one image is required
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Upload Videos</Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<UploadFileIcon />}
              sx={{ mb: 2 }}
            >
              Upload Property Videos
              <VisuallyHiddenInput
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleFileUpload(e, 'videos')}
              />
            </Button>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.videos.map((vid, index) => (
                <Chip
                  key={index}
                  label={vid.name}
                  onDelete={() => removeFile(index, 'videos')}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Upload Documents</Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<UploadFileIcon />}
              sx={{ mb: 2 }}
            >
              Upload Property Documents
              <VisuallyHiddenInput
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                multiple
                onChange={(e) => handleFileUpload(e, 'files')}
              />
            </Button>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.files.map((doc, index) => (
                <Chip
                  key={index}
                  label={doc.name}
                  onDelete={() => removeFile(index, 'files')}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      );

      case 4: return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {formData.lookingTo === 'sell' ? (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Property Value "
                  name="price"
                  type="number"
                  value={formData.price}
                  InputProps={{ readOnly: true }}
                  error={errors.price}
                  helperText={errors.price ? "Property Value must be greater than 0" : ""}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Team Payout"
                  name="agent_commission"
                  type="number"
                  value={formData.agent_commission}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Total Property Value "
                  name="total_property_value"
                  type="number"
                  value={formData.total_property_value || ''}
                  InputProps={{ readOnly: true }}
                  error={errors.total_property_value}
                  helperText={errors.total_property_value ? "Total Property Value must be greater than 0" : ""}
                  required
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preferred Tenants"
                  name="preferred_tenants"
                  value={formData.preferred_tenants || ''}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Rent Amount *"
                  name="rent_amount"
                  type="number"
                  value={formData.rent_amount || ''}
                  onChange={handleChange}
                  error={errors.rent_amount}
                  helperText={errors.rent_amount ? "Rent Amount must be greater than 0" : ""}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Deposit Amount"
                  name="deposit_amount"
                  type="number"
                  value={formData.deposit_amount || ''}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Available From"
                  name="available_from"
                  value={formData.available_from || ''}
                  onChange={handleChange}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Owner Name "
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              error={errors.ownerName}
              helperText={errors.ownerName ? "Owner Name is required" : ""}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Owner Contact (Phone) "
              name="ownerContact"
              value={formData.ownerContact}
              onChange={handleChange}
              error={errors.ownerContact}
              helperText={errors.ownerContact ? "Owner Contact is required" : ""}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Owner Email"
              name="ownerEmail"
              type="email"
              value={formData.ownerEmail}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      );

      default: return null;
    }
  };

  return (
    <>
      <PartnerHeader />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, }}>
        <Typography variant="h4" gutterBottom>Add New Property</Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: { xs: '100%', sm: '100%', md: '80%' }
          }}>
          {renderStepContent()}

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep(prev => prev - 1)}
              variant="outlined"
            >
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Property'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default AssetForm;