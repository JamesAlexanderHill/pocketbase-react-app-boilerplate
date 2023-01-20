const express = require("express");
const path = require("path");

require('dotenv').config();
// create server
const app = express();

const PORT = process.env.APP_PORT || 3000;
const BUILD_FOLDER = "dist";

app.use(express.static(path.join(__dirname, BUILD_FOLDER)));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, BUILD_FOLDER, "index.html"));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})