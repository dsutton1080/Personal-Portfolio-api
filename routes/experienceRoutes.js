const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/all", async (_request, response) => {
	try {
		const experience = await prisma.experience.findMany();
		response.send(experience);
	} catch (error) {
		response.status(500).send(error);
	}
});

router.get("/:id", async (request, response) => {
	try {
		const experienceID = request.query.id;
		const experience = await prisma.experience.findUnique({
			where: {
				id: parseInt(experienceID),
			},
		});
		response.send(experience);
	} catch (error) {
		response.status(500).send(error);
	}
});

router.post("", async (request, response) => {
	try {
		const experience = request.body;
		const responseExperience = await prisma.experience.create({
			data: experience,
		});
		response.send(responseExperience);
	} catch (error) {
		response.status(500).send(error);
	}
});

router.patch("/:id", async (request, response) => {
	try {
		const updatedExperience = await prisma.experience.update({
			where: { id: parseInt(request.params.id) },
			data: request.body,
		});
		response.send(updatedExperience);
	} catch (error) {
		response.status(500).send(error);
	}
});

router.delete("/:id", async (request, response) => {
	try {
		const deletedExperience = await prisma.experience.delete({
			where: { id: parseInt(request.params.id) },
		});
		response.send(deletedExperience);
	} catch (error) {
		response.status(500).send(error);
	}
});

module.exports = router;
