const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const accounts = require("./route/accounts");
const wishes = require("./route/wishes");
const bodyParser = require("body-parser");
const connectDB = require("./db");

connectDB().then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use("/account", accounts);
    app.use("/wish", wishes);
    app.get("/", (req, res) => {
        res.send("hello!");
    });
    app.listen(3000, (err) => {
        if (err) throw err;
        console.log(`> Ready on port ${3000}`);
    });
});
