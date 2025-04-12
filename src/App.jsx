import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import EventChat from './components/EventChat';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        {/* 🔓 Public Route */}
        <Route
          path="/"
          element={
            user ? <Home /> : <Landing />
          }
        />

        {/* 🔐 Protected Routes */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event/:eventId/chat"
          element={
            <ProtectedRoute>
              <EventChat />
            </ProtectedRoute>
          }
        />

        {/* 🔓 Public Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;