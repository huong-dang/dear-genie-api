const express = require("express");
const router = express.Router();
const Account = require("../model/account");

router.post("/getAll", async (req, res) => {
    // const account = new Account({
    //     username: "huong",
    //     password: "huong",
    //     name: "huong",
    //     dateUpdated: Date.now(),
    //     dateCreated: Date.now(),
    // });
    // account.save((err) => {
    //     if (err) res.send("error adding to account");
    //     res.send("successfully added new account!");
    // });
});

module.exports = router;
