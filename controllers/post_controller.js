import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { postBody, userID } = req.body;

    const user = await User.findOne({ userID: Number(userID) });
    if (!user) return res.status(404).send("User does not exist");

    await Post.create({
      postBody,
      userID: Number(userID)
    });

    return res.send("Post created successfully");
  } catch (error) {
    console.error("CREATE POST ERROR:", error);
    return res.status(500).send("Server Error");
  }
};

// GET POST
export const getPost = async (req, res) => {
  try {
    const postID = Number(req.query.postID);
    const post = await Post.findOne({ postID });

    if (!post) return res.status(404).send("Post does not exist");

    const comments = await Comment.find({ postID });
    const user = await User.findOne({ userID: post.userID });

    return res.json({
      postID: post.postID,
      postBody: post.postBody,
      date: post.date,
      comments: await Promise.all(
        comments.map(async (c) => {
          const commentUser = await User.findOne({ userID: c.userID });
          return {
            commentID: c.commentID,
            commentBody: c.commentBody,
            commentCreator: {
              userID: commentUser.userID,
              name: commentUser.name
            }
          };
        })
      )
    });
  } catch (error) {
    console.error("GET POST ERROR:", error);
    return res.status(500).send("Server Error");
  }
};

// EDIT POST
export const editPost = async (req, res) => {
  try {
    const { postBody, postID } = req.body;

    const post = await Post.findOne({ postID: Number(postID) });
    if (!post) return res.status(404).send("Post does not exist");

    post.postBody = postBody;
    await post.save();

    return res.send("Post edited successfully");
  } catch (error) {
    console.error("EDIT POST ERROR:", error);
    return res.status(500).send("Server Error");
  }
};

// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const postID = Number(req.query.postID);
    const post = await Post.findOne({ postID });

    if (!post) return res.status(404).send("Post does not exist");

    await Post.deleteOne({ postID });

    return res.send("Post deleted");
  } catch (error) {
    console.error("DELETE POST ERROR:", error);
    return res.status(500).send("Server Error");
  }
};

// GET ALL POSTS (USER FEED)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ date: -1 }); //sort by date descending

    return res.json(
      await Promise.all(
        posts.map(async (p) => {
          const user = await User.findOne({ userID: p.userID });
          return {
            postID: p.postID,
            postBody: p.postBody,
            date: p.date,
            user: { userID: user.userID, name: user.name }
          };
        })
      )
    );
  } catch (error) {
    console.error("GET ALL POSTS ERROR:", error);
    return res.status(500).send("Server Error");
  }
};
