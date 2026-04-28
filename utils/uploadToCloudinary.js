import cloudinary from "../config/cloudinary.js";
import sharp from "sharp";

export const uploadToCloudinary = async (fileBuffer) => {
    // 🗜️ compress image first
    const compressedBuffer = await sharp(fileBuffer)
        .resize({ width: 1000 }) // optional resize
        .jpeg({ quality: 70 })   // compression
        .toBuffer();

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "blog_images" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        ).end(compressedBuffer);
    });
};