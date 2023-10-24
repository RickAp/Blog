import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
    const posts = await Post.find().populate('user');
    res.json(posts);
};

export const getPost = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('user');

    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
};

export const createPost = async (req, res) => {
    const { title, author, date, content } = req.body;
    const newPost = new Post({
        title,
        author,
        date,
        content,
        user: req.user.id
    });
    const newSavedPost = await newPost.save();
    res.json(newSavedPost);
};

export const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
 
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "You are not authorized to delete this post" });
    }
    await Post.findByIdAndDelete(req.params.id);
    return res.sendStatus(204);
};

export const updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
};