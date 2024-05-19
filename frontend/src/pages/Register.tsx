import { useState } from 'react';
import { registerUser } from '../api';
import { TextField, Button, Typography, Box, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';

function Register() {
 const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: 'buyer' as 'buyer' | 'seller',
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
      await registerUser(formData);
      alert('User registered successfully');
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box width="60%">
        <Typography variant="h4" gutterBottom align="center">Register</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <TextField type="text" name="firstName" label="First Name" variant="outlined" onChange={handleChange} />
          <TextField type="text" name="lastName" label="Last Name" variant="outlined" onChange={handleChange} />
          <TextField type="email" name="email" label="Email" variant="outlined" onChange={handleChange} />
          <TextField type="password" name="password" label="Password" variant="outlined" onChange={handleChange} />
          <TextField type="text" name="phone" label="Phone" variant="outlined" onChange={handleChange} />
          <FormControl variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="buyer">Buyer</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">Register</Button>
        </form>
        <Typography variant="body1" align="center">
          <Link to="/">Already have an account? Login</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Register;
