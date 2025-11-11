import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

// CREATE COMMENT
export const createComment = async (req, res) => {
  try {
    const { commentBody, postID, userID } = req.body;

    const user = await User.findOne({ userID: Number(userID) });
    if (!user) return res.status(404).send("User does not exist");

    const post = await Post.findOne({ postID: Number(postID) });
    if (!post) return res.status(404).send("Post does not exist");

    await Comment.create({
      commentBody,
      postID: Number(postID),
      userID: Number(userID)
    });

    return res.send("Comment created successfully");
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

// GET COMMENT
export const getComment = async (req, res) => {
  try {
    const commentID = Number(req.query.commentID);

    const comment = await Comment.findOne({ commentID });
    if (!comment) return res.status(404).send("Comment does not exist");

    const user = await User.findOne({ userID: comment.userID });

    return res.json({
      commentID: comment.commentID,
      commentBody: comment.commentBody,
      commentCreator: {
        userID: user.userID,
        name: user.name
      }
    });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

// EDIT COMMENT
export const editComment = async (req, res) => {
  try {
    const { commentBody, commentID } = req.body;

    const comment = await Comment.findOne({ commentID: Number(commentID) });
    if (!comment) return res.status(404).send("Comment does not exist");

    comment.commentBody = commentBody;
    await comment.save();

    return res.send("Comment edited successfully");
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

// DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const commentID = Number(req.query.commentID);

    const comment = await Comment.findOne({ commentID });
    if (!comment) return res.status(404).send("Comment does not exist");

    await Comment.deleteOne({ commentID });

    return res.send("Comment deleted");
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};
