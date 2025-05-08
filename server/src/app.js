import express from "express";
import cors from "cors";
import { DATA_LIMIT,API_BASE_URL } from "./constants.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);

// Down below: Data Configuration
app.use(express.json({ limit: DATA_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: DATA_LIMIT }));
app.use(express.static("public"));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

//Import routes
import authRouter from "./routes/userAuth.router.js";
import notesRouter from './routes/notes.router.js'

app.use(`${API_BASE_URL}/auth`, authRouter);
app.use(`${API_BASE_URL}/notes`,notesRouter)

export { app };
