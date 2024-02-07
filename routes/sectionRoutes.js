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

		response.send(groupedSections);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.get("/count", async (_request, response) => {
	try {
		const count = await prisma.section.count();
		response.send(count.toString());
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.get("/:id", async (request, response) => {
	try {
		const sectionID = request.query.id;
		const section = await prisma.section.findUnique({
			where: {
				id: parseInt(sectionID),
			},
		});
		response.send(section);
	} catch (error) {
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
		response.send(responseSection);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.patch("/:id", async (request, response) => {
	try {
		const updatedSection = await prisma.section.update({
			where: { id: parseInt(request.params.id) },
			data: request.body,
		});
		response.send(updatedSection);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.delete("/:id", async (request, response) => {
	try {
		const deletedSection = await prisma.section.delete({
			where: { id: parseInt(request.params.id) },
		});
		response.send(deletedSection);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

module.exports = router;
