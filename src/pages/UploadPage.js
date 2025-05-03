import React, { useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import ColorPalette from "./ColorPalette";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState([]);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setColors([]);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const getColors = (colors) => {
    setColors((prev) => [...new Set([...prev, ...colors])]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">🎨 Upload an Image</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />

      {image && (
        <>
          <ColorExtractor getColors={getColors}>
            <img
              src={image}
              alt="Uploaded"
              className="max-w-xs rounded-lg shadow-lg"
            />
          </ColorExtractor>
          <ColorPalette colors={colors} />
        </>
      )}

      <button
        onClick={() => navigate("/products", { state: { colors } })}
        disabled={!image}
        className={`mt-6 px-6 py-3 rounded-lg text-white font-semibold ${
          image ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default UploadPage;
