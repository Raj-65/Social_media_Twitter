import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentID: {
    type: Number,
    unique: true
  },
  commentBody: {
    type: String,
    required: true
  },
  postID: {
    type: Number,
    required: true
  },
  userID: {
    type: Number,
    required: true
  }
});

// Auto-increment commentID
commentSchema.pre("save", async function (next) {
  if (this.commentID) return next();

  const lastComment = await mongoose.model("Comment").findOne().sort({ commentID: -1 });
  this.commentID = lastComment ? lastComment.commentID + 1 : 1;

  next();
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
