import express from "express";
import prismaClient from "db";

const stepRouter = express.Router();

stepRouter.post("/", async (req, res) => {
    const { name, tourId, caption, order } = req.body;
    const step = await prismaClient.step.create({
        data: {
            name,
            tourId,
            caption,
        },
    });
    res.json(step);
});

stepRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, caption, imageUrl, videoUrl } = req.body;
    const step = await prismaClient.step.update({
        where: { id },
        data: { name, caption, imageUrl, videoUrl },
    });
    res.json(step);
});

stepRouter.post("/image", async (req, res) => {
    const { stepId, imageUrl } = req.body;
    const step = await prismaClient.step.update({
        where: { id: stepId },
        data: { imageUrl },
    });
});










stepRouter.post("/video", async (req, res) => {
    const { stepId, videoUrl } = req.body;
    const step = await prismaClient.step.update({
        where: { id: stepId },
        data: { videoUrl },
    });
});



export default stepRouter;
