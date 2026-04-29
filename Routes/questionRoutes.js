import express from 'express';
import { createQuestion, getAllQuestions, getSingleQuestion, updateQuestion, deleteQuestion } from '../Controllers/questionController.js';
import { protectAdmin } from '../Middleware/authMiddleware.js';



const router = express.Router();

router.post("/", protectAdmin, createQuestion);
router.get("/", getAllQuestions);
router.get("/:id", getSingleQuestion);
router.put("/:id", protectAdmin, updateQuestion);
router.delete("/:id", protectAdmin, deleteQuestion);



export default router;
