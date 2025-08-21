import React from 'react';
import { Box, Pagination, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PaginationComponent = ({ count, page, onChange }) => {
  if (count === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <IconButton
          onClick={(e) => onChange(e, page > 1 ? page - 1 : 1)}
          disabled={page <= 1}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={(e) => onChange(e, page + 1)}
          disabled={true} // disable forward arrow when no data
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        shape="rounded"
        color="primary"
      />
    </Box>
  );
};

export default PaginationComponent;
