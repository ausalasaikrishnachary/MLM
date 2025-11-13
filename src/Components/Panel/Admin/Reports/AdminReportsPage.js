import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  FormGroup, 
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  Grid,
  Card,
  CardContent
} from '@mui/material'; 
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { baseurl } from '../../../BaseURL/BaseURL';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Header from '../../../Shared/Navbar/Navbar';
import SellIcon from '@mui/icons-material/Sell';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';

const AdminReportsPage = () => {
  const [properties, setProperties] = useState([]);
  const [soldProperties, setSoldProperties] = useState([]);
  const [bookedProperties, setBookedProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [openReportConfigDialog, setOpenReportConfigDialog] = useState(false);
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [reportType, setReportType] = useState('monthly');
  const [currentReport, setCurrentReport] = useState('all'); // 'all', 'sold', 'booked', 'users'
  const [reportData, setReportData] = useState([]);
  const [reportColumns, setReportColumns] = useState([
    { id: 'property_title', label: 'Property Title', checked: true },
    { id: 'city', label: 'City', checked: true },
    { id: 'state', label: 'State', checked: true },
    { id: 'property_value', label: 'Value (₹)', checked: true },
    { id: 'status', label: 'Status', checked: true },
    { id: 'created_at', label: 'Date Added', checked: true },
    { id: 'owner_name', label: 'Owner', checked: false },
    { id: 'owner_contact', label: 'Contact', checked: false },
    { id: 'area', label: 'Area', checked: false },
    { id: 'builtup_area', label: 'Built-up Area', checked: false },
  ]);
  const [userReportColumns, setUserReportColumns] = useState([
    { id: 'username', label: 'Username', checked: true },
    { id: 'email', label: 'Email', checked: true },
    { id: 'first_name', label: 'First Name', checked: true },
    { id: 'last_name', label: 'Last Name', checked: true },
    { id: 'phone_number', label: 'Phone', checked: true },
    { id: 'date_joined', label: 'Date Joined', checked: true },
    { id: 'is_active', label: 'Active', checked: true },
    { id: 'user_type', label: 'User Type', checked: false },
  ]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${baseurl}/property/`);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  const fetchSoldProperties = async () => {
    try {
      const response = await fetch(`${baseurl}/properties/status/sold/`);
      const data = await response.json();
      setSoldProperties(data);
      return data;
    } catch (error) {
      console.error('Error fetching sold properties:', error);
      return [];
    }
  };

  const fetchBookedProperties = async () => {
    try {
      const response = await fetch(`${baseurl}/properties/status/booked/`);
      const data = await response.json();
      setBookedProperties(data);
      return data;
    } catch (error) {
      console.error('Error fetching booked properties:', error);
      return [];
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${baseurl}/users/`);
      const data = await response.json();
      setUsers(data);
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const openReportConfiguration = (reportType) => {
    setCurrentReport(reportType);
    
    // Pre-fetch data based on report type
    if (reportType === 'sold') {
      fetchSoldProperties();
    } else if (reportType === 'booked') {
      fetchBookedProperties();
    } else if (reportType === 'users') {
      fetchUsers();
    }
    
    setOpenReportConfigDialog(true);
  };

  const closeReportConfiguration = () => {
    setOpenReportConfigDialog(false);
  };

  const generateReport = async () => {
    let data = [];
    let filtered = [];

    // Get data based on report type
    switch (currentReport) {
      case 'all':
        data = properties;
        break;
      case 'sold':
        data = await fetchSoldProperties();
        break;
      case 'booked':
        data = await fetchBookedProperties();
        break;
      case 'users':
        data = await fetchUsers();
        break;
      default:
        data = properties;
    }

    // Filter by date range
    if (currentReport === 'users') {
      filtered = data.filter(user => {
        const userDate = new Date(user.date_joined || user.created_at);
        return userDate >= startDate && userDate <= endDate;
      });
    } else {
      filtered = data.filter(property => {
        const propertyDate = new Date(property.created_at);
        return propertyDate >= startDate && propertyDate <= endDate;
      });
    }

    // Group data based on report type
    if (reportType === 'monthly') {
      const grouped = filtered.reduce((acc, item) => {
        const date = new Date(currentReport === 'users' ? (item.date_joined || item.created_at) : item.created_at);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        
        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(item);
        return acc;
      }, {});

      const report = Object.entries(grouped).map(([monthYear, items]) => ({
        period: monthYear,
        count: items.length,
        totalValue: currentReport === 'users' ? 0 : items.reduce((sum, p) => sum + (p.property_value || 0), 0),
        properties: items
      }));

      setReportData(report);
    } else if (reportType === 'yearly') {
      const grouped = filtered.reduce((acc, item) => {
        const date = new Date(currentReport === 'users' ? (item.date_joined || item.created_at) : item.created_at);
        const year = date.getFullYear().toString();
        
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(item);
        return acc;
      }, {});

      const report = Object.entries(grouped).map(([year, items]) => ({
        period: year,
        count: items.length,
        totalValue: currentReport === 'users' ? 0 : items.reduce((sum, p) => sum + (p.property_value || 0), 0),
        properties: items
      }));

      setReportData(report);
    } else {
      setReportData([{
        period: `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
        count: filtered.length,
        totalValue: currentReport === 'users' ? 0 : filtered.reduce((sum, p) => sum + (p.property_value || 0), 0),
        properties: filtered
      }]);
    }

    setOpenReportConfigDialog(false);
    setOpenReportDialog(true);
  };

  const getCurrentColumns = () => {
    return currentReport === 'users' ? userReportColumns : reportColumns;
  };

  const exportToCSV = () => {
    const activeColumns = getCurrentColumns().filter(col => col.checked).map(col => col.id);
    
    let csv = activeColumns.map(col => 
      getCurrentColumns().find(rc => rc.id === col)?.label || col
    ).join(',') + '\n';
    
    reportData.forEach(group => {
      group.properties.forEach(item => {
        const row = activeColumns.map(col => {
          if (col === 'created_at' || col === 'date_joined') {
            return `"${new Date(item[col] || item.created_at).toLocaleDateString()}"`;
          }
          if (col === 'property_value') {
            return `"${item[col] ? '₹' + item[col].toLocaleString() : '-'}"`;
          }
          if (col === 'is_active') {
            return `"${item[col] ? 'Yes' : 'No'}"`;
          }
          return `"${item[col] || ''}"`;
        }).join(',');
        csv += row + '\n';
      });
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${currentReport}_report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const exportToPDF = () => {
    const reportTitle = `${currentReport.charAt(0).toUpperCase() + currentReport.slice(1)} Report`;
    const pdfContent = `
      ${reportTitle}\n\n
      Period: ${reportData[0]?.period || ''}\n
      Total ${currentReport === 'users' ? 'Users' : 'Properties'}: ${reportData.reduce((sum, group) => sum + group.count, 0)}\n
      ${currentReport !== 'users' ? `Total Value: ₹${reportData.reduce((sum, group) => sum + group.totalValue, 0).toLocaleString()}\n\n` : '\n'}
      ${getCurrentColumns().filter(col => col.checked).map(col => col.label).join(' | ')}\n
      ${reportData.flatMap(group => 
        group.properties.map(item => 
          getCurrentColumns().filter(col => col.checked).map(col => {
            if (col === 'created_at' || col === 'date_joined') {
              return new Date(item[col] || item.created_at).toLocaleDateString();
            }
            if (col === 'property_value') {
              return item[col] ? '₹' + item[col].toLocaleString() : '-';
            }
            if (col === 'is_active') {
              return item[col] ? 'Yes' : 'No';
            }
            return item[col] || '';
          }).join(' | ')
        ).join('\n')
      ).join('\n')}
    `;
    
    alert('In a real implementation, this would generate a PDF with the following content:\n\n' + pdfContent);
  };

 const printReport = () => {
  const reportTitle = `${currentReport.charAt(0).toUpperCase() + currentReport.slice(1)} Report`;
  
  // Get all items (properties/users) from all groups
  const allItems = reportData.flatMap(group => group.properties || []);
  
  // Calculate total value for properties (not for users)
  const totalValue = currentReport !== 'users' 
    ? reportData.reduce((sum, group) => sum + (group.totalValue || 0), 0)
    : 0;

  const printContent = `
    <html>
      <head>
        <title>${reportTitle}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; text-align: center; }
          .report-header { 
            margin-bottom: 20px; 
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 5px;
          }
          .report-summary { 
            margin-bottom: 30px; 
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 5px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 10px; 
            font-size: 14px;
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 10px; 
            text-align: left; 
          }
          th { 
            background-color: #4A90E2; 
            color: white;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          .summary-item { 
            margin: 8px 0; 
            font-size: 14px;
          }
          .summary-title {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <h1>${reportTitle}</h1>
        
        <div class="report-header">
          <div class="summary-item"><strong>Generated on:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
          <div class="summary-item"><strong>Report Type:</strong> ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}</div>
          <div class="summary-item"><strong>Date Range:</strong> ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}</div>
        </div>
        
        <div class="report-summary">
          <div class="summary-title">Summary</div>
          <div class="summary-item"><strong>Total ${currentReport === 'users' ? 'Users' : 'Properties'}:</strong> ${allItems.length}</div>
    
        </div>

        ${allItems.length > 0 ? `
        <table>
          <thead>
            <tr>
            <th>S.no</th>
              ${getCurrentColumns().filter(col => col.checked).map(col => `<th>${col.label}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${allItems.map((item, index) => {
              const row = getCurrentColumns()
                .filter(col => col.checked)
                .map(col => {
                  let value = '';
                  if (col.id === 'created_at' || col.id === 'date_joined') {
                    value = new Date(item[col.id] || item.created_at).toLocaleDateString();
                  } else if (col.id === 'property_value') {
                    value = item[col.id] ? `₹${item[col.id].toLocaleString()}` : '-';
                  } else if (col.id === 'is_active') {
                    value = item[col.id] ? 'Yes' : 'No';
                  } else {
                    value = item[col.id] || item[col.label?.toLowerCase().replace(/ /g, '_')] || '-';
                  }
                  return `<td>${value}</td>`;
                }).join('');
              
                return `<tr><td>${index + 1}</td>${row}</tr>`;
            }).join('')}
          </tbody>
        </table>
        ` : `
        <div style="text-align: center; padding: 40px; color: #666;">
          <h3>No data available for the selected criteria</h3>
          <p>Please adjust your date range or filters and try again.</p>
        </div>
        `}

        <script>
          document.addEventListener('DOMContentLoaded', function() {
            window.print();
          });
        </script>
      </body>
    </html>
  `;
  
  const printWindow = window.open('', '_blank', 'width=1000,height=600');
  if (printWindow) {
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Fallback in case DOMContentLoaded doesn't fire
    printWindow.onload = function() {
      printWindow.print();
    };
  }
};

  const getReportTitle = () => {
    const titles = {
      all: 'All Properties Report',
      sold: 'Sold Properties Report',
      booked: 'Booked Properties Report',
      users: 'Users Report'
    };
    return titles[currentReport] || 'Report';
  };

  return (
    <>
      <Header />
      <Container sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Reports
          </Typography>
        </Box>

        {/* Report Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
              onClick={() => openReportConfiguration('all')}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <DescriptionIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  All Properties Report
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Generate comprehensive report for all properties
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
              onClick={() => openReportConfiguration('sold')}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <SellIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Sold Properties Report
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Report for properties marked as sold
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
              onClick={() => openReportConfiguration('booked')}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <BookIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Booked Properties Report
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Report for properties that are booked
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
              onClick={() => openReportConfiguration('users')}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <PeopleIcon sx={{ fontSize: 48, color: 'info.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Users Report
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Generate report for all registered users
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            backgroundColor: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Property Reports Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Generate comprehensive reports for properties and users with various filters and export options.
          </Typography>
        </Box>

        {/* Report Configuration Dialog */}
        <Dialog open={openReportConfigDialog} onClose={closeReportConfiguration} maxWidth="sm" fullWidth>
          <DialogTitle>{getReportTitle()}</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="report-type-label">Report Type</InputLabel>
                <Select
                  labelId="report-type-label"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  label="Report Type"
                >
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                  <MenuItem value="custom">Custom Date Range</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Start Date
                  </Typography>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    customInput={
                      <TextField
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EventIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    }
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    End Date
                  </Typography>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    customInput={
                      <TextField
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonthIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    }
                  />
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Select Columns to Include
                </Typography>
                <FormGroup>
                  {getCurrentColumns().map((column) => (
                    <FormControlLabel
                      key={column.id}
                      control={
                        <Checkbox
                          checked={column.checked}
                          onChange={(e) => {
                            const updatedColumns = getCurrentColumns().map(col => 
                              col.id === column.id ? { ...col, checked: e.target.checked } : col
                            );
                            if (currentReport === 'users') {
                              setUserReportColumns(updatedColumns);
                            } else {
                              setReportColumns(updatedColumns);
                            }
                          }}
                        />
                      }
                      label={column.label}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeReportConfiguration} color="primary">
              Cancel
            </Button>
            <Button onClick={generateReport} variant="contained" color="primary">
              Generate Report
            </Button>
          </DialogActions>
        </Dialog>

        {/* Report Display Dialog */}
        <Dialog open={openReportDialog} onClose={() => setOpenReportDialog(false)} maxWidth="lg" fullWidth>
          <DialogTitle>{getReportTitle()}</DialogTitle>
          <DialogContent dividers>
            <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {getCurrentColumns().filter(col => col.checked).map(column => (
                      <TableCell key={column.id} sx={{ fontWeight: 'bold', color: "#4A90E2" }} >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.flatMap(group => 
                    group.properties.map((item, idx) => (
                      <TableRow key={`${group.period}-${idx}`}>
                        {getCurrentColumns().filter(col => col.checked).map(column => (
                          <TableCell key={`${item.id}-${column.id}`}>
                            {column.id === 'created_at' || column.id === 'date_joined'
                              ? new Date(item[column.id] || item.created_at).toLocaleDateString()
                              : column.id === 'property_value'
                                ? `₹${item[column.id]?.toLocaleString() || '-'}`
                                : column.id === 'is_active'
                                  ? item[column.id] ? 'Yes' : 'No'
                                  : item[column.id] || '-'}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenReportDialog(false)} color="primary">
              Close
            </Button>
            <Button onClick={printReport} startIcon={<PrintIcon />} color="primary">
              Print
            </Button>
            {/* <Button onClick={exportToPDF} startIcon={<PictureAsPdfIcon />} color="primary">
              PDF
            </Button> */}
            <Button onClick={exportToCSV} startIcon={<DescriptionIcon />} color="primary">
              CSV
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default AdminReportsPage;