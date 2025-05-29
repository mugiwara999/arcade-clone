import express from "express";
import prismaClient from "db";

const tourRouter = express.Router();

tourRouter.get("/", async (req, res) => {
    const { userId } = req.body;
    const tours = await prismaClient.tour.findMany({
        where: {
            userId: userId as string,
        },
        include: {
            Steps: true,
        },
    });
    res.json(tours);
});


tourRouter.post("/", async (req, res) => {
    const { name, userId } = req.body;
    const tour = await prismaClient.tour.create({
        data: {
            name,
            userId,
        },
    });
    res.json(tour);
});

tourRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, steps } = req.body as {
        name: string;
        steps: string[];
    }

    const tour = await prismaClient.tour.update({
        where: { id },
        data: {
            name,
            steps_id: steps,
        },
    });

    res.json(tour);
});

tourRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await prismaClient.tour.delete({
        where: { id },
    });

    await prismaClient.step.deleteMany({
        where: {
            tourId: id,
        },
    });

    res.json({ message: "Tour deleted" });
});
export default tourRouter;