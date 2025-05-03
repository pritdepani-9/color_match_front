import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showInspiration, setShowInspiration] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const inspirationColors = [
    "#FF5733",
    "#33FFCE",
    "#FFC300",
    "#C70039",
    "#900C3F",
    "#581845",
    "#8DFF33",
    "#3380FF",
  ];

  const handleUploadClick = () => navigate("/upload");

  const handleInspireClick = () => setShowInspiration(!showInspiration);

  const handleColorSelect = (color) => setSelectedColor(color);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 transition-all duration-300"
      style={{
        background: `linear-gradient(to bottom right, ${
          selectedColor || "#f5f5f5"
        }, #ffffff)`,
      }}
    >
      <div className="bg-white/80 rounded-3xl shadow-xl p-6 sm:p-10 max-w-xl w-full text-center backdrop-blur-md">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-800 tracking-tight transition-all duration-500 hover:scale-105">
          🎨 Event Color Match
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8">
          Find the perfect color theme for your next event!
        </p>

        <div className="flex justify-center gap-4 sm:gap-6 mb-8 flex-wrap">
          <button
            onClick={handleUploadClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            📤 Upload an Image
          </button>

          <button
            onClick={handleInspireClick}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            ✨ Inspire Me
          </button>
        </div>

        {showInspiration && (
          <div className="flex flex-wrap gap-5 mt-6 justify-center transition-all duration-500">
            {inspirationColors.map((color, index) => (
              <div
                key={index}
                className={`w-16 h-16 rounded-full border-4 cursor-pointer shadow-lg transform hover:scale-110 transition-all duration-300 ${
                  selectedColor === color
                    ? "border-black scale-110"
                    : "border-white"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              ></div>
            ))}
          </div>
        )}

        {selectedColor && (
          <div className="mt-8 text-xl font-semibold text-gray-800 flex flex-col items-center gap-2">
            You selected:{" "}
            <div
              className="px-4 py-2 rounded-full shadow text-white text-lg"
              style={{ backgroundColor: selectedColor }}
            >
              {selectedColor}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
