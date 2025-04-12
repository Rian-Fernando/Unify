import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-white flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/70 rounded-xl p-10 shadow-lg text-center animate-fade-in">
        <h1 className="text-5xl font-semibold text-gray-900 mb-2 tracking-tight">
          Unify
        </h1>
        <h2 className="text-lg text-blue-700 font-medium mb-6">A campus-first social platform</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-lg mx-auto leading-relaxed">
          Easily explore campus events, connect with peers, and never miss out on what matters most at your university.
        </p>
        <div className="flex justify-center gap-4">
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
