const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.post("/signup", async (request, response) => {
	try {
		const user = request.body;
		const responseUser = await prisma.user.create({
			data: {
				email: user.email,
				password: user.password,
				firstName: user.firstName,
				lastName: user.lastName,
				isAdmin: user.isAdmin,
			},
		});
		response.status(200).send(responseUser);
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal Server Error");
	}
});

router.post("/login", async (request, response) => {
	try {
		// This endpoint needs security improvements (e.g. JWT)
		const loginInfo = request.body;
		const user = await prisma.user.findUnique({
			where: { email: loginInfo.email },
		});
		if (user.password !== loginInfo.password) {
			response.status(404).send("Invalid password");
		} else {
			const { id, firstName, lastName, email, isAdmin } = user;
			response.status(201).send({ firstName, lastName, email, isAdmin, id });
		}
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal Server Error");
	}
});

router.get("", async (request, response) => {
	try {
		const userID = request.query.id;
		const user = await prisma.user.findUnique({
			where: {
				id: userID,
			},
		});
		response.status(200).send(user);
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal Server Error");
	}
});

router.patch("/:id", async (request, response) => {
	try {
		const updatedUser = await prisma.user.update({
			where: { id: request.params.id },
			data: request.body,
		});
		response.status(200).send(updatedUser);
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal Server Error");
	}
});

router.get("/all", async (_request, response) => {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				isAdmin: true,
			},
		});
		response.status(200).send(users);
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal Server Error");
	}
});

router.patch("/change-role/:id", async (request, response) => {
	try {
		const updatedUser = await prisma.user.update({
			where: { id: request.params.id },
			data: request.body,
		});
		response.status(200).send(updatedUser);
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal Server Error");
	}
});

module.exports = router;
