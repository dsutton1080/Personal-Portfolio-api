const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const PORT = require('./config.js');
console.log("exported port", PORT);
app.use(express.json());

app.listen( PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


const prisma = new PrismaClient()

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

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

// Path: controllers/users.js

app.get("/status", (request, response) => {
    const status = {
        status: "OK",
        timestamp: new Date()
    };
    response.send(status);
});


app.post("/signup", (request, response) => {
    const user = request.body;
    console.log(user);
    response.send(user);
});

app.post("/login", (request, response) => {
    const user = request.body;
    console.log(user);
    response.send(user);
});

app.get("/user", (request, response) => {
    const user = request.body;
    console.log(user);
    response.send(user);
});

app.patch("/user/:id", (request, response) => {
    const user = request.body;
    console.log(user);
    response.send(user);
});

app.get("user/all", (request, response) => {
    const user = request.body;
    console.log(user);
    response.send(user);
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


