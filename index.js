import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './Routes/authRoutes.js';
import blogRoutes from './Routes/blogRoutes.js';
import questionRoutes from './Routes/questionRoutes.js';

// ENV CHECK (important)
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing in .env");
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/blog', blogRoutes)
app.use('/v1/api/questions', questionRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('API is running and working well.......welcome to learnlift blog API!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});