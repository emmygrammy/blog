import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ PUT IT HERE (after schema, before export)
blogSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (doc?.image?.public_id) {
      await cloudinary.uploader.destroy(doc.image.public_id);
    }
  } catch (err) {
    console.error("Cloudinary delete failed:", err.message);
  }
});

// ✅ THEN export model
export default mongoose.model("Blog", blogSchema);