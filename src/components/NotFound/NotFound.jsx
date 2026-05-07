// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-40 h-40 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            ← Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 mb-4">Or try these links:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products" className="text-blue-600 hover:text-blue-700 hover:underline">
              Products
            </Link>
            <Link to="/brands" className="text-blue-600 hover:text-blue-700 hover:underline">
              Brands
            </Link>
            <Link to="/cart" className="text-blue-600 hover:text-blue-700 hover:underline">
              Cart
            </Link>
            <Link to="/login" className="text-blue-600 hover:text-blue-700 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}