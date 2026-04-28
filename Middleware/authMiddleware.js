import jwt from "jsonwebtoken";
import Admin from "../Models/AdminModel.js";

export const protectAdmin = async (req, res, next) => {
  let token;

  try {
    // 1. Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. If no token
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach admin to request
    req.admin = await Admin.findById(decoded.id).select("-password");

    if (!req.admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    // 5. Move to next middleware/controller
    next();
    
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};