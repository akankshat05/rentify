import { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Link, Box } from '@mui/material';

function Login() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role);
      const role = response.data.user.role;
      if (role === 'buyer') {
        navigate('/buyer-dashboard'); // Navigate to buyer dashboard URL
      } else if (role === 'seller') {
        navigate('/seller-dashboard'); // Navigate to seller dashboard URL
      }
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <>
     <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box width="60%">
        <Typography variant="h4" gutterBottom align="center">Login</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <TextField type="email" name="email" label="Email" variant="outlined" onChange={handleChange} />
          <TextField type="password" name="password" label="Password" variant="outlined" onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </form>
        <Typography variant="body1" align="center">
          <Link href="/register">Don't have an account? Register</Link>
        </Typography>
      </Box>
    </Box>
    </>
  );
}

export default Login;
