import axios from "axios";

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.REACT_APP_CLOUDNARY_PRESET_NAME ?? '' );

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNARY_NAME}/image/upload`,
      formData
    );

    return {
      success: true,
      imageUrl: response.data.secure_url,
      message: "Your file uploaded successfully!"
    };
  } catch (err) {
    console.error("Upload Error", err);
    return {
      success: false,
      message: "Upload failed. Please try again."
    };
  }
};
