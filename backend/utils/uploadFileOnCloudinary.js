import cloudinary from "./cloudinary.config.js";

const uploadFileOnCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    throw error;
  }
};

export default uploadFileOnCloudinary;
