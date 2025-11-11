import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/twitter_like_app";

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
