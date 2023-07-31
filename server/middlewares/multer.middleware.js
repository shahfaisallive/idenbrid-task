import multer from "multer";
import { extname } from "path";

// Multer configuration for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalExtension = extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + '-' + uniqueSuffix + originalExtension);
  }
});

export const upload = multer({ storage });

