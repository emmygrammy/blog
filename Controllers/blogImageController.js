import Blog from '../Models/blogModel.js';
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";


// ADD IMAGE TO BLOG

// export const uploadBlogImage = async (req, res) => {
//     try {
//         const blog = await Blog.findById(req.params.id);

//         if (!blog) {
//             return res.status(404).json({ msg: "Blog not found" });
//         }

//         if (blog.admin.toString() !== req.admin._id.toString()) {
//             return res.status(403).json({ msg: "Not authorized" });
//         }

//         if (!req.file) {
//             return res.status(400).json({ msg: "No image uploaded" });
//         }

//         console.log("FILE:", req.file); // good debug

//         const result = await uploadToCloudinary(req.file.buffer);

//         blog.image = {
//             url: result.secure_url,
//             public_id: result.public_id,
//         };

//         await blog.save();

//         res.status(200).json({
//             success: true,
//             blog,
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: error.message });
//     }
// };
export const uploadBlogImage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        msg: "Blog not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        msg: "No image uploaded",
      });
    }

    // Upload new image first
    const result = await uploadToCloudinary(req.file.buffer);

    // Delete old image (if any)
    if (blog.image?.public_id) {
      try {
        await cloudinary.uploader.destroy(
          blog.image.public_id
        );
      } catch (err) {
        console.error(
          "Failed to delete old image:",
          err.message
        );
      }
    }

    // Save new image
    blog.image = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: blog,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      msg: error.message,
    });
  }
};


// UPDATE BLOG IMAGE (replace)
// export const updateBlogImage = async (req, res) => {
//     try {
//         const blog = await Blog.findById(req.params.id);

//         if (!blog) {
//             return res.status(404).json({ msg: "Blog not found" });
//         }

//         if (blog.admin.toString() !== req.admin._id.toString()) {
//             return res.status(403).json({ msg: "Not authorized" });
//         }

//         if (!req.file) {
//             return res.status(400).json({ msg: "No image uploaded" });
//         }

//         // delete old image
//         if (blog.image?.public_id) {
//             await cloudinary.uploader.destroy(blog.image.public_id);
//         }

//         const result = await uploadToCloudinary(req.file.buffer);

//         blog.image = {
//             url: result.secure_url,
//             public_id: result.public_id,
//         };

//         await blog.save();

//         res.status(200).json({
//             success: true,
//             blog,
//         });

//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// };
export const updateBlogImage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        msg: "Blog not found",
      });
    }

    if (blog.admin.toString() !== req.admin._id.toString()) {
      return res.status(403).json({
        msg: "Not authorized",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        msg: "No image uploaded",
      });
    }

    // Store old public_id
    const oldPublicId = blog.image?.public_id;

    // Upload new image first
    const result = await uploadToCloudinary(req.file.buffer);

    // Update database
    blog.image = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await blog.save();

    // Delete old image after successful upload + save
    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
      } catch (err) {
        console.error(
          "Failed to delete old image:",
          err.message
        );
      }
    }

    res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

// DELETE IMAGE ONLY
export const deleteBlogImage = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ msg: "Blog not found" });
        }

        if (blog.admin.toString() !== req.admin._id.toString()) {
            return res.status(403).json({ msg: "Not authorized" });
        }

        if (blog.image?.public_id) {
            await cloudinary.uploader.destroy(blog.image.public_id);
        }

        blog.image = null;

        await blog.save();

        res.status(200).json({
            success: true,
            msg: "Image deleted",
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};