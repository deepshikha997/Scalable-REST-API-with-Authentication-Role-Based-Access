const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const post = await Post.create({
    ...req.body,
    user: req.user.id
  });
  res.json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate("user", "name email role");
  res.json(posts);
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", "name email role");
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  // only owner or admin
  if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  Object.assign(post, req.body);
  await post.save();
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  // only owner or admin
  if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  await post.deleteOne();
  res.json({ message: "Deleted" });
};
