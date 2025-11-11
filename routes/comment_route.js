import express from "express";
import {
  createComment,
  getComment,
  editComment,
  deleteComment
} from "../controllers/comment_controller.js";

const router = express.Router();

router.post("/comment", createComment);
router.get("/comment", getComment);
router.patch("/comment", editComment);
router.delete("/comment", deleteComment);

export default router;
