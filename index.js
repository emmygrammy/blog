import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './Routes/authRoutes.js';

dotenv.config();


const app = express();
const port = process.env.PORT||5001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Mount routes
app.use('/api/auth', authRoutes);

//test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

