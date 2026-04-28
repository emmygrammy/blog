import express from 'express';
import { protectAdmin } from '../Middleware/authMiddleware.js';
import { createBlog, getBlogs, getSingleBlog, deleteBlog,  updateBlog} from '../Controllers/blogController.js.js';
import { uploadBlogImage, updateBlogImage, deleteBlogImage } from '../Controllers/blogImageController.js.js';

const router = express.Router();

//content routes
router.post('/', protectAdmin, createBlog);
router.get('/', getBlogs);
router.get('/:id', getSingleBlog);
router.delete('/:id', protectAdmin, deleteBlog);
router.put('/:id', protectAdmin, updateBlog);

//image routes
router.post('/:id/upload', protectAdmin, uploadBlogImage);
router.put('/:id/update', protectAdmin, updateBlogImage);
router.delete('/:id/delete', protectAdmin, deleteBlogImage);





export default router;