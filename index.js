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
const dbFileRoutes = require("./routes/dbFileRoutes");

app.use(cors()); // This will set the Access-Control-Allow-Origin header to *
app.use(express.json());
app.use("/user", userRoutes);
app.use("/section", sectionRoutes);
app.use("/content", contentRoutes);
app.use("/experience", experienceRoutes);
app.use("/project", projectRoutes);
app.use("/dbfile", dbFileRoutes.router);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	dbFileRoutes.getDbFile();

	const interval = 8 * 60 * 60 * 1000; // 8 hours
	setInterval(() => {
		dbFileRoutes.updateDbFile();
	}, interval);
});

app.get("/status", (_request, response) => {
	const status = {
		status: "OK",
		timestamp: new Date(),
	};
	response.send(status);
});

process.on("SIGINT", async function () {
	console.log("Closing down server.");
	await dbFileRoutes.updateDbFile().then(() => {
		process.exit();
	});
});
