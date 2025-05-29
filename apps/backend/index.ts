import prismaClient from "db";
import express from "express";
import tourRouter from "./routes/tour";
import stepRouter from "./routes/step";
import dashboardRouter from "./routes/dashboard";
import authRouter from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/tours", authMiddleware, tourRouter);
app.use("/steps", authMiddleware, stepRouter);
app.use("/dashboard", authMiddleware, dashboardRouter);
app.use("/auth", authRouter);


const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
});




