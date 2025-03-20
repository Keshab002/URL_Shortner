const express = require("express");
const connectToDatabase = require("./connection");
const router = require("./Routes/Url");
const uirouter = require("./Routes/homePage")
const path = require("path")

const app = express();
const PORT = 8001;

app.use(express.json());
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

connectToDatabase("mongodb://mongo-container:27017/Short-Url")
  .then(() => {
    console.log("MongoDb Successfully Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", uirouter);
app.use("/api/url", router);

app.listen(PORT, () => {
  console.log(`Server started at Port No. ${PORT}`);
});
