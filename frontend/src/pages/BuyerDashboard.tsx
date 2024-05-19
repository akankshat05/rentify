import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import React Modal library
import { Card, CardContent, Typography, Button } from '@mui/material'; // Import Material-UI components
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

Modal.setAppElement('#root');
function BuyerDashboard() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getAllProperties');
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties');
            }
        };
        fetchProperties()
    }, [properties]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [seller, setSellerDetails]: any = useState({});

    const handleInterestedClick = async (sellerid: any) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/getSellerDetails/${sellerid}`);
            setSellerDetails(response.data);
            console.log(response.data);
            setModalIsOpen(true); // Show the modal
        } catch (error) {
            console.error('Error fetching seller details');
        }
    };

    return (
        <div style={{ color: '#000000', backgroundColor: '#ffffff', padding: '20px' }}>
            <h1>Buyer Dashboard</h1>
            {properties.map((property: any) => (
                <Card key={property.id} style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" component="h2">{property.title}</Typography>
                        <Typography color="textSecondary">Description: {property.description}</Typography>
                        <Typography color="textSecondary">Area: {property.area}</Typography>
                        <Typography color="textSecondary">Bedrooms: {property.bedrooms}</Typography>
                        <Typography color="textSecondary">Bathrooms: {property.bathrooms}</Typography>
                        <Typography color="textSecondary">Amenities: {property.amenities}</Typography>
                        <Typography color="textSecondary" mb="5px">Price: {property.price}</Typography>
                        <Button onClick={() => handleInterestedClick(property.userId)} variant="contained" color="primary">I'm Interested</Button>
                    </CardContent>
                </Card>
            ))}
            {/* Modal */}
            <Dialog
            open={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            aria-labelledby="seller-details-title"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="seller-details-title">Seller Details</DialogTitle>
            <DialogContent
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#000000', // Adjust text color for dialog content
                    backgroundColor: '#ffffff', // Adjust background color for dialog content
                }}
            >
               <Typography variant="body1" component="p">
                    Name: {seller.firstName} {seller.lastName}
                </Typography>
                <Typography variant="body1" component="p">
                    Phone: {seller.phone}
                </Typography>
                <Typography variant="body1" component="p">
                    Email: {seller.email}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setModalIsOpen(false)} variant="contained" color="secondary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default BuyerDashboard;
