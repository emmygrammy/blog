import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();
// connectDB();

const app = express();
const port = process.env.port;

app.use(cors());
app.use(express.json());



// Mount routers
// app.use('/api/auth', require('./routes/auth'));

//test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

