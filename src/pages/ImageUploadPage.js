import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../helper/helper";
import Toast from "../components/ToastComponent";


const ImageUploadPage = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [selectedColor, setSelectedColor] = useState(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file)
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);
      setSelectedColor(null);
    }
  };


  const handleNext = async () => {
    if (!file) return;
  
    const result = await uploadImageToCloudinary(file);

    console.log('success', result);
    
  
    if (result.success) {
      setToastMessage(result.message);
      setShowToast(true);
      localStorage.setItem("uploadedImage", result.imageUrl);
      setTimeout(() => {
        navigate("/user-type");
      }, 1500);
    } else {
      setToastMessage(result.message);
      setShowToast(true);
    }
  };
  



  const handleImageClick = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const rgbToHex = (r, g, b) =>
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("");

    const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
    setSelectedColor(hexColor);
  };

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = imageRef.current;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
    }
  }, [image]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-blue-50 via-purple-100 to-pink-100">
      <div className="bg-white/90 p-8 sm:p-10 rounded-2xl shadow-2xl max-w-lg w-full text-center backdrop-blur-md">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-6">Upload Your Image</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Select an image to upload and preview it before proceeding.
        </p>

        <div className="mb-8">
          <label
            htmlFor="image-upload"
            className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl text-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            📸 Choose Image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
        </div>

        {image && (
          <div className="relative mb-6">
            <img
              ref={imageRef}
              src={image}
              alt="preview"
              onClick={handleImageClick}
              className="mx-auto w-48 sm:w-72 lg:w-80 h-48 sm:h-72 lg:h-80 object-cover rounded-xl shadow-lg cursor-crosshair"
            />
            <canvas ref={canvasRef} className="hidden"></canvas>
          </div>
        )}

        {selectedColor && (
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-700">
              You selected color: <span style={{ color: selectedColor }}>{selectedColor}</span>
            </p>
            <div
              className="mt-2 w-16 h-16 mx-auto rounded-full border-2 border-gray-300 shadow"
              style={{ backgroundColor: selectedColor }}
            ></div>
          </div>
        )}

        <button
          className="bg-green-500 text-white py-3 px-6 rounded-xl text-lg shadow-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          onClick={handleNext}
          disabled={!image}
        >
          Next
        </button>

        {showToast && (
  <Toast
    message={toastMessage}
    onClose={() => setShowToast(false)}
  />
)}
      </div>
    </div>
  );
};

export default ImageUploadPage;
