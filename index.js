const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, function () {
    console.log("Server Started on port 5000...");
});

app.post("/login", function (req, res) {
    const users = [
        { username: "Kani", password: "123" } // default user
    ];

    const inputUsername = req.body.username;
    const inputPassword = req.body.password;

    console.log("Username:", inputUsername);
    console.log("Password:", inputPassword);

    if (!/^[A-Z]/.test(inputUsername)) {
        return res.status(400).send({ success: false, message: "Username must start with a capital letter." });
    }

    if (!/^[a-zA-Z0-9]+$/.test(inputPassword)) {
        return res.status(400).send({ success: false, message: "Password must contain only letters or numbers." });
    }

    const userExists = users.find(
        (user) => user.username === inputUsername && user.password === inputPassword
    );

    if (userExists) {
        res.send({ success: true });
    } else {
        res.status(401).send({ success: false, message: "Login failed. Invalid username or password." });
    }
});
