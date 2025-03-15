const generateShortId = require("ssid");
const URL = require("../Models/Url");
// const { URL } = require("../Models/Url");

async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "Url is required" });
  }
  const shortId = generateShortId();
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.status(200).json({ id: shortId });
}

async function handleGetShortUrl(req, res) {
  const shortId = req.params.shortUrl;
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    console.error("No entry found for the given short URL");
    return res.status(404).json({ error: "Short URL not found" });
  }
  
  console.log(entry.redirectUrl);
  return res.redirect(entry.redirectUrl);
}

const handleGetAnalyticsShortUrl = async (req, res) => {
  const shortId = req.params.shortUrl;
  const entry = await URL.findOne({ shortId });
  return res
    .status(200)
    .json({
      totalClicks: entry.visitHistory.length,
      visitHistory: entry.visitHistory,
    });
};
module.exports = {
  handleGenerateShortUrl,
  handleGetShortUrl,
  handleGetAnalyticsShortUrl,
};
