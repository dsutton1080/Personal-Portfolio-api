const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/all", async (_request, response) => {
	const experience = await prisma.experience.findMany();
	response.send(experience);
});
router.get("/:id", async (request, response) => {
	const experienceID = request.query.id;
	const experience = await prisma.experience.findUnique({
		where: {
			id: parseInt(experienceID),
		},
	});
	response.send(experience);
});
router.post("", async (request, response) => {
	const experience = request.body;
	const responseExperience = await prisma.experience.create({
		data: experience,
	});
	response.send(responseExperience);
});
router.patch("/:id", async (request, response) => {
	const updatedExperience = await prisma.experience.update({
		where: { id: parseInt(request.params.id) },
		data: request.body,
	});
	response.send(updatedExperience);
});
router.delete("/:id", async (request, response) => {
	const deletedExperience = await prisma.experience.delete({
		where: { id: parseInt(request.params.id) },
	});
	response.send(deletedExperience);
});

module.exports = router;
