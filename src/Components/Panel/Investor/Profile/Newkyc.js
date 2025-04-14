import React, { useState } from 'react';
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
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';


const steps = [
  'Basic Details',
  'Location Details',
  'Property Profile',
  'Photos, Videos & Voice Over',
  'Pricing & Others',
];

const Newkyc = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Step 1 - Basic Details
  const [lookingTo, setLookingTo] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [propertyCategory, setPropertyCategory] = useState('');

  // Step 2 - Location Details
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  // Step 3 - Property Profile
  const [plotArea, setPlotArea] = useState('');
  const [areaUnit, setAreaUnit] = useState('sq.ft.');
  const [length, setLength] = useState('');
  const [breadth, setBreadth] = useState('');
  const [floorsAllowed, setFloorsAllowed] = useState('');
  const [hasBoundaryWall, setHasBoundaryWall] = useState('');
  const [openSides, setOpenSides] = useState('');
  const [hasConstruction, setHasConstruction] = useState('');
  const [possessionBy, setPossessionBy] = useState('');

  // Step 4 - Media
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);


  // Step 5 - Pricing & Others
  const [price, setPrice] = useState('');
  const [maintenance, setMaintenance] = useState('');

  const handleContinue = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>I'm looking to</InputLabel>
                <Select value={lookingTo} onChange={(e) => setLookingTo(e.target.value)} label="I'm looking to">
                  <MenuItem value="Sell">Sell</MenuItem>
                  <MenuItem value="Rent/Lease">Rent / Lease</MenuItem>
                  <MenuItem value="PG">PG</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Property Type</InputLabel>
                <Select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} label="Property Type">
                  <MenuItem value="Residential">Residential</MenuItem>
                  <MenuItem value="Commercial">Commercial</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Property Category</InputLabel>
                <Select value={propertyCategory} onChange={(e) => setPropertyCategory(e.target.value)} label="Property Category">
                  <MenuItem value="Flat/Apartment">Flat/Apartment</MenuItem>
                  <MenuItem value="Independent House / Villa">Independent House / Villa</MenuItem>
                  <MenuItem value="Plot / Land">Plot / Land</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth multiline size="small" label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="State" value={state} onChange={(e) => setState(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="City" value={city} onChange={(e) => setCity(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Plot Area" value={plotArea} onChange={(e) => setPlotArea(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Unit</InputLabel>
                <Select value={areaUnit} onChange={(e) => setAreaUnit(e.target.value)} label="Unit">
                  <MenuItem value="sq.ft.">sq.ft.</MenuItem>
                  <MenuItem value="sq.m.">sq.m.</MenuItem>
                  <MenuItem value="acres">Acres</MenuItem>
                  <MenuItem value="hectares">Hectares</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Property Dimensions <Typography component="span" color="text.secondary">(Optional)</Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Length of plot (in Ft.)" value={length} onChange={(e) => setLength(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Breadth of plot (in Ft.)" value={breadth} onChange={(e) => setBreadth(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="No. of floors allowed for construction" value={floorsAllowed} onChange={(e) => setFloorsAllowed(e.target.value)} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>Is there a boundary wall around the property?</Typography>
              <Box sx={{ mt: 1 }}>
                <Button variant={hasBoundaryWall === 'Yes' ? 'contained' : 'outlined'} onClick={() => setHasBoundaryWall('Yes')} sx={{ mr: 1 }} size="small">Yes</Button>
                <Button variant={hasBoundaryWall === 'No' ? 'contained' : 'outlined'} onClick={() => setHasBoundaryWall('No')} size="small">No</Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>No. of open sides</Typography>
              <Box sx={{ mt: 1 }}>
                {['1', '2', '3', '3+'].map((option) => (
                  <Button key={option} variant={openSides === option ? 'contained' : 'outlined'} onClick={() => setOpenSides(option)} size="small" sx={{ mr: 1, mb: 1 }}>
                    {option}
                  </Button>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>Any construction done on this property?</Typography>
              <Box sx={{ mt: 1 }}>
                <Button variant={hasConstruction === 'Yes' ? 'contained' : 'outlined'} onClick={() => setHasConstruction('Yes')} sx={{ mr: 1 }} size="small">Yes</Button>
                <Button variant={hasConstruction === 'No' ? 'contained' : 'outlined'} onClick={() => setHasConstruction('No')} size="small">No</Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Expected by</InputLabel>
                <Select value={possessionBy} onChange={(e) => setPossessionBy(e.target.value)} label="Expected by">
                  <MenuItem value="Immediately">Immediately</MenuItem>
                  <MenuItem value="Within 3 months">Within 3 months</MenuItem>
                  <MenuItem value="Within 6 months">Within 6 months</MenuItem>
                  <MenuItem value="1 year">1 year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

        case 3:
  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {/* Photo Upload */}
      <Grid item xs={12} sm={6}>
        <Box display="flex" alignItems="center" sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
          <Box
            sx={{
              backgroundColor: '#e0e0e0',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: '200px',
              justifyContent: 'center',
            }}
            component="label"
          >
            <UploadFileIcon sx={{ mr: 1 }} />
            Upload Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </Box>
          <Box sx={{ padding: '10px', flexGrow: 1 }}>
            {photo ? photo.name : 'No file selected'}
          </Box>
        </Box>
      </Grid>

      {/* Video Upload */}
      <Grid item xs={12} sm={6}>
        <Box display="flex" alignItems="center" sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
          <Box
            sx={{
              backgroundColor: '#e0e0e0',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: '200px',
              justifyContent: 'center',
            }}
            component="label"
          >
            <UploadFileIcon sx={{ mr: 1 }} />
            Upload Video
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </Box>
          <Box sx={{ padding: '10px', flexGrow: 1 }}>
            {video ? video.name : 'No file selected'}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

        

      case 4:
        return (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Maintenance" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h5" gutterBottom>KYC Dashboard</Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%', maxWidth: '80vw', mt: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ p: 4, mt: 4, width: '80%' }}>
        <Typography variant="h6" gutterBottom>
          Step {activeStep + 1}: {steps[activeStep]}
        </Typography>

        {renderStepContent()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack}>Back</Button>
          <Button variant="contained" onClick={handleContinue}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Newkyc;
