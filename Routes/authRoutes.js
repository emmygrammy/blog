import express from "express";
import { loginAdmin } from "../Controllers/AuthController.js";

const router = express.Router();

// Login admin
router.post('/login', loginAdmin);

export default router;
