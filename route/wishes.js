const express = require("express");
const router = express.Router();
const Wish = require("../model/wish");
const Account = require("../model/account");
const { getMoongoseErrors, ERRORS } = require("../utilities/errors");

const getAccountId = async (email) => {
    const account = await Account.findOne({ email: String(email) });
    return account ? account._id : account;
};

router.post("/delete", async (req, res) => {
    try {
        const { ids } = req.body;
        if (ids && ids instanceof Array && ids.length > 0) {
            try {
                const result = await Wish.deleteMany({ _id: { $in: ids } });
                res.status(200).send(`Deleted ${result.deletedCount} wishes`);
            } catch (e) {
                res.status(400).jsonp({ errors: getMoongoseErrors(e) });
            }
        } else {
            res.status(400).jsonp({ errors: [ERRORS.WISH_ID_REQUIRED] });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/update", async (req, res) => {
    try {
        const { id, url, name, description } = req.body;
        try {
            const doc = await Wish.updateOne(
                { _id: id ? String(id) : id },
                {
                    url: url ? String(url) : url,
                    name: name ? String(name) : name,
                    description: description
                        ? String(description)
                        : description,
                    dateUpdated: Date.now(),
                }
            );
            res.status(200).jsonp(doc);
        } catch (e) {
            res.status(400).jsonp({ errors: getMoongoseErrors(e) });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/view", async (req, res) => {
    try {
        const { email } = req.body;
        const accountId = await getAccountId(email);
        try {
            const docs = await Wish.find({
                accountId: accountId ? String(accountId) : accountId,
            });
            res.status(200).jsonp(docs);
        } catch (err) {
            res.status(400).jsonp({
                errors: getMoongoseErrors(err),
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/add", async (req, res) => {
    try {
        const { email, url, name, description } = req.body;
        const accountId = await getAccountId(email);
        const wish = new Wish({
            accountId: accountId ? String(accountId) : accountId,
            url: url ? String(url) : "",
            name: name ? String(name) : name,
            description: description ? String(description) : description,
            dateUpdated: Date.now(),
        });

        try {
            await wish.save();
            res.status(200).send("Successfully added wish!");
        } catch (err) {
            res.status(400).jsonp({
                errors: getMoongoseErrors(err),
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
