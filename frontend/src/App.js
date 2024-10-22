import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListing from './components/ProductListing';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard'
import ClientDashboard from './components/ClientDashboard'
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/admin/dashboard" Component={AdminDashboard} />
        <Route path="/client/dashboard" component={ClientDashboard} />
        <Route path="/" element={<ProductListing />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
