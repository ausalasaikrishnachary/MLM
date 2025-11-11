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
  InputAdornment
} from '@mui/material'; 
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { baseurl } from '../../../BaseURL/BaseURL';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InvestorHeader from '../../../Shared/Investor/InvestorNavbar';

const InvestorReportsPage = () => {
  const [properties, setProperties] = useState([]);
  const userId = localStorage.getItem("user_id");
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [openReportConfigDialog, setOpenReportConfigDialog] = useState(false);
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [reportType, setReportType] = useState('monthly');
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

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${baseurl}/properties/user-id/${userId}/`);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  const openReportConfiguration = () => {
    setOpenReportConfigDialog(true);
  };

  const closeReportConfiguration = () => {
    setOpenReportConfigDialog(false);
  };

  const generateReport = () => {
    let filtered = [...properties];
    
    filtered = filtered.filter(property => {
      const propertyDate = new Date(property.created_at);
      return propertyDate >= startDate && propertyDate <= endDate;
    });

    if (reportType === 'monthly') {
      const grouped = filtered.reduce((acc, property) => {
        const date = new Date(property.created_at);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        
        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(property);
        return acc;
      }, {});

      const report = Object.entries(grouped).map(([monthYear, properties]) => ({
        period: monthYear,
        count: properties.length,
        totalValue: properties.reduce((sum, p) => sum + (p.property_value || 0), 0),
        properties
      }));

      setReportData(report);
    } else if (reportType === 'yearly') {
      const grouped = filtered.reduce((acc, property) => {
        const date = new Date(property.created_at);
        const year = date.getFullYear().toString();
        
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(property);
        return acc;
      }, {});

      const report = Object.entries(grouped).map(([year, properties]) => ({
        period: year,
        count: properties.length,
        totalValue: properties.reduce((sum, p) => sum + (p.property_value || 0), 0),
        properties
      }));

      setReportData(report);
    } else {
      setReportData([{
        period: `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
        count: filtered.length,
        totalValue: filtered.reduce((sum, p) => sum + (p.property_value || 0), 0),
        properties: filtered
      }]);
    }

    setOpenReportConfigDialog(false);
    setOpenReportDialog(true);
  };

  const exportToCSV = () => {
    const activeColumns = reportColumns.filter(col => col.checked).map(col => col.id);
    
    let csv = activeColumns.map(col => 
      reportColumns.find(rc => rc.id === col)?.label || col
    ).join(',') + '\n';
    
    reportData.forEach(group => {
      group.properties.forEach(property => {
        const row = activeColumns.map(col => {
          if (col === 'created_at') {
            return `"${new Date(property[col]).toLocaleDateString()}"`;
          }
          return `"${property[col] || ''}"`;
        }).join(',');
        csv += row + '\n';
      });
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `property_report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const exportToPDF = () => {
    // This is a placeholder - in a real implementation you would use jsPDF or similar
    const pdfContent = `
      Property Report\n\n
      Period: ${reportData[0]?.period || ''}\n
      Total Properties: ${reportData.reduce((sum, group) => sum + group.count, 0)}\n
      Total Value: ₹${reportData.reduce((sum, group) => sum + group.totalValue, 0).toLocaleString()}\n\n
      ${reportColumns.filter(col => col.checked).map(col => col.label).join(' | ')}\n
      ${reportData.flatMap(group => 
        group.properties.map(property => 
          reportColumns.filter(col => col.checked).map(col => 
            col.id === 'created_at' 
              ? new Date(property[col.id]).toLocaleDateString() 
              : property[col.id] || ''
          ).join(' | ')
        ).join('\n')
      ).join('\n')}
    `;
    
    alert('In a real implementation, this would generate a PDF with the following content:\n\n' + pdfContent);
  };

  const printReport = () => {
    const printContent = `
      <html>
        <head>
          <title>Property Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            .report-header { margin-bottom: 20px; }
            .report-summary { margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .period { font-weight: bold; margin-top: 20px; }
            .summary-item { margin: 5px 0; }
          </style>
        </head>
        <body>
          <h1>Property Report</h1>
          <div class="report-header">
            <div class="summary-item">Generated on: ${new Date().toLocaleDateString()}</div>
            <div class="summary-item">Report period: ${reportData[0]?.period || ''}</div>
          </div>
          <div class="report-summary">
            <h3>Summary</h3>
            <div class="summary-item">Total properties: ${reportData.reduce((sum, group) => sum + group.count, 0)}</div>
            <div class="summary-item">Total value: ₹${reportData.reduce((sum, group) => sum + group.totalValue, 0).toLocaleString()}</div>
          </div>
          <table>
            <thead>
              <tr>
                ${reportColumns.filter(col => col.checked).map(col => `<th>${col.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${reportData.flatMap(group => 
                group.properties.map(property => 
                  `<tr>
                    ${reportColumns.filter(col => col.checked).map(col => 
                      `<td>${
                        col.id === 'created_at' 
                          ? new Date(property[col.id]).toLocaleDateString() 
                          : property[col.id] || ''
                      }</td>`
                    ).join('')}
                  </tr>`
                ).join('')
              ).join('')}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 1000);
            };
          </script>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <>
      <InvestorHeader />
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

          <Button
            variant="contained"
            color="secondary"
            onClick={openReportConfiguration}
            startIcon={<DescriptionIcon />}
            sx={{
              px: 3,
              py: 1,
              height: "55px",
            }}
          >
            Generate Properties Report
          </Button>
        </Box>

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
            Generate comprehensive reports for your properties with various filters and export options.
          </Typography>
        </Box>

        {/* Report Configuration Dialog */}
        <Dialog open={openReportConfigDialog} onClose={closeReportConfiguration} maxWidth="sm" fullWidth>
          <DialogTitle>Generate Property Report</DialogTitle>
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
                  {reportColumns.map((column) => (
                    <FormControlLabel
                      key={column.id}
                      control={
                        <Checkbox
                          checked={column.checked}
                          onChange={(e) => {
                            const updatedColumns = reportColumns.map(col => 
                              col.id === column.id ? { ...col, checked: e.target.checked } : col
                            );
                            setReportColumns(updatedColumns);
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
          <DialogTitle>Property Report</DialogTitle>
          <DialogContent dividers>
            <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {reportColumns.filter(col => col.checked).map(column => (
                      <TableCell key={column.id} sx={{ fontWeight: 'bold', color: "#4A90E2" }} >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.flatMap(group => 
                    group.properties.map((property, idx) => (
                      <TableRow key={`${group.period}-${idx}`}>
                        {reportColumns.filter(col => col.checked).map(column => (
                          <TableCell key={`${property.id}-${column.id}`}>
                            {column.id === 'created_at' 
                              ? new Date(property[column.id]).toLocaleDateString() 
                              : column.id === 'property_value'
                                ? `₹${property[column.id]?.toLocaleString() || '-'}`
                                : property[column.id] || '-'}
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

export default InvestorReportsPage;