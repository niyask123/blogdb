// server.js
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cloudinary = require('./config'); // Path to your config.js file
const { PrismaClient } = require('@prisma/client');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const prisma = new PrismaClient();

app.use(express.json());

app.post('/posts', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const newPost = await prisma.post.create({
      data: {
        heading: req.body.heading,
        title: req.body.title,
        description: req.body.description,
        blogUrlLinks: req.body.blogUrlLinks,
        blogPostDate: new Date(req.body.blogPostDate),
        imageUrl: imageUrl,
      },
    });

    res.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Error creating post' });
  }
});

app.put('/posts/update', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(req.body.id, 10) },
      data: {
        heading: req.body.heading,
        title: req.body.title,
        description: req.body.description,
        blogUrlLinks: req.body.blogUrlLinks,
        blogPostDate: new Date(req.body.blogPostDate),
        imageUrl: imageUrl || req.body.imageUrl,
      },
    });

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Error updating post' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    await prisma.post.delete({ where: { id: parseInt(req.params.id, 10) } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Error deleting post' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
