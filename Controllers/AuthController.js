import Admin from "../Models/AdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Check if admin exists
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({ msg: 'Admin not found' });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Password is incorrect' });
  }

  // Create JWT token
  const token = jwt.sign({ admin: admin._id }, process.env.secret, {
    expiresIn: process.env.expire,
  });

  // Return token
  res.json({ token ,
    admin: admin._id,
    email: admin.email,
  });
}