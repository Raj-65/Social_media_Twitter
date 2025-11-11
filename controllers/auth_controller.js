import bcrypt from "bcrypt";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password)
      return res.status(400).json({ message: "Missing fields" });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(403).json({ message: "Forbidden, Account already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email: email.toLowerCase(), name, password: hashed });

    return res.status(201).json({ message: "Account Creation Successful", userID: user._id });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "Userdoes not exist" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Username/Password Incorrect" });

    return res.status(200).json({ message: "Login Successful", userID: user._id });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
