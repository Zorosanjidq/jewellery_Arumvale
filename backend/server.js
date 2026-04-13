import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import metalRoutes from "./routes/metalRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { serveStaticFiles } from "./utils/uploadConfig.js";
dotenv.config();
connectDB();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:5173"],
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);

app.use("/api/metals", metalRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/products", productRoutes);

// Serve static files for uploaded images
serveStaticFiles(app);

app.get("/", (req, res) => {
  res.send("API running...");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/test", (req, res) => {
  res.send("Server working");
});
