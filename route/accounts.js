const express = require("express");
const router = express.Router();
const Account = require("../model/account");

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

router.post("/create", async (req, res) => {
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
                errors = [];
                for (e in err.errors) {
                    errors.push(err.errors[e].message);
                }
                res.status(400).jsonp({ errors: errors });
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
