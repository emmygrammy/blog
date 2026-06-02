export const uploadBlogImage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "No image uploaded" });
    }

    // 1. upload to cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // 2. SAVE TO DATABASE (THIS IS THE FIX)
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
    res.status(500).json({ msg: error.message });
  }
};