const express = require("express");
const connectToDatabase = require("./connection");
const router = require("./Routes/Url");

const app = express();
const PORT = 8001;

connectToDatabase("mongodb://127.0.0.1:27017/Short-Url")
  .then(() => {
    console.log("MongoDb Successfully Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use("/api/url", router);

app.listen(PORT, () => {
  console.log(`Server started at Port No. ${PORT}`);
});
