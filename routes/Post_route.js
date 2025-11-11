import express from "express";
import { createPost, getPost, editPost, deletePost, getAllPosts } from "../controllers/post_controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/post", createPost);
router.get("/post", getPost);
router.patch("/post", editPost);
router.delete("/post", deletePost);

export default router;
