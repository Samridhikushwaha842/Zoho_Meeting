// src/Signup.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const Signup = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!userData.username || !userData.email || !userData.password) {
      setError('Please fill all the fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', userData);
      if (response.status === 200) {
        alert('Signup Successful!');
        setUserData({ username: '', email: '', password: '' });
        setError('');
      }
    } catch (err) {
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            name="username"
            value={userData.username}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={userData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
