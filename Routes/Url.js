const express = require("express");
const {
  handleGenerateShortUrl,
  handleGetShortUrl,
  handleGetAnalyticsShortUrl,
} = require("../Controllers/Url");

const router = express.Router();

router.post("/", handleGenerateShortUrl);
router.get("/:shortUrl", handleGetShortUrl);
router.get("/analytics/:shortUrl", handleGetAnalyticsShortUrl);

module.exports = router;
