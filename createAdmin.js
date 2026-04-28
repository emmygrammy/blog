import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./Models/AdminModel.js";

dotenv.config();

const run = async () => {
  const adminEmail = "ojeabuo24@gmail.com";
  const adminPassword = "08135301934";

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await Admin.create({
      email: adminEmail,
      password: hashedPassword,
    });

    console.log("Admin created successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

run();