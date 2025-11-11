import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";

// Route imports
import authRoutes from "./routes/auth_route.js";
import userRoutes from "./routes/user_route.js";
import postRoutes from "./routes/Post_route.js";
import commentRoutes from "./routes/comment_route.js";

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Route mounting
app.use("/", postRoutes);           // User feed + post operations
app.use("/", authRoutes);       // Signup + Login
app.use("/", userRoutes);       // Single and all users
app.use("/", commentRoutes); // Comment operations

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
