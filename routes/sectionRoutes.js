const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/all", async (_request, response) => {
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
});
router.get("/count", async (_request, response) => {
	const count = await prisma.section.count();
	response.send(count.toString());
});
router.get("/:id", async (request, response) => {
	const sectionID = request.query.id;
	const section = await prisma.section.findUnique({
		where: {
			id: parseInt(sectionID),
		},
	});
	response.send(section);
});
router.post("", async (request, response) => {
	const section = request.body;
	const responseSection = await prisma.section.create({
		data: {
			...section,
			contents: {
				create: section.contents.records,
			},
		},
	});
	response.send(responseSection);
});
router.patch("/:id", async (request, response) => {
	const updatedSection = await prisma.section.update({
		where: { id: parseInt(request.params.id) },
		data: request.body,
	});
	response.send(updatedSection);
});
router.delete("/:id", async (request, response) => {
	const deletedSection = await prisma.section.delete({
		where: { id: parseInt(request.params.id) },
	});
	response.send(deletedSection);
});

module.exports = router;
