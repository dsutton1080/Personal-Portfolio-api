const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/all", async (_request, response) => {
	try {
		const sections = await prisma.section.findMany({
			select: {
				id: true,
				title: true,
				header: true,
				subHeader: true,
				contents: {
					select: {
						id: true,
						content: true,
					},
					orderBy: {
						order: "asc",
					},
				},
			},
			orderBy: {
				order: "asc",
			},
		});
		const groupedSections = sections.reduce((grouped, section) => {
			if (!grouped[section.title]) {
				// This is the first section with this title
				grouped[section.title] = [section];
			} else {
				// This is not the first section with this title, so set the title to an empty string
				grouped[section.title].push({ ...section, title: "" });
			}
			return grouped;
		}, {});

		response.status(200).send(groupedSections);
	} catch (error) {
		console.error(error);
		response.status(500).send(error.message);
	}
});

router.get("/count", async (_request, response) => {
	try {
		const count = await prisma.section.count();
		response.status(200).send(count.toString());
	} catch (error) {
		console.error(error);
		response.status(500).send(error.message);
	}
});

router.get("/headers", async (_request, response) => {
	try {
		const headers = await prisma.section.findMany({
			select: {
				id: true,
				header: true,
			},
			orderBy: {
				order: "asc",
			},
		});
		response.status(200).send(headers);
	} catch (error) {
		console.error(error);
		response.status(500).send(error.message);
	}
});

router.get("/:id", async (request, response) => {
	try {
		const sectionID = request.params.id;
		const section = await prisma.section.findUnique({
			select: {
				id: true,
				title: true,
				header: true,
				subHeader: true,
				order: true,
				contents: {
					select: {
						id: true,
						content: true,
						order: true,
					},
					orderBy: {
						order: "asc",
					},
				},
			},
			where: {
				id: parseInt(sectionID),
			},
		});
		response.status(200).send(section);
	} catch (error) {
		console.error(error);
		response.status(500).send(error.message);
	}
});

router.post("", async (request, response) => {
	try {
		const section = request.body;
		if (!section.order) {
			const count = await prisma.section.count();
			section.order = count + 1;
		}
		const responseSection = await prisma.section.create({
			data: {
				...section,
				contents: {
					create: section.contents.records,
				},
			},
		});
		response.status(201).send(responseSection);
	} catch (error) {
		console.error(error);
		response.status(500).send(error.message);
	}
});

router.patch("/:id", async (request, response) => {
	try {
		const sectionID = request.params.id;
		const { contents, ...section } = request.body;
		const updatedSection = await prisma.section.update({
			where: { id: parseInt(sectionID) },
			data: {
				...section,
				contents: {
					upsert: contents.map((content) => ({
						where: { id: content.id },
						update: {
							order: content.order,
							content: content.content,
						},
						create: {
							order: content.order,
							content: content.content,
						},
					})),
				},
			},
		});
		response.status(200).send(updatedSection);
	} catch (error) {
		console.error(error);
		response.status(500).send(error.message);
	}
});

router.delete("/:id", async (request, response) => {
	try {
		const deletedSection = await prisma.section.delete({
			where: { id: parseInt(request.params.id) },
		});
		response.status(200).send(deletedSection);
	} catch (error) {
		console.error(error);
		response.status(500).send(error.message);
	}
});

module.exports = router;
