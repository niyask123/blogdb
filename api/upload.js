// api/upload.js

const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();
app.use(express.json());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use Cloudinary for image storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    allowedFormats: ['jpg', 'jpeg', 'png'],
  },
});
const upload = multer({ storage });

// Define route for file upload
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file.path;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading image' });
  }
});

module.exports = app;
