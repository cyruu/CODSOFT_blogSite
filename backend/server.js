const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.get("/getdata", (req, res) => {
  return res.json({ title: "home page" });
});

app.listen(3000, () => {
  console.log("server listening at port 3000");
});
