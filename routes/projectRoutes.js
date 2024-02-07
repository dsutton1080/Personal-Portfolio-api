const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/all", async (_request, response) => {
	try {
		const projects = await prisma.project.findMany();
		response.send(projects);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.get("/:id", async (request, response) => {
	try {
		const projectID = request.query.id;
		const project = await prisma.project.findUnique({
			where: {
				id: parseInt(projectID),
			},
		});
		response.send(project);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.post("", async (request, response) => {
	try {
		const project = request.body;
		const responseProject = await prisma.project.create({
			data: project,
		});
		response.send(responseProject);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.patch("/:id", async (request, response) => {
	try {
		const updatedProject = await prisma.project.update({
			where: { id: parseInt(request.params.id) },
			data: request.body,
		});
		response.send(updatedProject);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.delete("/:id", async (request, response) => {
	try {
		const deletedProject = await prisma.project.delete({
			where: { id: parseInt(request.params.id) },
		});
		response.send(deletedProject);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

module.exports = router;
