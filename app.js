const express = require('express');
const app = express();
const PORT = require('./config.js');
console.log("exported port", PORT);
app.use(express.json());

app.listen( PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

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


