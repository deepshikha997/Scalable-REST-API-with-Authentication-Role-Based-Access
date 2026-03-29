const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require("../controllers/postController");

router.post("/", auth, createPost);
router.get("/", auth, getPosts);
router.get("/:id", auth, getPost);
router.put("/:id", auth, updatePost);

// Delete posts: admin or owner in controller
router.delete("/:id", auth, role("admin"), deletePost);

module.exports = router;