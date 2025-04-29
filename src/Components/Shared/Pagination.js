import React from 'react';
import { Box, Pagination } from '@mui/material';

const PaginationComponent = ({ count, page, onChange }) => {
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
