// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../services/firebase'; // Assuming auth is set up in firebase.js

const ProtectedRoute = ({ children }) => {
  if (!auth.currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }
  
  return children; // Render children (the actual page) if authenticated
};

export default ProtectedRoute;