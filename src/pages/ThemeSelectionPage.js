import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import eventValue from "../eventValueData";

const ThemeSelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const eventDesc = location.state?.desc;

  const themes = eventValue[eventDesc] || [];

  const handleThemeClick = (theme) => {
    navigate("/products", { state: { theme } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-200">
      <div className="bg-white/90 p-8 sm:p-10 lg:p-12 rounded-3xl shadow-2xl max-w-lg sm:max-w-xl lg:max-w-2xl w-full text-center backdrop-blur-md">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-6">
          Themes for "{eventDesc}"
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8">
          Select the theme that best fits your occasion!
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {themes.length > 0 ? (
            themes.map((theme, idx) => (
              <div
                key={idx}
                onClick={() => handleThemeClick(theme)} // Pass theme to ProductPage
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg sm:text-xl lg:text-2xl font-semibold py-4 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-10 rounded-2xl cursor-pointer shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                {theme}
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-600">No themes available for this event.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelectionPage;
