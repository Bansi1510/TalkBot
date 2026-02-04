import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImage = async (filepath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: "image",
      folder: "uploads/images",
    });

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    return result.secure_url;
  } catch (error) {

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    console.error("Image upload failed:", error);
    throw new Error("Only image files are allowed");
  }
};

export default uploadImage;
