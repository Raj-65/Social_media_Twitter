import User from "../models/User.js";
import Post from "../models/Post.js";

// GET USER DETAILS
export const getUserDetails = async (req, res) => {
  try {
    const userID = Number(req.query.userID);
    if (!userID) return res.status(400).send("userID is required");

    const user = await User.findOne({ userID });
    if (!user) return res.status(404).send("User does not exist");

    return res.json({
      name: user.name,
      userID: user.userID,
      email: user.email
    });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const result = await Promise.all(
      users.map(async (u) => {
        // const posts = await Post.find({ user: u._id }).select("postBody date");
        return { name: u.name, userID: u.userID, email: u.email };
      })
    );

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
