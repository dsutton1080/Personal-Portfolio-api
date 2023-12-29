const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/all", async (_request, response) => {
  const sections = await prisma.section.findMany({
    select: {
      title: true,
      header: true,
      subHeader: true,
      contents: {
        select: {
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
  // Group sections by title
  const groupedSections = sections.reduce((grouped, section) => {
    (grouped[section.title] = grouped[section.title] || []).push(section);
    return grouped;
  }, {});

  response.send(groupedSections);
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
    data: section,
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
