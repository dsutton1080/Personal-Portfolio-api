const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/content/all", async (_request, response) => {
	try {
		const content = await prisma.content.findMany();
		response.status(200).send(content);
	} catch (error) {
		console.error(error);
		response.status(500).send(error);
	}
});

router.get("/content/:id", async (request, response) => {
	try {
		const contentID = request.query.id;
		const content = await prisma.content.findUnique({
			where: {
				id: parseInt(contentID),
			},
		});
		response.status(200).send(content);
	} catch (error) {
		console.error(error);
		response.status(500).send(error);
	}
});

router.post("/content", async (request, response) => {
	try {
		const content = request.body;
		const responseContent = await prisma.content.create({
			data: content,
		});
		response.status(201).send(responseContent);
	} catch (error) {
		console.error(error);
		response.status(500).send(error);
	}
});

router.patch("/content/:id", async (request, response) => {
	try {
		const updatedContent = await prisma.content.update({
			where: { id: parseInt(request.params.id) },
			data: request.body,
		});
		response.status(200).send(updatedContent);
	} catch (error) {
		console.error(error);
		response.status(500).send(error);
	}
});

router.delete("/content/:id", async (request, response) => {
	try {
		const deletedContent = await prisma.content.delete({
			where: { id: parseInt(request.params.id) },
		});
		response.status(200).send(deletedContent);
	} catch (error) {
		console.error(error);
		response.status(500).send(error);
	}
});

module.exports = router;
