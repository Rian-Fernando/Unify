import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-white flex items-center justify-center px-6">
      <div className="backdrop-blur-md bg-white/70 rounded-xl p-12 shadow-lg text-center animate-fade-in max-w-2xl">
        <h1 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight">
          Welcome to Unify
        </h1>
        <h2 className="text-xl text-blue-700 font-semibold mb-6">
          Discover events, build connections, and stay informed — all in one place.
        </h2>
        <p className="text-lg text-gray-700 mb-10 leading-relaxed">
          Unify is your university's event companion. Explore activities, join communities, and never miss out on what's happening around you.
        </p>
        <div className="flex justify-center gap-6">
          <Link to="/login">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg shadow hover:bg-blue-700 transition duration-200">
              Login
            </button>
          </Link>
          <Link to="/demo">
            <button className="bg-gray-200 text-gray-900 px-6 py-2 rounded-lg text-lg shadow hover:bg-gray-300 transition duration-200">
              Try a Demo
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
