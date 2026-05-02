import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      url: { type: String, default: null },
      public_id: { type: String, default: null },
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

// 🔍 Search index
blogSchema.index({ title: "text", content: "text" });

// 🗑️ Delete hook (findOneAndDelete)
blogSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (doc?.image?.public_id) {
      await cloudinary.uploader.destroy(doc.image.public_id);
    }
  } catch (err) {
    console.error("Cloudinary delete failed:", err.message);
  }
});

// 🗑️ Delete hook (deleteOne)
blogSchema.post("deleteOne", { document: true }, async function () {
  try {
    if (this?.image?.public_id) {
      await cloudinary.uploader.destroy(this.image.public_id);
    }
  } catch (err) {
    console.error("Cloudinary delete failed:", err.message);
  }
});

export default mongoose.model("Blog", blogSchema);