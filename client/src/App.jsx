import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import SocketManager from './components/SocketManager';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';  // <- public landing page
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import DoctorDashboard from './pages/DoctorDashboard';

import './styles/theme.css';
import './styles/globals.css';
import './styles/auth.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <SocketManager />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctor"
              element={
                <PrivateRoute roles={['doctor']}>
                  <DoctorDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
