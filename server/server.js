import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const allowedOrigins = [
    'http://localhost:5173',
    'https://your-production-website.com'
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,

}));

// Api Endpoints
app.get('/', (req, res) => {
    res.send('Say My Name - Heisenburg You goddamn right');
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.listen(PORT, () => {
    console.log(`You goddamn right http://localhost:${PORT}`);
});
