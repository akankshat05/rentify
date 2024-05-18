import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerDashboard from './pages/SellerDashboard';
import PostProperty from './pages/PostProperty';
import BuyerDashboard from './pages/BuyerDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/seller-dashboard" element={<SellerDashboard />} />
      <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
      <Route path="/list-property" element={<PostProperty />} />
    </Routes>
  );
}

export default App;