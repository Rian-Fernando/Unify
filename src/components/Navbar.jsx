import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 text-gray-800 p-4 px-8 flex justify-between items-center shadow-sm fixed w-full z-10">
      <Link to="/" className="text-2xl font-semibold tracking-tight hover:opacity-80 transition-opacity" aria-label="Go to Unify homepage">
        Unify
      </Link>
      <div className="flex items-center gap-6 text-sm font-medium">
        {!user ? (
          <>
            <Link to="/" className="hover:text-blue-600 transition-colors" aria-label="Go to home page">
              Home
            </Link>
            <Link to="/login" className="hover:text-blue-600 transition-colors" aria-label="Login to your account">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/home" className="hover:text-blue-600 transition-colors" aria-label="View Events">
              Events
            </Link>
            <Link to="/create" className="hover:text-blue-600 transition-colors" aria-label="Create a new event">
              Create Event
            </Link>
            <button
              onClick={() => logout?.()}
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors px-3 py-1 rounded"
              aria-label="Logout of your account"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
