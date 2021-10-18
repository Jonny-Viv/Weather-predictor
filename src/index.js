const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"));
});

app.get("/browser.js", (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "browser.js"));
});

app.post("/data", async (req, res, next) => {
  const urll = `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${process.env.API_key}`;
  axios({
    method: "get",
    url: urll,
    responseType: "json"
  }).then((data) => {
    res.status(200).json({ message: data.data });
  });
});

app.listen(process.env.PORT);
