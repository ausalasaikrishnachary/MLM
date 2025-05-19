import React, { useState, useEffect } from 'react';
import {
  Grid, TextField, Typography, Button, Box, MenuItem, InputLabel,
  Select, FormControl
} from '@mui/material';
import axios from 'axios';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from 'react-router-dom';
import Header from "../../../Shared/Navbar/Navbar";
import { baseurl } from '../../../BaseURL/BaseURL';

const Edit_Tmanagement = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const passedUser = location.state?.user || null;

  const [selectedUserId, setSelectedUserId] = useState('');
  const [formData, setFormData] = useState({
    user_id: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pin_code: '',
    pan_number: '',
    aadhaar_number: '',
    kyc_status: '',
    referred_by: '',
    referral_id: '',
    level_no: '',
    status: '',
    account_holder_name: '',
    bank_name: '',
    branch_name: '',
    account_number: '',
    account_type: '',
    ifsc_code: '',
    nominee_reference_to: '',
    roles: [],
    image: '',
    pan: '',
    aadhaar: ''
  });

  const [files, setFiles] = useState({
    image: null,
    pan: null,
    aadhaar: null,
  });

  useEffect(() => {
    axios.get(`${baseurl}/users/`)
      .then(res => setUsers(res.data))
      .catch(err => console.error('User list fetch error:', err));
  }, []);

  useEffect(() => {
    if (passedUser) {
      setSelectedUserId(passedUser.user_id);
      setFormData({
        ...passedUser,
        date_of_birth: passedUser.date_of_birth || '',
        roles: passedUser.roles || [],
      });
    }
  }, [passedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async () => {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'roles') {
        const roleIds = value.map(role => role.role_id || role);
        data.append('roles', JSON.stringify(roleIds));
      } else if (key === 'password') {
        if (value?.trim()) data.append('password', value);
      } else if (!['image', 'pan', 'aadhaar'].includes(key)) {
        data.append(key, value ?? '');
      }
    });

    Object.entries(files).forEach(([key, file]) => {
      if (file) data.append(key, file);
    });

    try {
      const response = await axios.put(
        `${baseurl}/users/${selectedUserId}/`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      alert('User updated successfully!');
    } catch (error) {
      console.error('Update error:', error.response?.data || error.message);
      alert('Failed to update user. Check the console for details.');
    }
  };

  return (




    <Box sx={{ p: 4, maxWidth: 1300, mx: 'auto', mt: "10" }}>
      {/* Back Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>

      <Typography variant="h4" align="center" gutterBottom>
        Edit User
      </Typography>

      {selectedUserId && (
        <>

          <Header />



          <Grid container spacing={2}>
            {[
              // { name: 'user_id', label: 'user_id' },
              { name: 'username', label: 'Username' },
              // { name: 'password', label: 'Password' },
              { name: 'first_name', label: 'First Name' },
              { name: 'last_name', label: 'Last Name' },
              // { name: 'role_id', label: 'role_id' },
              // { name: 'role_name', label: 'role_name' },
              { name: 'email', label: 'Email' },
              { name: 'phone_number', label: 'Phone Number' },
              { name: 'date_of_birth', label: 'Date of Birth', type: 'date' },
              { name: 'address', label: 'Address' },
              { name: 'city', label: 'City' },
              { name: 'state', label: 'State' },
              { name: 'country', label: 'Country' },
              { name: 'pin_code', label: 'PIN Code' },
              { name: 'pan_number', label: 'PAN Number' },
              { name: 'aadhaar_number', label: 'Aadhaar Number' },
              // { name: 'referral_id', label: 'Referral ID' },
              // { name: 'level_no', label: 'Level No' },
              // { name: 'referred_by', label: 'Referred By' },
              { name: 'account_holder_name', label: 'Account Holder Name' },
              { name: 'bank_name', label: 'Bank Name' },
              { name: 'branch_name', label: 'Branch Name' },
              { name: 'account_number', label: 'Account Number' },
              { name: 'ifsc_code', label: 'IFSC Code' },
              { name: 'nominee_reference_to', label: 'Nominee Reference To' },
              // { name: 'status', label: 'Status' },
            ].map(field => (
              <Grid item xs={12} sm={4} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type || 'text'}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="account-type-label">Account Type</InputLabel>
                <Select
                  labelId="account-type-label"
                  id="account_type"
                  name="account_type"
                  value={formData.account_type || ''}
                  onChange={handleChange}
                  label="Account Type"
                >
                  <MenuItem value="Savings">Savings</MenuItem>
                  <MenuItem value="Current">Current</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="kyc-status-label">KYC Status</InputLabel>
                <Select
                  labelId="kyc-status-label"
                  id="kyc_status"
                  name="kyc_status"
                  value={formData.kyc_status || ''}
                  onChange={handleChange}
                  label="KYC Status"
                >
                  <MenuItem value="Verified">Verified</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>


            {[{ name: 'image', label: 'User Image' },
            { name: 'pan', label: 'Upload PAN' },
            { name: 'aadhaar', label: 'Upload Aadhaar' }
            ].map(fileField => (
              <Grid item xs={12} sm={4} key={fileField.name}>
                <Button variant="outlined" component="label" fullWidth>
                  {fileField.label}
                  <input
                    type="file"
                    hidden
                    name={fileField.name}
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />
                </Button>
                {files[fileField.name]?.name && (
                  <Typography variant="body2" mt={1}>{files[fileField.name].name}</Typography>
                )}
                {formData[fileField.name] && typeof formData[fileField.name] === 'string' && (
                  <Box mt={1}>
                    <Typography variant="body2">Current file:</Typography>
                    <a href={`${baseurl}${formData[fileField.name]}`} target="_blank" rel="noopener noreferrer">
                      View {fileField.label}
                    </a>
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>

          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSubmit}
            >
              Update User
            </Button>
          </Box>


        </>
      )}
    </Box>
  );
};

export default Edit_Tmanagement;
