// src/components/NotFound.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="flex flex-col items-center justify-center min-h-screen text-center">
      <Typography variant="h1" className="text-6xl font-bold text-gray-800 mb-4">
        404
      </Typography>
      <Typography variant="h5" className="text-2xl text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        className="mt-4"
      >
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
