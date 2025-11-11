import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userID: { type: Number, unique: true },
  name: { type: String ,required: true},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Auto-increment userID before saving
userSchema.pre("save", async function (next) {
  if (this.userID) return next(); // if already set, skip

  const lastUser = await mongoose.model("User").findOne().sort({ userID: -1 });

  this.userID = lastUser ? lastUser.userID + 1 : 1;

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
