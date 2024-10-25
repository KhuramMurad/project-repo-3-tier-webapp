// app/server.js
const express = require('express');
const path = require('path');
const multer = require('multer');
const { getPosts, addPost, addComment, deleteComment, updatePost, deletePost } = require('../data/db');

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await getPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.post('/api/posts', upload.single('image'), async (req, res) => {
    try {
        const { title, content } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;  // Fixed line
        const newPost = await addPost(title, content, imagePath);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

app.put('/api/posts/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content } = req.body;
        const updatedPost = await updatePost(postId, title, content);
        if (updatedPost) {
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
    }
});

app.delete('/api/posts/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const deletedPost = await deletePost(postId);
        if (deletedPost) {
            res.status(200).json({ message: 'Post deleted' });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

app.post('/api/posts/:postId/comments', async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        const updatedPost = await addComment(postId, text);
        if (updatedPost) {
            res.status(201).json(updatedPost);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

app.delete('/api/posts/:postId/comments/:commentId', async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const updatedPost = await deleteComment(postId, commentId);
        if (updatedPost) {
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ error: 'Post or Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

