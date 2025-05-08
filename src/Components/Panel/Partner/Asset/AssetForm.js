import React, { useState, useEffect } from 'react';
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
    areaUnit: 'sq.ft.',
    length: '',
    breadth: '',
    numberOfFloors: 1,
    numberOfBedrooms: '',
    numberOfBalconies: '',
    numberOfBathrooms: '',
    openSides: 0,
    builtupArea: '',
    numberOfRoads: 0,
    roadWidth1: null,
    roadWidth2: null,
    facing: 'east',
    ownershipType: 'Freehold',
    price: '',
    maintenance: '',
    amenities: [1], // Default amenity
    propertyUniqueness: '',
    locationAdvantages: '',
    otherFeatures: '',
    ownerName: '',
    ownerContact: '',
    ownerEmail: '',
    isFeatured: false,
    images: [],
    videos: [],
    userId: 1 // This should be dynamic in a real app
  });

  const [showResidentialFields, setShowResidentialFields] = useState(false);

  useEffect(() => {
    if (formData.propertyType) {
      const selectedType = propertyTypes.find(type => type.property_type_id === formData.propertyType);
      if (selectedType) {
        const typeName = selectedType.name.toLowerCase();
        const shouldShow = typeName.includes('flat') || typeName.includes('villa') || 
                          typeName.includes('apartment') || typeName.includes('house');
        setShowResidentialFields(shouldShow);
      }
    }
  }, [formData.propertyType, propertyTypes]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, amenitiesRes] = await Promise.all([
          axios.get('https://rahul30.pythonanywhere.com/property-categories/'),
          axios.get('https://rahul30.pythonanywhere.com/amenities/')
        ]);
        setPropertyCategories(categoriesRes.data);
        setAmenities(amenitiesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.category) {
      console.log('Fetching property types for category:', formData.category);
      axios
        .get(`https://rahul30.pythonanywhere.com/property-types/category-id/${formData.category}/`)
        .then((response) => {
          console.log('Fetched property types:', response.data);
          setPropertyTypes(response.data);
        })
        .catch((error) => {
          console.error('Error fetching property types:', error);
        });
    }
  }, [formData.category]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = async (e, type) => {
    const files = e.target.files;
    if (!files.length) return;

    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      file // Store the actual file object for later upload
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
      const newAmenities = prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId];
      return { ...prev, amenities: newAmenities };
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Convert plot area to sq.ft based on selected unit
      let plotAreaSqft = parseFloat(formData.plotArea) || 0;
      switch (formData.areaUnit) {
        case 'sq.m.': plotAreaSqft *= 10.7639; break;
        case 'acres': plotAreaSqft *= 43560; break;
        case 'hectares': plotAreaSqft *= 107639; break;
        default: break; // Already in sq.ft
      }

      // Prepare form data for API
      const payload = new FormData();
      const userId = localStorage.getItem("user_id");

      // Append all basic fields
      const formFields = {
        looking_to: formData.lookingTo,
        property_title: formData.propertyTitle,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pin_code: formData.pinCode,
        latitude: formData.latitude || '12.120000',
        longitude: formData.longitude || '12.120000',
        plot_area_sqft: plotAreaSqft.toFixed(2),
        builtup_area_sqft: formData.builtupArea || '0.00',
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
        property_uniqueness: formData.propertyUniqueness,
        location_advantages: formData.locationAdvantages,
        other_features: formData.otherFeatures,
        owner_name: formData.ownerName,
        owner_contact: formData.ownerContact,
        owner_email: formData.ownerEmail,
        is_featured: formData.isFeatured,
        // amenities: JSON.stringify(formData.amenities),
        category: formData.category,
        property_type: formData.propertyType,
        user_id: userId,
        referral_id:referralId,
        number_of_bedrooms: formData.numberOfBedrooms,
        number_of_balconies: formData.numberOfBalconies,
        number_of_bathrooms: formData.numberOfBathrooms,
      };

      // Log the payload for debugging
      console.log('Form payload:', formFields);

      // Append fields to FormData
      Object.entries(formFields).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });

      // Append files
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

      // Debug: Log FormData contents
      for (let pair of payload.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      // Submit to API
      const response = await axios.post('https://rahul30.pythonanywhere.com/property/', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Submission successful:', response.data);
      alert('Property submitted successfully!');
      navigate("/p-myassets");

      // Optionally reset form or redirect here
    } catch (error) {
      console.error('Detailed submission error:', {
        message: error.message,
        response: error.response?.data,
        config: error.config
      });

      let errorMessage = 'Error submitting property';
      if (error.response) {
        // Handle specific backend validation errors
        if (error.response.data) {
          errorMessage += `: ${JSON.stringify(error.response.data)}`;
        } else {
          errorMessage += `: ${error.response.statusText}`;
        }
      } else {
        errorMessage += `: ${error.message}`;
      }

      alert(errorMessage);
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
              <InputLabel>Looking To</InputLabel>
              <Select
                name="lookingTo"
                value={formData.lookingTo}
                onChange={handleChange}
                label="Looking To"
              >
                <MenuItem value="sell">Sell</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
                <MenuItem value="lease">Lease</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Property Category</InputLabel>
              <Select
                name="category"
                value={formData.category || ''}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    category: selectedId,
                    propertyType: '', // reset propertyType when category changes
                  }));
                }}
                label="Property Category"
              >
                {propertyCategories.map((category) => (
                  <MenuItem key={category.property_category_id} value={category.property_category_id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Property Type</InputLabel>
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
                label="Property Type"
                disabled={!formData.category}
                displayEmpty
              >
                <MenuItem value="" disabled></MenuItem>
                {propertyTypes.map((type) => (
                  <MenuItem key={type.property_type_id} value={type.property_type_id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Property Type</InputLabel>
              <Select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                label="Property Type"
                disabled={!propertyCategory} // optional: disable if no category is selected
              >
                {propertyTypes.map((type) => (
                  <MenuItem key={type.property_type_id} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Property Title"
              name="propertyTitle"
              value={formData.propertyTitle}
              onChange={handleChange}
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Full Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pin Code"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Latitude"
              name="latitude"
              type="number"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="12.120000"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Longitude"
              name="longitude"
              type="number"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="12.120000"
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
            </>
          )}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Area"
              name="plotArea"
              type="number"
              value={formData.plotArea}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Area Unit</InputLabel>
              <Select
                name="areaUnit"
                value={formData.areaUnit}
                onChange={handleChange}
                label="Area Unit"
              >
                <MenuItem value="sq.ft.">Square Feet</MenuItem>
                <MenuItem value="sq.m.">Square Meters</MenuItem>
                <MenuItem value="acres">Acres</MenuItem>
                <MenuItem value="hectares">Hectares</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Length (ft)"
              name="length"
              type="number"
              value={formData.length}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Breadth (ft)"
              name="breadth"
              type="number"
              value={formData.breadth}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Built-up Area (sq.ft)"
              name="builtupArea"
              type="number"
              value={formData.builtupArea}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Facing Direction</InputLabel>
              <Select
                name="facing"
                value={formData.facing}
                onChange={handleChange}
                label="Facing Direction"
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
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Ownership Type</InputLabel>
              <Select
                name="ownershipType"
                value={formData.ownershipType}
                onChange={handleChange}
                label="Ownership Type"
              >
                <MenuItem value="Freehold">Freehold</MenuItem>
                <MenuItem value="Leasehold">Leasehold</MenuItem>
                <MenuItem value="Cooperative">Cooperative</MenuItem>
                <MenuItem value="Condominium">Condominium</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Open Sides"
              name="openSides"
              type="number"
              value={formData.openSides}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Roads"
              name="numberOfRoads"
              type="number"
              value={formData.numberOfRoads}
              onChange={handleChange}
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
            <Typography variant="h6" gutterBottom>Upload Images</Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<UploadFileIcon />}
              sx={{ mb: 2 }}
            >
              Upload Images
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
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Upload Videos</Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<UploadFileIcon />}
              sx={{ mb: 2 }}
            >
              Upload Videos
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
        </Grid>
      );

      case 4: return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Maintenance Charges"
              name="maintenance"
              type="number"
              value={formData.maintenance}
              onChange={handleChange}
            />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Owner Name"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Owner Contact"
              name="ownerContact"
              value={formData.ownerContact}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Owner Email"
              name="ownerEmail"
              type="email"
              value={formData.referral_id}
              onChange={handleChange}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                />
              }
              label="Feature this property"
            />
          </Grid> */}
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

        <Paper elevation={3} sx={{ p: 4, width: '80%' }}>
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
                onClick={() => setActiveStep(prev => prev + 1)}
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