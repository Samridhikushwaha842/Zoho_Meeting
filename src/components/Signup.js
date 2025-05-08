import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import { signupUser } from '../utils/api';

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSuccessMsg('');
    setErrorMsg('');
  };

  const validate = () => {
    const temp = {};
    if (!formData.name) temp.name = 'Name is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) temp.email = 'Email is not valid.';
    if (formData.password.length < 6) temp.password = 'Password must be at least 6 characters.';
    setErrors(temp);
    return Object.values(temp).every((x) => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await signupUser(formData);
      setSuccessMsg(response.message || 'Signup successful!');
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      setErrorMsg(error?.error || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 5, bgcolor: '#f1f8e9' }}>
      <Typography variant="h5" gutterBottom align="center">
        Sign Up
      </Typography>
      {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}
      {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth margin="normal" label="Name" name="name"
          value={formData.name} onChange={handleChange}
          error={!!errors.name} helperText={errors.name}
        />
        <TextField
          fullWidth margin="normal" label="Email" name="email"
          value={formData.email} onChange={handleChange}
          error={!!errors.email} helperText={errors.email}
        />
        <TextField
          fullWidth margin="normal" label="Password" name="password" type="password"
          value={formData.password} onChange={handleChange}
          error={!!errors.password} helperText={errors.password}
        />
        <Button
          type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
      </Box>
    </Paper>
  );
};

export default SignupForm;
