import express from 'express';
import { protectAdmin } from '../Middleware/authMiddleware.js';

const router = express.Router();

//protected routes
router.post('/create', protectAdmin, (req, res) => {
    res.status(200).json({ msg: 'Blog created' });
});
//router.get('/get', protectAdmin, getBlogs);

export default router;