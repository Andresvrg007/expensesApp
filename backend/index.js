import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Configuración simple de CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Conecta a MongoDB y solo inicia el servidor si la conexión es exitosa
connectDB().then(() => {
  app.use('/api', authRoutes);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('No se pudo conectar a la base de datos:', err);
});