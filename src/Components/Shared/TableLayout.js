import React from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Container, Box, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
  return (
    <Container>
      <div style={{ textAlign: 'center',  }}>
        <h2 style={{ fontWeight: 'bold' }}>{title}</h2>
      </div>

      <Table sx={{ border: '1px solid black', width: '100%', mt: 2 }}>
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
              <TableCell colSpan={headers.length + (showActions ? 1 : 0)} sx={noDataStyle}>Loading...</TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((row, index) => (
              <TableRow
                key={index}
                hover
                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {headers.map(({ key }, i) => (
                  <TableCell key={i} sx={cellBodyStyle}>
                    {typeof row[key] === 'number'
                      ? `${parseFloat(row[key]).toLocaleString()}`
                      : row[key]}
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
              <TableCell colSpan={headers.length + (showActions ? 1 : 0)} sx={noDataStyle}>No Data Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
}


export default TableLayout;
