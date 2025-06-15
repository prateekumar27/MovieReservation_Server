import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

// export const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}` + file.originalname);
//   },
// });


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    format: async (req, file) => {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = file.mimetype.split("/")[1];
      if (allowedExtensions.includes(fileExtension)) {
        return fileExtension;
      }
      throw new Error("Invalid file type");
    },
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

// ✅ THIS IS WHAT YOU WERE MISSING
export const upload = multer({ storage });
