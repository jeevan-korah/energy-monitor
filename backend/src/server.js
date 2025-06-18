import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import readingRoutes from "./routes/readingRoutes.js";
import cors from "cors"

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Energy Monitor backend is running.");
});

app.use("/api/auth", authRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/reading", readingRoutes);



connectDb()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    })
  )
  .catch((err) => {
    console.log(`Failed to connect to DB : ${err}`);
  });
