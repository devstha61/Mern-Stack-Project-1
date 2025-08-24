import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from "dotenv";
import cors from 'cors';
import { authMiddleware } from './middleware/auth.middleware.js';



const app = express();

dotenv.config();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Helps read JSON data
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);


app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed!", user: req.user });
});


export default app;

app.get('/', (req, res) => {
  res.send('Welcome to the backend API');
});

