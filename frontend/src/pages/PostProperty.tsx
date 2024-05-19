import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

interface PropertyFormInputs {
    title: string;
    description: string;
    location: string;
    area: number;
    bedrooms: number;
    bathrooms: number;
    amenities: string;
    price: number;
}
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const PostProperty: React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const { register, handleSubmit, formState: { errors } } = useForm<PropertyFormInputs>();

    const onSubmit: SubmitHandler<PropertyFormInputs> = async data => {
        const userid = localStorage.getItem('token')
        try {
            const response = await axios.post(`${BACKEND_URL}/api/properties/${userid}`, data);
            console.log('Property posted successfully:', response.data);
            navigate('/seller-dashboard');
        } catch (error) {
            console.error('Error posting property:', error);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Box width="50%">
                <Typography variant="h4" gutterBottom align="center">List a Property</Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <TextField
                        id="title"
                        label="Title"
                        variant="outlined"
                        {...register('title', { required: true })}
                        error={!!errors.title}
                        helperText={errors.title && "This field is required"}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        {...register('description', { required: true })}
                        error={!!errors.description}
                        helperText={errors.description && "This field is required"}
                    />
                    <TextField
                        id="location"
                        label="Location"
                        variant="outlined"
                        {...register('location', { required: true })}
                        error={!!errors.location}
                        helperText={errors.location && "This field is required"}
                    />
                    <TextField
                        id="area"
                        label="Area (sq ft)"
                        type="number"
                        variant="outlined"
                        {...register('area', { required: true })}
                        error={!!errors.area}
                        helperText={errors.area && "This field is required"}
                    />
                    <TextField
                        id="bedrooms"
                        label="Number of Bedrooms"
                        type="number"
                        variant="outlined"
                        {...register('bedrooms', { required: true })}
                        error={!!errors.bedrooms}
                        helperText={errors.bedrooms && "This field is required"}
                    />
                    <TextField
                        id="bathrooms"
                        label="Number of Bathrooms"
                        type="number"
                        variant="outlined"
                        {...register('bathrooms', { required: true })}
                        error={!!errors.bathrooms}
                        helperText={errors.bathrooms && "This field is required"}
                    />
                    <TextField
                        id="amenities"
                        label="Nearby Amenities"
                        variant="outlined"
                        {...register('amenities', { required: true })}
                        error={!!errors.amenities}
                        helperText={errors.amenities && "This field is required"}
                    />
                    <TextField
                        id="price"
                        label="Price"
                        type="number"
                        variant="outlined"
                        {...register('price', { required: true })}
                        error={!!errors.price}
                        helperText={errors.price && "This field is required"}
                    />
                    <Button type="submit" variant="contained" color="primary">List Property</Button>
                </form>
            </Box>
        </Box>
    );
};

export default PostProperty;
