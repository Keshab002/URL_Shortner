const express = require("express");
const URL = require("../Models/Url");
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await URL.find({});
    return res.render("home", {
        data: data
    })
})

module.exports = router;