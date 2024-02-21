const express = require("express");
const router = express.Router();
const prisma = require("@prisma/client");

router.get("/skills/all", async (_request, response) => {
	const skills = await prisma.skills.findMany();
	response.send(skills);
});

router.post("/skills", async (request, response) => {
	const newSkill = await prisma.skills.create({
		data: request.body,
		orderBy: {
			order: "desc",
		},
	});
	response.send(newSkill);
});

router.patch("/skills/:id", async (request, response) => {
	const { id } = request.params;
	const skill = await prisma.skills.update({
		where: {
			id: id,
		},
		data: request.body,
	});
	response.send(skill);
});

router.delete("/skills/:id", async (request, response) => {
	const { id } = request.params;
	const skill = await prisma.skills.delete({
		where: {
			id: id,
		},
	});
	response.send(skill);
});

module.exports = router;
