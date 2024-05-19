# Rentify - Where Renting Meets Simplicity

Rentify is a web application designed to simplify the process of finding rental properties for both owners and tenants. It leverages Node.js and Express.js for the backend and Vite for the frontend, providing a fast and efficient user experience.

## Deployment setup

The application is deployed on render with url `https://rentify-wck9.onrender.com`

## Local setup

### Clone the Repository

```
git clone <repository-url>
```
### Backend Setup

- Change folder to backend
```
cd backend
```
- In `.env` file add the desired port
```sh
PORT = <your backend port>
```
- Run the server
```
npm start
```

### Frontend Setup

- Change folder to frontend
```
cd frontend
```
- In `.env` file add the desired backend url
```
VITE_BACKEND_URL = <your backend url>
```
- Run the server
```
npm run dev
```

- Use the following example credentials for login
```
Email - john.doe@example.com, Password - password123 (Buyer)
Email - alice.smith@example.com, Password - abc123 (Seller)
```
