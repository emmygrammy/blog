import Admin from "../Models/AdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
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
  const token = jwt.sign({ admin: admin._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // Return token
  res.status(200).json({ 
    token ,
    admin: admin._id,
    email: admin.email,
    msg: 'Login successful',
  });
} catch (error) {
  console.error(error.message);
  res.status(500).json({ msg: 'Server error' });
  }
}