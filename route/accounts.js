const express = require("express");
const router = express.Router();
const Account = require("../model/account");
const { getMoongoseErrors } = require("../utilities/errors");

router.post("/all", async (req, res) => {
    try {
        const docs = Account.find();
        res.status(200).send(docs);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await Account.findOne({ email: String(email) });
        if (result) {
            result.validPassword(password)
                ? res.status(200).send("User found!")
                : res.status(400).send("Incorrect email or password");
        } else {
            res.status(400).send("No email / password found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post("/create", async (req, res) => {
    try {
        const { password, name, email } = req.body;
        const account = new Account({
            name: name ? String(name) : name,
            dateUpdated: Date.now(),
            dateCreated: Date.now(),
            email: email ? String(email) : email,
            password: password ? String(password) : password,
        });

        try {
            await account.save();
            res.status(200).jsonp({ message: "Successfully added account." });
        } catch (err) {
            res.status(400).jsonp({ errors: getMoongoseErrors(err) });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = router;
