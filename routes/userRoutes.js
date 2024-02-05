const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.post("/signup", async (request, response) => {
	const user = request.body;
	const responseUser = await prisma.user.create({
		data: {
			email: user.email,
			password: user.password,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role,
		},
	});
	response.send(responseUser);
});

router.post("/login", async (request, response) => {
	// This endpoint needs security improvements (e.g. JWT)
	const userEmail = request.query.email;
	const userPassword = request.query.password;
	const user = await prisma.user.findUnique({
		where: { email: userEmail },
	});
	if (user.password !== userPassword) {
		response.status(404);
		response.send("Invalid password");
	} else {
		response.status(200);
		response.send(user);
	}
});

router.get("", async (request, response) => {
	const userID = request.query.id;
	const user = await prisma.user.findUnique({
		where: {
			id: parseInt(userID),
		},
	});
	response.send(user);
});

router.patch("/:id", async (request, response) => {
	const updatedUser = await prisma.user.update({
		where: { id: parseInt(request.params.id) },
		data: request.body,
	});
	response.send(updatedUser);
});

router.get("/all", async (_request, response) => {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			isAdmin: true,
		},
	});
	response.send(users);
});

router.patch("/change-role/:id", async (request, response) => {
	const updatedUser = await prisma.user.update({
		where: { id: parseInt(request.params.id) },
		data: request.body,
	});
	response.send(updatedUser);
});

module.exports = router;
