import express from "express";
import cors from "cors";
import { DATA_LIMIT,API_BASE_URL } from "./constants.js";
import cookieParser from "cookie-parser";
import fileUpload  from 'express-fileupload'
// import {authenticateUser} from './middlewares/authMiddleware.js'
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
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

//Import routes
import authRouter from "./routes/userAuth.router.js";
import notesRouter from './routes/notes.router.js'
import materialRouter from './routes/material.router.js'

app.use(`${API_BASE_URL}/auth`, authRouter);
app.use(`${API_BASE_URL}/notes`,notesRouter);
app.use(`${API_BASE_URL}/material`,materialRouter);


export { app };
