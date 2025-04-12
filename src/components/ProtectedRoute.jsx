import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (err) => {
        console.error("Auth check failed:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section className="flex items-center justify-center h-screen bg-white">
        <p className="text-base text-gray-500 tracking-wide">Authenticating your session...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex items-center justify-center h-screen bg-white">
        <p className="text-base text-red-500 tracking-wide">Authentication failed. Please try again.</p>
      </section>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;