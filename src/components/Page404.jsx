// NotFoundPage.js
import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h1" gutterBottom>
        404 - Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for might have been removed or is temporarily unavailable.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Home Page
      </Button>
    </div>
  );
};

export default Page404;
