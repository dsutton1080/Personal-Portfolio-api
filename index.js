const express = require("express");
const cors = require("cors");
const prisma = require("./prisma");
const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require("./routes/userRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const contentRoutes = require("./routes/contentRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use(cors()); // This will set the Access-Control-Allow-Origin header to *
app.use(express.json());

app.use((req, res, next) => {
	res.set("Cache-Control", "no-store", "no-cache", "must-revalidate", "private");
	next();
});

app.use("/user", userRoutes);
app.use("/section", sectionRoutes);
app.use("/content", contentRoutes);
app.use("/experience", experienceRoutes);
app.use("/project", projectRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.get("/status", (_request, response) => {
	const status = {
		status: "OK",
		timestamp: new Date(),
	};
	response.status(200).send(status);
});
