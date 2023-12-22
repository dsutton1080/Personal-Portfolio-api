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
app.post("/login", async (request, response) => { // This endpoint needs security improvements (e.g. JWT)
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
    const userID = request.query.id;
    const user = await prisma.user.findUnique({
        where: { 
            id: parseInt(userID)
        }
    });
    response.send(user);
});
app.patch("/user/:id", async (request, response) => {
    const updatedUser = await prisma.user.update({
        where: { id: parseInt(request.params.id) },
        data: request.body,
    });
    response.send(updatedUser);
});
app.get("/user/all", async (_request, response) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            isAdmin: true
        }
    });
    response.send(users);
});
app.patch("/user/change-role/:id", async (request, response) => {
    const updatedUser = await prisma.user.update({
        where: { id: parseInt(request.params.id) },
        data: request.body,
    });
    response.send(updatedUser);
});



// Path: controllers/sections.js
app.get("/section/all", async (_request, response) => {
    const sections = await prisma.section.findMany();
    response.send(sections);
});
app.get("/section:id", async (request, response) => {
    const sectionID = request.query.id;
    const section = await prisma.section.findUnique({
        where: { 
            id: parseInt(sectionID)
        }
    });
    response.send(section);
});
app.post("/section", async (request, response) => {
    const section = request.body;
    const responseSection = await prisma.section.create({
        data: section
    });
    response.send(responseSection);
});
app.patch("/section/:id", async (request, response) => {
    const updatedSection = await prisma.section.update({
        where: { id: parseInt(request.params.id) },
        data: request.body,
    });
    response.send(updatedSection);
});
app.delete("/section/:id", async (request, response) => {
    const deletedSection = await prisma.section.delete({
        where: { id: parseInt(request.params.id) }
    });
    response.send(deletedSection);
});
app.get("/section/:id/content", async (request, response) => {
    const sectionID = request.query.id;
    const section = await prisma.section.findUnique({
        where: { 
            id: parseInt(sectionID)
        },
        include: {
            content: true
        }
    });
    response.send(section);
});

// Path: controllers/content.js
app.get("/content/all", async (_request, response) => {
    const content = await prisma.content.findMany();
    response.send(content);
});
app.get("/content/:id", async (request, response) => {
    const contentID = request.query.id;
    const content = await prisma.content.findUnique({
        where: { 
            id: parseInt(contentID)
        }
    });
    response.send(content);
});
app.post("/content", async (request, response) => {
    const content = request.body;
    const responseContent = await prisma.content.create({
        data: content
    });
    response.send(responseContent);
});
app.patch("/content/:id", async (request, response) => {
    const updatedContent = await prisma.content.update({
        where: { id: parseInt(request.params.id) },
        data: request.body,
    });
    response.send(updatedContent);
});
app.delete("/content/:id", async (request, response) => {
    const deletedContent = await prisma.content.delete({
        where: { id: parseInt(request.params.id) }
    });
    response.send(deletedContent);
});
app.get("/content/:id/section", async (request, response) => {
    const contentID = request.query.id;
    const content = await prisma.content.findUnique({
        where: { 
            id: parseInt(contentID)
        },
        include: {
            section: true
        }
    });
    response.send(content);
});