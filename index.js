const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const accounts = require("./route/accounts");
const wishes = require("./route/wishes");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const PORT = process.env.PORT || 5000;
const { checkJwt } = require("./utilities/auth");

connectDB().then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use("/account", accounts);
    app.use("/wish", wishes);
    app.get("/", (req, res) => {
        res.status(200).send("yay!");
    });
    // This route needs authentication
    app.get("/api/private", checkJwt, function (req, res) {
        res.json({
            message:
                "Hello from a private endpoint! You need to be authenticated to see this.",
        });
    });
    app.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on port ${PORT}`);
    });
});
