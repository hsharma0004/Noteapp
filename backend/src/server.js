import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
// 429 Too many request error
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));


app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT : ", PORT);
  });
});
