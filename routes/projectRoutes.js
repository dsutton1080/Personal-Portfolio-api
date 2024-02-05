const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/all", async (_request, response) => {
	const projects = await prisma.project.findMany();
	response.send(projects);
});
router.get("/:id", async (request, response) => {
	const projectID = request.query.id;
	const project = await prisma.project.findUnique({
		where: {
			id: parseInt(projectID),
		},
	});
	response.send(project);
});
router.post("", async (request, response) => {
	const project = request.body;
	const responseProject = await prisma.project.create({
		data: project,
	});
	response.send(responseProject);
});
router.patch("/:id", async (request, response) => {
	const updatedProject = await prisma.project.update({
		where: { id: parseInt(request.params.id) },
		data: request.body,
	});
	response.send(updatedProject);
});
router.delete("/:id", async (request, response) => {
	const deletedProject = await prisma.project.delete({
		where: { id: parseInt(request.params.id) },
	});
	response.send(deletedProject);
});

module.exports = router;
