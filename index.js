const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require("./routes/userRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const contentRoutes = require("./routes/contentRoutes");
const skillsRoutes = require("./routes/skillsRoutes");

app.use(cors()); // This will set the Access-Control-Allow-Origin header to *
app.use(express.json());
app.use("/user", userRoutes);
app.use("/section", sectionRoutes);
app.use("/content", contentRoutes);
app.use("/skills", skillsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/status", (_request, response) => {
  const status = {
    status: "OK",
    timestamp: new Date(),
  };
  response.send(status);
});
