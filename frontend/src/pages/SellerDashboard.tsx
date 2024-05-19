import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardContent, Typography, TextField } from '@mui/material';

Modal.setAppElement('#root');
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function SellerDashboard() {
    const fetchProperties = async () => {
        const userid = localStorage.getItem('token');
        try {
            const response = await axios.get(`${BACKEND_URL}/api/properties/${userid}`);
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties');
        }
    };

    const [properties, setProperties] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProperty, setCurrentProperty] : any = useState(null);

    const handleEditClick = (property: any) => {
        setCurrentProperty({ ...property });
        setIsModalOpen(true);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setCurrentProperty((prevProperty: any) => ({
            ...prevProperty,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/api/properties/${currentProperty.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentProperty),
            });

            if (response.ok) {
                setProperties((prevProperties: any) =>
                    prevProperties.map((property: any) =>
                        property.id === currentProperty.id ? currentProperty : property
                    )
                );
                setIsModalOpen(false);
            } else {
                console.error('Failed to update property');
            }
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const confirmDelete = (property: any) => {
        const confirmDeletion = window.confirm('Are you sure you want to delete this property?');
        if (confirmDeletion) {
            deleteProperty(property.id);
        }
    };

    const deleteProperty = async (id: string) => {
        const userId = localStorage.getItem('token');
        axios
            .delete(`${BACKEND_URL}/api/properties/${id}/${userId}`)
            .then((response: any) => {
                console.log('Delete request successful');
                console.log(response.data);
                fetchProperties();
            })
            .catch((error: any) => {
                console.error('Error deleting resource:', error);
            });
    };

    return (
        <div>
            <h1>Seller Dashboard</h1>
            <Button>
                <Link to="/list-property" style={{ textDecoration: 'none' }}>
                    List a property
                </Link>
            </Button>
            {properties &&
                properties.map((property: any) => (
                    <Card key={property.id} style={{ marginBottom: '20px' }}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {property.title}
                            </Typography>
                            <Typography color="textSecondary">Description: {property.description}</Typography>
                            <Typography color="textSecondary">Area: {property.area}</Typography>
                            <Typography color="textSecondary">Bedrooms: {property.bedrooms}</Typography>
                            <Typography color="textSecondary">Bathrooms: {property.bathrooms}</Typography>
                            <Typography color="textSecondary">Amenities: {property.amenities}</Typography>
                            <Typography color="textSecondary">Price: {property.price}</Typography>
                            <Button onClick={() => handleEditClick(property)}>Update</Button>
                            <Button onClick={() => confirmDelete(property)}>Delete</Button>
                        </CardContent>
                    </Card>
                ))}
            {isModalOpen && currentProperty && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="Edit Property"
                    style={{
                        content: {
                            width: '60%',
                            margin: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                        },
                    }}
                >
                    <h2>Edit Property</h2>
                    <form onSubmit={handleSubmit} style={{ width: '60%' }}>
                        <TextField
                            label="Title"
                            name="title"
                            value={currentProperty.title}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                        <br />
                        <TextField
                            label="Description"
                            name="description"
                            value={currentProperty.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            style={{ width: '100%' }}
                        />
                        <br />
                        <TextField
                            label="Area"
                            name="area"
                            value={currentProperty.area}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                        <br />
                        <TextField
                            label="Bedrooms"
                            name="bedrooms"
                            type="number"
                            value={currentProperty.bedrooms}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                        <br />
                        <TextField
                            label="Bathrooms"
                            name="bathrooms"
                            type="number"
                            value={currentProperty.bathrooms}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                        <br />
                        <TextField
                            label="Amenities"
                            name="amenities"
                            value={currentProperty.amenities}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                        <br />
                        <TextField
                            label="Price"
                            name="price"
                            value={currentProperty.price}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                        <br />
                        <Button type="submit">Save</Button>
                        <Button type="button" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                    </form>
                </Modal>
            )}
        </div>
    );
}

export default SellerDashboard;
