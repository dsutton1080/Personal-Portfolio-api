const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.listen( PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Path: controllers/users.js

app.get("/status", (_request, response) => {
    const status = {
        status: "OK",
        timestamp: new Date()
    };
    response.send(status);
});


app.post("/signup", async (request, response) => {
    const user = request.body;
    const responseUser = await prisma.user.create({
        data: {
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }
    });
    response.send(responseUser);
});

app.post("/login", async (request, response) => {
    const userEmail = request.query.email;
    const userPassword = request.query.password;
    const user = await prisma.user.findUnique({
        where: { email: userEmail }
    });
    if (user.password !== userPassword) {
        response.status(404);
        response.send("Invalid password");
    }
    else {
        response.status(200);
        response.send(user);
    }
});

app.get("/user", async (request, response) => {
    const userID = Number(request.params.id);
    const user = await prisma.user.findUnique({
        where: { id: userID }
    });
    response.send(user);
});

app.patch("/user/:id", (request, response) => {
    const user = request.body;
    console.log(user);
    response.send(user);
});

app.get("user/all", async (_request, response) => {
    const users = await prisma.user.findMany();
    response.send(users);
});

app.patch("/user/change-role/:id", (request, response) => {
    const user = request.body;
    console.log(user);
    response.send(user);
});

app.delete("/user/:id", (request, response) => {
    const user = request.body;
    console.log(user);
    response.send(user);
});



async function main() {
    // await prisma.user.create({
    //   data: {
    //     name: 'Alice',
    //     email: 'alice@prisma.io',
    //     posts: {
    //       create: { title: 'Hello World' },
    //     },
    //     profile: {
    //       create: { bio: 'I like turtles' },
    //     },
    //   },
    // })
  
    // const allUsers = await prisma.user.findMany({
    //   include: {
    //     posts: true,
    //     profile: true,
    //   },
    // })
    // console.dir(allUsers, { depth: null })

    // const post = await prisma.post.update({
    //     where: { id: 1 },
    //     data: { published: true },
    // })
    // console.log(post)

    // const deletedUser = await prisma.user.delete({
    //     where: { email: 'sarah@prisma.io' },
    // })
}