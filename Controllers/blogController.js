import Blog from '../Models/blogModel.js';

// CREATE BLOG (content only)
export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        const blog = await Blog.create({
            title,
            content,
            admin: req.admin._id,
        });

        res.status(201).json({
            success: true,
            blog,
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


// GET ALL BLOGS
export const getBlogs = async (req, res) => {
    try {
        const posts = await Blog.find().sort({ createdAt: -1 });

        res.status(200).json({
            msg: 'Blogs retrieved',
            posts
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


// GET SINGLE BLOG
export const getSingleBlog = async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.status(200).json({
            msg: 'Blog retrieved',
            post
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


// UPDATE BLOG CONTENT ONLY
export const updateBlog = async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
         
        if (post.admin.toString() !== req.admin._id.toString()) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        const { title, content } = req.body;

        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();

        res.status(200).json({
            success: true,
            post
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


// DELETE BLOG (we’ll plug image deletion here)
export const deleteBlog = async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
         console.log(post.admin, req.admin._id);
        if (post.admin.toString() !== req.admin._id.toString()) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.status(200).json({ msg: 'Blog deleted' });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};