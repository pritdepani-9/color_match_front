import React from "react";
import { useNavigate } from "react-router-dom";

const UserTypePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-yellow-100 via-pink-200 to-purple-200">
      <div className="bg-white/90 p-8 sm:p-10 lg:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center backdrop-blur-md">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-6">
          Are you a Balloon Artist (Wholesale) or Retail Customer?
        </h2>

        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Choose your user type to get started with personalized options.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <button
            onClick={() => navigate("/describe")}
            className="bg-blue-500 text-white py-3 px-6 rounded-xl text-lg shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
          >
            Balloon Artist
          </button>

          <button
            onClick={() => navigate("/describe")}
            className="bg-green-500 text-white py-3 px-6 rounded-xl text-lg shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
          >
            Retail Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypePage;
