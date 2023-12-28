const express = require("express");
const router = express.Router();
const prisma = require("@prisma/client");

router.get("/skills/all", async (_request, response) => {
  const skills = await prisma.skill.findMany();
  response.send(skills);
});

module.exports = router;
