const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wish = require("../model/wish");

router.post("/getAll", async (req, res) => {
    // const wish = new Wish({
    //     accountId: new mongoose.Types.ObjectId(),
    //     url: "http://example.com",
    //     name: "sweater",
    //     description: "sweater",
    //     dateUpdated: Date.now(),
    // });
    // wish.save((err) => {
    //     if (err) res.send("error adding to wish");
    //     res.send("successfully added new wish!");
    // });
    Wish.find({}, (err, result) => {
        if (err) {
            console.log("could not fetch all of wishes");
            res.err("oops");
        }
        res.json(result);
    });
});

module.exports = router;
