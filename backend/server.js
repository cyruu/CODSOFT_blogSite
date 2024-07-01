const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("this is blog");
});

app.listen(port, () => {
  console.log("app listening at port: " + port);
});
