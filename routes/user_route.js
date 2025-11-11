import express from "express";
import { getUserDetails, getAllUsers } from "../controllers/user_controller.js";

const router = express.Router();

router.get("/user", getUserDetails);
router.get("/users", getAllUsers);

export default router;
