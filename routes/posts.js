import express from "express";
const router = express.Router();
import { getPosts, createPosts, updatePost,deletePost, likePost } from "../controllers/posts.js";

router.get("/", getPosts);
router.post("/", createPosts);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;