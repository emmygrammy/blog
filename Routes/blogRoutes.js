import express from 'express';
import { protectAdmin } from '../Middleware/authMiddleware.js';
import { createBlog, getBlogs, getSingleBlog, deleteBlog,  updateBlog} from '../Controllers/blogController.js';
import { uploadBlogImage, updateBlogImage, deleteBlogImage } from '../Controllers/blogImageController.js';
import upload from '../Middleware/upload.js';



const router = express.Router();

//content routes
router.post('/', protectAdmin, createBlog);
router.get('/', getBlogs);
router.get('/:id', getSingleBlog);
router.delete('/:id', protectAdmin, deleteBlog);
router.put('/:id', protectAdmin, updateBlog);

//image routes
router.post('/:id/upload', protectAdmin, upload.single('image'), uploadBlogImage);
router.put('/:id/update', protectAdmin, upload.single('image'), updateBlogImage);
router.delete('/:id/delete', protectAdmin, upload.single('image'), deleteBlogImage);





export default router;