import { connectDB } from "./config/mongo.connect.js";
import {app} from './app.js'

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT,() => {
        console.log(`🌐 Server Run At: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB Connection FAILED: ", err);
  });
