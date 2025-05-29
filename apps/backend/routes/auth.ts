import  { Router, Request, Response } from "express";
import prismaClient from "db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response): Promise<void> => {
    try {

        const { email, password } = req.body;

        const user = await prismaClient.user.findUnique({
            where: { email },
        });

        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = "Bearer " + jwt.sign({ id: user.id }, process.env.JWT_SECRET || "");

        res.json({  token });    
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

authRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await prismaClient.user.create({
        data: { email, password: hashedPassword, name },
    });

        const token = "Bearer " + jwt.sign({ id: user.id }, process.env.JWT_SECRET || "");

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});



export default authRouter;