const express = require("express");
const router = express.Router();
const Account = require("../model/account");
const { getMoongoseErrors } = require("../utilities/errors");

router.post("/all", (req, res) => {
    return Account.find({}, (err, result) => {
        if (err) {
            console.log(err);
            res.send("sucks");
        } else {
            res.send(result);
        }
    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
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

router.post("/create", (req, res) => {
    const { password, name, email } = req.body;

    const account = new Account({
        name: name ? String(name) : name,
        dateUpdated: Date.now(),
        dateCreated: Date.now(),
        email: email ? String(email) : email,
        password: password ? String(password) : password,
    });

    return account.save((err) => {
        try {
            if (err) {
                res.status(400).jsonp({
                    errors: getMoongoseErrors(err),
                });
            } else {
                res.status(200).jsonp({
                    message: "Successfully added account.",
                });
            }
        } catch (e) {
            res.status(500).send("Interal Server Error");
        }
    });
});

module.exports = router;
