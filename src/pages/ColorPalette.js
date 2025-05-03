import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const ColorPalette = () => {
  const location = useLocation();
  const [selectedColor, setSelectedColor] = useState(null);
  const [inspiredColors, setInspiredColors] = useState([]);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const image = location.state?.image;

  const handleImageLoad = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };

  const getPixelColor = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    setSelectedColor(hex);
  };

  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  const handleInspire = () => {
    const randomColors = Array.from({ length: 5 }, () =>
      "#" + Math.floor(Math.random() * 16777215).toString(16)
    );
    setInspiredColors(randomColors);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Pick a Color</h1>
      {image ? (
        <>
          <div className="relative inline-block">
            <img
              ref={imgRef}
              src={image}
              alt="Uploaded"
              onLoad={handleImageLoad}
              onClick={getPixelColor}
              className="cursor-crosshair max-w-full border"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0"
              style={{ pointerEvents: "none" }}
            />
          </div>

          {selectedColor && (
            <div className="mt-4 text-lg">
              You selected color:{" "}
              <span
                className="inline-block w-6 h-6 rounded-full mr-2 align-middle"
                style={{ backgroundColor: selectedColor }}
              ></span>
              <strong>{selectedColor}</strong>
            </div>
          )}

          <button
            onClick={handleInspire}
            className="mt-6 btn"
          >
            Inspire Me
          </button>

          {inspiredColors.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {inspiredColors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 rounded"
                  style={{ backgroundColor: color }}
                  title={color}
                ></div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p>No image found. Please upload one first.</p>
      )}
    </div>
  );
};

export default ColorPalette;
