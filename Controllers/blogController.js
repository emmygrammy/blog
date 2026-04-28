
import Blog from '../Models/blogModel.js';

//create blog (admin only)
export const createBlog = async (req, res) => {

  try {
    const { title, content } = req.body;

    const post = await Blog.create(
        {
            title,
            content,
            admin: req.user.id,
        }
    );
    res.status(201).json({ 
        msg: 'Blog created', 
        post });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


//get blogs(public access)
export const getBlogs = async (req, res) => {
    try {
        const posts = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ 
            msg: 'Blogs retrieved', 
            posts });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


//get blog by id (public access)
export const getSingleBlog = async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'post  not found' });
        }
        res.status(200).json({ 
            msg: 'Blog retrieved', 
            post });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//update blog (admin only)
export const updateBlog = async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        if (post.admin.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        const updatedPost = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            post: updatedPost
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//delete blog (admin only)
export const deleteBlog = async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'post  not found' });
        }
        
        if (post.admin.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }   
        
        await post.deleteOne();
        res.status(200).json({ msg: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

