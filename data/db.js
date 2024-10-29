const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

// Ensure the environment variable is set, otherwise throw an error
if (!mongoURI) {
    console.error("Error: MONGO_URI environment variable is not set.");
    process.exit(1);
}

// Optional: Log the MongoDB URI to confirm it’s being loaded correctly
console.log(`Connecting to MongoDB at ${mongoURI}`);

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB:', err));

// Schema definitions remain the same
const commentSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    imagePath: String,
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

async function getPosts() {
    return await Post.find().sort({ createdAt: -1 });
}

async function addPost(title, content, imagePath) {
    const newPost = new Post({ title, content, imagePath });
    return await newPost.save();
}

async function updatePost(postId, title, content) {
    const post = await Post.findById(postId);
    if (post) {
        post.title = title;
        post.content = content;
        await post.save();
        return post;
    }
    return null;
}

async function deletePost(postId) {
    return await Post.findByIdAndDelete(postId);
}

async function addComment(postId, text) {
    const post = await Post.findById(postId);
    if (post) {
        post.comments.push({ text });
        await post.save();
        return post;
    }
    return null;
}

async function deleteComment(postId, commentId) {
    const post = await Post.findById(postId);
    if (post) {
        post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
        await post.save();
        return post;
    }
    return null;
}

module.exports = { getPosts, addPost, updatePost, deletePost, addComment, deleteComment };

