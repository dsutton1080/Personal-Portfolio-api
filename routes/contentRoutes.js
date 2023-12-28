// userRoutes.js
const express = require("express");
const router = express.Router();
const prisma = require("@prisma/client");

// Path: controllers/content.js
router.get("/content/all", async (_request, response) => {
  const content = await prisma.content.findMany();
  response.send(content);
});
router.get("/content/:id", async (request, response) => {
  const contentID = request.query.id;
  const content = await prisma.content.findUnique({
    where: {
      id: parseInt(contentID),
    },
  });
  response.send(content);
});
router.post("/content", async (request, response) => {
  const content = request.body;
  const responseContent = await prisma.content.create({
    data: content,
  });
  response.send(responseContent);
});
router.patch("/content/:id", async (request, response) => {
  const updatedContent = await prisma.content.update({
    where: { id: parseInt(request.params.id) },
    data: request.body,
  });
  response.send(updatedContent);
});
router.delete("/content/:id", async (request, response) => {
  const deletedContent = await prisma.content.delete({
    where: { id: parseInt(request.params.id) },
  });
  response.send(deletedContent);
});

module.exports = router;
