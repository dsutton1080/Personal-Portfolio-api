const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/content/all", async (_request, response) => {
	try {
		const content = await prisma.content.findMany();
		response.send(content);
	} catch (error) {
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
		response.send(content);
	} catch (error) {
		response.status(500).send(error);
	}
});

router.post("/content", async (request, response) => {
	try {
		const content = request.body;
		const responseContent = await prisma.content.create({
			data: content,
		});
		response.send(responseContent);
	} catch (error) {
		response.status(500).send(error);
	}
});

router.patch("/content/:id", async (request, response) => {
	try {
		const updatedContent = await prisma.content.update({
			where: { id: parseInt(request.params.id) },
			data: request.body,
		});
		response.send(updatedContent);
	} catch (error) {
		response.status(500).send(error);
	}
});

router.delete("/content/:id", async (request, response) => {
	try {
		const deletedContent = await prisma.content.delete({
			where: { id: parseInt(request.params.id) },
		});
		response.send(deletedContent);
	} catch (error) {
		response.status(500).send(error);
	}
});

module.exports = router;
