import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Container, Box, IconButton, Pagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseurl } from '../BaseURL/BaseURL';

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

const rowsPerPage = 5;

function TableLayout({
  title = '',
  headers = [],
  data = [],
  loading = false,
  onRowClick,
  showActions = false,
  onEdit,
  onDelete
}) {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(data.length / rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Container>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontWeight: 'bold' }}>{title}</h2>
      </div>

      {/* Horizontal scroll container */}
      {/* <Box sx={{ overflowX: 'auto', mt: 2, width:"1350px",marginLeft:"-9%" }}> */}

      <Box sx={{ overflowX: 'auto', mt: 2 }}>
        <Table sx={{ border: '1px solid black', minWidth: 800 }}>
          <TableHead>
            <TableRow>
              {headers.map(({ label }, index) => (
                <TableCell key={index} sx={cellStyle}>{label}</TableCell>
              ))}
              {showActions && <TableCell sx={cellStyle}>Actions</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={headers.length + (showActions ? 1 : 0)} sx={noDataStyle}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {headers.map(({ key }, i) => (
                    <TableCell key={i} sx={cellBodyStyle}>
                      {key === 'document_file' && row[key] ? (
                        <a
                          href={`${baseurl}${row[key]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#1976d2', textDecoration: 'underline' }}
                        >
                          View PDF
                        </a>
                      ) : typeof row[key] === 'number' ? (
                        parseFloat(row[key]).toLocaleString()
                      ) : (
                        row[key] || '-'
                      )}
                    </TableCell>
                  ))}
                  {showActions && (
                    <TableCell sx={cellBodyStyle}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit && onEdit(row);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete && onDelete(row);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length + (showActions ? 1 : 0)} sx={noDataStyle}>
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Pagination */}
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChangePage}
            shape="rounded"
            size="small"
            color="primary"
            siblingCount={0}
            boundaryCount={1}
          />
        </Box>
      )}
    </Container>
  );
}

export default TableLayout;
