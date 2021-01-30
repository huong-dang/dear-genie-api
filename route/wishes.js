const express = require("express");
const router = express.Router();
const Wish = require("../model/wish");
const Account = require("../model/account");
const { getMongooseValidationErrors } = require("../utilities/errors");

router.post("/all", (req, res) => {
    return Wish.find({}, (err, result) => {
        if (err) {
            console.log("could not fetch all of wishes");
            res.err("oops");
        } else {
            res.json(result);
        }
    });
});

router.post("/add", async (req, res) => {
    try {
        const { email, url, name, description } = req.body;
        const account = await Account.findOne({ email: String(email) });
        const accountId = account ? account._id : null;
        const wish = new Wish({
            accountId: accountId ? String(accountId) : accountId,
            url: url ? String(url) : url,
            name: name ? String(name) : name,
            description: description ? String(description) : description,
            dateUpdated: Date.now(),
        });

        return wish.save((err) => {
            if (err) {
                res.status(400).jsonp({
                    errors: getMongooseValidationErrors(err),
                });
            } else {
                res.status(200).send("Successfully added wish!");
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
