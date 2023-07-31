import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config({ path: './.env' });
import { connectToDatabase } from "./config/db.config.js";
import router from "./routes/index.js";

// EXPRESS CONFIG
const app = express();
app.use(express.json());

// CORS SETUP
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(cors({
    origin: "*",
    credentials: true,
}));

// SERVING ROUTES AND STATIC DIRECTORY
app.use('/api', router);
app.use('/uploads', express.static('uploads'));

// SERVER INITIALIZATION
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    await connectToDatabase();
    console.log('Colors Server is running successfully on Port: ' + PORT);
})