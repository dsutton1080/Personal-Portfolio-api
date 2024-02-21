const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/all", async (_request, response) => {
	try {
		const experience = await prisma.experience.findMany();
		response.status(200).send(experience);
	} catch (error) {
		console.error(error);
		response.status(500).send(error);
	}
});

router.get("/:id", async (request, response) => {
	try {
		const experienceID = request.params.id;
		const experience = await prisma.experience.findUnique({
			where: {
				id: experienceID,
			},
		});
		response.status(200).send(experience);
	} catch (error) {
		console.error(error);
		response.status(500).send(error);
	}
});

router.post("", async (request, response) => {
	try {
		const experience = request.body;
		const responseExperience = await prisma.experience.create({
			data: experience,
		});
		response.status(201).send(responseExperience);
	} catch (error) {
		console.error(error);
		response.status(500).send(error);
	}
});

router.patch("/:id", async (request, response) => {
	try {
		const updatedExperience = await prisma.experience.update({
			where: { id: request.params.id },
			data: request.body,
		});
		response.status(200).send(updatedExperience);
	} catch (error) {
		console.error(error);
		response.status(500).send(error);
	}
});

router.delete("/:id", async (request, response) => {
	try {
		const deletedExperience = await prisma.experience.delete({
			where: { id: request.params.id },
		});
		response.status(200).send(deletedExperience);
	} catch (error) {
		console.error(error);
		response.status(500).send(error);
	}
});

module.exports = router;
