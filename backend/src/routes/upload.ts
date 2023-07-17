// routes/upload.ts

import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${uniqueSuffix}${fileExtension}`;
    cb(null, fileName);
  },
});

// Create multer upload instance
const upload = multer({ storage });

// Define the POST route for file upload
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Return the file path or URL
  const filePath = `/uploads/${req.file.filename}`;
  res.status(200).json({ filePath });
});

export default router;
