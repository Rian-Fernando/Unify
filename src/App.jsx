import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import EventChat from './components/EventChat';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    // ⚠️ Do not wrap another <Router> in any child component. This is the single Router.
    <Router>
      <nav className="bg-blue-600 text-white p-4 flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/create">Create Event</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        {/* 🔐 Protected Home Page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
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