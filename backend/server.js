const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 5000
let users = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      phone: "123-456-7890",
      role: "buyer"
    },
    {
      id: 100,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      password: "abc123",
      phone: "987-654-3210",
      role: "seller"
    },
    {
      id: 200,
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@example.com",
      password: "securePassword",
      phone: "555-123-4567",
      role: "seller"
    }
  ];
    
let properties = [
    {
        id: "1",
        userId: 100,
        title: "Elegant East Hampton Retreat",
        description: "This exquisite home offers a blend of modern luxury and classic charm with an expansive living space and a gourmet kitchen.",
        location: "East Hampton, NY",
        area: "4,500 sq ft",
        bedrooms: 5,
        bathrooms: 6,
        amenities: "Pool, Spa, Outdoor Kitchen, Home Theater, Landscaped Gardens",
        price: "$50,000/month"
    },
    {
        id: "2",
        userId: 100,
        title: "Chic Downtown Penthouse",
        description: "Located in the heart of Toronto, this penthouse offers stunning city views and top-tier amenities.",
        location: "Toronto, ON",
        area: "3,200 sq ft",
        bedrooms: 4,
        bathrooms: 5,
        amenities: "Private Elevator, Rooftop Terrace, Gym, Concierge Service",
        price: "$25,000/month"
    },
    {
        id: "3",
        userId: 100,
        title: "Luxurious Parisian Apartment",
        description: "A beautifully furnished apartment with classic Parisian charm, high ceilings, and modern finishes.",
        location: "Paris, Ile-De-France",
        area: "2,500 sq ft",
        bedrooms: 3,
        bathrooms: 3,
        amenities: "Balcony, Fireplace, Fully Equipped Kitchen, Proximity to Cultural Landmarks",
        price: "€15,000/month"
    },
    {
        id: "4",
        userId: 100,
        title: "Mountain Lodge with Scenic Views",
        description: "This rustic yet luxurious lodge offers breathtaking mountain views and high-end amenities.",
        location: "Aspen, CO",
        area: "5,000 sq ft",
        bedrooms: 6,
        bathrooms: 7,
        amenities: "Ski-in/ski-out Access, Hot Tub, Game Room, Large Outdoor Deck",
        price: "$60,000/month"
    },
    {
        id: "5",
        userId: 100,
        title: "Modern Beverly Hills Mansion",
        description: "A contemporary mansion featuring state-of-the-art design and luxurious amenities.",
        location: "Los Angeles, CA",
        area: "6,000 sq ft",
        bedrooms: 7,
        bathrooms: 8,
        amenities: "Infinity Pool, Home Cinema, Wine Cellar, Smart Home Technology",
        price: "$80,000/month"
    },
    {
        id: "6",
        userId: 200,
        title: "Luxury Condo in Central London",
        description: "An elegant condo located in the heart of London with stunning city views and modern amenities.",
        location: "London, UK",
        area: "2,800 sq ft",
        bedrooms: 3,
        bathrooms: 4,
        amenities: "24/7 Concierge, Fitness Center, Heated Indoor Pool, Underground Parking",
        price: "£18,000/month"
    },
];

app.post('/api/auth/register', (req, res) => {
    const { firstName, lastName, email, password, phone, role } = req.body;
    if (users.find(user => user.email === email)) {
        return res.status(400).send('User already exists');
    }
    const user = { id: users.length + 1, firstName, lastName, email, password, phone, role };
    users.push(user);
    res.status(201).send('User registered');
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(400).send('Invalid credentials');
    }
    res.json({ token: user.id, user });
});

app.put('/api/properties/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, location, area, bedrooms, bathrooms, amenities, price } = req.body;

    const property = properties.find(p => p.id === id);
    if (!property) {
        return res.status(404).send('Property not found');
    }
    property.title = title !== undefined ? title : property.title;
    property.description = description !== undefined ? description : property.description;
    property.location = location !== undefined ? location : property.location;
    property.area = area !== undefined ? area : property.area;
    property.bedrooms = bedrooms !== undefined ? bedrooms : property.bedrooms;
    property.bathrooms = bathrooms !== undefined ? bathrooms : property.bathrooms;
    property.amenities = amenities !== undefined ? amenities : property.amenities;
    property.price = price !== undefined ? price : property.price;

    res.status(200).send('Property updated');
});

app.post('/api/properties/:sellerId', (req, res) => {
    const { title,
        description,
        location,
        area,
        bedrooms,
        bathrooms,
        amenities,
        price
    } = req.body;
    const userid = parseInt(req.params.sellerId);
    const id = uuidv4();
    const property = { 
        userId: userid, 
        id: id,
        title,
        description,
        location,
        area,
        bedrooms,
        bathrooms,
        amenities,
        price };
    properties.push(property);
    let filteredProperties = properties.filter(property => property.userId === userid);
    console.log(filteredProperties)
    res.status(201).send(filteredProperties);
});

// get api for seller - only seller's properties are sent
app.get('/api/properties/:sellerId', (req, res) => {
    const userid = parseInt(req.params.sellerId);
    let filteredProperties = properties.filter(property => property.userId === userid);
    res.json(filteredProperties);
});

// get api for buyer - all properties are sent
app.get('/api/getAllProperties', (req, res) => {
    res.json(properties);
});

app.get('/api/getSellerDetails/:sellerId', (req, res) => {
    const userid = parseInt(req.params.sellerId);
    let seller = users.find(user => user.id === userid);
    res.json(seller);
});

app.delete('/api/properties/:id/:sellerId', (req, res) => {
    properties = properties.filter(property => property.id !== req.params.id);
    res.json(properties)
});

app.listen(PORT, () => {
    console.log('Server running on port 5000');
});