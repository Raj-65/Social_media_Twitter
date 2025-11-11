import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  postID: {
    type: Number,
    unique: true
  },
  postBody: {
    type: String,
    required: true
  },
  userID: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Auto-increment postID
postSchema.pre("save", async function (next) {
  if (this.postID) return next();

  const lastPost = await mongoose.model("Post").findOne().sort({ postID: -1 });
  this.postID = lastPost ? lastPost.postID + 1 : 1;

  next();
});

const Post = mongoose.model("Post", postSchema);
export default Post;
